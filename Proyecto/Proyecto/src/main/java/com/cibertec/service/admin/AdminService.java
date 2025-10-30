package com.cibertec.service.admin;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import com.cibertec.dto.CartDto;
import com.cibertec.dto.CategoryDto;
import com.cibertec.dto.OrderDetailDto;
import com.cibertec.dto.OrderDto;
import com.cibertec.dto.OrderItemDto;
import com.cibertec.dto.PaymentDto;
import com.cibertec.dto.ProductDto;
import com.cibertec.dto.UserDto;
import com.cibertec.enums.OrderStatus;

public interface AdminService {
    
    // Métodos para el carrito
    CartDto obtenerCarritoPorUsuario(Long userId);
    
    boolean agregarProductoACarrito(Long userId, Long productId, int cantidad);  //no
    
    boolean eliminarProductoDeCarrito(Long cartId, Long productId);  //no
    
    boolean vaciarCarrito(Long cartId); //no

    // Métodos para las órdenes
   
    OrderDto crearOrden(Long userId, List<OrderItemDto> items, BigDecimal total);
 
    //METEDO PARA ORDEN CORREGIDO OPCION 
  //  boolean cambiarEstadoOrden(Long userId, List<OrderDto> items, BigDecimal total,String status);
  
    List<OrderDto> obtenerOrdenesPorUsuario(Long userId); 
    
    OrderDetailDto obtenerDetallesDeOrden(Long orderId); 
    
    boolean actualizarEstadoDeOrden(Long orderId, OrderStatus estado);

    // Métodos para los pagos
    PaymentDto realizarPago(Long orderId, BigDecimal monto, String metodo); //no
    
  //-----------------metodo nuevo--------//
    List<PaymentDto> listarPagos();

    PaymentDto obtenerPagoPorOrden(Long orderId);  // quizas
    
    List<PaymentDto> obtenerPagosPorUsuario(Long userId);

    // Métodos para productos
    
    boolean agregarProducto(ProductDto productDto)throws IOException;
  
    boolean actualizarProducto(Long productId, ProductDto productDto);
    
    boolean eliminarProducto(Long productId);
    
    List<ProductDto> obtenerProductosPorCategoria(Long categoriaId);
    
    List<ProductDto> buscarProductos(String nombre, String categoriaNombre);

    // Métodos para categorías
    
    CategoryDto agregarCategoria(CategoryDto categoryDto);
    
    boolean actualizarCategoria(Long categoryId, CategoryDto categoryDto);
    
    boolean eliminarCategoria(Long categoryId);
    
    List<CategoryDto> obtenerCategorias();

    // Métodos para usuarios
    
    List<UserDto> obtenerTodosLosUsuarios();
    
    UserDto obtenerUsuario(Long userId); 
    
    boolean actualizarUsuario(Long userId, UserDto userDto);  //no
    
    boolean eliminarUsuario(Long userId);  

    
    // Listado de pendientes
    
    List<OrderDto> obtenerOrdenesPorUsuario(); 
    
    
    List<PaymentDto> obtenerPagosPendientes();
    
    
    List<ProductDto> obtenerProductosConBajoStock(); //no
    
    
    List<CartDto> obtenerCarritosPendientes();
    
}

	

