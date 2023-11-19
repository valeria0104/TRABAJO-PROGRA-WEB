import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from './componentes/Layout.js';
import dato from "./json/archivo.json";

const Busqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultBusqueda, setResultBusqueda] = useState([]);
  const [librosMostrar, setLibrosMostrar] = useState(12);
  const [selectedData, setSelectedData] = useState(null);
  const handleSave = (data) => {
    const fechaActual = new Date();

    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const fechaReserva = new Intl.DateTimeFormat('es-ES', options).format(fechaActual);

    const reservaData = {
      titulo: data.titulo,
      "imagen-portada-url": data["imagen-portada-url"],
      ISBN13: data.ISBN13,
      "url-compra": data["url-compra"],
      fechaReserva: fechaReserva,

    };

    fetch('/api/guardarReserva', {
      method: 'PUT',
      body: JSON.stringify(reservaData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reserva guardada correctamente en el archivo "reservas.json".');
          setSelectedData(data); 
        } else {
          console.error('Error al guardar la reserva en el archivo "reservas.json".');
        }
      })
      .catch((error) => {
        console.error('Error al guardar la reserva en el archivo "reservas.json":', error);
      });
  };

  useEffect(() => {
    const results = dato.filter((libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultBusqueda(results);
  }, [busqueda]);

  const CargarLibros = () => {
    setLibrosMostrar(librosMostrar + 12);
  };

  return (
    <Layout content={
      <>
        <div>
          <div id="cuerpo">
            <div className="Librooo">
              <h1>Buscar Libros</h1>
              <p id="nuevorecurso">
                <a href="pantalla8.html">Añadir un nuevo recurso</a>
              </p>
            </div>
            <hr />
            <li id="lipage6">
              <label id="labelpage6"><span className="resaltado">Ingrese la palabra clave:</span></label>
              <div class="contenidoBusqueda">
                <img src="busqueda.png" alt="Icono de búsqueda" class="iconoBusqueda" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
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
                    <img src ={libro['imagen-portada-url']} alt={`Portada de ${libro.titulo}`} />
                  </div>
                  <p id="librospage6">ISBN: {libro.ISBN}</p>
                  <p id="librospage6">Autor: {libro.autor}</p>
                  <p id="librospage6">Editorial: {libro.editorial}</p>
                  <div id="botonpage6">
                    <a>
                  <button onClick={() => handleSave(libro)}>Reservar</button></a></div>
                </div>
              ))}
            </div>
            <div id="botonpage6">
              <a>
                {librosMostrar < resultBusqueda.length && (
                  <button onClick={CargarLibros}>Cargar más libros</button>
                )}
              </a>
            </div>
          </div>
        </div>
      </>
    }
    ></Layout>
  );
};

export default Busqueda;
