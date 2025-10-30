package com.cibertec.service.auth;

import com.cibertec.dto.RegisterRequest;
import com.cibertec.dto.UserDto;

public interface AuthService {

UserDto createdCustomer(RegisterRequest registerRequest);
	
	boolean hasCustomerWithEmail(String email);
	
}
