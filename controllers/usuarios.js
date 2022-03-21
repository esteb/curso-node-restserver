//separamos la logica de nuestras rutas, y aqui tendremos la logica
//en el archivo de rutas solo tendremos las rutas
//creamos funciones y las exportamos
const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    const { page = 1, limit = 10 } = req.query;

    res.status(200).json({
        msg: 'get API - controlador'
        ,page
        ,limit
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(200).json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    
    const { id } = req.params;

    res.status(200).json({
        msg: 'put API - controlador'
        ,id
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'delete API controlador'
    });
}

const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch API - controlador'
    });
}


module.exports = {
    usuariosGet
    ,usuariosPost
    ,usuariosPut
    ,usuariosDelete
    ,usuariosPatch
}