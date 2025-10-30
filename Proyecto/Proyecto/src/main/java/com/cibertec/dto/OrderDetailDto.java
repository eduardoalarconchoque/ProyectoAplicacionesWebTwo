package com.cibertec.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cibertec.enums.OrderStatus;

import lombok.Data;

@Data
public class OrderDetailDto {
    private Long id;
    
    private Long userId;
    
    private String userNombre;
    
    private LocalDateTime fecha;
    
    private BigDecimal total;
    
    private OrderStatus status;
    
    private List<OrderItemDto> items;
    
    private List<PaymentDto> pagos; 
}

