import path from "path";
import { __dirName } from "../utils.js";
import { v4 as uuidv4 } from "uuid";

const subirArchivo = (files,extensionesValidas = ["png", "jpg", "jpeg", "gif"], carpeta = '') => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);

    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no está permitida, ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirName, "../uploads", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject(err)
        // return res.status(500).json({ err });
      }
      resolve(nombreTemp);
    });
  });
};

export { subirArchivo };
