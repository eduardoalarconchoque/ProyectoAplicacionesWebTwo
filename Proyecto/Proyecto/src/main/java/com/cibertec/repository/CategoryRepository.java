package com.cibertec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	// Buscar por nombre 
	Optional<Category> findByNombre(String nombre); 
}

