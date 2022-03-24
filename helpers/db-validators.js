const Role = require('../models/role');
//importamos modelo de usuario
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {  //con custom yo realizo una validacion personalizada
                    
    const existeRol = await Role.findOne({ rol });  //{ rol: rol} pero se puede optimizar asi { rol }

    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`) //error personalizado que va ser atrapado aqui en el custom()
    }
    //si no regresamo un error significa que pasa la validacion
}


 //verificar si coreo existe
const mailExiste =  async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo: correo });

    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya está registrado en la BD`) //error personalizado que va ser atrapado aqui en el custom()
    }
}


 //verificar si usuario existe
 const existeUsuarioPorId =  async( id ) => {

    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ){
        throw new Error(`El id ${ id } no existe`) //error personalizado que va ser atrapado aqui en el custom()
    }

}


module.exports = {
    esRoleValido,
    mailExiste,
    existeUsuarioPorId
}