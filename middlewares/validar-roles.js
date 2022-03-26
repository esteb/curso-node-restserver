const { response } = require("express")


const esAdminRole = ( req, res = response, next ) => {

    //si en el req no viene el usuario
    if( !req.usuario ){
        return res.status(500) //error mio, de mi servicio xq si debiera de tener el usuario
            .json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLES'){
        return res.status(401)  //no autorizado
            .json({
                msg: `${ nombre } no es administrador -  No puede realizar esta acción`
            });
    }

    next();
}


const tieneRole = ( ...roles ) =>{
   
    return (req, res = responde, next ) => {
        console.log( roles, req.usuario.rol);

        
        //si en el req no viene el usuario
        if( !req.usuario ){
            return res.status(500) //error mio, de mi servicio xq si debiera de tener el usuario
                .json({
                    msg: 'Se quiere verificar el rol sin validar el token primero'
                });
        }

        //si entre los roles que tengo NO incluye el rol del usuario
        if( !roles.includes( req.usuario.rol) ){
            return res.status(401)  //no autorizado
                .json({
                    msg: ` El servicio requiere uno de estos roles  ${ roles } `
                });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}