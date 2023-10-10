import Layout from './componentes/Layout3.js';
import datos from './json/archivo.json'
import { useState, useEffect } from 'react';
import { buscarOpcionesPorCategoria } from './funciones';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    const [categoria, setCategoria] = useState('');
    const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);
    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [errorMensaje, setErrorMensaje] = useState(''); // Declarar el estado errorMensaje
    const elementosPorPagina = 5;

    const handleBuscar = () => {
        const palabraclave = document.getElementById('palabraclave').value;
        const checkbox1 = document.getElementById('checkbox1').checked ? 'titulo' : '';
        const checkbox2 = document.getElementById('checkbox2').checked ? 'autor' : '';
        const checkbox3 = document.getElementById('checkbox3').checked ? 'editorial' : '';
        const checkbox4 = document.getElementById('checkbox4').checked ? 'ISBN13' : '';
      
       // Obtiene las categorías seleccionadas
  const categoriasSeleccionadas = opcionesSeleccionadas.map((opcion) => opcion.categoria);

  // Agrega las categorías seleccionadas a la URL
  router.push(`/pantalla13?palabraclave=${palabraclave}&checkbox1=${checkbox1}&checkbox2=${checkbox2}&checkbox3=${checkbox3}&checkbox4=${checkbox4}&categorias=${categoriasSeleccionadas.join(',')}`, undefined, { shallow: true });
};
    

    const handleLimpiar = () => {
        // Recargar la página
        window.location.reload();
      };

    useEffect(() => {
        const opcionesFiltradas = buscarOpcionesPorCategoria(categoria);
        setOpcionesFiltradas(opcionesFiltradas);
        setPaginaActual(1); // Restablecer a la primera página cuando cambie la categoría
    }, [categoria]);

    useEffect(() => {
        const checkbox1 = document.getElementById('checkbox1').checked ? 'titulo' : '';
        const checkbox2 = document.getElementById('checkbox2').checked ? 'autor' : '';
        const checkbox3 = document.getElementById('checkbox3').checked ? 'editorial' : '';
        const checkbox4 = document.getElementById('checkbox4').checked ? 'ISBN13' : '';
      
        const query = `?palabraclave=${router.query.palabraclave || ''}&checkbox1=${checkbox1}&checkbox2=${checkbox2}&checkbox3=${checkbox3}&checkbox4=${checkbox4}`;
        
        // Actualiza la URL sin recargar la página
        console.log("query:", query);
        router.replace({ pathname: '/pantalla12', query }, undefined, { shallow: true });
      }, [router]);

    const handleCategoriaChange = (e) => {
        const nuevaCategoria = e.target.value;
        setCategoria(nuevaCategoria);
    };
    
    const handleEliminarOpcion = (opcion) => {
        const opcionesActualizadas = opcionesSeleccionadas.filter((o) => o.ISBN !== opcion.ISBN);
        setOpcionesSeleccionadas(opcionesActualizadas);
    };

    const handleSeleccionarOpcion = (opcion) => {
        // Verificar si la opción ya está en las opciones seleccionadas
        const existeOpcion = opcionesSeleccionadas.some((o) => o.ISBN === opcion.ISBN);
        
        if (!existeOpcion) {
            // Verificar si la opción ya existe en la lista de opciones filtradas
            const existeEnFiltradas = opcionesFiltradas.some((o) => o.ISBN === opcion.ISBN);
            if (existeEnFiltradas) {
                setOpcionesSeleccionadas([...opcionesSeleccionadas, opcion]);
                setErrorMensaje(''); // Limpiar el mensaje de error
            } else {
                setErrorMensaje('La opción no existe en la lista de opciones filtradas.');
            }
        } else {
            setErrorMensaje('Ya has seleccionado una opción con el mismo nombre.');
        }

         // Obtener categorías seleccionadas
        const categoriasSeleccionadas = opcionesFiltradas.map((opcion) => opcion.categoria);

        // Agregar las categorías seleccionadas a la URL
        const query = `?palabraclave=${palabraclave}&checkbox1=${checkbox1}&checkbox2=${checkbox2}&checkbox3=${checkbox3}&checkbox4=${checkbox4}&categorias=${categoriasSeleccionadas.join(',')}`;

        // Actualizar la URL sin recargar la página
        router.replace({ pathname: '/pantalla12', query }, undefined, { shallow: true });
    };


    const totalPages = Math.ceil(opcionesFiltradas.length / elementosPorPagina);

    const handlePaginaAnterior = () => {
        setPaginaActual((prevPagina) => Math.max(prevPagina - 1, 1));
    };

    const handlePaginaSiguiente = () => {
        setPaginaActual((prevPagina) => Math.min(prevPagina + 1, totalPages));
    };

    const indexOfLastElement = paginaActual * elementosPorPagina;
    const indexOfFirstElement = indexOfLastElement - elementosPorPagina;
    const elementosPaginaActual = opcionesFiltradas.slice(indexOfFirstElement, indexOfLastElement);



    return (
        <Layout content={

            <>
                <div>

                    <div id="cuerpo">
                        <p className="Busqueda">Búsqueda</p>
                        <hr />
                        <br />
                        <section className="cuerpo3">
                            <div className='container'>
                                <ul id="ul12">
                                    <li><label id="label2"><span className="resaltado2">Ingresa la palabra clave</span></label>
                                        <input className="input-box" type="text" id="palabraclave" name="pc" />
                                    </li>
                                    <li><label id="label2"><span className="resaltado2">Tipo de recurso</span></label>
                                        <div className="input-with-link">
                                            <input className="input-box" type="text" id="tiporecurso" name="tr" value={categoria} onChange={handleCategoriaChange} />
                                        </div>
                                    </li>
                                </ul>

                                <ul>
                                    {elementosPaginaActual.map((opcion) => (
                                        <li key={opcion.ISBN}>
                                            {opcion.categoria}
                                            <button onClick={() => handleSeleccionarOpcion(opcion)}>Seleccionar</button>
                                        </li>
                                    ))}
                                </ul>

                                <div>
                                    <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
                                    <button onClick={handlePaginaSiguiente} disabled={paginaActual === totalPages}>Siguiente</button>
                                </div>

                                <div>
                                    <h2>Opciones seleccionadas:</h2>
                                    <ul>
                                        {opcionesSeleccionadas.map((opcion) => (
                                            <li key={opcion.ISBN}>
                                                {opcion.categoria}
                                                <button className="buttonX" onClick={() => handleEliminarOpcion(opcion)}>x</button>
                                            </li>
                                        ))}
                                    </ul>
                                    {errorMensaje && <div className="error-message">{errorMensaje}</div>}
                                </div>

                                  <form className="form1" method="post" action="/process" >
                                    <p className="">Incluir búsqueda en</p>
                                    <label className="labelA" for="checkbox1">Titulo</label>
                                    <input className="box" type="checkbox" id="checkbox1" name="checkbox1" value="titulo" /> <br />

                                    <label className="labelA" for="checkbox2">Autor(ers)</label>
                                    <input className="box" type="checkbox" id="checkbox2" name="checkbox2" value="autor" /> <br />

                                    <label className="labelA" for="checkbox3">Editorial</label>
                                    <input className="box" type="checkbox" id="checkbox3" name="checkbox3" value="editorial"/> <br />

                                    <label className="labelA" for="checkbox4">ISBM</label>
                                    <input className="box" type="checkbox" id="checkbox4" name="checkbox4" value="ISBN13" /> <br />
                                </form>
                            </div>

                        </section>
                            <div className="buttons">
                                <input type="button" value="Limpiar" className="limpiar-button" onClick={handleLimpiar}/> <t></t>
                                <input type="button" value="Buscar" className="buscar-button" onClick={handleBuscar}/>
                            </div>
                    </div>
                </div>
            </>
        } />
    );
};

export default Index;
