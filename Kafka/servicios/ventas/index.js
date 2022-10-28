const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs')
const fs = require('fs');
const e = require("express");
const fileName = './ventas.json';
const file = require(fileName);

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
    brokers: [process.env.kafkaHost]
});
var vendedor = [];
var clientes = [];
var sopaipillas = [];
const auth = async () => {
    const consumer = kafka.consumer({ groupId: 'prueba1', fromBeginning: true });
    await consumer.connect();
    await consumer.subscribe({ topic: 'ventas' });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Funciona de manera asincrionica guardando datos en la base de datos
            if (message.value){
                var data = JSON.parse(message.value.toString());
                // console.log("Mensaje recibido en el topico ventas: ",data)
                // Variables para agregar a la base de datos
                var cliente = data.Cliente
                var cantSopaipillas = data.Cantidad_de_sopaipillas
                var hora = data.Hora
                var stock = data.Stock_restante
                var ubicacion = data.Ubicacion_carrito
                var patente = data.Patente
                if(!vendedor.includes(patente)){
                    vendedor.push(patente)
                }
                if(!clientes.includes(cliente)){
                    clientes.push(cliente)
                }
                var aux = {
                    'Patente': patente,
                    'Cliente': cliente,
                    'Sopaipillas': cantSopaipillas  
                }
                sopaipillas.push(aux)



                file.ventas.push(data)
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err);
                })
            }
        },
      })
}
app.get("/ventas-diarias", async (req, res) => {
    const ventaindividual = {};
    const ventacadacliente = {};
    
    console.log("VENTAS DIARIAS")
    var totalventas = file.ventas.length
    for(let i in file.ventas){
        
        if(vendedor.includes(file.ventas[i].Patente)){
            if(ventaindividual[file.ventas[i].Patente]){
                ventaindividual[String(file.ventas[i].Patente)]++;
            }else{
                ventaindividual[String(file.ventas[i].Patente)] = 1;
            }
        }
    }

    for(let i in sopaipillas){
        if(vendedor.includes(sopaipillas[i].Patente)){
            if(ventacadacliente[sopaipillas[i].Patente]){
                if(ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente]){
                    ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente]["compras"]++;
                    ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente]["cantidad"] += parseInt(sopaipillas[i].Sopaipillas);
                }else{
                    ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente] = {"compras": 1, "cantidad": parseInt(sopaipillas[i].Sopaipillas)};
                }
            }else{
                ventacadacliente[sopaipillas[i].Patente] = {};
                ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente] = {"compras": 1, "cantidad":parseInt(sopaipillas[i].Sopaipillas)};
                // ventacadacliente[sopaipillas[i].Patente][sopaipillas[i].Cliente]
            }
    
        }
    }
    vendedor.forEach(function(carrito) {
        console.log('Carrito:', carrito)
        for(let i in ventacadacliente[carrito]){
            console.log('Promedio cliente',i ,' : ', ventacadacliente[carrito][i].cantidad/ventacadacliente[carrito][i].compras)
        }
        console.log('------------------------------------')
    })
    
    console.log('Ventas totales para cada carrito: ',ventaindividual,'\n')

    
    for(let i in ventacadacliente){
        console.log('Carrito:', i)
        console.log('Tiene ',Object.keys(ventacadacliente[i]).length ,' cliente/s','\n')
    }

    console.log('Ventas totales', totalventas)
    console.log('Vendedores totales', vendedor.length)
    console.log('Clientes totales', clientes.length)

    res.status(200).json({"ok": 'ok'});
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    auth();
});