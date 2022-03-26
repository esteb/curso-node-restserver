/*
asi quiero grabrar mi objeto en la base de datos
{
    nombre: 'asd',
    correo: 'saadqsasa@ffff.cl',
    password: 'ewead87d8s9dfd98sf90',
    img: 'jdskljdlsjds898skl',
    rol: '2143423',
    estado: false,
    google: false
}
*/


const { Schema, model } = require('mongoose');

//defino mi coleccion 
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // mongo se va encargar de no insertar correos duplicado, no permitira ingresar un correo previamente ya ingresado
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']  //solo admite estos roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    } 
});

//aqui no puede ser una funcion de flecha sino que nua normal
UsuarioSchema.methods.toJSON = function() {
    // desestructuramos lo que viene del this
    //estamos sacando el __v y el password y todos los demas quedarpan en la variable usuario
    const { __v, password, _id, ...usuario } = this.toObject();
    
    //cambio de nombre el _id por uid
    //entonces al objeto usuario le creo el elemento uid con el valor del _id
    usuario.uid = _id;
    
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema);