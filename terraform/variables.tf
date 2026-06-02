variable "project_id" {
  description = "The GCP Project ID where resources will be deployed"
  type        = string
  default     = "wellness-brand"
}

variable "region" {
  description = "The GCP Region for resource placement"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Target deployment environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}
