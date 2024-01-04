import { json, request, response } from "express";
import Usuario from '../models/usuario.js'
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

// LOGIN 👇
const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "USUARIO INEXISTENTE - DEBE REGISTRARSE",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "USUARIO INACTIVO (False)",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
   
    if (!validPassword) {
      return res.status(400).json({
        msg: "PASSWORD INCORECTO",
      });
    }
    
    const token = await generarJWT (usuario.id)


    res.json({
     msg:`INGRESO EXITOSO`,
     token
    });
    
  } catch (error) {
    res.json({
      msg: "COMUNICARSE CON EL ADMINISTRADOR",
    });
  }
};


// REGISTRO 👇
const auth = async (req = request, res = response) => {
  const {email,password} = req.body;
  const usuarioDBEmail = await Usuario.findOne({ email});

  if (usuarioDBEmail) {
    return res.status(400).json({
      msg: `El email ${email} ya existe`,
    });
  }

  try {
    const usuario =await new Usuario({email,password});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    usuario.save();
  
    return res.json({
      msg:`Usuario registrado`
    });
  } catch (error) {
    console.log('ERROR',error)
  }
};



const googleSignIn = async (req, res=response) =>{

  const {id_token} = req.body

  try {

    const {correo, nombre, img}=await googleVerify(id_token)

    let usuario= await Usuario.findOne({correo})

    if(!usuario){
      const data={
        nombre,
        correo,
        password:':;',
        img,
        rol: "USER_ROLE",
        google:true

      }

      usuario=new Usuario(data)
      await usuario.save()
    }

    if(!usuario.estado){
      return res.status(401).json({
        msg:'Hable con el administrador, usuario bloqueado'
      })
    }

    const token = await generarJWT (usuario.id)

    res.json({
     usuario,
     token
    })
    
  } catch (error) {
    console.log(error)

    res.status(400).json({
      ok:false,
      msg:'El token no se pudo verificar'
    })
    
  }


}

export { login, googleSignIn,auth };
