// Importa las bibliotecas necesarias
import fs from 'fs';
import path from 'path';

// Ruta al archivo JSON que contiene los datos de los usuarios
const usuariosFilePath = path.join(process.cwd(), './json/usuario.json');

// Función para actualizar los datos de un usuario
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { correo, nombres, apellidos, tipodoc, numerodoc } = req.body;

    try {
      // Lee el archivo JSON de usuarios
      const usuariosData = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf8'));

      // Encuentra al usuario que coincide con el correo proporcionado
      const usuarioIndex = usuariosData.findIndex((usuario) => usuario.correo === correo);

      if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualiza los datos del usuario
      usuariosData[usuarioIndex] = {
        ...usuariosData[usuarioIndex],
        nombres,
        apellidos,
        tipodoc,
        numerodoc,
      };

      // Escribe los datos actualizados en el archivo JSON
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuariosData, null, 2));

      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
