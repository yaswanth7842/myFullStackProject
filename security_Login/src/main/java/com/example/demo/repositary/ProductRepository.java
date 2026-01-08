package com.example.demo.repositary;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Product;

import jakarta.transaction.Transactional;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findByName(String name);

	@Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.product.id = :productId")
    void deleteByProductId(@Param("productId") Long productId);
	
}

