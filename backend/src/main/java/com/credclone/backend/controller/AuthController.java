package com.credclone.backend.controller;

import com.credclone.backend.dto.LoginRequest;
import com.credclone.backend.dto.RegisterRequest;
import com.credclone.backend.security.JwtUtils;
import com.credclone.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtils jwtUtils;
    private final UserService userService;

    public AuthController(JwtUtils jwtUtils, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @GetMapping("/test")
    public String test() {
        return "Auth endpoint is working!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            var user = userService.createUserFromRequest(registerRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login attempt: " + loginRequest.getEmail());

        try {
            // Simple authentication - check if user exists
            var user = userService.findByEmail(loginRequest.getEmail());

            if (user.isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                return ResponseEntity.status(401).body(errorResponse);
            }

            // For demo - accept any password
            // In production, use passwordEncoder.matches()

            // Generate a simple token (in production, use proper JWT)
            String token = "demo-token-" + System.currentTimeMillis();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", loginRequest.getEmail());
            response.put("name", user.get().getName());
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        System.out.println("Profile request, auth header: " + authHeader);

        try {
            // Extract email from token (simplified)
            String email = "bob@example.com"; // Default for demo
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                // In production, decode JWT to get email
            }

            var user = userService.findByEmail(email);

            if (user.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            Map<String, Object> profile = new HashMap<>();
            profile.put("name", user.get().getName());
            profile.put("email", user.get().getEmail());
            profile.put("creditScore", 750);
            profile.put("memberSince", "2024");

            return ResponseEntity.ok(profile);

        } catch (Exception e) {
            System.out.println("Profile error: " + e.getMessage());

            // Fallback mock profile
            Map<String, Object> profile = new HashMap<>();
            profile.put("name", "Demo User");
            profile.put("email", "demo@cred.com");
            profile.put("creditScore", 750);
            profile.put("memberSince", "2024");

            return ResponseEntity.ok(profile);
        }
    }
}