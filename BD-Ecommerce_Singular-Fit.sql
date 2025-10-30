DROP DATABASE IF EXISTS Ecommerce_proyecto;
CREATE DATABASE Ecommerce_proyecto;
USE Ecommerce_proyecto;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('CUSTOMER', 'ADMINISTRATOR') DEFAULT 'CUSTOMER'
);

CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    imagen LONGBLOB,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO') DEFAULT 'PENDIENTE',
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE order_items (
    item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE carts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    status ENUM('COMPLETADO', 'PENDIENTE', 'FALLIDO') DEFAULT 'PENDIENTE',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO users (nombre, email, password, role) VALUES 
('admin1', 'admin1@correo.com', '$2a$10$4aMFkZ5MgSH2EmrXg48cpuVvVAtQ2uulfDBV.55lJ19s6QsBCZ8W.', 'ADMINISTRATOR'), -- adminpass123
('cliente1', 'cliente1@correo.com', '$2a$10$At/rZZ2lXMMTwORaWl20nutCn8LiaqW3RQ8cEeP3QzKdKvA1IogpO', 'CUSTOMER'), -- cliente123
('cliente2', 'cliente2@correo.com', '$2a$10$Snbpsm6uZpUHTJb45oMoS.kE80MLVwnDZKX2bqMy3xh6QCZnhPswi', 'CUSTOMER'); -- cliente456


INSERT INTO categories (nombre) VALUES 
('Polos'),
('Camisas'),
('Casacas'),
('Jeans'),
('Zapatillas');


-- mostrar tablas
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM users;
SELECT * FROM carts;
SELECT * FROM cart_items;
SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM payments;



