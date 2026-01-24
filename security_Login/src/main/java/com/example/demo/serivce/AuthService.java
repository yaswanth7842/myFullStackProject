package com.example.demo.serivce;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.PasswordDto;
import com.example.demo.model.RegisterRequest;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repositary.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	private OtpService otpService;
	
	@Autowired
	private UserRepository userRepository;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;
	
	public boolean isStrongPassword(String password) {
	    String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%!])(?=\\S+$).{8,}$";

	    return Pattern.matches(regex, password);
	}
	
	public String register(RegisterRequest register) {

	    if (!otpService.isEmailVerified(register.getEmail())) {
	        return "Email not verified";
	    }
		if(register.getPassword()==null||register.getPassword().trim().isBlank()) {
			return "password required";
		}
		Optional<User> existingEmail=userRepository.findByEmail(register.getEmail());
		if(existingEmail.isPresent()) {
			return "Email is Existing Already";
		}
		
	    if (!isStrongPassword(register.getPassword())) {
	        return "Password must contain uppercase, lowercase, number, special character and min 8 length";
	    }

		
		User user=new User();
		user.setName(register.getName());
		user.setEmail(register.getEmail());
		user.setPassword(passwordEncoder.encode(register.getPassword()));
		user.setRole(Role.ROLE_USER);
		userRepository.save(user);
		return"Register Sucessfully";
	}
	public String checkEmail(PasswordDto dto) {
		Optional<User> checkEmail=userRepository.findByEmail(dto.getEmail());
		if(!checkEmail.isPresent()) {
			return "Email not exist";
		}
		return "Email verified";
	}
	
	
	public String passwordforgot(PasswordDto password) {
		Optional<User> existingEmail=userRepository.findByEmail(password.getEmail());
		if(!existingEmail.isPresent()) {
			return "Email not Exist";
		}
		
		 if (!isStrongPassword(password.getPassword())) {
		        return "Password must contain uppercase, lowercase, number, special character and min 8 length";
		    }
		 if(!password.getPassword().equals(password.getConformpassword())) {
				return "Please Write Correct Password";
			}
		 User setingpassword=existingEmail.get();
		 setingpassword.setPassword(passwordEncoder.encode(password.getPassword()));
		 userRepository.save(setingpassword);
		return "Password updated";
	}

	
}
