# Terraform Main Configuration orchestrating the GCP Infrastructure
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.15.0"
    }
  }
  backend "gcs" {
    bucket = "herbaltea-tf-state-prod"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# --- VPC & Networking Module ---
module "vpc" {
  source      = "./modules/vpc"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
}

# --- Cloud SQL PostgreSQL Module ---
module "db" {
  source               = "./modules/db"
  project_id           = var.project_id
  region               = var.region
  environment          = var.environment
  vpc_id               = module.vpc.vpc_id
  private_network_link = module.vpc.private_network_link

  depends_on = [module.vpc]
}

# --- Memorystore Redis Module ---
module "redis" {
  source               = "./modules/redis"
  project_id           = var.project_id
  region               = var.region
  environment          = var.environment
  vpc_id               = module.vpc.vpc_id
  private_network_link = module.vpc.private_network_link

  depends_on = [module.vpc]
}

# --- Secret Manager Module ---
module "secrets" {
  source      = "./modules/secrets"
  project_id  = var.project_id
  db_password = module.db.db_password
}

# --- Cloud Armor WAF Module ---
module "cloud_armor" {
  source      = "./modules/cloud_armor"
  project_id  = var.project_id
  environment = var.environment
}

# --- IAM Roles & Service Accounts ---
module "iam" {
  source      = "./modules/iam"
  project_id  = var.project_id
  environment = var.environment
}

# --- Cloud Run Serverless Service ---
module "cloud_run" {
  source                     = "./modules/cloud_run"
  project_id                 = var.project_id
  region                     = var.region
  environment                = var.environment
  service_account_email      = module.iam.cloud_run_sa_email
  vpc_connector_id           = module.vpc.vpc_connector_id
  db_host                    = module.db.db_host
  db_name                    = module.db.db_name
  redis_host                 = module.redis.redis_host
  cloud_armor_policy_name    = module.cloud_armor.policy_name
}
