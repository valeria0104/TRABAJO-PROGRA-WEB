// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Puerto en el que se ejecutará la API

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Array de reservas (simulación de datos)
let reservas = [];

// Ruta PUT para actualizar una reserva por su ISBN13
app.put('/api/actualizarReserva/:ISBN13', (req, res) => {
  const ISBN13 = req.params.ISBN13; // Obtén el ISBN13 de la solicitud
  console.log('Solicitud PUT recibida para ISBN13:', ISBN13); // Agrega esta línea

  const data = req.body; // Datos para actualizar
  console.log('Datos recibidos:', data); // Agrega esta línea

  // Encuentra la reserva en función del ISBN13
  const reserva = reservas.find((r) => r.ISBN13 === ISBN13);

  if (!reserva) {
    return res.status(404).json({ message: 'Reserva no encontrada' });
  }

  // Realiza la actualización de la reserva con los datos recibidos
  reserva.fechareserva = data.fechareserva;

  return res.status(200).json({ message: 'Reserva actualizada con éxito' });
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
