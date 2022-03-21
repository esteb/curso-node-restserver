require('dotenv').config();
const Server = require('./models/server');

//llamo mi instancia del servidor
const server = new Server();

//lanzar el metodo listen para que esté levantado el servidor
server.listen();