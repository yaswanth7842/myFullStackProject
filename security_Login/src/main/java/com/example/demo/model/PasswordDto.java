package com.example.demo.model;

public class PasswordDto {
	
	private String email;
	private String password;
	private String conformpassword;
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConformpassword() {
		return conformpassword;
	}
	public void setConformpassword(String conformpassword) {
		this.conformpassword = conformpassword;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
