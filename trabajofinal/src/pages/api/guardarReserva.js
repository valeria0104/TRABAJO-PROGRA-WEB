import fs from 'fs';

export default async (req, res) => {
  if (req.method === 'PUT') {
    try {
      // Leer el contenido actual del archivo JSON de reserva
      const reservaJSON = fs.readFileSync('./public/reserva.json', 'utf8');
      const reservas = JSON.parse(reservaJSON);

      // Agregar la nueva reserva al archivo JSON
      const nuevaReserva = req.body;
      reservas.push(nuevaReserva);

      // Guardar el archivo actualizado
      fs.writeFileSync('./public/reserva.json', JSON.stringify(reservas));

      res.status(200).json({ message: 'Reserva guardada correctamente.' });
    } catch (error) {
      console.error('Error al guardar la reserva en la API:', error);
      res.status(500).json({ error: `Error interno al guardar la reserva: ${error.message}` });
    }
  } else {
    res.status(405).end();
  }
};