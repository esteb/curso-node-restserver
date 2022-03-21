const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        
        //crear en mi servidor cuando se hace una nueva instancia crea una app de express como una propiedad en la misma clase del Servidor
        this.app = express()
        this.port = process.env.PORT; 

        this.usuariosPath = '/api/usuarios';


        //Middleeares: funciones que se añaden cuando se levante el webserver
        this.middlewares();


        //llamo a mis rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        //CORS
        //es un parquete de middleware que sirve para restringir llamadas para sean constestadas
        //los dominios que indiquemos
        this.app.use( cors() );

        //Lectura y parseo del body
        //cualquier infromacion que venga la va intenrar serializar en formato json
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }

    //configuro mis rutas
    routes(){
        //aplicamos un middleware
        //nuevo path: /api/usuarios el que se usará en postman y el front para solicitar los endpoint
        //redirecciona a '../routes/user' para consumir los endpoint
        this.app.use(   this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        })
    }
}

module.exports = Server;