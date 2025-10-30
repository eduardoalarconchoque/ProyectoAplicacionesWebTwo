package com.cibertec.service.customer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cibertec.dto.CartDto;
import com.cibertec.dto.CartItemDto;
import com.cibertec.dto.CategoryDto;
import com.cibertec.dto.OrderDetailDto;
import com.cibertec.dto.OrderDto;
import com.cibertec.dto.OrderItemDto;
import com.cibertec.dto.PaymentDto;
import com.cibertec.dto.ProductDto;
import com.cibertec.dto.TotalCartDto;
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
import com.cibertec.repository.CartItemRepository;
import com.cibertec.repository.CartRepository;
import com.cibertec.repository.CategoryRepository;
import com.cibertec.repository.OrderItemRepository;
import com.cibertec.repository.OrderRepository;
import com.cibertec.repository.PaymentRepository;
import com.cibertec.repository.ProductRepository;
import com.cibertec.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CartRepository cartRepository;
    
    private final CartItemRepository cartItemRepository;
    
    private final ProductRepository productRepository;
    
    private final OrderRepository orderRepository;
    
    private final OrderItemRepository orderItemRepository;
    
    private final PaymentRepository paymentRepository;

    private final CategoryRepository categoryRepository;
    
    private final UserRepository userRepository;

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(Product::getProductDto)
                .collect(Collectors.toList());
    }
    
    
    
    @Override
	public List<CategoryDto> obtenerCategorias() {
	    List<Category> categories = categoryRepository.findAll();
	    return categories.stream()
	            .map(Category::getCategoryDto)
	            .collect(Collectors.toList());
	}

    @Override
    public List<ProductDto> searchProducts(String nombre, Long categoriaId) {
        List<Product> products;
        if (nombre != null && categoriaId != null) {
            products = productRepository.findByNombreContainingIgnoreCaseAndCategoryId(nombre, categoriaId);
        } else if (nombre != null) {
            products = productRepository.findByNombreContainingIgnoreCase(nombre);
        } else if (categoriaId != null) {
            products = productRepository.findByCategoryId(categoriaId);
        } else {
            products = productRepository.findAll();
        }
        return products.stream()
                .map(Product::getProductDto)
                .collect(Collectors.toList());
    }
    
    
    @Override
    public boolean createCart(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId); 
        if (optionalUser.isEmpty()) {
            return false; 
        }

        User user = optionalUser.get();
        
        // Verificar si ya existe un carrito para este usuario
        if (cartRepository.existsByUser(user)) {
            return false; // Si el carrito ya existe
        }

        // Crear un carrito nuevo
        Cart cart = new Cart();
        cart.setUser(user); 
        cart.setFecha(LocalDateTime.now()); 
        
        cartRepository.save(cart); // Guardar el carrito en la base de datos
        return true; // Retornar true si el carrito fue creado exitosamente
    }


    
    
    
    @Override
    public boolean addToCart(Long userId, Long productId, int cantidad) {
        if (cantidad <= 0) {
            return false; 
        }

        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
        if (cartOptional.isEmpty()) {
            return false; // retornfalse si no hya carrito
        }

        Cart cart = cartOptional.get();

        // busca el producto en el carrito
        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        if (existingItem.isPresent()) {
            // si ya esta solo aumenta la cantidad
            CartItem cartItem = existingItem.get();
            cartItem.setCantidad(cartItem.getCantidad() + cantidad);
            cartItemRepository.save(cartItem);
        } else {
            // no esta agrega el producto
            Optional<Product> productOptional = productRepository.findById(productId);
            if (productOptional.isEmpty()) {
                return false; 
            }

            Product product = productOptional.get();
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setCantidad(cantidad);
            cartItemRepository.save(newItem);
        }

        return true;
    }
    
    
    
    @Override
    public List<CartItemDto> getCartItems(Long userId) {
        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
        if (cartOptional.isPresent()) {
            List<CartItem> cartItems = cartItemRepository.findByCartId(cartOptional.get().getId());
            return cartItems.stream()
                    .map(CartItem::getCartItemDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    
    
    @Override
    public boolean removeCartItem(Long cartItemId) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isPresent()) {
            cartItemRepository.delete(cartItemOptional.get());
            return true;
        }
        return false;
    }

    //PARA SUMAR LOS PRECIOS -------//
    
    @Override
	public TotalCartDto obtenerTotalCarritoPorUsuario(Long userId) {
		 Cart cart = cartRepository.findByUserId(userId)
	                .orElseThrow(() -> new RuntimeException("No se encontró el carrito del usuario"));

	        BigDecimal total = cart.getCartItems().stream()
	                .map(item -> {
	                    Product product = item.getProduct();
	                    BigDecimal precio = product.getPrecio();
	                    return precio.multiply(BigDecimal.valueOf(item.getCantidad()));
	                })
	                .reduce(BigDecimal.ZERO, BigDecimal::add);

	        return new TotalCartDto(cart.getId(), userId, total);
	}
    
    
    
    //-----------------crear orden -----------------//
    
    @Override
    public boolean createOrderFromCart(Long userId) {
        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
            if (!cartItems.isEmpty()) {
                Order order = new Order();
                order.setUser(cart.getUser());
                order.setFecha(LocalDateTime.now());
                order.setTotal(cartItems.stream()
                        .map(item -> item.getProduct().getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add));
                order.setStatus(OrderStatus.PENDIENTE);
                orderRepository.save(order);

              
                for (CartItem cartItem : cartItems) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setCantidad(cartItem.getCantidad());
                    orderItem.setPrecio(cartItem.getProduct().getPrecio());
                    orderItemRepository.save(orderItem);
                }

                // Limpiar el carrito después de crear el pedido
                cartItemRepository.deleteAll(cartItems);
                return true;
            }
        }
        return false;
    }

    
    @Override
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(Order::getOrderDto)
                .collect(Collectors.toList());
    }
    

    @Override
    public OrderDetailDto getOrderDetail(Long orderId, Long userId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent() && orderOptional.get().getUser().getId().equals(userId)) {
            Order order = orderOptional.get();
            List<OrderItemDto> items = orderItemRepository.findByOrderId(order.getId()).stream()
                    .map(OrderItem::getOrderItemDto)
                    .collect(Collectors.toList());
            List<PaymentDto> payments = paymentRepository.findByUserId(userId).stream()
                    .map(Payment::getPaymentDto)
                    .collect(Collectors.toList());

            OrderDetailDto orderDetail = new OrderDetailDto();
            orderDetail.setId(order.getId());
            orderDetail.setUserId(order.getUser().getId());
            orderDetail.setUserNombre(order.getUser().getNombre());
            orderDetail.setFecha(order.getFecha());
            orderDetail.setTotal(order.getTotal());
            orderDetail.setStatus(order.getStatus());
            orderDetail.setItems(items);
            orderDetail.setPagos(payments);

            return orderDetail;
        }
        return null;
    }

    @Override
    public boolean payOrder(Long userId, Long orderId, PaymentDto paymentDto) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent() && orderOptional.get().getUser().getId().equals(userId)) {
            Order order = orderOptional.get();
            Payment payment = new Payment();
            payment.setUser(order.getUser());
            payment.setOrder(order);
            payment.setMonto(paymentDto.getMonto());
            payment.setMetodo(paymentDto.getMetodo());
            payment.setStatus(PaymentStatus.COMPLETADO);
            payment.setFecha(LocalDateTime.now());
            paymentRepository.save(payment);

            // Actualizar el estado del pedido a "PAGADO"
            order.setStatus(OrderStatus.ENVIADO);
            orderRepository.save(order);

            return true;
        }
        return false;
    }

    @Override
    public List<PaymentDto> getPaymentsByUserId(Long userId) {
        List<Payment> payments = paymentRepository.findByUserId(userId);
        return payments.stream()
                .map(Payment::getPaymentDto)
                .collect(Collectors.toList());
    }
}

