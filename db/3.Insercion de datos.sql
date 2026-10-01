-- Administrador inicial.
-- La contraseña real es 1234 y se almacena únicamente como hash bcrypt con 8 saltos.
INSERT INTO administrador (usuario, contrasena)
VALUES (
    'Frankcode',
    '$2b$08$9ZK1HIycaI2bWT4WgV3oduQhpRmcBdWtx2EZbPb8UhNnxHX0c56zK'
);

INSERT INTO producto (identificador_producto, modelo_producto, precio, stock, categoria) VALUES
(1, 'Galaxy A15', 249.99, 15, 'celular'),
(2, 'iPhone 15', 799.99, 10, 'celular'),
(3, 'Redmi Note 13', 299.99, 20, 'celular'),
(4, 'Motorola Edge 40', 449.99, 12, 'celular'),
(5, 'Pixel 8', 699.99, 8, 'celular'),
(6, 'Lenovo IdeaPad 3', 599.99, 7, 'laptop'),
(7, 'HP Pavilion 15', 749.99, 9, 'laptop'),
(8, 'Dell Inspiron 15', 699.99, 6, 'laptop'),
(9, 'ASUS VivoBook 15', 649.99, 11, 'laptop'),
(10, 'Acer Aspire 5', 579.99, 13, 'laptop'),
(11, 'LG UltraGear 24', 229.99, 10, 'monitor'),
(12, 'Samsung Odyssey G5', 349.99, 5, 'monitor'),
(13, 'AOC 24G2', 199.99, 14, 'monitor'),
(14, 'ASUS ProArt 27', 429.99, 4, 'monitor'),
(15, 'BenQ GW2780', 189.99, 16, 'monitor'),
(16, 'Redragon Kumara K552', 39.99, 25, 'teclado'),
(17, 'Logitech G213', 59.99, 18, 'teclado'),
(18, 'Corsair K55 RGB', 69.99, 12, 'teclado'),
(19, 'HyperX Alloy Core', 49.99, 20, 'teclado'),
(20, 'Razer BlackWidow V3', 99.99, 8, 'teclado'),
(21, 'Logitech G203', 29.99, 30, 'mouse'),
(22, 'Razer DeathAdder Essential', 34.99, 22, 'mouse'),
(23, 'Redragon M711', 39.99, 18, 'mouse'),
(24, 'HP X1000', 19.99, 25, 'mouse'),
(25, 'Microsoft Bluetooth Mouse', 24.99, 15, 'mouse'),
(26, 'Sony WH-1000XM5', 349.99, 6, 'audifonos'),
(27, 'JBL Tune 760NC', 89.99, 14, 'audifonos'),
(28, 'AirPods Pro 2', 249.99, 9, 'audifonos'),
(29, 'HyperX Cloud II', 79.99, 17, 'audifonos'),
(30, 'Logitech G435', 59.99, 13, 'audifonos');

SELECT setval(
    pg_get_serial_sequence('producto', 'identificador_producto'),
    COALESCE((SELECT MAX(identificador_producto) FROM producto), 1),
    true
);
