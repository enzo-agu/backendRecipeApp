import { Schema, model } from "mongoose";

const UsuarioSchema=Schema({
    // nombre:{
    //     type:String, 
    //     required: [true, 'El nombre es obligatiorio']
    // },
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
        // required: true,
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

// UsuarioSchema.methods.toJSON = function () {
//     const {__v, password,_id, ...usuario} =this.toObject()
//     usuario.uid=_id
//     return usuario
// }

export default model('Usuario', UsuarioSchema)


