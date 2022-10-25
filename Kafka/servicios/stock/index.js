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
var i = 1;
var cola_consultas = [];
const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba3', fromBeginning: true});
    await consumer.connect();
    await consumer.subscribe({ topic: 'stock',  fromBeginning: true });


    await consumer.run({
        partitionsConsumedConcurrently: 2,
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            if (message.value){
                var data = JSON.parse(message.value.toString());                
                console.log("Mensaje recibido en el topico de stock")
                console.log(partition)
                // cola_consultas.push(data)
                // if(i == 5){
                //     cola_consultas.forEach(function(consulta) {
                //         console.log("Consulta: ",consulta)
                //     });
                //     cola_consultas = [];
                //     i = 0;
                // }
                // i++;
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