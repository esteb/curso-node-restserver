const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        
        if( !usuario ) { //si no existe
        
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // verificar si usuario está activo
        if( !usuario.estado ){ //si el estado esta en false (eliminado de la bd)
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado :  false'
            });
        }

        //verificar password
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){ //si el password no son iguales
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        //como el paquete jwt no tabaja con promesas sino que trabaja con callback
        //por lo que el callback lo debemos tranformar en una Promise
        //por lo que creamos la funcion generarJWT el cual devuelva una promesa
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    login
}