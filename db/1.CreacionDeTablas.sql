CREATE TABLE administrador (
    identificador INT,
    usuario VARCHAR(15),
    contrasena VARCHAR(60)
);

CREATE TABLE producto (
    identificador_producto INT,
    modelo_producto VARCHAR(100),
    precio DECIMAL(10, 2),
    stock INT,
    categoria VARCHAR(20),
    imagen_url TEXT
);
