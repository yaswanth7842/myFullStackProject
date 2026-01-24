package com.example.demo.model;


import java.util.List;

public class ProductGetAllDTO {

    private Long id;
    private String name;
    private String category;
    private String description;
    private double price;
    private List<String> imageUrls;
    private List<String> videoPaths;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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
	public List<String> getImageUrls() {
		return imageUrls;
	}
	public void setImageUrls(List<String> imageUrls) {
		this.imageUrls = imageUrls;
	}
	public List<String> getVideoPaths() {
		return videoPaths;
	}
	public void setVideoPaths(List<String> videoPath) {
		this.videoPaths= videoPath;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	
    
    // getters and setters
}

