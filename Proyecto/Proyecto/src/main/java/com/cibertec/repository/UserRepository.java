package com.cibertec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.entity.User;
import com.cibertec.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{

	Optional<User> findFirstByEmail(String email);

	User findByUserRole(UserRole userRole);
	
}
