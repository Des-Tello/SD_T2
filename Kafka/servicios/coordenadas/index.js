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
var i = 0
var coordenadas = ''
var patente = 0
const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba2', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'coordenadas' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message){
                if(partition == 0){
                    if(message.key.toString() == "coordenadas"){
                        coordenadas = JSON.parse(message.value.toString())
                        i++;
                    }
                    if(message.key.toString() == "patente"){
                        patente = JSON.parse(message.value.toString())
                        i++;
                    }
                    if(i == 2){
                        console.log("Posicion del carrito: ")
                        console.log("Patente: ",patente)
                        console.log("Coordenadas: ",coordenadas)
                        i = 0;
                    }
                }
                else if(partition == 1){
                    console.log("Posicion carrito profugo: ")
                    coordenadas = JSON.parse(message.value.toString())
                    console.log("Coordenadas: ", coordenadas.Coordenadas)
                }
            }
        },
      })
}

app.get("/blocked", async (req, res) => {
    res.status(200).json({"users-blocked": black_list});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});