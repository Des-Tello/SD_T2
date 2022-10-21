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

app.post("/server", async (req, res) => {
    topico = req.query.accion
    accion = req.query.accion
    mensaje = req.body
    // mensaje = req.query.mensaje
    console.log("Topico escogido: ",topico);
    await producer.connect();
    // Cualquiera sea mi acción debo enviarla al topico correspondiente y tambien al topico de stock
    if(accion == "registro miembro"){
        // Recibo un json con los datos de un posible miembro y lo envio al topico nuevos_miembros
        const topicMessages = [
            {
                // Registro el posible nuevo miembro
                topic: 'nuevos_miembros',
                messages: [{value: JSON.stringify(mensaje)}]
            },
            {
                // Stock debe estar leyendo constantes consultas
                topic: 'stock',
                messages: [{value: JSON.stringify(mensaje)}]
            }
        ]
        
        await producer.sendBatch({ topicMessages })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }
    else if(accion == "registro venta"){
        const topicMessages = [
            {
                // Registro la venta
                topic: 'ventas',
                messages: [{value: JSON.stringify(mensaje)}]
            },
            {
                // Stock debe estar leyendo constantes consultas
                topic: 'stock',
                messages: [{value: JSON.stringify(mensaje)}]
            },
            {
                topic: 'coordenadas',
                messages: [{value: JSON.stringify(mensaje.Ubicacion_carrito)}]
            }
        ]
        // Recibo un json con los datos de una venta y lo envio al tipico ventas
        await producer.sendBatch({ topicMessages })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }
    else if(accion == "denuncia profugo"){
        const topicMessages = [
            {
                topic: 'coordenadas',
                messages: [{value: JSON.stringify(mensaje)}]
            },
            {
                // Stock debe estar leyendo constantes consultas
                topic: 'stock',
                messages: [{value: JSON.stringify(mensaje)}]
            } 
        ]
        // Recibe y envia coordenadas al topico de las coordenadas en otra particion, aun no se como hacer eso asi que lo envio ahi nomas
        await producer.sendBatch({ topicMessages })
        await producer.disconnect().then(
            res.status(200).json({
                Mensaje: "Listo",
            })
        )
    }


    // if(topico == "ventas"){
    //     venta = req.body
    //     console.log(venta)
    //     await producer.send({
    //         topic: 'ventas',
    //         messages: [{value: JSON.stringify(venta)}]
    //     })
    //     await producer.disconnect().then(
    //         res.status(200).json({
    //             Mensaje: "Listo",
    //         })
    //     )
    // }else if (topico == "coordenadas"){
    //     await producer.send({
    //         topic: 'coordenadas',
    //         messages: [{value: JSON.stringify(mensaje)}]
    //     })
    //     await producer.disconnect().then(
    //         res.status(200).json({
    //             Mensaje: "Listo",
    //         })
    //     )
    // }else if(topico == "stock"){
    //     await producer.send({
    //         topic: 'stock',
    //         messages: [{value: JSON.stringify(mensaje)}]
    //     })
    //     await producer.disconnect().then(
    //         res.status(200).json({
    //             Mensaje: "Listo",
    //         })
    //     )
    // }else if(topico == "nuevos miembros"){
    //     await producer.send({
    //         topic: 'nuevos_miembros',
    //         messages: [{value: JSON.stringify(mensaje)}]
    //     })
    //     await producer.disconnect().then(
    //         res.status(200).json({
    //             Mensaje: "Listo",
    //         })
    //     )
    // }
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});