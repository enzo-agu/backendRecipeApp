import { Schema, model } from "mongoose";

const UsuarioSchema=Schema({
    email:{
        type:String, 
        required: [true, 'El email es obligatiorio'],
        unique:true
    },
    password:{
        type:String, 
        required: [true, 'La contraseña es obligatioria']
    },
    img:{
        type:String, 
    },
    rol:{
        type:String, 
        default:'USER_ROLE',
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean, 
        default:true
    },
    google:{
        type:Boolean, 
        default: false 
    },
})

export default model('Usuario', UsuarioSchema)


