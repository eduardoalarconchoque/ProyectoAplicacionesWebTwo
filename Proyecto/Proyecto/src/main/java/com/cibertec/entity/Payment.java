package com.cibertec.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cibertec.dto.PaymentDto;
import com.cibertec.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //***********relacion*************
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    //***********relacion*************
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Order order;

    private BigDecimal monto;

    private String metodo;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDIENTE;

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fecha;
    
    
  //-----------transformar------------------
    public PaymentDto getPaymentDto() {
        PaymentDto dto = new PaymentDto();
        dto.setId(id);
        dto.setUserId(user != null ? user.getId() : null);
        dto.setUserNombre(user != null ? user.getNombre() : null);
        dto.setOrderId(order != null ? order.getId() : null);
        dto.setMonto(monto);
        dto.setMetodo(metodo);
        dto.setStatus(status);
        dto.setFecha(fecha);
        return dto;
    }

    
}