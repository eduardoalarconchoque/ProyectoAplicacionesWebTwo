package com.cibertec.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cibertec.dto.LoginRequest;
import com.cibertec.dto.LoginResponse;
import com.cibertec.dto.RegisterRequest;
import com.cibertec.dto.UserDto;
import com.cibertec.entity.User;
import com.cibertec.repository.UserRepository;
import com.cibertec.service.auth.AuthService;
import com.cibertec.service.jwt.UserService;
import com.cibertec.utils.JWTUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth") // Ruta base del controlador
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager; // Inyectamos AuthenticationManager

    @PostMapping("/register") // Endpoint para registrar usuarios
    public ResponseEntity<?> signupCustomer(@RequestBody RegisterRequest registerRequest) {
        
    	//verificacion del usuario creado --------- revisar consola :V
    	 System.out.println("Registro de usuario: " + registerRequest.getEmail() + ", " + registerRequest.getNombre());
    	// Verificar si ya existe un usuario con el mismo email
        if (authService.hasCustomerWithEmail(registerRequest.getEmail()))
            return new ResponseEntity<>("Ya existe ese cliente con el mismo email", HttpStatus.NOT_ACCEPTABLE);

        // Crear nuevo usuario
        UserDto createdCustomerDto = authService.createdCustomer(registerRequest);

        // Validar si la creación fue exitosa
        if (createdCustomerDto == null) {
            return new ResponseEntity<>("Cliente no creado, inténtalo más tarde", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);
    }

    @PostMapping("/login") // Endpoint para iniciar sesión
    public LoginResponse createAuthenticationToken(@RequestBody LoginRequest authenticationRequest)
            throws BadCredentialsException, DisabledException, UsernameNotFoundException {
        try {
            // Usar la instancia de authenticationManager para autenticar al usuario
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Username o contraseña incorrectos");
        }

        // Cargar detalles del usuario
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());

        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        LoginResponse authenticationResponse = new LoginResponse();

        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }

        return authenticationResponse;
    }
}


