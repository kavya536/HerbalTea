package com.eduqra.shared.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            
            try {
                UsernamePasswordAuthenticationToken authentication = getAuthentication(token);
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }
        
        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (token.isEmpty()) {
            return null;
        }

        // Support mock authentication for local development and testing
        if (token.startsWith("mock-")) {
            String userId = token.substring(5);
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            
            if (userId.startsWith("admin-")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            }
            
            return new UsernamePasswordAuthenticationToken(userId, null, authorities);
        }

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String userId = decodedToken.getUid();
            
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            
            // Check for admin claim
            Boolean isAdmin = (Boolean) decodedToken.getClaims().get("admin");
            if (Boolean.TRUE.equals(isAdmin)) {
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            }
            
            return new UsernamePasswordAuthenticationToken(userId, null, authorities);
        } catch (FirebaseAuthException e) {
            logger.warn("Invalid Firebase ID token received: " + e.getMessage());
            return null;
        }
    }
}
