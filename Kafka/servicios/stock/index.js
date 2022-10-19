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
    const consumer = kafka.consumer({ groupId: 'prueba3', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'stock' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value){
                var data = JSON.parse(message.value.toString());
                console.log("Mensaje recibido en el topico: ",data)
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