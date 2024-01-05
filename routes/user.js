import { body } from "express-validator";
import { Router } from "express";
import { usuariosPost } from "../controllers/user.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeCorreo } from "../helpers/db-validators.js";

const router = Router();

const validarInputsPost = [
  body("correo", "Correo inválido").custom(existeCorreo),
  body("nombre", "el nombre es obligatorio").not().isEmpty(),
  body("password", "El password debe contener mas de 6 letras").isLength({
    min: 6,
  }),
];

router.post("/", validarInputsPost, validarCampos, usuariosPost);

export { router };
