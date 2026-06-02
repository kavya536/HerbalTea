resource "google_secret_manager_secret" "db_password" {
  secret_id = "DB_PASSWORD"
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_password_version" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = var.db_password
}

resource "google_secret_manager_secret" "firebase_credentials" {
  secret_id = "FIREBASE_CREDENTIALS"
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "JWT_SECRET"
  replication {
    auto {}
  }
}

variable "project_id" { type = string }
variable "db_password" { type = string }
