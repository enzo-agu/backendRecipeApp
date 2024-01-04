const  argv  = require("yargs")
.option('b',{
    alias:'base',
    type:'number',
    demandOption:true,
    describe:'base de multiplicar'
})
.option('l',{
    alias:'listar',
    type:'boolean',
    demandOption:true,
    default:false,
    describe:'muestra la tabla en consola'
})
.option('h',{
    alias:'hasta',
    type:'number',
    default:10,
    describe:'Hasta donde va la tabla'
})
.check((argv,options)=>{
    if(isNaN(argv.b)){
        throw 'debe ser un numero la base'
    }
    return true
})
.argv;

module.exports= argv