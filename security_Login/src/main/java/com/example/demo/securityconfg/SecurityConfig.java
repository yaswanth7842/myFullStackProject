package com.example.demo.securityconfg;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // ❌ Disable CSRF (required for REST + React)
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS (React → Spring)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ❌ No session (JWT is stateless)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔐 AUTHORIZATION RULES
            .authorizeHttpRequests(auth -> auth
            	    .requestMatchers(
            	        "/auth/**",
            	        "/products/all",
            	        "/videos/**",
            	        "/images/**",
            	        "/uploads/**"
            	    ).permitAll()

            	    .requestMatchers("/api/cart/**").authenticated()
            	    .requestMatchers("/products/forgotpassword/**").authenticated()
            	    
            	    .requestMatchers("/products/add").hasRole("ADMIN")
            	    .requestMatchers("/products/update").hasRole("ADMIN")
            	    .requestMatchers("/products/deleteproducts").hasRole("ADMIN")
            	    .anyRequest().authenticated()
            	)


            // 🧠 JWT FILTER BEFORE USERNAME/PASSWORD FILTER
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🌍 CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // 🔐 PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔐 AUTH MANAGER (LOGIN)
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}