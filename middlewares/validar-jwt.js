const { request , response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');  //como se especifique aqui es como en el frondend lo tiene que enviar
    console.log(token);

    //si no viene el token
    if( !token ){
        //401 no autorizado 
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        //validar token

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        // req.uid = uid;

        const usuario = await Usuario.findById({ _id: uid });
        //verificar si el usuario existe
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe fisicamente en la BD'
            })
        }

        //verificar si el usuario utenticado no ha sido eliminado ( estad=false)
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario autenticado con estado=false'
            })
        }

        //agrego al request el usuario autenticado
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}