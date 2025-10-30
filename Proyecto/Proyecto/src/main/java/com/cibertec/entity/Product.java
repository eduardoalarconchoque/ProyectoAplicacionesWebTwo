package com.cibertec.entity;

import java.math.BigDecimal;

import com.cibertec.dto.ProductDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table (name="products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
    private String nombre;
    
    @Column
    private String descripcion;
    
    @Column
    private BigDecimal precio;
    
    @Column
    private int stock;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imagen;
    
    
    //***********relacion*************
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;
    
    
    
    //-----------transformar------------------
    
    public ProductDto getProductDto() {
        ProductDto dto = new ProductDto();
        dto.setId(id);
        dto.setNombre(nombre);
        dto.setDescripcion(descripcion);
        dto.setPrecio(precio);
        dto.setStock(stock);
        dto.setReturnedImagen(imagen);
        dto.setCategoriaId(category != null ? category.getId() : null);
        dto.setCategoriaNombre(category != null ? category.getNombre() : null);
        return dto;
    }

    
    
	
}
