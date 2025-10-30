package com.cibertec.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long itemId;
    private Long orderId;
    private Long productId;
    private String productNombre;
    private int cantidad;
    private BigDecimal precio;
}
