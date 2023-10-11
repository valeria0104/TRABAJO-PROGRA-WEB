// api/cancelarReserva.js

import fs from 'fs/promises';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { ISBN13 } = req.query;
    try {
      // Leer el contenido actual del archivo JSON de reservas
      const reservaJSON = await fs.readFile('./public/reserva.json', 'utf8');
      let reservas = JSON.parse(reservaJSON);

      // Filtrar las reservas para eliminar la que coincida con el ISBN13 proporcionado
      reservas = reservas.filter((reserva) => reserva.ISBN13 !== ISBN13);

      // Guardar el archivo actualizado
      await fs.writeFile('./public/reserva.json', JSON.stringify(reservas));

      res.status(200).json({ message: 'Reserva eliminada correctamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva.' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};
