package com.cibertec.dto;

import lombok.Data;

@Data
public class RegisterRequest {

	private String email; 
	  
    private String nombre;

    private String password;
	
}
