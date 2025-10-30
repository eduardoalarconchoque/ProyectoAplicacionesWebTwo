package com.cibertec.dto;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductDto {
	
	private Long id;
	
    private String nombre;
     
    private String descripcion;
    
    private BigDecimal precio;
    
    private int stock;
	
    private MultipartFile imagen;
	
	private byte[] returnedImagen;

	private Long categoriaId;
	
	private String categoriaNombre;

}
