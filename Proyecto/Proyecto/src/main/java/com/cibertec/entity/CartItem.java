package com.cibertec.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cibertec.dto.CartItemDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  //***********relacion*************
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Cart cart;

  //***********relacion*************
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product;

    private int cantidad;
    
    
    //-----------transformar------------------
    
    public CartItemDto getCartItemDto() {
        CartItemDto dto = new CartItemDto();
        dto.setId(id);
        dto.setCantidad(cantidad);
        
        dto.setCartId(cart != null ? cart.getId() : null);
        dto.setProductId(product != null ? product.getId() : null);
        dto.setProductoNombre(product != null ? product.getNombre() : null);

        dto.setDescripcion(product != null ? product.getDescripcion() : null);
        dto.setPrecio(product != null ? product.getPrecio() : null);
        dto.setStock(product != null ? product.getStock() : 0);
        dto.setReturnedImagen(product != null ? product.getImagen() : null);       
        return dto;
    }

    
}