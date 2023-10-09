import Link from "next/link"
import Head from "next/head"
import React, { useState, useEffect } from "react";
import Layout from './componentes/Layout.js'
import dato from "./json/archivo.json"
 
const  Busqueda = () =>  {
  const [busqueda, setbusqueda] = useState("");
  const [resultBusqueda, setresultBusqueda] = useState([]);
  const [librosMostrar, setlibrosMostrar] = useState(10);

  useEffect(() => {
    const results = dato.filter((libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setresultBusqueda(results);
  }, [busqueda]);

  const CargarLibros = () => {
    setlibrosMostrar(librosMostrar + 10); // Aumenta en 10 el número de libros a mostrar
  };

  return (
    <Layout content={
        <><div id="cuerpo">
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
            <div>
                    
                    <h1>Buscar Libros</h1>
                    <input type="button" value="Añadir un nuevo recurso" className="nuevorecurso-button"/>
                    <hr />
                    <input
                        type="text"
                        placeholder="Buscar libro..."
                        value={busqueda}
                        onChange={(e) => setbusqueda(e.target.value)}
                    />
            
                    <div className="results">
                    {resultBusqueda.slice(0, librosMostrar).map((libro, index) => (
                            <div key={index} className="libro">
                                <h2>{libro.titulo}</h2>
                                <img src={libro['imagen-portada-url']} alt={`Portada de ${libro.titulo}`} />
                                <p>ISBM: {libro.ISBN13}</p>
                                <p>Autor: {libro.autor}</p>
                                <p>Editorial: {libro.editorial}</p>
                            </div>
                        ))}
                    </div>
                    {librosMostrar < resultBusqueda.length && (
                     <button onClick={CargarLibros}>Cargar más libros</button>
          )}
                </div>
            </div>
        </>
    } ></Layout>
)
}

export default Busqueda;