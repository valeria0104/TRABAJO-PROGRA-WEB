import Layout from './componentes/Layout3.js';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';


const PantallaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const reservasPorPagina = 3;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedISBN, setSelectedISBN] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cargar las reservas desde el archivo JSON local
    fetch('/api/reservas/libros-reserva')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error al cargar las reservas desde el archivo JSON local.');
        }
      })
      .then((data) => {
        if (data) {
          console.log('Reservas cargadas:', data); // Agrega este console.log
          setReservas(data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar las reservas desde el archivo JSON local:', error);
      });
  }, []);

  const totalPaginas = Math.ceil(reservas.length / reservasPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const reservasPaginaActual = Array.isArray(reservas)
  ? reservas.slice(
      (paginaActual - 1) * reservasPorPagina,
      paginaActual * reservasPorPagina
    )
  : [];

  const eliminarReserva = (idLibro) => {
    fetch(`/api/reservas/cancelarReserva?idLibro=${idLibro}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.libroreserva.id !== idLibro));
        } else {
          console.error('Error al eliminar la reserva desde el servidor.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la reserva desde el servidor:', error);
      });
  };

  return (
    <Layout content={
      <>
        <h1>Libros Reservados</h1>
        {reservas.length > 0 ? (
          <div className="reservas">
            {reservasPaginaActual.map((reserva, index) => (
              <div key={index} className="reserva">
                {reserva.libroreserva && (
                  <>
                    <p>Libro: {reserva.libroreserva.titulo}</p>
                    <img
                      src={reserva.libroreserva.imagenLibro}
                      alt={reserva.libroreserva.titulo}
                      style={{ maxWidth: '200px' }}
                    />
                    <p>Autor: {reserva.libroreserva.autor}</p>
                    <p>Editorial: {reserva.libroreserva.editorial}</p>
                    <p>ISBN: {reserva.libroreserva.ISBN}</p>
                    <button onClick={() => eliminarReserva(reserva.libroreserva.id)}>Eliminar</button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay libros reservados.</p>
        )}

        {totalPaginas > 1 && (
          <div className="pagination">
            {paginaActual > 1 && (
              <button onClick={handlePaginaAnterior}>Anterior</button>
            )}
            {paginaActual < totalPaginas && (
              <button onClick={handlePaginaSiguiente}>Siguiente</button>
            )}
          </div>
        )}

        <button onClick={() => router.push('/pantalla12')}>Regresar a Reservar de Libros</button>
      </>
    } />
  );
};
export default PantallaReservas;
