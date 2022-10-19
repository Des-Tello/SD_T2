CREATE TABLE miembros(nombre VARCHAR(255), apellido VARCHAR(255), rut VARCHAR(255), correo VARCHAR(255), patente VARCHAR(255), registro_premium BOOLEAN);

INSERT INTO miembros(nombre, apellido, rut, correo, patente, registro_premium) VALUES ('Rodrigo','Órdenes','111-1','rodrigo@mail.com', 'XXX1', true);
INSERT INTO miembros(nombre, apellido, rut, correo, patente, registro_premium) VALUES ('Benjamin','Tello','222-2','benjamin@mail.com', 'XXX2', true);

CREATE TABLE ventas(numero_venta SERIAL PRIMARY KEY, cliente VARCHAR(255), cantidad_sopaipillas INT, hora VARCHAR(255), stock_restante INT, ubicacion_carrito VARCHAR(255));

INSERT INTO ventas(cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito) VALUES ('Gabriel', 3, '13:30', '23', 'La Pintana');
INSERT INTO ventas(cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito) VALUES ('Lukas', 1, '11:30', '45', 'Renca');