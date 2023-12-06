import Layout from './componentes/Layout3.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { elementosPorPagina } from './index';


const pantalla12 = () => {
    const router = useRouter();
    const [categoria, setCategoria] = useState('');
    const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);
    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [categorias, setCategorias] = useState([]);
  
    const elementosPorPagina = 5;

    const handleBuscar = () => {
        const palabraclave = document.getElementById('palabraclave').value;
        const checkbox1 = document.getElementById('checkbox1').checked ? 'titulo' : '';
        const checkbox2 = document.getElementById('checkbox2').checked ? 'autor' : '';
        const checkbox3 = document.getElementById('checkbox3').checked ? 'editorial' : '';
        const checkbox4 = document.getElementById('checkbox4').checked ? 'ISBN' : '';
    
        const categoriasSeleccionadas = opcionesSeleccionadas.map((opcion) => opcion.categoria);
    
        console.log('Categoría seleccionada:', categoria);  // Agrega esta línea para imprimir en la consola
    
        router.push(
            `/pantalla13?palabraclave=${palabraclave}&checkbox1=${checkbox1}&checkbox2=${checkbox2}&checkbox3=${checkbox3}&checkbox4=${checkbox4}&categorias=${categoriasSeleccionadas.join(',')}`,
            undefined,
            { shallow: true }
        );
    };

    

    const obtenerCategorias = async () => {
        try {
            const response = await fetch('/api/busqueda/categoria');
            if (response.ok) {
                const data = await response.json();
                setCategorias(data.categorias);
            } else {
                const errorMessage = await response.text();
                setErrorMensaje(`Error al obtener las categorías del backend: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            setErrorMensaje('Error al obtener las categorías del backend.');
        }
    };
    
      // Llamar a obtenerCategorias al cargar el componente
      useEffect(() => {
        obtenerCategorias();
      }, []);
    

    const handleLimpiar = () => {
        window.location.reload();
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };

    const handleSeleccionarCategoria = (categoria) => {
        const nuevaCategoria = { id: categoria, categoria };
    
        // Verificar si la categoría ya está presente en opcionesSeleccionadas
        if (!opcionesSeleccionadas.some((c) => c.id === nuevaCategoria.id)) {
            setOpcionesSeleccionadas((prevOpciones) => [...prevOpciones, nuevaCategoria]);
        } else {
            // Mostrar un mensaje de error o realizar alguna acción indicando que la categoría ya está seleccionada
            console.warn('La categoría ya está seleccionada.');
        }
    };

    const handleEliminarCategoria = (categoria) => {
        const opcionesActualizadas = opcionesSeleccionadas.filter((c) => c.id !== categoria.id);
        setOpcionesSeleccionadas(opcionesActualizadas);
    };

    const handlePaginaAnterior = () => {
        setPaginaActual((prevPagina) => Math.max(prevPagina - 1, 1));
    };

    const handlePaginaSiguiente = () => {
        setPaginaActual((prevPagina) => Math.min(prevPagina + 1, totalPages));
    };
    const totalPages = Math.ceil(categorias.length / elementosPorPagina);
    const indexOfLastElement = paginaActual * elementosPorPagina;
    const indexOfFirstElement = indexOfLastElement - elementosPorPagina;
    const categoriasPaginaActual = categorias.slice(indexOfFirstElement, indexOfLastElement);
    
    useEffect(() => {
        const checkbox1 = document.getElementById('checkbox1').checked ? 'titulo' : '';
        const checkbox2 = document.getElementById('checkbox2').checked ? 'autor' : '';
        const checkbox3 = document.getElementById('checkbox3').checked ? 'editorial' : '';
        const checkbox4 = document.getElementById('checkbox4').checked ? 'ISBN' : '';

        const query = `?palabraclave=${router.query.palabraclave || ''}&checkbox1=${checkbox1}&checkbox2=${checkbox2}&checkbox3=${checkbox3}&checkbox4=${checkbox4}`;
        router.replace({ pathname: '/pantalla12', query }, undefined, { shallow: true });
    }, [router]);
    


    return (
        <Layout
            content={
                <>
                    <div>
                        <div id="cuerpo">
                            <p className="Busqueda">Búsqueda</p>
                            <hr />
                            <br />
                            <section className="cuerpo3">
                                <div className="container">
                                    <ul id="ul12">
                                        <li>
                                            <label id="label2">
                                                <span className="resaltado2">Ingresa la palabra clave</span>
                                            </label>
                                            <input className="input-box" type="text" id="palabraclave" name="pc" />
                                        </li>
                                        <li>
                                            <label id="label2">
                                                <span className="resaltado2">Tipo de recurso</span>
                                            </label>
                                            <div className="input-with-link">
                                                <input className="input-box" type="text" id="tiporecurso" name="tr" value={categoria} onChange={handleCategoriaChange} />
                                            </div>
                                        </li>
                                    </ul>

                                    {Array.isArray(categoriasPaginaActual) && categoriasPaginaActual.length > 0 ? (
                                        <ul>
                                            {categoriasPaginaActual.map((categoria) => (
                                                <li key={categoria}>
                                                    {categoria}
                                                    <button onClick={() => handleSeleccionarCategoria(categoria)}>Seleccionar</button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay categorías disponibles.</p>
                                    )}


                                    <div>
                                        <button onClick={handlePaginaAnterior} disabled={!opcionesFiltradas || paginaActual === 1}>
                                            Anterior
                                        </button>
                                        <button onClick={handlePaginaSiguiente} disabled={!opcionesFiltradas || paginaActual === totalPages}>
                                            Siguiente
                                        </button>

                                    </div>

                                    <div>
                                        <h2>Opciones seleccionadas:</h2>
                                        <ul>
                                            {opcionesSeleccionadas.map((opcion) => (
                                                <li key={opcion.id}>
                                                    {opcion.categoria}
                                                    <button className="buttonX" onClick={() => handleEliminarCategoria(opcion)}>
                                                        x
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        {errorMensaje && <div className="error-message">{errorMensaje}</div>}
                                    </div>

                                    <form className="form1" method="post" action="/process">
                                        <p className="">Incluir búsqueda en</p>
                                        <label className="labelA" htmlFor="checkbox1">
                                            Título
                                        </label>
                                        <input className="box" type="checkbox" id="checkbox1" name="checkbox1" value="titulo" /> <br />

                                        <label className="labelA" htmlFor="checkbox2">
                                            Autor(ers)
                                        </label>
                                        <input className="box" type="checkbox" id="checkbox2" name="checkbox2" value="autor" /> <br />

                                        <label className="labelA" htmlFor="checkbox3">
                                            Editorial
                                        </label>
                                        <input className="box" type="checkbox" id="checkbox3" name="checkbox3" value="editorial" /> <br />

                                        <label className="labelA" htmlFor="checkbox4">
                                            ISBN
                                        </label>
                                        <input className="box" type="checkbox" id="checkbox4" name="checkbox4" value="isbn" /> <br />
                                    </form>
                                </div>
                            </section>
                            <div className="buttons">
                                <input type="button" value="Limpiar" className="limpiar-button" onClick={handleLimpiar} /> <t></t>
                                <input type="button" value="Buscar" className="buscar-button" onClick={handleBuscar} />
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    );
};
export default pantalla12;