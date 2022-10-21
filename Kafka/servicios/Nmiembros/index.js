const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs')
const prompt = require('prompt-sync')();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});

var cola_miembros = [];
const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba4', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'nuevos_miembros' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value){
                var data = JSON.parse(message.value.toString());
                console.log("Valor: ", data)               
            }
        },
      })
}


app.post("/miembros", async (req, res) => {
    cola_miembros.forEach(function(numero) {
        console.log("Posible miembro:",numero)
        // let input = prompt("Desea agregar el miembro [SI - NO]")
        // if(input == "SI"){
        //     console.log('agregado')
        //     // Se agrega a la base de datos
        // }
    });
    res.status(200).json({Mensaje: "Hecho"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});