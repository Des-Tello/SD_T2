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

const producer = kafka.producer();

app.post("/login", async (req, res) => {
    mensaje = req.query.a
    console.log("Topico escogido: ",mensaje);
    await producer.connect();
    if(mensaje == "ventas"){
        await producer.send({
            topic: 'ventas',
            messages: [{value: JSON.stringify(mensaje)}]
        })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }else if (mensaje == "coordenadas"){
        await producer.send({
            topic: 'coordenadas',
            messages: [{value: JSON.stringify(mensaje)}]
        })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }else if(mensaje == "stock"){
        await producer.send({
            topic: 'stock',
            messages: [{value: JSON.stringify(mensaje)}]
        })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }else if(mensaje == "nuevos miembros"){
        await producer.send({
            topic: 'stock',
            messages: [{value: JSON.stringify(mensaje)}]
        })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});