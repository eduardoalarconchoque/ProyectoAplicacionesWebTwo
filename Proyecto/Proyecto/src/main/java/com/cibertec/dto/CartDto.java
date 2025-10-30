package com.cibertec.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class CartDto {
	
    private Long id;
    
    private Long userId;
    
    private String UserNombre;
    
    private LocalDateTime fecha;
    
    private List<CartItemDto> cartItems;
}