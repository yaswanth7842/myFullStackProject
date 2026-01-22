package com.example.demo.serivce;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Product;
import com.example.demo.model.ProductAddDTO;
import com.example.demo.model.ProductGetAllDTO;
import com.example.demo.repositary.CartItemRepository;
import com.example.demo.repositary.ProductRepository;

import jakarta.transaction.Transactional;

@Service
@EnableMethodSecurity  
public class ProductService {
	
	@Autowired
	private CartItemRepository cartitemrRepository;
	
	
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // POST - Add Product
    public Product addProduct(ProductAddDTO dto) throws IOException {
        Product product = new Product();
        if(productRepository.findByName(dto.getName()).isPresent()) {
        	throw new RuntimeException("Name should be unquic");
        }
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : dto.getImages()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get("uploads/images", fileName);

            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, image.getBytes());

            imageUrls.add("/images/" + fileName);
        }
        product.setImageUrls(imageUrls);
        
     // ---------- VIDEOS ----------
        List<String> videoUrls = new ArrayList<>();
        for (MultipartFile video : dto.getVideos()) {
            String fileName = UUID.randomUUID() + "_" + video.getOriginalFilename();
            Path path = Paths.get("uploads/videos", fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, video.getBytes());

            videoUrls.add("/videos/" + fileName);
        }
        product.setVideoPaths(videoUrls);

        return productRepository.save(product);
    }

    // GET - Get All Products
    public List<ProductGetAllDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductGetAllDTO> dtoList = new ArrayList<>();

        for (Product product : products) {
            ProductGetAllDTO dto = new ProductGetAllDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setPrice(product.getPrice());
            dto.setImageUrls(product.getImageUrls());
            dto.setVideoPaths(product.getVideoPaths());
            dtoList.add(dto);
        }

        return dtoList;
    }
    
    @Transactional
    public String deleteProduct(Long productId) {

        // 1️⃣ Delete all cart items referencing this product
    	cartitemrRepository.deleteByProductId(productId);

        // 2️⃣ Fetch product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 3️⃣ Clear product images
        product.getImageUrls().clear(); // removes them from the @ElementCollection table

        productRepository.delete(product); // finally delete the product

        return "Product deleted successfully";
    }

	public String updateProducts(Long id,ProductGetAllDTO dto) {

		// TODO Auto-generated method stub

		 Product product = productRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Product not found"));
		if(dto.getDescription().equals(product.getDescription())
				&& dto.getName().equals(product.getName())
				&& dto.getPrice()==product.getPrice()) {
			return "No changes detected";
		}
		 product.setName(dto.getName());
		 product.setDescription(dto.getDescription());
		 
		 product.setPrice(dto.getPrice());
		
		 productRepository.save(product);
		return "Updated Sucessfully";
	}

}