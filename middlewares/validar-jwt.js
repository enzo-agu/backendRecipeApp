import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import Usuario from '../models/usuario.js';

dotenv.config({ path: "./.env" });

const validarJWT = async (req= request,res=response, next) =>{

    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            msg:'No hay token'
        })
    }

    try {
       const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY)

       const usuario = await Usuario.findById(uid)

       if(!usuario){
        return res.status(401).json({
            msg:'Token no  válido - Usuario Inexistente'
        })
       }

       if(!usuario.estado){
        return res.status(401).json({
            msg:'Token no  válido - estado FALSE'
        })
       }


       req.usuario=usuario
       
        next()

    } catch (error) {

        console.log(error)
        res.status(401).json({
            msg:'Token no válido'
        })
        
    }


    
    

    // next()
}

export {validarJWT}