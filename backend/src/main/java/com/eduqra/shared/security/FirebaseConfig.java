package com.eduqra.shared.security;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${app.security.firebase.project-id:wellness-local-dev}")
    private String projectId;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .setProjectId(projectId)
                        .build();
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase Admin SDK initialized successfully for project: " + projectId);
            }
        } catch (IOException e) {
            // Fallback for local development/testing without real credentials
            System.err.println("Firebase application default credentials not found. Local dev mode initialized for project: " + projectId);
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setProjectId(projectId)
                        .build();
                FirebaseApp.initializeApp(options);
            }
        }
    }
}
