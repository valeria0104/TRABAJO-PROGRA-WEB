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
    fetch('/reserva.json') // Ruta al archivo JSON local
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error al cargar las reservas desde el archivo JSON local.');
        }
      })
      .then((data) => {
        if (data) {
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

  const reservasPaginaActual = reservas.slice(
    (paginaActual - 1) * reservasPorPagina,
    paginaActual * reservasPorPagina
  );

  const eliminarReserva = (ISBN13) => {
    fetch(`/api/cancelarReserva?ISBN13=${ISBN13}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.ISBN13 !== ISBN13));
        } else {
          console.error('Error al eliminar la reserva desde el servidor.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la reserva desde el servidor:', error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function actualizarFechaReserva(ISBN13, nuevaFecha) {
    const reservaIndex = reservas.findIndex((reserva) => reserva.ISBN13 === ISBN13);
  
    if (reservaIndex !== -1) {
      const reservaActualizada = { ...reservas[reservaIndex], fechareserva: nuevaFecha };
      const nuevasReservas = [...reservas];
      nuevasReservas[reservaIndex] = reservaActualizada;
  
      setReservas(nuevasReservas);
    }
  }

  const completarReserva = (ISBN13) => {
    if (selectedDate) {
      fetch(`/api/actualizarReserva/${ISBN13}`, {
        method: 'PUT',
        body: JSON.stringify({ fechareserva: selectedDate }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            actualizarFechaReserva(ISBN13, selectedDate);
            setSelectedDate(null);
            setSelectedISBN(null);
            setIsCompleting(false);
          } else {
            console.error('Error al completar la reserva:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error al completar la reserva:', error);
        });
    }
  };

  const separarLibro = (ISBN13) => {
    setSelectedISBN(ISBN13);
    setIsCompleting(true);
  };

  return (
    <Layout content={
      <>
        <h1>Libros Reservados</h1>
        {reservas.length > 0 ? (
          <div className="reservas">
            {reservasPaginaActual.map((reserva, index) => (
              <div key={index} className="reserva">
                <p>{reserva.titulo}</p>
                <img src={reserva["imagen-portada-url"]} alt={reserva.titulo} style={{ maxWidth: '200px' }} />
                <p>ISBN: {reserva.ISBN13}</p>
                <p>URL de Compra: {reserva["url-compra"]}</p>
                <button onClick={() => eliminarReserva(reserva.ISBN13)}>Eliminar</button>
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