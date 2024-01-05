import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

export const existeCorreo = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`Correo ${correo} existente en DB`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

export { existeProductoPorId };
