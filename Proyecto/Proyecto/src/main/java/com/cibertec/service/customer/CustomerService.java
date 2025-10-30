package com.cibertec.service.customer;

import com.cibertec.dto.ProductDto;
import com.cibertec.dto.TotalCartDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.cibertec.dto.CartDto;
import com.cibertec.dto.CartItemDto;
import com.cibertec.dto.CategoryDto;
import com.cibertec.dto.OrderDetailDto;
import com.cibertec.dto.OrderDto;
import com.cibertec.dto.PaymentDto;

public interface CustomerService {

	// Lista los productos disponibles
	
	List<ProductDto> getAllProducts();

	 List<CategoryDto> obtenerCategorias();
	 
	 //crear carrito 
     boolean createCart(Long userId);

	// Busca productos según el nombre y la categoría especificada
	List<ProductDto> searchProducts(String nombre, Long categoriaId);

	// Agrega un producto al carrito con una cantidad específica
	boolean addToCart(Long userId, Long productId, int cantidad);

	// Listar productos que están actualmente en el carrito
	List<CartItemDto> getCartItems(Long userId);

	// Elimina un producto del carrito 
	boolean removeCartItem(Long cartItemId);

	//SUMAR PRECIO-----//
	
	TotalCartDto obtenerTotalCarritoPorUsuario(Long userId);
	
	
    // Crea una orden 
	boolean createOrderFromCart(Long userId);

    // Listar todas las órdenes
	List<OrderDto> getOrdersByUserId(Long userId);

    // Devuelve los detalles de una orden 
	OrderDetailDto getOrderDetail(Long orderId, Long userId);

    // Procesa el pago de una orden
	boolean payOrder(Long userId, Long orderId, PaymentDto paymentDto);

    // Listar todos los pagos realizados
	List<PaymentDto> getPaymentsByUserId(Long userId);
	
}

