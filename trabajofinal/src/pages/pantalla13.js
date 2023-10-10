import Layout from './componentes/Layout3.js';
import datos from './json/archivo.json';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Pantalla13 = () => {
  const router = useRouter();
  const { palabraclave, checkbox1, checkbox2, checkbox3, checkbox4, categorias } = router.query;
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);

  
// Filtra los datos en función de las opciones seleccionadas y la palabra clave
const opcionesFiltradas = datos.filter((opcion) => {
  // Verificar si la propiedad "editorial" está definida y no es null
  const tieneEditorial = opcion.editorial && opcion.editorial.toLowerCase().includes(palabraclave?.toLowerCase());

  // Verificar si la propiedad "ISBN13" está definida y no es null
  const tieneISBN13 = opcion.ISBN13 && opcion.ISBN13.toLowerCase().includes(palabraclave?.toLowerCase());

  // Verificar si la categoría está incluida en las categorías seleccionadas
  const categoriaSeleccionada = categorias && categorias.includes(opcion.categoria);

   // Verificar si al menos uno de los checkboxes está seleccionado
   const alMenosUnCheckboxSeleccionado = checkbox1 || checkbox2 || checkbox3 || checkbox4;

   return (
    // Filtrar por categoría seleccionada si solo una categoría está seleccionada
    (categorias && categorias.length === 1 && categoriaSeleccionada) ||
    // Filtrar por categoría seleccionada y checkboxes si al menos un checkbox está seleccionado
    (categorias && categorias.length > 1 && categoriaSeleccionada && alMenosUnCheckboxSeleccionado) ||
    // Filtrar por checkboxes si están seleccionados
    (!categorias && alMenosUnCheckboxSeleccionado &&
      ((checkbox1 && checkbox1 === 'titulo' && opcion.titulo.toLowerCase().includes(palabraclave?.toLowerCase())) ||
      (checkbox2 && checkbox2 === 'autor' && opcion.autor.toLowerCase().includes(palabraclave?.toLowerCase())) ||
      (checkbox3 && checkbox3 === 'editorial' && tieneEditorial) ||
      (checkbox4 && checkbox4 === 'ISBN13' && tieneISBN13)))
  );
});

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  
  useEffect(() => {
    if (categorias) {
      const categoriasArray = Array.isArray(categorias) ? categorias : [categorias];
      setOpcionesSeleccionadas(categoriasArray.map((categoria) => ({ categoria })));
    }
  }, [categorias]);

  useEffect(() => {
    // Actualiza las opciones seleccionadas cuando cambia la URL
    const opcionesDesdeURL = [checkbox1, checkbox2, checkbox3, checkbox4].filter(Boolean);
    setOpcionesSeleccionadas(opcionesDesdeURL);
  }, [router.query]);

  useEffect(() => {
    // Actualiza la página actual cuando cambia la URL
    const pagina = parseInt(router.query.pagina, 10) || 1;
    setPaginaActual(pagina);
  }, [router.query.pagina]);

  const handleReservar = (titulo) => {
    // Agrega aquí la lógica para realizar la reserva del libro con el título dado
    alert(`Reservando el libro: ${titulo}`);
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
        <div className="results">
          {librosPaginaActual.map((opcion) => (
            <div key={opcion.ISBN} className="libro">
              <img src={opcion["imagen-portada-url"]} alt={opcion.titulo} />
              <p>{opcion.titulo}</p>
              {checkbox2 === 'autor' && <p>Autor(es): {opcion.autor}</p>}
              {checkbox3 === 'editorial' && <p>Editorial: {opcion.editorial}</p>}
              {checkbox4 === 'ISBN13' && <p>ISBN: {opcion.ISBN13}</p>}
              <button onClick={() => handleReservar(opcion.titulo)}>Reservar</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          {paginaActual > 1 && <button onClick={handlePaginaAnterior}>Anterior</button>}
          {paginaActual < totalPaginas && <button onClick={handlePaginaSiguiente}>Siguiente</button>}
        </div>
        <br/>
        <button onClick={handleRegresar}>Anterior</button>
      </>
    } />
  );
};

export default Pantalla13;
