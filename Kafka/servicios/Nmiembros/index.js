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
var __FOUNDP = [];
var __FOUNDNP = [];

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
    //   res.status(200).json({Lista_postulantes_premium: cola_miembrosP},{Lista_postulantes_no_premium: cola_miembrosNP});
}

let pre = true
app.post("/miembros", async (req, res) => {
    let p = cola_miembrosP.length 
    //   res.status(200).json({Lista_postulantes_premium: cola_miembrosP},{Lista_postulantes_no_premium: cola_miembrosNP});

    validacion = req.body
    for(let i in validacion){
        console.log(validacion[i])
        console.log("Posible miembro:",validacion[i].patente)
        console.log("¿aceptado? ",validacion[i].aceptado)

        if(validacion[i].aceptado == 1){
                miembrop = cola_miembrosP.find((post)=>{
                    if(post.Patente == validacion[i].patente ){
                        return true;
                    }
                })
                if(miembrop)
                __FOUNDP.push(miembrop)
            
                miembronp = cola_miembrosNP.find((post)=>{
                    console.log(post.Patente, validacion[i].patente)
                    if(post.Patente == validacion[i].patente){
                        return true;
                    }
                })
                if(miembronp)
                __FOUNDNP.push(miembronp)
        }   
    };

    console.log("Miembros aceptados no premium:", __FOUNDP);
    console.log("Miembros aceptados no premium:", __FOUNDNP);
    __FOUNDP = [];
    __FOUNDNP = [];
    res.status(200).json({lista: "Hecho"});
    // cola_miembrosP = [];
    // cola_miembrosNP = [];
    
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});