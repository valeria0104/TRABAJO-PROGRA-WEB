import Link from "next/link"
import Head from "next/head"
import React, { useState, useEffect } from "react";
import Layout from './componentes/Layout.js'
import dato from "./json/archivo.json"

const Busqueda = () => {
    const [busqueda, setbusqueda] = useState("");
    const [resultBusqueda, setresultBusqueda] = useState([]);
    const [librosMostrar, setlibrosMostrar] = useState(12);

    useEffect(() => {
        const results = dato.filter((libro) =>
            libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
        );
        setresultBusqueda(results);
    }, [busqueda]);

    const CargarLibros = () => {
        setlibrosMostrar(librosMostrar + 12); // Aumenta en 10 el número de libros a mostrar
    };

    return (
        <Layout content={
            <>
                <div>
                    <div id="cuerpo">

                        <div className="Librooo">
                            <h1>Buscar Libros</h1>
                            <p id="nuevorecurso">
                                <a href="pantalla.html">Añadir un nuevo recurso</a>
                            </p>
                        </div>
                        <hr />

                        <li id="lipage6"><label id="labelpage6"><span className="resaltado">Ingrese la palabra clave:</span></label>

                        <div class="contenidoBusqueda">
                            <img src="busqueda.png" alt="Icono de búsqueda" class="iconoBusqueda" />
                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setbusqueda(e.target.value)}
                                className="input-boxpage6"
                                id="opage6"
                                name="npage6"
                            />
                        </div>
                    </li>
                    <div className="results">
                        {resultBusqueda.slice(0, librosMostrar).map((libro, index) => (
                            <div key={index} className="libro">
                                <h2>{libro.titulo}</h2>
                                <div id="imagen_page6">
                                    <img src={libro['imagen-portada-url']} alt={`Portada de ${libro.titulo}`} /></div>
                                <p>ISBN: {libro.ISBN}</p>
                                <p>Autor: {libro.autor}</p>
                                <p>Editorial: {libro.editorial}</p>
                            </div>
                        ))}
                    </div>
                    <div id="nuevorecurso">
                        <a>
                    {librosMostrar < resultBusqueda.length && (
                        <button onClick={CargarLibros}>Cargar más libros</button>
                    )}</a></div>
                </div>
            </div>
                
            </>
        }
        ></Layout >
    )
}

export default Busqueda;