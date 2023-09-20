CREATE DATABASE sae;
USE sae;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
);

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `fecha_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(20) DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
);


CREATE TABLE `productos_pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `productos_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `productos_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
);




INSERT INTO usuarios (nombre, correo, contrasena, direccion)
VALUES
    ('Usuario1', 'usuario1@example.com', 'contraseña1', 'Dirección1'),
    ('Usuario2', 'usuario2@example.com', 'contraseña2', 'Dirección2'),
    ('Usuario3', 'usuario3@example.com', 'contraseña3', 'Dirección3'),
    ('Usuario4', 'usuario4@example.com', 'contraseña4', 'Dirección4'),
    ('Usuario5', 'usuario5@example.com', 'contraseña5', 'Dirección5');

INSERT INTO productos (nombre, descripcion, precio, stock)
VALUES
    ('Producto1', 'Descripción del Producto1', 10.99, 100),
    ('Producto2', 'Descripción del Producto2', 14.99, 75),
    ('Producto3', 'Descripción del Producto3', 19.99, 50),
    ('Producto4', 'Descripción del Producto4', 8.99, 120),
    ('Producto5', 'Descripción del Producto5', 12.99, 90);


INSERT INTO carrito (usuario_id, producto_id, cantidad)
VALUES
    (1, 1, 3),  
    (2, 3, 2),  
    (3, 2, 1),  
    (4, 4, 4),  
    (5, 5, 2);  

INSERT INTO pedidos (usuario_id, fecha_pedido, estado)
VALUES
    (1, NOW(), 'Pendiente'),  
    (3, NOW(), 'Pendiente'),  
    (5, NOW(), 'Pendiente')
    (2, NOW(), 'Pendiente'); 


INSERT INTO productos_pedidos (pedido_id, producto_id, cantidad)
VALUES
    (1, 1, 3),  
    (1, 3, 2),  
    (2, 2, 1),  
    (3, 4, 4),  
    (3, 5, 2);  

