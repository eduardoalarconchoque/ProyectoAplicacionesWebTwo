package com.cibertec.controller;


import com.cibertec.dto.*;
import com.cibertec.enums.OrderStatus;
import com.cibertec.service.*;
import com.cibertec.service.admin.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    

    //*************** Metodos para el carrito***************

    @GetMapping("/cart/{userId}")
    public CartDto obtenerCarritoPorUsuario(@PathVariable Long userId) {
        return adminService.obtenerCarritoPorUsuario(userId);
    }

    @PostMapping("/cart/{userId}/add-product/{productId}")
    public boolean agregarProductoACarrito(@PathVariable Long userId, 
                                           @PathVariable Long productId, 
                                           @RequestParam int cantidad) {
        return adminService.agregarProductoACarrito(userId, productId, cantidad);
    }

    @DeleteMapping("/cart/{cartId}/remove-product/{productId}")
    public boolean eliminarProductoDeCarrito(@PathVariable Long cartId, 
                                              @PathVariable Long productId) {
        return adminService.eliminarProductoDeCarrito(cartId, productId);
    }

    @DeleteMapping("/cart/{cartId}/empty")
    public boolean vaciarCarrito(@PathVariable Long cartId) {
        return adminService.vaciarCarrito(cartId);
    }

    //*************** Metodos para las orders ***************

    @PostMapping("/order/{userId}")
    public OrderDto crearOrden(@PathVariable Long userId, 
                               @RequestBody List<OrderItemDto> items, 
                               @RequestParam BigDecimal total) {
        return adminService.crearOrden(userId, items, total);
    }
    
    

    @GetMapping("/orders/{userId}")
    public List<OrderDto> obtenerOrdenesPorUsuario(@PathVariable Long userId) {
        return adminService.obtenerOrdenesPorUsuario(userId);
    }

    @GetMapping("/order/{orderId}/details")
    public OrderDetailDto obtenerDetallesDeOrden(@PathVariable Long orderId) {
        return adminService.obtenerDetallesDeOrden(orderId);
    }

    @PutMapping("/order/{orderId}/status")
    public boolean actualizarEstadoDeOrden(@PathVariable Long orderId, 
                                            @RequestParam OrderStatus estado) {
        return adminService.actualizarEstadoDeOrden(orderId, estado);
    }
    
    
  //*************** Metodos para los pagos ***************

    @PostMapping("/payment/{orderId}")
    public PaymentDto realizarPago(@PathVariable Long orderId, 
                                   @RequestParam BigDecimal monto, 
                                   @RequestParam String metodo) {
        return adminService.realizarPago(orderId, monto, metodo);
    }
    
  //-----------------metodo nuevo--------//
    @GetMapping("/payments")
    public List<PaymentDto> listarPagosRealizados() {
        return adminService.listarPagos();
    }

    
    @GetMapping("/payment/{orderId}")
    public PaymentDto obtenerPagoPorOrden(@PathVariable Long orderId) {
        return adminService.obtenerPagoPorOrden(orderId);
    }

    @GetMapping("/payments/{userId}")
    public List<PaymentDto> obtenerPagosPorUsuario(@PathVariable Long userId) {
        return adminService.obtenerPagosPorUsuario(userId);
    }

    //*************** Metodos para el producto ***************

    @PostMapping("/product")
    public ResponseEntity<?> agregarProducto(@ModelAttribute ProductDto productDto) throws IOException {
        boolean success = adminService.agregarProducto(productDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

   @PutMapping("/product/{productId}")
   public ResponseEntity<Void> actualizarProducto(@PathVariable Long productId, 
                                              @ModelAttribute ProductDto productDto) {
       try {
            boolean success = adminService.actualizarProducto(productId, productDto);
            
         if (success) {
               return ResponseEntity.status(HttpStatus.OK).build(); 
           }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    
    @DeleteMapping("/product/{productId}")
    public boolean eliminarProducto(@PathVariable Long productId) {
        return adminService.eliminarProducto(productId);
    }

    @GetMapping("/products/category/{categoriaId}")
    public ResponseEntity<List<ProductDto>> obtenerProductosPorCategoria(@PathVariable Long categoriaId) {
        try {
            List<ProductDto> productos = adminService.obtenerProductosPorCategoria(categoriaId);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/products/search")
    public List<ProductDto> buscarProductos(@RequestParam String nombre, 
                                            @RequestParam String categoriaNombre) {
        return adminService.buscarProductos(nombre, categoriaNombre);
    }
    
  //*************** Metodos para las categorias ***************

    @PostMapping("/category")
    public CategoryDto agregarCategoria(@RequestBody CategoryDto categoryDto) {
        return adminService.agregarCategoria(categoryDto);
    }

    @PutMapping("/category/{categoryId}")
    public boolean actualizarCategoria(@PathVariable Long categoryId, 
                                       @RequestBody CategoryDto categoryDto) {
        return adminService.actualizarCategoria(categoryId, categoryDto);
    }

    @DeleteMapping("/category/{categoryId}")
    public boolean eliminarCategoria(@PathVariable Long categoryId) {
        return adminService.eliminarCategoria(categoryId);
    }

    @GetMapping("/categories")
    public List<CategoryDto> obtenerCategorias() {
        return adminService.obtenerCategorias();
    }

    //*************** Metodos para usuarios ***************

    @GetMapping("/users")
    public List<UserDto> obtenerTodosLosUsuarios() {
        return adminService.obtenerTodosLosUsuarios();
    }

    
    @GetMapping("/user/{userId}")
    public UserDto obtenerUsuario(@PathVariable Long userId) {
        return adminService.obtenerUsuario(userId);
    }

    @PutMapping("/user/{userId}")
    public boolean actualizarUsuario(@PathVariable Long userId, 
                                     @RequestBody UserDto userDto) {
        return adminService.actualizarUsuario(userId, userDto);
    }

    @DeleteMapping("/user/{userId}")
    public boolean eliminarUsuario(@PathVariable Long userId) {
        return adminService.eliminarUsuario(userId);
    }

    //*************** Listado de pendientes ***************

    @GetMapping("/orders/pending")
    public List<OrderDto> obtenerOrdenesPendientes() {
        return adminService.obtenerOrdenesPorUsuario();
    }

    @GetMapping("/payments/pending")
    public List<PaymentDto> obtenerPagosPendientes() {
        return adminService.obtenerPagosPendientes();
    }

    
    //--------------------------------------------------------------------------//
    @GetMapping("/products/low-stock")
    public List<ProductDto> obtenerProductosConBajoStock() {
        return adminService.obtenerProductosConBajoStock();
    }

    @GetMapping("/carts/pending")
    public List<CartDto> obtenerCarritosPendientes() {
        return adminService.obtenerCarritosPendientes();
    }
    
}

