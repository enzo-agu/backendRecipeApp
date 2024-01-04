import { check } from "express-validator";
// import { body } from "express-validator";
import { Router } from "express";
// import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearProducto,
    obtenerProductos,
    // obtenerProducto,
    actualizarProducto,
    borrarProducto } from "../controllers/productos.js";
import { existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerProducts = Router();

// TODAS LOS PRODUCTOS 👇
routerProducts.get("/", validarJWT, obtenerProductos);
routerProducts.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

// ACTUALIZAR
routerProducts.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// BORRAR CATEGORIA-ADMIN
routerProducts.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID de Mongo válido")
      .isMongoId()
      .bail()
      .custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export { routerProducts };
