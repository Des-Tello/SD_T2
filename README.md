# SD_T2

## Servicio
Para poder levantar todos los servicios haremos uso del comando:
```sh
docker-compose up --build
```

## Peticiones
### POST
#### Registro miembro
La peticion para poder enviar un postulante al servidor debe ser enviada de la siguiente manera
```sh
http://localhost:3000/server?accion=registro%20miembro
```
```json
{
    "Nombre": "usuario5",
    "Apellido": "apellido5",
    "Rut": "12345678-1",
    "Correo": "usuario5@mail.udp.cl",
    "Patente": "3",
    "Premium": 1
}
```
Para poder aceptar a los miembros que se hayan postulado enviaremos el siguiente json
```json
[{
	"patente": 321,
	"aceptado": "0"
},
{
	"patente": 123,
	"aceptado": "0"
},
{
	"patente": 2,
	"aceptado": "0"
},
{
	"patente": 1,
	"aceptado": "1"
},
{
	"patente": 3,
	"aceptado": "1"
}]
```
A la misma ruta del servidor, sin agregar ninguna query

#### Registro venta
Para poder registrar una venta, debemos realizar peticiones a la siguiente url:
```sh
http://localhost:3000/server?accion=registro%20venta
```
Con un json de la siguiente forma:
```json
{
    "Cliente": "cliente66",
    "Cantidad_de_sopaipillas": 32,
    "Stock_restante": 42,
    "Ubicacion_carrito": "(1,3)",
    "Patente": "123"
}
```
#### Denuncia profugo
Para poder denunciar un carrito profugo, debemos dirigir las consultas a la siguiente url:
```sh
http://localhost:3000/server?accion=denuncia%20profugo
```
Con json simples de la forma:
```json
{
    "Coordenadas":"(6,1)"
}
```
### GET
#### Lista de postulantes
Para poder aceptar postulantes, debemos saber antes quienes se han postulados, para esto nos dirigiremos a la siguiente url:
```sh
http://localhost:5003/lista
```
#### Procesamiento ventas diarias
Para poder saber en detalle los numeros que manejan los miembros del gremio de sopaipilleros, en termino de promedio de ventas, el total de venta y los clientes totales que maneja cada uno, debemos dirigirnos a la siguiente url:
```sh
http://localhost:5000/ventas-diarias
```
## Video
El siguiente video recorre las carpetas utilizadas para simular el motor de busqueda que solicita la tarea, breve explicación del docker-compose y los contenedores que este levanta. 
Finalmente se hace una prueba a uno de los servicios de redis, especificamente el que tiene la politica de LRU configurada.

<div style="text-align:center">
<a href="https://drive.google.com/file/d/1LQv0tc2ccAHVXz33j5_tMLUp2abaTp1d/view?usp=share_link"><img src="https://i.morioh.com/2019/11/18/52dc748d7db2.jpg" align="left" height="50%" width="50%" ></a>
</div>
