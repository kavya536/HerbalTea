# Eduqra Wellness - Enterprise Firebase Infrastructure & Deployment Playbook

This document details the multi-environment isolated Firebase architecture, local development flows, security posture, backup routines, and disaster recovery strategies for the Eduqra Wellness platform.

---

## 1. Environment Architecture & Project Mappings

To avoid shared infrastructure contamination, the application is segregated across three distinct GCP/Firebase projects:

| Environment | GCP/Firebase Project ID | Firestore Database | Storage Bucket | CLI Alias | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Development** | `eduqra-platform-dev` | `(default)` | `eduqra-platform-dev-storage` | `dev` | `dev.eduqra.com` |
| **Staging** | `eduqra-platform-staging` | `(default)` | `eduqra-platform-staging-storage` | `staging` | `staging.eduqra.com` |
| **Production** | `eduqra-platform-prod` | `(default)` | `eduqra-platform-prod-storage` | `prod` | `eduqra.com` |

---

## 2. Local Development & Firebase Emulator Suite

Local development uses isolated emulators. **Never connect local environments directly to live GCP projects.**

### Prerequisites
Ensure the following tools are installed:
- Node.js LTS (v20+)
- Java Runtime Environment (JRE v11+) — required for Firestore/Storage emulators
- Firebase CLI (`npm install -g firebase-tools`)

### Starting the Emulators
Launch the emulator suite from the repository root:
```bash
firebase emulators:start --only auth,firestore,storage,hosting
```
This runs:
- **Auth Emulator**: `127.0.0.1:9099`
- **Firestore Emulator**: `127.0.0.1:8085`
- **Storage Emulator**: `127.0.0.1:9199`
- **Emulator UI**: `127.0.0.1:4000`

### Client Config (`frontend/.env`)
For local execution, ensure the frontend environment properties map to the emulators:
```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wellness-local-dev
NEXT_PUBLIC_FIREBASE_API_KEY=mock-api-key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 3. Security Architecture & Rules

### Firestore Security Policy (`firestore.rules`)
Enforces role-based access control (RBAC), user ownership validations, and a fallback deny-all strategy.
- Users can read/write only their own profile document (`/users/{userId}`).
- Customers can create orders; viewing orders is restricted to the order owner and Admin roles (`request.auth.token.admin == true`).
- The catalog is publicly readable, but write permissions are restricted strictly to Administrators.

### Cloud Storage Security Policy (`storage.rules`)
Ensures unauthenticated uploads are rejected:
- Limits uploads to PNG, JPEG, and WebP format only (`image/.*`).
- Restricts payload sizes to `< 5MB`.
- Matches file paths strictly to the uploading user's authentication UID (`/users/{userId}/*`).

---

## 4. Disaster Recovery & Backups Strategy

To protect production data, configure automatic backups and understand the manual recovery steps.

### Scheduled Firestore Backups
Create a Cloud Scheduler job and a Cloud Function to automate daily Firestore database exports to a cold storage bucket.

1. **Create Backup GCS Bucket**:
   ```bash
   gcloud storage buckets create gs://eduqra-platform-prod-firestore-backups --project=eduqra-platform-prod --location=us-central1
   ```

2. **Configure Lifecycle Policy (30-day retention)**:
   Create a `lifecycle.json` file:
   ```json
   {
     "rule": [
       {
         "action": {"type": "Delete"},
         "condition": {"age": 30}
       }
     ]
   }
   ```
   Apply to bucket:
   ```bash
   gcloud storage buckets update gs://eduqra-platform-prod-firestore-backups --lifecycle-file=lifecycle.json
   ```

3. **Manual Backup Export**:
   Run an immediate full database export:
   ```bash
   gcloud firestore export gs://eduqra-platform-prod-firestore-backups --project=eduqra-platform-prod
   ```

### Restore Database from Backup
To recover Firestore state following a disaster:
1. Locate the backup folder in GCS (e.g. `gs://eduqra-platform-prod-firestore-backups/2026-05-29T11:00:00_12345/`).
2. Run the import command:
   ```bash
   gcloud firestore import gs://eduqra-platform-prod-firestore-backups/2026-05-29T11:00:00_12345/ --project=eduqra-platform-prod
   ```

---

## 5. Deployment Playbook

### Multi-Environment CLI Switch
Always verify the active alias before performing commands:
```bash
# Check current project alias
firebase use

# Switch to development
firebase use dev

# Switch to production
firebase use prod
```

### Manual Deploy of Security Rules
```bash
# Deploy firestore rules
firebase deploy --only firestore:rules

# Deploy storage rules
firebase deploy --only storage
```

---

## 6. Rollback Playbook

If a deployment corrupts the application or introduces stability issues:

1. **Rollback Cloud Run Backend**:
   Revert to the last known stable revision instantly using the Google Cloud CLI:
   ```bash
   gcloud run services update prod-platform-service \
     --region=us-central1 \
     --rollback-to-stable-revision \
     --project=eduqra-platform-prod
   ```

2. **Rollback Firestore Security Rules**:
   Locate the last working commit of `firestore.rules` in git:
   ```bash
   git checkout <stable-commit-sha> -- firestore.rules
   firebase deploy --only firestore:rules
   ```
