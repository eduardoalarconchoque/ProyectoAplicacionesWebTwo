package com.cibertec.dto;

import com.cibertec.enums.UserRole;

import lombok.Data;

@Data
public class LoginResponse {

	private String jwt; 
	
	private UserRole userRole; 
	
	private Long userId  ;
	
	
}
