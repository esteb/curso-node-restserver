const { validationResult } = require('express-validator');


//este middleware revisa los error que pudieron darse en los middlewares anteriores
const validarCampos = ( req, res, next ) =>{

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    //la funcion llega a este punto indica que debe seguir con el siguiente middleware, si no hay al controlador
    next();
}

module.exports= {
    validarCampos
}