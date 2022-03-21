//rutas relacionadas a los usuarios

const { Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//como el middleware redirecciona aca con '../routes/user', los endponit solo deben tener el path '/'
// agregamos la "referencia" de la funcion usuariosGet, por eso va sin los (), o sino las estriamos ejecutando, sino que enviamos la referencia a la misma
router.get('/', usuariosGet );

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;