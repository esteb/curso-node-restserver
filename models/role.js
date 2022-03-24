//usualmente el nombre del arcivho tiene el mismo nombre de la coleccion solo que sin la S

const { Schema, model } = require('mongoose');


const RoleSchema = Schema({

    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports= model( 'Role', RoleSchema);
