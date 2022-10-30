# SD_T2

## Servicio
Para poder levantar todos los servicios haremos uso del comando:
```sh
docker-compose up --build
```

## Peticiones
### POST
La peticion para poder enviar un postulante al servidor debe ser enviada de la siguiente manera
```sh
http://localhost:3000/server?accion=registro%20miembro
```

## Video
El siguiente video recorre las carpetas utilizadas para simular el motor de busqueda que solicita la tarea, breve explicación del docker-compose y los contenedores que este levanta. 
Finalmente se hace una prueba a uno de los servicios de redis, especificamente el que tiene la politica de LRU configurada.

<div style="text-align:center">
<a href="https://drive.google.com/file/d/1LQv0tc2ccAHVXz33j5_tMLUp2abaTp1d/view?usp=share_link"><img src="https://i.morioh.com/2019/11/18/52dc748d7db2.jpg" align="left" height="50%" width="50%" ></a>
</div>
