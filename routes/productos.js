import { check } from "express-validator";
import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto } from "../controllers/productos.js";
import { existeProductoPorId } from "../helpers/db-validators.js";

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

// BORRAR PRODUCTO-ADMIN
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
