package com.example.demo.securityconfg;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String plainPassword = "admin123";
        String hashedPassword = encoder.encode(plainPassword);

        System.out.println(hashedPassword);
    }
}

