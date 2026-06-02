output "vpc_id" {
  description = "The ID of the provisioned VPC network"
  value       = module.vpc.vpc_id
}

output "db_host" {
  description = "The host IP of the Cloud SQL instance"
  value       = module.db.db_host
}

output "redis_host" {
  description = "The internal host IP of the Memorystore Redis instance"
  value       = module.redis.redis_host
}

output "cloud_run_url" {
  description = "The URL of the deployed Cloud Run service"
  value       = module.cloud_run.service_url
}
