package com.example.demo.serivce;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Product;
import com.example.demo.model.ProductAddDTO;
import com.example.demo.model.ProductGetAllDTO;
import com.example.demo.repositary.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // POST - Add Product
    public Product addProduct(ProductAddDTO dto) throws IOException {
        Product product = new Product();
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
            dtoList.add(dto);
        }

        return dtoList;
    }
}
