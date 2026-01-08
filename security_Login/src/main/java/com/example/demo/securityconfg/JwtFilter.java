package com.example.demo.securityconfg;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.serivce.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil,
                     CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // ✅ ALLOW CORS PREFLIGHT
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getServletPath();

        // 🌍 PUBLIC ENDPOINTS → SKIP JWT CHECK
        if (path.startsWith("/auth")
                || path.equals("/products/all")
                || path.startsWith("/images")
                || path.startsWith("/uploads")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 🔐 READ AUTH HEADER
        String header = request.getHeader("Authorization");

        // ❌ TOKEN MISSING
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                "JWT Token Missing"
            );
            return;
        }

        // ✂ REMOVE "Bearer "
        String token = header.substring(7);

        try {
            // 📧 EXTRACT USER EMAIL
            String email = jwtUtil.extractEmail(token);

            // ✅ IF NOT ALREADY AUTHENTICATED
            if (email != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

                var userDetails =
                        userDetailsService.loadUserByUsername(email);

                // ✅ VALIDATE TOKEN
                if (jwtUtil.validateToken(token, email)) {
                    UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                        );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
else {
                    response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid JWT"
                    );
                    return;
                }
            }

            // ➡ CONTINUE TO CONTROLLER
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            response.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                "JWT Error"
            );
        }
    }
}

