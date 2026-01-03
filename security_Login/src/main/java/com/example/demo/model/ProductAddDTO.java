package com.example.demo.model;
import org.springframework.web.multipart.MultipartFile;

public class ProductAddDTO {
    private String name;
    private String description;
    private double price;
    private MultipartFile[] images;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public MultipartFile[] getImages() {
		return images;
	}
	public void setImages(MultipartFile[] images) {
		this.images = images;
	}
    
    // Getters and Setters
}