package com.cibertec.dto;

import lombok.Data;

@Data
// -------------Buscar producto-------------
public class SearchDto {
	
	private Long productoId;
    private String productoNombre;
    private String categoriaNombre;
	

}
