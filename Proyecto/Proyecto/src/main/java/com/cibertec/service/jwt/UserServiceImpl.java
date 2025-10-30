package com.cibertec.service.jwt;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cibertec.service.jwt.UserService;

import lombok.RequiredArgsConstructor;

import com.cibertec.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private final UserRepository userRepository;

	@Override
    public UserDetails loadUserByUsername(String username) {
        return (UserDetails) userRepository.findFirstByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
	
	
     @Override
     public UserDetailsService userDetailsService() {
	// TODO Auto-generated method stub
	return this;
   }
	
}
