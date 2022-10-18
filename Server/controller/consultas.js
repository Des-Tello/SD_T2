const { Pool } = require('pg');

const pg_config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
};

const pool = new Pool(pg_config);

const getUsuarios = async () => {
    return await pool.query('select * from miembros').then((consulta) => {
        const arr = consulta.rows.map((usuario) => {
            try {
                const {nombre, apellido, rut, correo, patente, registro_premium} = usuario;
                return {nombre, apellido, rut, correo, patente, registro_premium}
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

module.exports = {getUsuarios, register_member};