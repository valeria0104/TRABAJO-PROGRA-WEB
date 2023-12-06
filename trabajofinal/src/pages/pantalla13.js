import Layout from './componentes/Layout3.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
  
  // Filtra los datos en función de las opciones seleccionadas y la palabra clave
  const opcionesFiltradas = libros.filter((opcion) => {
    const tieneEditorial = opcion.editorial && opcion.editorial.toLowerCase().includes(palabraclave?.toLowerCase());
    const tieneISBN = opcion.ISBN && opcion.ISBN.toLowerCase().includes(palabraclave?.toLowerCase()); // Cambiado a ISBN
    const categoriaSeleccionada = categorias && categorias.includes(opcion.categoria);
    const alMenosUnCheckboxSeleccionado = checkbox1 || checkbox2 || checkbox3 || checkbox4;

    return (
      (categorias && categorias.length === 1 && categoriaSeleccionada) ||
      (categorias && categorias.length > 1 && categoriaSeleccionada && alMenosUnCheckboxSeleccionado) ||
      (!categorias && alMenosUnCheckboxSeleccionado &&
        ((checkbox1 && checkbox1 === 'titulo' && opcion.titulo.toLowerCase().includes(palabraclave?.toLowerCase())) ||
          (checkbox2 && checkbox2 === 'autor' && opcion.autor.toLowerCase().includes(palabraclave?.toLowerCase())) ||
          (checkbox3 && checkbox3 === 'editorial' && tieneEditorial) ||
          (checkbox4 && checkbox4 === 'isbn' && tieneISBN))) // Cambiado a ISBN
    );
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  useEffect(() => {
    // Realiza la solicitud para obtener la lista de libros desde la API
    fetch('/api/busqueda/libros')  // Asegúrate de que esta ruta sea correcta
      .then((response) => response.json())
      .then((data) => {
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

  const handleReservar = (titulo, imagenPortada, ISBN, urlCompra) => {
    // Agregar el libro a la lista de reservas con una fecha de reserva en blanco
    agregarReserva({ titulo, "imagenlibro": imagenPortada, ISBN, "url-compra": urlCompra, fechareserva: "" });
    alert(`Reservando el libro: ${titulo}`);

    // Crear un objeto con los datos de la reserva (ajusta esto según tus necesidades)
    const reservaData = {
      titulo, // Aquí está el título del libro
      "imagenlibro": imagenPortada,
      ISBN,
      "url-compra": urlCompra,
      fechareserva: "", // Aquí se agrega una fecha en blanco
    };

    // Realizar la solicitud para guardar la reserva en la API
    fetch('/api/reservas', {  // Cambia la ruta a /api/reservas
      method: 'POST',  // Cambia el método a POST
      body: JSON.stringify(reservaData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reserva guardada correctamente en la API.');
        } else {
          console.error('Error al guardar la reserva en la API.');
        }
      })
      .catch((error) => {
        console.error('Error al guardar la reserva en la API:', error);
      });
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
              {checkbox4 === 'isbn' && <p>ISBN: {opcion.isbn}</p>}
              <button onClick={() => handleReservar(opcion.titulo, opcion.imagenlibro, opcion.isbn, opcion["url-compra"])}>Reservar</button>
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