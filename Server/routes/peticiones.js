const { Router } = require('express');
const router = Router();
const {validarParametros, validarRut} = require('../controller/validacion')
const { showTable, register_member, register_sale } = require('../controller/consultas')

router.post('/register_member', (req, res) => {
    const {nombre, apellido, rut, correo, patente, registroPremium} = req.body;
    if(validarParametros([nombre, apellido, rut, correo, patente])) {
        register_member(nombre, apellido, rut, correo,patente, registroPremium).then(() => {
            res.status(200).json({
                msg: 'Gremio registrado con éxito',
                nombre: nombre,
                apellido: apellido,
                rut: rut,
                correo: correo,
                patente: patente,
                registroPremium: registroPremium
            });
        })
    }
    else {
        res.status(404).json({
            msg: 'Todos los parámetros deben estar rellenados',
        });
    }
});

router.post('/record_sale', (req, res) => {
    const {cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito} = req.body;
    if(validarParametros([cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito])) {
        register_sale(cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito);
        res.status(200).json({
            msg: 'Venta registrada con éxito',
            cliente: cliente,
            cantidad_sopaipillas: parseInt(cantidad_sopaipillas),
            hora: hora,
            stock_restante: parseInt(stock_restante),
            ubicacion_carrito: ubicacion_carrito
        });
    }
    else {
        res.status(404).json({
            msg: 'Todos los parámetros deben estar rellenados',
        });
    }
});

router.get('/report/:coordenadas', (req, res) => {

    const coordenadas = req.params.coordenadas;

    res.status(200).json({
        msg: 'Coordenadas',
        coordenadas: coordenadas
    });
});

router.post('/show/:tabla', async(req, res) => {
    const tabla = req.params.tabla;

    const arr = await showTable(tabla)
    res.status(200).json({
        msg: arr
    });
    
});

module.exports = router;