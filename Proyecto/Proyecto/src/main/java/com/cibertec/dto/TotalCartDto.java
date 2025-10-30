package com.cibertec.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalCartDto {
	
	private Long cartId;
	
    private Long userId;
    
    private BigDecimal total;

}
