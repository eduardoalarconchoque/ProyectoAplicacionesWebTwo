package com.cibertec.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cibertec.enums.PaymentStatus;

import lombok.Data;

@Data
public class PaymentDto {
	
    private Long id;
    
    private Long userId;
    
    private String userNombre;
    
    private Long orderId;
    
    private BigDecimal monto;
    
    private String metodo;
    
    private PaymentStatus status;
    
    private LocalDateTime fecha;
}
