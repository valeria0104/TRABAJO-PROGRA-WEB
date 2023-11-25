import Link from "next/link";
import Head from "next/head";
import Layout7 from './componentes/Layout7.js';
import datos from './json/archivo.json';
import { useAuth } from './context/demo'; // Importa el contexto de autenticación
import React, { useEffect, useState } from 'react'; 

function sumarDiasAFecha(fecha, dias) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  return nuevaFecha;
}

async function obtenerDatos(setLibrosMasPedidos, setLibrosAMostrar2) {
  try {
    // Obtener las últimas reservas
    const response = await fetch('/api/reservas');
    const data = await response.json();

    // Obtener las reservas más frecuentes
    const pedidosPorLibro = {};
    data.forEach((libro) => {
      pedidosPorLibro[libro.titulo] = (pedidosPorLibro[libro.titulo] || 0) + 1;
    });

    // Ordenar los libros por la cantidad de pedidos en orden descendente
    const librosMasPedidos = Object.keys(pedidosPorLibro)
      .map((titulo) => ({
        titulo,
        pedidos: pedidosPorLibro[titulo],
      }))
      .sort((a, b) => b.pedidos - a.pedidos)
      .slice(0, 10);

    // Obtener los libros próximos a vencer
    const hoy = new Date(); // Fecha actual
    const librosAMostrar2 = data.map((libro) => {
      // Obtener la fecha y hora de reserva desde el JSON
      const [dia, mes, año] = libro.fechaReserva.split('/');
      const [hora, minuto] = libro.horaReserva.split(':');
      const fechaReserva = new Date(`${año}-${mes}-${dia}T${hora}:${minuto}:00Z`);

      const diasRestantes = Math.floor((fechaReserva - hoy) / (1000 * 60 * 60 * 24));

      if (diasRestantes < 15) {
        const nuevaFechaReserva = sumarDiasAFecha(libro.fechaReserva, 15).toLocaleString();

        return {
          ...libro,
        };
      }

      return null;
    })
    .filter(Boolean);

    setLibrosMasPedidos(librosMasPedidos);
    setLibrosAMostrar2(librosAMostrar2);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
  }
}

function App() {
  const { state } = useAuth();
  const user = state.user;
  const welcomeMessage = user ? `Bienvenido, ${user.nombres}` : 'Bienvenido';

  const [librosMasPedidos, setLibrosMasPedidos] = useState([]);
  const [librosAMostrar2, setLibrosAMostrar2] = useState([]);

  useEffect(() => {
    obtenerDatos(setLibrosMasPedidos, setLibrosAMostrar2);
  }, []);
  return (
    <Layout7 
      content={
        <div>
          <div id="cuerpo">
            <p className="Bienvenido">{welcomeMessage}</p>
            <hr />
            <br />
            <p1>Reservas más frecuentes</p1>
            <br /><br />
            <section className="cuerpo1">
              {librosMasPedidos.map((libro, index) => (
                <div key={index} className="cuadrado">
                  <div className="cuadrado_img">
                    <img src="foto_usuario.png" alt="" height="40px" />
                  </div>
                  <div className="cuadrado_letras">
                    <p>
                      <a href="pantalla3.html">{libro.titulo}</a>
                      <br/>
                      {` Pedidos: ${libro.pedidos}`}
                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a href="pantalla3.html">
                      <img src={datos.find((d) => d.titulo === libro.titulo)['imagen-portada-url']} height="100px" />
                    </a>
                  </div>
                </div>
              ))}
            </section>
            <br />
            <p1>Próximos a vencer</p1>
            <br /><br />
            <section className="cuerpo1">
              {librosAMostrar2.map((libro, index) => (
                <div key={index} className="cuadrado">
                  <div className="cuadrado_img">
                    <img src="foto_usuario.png" alt="" height="40px" />
                  </div>
                  <div className="cuadrado_letras">
                    <p>
                      <a href="pantalla3.html">{libro.titulo}</a>
                      <br/>
                      {libro.fechaReserva} , {libro.fechaFinal}
                    </p>
                  </div>
                  <div id="imagen_page2">
                    <div className="cuadrado_libro">
                      <a href="pantalla3.html">
                        <img src={libro['imagen-portada-url']} height="100px" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      }
    />
  );
}

export default App;
