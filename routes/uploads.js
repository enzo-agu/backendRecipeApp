import { check } from "express-validator";
// import { body } from "express-validator";
import { Router } from "express";
// import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivoSubir } from "../middlewares/validar-archivo.js";

const routerUpload = Router();

routerUpload.post('/',validarArchivoSubir, cargarArchivo)
routerUpload.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El ID debe ser de MONGO').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
], actualizarImagenCloudinary)
// actualizarImagen

routerUpload.get('/:coleccion/:id',[
    check('id', 'El ID debe ser de MONGO').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

export { routerUpload };
