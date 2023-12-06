import Layout from './componentes/Layout3.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const Pantalla13 = () => {
  const router = useRouter();
  const { palabraclave, checkbox1, checkbox2, checkbox3, checkbox4, categorias } = router.query;
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [libros, setLibros] = useState([]);
  const [notificacion, setNotificacion] = useState(null);

  const agregarReserva = (reserva) => {
    setReservas([...reservas, reserva]);
  };

  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
    setTimeout(() => {
      setNotificacion(null);
    }, 3000); // Ocultar la notificación después de 3 segundos
  };

  const calcularFechaFinal = (fechaInicio) => {
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaInicio.getDate() + 30);
    return fechaFinal;
  };

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(calcularFechaFinal(new Date()));

  const opcionesFiltradas = libros.filter((opcion) => {
    const tieneEditorial = opcion.editorial && opcion.editorial.toLowerCase().includes(palabraclave?.toLowerCase());
    const tieneISBN = opcion.ISBN && opcion.ISBN.toLowerCase().includes(palabraclave?.toLowerCase());
    const categoriaSeleccionada = categorias && categorias.includes(opcion.categoria);
    const alMenosUnCheckboxSeleccionado = checkbox1 || checkbox2 || checkbox3 || checkbox4;

    return (
      (categorias && categorias.length === 1 && categoriaSeleccionada) ||
      (categorias && categorias.length > 1 && categoriaSeleccionada && alMenosUnCheckboxSeleccionado) ||
      (!categorias && alMenosUnCheckboxSeleccionado &&
        ((checkbox1 && checkbox1 === 'titulo' && opcion.titulo.toLowerCase().includes(palabraclave?.toLowerCase())) ||
          (checkbox2 && checkbox2 === 'autor' && opcion.autor.toLowerCase().includes(palabraclave?.toLowerCase())) ||
          (checkbox3 && checkbox3 === 'editorial' && tieneEditorial) ||
          (checkbox4 && checkbox4 === 'ISBN' && tieneISBN)))
    );
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  useEffect(() => {
    fetch('/api/busqueda/libros')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLibros(data.libros);
      })
      .catch((error) => console.error('Error al obtener la lista de libros:', error));
  }, []);

  useEffect(() => {
    if (categorias) {
      const categoriasArray = Array.isArray(categorias) ? categorias : [categorias];
      setOpcionesSeleccionadas(categoriasArray.map((categoria) => ({ categoria })));
    }
  }, [categorias]);

  useEffect(() => {
    const opcionesDesdeURL = [checkbox1, checkbox2, checkbox3, checkbox4].filter(Boolean);
    setOpcionesSeleccionadas(opcionesDesdeURL.map((opcion) => ({ categoria: opcion })));
  }, [router.query]);

  useEffect(() => {
    const pagina = parseInt(router.query.pagina, 10) || 1;
    setPaginaActual(pagina);
  }, [router.query.pagina]);

  const handleReservar = async (idLibro) => {
    const fechainicio = new Date();
    const fechafinal = calcularFechaFinal(fechainicio);

    const diferenciaDias = Math.ceil((fechafinal - fechainicio) / (1000 * 60 * 60 * 24));
    if (diferenciaDias > 30) {
      alert('Excede tiempo de reserva. No se puede reservar más de 30 días.');
      return;
    }

    try {
      const reservaData = {
        idLibro,
        idUsuario: 1,
        fechainicio: fechaInicio,
        fechafinal: fechaFinal,
      };

      const response = await fetch('/api/reservas/realizarReserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        console.log('Reserva guardada correctamente en la API.');
        mostrarNotificacion('success', 'Reserva exitosa');
      } else {
        console.error('Error al guardar la reserva en la API:', await response.text());
        mostrarNotificacion('error', 'Error al realizar la reserva');
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      mostrarNotificacion('error', 'Error al realizar la reserva');
    }
  };

  const totalPaginas = Math.ceil(opcionesFiltradas.length / elementosPorPagina);
  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  const librosPaginaActual = opcionesFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      const nuevaPagina = paginaActual - 1;
      const query = {
        palabraclave,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
        categorias,
        pagina: nuevaPagina,
      };
      router.push(`/pantalla13?${new URLSearchParams(query).toString()}`);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      const nuevaPagina = paginaActual + 1;
      const query = {
        palabraclave,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
        categorias,
        pagina: nuevaPagina,
      };
      router.push(`/pantalla13?${new URLSearchParams(query).toString()}`);
    }
  };

  const handleRegresar = () => {
    router.push('/pantalla12');
  };

  return (
    <Layout content={
      <>
        <h1>Resultados de la búsqueda</h1>
        
        <button onClick={() => router.push('/pantalla14')}>Ver Reservas</button>

        <div className="results">
          {librosPaginaActual.map((opcion) => (
            <div key={opcion.id} className="libro">
              <img src={opcion.imagenLibro} alt={opcion.titulo} />
              <p>{opcion.titulo}</p>
              {checkbox2 === 'autor' && <p>Autor(es): {opcion.autor}</p>}
              {checkbox3 === 'editorial' && <p>Editorial: {opcion.editorial}</p>}
              {checkbox4 === 'ISBN' && <p>ISBN: {opcion.ISBN}</p>}

              <DatePicker selected={fechaFinal} onChange={date => setFechaFinal(date)} />

              <button onClick={() => handleReservar(opcion.id)}>Reservar</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          {paginaActual > 1 && <button onClick={handlePaginaAnterior}>Anterior</button>}
          {paginaActual < totalPaginas && <button onClick={handlePaginaSiguiente}>Siguiente</button>}
        </div>
        <br/>
        <button onClick={handleRegresar}>Regresar a la búsqueda</button>

        {/* Mostrar la notificación */}
        {notificacion && (
          <div className={`notificacion ${notificacion.tipo}`}>
            {notificacion.mensaje}
          </div>
        )}
      </>
    } />
  );
};

export default Pantalla13;
