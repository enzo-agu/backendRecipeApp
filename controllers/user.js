import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "post API - controlador",
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  const usuarioBorradoEstado = await Usuario.findByIdAndUpdate(id, {
    estado: false,
  });

  const usuarioAutenticado = req.usuario;

  res.json({
    usuarioBorradoEstado,
    usuarioAutenticado,
  });
};

export {
  usuariosPost,
  usuariosDelete,
};
