package com.example.demo.serivce;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.model.EmailOtp;
import com.example.demo.repositary.OtpRepository;
import com.example.demo.repositary.UserRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional 
public class OtpService {

    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public OtpService(OtpRepository otpRepository,
                      UserRepository userRepository,
                      JavaMailSender mailSender) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    // SEND OTP
    @Transactional
    public String sendOtp(String email) {

        if (userRepository.existsByEmail(email)) {
            return "EMAIL_ALREADY_EXISTS";
        }

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        otpRepository.deleteByEmail(email);

        EmailOtp emailOtp = new EmailOtp();
        emailOtp.setEmail(email);
        emailOtp.setOtp(otp);
        emailOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        emailOtp.setVerified(false);

        otpRepository.save(emailOtp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("OTP Verification");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);

        return "OTP_SENT";
    }


    // VERIFY OTP
    public boolean verifyOtp(String email, String otp) {

        EmailOtp savedOtp = otpRepository.findByEmail(email).orElse(null);
        if (savedOtp == null) return false;

        if (savedOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.deleteByEmail(email);
            return false;
        }

        if (!savedOtp.getOtp().equals(otp)) {
            return false;
        }

        savedOtp.setVerified(true);
        otpRepository.save(savedOtp);

        return true;
    }

    // CHECK IF EMAIL VERIFIED
    public boolean isEmailVerified(String email) {
        return otpRepository.findByEmail(email)
                .map(EmailOtp::isVerified)
                .orElse(false);
    }

    // CLEANUP AFTER REGISTER
    public void clearOtp(String email) {
        otpRepository.deleteByEmail(email);
    }
}
