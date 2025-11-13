package com.credclone.backend.config;

import com.credclone.backend.entity.User;
import com.credclone.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create test user if not exists
        if (userRepository.findByEmail("bob@example.com").isEmpty()) {
            User testUser = new User();
            testUser.setName("Bob");
            testUser.setEmail("bob@example.com");
            testUser.setPassword(passwordEncoder.encode("12345"));

            userRepository.save(testUser);
            System.out.println("Test user created: bob@example.com / 12345");
        }

        if (userRepository.findByEmail("demo@cred.com").isEmpty()) {
            User demoUser = new User();
            demoUser.setName("Demo User");
            demoUser.setEmail("demo@cred.com");
            demoUser.setPassword(passwordEncoder.encode("demo123"));

            userRepository.save(demoUser);
            System.out.println("Demo user created: demo@cred.com / demo123");
        }
    }
}