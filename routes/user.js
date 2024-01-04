import { check } from "express-validator";
import { body } from "express-validator";
import { Router } from "express";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/user.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";
import {
  esRoleValido,
  existeCorreo,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

const router = Router();

// const validarPut = [check("id", "No es un ID válido 🔴🥴").isMongoId()];

const validarInputsPost = [
  body("correo", "Correo inválido").custom(existeCorreo),
  body("nombre", "el nombre es obligatorio").not().isEmpty(),
  body("password", "El password debe contener mas de 6 letras").isLength({
    min: 6,
  }),
  body("rol").custom(esRoleValido),
];

router.get("/", usuariosGet);
router.post("/", validarInputsPost, validarCampos, usuariosPost);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
  ],
  validarCampos,
  usuariosPut
);
router.patch("/", usuariosPatch);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

export { router };

