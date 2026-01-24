package com.example.demo.repositary;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.example.demo.model.EmailOtp;

import jakarta.transaction.Transactional;

public interface OtpRepository extends JpaRepository<EmailOtp,Long> {
	

	 Optional<EmailOtp> findByEmail(String email);

	 void deleteByEmail(String email);

}
