const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;
        this.usersPath = '/peticiones';

        // Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        //Parseo y lectura del body
        this.app.use( express.json() );    
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/peticiones'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    }
}

module.exports = Server;