package com.cibertec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cibertec.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
	// Obtener todos los ítems de un carrito
	List<CartItem> findByCartId(Long cartId); 

	// Ver si ya existe ese producto en ese carrito
    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId); 
    
}

