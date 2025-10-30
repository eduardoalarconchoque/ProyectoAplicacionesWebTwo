package com.cibertec.service.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cibertec.dto.RegisterRequest;
import com.cibertec.dto.UserDto;
import com.cibertec.entity.User;
import com.cibertec.enums.UserRole;
import com.cibertec.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final UserRepository userRepository;
	
	@PostConstruct  
	public void createAdminAccount() {
		
		User adminAccount = userRepository.findByUserRole(UserRole.ADMINISTRATOR);
		if(adminAccount == null) {
			User newAdminAccount = new User (); 
			newAdminAccount.setNombre("admin1");
			newAdminAccount.setEmail("admin1@correo.com");
			newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("adminpass123"));
			newAdminAccount.setUserRole(UserRole.ADMINISTRATOR);
			userRepository.save(newAdminAccount);
			System.out.println("Cuenta de administrador creada exitosamente");
			
		}
	}
	
	

	@Override
	public UserDto createdCustomer(RegisterRequest registerRequest) {
		
	       User user = new User (); 
	       
	       user.setEmail(registerRequest.getEmail());
	       user.setNombre(registerRequest.getNombre());
	        user.setPassword(new BCryptPasswordEncoder().encode(registerRequest.getPassword()));
	        
	        user.setUserRole(UserRole.CUSTOMER);  // Asignando un rol
	        
	       User createdUser = userRepository.save(user);
	       UserDto userDto = new UserDto(); 
           userDto.setId(createdUser.getId()); 
           userDto.setEmail(createdUser.getEmail());
           userDto.setNombre(createdUser.getNombre());
           userDto.setPassword(createdUser.getPassword());
           return userDto;
	}
	
	 @Override 
	    public boolean hasCustomerWithEmail(String email) {
	        return userRepository.findFirstByEmail(email).isPresent(); 
	    }
	 
	
}
