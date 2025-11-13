package util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Replace "12345" with the password you want to hash
        String rawPassword = "12345";
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("BCrypt hash: " + hashedPassword);
    }
}
