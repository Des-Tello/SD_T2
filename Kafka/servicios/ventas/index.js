const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs')

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba1', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'ventas' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Funciona de manera asincrionica guardando datos en la base de datos
            if (message.value){
                var data = JSON.parse(message.value.toString());
                console.log("Mensaje recibido en el topico ventas: ",data)
                // Variables para agregar a la base de datos
                var cliente = data.Cliente
                var cantSopaipillas = data.Cantidad_de_sopaipillas
                var hora = data.Hora
                var stock = data.Stock_restante
                var ubicacion = data.Ubicacion_carrito
                var patente = data.Patente
            }
        },
      })
}

app.get("/ventas-diarias", async (req, res) => {
    // Si ingreso a esta dirección debo realizar las consultas en la base de datos
    // Ventas totales: Calculando el numero de ventas que tengo en la tabla Ventas
    // Promedio: Calculo el numero de clientes distintos y divido las ventas totales
    // Clientes totales: Guardo todos los valores distintos, comparandolos con el atributo Cliente
    
    let ventas_diarias = {
        "Ventas_totales": ventas_totales,
        "Promedio": promedio,
        "Clientes_totales": clientes_totales
    }
    res.status(200).json({"ventas_diarias": ventas_diarias});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});