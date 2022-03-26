const jwt = require('jsonwebtoken');

//uid: id unico
//no incorporar data sensible en el jwt
const generarJWT = ( uid = '' ) => {

    // debemos generar un Promesa manualmente para el await que tenemos en controllers\auth.js
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        //firmar el nuevo token
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if( err ){
                console.log( err );
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        })

    })
    
}

module.exports = {
    generarJWT
}