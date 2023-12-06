import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from './componentes/Layout.js';
import { useAuth } from './context/demo'; // Importa el contexto de autenticación

const Busqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultBusqueda, setResultBusqueda] = useState([]);
  const [librosMostrar, setLibrosMostrar] = useState(12);
  const [selectedData, setSelectedData] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(null);
  const { state } = useAuth();
  const user = state.user;
  const welcomeMessage = user ? `Bienvenido, ${user.nombres} ` : 'Bienvenido';

  const handleReservar  = async (idLibro) => {
    const fechaActual = new Date();
    const fechaFinalReserva = new Date();
    fechaFinalReserva.setDate(fechaFinalReserva.getDate() + 30);
    
    try {
      const reservaData = {
        idLibro,
        idUsuario: user.id,
        fechainicio: fechaActual,
        fechafinal: fechaFinalReserva,
      };

      const response = await fetch('/api/muestra/realizarReserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        console.log('Reserva realizada correctamente.');
        setSelectedData(data);
        // Puedes realizar acciones adicionales después de realizar la reserva
      } else {
        console.error('Error al realizar la reserva:',  await response.text());
        // Manejo de errores
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      // Manejo de errores
    }
  };
  useEffect(() => {
    console.log('Antes de la llamada a la API');
    fetch('/api/muestra/libros')  // Actualiza el endpoint para que coincida con tu API de backend
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos recibidos:', data);
        
        // Filtrar los resultados de la API basándonos en la búsqueda
        const results = data.libros.filter((libro) =>
          libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
        );

        setResultBusqueda(results);
      })
      .catch((error) => console.error('Error al obtener datos de libros:', error));
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
                <Link id= "a1" href="/pantalla8">Añadir un nuevo recurso</Link>
              </p>
            </div>
            <hr />
            <li id="lipage6">
              <label id="labelpage6"><span className="resaltado">Ingrese la palabra clave:</span></label>
              <div className="contenidoBusqueda">
                <img src="busqueda.png" alt="Icono de búsqueda" className="iconoBusqueda" />
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
                <div key={libro.id} className="libro">
                  <h2>{libro.titulo}</h2>
                  <div id="imagen_page6">
                    <img src ={libro['imagenLibro']} alt={`Portada de ${libro.titulo}`} />
                  </div>
                  <p id="librospage6">id: {libro.id}</p>

                  <p id="librospage6">ISBN: {libro.ISBN}</p>
                  <p id="librospage6">Autor: {libro.autor}</p>
                  <p id="librospage6">Editorial: {libro.editorial}</p>
                  <div id="botonpage6">
                    <a>
                    <button onClick={() => handleReservar(libro.id)}>Reservar</button></a></div>
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