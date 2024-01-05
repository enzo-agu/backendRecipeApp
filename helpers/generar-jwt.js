import  jwt from 'jsonwebtoken'
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

const generarJWT = (uid = '') =>{
    return new Promise ((resolve, reject)=>{

        const payload= {uid}

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        }, (err,token)=>{
            if(err){
                console.log(err)
                reject('No se generó el token')
            }
            else{
                resolve(token)
            }
        })

    })
}

export {generarJWT}