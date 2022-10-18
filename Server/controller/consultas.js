const { Pool } = require('pg');

const pg_config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
};

const pool = new Pool(pg_config);

const showTable = async (tabla) => {
    return await pool.query(`select * from ${tabla}`).then((consulta) => {
        const arr = consulta.rows.map((row) => {
            try {
                if(tabla == 'miembros') {
                    const {nombre, apellido, rut, correo, patente, registro_premium} = row;
                    return {nombre, apellido, rut, correo, patente, registro_premium}
                }
                else if(tabla == 'ventas') {
                    const {numero_venta, cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito} = row;
                    return {numero_venta, cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito}
                }
            } catch(e) {
                console.log(e);
            }
        })
        return arr
    })
}

const register_member = async (nombre, apellido, rut, correo, patente, registro_premium) => {
    const comando = 'insert into miembros(nombre, apellido, rut, correo, patente, registro_premium) values ($1, $2, $3, $4, $5, $6);';
    const values = [nombre, apellido, rut, correo, patente, registro_premium];
    pool.query(comando, values);
}

const register_sale = async (cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito) => {
    const comando = 'insert into ventas(cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito) values ($1, $2, $3, $4, $5);';
    const values = [cliente, cantidad_sopaipillas, hora, stock_restante, ubicacion_carrito];
    pool.query(comando, values);
}

module.exports = {showTable, register_member, register_sale};