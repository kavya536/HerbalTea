resource "google_cloud_run_v2_service" "backend_service" {
  name     = "${var.environment}-platform-service"
  location = var.region

  template {
    service_account = var.service_account_email

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/herbaltea/${var.environment}-backend:latest"

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "2.0"
          memory = "2Gi"
        }
      }

      # Standard environment variables
      env {
        name  = "DB_HOST"
        value = var.db_host
      }
      env {
        name  = "DB_PORT"
        value = "5432"
      }
      env {
        name  = "DB_NAME"
        value = var.db_name
      }
      env {
        name  = "REDIS_HOST"
        value = var.redis_host
      }
      env {
        name  = "REDIS_PORT"
        value = "6379"
      }
      env {
        name  = "GCP_PROJECT_ID"
        value = var.project_id
      }
      env {
        name  = "GCP_SECRET_MANAGER_ENABLED"
        value = "true"
      }

      # Credentials injected directly from Google Cloud Secret Manager
      env {
        name = "DB_USER"
        value_source {
          secret_key_ref {
            secret  = "DB_USER"
            version = "latest"
          }
        }
      }
      env {
        name = "DB_PASSWORD"
        value_source {
          secret_key_ref {
            secret  = "DB_PASSWORD"
            version = "latest"
          }
        }
      }
      env {
        name = "FIREBASE_PROJECT_ID"
        value_source {
          secret_key_ref {
            secret  = "FIREBASE_PROJECT_ID"
            version = "latest"
          }
        }
      }
      env {
        name = "JWT_SECRET"
        value_source {
          secret_key_ref {
            secret  = "JWT_SECRET"
            version = "latest"
          }
        }
      }
    }

    # Connect to the private VPC via Serverless VPC Access connector
    vpc_access {
      connector = var.vpc_connector_id
      egress    = "ALL_TRAFFIC" # Force all outbound traffic through VPC for security
    }

    scaling {
      min_instance_count = 2
      max_instance_count = 50
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

# --- Ingress: Global HTTPS Load Balancer with Cloud Armor WAF ---

# 1. Serverless Network Endpoint Group (NEG) targeting Cloud Run
resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  name                  = "${var.environment}-serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = google_cloud_run_v2_service.backend_service.name
  }
}

# 2. Global Backend Service and attach Cloud Armor WAF Policy
resource "google_compute_backend_service" "backend_lb_service" {
  name                  = "${var.environment}-backend-lb-service"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  protocol              = "HTTP"

  backend {
    group = google_compute_region_network_endpoint_group.serverless_neg.id
  }

  security_policy = var.cloud_armor_policy_name
}

# 3. URL Map to route requests to backend service
resource "google_compute_url_map" "url_map" {
  name            = "${var.environment}-lb-url-map"
  default_service = google_compute_backend_service.backend_lb_service.id
}

# 4. Target HTTP Proxy for ingress redirection (HTTPS can be configured with certs)
resource "google_compute_target_http_proxy" "http_proxy" {
  name    = "${var.environment}-lb-http-proxy"
  url_map = google_compute_url_map.url_map.id
}

# 5. Global Forwarding Rule to route public internet traffic to HTTP proxy
resource "google_compute_global_forwarding_rule" "forwarding_rule" {
  name                  = "${var.environment}-global-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.http_proxy.id
}

output "service_url" {
  value = google_cloud_run_v2_service.backend_service.uri
}

output "load_balancer_ip" {
  value = google_compute_global_forwarding_rule.forwarding_rule.ip_address
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "environment" { type = string }
variable "service_account_email" { type = string }
variable "vpc_connector_id" { type = string }
variable "db_host" { type = string }
variable "db_name" { type = string }
variable "redis_host" { type = string }
variable "cloud_armor_policy_name" { type = string }
