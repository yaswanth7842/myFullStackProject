package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.LoginRequest;
import com.example.demo.model.PasswordDto;
import com.example.demo.model.RegisterRequest;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repositary.UserRepository;
import com.example.demo.securityconfg.JwtUtil;
import com.example.demo.serivce.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest register) {
       String result=authService.register(register);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
        );

        String token = jwtUtil.generateToken(request.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);

        // include role if needed
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null) {
            response.put("role", user.getRole().name());
        }

        return ResponseEntity.ok(response);
    }
    @PostMapping("/checkemail")
    public String checkEmail(@RequestBody PasswordDto dto) {
    	return authService.checkEmail(dto);
    }
    @PostMapping("/checkemail/forgotpassword")
    public String passwordforgot(@RequestBody PasswordDto password) {
    	return authService.passwordforgot(password);
    }
    
}
