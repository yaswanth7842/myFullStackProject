package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.serivce.OtpService;



@RestController
@RequestMapping("/auth/otp")
@CrossOrigin
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    // SEND OTP
    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        String result = otpService.sendOtp(email);

        if ("EMAIL_ALREADY_EXISTS".equals(result)) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        return ResponseEntity.ok("OTP sent successfully");
    }

    // VERIFY OTP
    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        boolean verified = otpService.verifyOtp(email, otp);

        if (!verified) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }

        return ResponseEntity.ok("OTP verified successfully");
    }
}
