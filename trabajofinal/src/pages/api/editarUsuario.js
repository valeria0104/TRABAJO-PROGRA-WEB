import fs from 'fs';
import path from 'path';

export default (req, res) => {
  if (req.method === 'POST') {
    // Obtiene los datos del usuario a actualizar desde el cuerpo de la solicitud
    const { correo, nombres, apellidos, tipodoc, numerodoc } = req.body;

    // Lee el archivo JSON de usuarios
    const rutaArchivo = path.resolve('./json/usuario.json');
    const datos = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));

    // Busca y actualiza los datos del usuario
    const usuario = datos.find((user) => user.correo === correo);

    if (usuario) {
      usuario.nombres = nombres;
      usuario.apellidos = apellidos;
      usuario.tipodoc = tipodoc;
      usuario.numerodoc = numerodoc;

      // Escribe los datos actualizados en el archivo JSON
      fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');

      res.status(200).json({ message: 'Datos de usuario actualizados con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};