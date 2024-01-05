import { response } from "express";
import Producto from "../models/producto.js";

// TODOS LAS RECETAS 👇
const obtenerProductos = async (req, res = response) => {
  const query = { estado: true, usuario: req.usuario._id };
  const [total, productos] = await Promise.all([
    Producto.find(query)
      .populate("usuario", "email")
  ]);

  res.json({
    total,
    productos,
    msg:'RUTA-PRODUCTOS'
  });
};

// CREAR RECETA 👇
const crearProducto = async (req, res = response) => {
  const {nombre,descripcion,ingredientes,img} = req.body

  const productoDB = await Producto.findOne({ nombre:nombre.toUpperCase()});

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} existe`,
    });
  }

  try {
   
    const producto = new Producto({usuario: req.usuario.id,nombre:nombre.toUpperCase(),descripcion,ingredientes,img});
    producto.save();
  
    res.json({
      producto,
    });
    
  } catch (error) {
    console.log('ERROR POST',error)
  }
};

// ACTUALIZAR RECETA 👇
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const {...data}= req.body

  if(data.nombre){
      data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    msg: producto,
  });
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};

export {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
};
