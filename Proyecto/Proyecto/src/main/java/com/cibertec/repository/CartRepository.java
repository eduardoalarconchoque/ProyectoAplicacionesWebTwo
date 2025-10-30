package com.cibertec.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cibertec.entity.Cart;
import com.cibertec.entity.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
	// Buscar el carrito de un usuario
	Optional<Cart> findByUserId(Long userId); 
	
	
	boolean existsByUser(User user); 
	

	List<Cart> findAllByUserId(Long userId);

	List<Cart> findByFechaAfter(LocalDateTime minusDays);

}

