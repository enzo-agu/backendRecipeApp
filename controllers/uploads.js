import fs from 'fs'
import { response } from "express";
import dotenv from "dotenv";
import cloudinary,{ v2 } from 'cloudinary';
import path from "path";
import { __dirName } from "../utils.js";
import { subirArchivo } from "../helpers/subir-archivo.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

dotenv.config({ path: "../.env" });

cloudinary.config({ 
    cloud_name: 'dwoownf0f', 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: '34uoaPCzKtjicXrFNJLhGwDSq1I',
    secure: true
  });

const cargarArchivo = async (req, res = response) => {

  try {
      const nombre=await subirArchivo(req.files,undefined,'imgs')
      res.json({nombre})
    
  } catch (msg) {
    res.status(400).json({msg})
  }
};

const actualizarImagen = async(req,res=response)=>{

    const {id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':

        modelo= await Usuario.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }
            
            break;

            case 'productos':

            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }

        default:
            return res.status(500).json({msg:`Se me olvidó`})
    }

    
    if(modelo.img){
        const pathImagen= path.join(__dirName, '../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }


    const nombre=await subirArchivo(req.files,undefined,coleccion)
    modelo.img=nombre

    await modelo.save()

    res.json({
        modelo
    })
}


const actualizarImagenCloudinary = async(req,res=response)=>{

    const {id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':

        modelo= await Usuario.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }
            
            break;

            case 'productos':

            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
    }

    
    if(modelo.img){

        const nombreArr= modelo.img.split('/')
        const nombre = nombreArr[nombreArr.length-1]
        const [public_id] =nombre.split('.')
        cloudinary.uploader.destroy(public_id)
       
    }
    
        const {tempFilePath} = req.files.archivo
        const {secure_url}= await v2.uploader.upload(tempFilePath)
        modelo.img=secure_url
        await modelo.save()

        res.json(
            modelo
        )
   
}


const mostrarImagen= async(req, res=response)=>{
    
    const {id, coleccion} = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':

        modelo= await Usuario.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }
            
            break;

            case 'productos':

            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }

        default:
            return res.status(500).json({msg:`Se me olvidó`})
            
    }

    
    if(modelo.img){
        const pathImagen= path.join(__dirName, '../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
          return res.sendFile(pathImagen)
        }
    }

    
    const pathImgNotFound= path.join(__dirName, '../assets/img-not-found.jpg')

    res.sendFile(pathImgNotFound)
}

export { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary };
