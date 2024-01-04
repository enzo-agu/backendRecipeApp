// const {OAuth2Client} = require('google-auth-library');

import { OAuth2Client } from 'google-auth-library';
// import { dotenvfunction } from '../seccion-9-10/utils.js';
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

// dotenvfunction()


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
  });
  const {name,picture,email} = ticket.getPayload();

  return{
   nombre: name,
    img: picture,
    correo: email
  }

//   console.log(payload)
//   const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
// verify().catch(console.error);

export {googleVerify}