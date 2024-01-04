import { check } from "express-validator";
import { body } from "express-validator";
import { Router } from "express";
import { auth, googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("email", "El email es obligatorio 🔴🔴").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
),
  validarCampos;

  routerAuth.post(
    "/signup",
    [
      check("email", "El email es obligatorio 🔴🔴").isEmail(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    auth
  ),
    validarCampos;
  
  routerAuth.post(
    "/google",
    [
      check('id_token','id_token es necesario').not().isEmpty(),
      validarCampos,
    ],
    googleSignIn
  )
export { routerAuth };
