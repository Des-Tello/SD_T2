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
var i = 0;
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
                
                if(parseInt(data.Stock_restante) <= 20){
                    cola_consultas.push(data)
                    i++;
                }

                if(i == 5){
                        console.log("PRECAUCION")
                        console.log("Entre las ultimas ventas, hay 5 que tienen un stock preocupante")
                        cola_consultas.forEach(function(consulta) {
                            console.log("Consulta: ",consulta)
                        });
                        cola_consultas = [];
                        i = 0;
                    }
                    
                
            }
        },
      })
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});