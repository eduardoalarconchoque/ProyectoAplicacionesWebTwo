package com.cibertec.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cibertec.entity.Order;
import com.cibertec.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
	// Ver pedidos de un usuario
	List<Order> findByUserId(Long userId); 
	
	// Si queremos filtar por estado
	List<Order> findByUserIdAndStatus(Long userId, OrderStatus status);
	
	// Si queremos filtar por fecha
	List<Order> findByFechaBetween(LocalDateTime desde, LocalDateTime hasta);

	List<Order> findByStatus(OrderStatus pendiente);


}

