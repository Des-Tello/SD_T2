const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs')
const readline = require("readline");


const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

var cola_miembrosP = [];
var cola_miembrosNP = [];

const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba4', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'nuevos_miembros' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value){
                var miembro = JSON.parse(message.value.toString());
                console.log("Miembro: ", miembro)    
                console.log("¿Es premium? ", partition)
                if(partition == 0){
                    cola_miembrosNP.push(miembro)
                }
                if(partition == 1){
                    cola_miembrosP.push(miembro)
                }
            }
        },
      })
}


app.post("/miembros", async (req, res) => {
    mensaje = req.body
    mensaje.forEach(function(miembros) {
        console.log("Posible miembro:",miembros.patente)
    });

    cola_miembrosP.forEach(function(miembros) {
        console.log("Posible miembro:",miembros)
        
    });
    cola_miembrosNP.forEach(function(miembro) {
        console.log("Posible miembro:",miembro)
        
    });
    res.status(200).json({Mensaje: "Hecho"});
    cola_miembrosP = [];
    cola_miembrosNP = [];
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});