resource "google_redis_instance" "redis" {
  name           = "${var.environment}-redis"
  tier           = var.environment == "prod" ? "STANDARD_HA" : "BASIC" # Standard HA replicates across zones
  memory_size_gb = 2

  region                  = var.region
  authorized_network      = var.vpc_id
  connect_mode            = "PRIVATE_SERVICE_ACCESS"
  redis_version           = "REDIS_7_0"
  transit_encryption_mode = "DISABLED" # Can be set to SERVER_AUTHENTICATION if in-transit TLS is required
}

output "redis_host" {
  value = google_redis_instance.redis.host
}

output "redis_port" {
  value = google_redis_instance.redis.port
}

variable "project_id" { type = string }
variable "region" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "private_network_link" { type = string }
