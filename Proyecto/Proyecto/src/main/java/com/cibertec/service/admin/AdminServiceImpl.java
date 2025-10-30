package com.cibertec.service.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.Collections;


import org.springframework.stereotype.Service;

import com.cibertec.dto.CartDto;
import com.cibertec.dto.CartItemDto;
import com.cibertec.dto.CategoryDto;
import com.cibertec.dto.OrderDetailDto;
import com.cibertec.dto.OrderDto;
import com.cibertec.dto.OrderItemDto;
import com.cibertec.dto.PaymentDto;
import com.cibertec.dto.ProductDto;
import com.cibertec.dto.UserDto;
import com.cibertec.entity.Cart;
import com.cibertec.entity.CartItem;
import com.cibertec.entity.Category;
import com.cibertec.entity.Order;
import com.cibertec.entity.OrderItem;
import com.cibertec.entity.Payment;
import com.cibertec.entity.Product;
import com.cibertec.entity.User;
import com.cibertec.enums.OrderStatus;
import com.cibertec.enums.PaymentStatus;
import com.cibertec.repository.CartRepository;
import com.cibertec.repository.CategoryRepository;
import com.cibertec.repository.OrderRepository;
import com.cibertec.repository.PaymentRepository;
import com.cibertec.repository.ProductRepository;
import com.cibertec.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

  //******************** Metodos para el carrito********************************************

    
    @Override
    public CartDto obtenerCarritoPorUsuario(Long userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            CartDto cartDto = cart.getCartDto();
            List<CartItemDto> cartItemsDto = cart.getCartItems().stream()
                .map(CartItem::getCartItemDto)
                .collect(Collectors.toList());
            cartDto.setCartItems(cartItemsDto);
            return cartDto;
        } else {
            
            return null;
        }
    }

    
    @Override
    public boolean agregarProductoACarrito(Long userId, Long productId, int cantidad) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
        	
            // Crear un nuevo carrito si no existe
            cart = new Cart();
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return false;
            }
            cart.setUser(user);
            cart.setFecha(LocalDateTime.now());
            cart = cartRepository.save(cart);
        }

        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            return false;
        }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setCantidad(cantidad);

        cart.getCartItems().add(cartItem);
        cartRepository.save(cart);
        return true;
    }

    
    @Override
    public boolean eliminarProductoDeCarrito(Long cartId, Long productId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            List<CartItem> cartItems = cart.getCartItems();
            cartItems.removeIf(item -> item.getProduct().getId().equals(productId));
            cartRepository.save(cart);
            return true;
        }
        return false;
    }

    
    @Override
    public boolean vaciarCarrito(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.getCartItems().clear();
            cartRepository.save(cart);
            return true;
        }
        return false;
    }

    //******************** Metodos para las orders********************************************

    
    @Override
    public OrderDto crearOrden(Long userId, List<OrderItemDto> items, BigDecimal total) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }

        Order order = new Order();
        order.setUser(user);
        order.setFecha(LocalDateTime.now());
        order.setTotal(total);
        order.setStatus(OrderStatus.PENDIENTE);

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDto itemDto : items) {
            Product product = productRepository.findById(itemDto.getProductId()).orElse(null);
            if (product == null) {
                continue;
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setCantidad(itemDto.getCantidad());
            orderItem.setPrecio(itemDto.getPrecio());
            orderItems.add(orderItem);
        }
        order.setItems(orderItems);
        order = orderRepository.save(order);
        return order.getOrderDto();
    }

    
    @Override
    public List<OrderDto> obtenerOrdenesPorUsuario(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(Order::getOrderDto)
                .collect(Collectors.toList());
    }

    
    @Override
    public OrderDetailDto obtenerDetallesDeOrden(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con ID: " + orderId));

        OrderDetailDto detailDto = new OrderDetailDto();
        detailDto.setId(order.getId());
        detailDto.setUserId(order.getUser().getId());
        detailDto.setUserNombre(order.getUser().getNombre());
        detailDto.setFecha(order.getFecha());
        detailDto.setTotal(order.getTotal());
        detailDto.setStatus(order.getStatus());

        List<OrderItemDto> itemsDto = order.getItems().stream()
                .map(OrderItem::getOrderItemDto)
                .collect(Collectors.toList());
        detailDto.setItems(itemsDto);

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado para la orden"));

        PaymentDto paymentDto = payment.getPaymentDto();
        detailDto.setPagos(Collections.singletonList(paymentDto)); 

        return detailDto;
    }




    
    @Override
    public boolean actualizarEstadoDeOrden(Long orderId, OrderStatus estado) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(estado);
            orderRepository.save(order);
            return true;
        }
        return false;
    }
    
    
  //******************** Metodos para los pagos********************************************

	
	@Override
	public PaymentDto realizarPago(Long orderId, BigDecimal monto, String metodo) {
	    Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Orden no encontrada"));

	    Payment payment = new Payment();
	    payment.setOrder(order);
	    payment.setMonto(monto);
	    payment.setMetodo(metodo);
	    payment.setStatus(PaymentStatus.PENDIENTE);
	    payment.setFecha(LocalDateTime.now());
	    payment = paymentRepository.save(payment);

	    return payment.getPaymentDto();
	}

	//-----------------metodo nuevo--------//

	@Override
	public List<PaymentDto> listarPagos() {
	    List<Payment> pagos = paymentRepository.findAll();
	    return pagos.stream()
	            .map(Payment::getPaymentDto)
	            .collect(Collectors.toList());
	}
	
	@Override
	public PaymentDto obtenerPagoPorOrden(Long orderId) {
	    Payment payment = paymentRepository.findByOrderId(orderId)
	            .orElseThrow(() -> new RuntimeException("Pago no encontrado para la orden"));
	    return payment.getPaymentDto();
	}



	@Override
	public List<PaymentDto> obtenerPagosPorUsuario(Long userId) {
	    List<Payment> payments = paymentRepository.findByUserId(userId);

	    List<PaymentDto> paymentDtos = payments.stream()
	                                            .map(Payment::getPaymentDto)
	                                            .collect(Collectors.toList());
	    return paymentDtos;
	}

	
	//*************Metodos para el producto***************************************:)**
	
	@Override
	public boolean agregarProducto(ProductDto productDto) {
	    try {
	        Product product = new Product();
	        product.setNombre(productDto.getNombre());
	        product.setDescripcion(productDto.getDescripcion());
	        product.setPrecio(productDto.getPrecio());
	        product.setStock(productDto.getStock());
	      
	        if (productDto.getImagen() != null && !productDto.getImagen().isEmpty()) {
	            product.setImagen(productDto.getImagen().getBytes());
	        }

	        Category category = categoryRepository.findById(productDto.getCategoriaId())
	                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
	        product.setCategory(category);

	        productRepository.save(product);
	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

	@Override
	public boolean actualizarProducto(Long productId, ProductDto productDto) {
	    try {
	       
	      Product product = productRepository.findById(productId)
	                                          .orElseThrow(() -> new RuntimeException("Producto no encontrado"));	  
	       product.setNombre(productDto.getNombre());
	        product.setDescripcion(productDto.getDescripcion());
	        product.setPrecio(productDto.getPrecio());
	        product.setStock(productDto.getStock());

	        if (productDto.getImagen() != null && !productDto.getImagen().isEmpty()) {
	            product.setImagen(productDto.getImagen().getBytes());
	        }
	       if (productDto.getCategoriaId() != null) {
	           Category category = categoryRepository.findById(productDto.getCategoriaId())
	                                               .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
	            product.setCategory(category);
	        }	      
	       productRepository.save(product);
	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	   }
	}


	@Override
	public boolean eliminarProducto(Long productId) {
	    Product product = productRepository.findById(productId)
	                                       .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
	    productRepository.delete(product);
	    return true;
	}

	@Override
	public List<ProductDto> obtenerProductosPorCategoria(Long categoriaId) {
	    List<Product> products = productRepository.findByCategoryId(categoriaId);

	    return products.stream()
	                   .map(Product::getProductDto)
	                   .collect(Collectors.toList());
	} 

	@Override
	public List<ProductDto> buscarProductos(String nombre, String categoriaNombre) {
	    List<Product> products = productRepository.findByNombreContainingAndCategoryNombreContaining(nombre, categoriaNombre);

	    return products.stream()
	                   .map(Product::getProductDto)
	                   .collect(Collectors.toList());
	}


	
	//******************** Metodos para las categorias********************************************zzz
	
	@Override
	public CategoryDto agregarCategoria(CategoryDto categoryDto) {
	    Category category = new Category();
	    category.setNombre(categoryDto.getNombre());

	    category = categoryRepository.save(category);

	    return category.getCategoryDto();
	}

	@Override
	public boolean actualizarCategoria(Long categoryId, CategoryDto categoryDto) {
	    Category category = categoryRepository.findById(categoryId).orElse(null);

	    if (category != null) {
	        category.setNombre(categoryDto.getNombre());

	        categoryRepository.save(category);
	        return true;
	    }
	    return false;
	}

	@Override
	public boolean eliminarCategoria(Long categoryId) {
	    Category category = categoryRepository.findById(categoryId).orElse(null);

	    if (category != null) {
	        categoryRepository.delete(category);
	        return true;
	    }
	    return false;
	}

	@Override
	public List<CategoryDto> obtenerCategorias() {
	    List<Category> categories = categoryRepository.findAll();

	    return categories.stream()
	            .map(Category::getCategoryDto)
	            .collect(Collectors.toList());
	}

	
	//******************** Metodos para usuarios********************************************
	@Override
	public List<UserDto> obtenerTodosLosUsuarios() {
	   
	    List<User> usuarios = userRepository.findAll();
	    
	   
	    List<UserDto> usuariosDto = new ArrayList<>();
	    for (User user : usuarios) {
	        UserDto dto = new UserDto();
	        dto.setId(user.getId());
	        dto.setNombre(user.getNombre());
	        dto.setEmail(user.getEmail());
	        usuariosDto.add(dto);
	    }
	    
	    return usuariosDto;  
	}
	
	@Override
	public UserDto obtenerUsuario(Long userId) {
	    User user = userRepository.findById(userId).orElse(null);
	    if (user != null) {
	        UserDto userDto = new UserDto();
	        userDto.setId(user.getId());
	        userDto.setNombre(user.getNombre());
	        userDto.setEmail(user.getEmail());
	        return userDto;
	    }
	    return null;  
	}


	@Override
	public boolean actualizarUsuario(Long userId, UserDto userDto) {
	    User user = userRepository.findById(userId).orElse(null);
	    if (user != null) {
	        user.setNombre(userDto.getNombre());
	        user.setEmail(userDto.getEmail());
	        userRepository.save(user);  
	        return true;
	    }
	    return false;  
	}


	@Override
	public boolean eliminarUsuario(Long userId) {
	    User user = userRepository.findById(userId).orElse(null);
	    if (user != null) {
	        userRepository.delete(user);  
	        return true;
	    }
	    return false;  
	}

	
	
	//******************** Listado de pendientes********************************************

	@Override
	public List<OrderDto> obtenerOrdenesPorUsuario() {
	    List<Order> orders = orderRepository.findByStatus(OrderStatus.PENDIENTE);
	    List<OrderDto> orderDtos = new ArrayList<>();
	    for (Order order : orders) {
	        orderDtos.add(order.getOrderDto());
	    }
	    return orderDtos;
	}


	@Override
	public List<PaymentDto> obtenerPagosPendientes() {
	    List<Payment> payments = paymentRepository.findByStatus(PaymentStatus.PENDIENTE);
	    List<PaymentDto> paymentDtos = new ArrayList<>();
	    for (Payment payment : payments) {
	        paymentDtos.add(payment.getPaymentDto());
	    }
	    return paymentDtos;
	}



	@Override
	public List<ProductDto> obtenerProductosConBajoStock() {       // numero que indica sotck bajo
	    List<Product> products = productRepository.findByStockLessThan(2); 
	    List<ProductDto> productDtos = new ArrayList<>();
	    for (Product product : products) {
	        productDtos.add(product.getProductDto());
	    }
	    return productDtos;
	}


	@Override
	public List<CartDto> obtenerCarritosPendientes() {                           //carrito de la semana
	    List<Cart> carts = cartRepository.findByFechaAfter(LocalDateTime.now().minusDays(7)); 
	    List<CartDto> cartDtos = new ArrayList<>();
	    for (Cart cart : carts) {
	        cartDtos.add(cart.getCartDto());
	    }
	    return cartDtos;
	}
	
	


	



    
}

