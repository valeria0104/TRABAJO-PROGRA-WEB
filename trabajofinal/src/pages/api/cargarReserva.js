import fs from 'fs';

export default (req, res) => {
  if (req.method === 'GET') {
    try {
      // Leer el contenido actual del archivo JSON de reserva
      const reservaJSON = fs.readFileSync('./public/reserva.json', 'utf8');
      const reservas = JSON.parse(reservaJSON);

      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'Error al cargar las reservas.' });
    }
  } else {
    res.status(405).end();
  }
};