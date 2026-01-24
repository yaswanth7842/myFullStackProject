package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Product;
import com.example.demo.model.ProductAddDTO;
import com.example.demo.model.ProductGetAllDTO;
import com.example.demo.repositary.CartItemRepository;
import com.example.demo.serivce.ProductService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;
    
    

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ ADD PRODUCT
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    public ResponseEntity<Product> addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("videos") MultipartFile[] videos
    ) throws IOException {

        ProductAddDTO dto = new ProductAddDTO();
        dto.setName(name);
        dto.setCategory(category);
        dto.setDescription(description);
        dto.setPrice(price);
        dto.setImages(images);
        dto.setVideos(videos);

        Product saved = productService.addProduct(dto);
        return ResponseEntity.ok(saved);
    }


    // ✅ GET ALL PRODUCTS
    @GetMapping("/all")
    public ResponseEntity<List<ProductGetAllDTO>> getAllProducts() {
        List<ProductGetAllDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<ProductGetAllDTO> getProductById(@PathVariable Long id) {
        ProductGetAllDTO dto = productService.getProductByIdDTO(id);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/category/{category}")
    public List<ProductGetAllDTO> getProductsByCategory(
            @PathVariable String category) {
        return productService.getProductsByCategoryDTO(category);
    }
    
    @DeleteMapping("/deleteproducts/{id}")
    public String deleteProducts(@PathVariable Long id) {
    	return productService.deleteProduct(id);
    }
    
    @PutMapping("/update/{id}")
    public String updateProducts(
            @PathVariable Long id,
            @RequestBody ProductGetAllDTO dto) {
        return productService.updateProducts(id, dto);
    }
   

}