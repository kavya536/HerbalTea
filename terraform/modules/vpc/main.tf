resource "google_compute_network" "custom_vpc" {
  name                    = "${var.environment}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.environment}-subnet"
  ip_cidr_range = "10.0.0.0/20"
  region        = var.region
  network       = google_compute_network.custom_vpc.id
  
  private_ip_google_access = true
}

# Private Service Access for Cloud SQL / Memorystore Redis
resource "google_compute_global_address" "private_ip_alloc" {
  name          = "${var.environment}-private-ip-alloc"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.custom_vpc.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.custom_vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_alloc.name]
}

# Serverless VPC Access Connector for Cloud Run to access internal services
resource "google_vpc_access_connector" "vpc_connector" {
  name          = "cr-vpc-conn-${var.environment}"
  region        = var.region
  network       = google_compute_network.custom_vpc.name
  ip_cidr_range = "10.8.0.0/28"
  min_instances = 2
  max_instances = 10
}

# Cloud NAT for private internet egress (security hardening)
resource "google_compute_router" "router" {
  name    = "${var.environment}-nat-router"
  region  = var.region
  network = google_compute_network.custom_vpc.id
}

resource "google_compute_router_nat" "nat" {
  name                               = "${var.environment}-nat-gateway"
  router                             = google_compute_router.router.name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

output "vpc_id" {
  value = google_compute_network.custom_vpc.id
}

output "private_network_link" {
  value = google_compute_network.custom_vpc.self_link
}

output "vpc_connector_id" {
  value = google_vpc_access_connector.vpc_connector.id
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "environment" { type = string }
