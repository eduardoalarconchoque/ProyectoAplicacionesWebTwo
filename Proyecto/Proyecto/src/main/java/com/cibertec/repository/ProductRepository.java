package com.cibertec.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.dto.ProductDto;
import com.cibertec.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
	// Filtrar productos por categoría
	List<Product> findByCategoryId(Long categoryId); 
	
	// Buscar productos por nombre parcial
    List<Product> findByNombreContainingIgnoreCase(String nombre);

	List<Product> findByNombreContainingIgnoreCaseAndCategoryId(String nombre, Long categoriaId);

	List<Product> findByNombreContainingAndCategoryNombreContaining(String nombre, String categoriaNombre);

	List<Product> findByStockLessThan(int i);
 
}

