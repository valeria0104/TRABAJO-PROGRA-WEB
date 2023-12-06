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


  const agregarReserva = (reserva) => {
    setReservas([...reservas, reserva]);
  };
    
  // Función para calcular la fecha final (ejemplo: 30 días después de la fecha de inicio)
  const calcularFechaFinal = (fechaInicio) => {
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaInicio.getDate() + 30); // Ajusta según tus necesidades
    return fechaFinal;
  };
  
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(calcularFechaFinal(new Date()));

  // Filtra los datos en función de las opciones seleccionadas y la palabra clave
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
          (checkbox4 && checkbox4 === 'ISBN' && tieneISBN))) // Cambiado a ISBN
    );
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  useEffect(() => {
    // Realiza la solicitud para obtener la lista de libros desde la API
    fetch('/api/busqueda/libros')  // Asegúrate de que esta ruta sea correcta
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Agrega este console.log para verificar la estructura de los datos
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
    // Actualiza las opciones seleccionadas cuando cambia la URL
    const opcionesDesdeURL = [checkbox1, checkbox2, checkbox3, checkbox4].filter(Boolean);
    setOpcionesSeleccionadas(opcionesDesdeURL.map((opcion) => ({ categoria: opcion })));
  }, [router.query]);

  useEffect(() => {
    // Actualiza la página actual cuando cambia la URL
    const pagina = parseInt(router.query.pagina, 10) || 1;
    setPaginaActual(pagina);
  }, [router.query.pagina]);

  const handleReservar = async (idLibro) => {
    const fechainicio = new Date(); // Puedes ajustar esto según tus necesidades
    const fechafinal = calcularFechaFinal(fechainicio); // Implementa lógica para calcular la fecha final
    
    // Verifica si ha pasado más de 30 días desde la fecha inicial
    const diferenciaDias = Math.ceil((fechafinal - fechainicio) / (1000 * 60 * 60 * 24));
    if (diferenciaDias > 30) {
      alert('Excede tiempo de reserva. No se puede reservar más de 30 días.');
      return;
    }
  
    try {
      const reservaData = {
        idLibro,
        idUsuario: 1, // Reemplaza con la lógica para obtener el ID del usuario actual
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
        // Puedes realizar acciones adicionales si es necesario
      } else {
        console.error('Error al guardar la reserva en la API:', await response.text());
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
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

              {/* Uso de DatePicker para la fecha final */}
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
        <button onClick={handleRegresar}>Regresar a la busqueda</button>
      </>
    } />
  );
};

export default Pantalla13;
