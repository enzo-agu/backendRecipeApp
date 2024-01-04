import {Schema, model} from 'mongoose'

const ProductoSchema=Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    descripcion:{
        type:String,
        required:[true, 'La descripción es obligatoria'],
        unique:true
    },
    ingredientes:{
        type:[],
        required:[true, 'El ingrediente es obligatorio'],
        unique:true
    },
    img:{
        type:String,
        required:[true],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    disponible:{type:Boolean, default:true},
})

ProductoSchema.methods.toJSON = function () {
    const {__v, ...data} =this.toObject()
    return data 
}

export default model('Producto',ProductoSchema)