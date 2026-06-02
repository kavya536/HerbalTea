resource "google_compute_security_policy" "cloud_armor_policy" {
  name        = "${var.environment}-security-policy"
  description = "Production Cloud Armor WAF and DDoS Protection Policy"

  # Default rule (allow all traffic not blocked by other rules)
  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default allow rule"
  }

  # --- SQL Injection Protection (OWASP) ---
  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-v33-stable')"
      }
    }
    description = "Block OWASP SQL Injection attempts"
  }

  # --- Cross-Site Scripting (XSS) Protection ---
  rule {
    action   = "deny(403)"
    priority = "1010"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-v33-stable')"
      }
    }
    description = "Block OWASP Cross-Site Scripting (XSS) attempts"
  }

  # --- Local/Remote File Inclusion (LFI/RFI) Protection ---
  rule {
    action   = "deny(403)"
    priority = "1020"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('lfi-v33-stable') || evaluatePreconfiguredExpr('rfi-v33-stable')"
      }
    }
    description = "Block OWASP Local and Remote File Inclusion"
  }

  # --- Remote Code Execution (RCE) Protection ---
  rule {
    action   = "deny(403)"
    priority = "1030"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('rce-v33-stable')"
      }
    }
    description = "Block OWASP Remote Code Execution attempts"
  }

  # --- Geo-Blocking Rule ---
  # Deny traffic from high-risk or unsupported countries (e.g. North Korea 'KP', Iran 'IR')
  rule {
    action   = "deny(403)"
    priority = "2000"
    match {
      expr {
        expression = "origin.region_code == 'KP' || origin.region_code == 'IR'"
      }
    }
    description = "Geo-blocking for unsupported regions"
  }

  # --- IP Rate Limiting (DDoS Mitigation) ---
  # If a single IP sends more than 500 requests per 2 minutes, throttle it
  rule {
    action   = "throttle"
    priority = "3000"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      enforce_on_key = "IP"
      rate_limit_threshold {
        count        = 500
        interval_sec = 120
      }
    }
    description = "DDoS throttling for high-frequency IP requests"
  }
}

output "policy_name" {
  value = google_compute_security_policy.cloud_armor_policy.name
}

output "policy_id" {
  value = google_compute_security_policy.cloud_armor_policy.id
}

variable "project_id" { type = string }
variable "environment" { type = string }
