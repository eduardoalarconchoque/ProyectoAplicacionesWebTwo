package com.cibertec.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.entity.Payment;
import com.cibertec.enums.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
	// Historial de pagos por usuario
	List<Payment> findByUserId(Long userId); 
	
    //List<Payment> findByOrderId(Long orderId);

	List<Payment> findByStatus(PaymentStatus pendiente);
	
	
	Optional<Payment> findByOrderId(Long orderId);


	
}

