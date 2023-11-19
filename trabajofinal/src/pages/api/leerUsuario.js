import fsPromises from 'fs/promises';
import path from 'path';

export default async function leerUsuario(req, res) {
    const ruta = path.join(process.cwd(), '/src/pages/json/usuario.json');

    try {
        const data = await fsPromises.readFile(ruta, 'utf-8'); // Especifica el formato como 'utf-8'
        const jsonData = JSON.parse(data);
        ///console.log('holiiii')
       //// console.log(JSON.stringify(jsonData, null, 2));
        res.status(200).json(jsonData);
    } catch (error) {
        console.log("Ocurrió un error al leer usuario.json", error);
        res.status(500).json({ error: 'Error al leer usuario.json' });
    }
}
