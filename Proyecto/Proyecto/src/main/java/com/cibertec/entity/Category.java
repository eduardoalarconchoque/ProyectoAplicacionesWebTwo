package com.cibertec.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.cibertec.dto.CategoryDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String nombre;
	
	//***********relacion**********
	
	@OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;
	
	
	//-------------Transformacion---------------------------
	public CategoryDto getCategoryDto() {
		CategoryDto categoryDto = new CategoryDto();
		
		categoryDto.setId(id);
		categoryDto.setNombre(nombre);
		return categoryDto;
	}
}
