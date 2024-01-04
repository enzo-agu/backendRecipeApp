import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

export const existeCorreo = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`Correo ${correo} existente en DB`);
  }
};

export const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`ID ${id} no existe`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

const coleccionesPermitidas = (coleccion='', colecciones=[])=>{

  const incluida= colecciones.includes(coleccion)
  if(!incluida){
    throw new Error (`La colección ${coleccion} no es permitida - ${colecciones} `)
  }

  return true

}

export { esRoleValido, existeProductoPorId, coleccionesPermitidas };
