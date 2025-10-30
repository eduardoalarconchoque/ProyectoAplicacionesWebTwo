package com.cibertec.controller;

import com.cibertec.dto.*;
import com.cibertec.service.customer.*;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // Obtener los productos
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = customerService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/categorias")
    public List<CategoryDto> obtenerCategorias() {
        return customerService.obtenerCategorias();
    }

    // Buscar productos por nombre o categoría
    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> searchProducts(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long categoriaId) {
        List<ProductDto> products = customerService.searchProducts(nombre, categoriaId);
        return ResponseEntity.ok(products);
    }
    
    
    
    @PostMapping("/createCart")
    public ResponseEntity<?> createCart(@RequestParam Long userId) {
        boolean created = customerService.createCart(userId);
        if (created) {
            // Retornar un JSON plano en vez de un string simple
            return ResponseEntity.ok(Map.of("message", "Carrito creado exitosamente"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Carrito ya existe o usuario inválido"));
        }
    }


 
    
 // Agregar producto al carrito
    @PostMapping("/cart/{userId}/add/{productId}")
    public ResponseEntity<Void> addToCart(@PathVariable Long userId, @PathVariable Long productId, @RequestParam int cantidad) {
        boolean added = customerService.addToCart(userId, productId, cantidad);
        if (added) {
            return ResponseEntity.status(HttpStatus.CREATED).build(); 
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); 
        }
    }
    

    // Obtener articulos del carrito de un usuario
    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<CartItemDto>> getCartItems(@PathVariable Long userId) {
        List<CartItemDto> cartItems = customerService.getCartItems(userId);
        System.out.println("Cart Items from Service: " + cartItems);
        return ResponseEntity.ok(cartItems);
    }

    
    // Eliminar articulo del carrito
    @DeleteMapping("/cart/item/{cartItemId}")
    public ResponseEntity<Map<String, String>> removeCartItem(@PathVariable Long cartItemId) {
        Map<String, String> response = new HashMap<>();
        
        if (customerService.removeCartItem(cartItemId)) {
            response.put("message", "Artículo eliminado del carrito");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Error al eliminar el artículo");
            return ResponseEntity.badRequest().body(response); 
        }
    }
    
    
    //------PARA SUMAR EL TOTAL DE PRECIO-------------//
    @GetMapping("/total/{userId}")
    public ResponseEntity<TotalCartDto> obtenerTotal(@PathVariable Long userId) {
        TotalCartDto totalDto = customerService.obtenerTotalCarritoPorUsuario(userId);
        return ResponseEntity.ok(totalDto);
    }
    

    // Crear un pedido a partir del carrito
    @PostMapping("/order/{userId}")
    public ResponseEntity<Map<String, String>> createOrderFromCart(@PathVariable Long userId) {
        boolean created = customerService.createOrderFromCart(userId);

        Map<String, String> response = new HashMap<>();
        if (created) {
            response.put("mensaje", "Pedido creado con éxito");
            return ResponseEntity.ok(response);
        } else {
            response.put("mensaje", "Error al crear el pedido");
            return ResponseEntity.badRequest().body(response);
        }
    }

    
    // Obtener todos las ordenes 
    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDto> orders = customerService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    
    // Obtener detalles de un pedido
    @GetMapping("/order/{orderId}/user/{userId}")
    public ResponseEntity<OrderDetailDto> getOrderDetail(@PathVariable Long orderId, @PathVariable Long userId) {
        OrderDetailDto orderDetail = customerService.getOrderDetail(orderId, userId);
        return orderDetail != null ? ResponseEntity.ok(orderDetail) : ResponseEntity.notFound().build();
    }
    

    // Pagar un pedido
    @PostMapping("/order/{userId}/pay/{orderId}")
    public ResponseEntity<Map<String, String>> payOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId,
            @RequestBody PaymentDto paymentDto) {

        boolean paid = customerService.payOrder(userId, orderId, paymentDto);
        
        if (paid) {
            return ResponseEntity.ok(Map.of("mensaje", "Pedido pagado con éxito")); 
        } else {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Error al pagar el pedido")); 
        }
    }

    // Obtener todos los pagos
    @GetMapping("/payments/{userId}")
    public ResponseEntity<List<PaymentDto>> getPaymentsByUserId(@PathVariable Long userId) {
        List<PaymentDto> payments = customerService.getPaymentsByUserId(userId);
        return ResponseEntity.ok(payments);
    }
    
}
