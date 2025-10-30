package com.cibertec.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartItemDto {
	
    private Long id;
    
    private Long cartId;
    
    private Long productId;
    
    private int cantidad;
    
    private String productoNombre;
    
    
    //--------------------------------------//

    private String descripcion;
    
    private BigDecimal precio;
    
    private int stock;
	
	private byte[] returnedImagen;
    
}
