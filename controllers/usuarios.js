//separamos la logica de nuestras rutas, y aqui tendremos la logica
//en el archivo de rutas solo tendremos las rutas
//creamos funciones y las exportamos
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//importamos modelo de usuario
const Usuario = require('../models/usuario');
const { mailExiste } = require('../helpers/db-validators');

const usuariosGet = async(req = request, res = response ) => {

    // const { page = 1, limit = 10 } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /*
    const usuarios = await Usuario.find( query )   //obtengo solo los usuario con estado true, los false emulan la eliminacion
        .skip( Number( desde ) )
        .limit( Number( limite ) );

    const total = await Usuario.countDocuments( query );
    */

    //realizo las peticiones en un arreglo de promesas, asi ambas peticiones se ejecutaran en paralelo
    //si una da error, todas dan error
    //retorna un arreglo con el resultados de las promesas
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )   //obtengo solo los usuario con estado true, los false emulan la eliminacion
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    // asi puedo desestructurar sacando una variable y dando todo el resto en otra
    //const { google, ...resto } = req.body;

    const { nombre, correo, password, rol } = req.body;
    
    //creamos instancia de usuario, pero no graba el registro en la base de datos
    const usuario = new Usuario( { nombre, correo, password, rol } );
    
    //encriptar password
    //genSaltSync: numero de vueltas para hacer mas segura la clave, por defecto está en 10
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //grabar en BD la instancia creada
    // para usar await la funcion flecha de usuariosPost debe ser async
    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if( password ){
        //encriptar password
        //genSaltSync: numero de vueltas para hacer mas segura la clave, por defecto está en 10
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(200).json( usuario );
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //borrar fidicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    //borrar por estado
    //ES MUY recomendable por la integridad referencial
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.status(200).json( usuario);
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