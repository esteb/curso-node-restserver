//rutas relacionadas a los usuarios

const { Router} = require('express');
const { validarCampos } = require('../middlewares/validar-campos')

//gran coleccion de middlewares
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, mailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

//como el middleware redirecciona aca con '../routes/user', los endponit solo deben tener el path '/'
// agregamos la "referencia" de la funcion usuariosGet, por eso va sin los (), o sino las estriamos ejecutando, sino que enviamos la referencia a la misma
router.get('/', usuariosGet );

router.post('/'
            ,[  //para definirle un middleware, puede ser uno o un arreglo de middlewares
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),    //middleware 1: si el nombre no viene vacio
                check('password', 'El password es obligatorio y mayor o igual a 6 caracteres').isLength({ min: 6 }),    //middleware 2
                check('correo', 'El correo no es válido').isEmail(),            //middleware 3: valida el formato mail
                check('correo').custom( mailExiste ),
                //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
                //check('rol').custom( (rol) => esRoleValido(rol) ),  //cuando tengamos una funcion callback cuyo primer algumento es el mismo argumento que esta emitiendo el custom, se puede optimizar enviado solo la referencia a la funcion, así automaticamente las variables que emite el custom las envía en la funcion callback, quedando asi:  check('rol').custom( esRoleValido )
                check('rol').custom( esRoleValido ),
                validarCampos  // MI middleware personalizado
            ]    
            ,usuariosPost //controlador
            );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos  // MI middleware personalizado
], usuariosPut);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos  // MI middleware personalizado
], usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;