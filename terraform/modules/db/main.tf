resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "google_sql_database_instance" "postgres" {
  name             = "${var.environment}-postgres-db"
  database_version = "POSTGRES_16"
  region           = var.region

  settings {
    tier              = "db-custom-2-7680" # Production grade instance (2 vCPUs, 7.5GB RAM)
    availability_type = var.environment == "prod" ? "REGIONAL" : "ZONAL" # Regional HA for Prod

    ip_configuration {
      ipv4_enabled                                  = false # Zero-trust security: No public IP
      private_network                               = var.private_network_link
      enable_private_path_for_google_cloud_services = true
    }

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
      start_time                     = "02:00"
      transaction_log_retention_days = 7
    }

    insights_config {
      query_insights_enabled  = true
      query_string_length     = 1024
      record_application_tags = true
      record_client_address   = true
    }
  }

  deletion_protection = var.environment == "prod" ? true : false
}

resource "google_sql_database" "db" {
  name     = "wellness"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "db_user" {
  name     = "postgres"
  instance = google_sql_database_instance.postgres.name
  password = random_password.db_password.result
}

output "db_host" {
  value = google_sql_database_instance.postgres.private_ip_address
}

output "db_name" {
  value = google_sql_database.db.name
}

output "db_password" {
  value     = random_password.db_password.result
  sensitive = true
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "private_network_link" { type = string }
