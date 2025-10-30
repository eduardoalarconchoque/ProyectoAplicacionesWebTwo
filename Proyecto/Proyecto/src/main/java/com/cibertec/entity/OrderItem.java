package com.cibertec.entity;

import java.math.BigDecimal;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cibertec.dto.OrderItemDto;
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
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    
  //**********relacion*****************
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Order order;

    
  //**********relacion*****************
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product;

    private int cantidad;
    private BigDecimal precio;
    
    
    //-----------transformar------------------
    public OrderItemDto getOrderItemDto() {
        OrderItemDto dto = new OrderItemDto();
        dto.setItemId(itemId);
        dto.setOrderId(order != null ? order.getId() : null);
        dto.setProductId(product != null ? product.getId() : null);
        dto.setProductNombre(product != null ? product.getNombre() : null);
        dto.setCantidad(cantidad);
        dto.setPrecio(precio);
        return dto;
    }

    
}
