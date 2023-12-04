import fs from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');

console.log('Ruta del archivo JSON de usuarios:', usuariosFilePath);
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, correo, contrasena, nombres, apellidos, tipodoc, numerodoc,idioma, prefijo, color, imagenPerfil } = req.body;

    try {
      const usuariosData = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf8'));

      const usuarioIndex = usuariosData.findIndex((usuario) => usuario.id === id);

      if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualiza los campos que se proporcionan en el objeto
      usuariosData[usuarioIndex] = {
        ...usuariosData[usuarioIndex],
        correo: correo || usuariosData[usuarioIndex].correo,
        contrasena: contrasena || usuariosData[usuarioIndex].contrasena,
        nombres: nombres || usuariosData[usuarioIndex].nombres,
        apellidos: apellidos || usuariosData[usuarioIndex].apellidos,
        tipodoc: tipodoc || usuariosData[usuarioIndex].tipodoc,
        numerodoc: numerodoc || usuariosData[usuarioIndex].numerodoc,
        idioma: idioma ||usuariosData[usuarioIndex].idioma,
        prefijo: prefijo || usuariosData[usuarioIndex].prefijo,
        color: color || usuariosData[usuarioIndex] .color,
        imagenPerfil: imagenPerfil || usuariosData[usuarioIndex].imagenPerfil
      };

      await fs.writeFileSync(usuariosFilePath, JSON.stringify(usuariosData, null, 1));

      return res.status(200).json({ message: 'Datos de usuario actualizados correctamente' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}