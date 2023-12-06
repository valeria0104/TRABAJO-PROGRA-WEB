import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from './context/demo'; // Importa el contexto de autenticación
import datos from './json/archivo.json';

function App() {
  const [reservas, setReservas] = useState([]);
  const [librosAMostrar, setLibrosAMostrar] = useState([]);
  const [librosMasPedidos, setLibrosMasPedidos] = useState([]);
  const { state } = useAuth();
  const user = state.user;
  const welcomeMessage = user ? `Bienvenido, ${user.nombres} ` : 'Bienvenido';
  console.log('User:', user);

  const obtenerReservas = async () => {
    try {
      const request = await fetch(`/api/muestra/reservasPorUsuario/${user.id}`);
      const data = await request.json();
      setReservas(data);
      // Obtén las últimas reservas
      const ultimasReservas = data.slice(-5);
      setLibrosAMostrar(ultimasReservas);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const obtenerLibrosMasPedidos = async () => {
    try {
      const request = await fetch(`/api/muestra/librosMasPedidosPorUsuario/${user.id}`);
      const data = await request.json();
      setLibrosMasPedidos(data);
    } catch (error) {
      console.error('Error al obtener los libros más pedidos:', error);
    }
  };

  useEffect(() => {
    obtenerReservas();
    obtenerLibrosMasPedidos();
  }, []);



  return (
    <Layout
      content={
        <div>
          <div id="cuerpo">
            <p className="Bienvenido">{welcomeMessage}</p>
            <hr />
            <br />
            <p1>Últimas reservas</p1>
            <br /><br />
            <section className="cuerpo1">
              {librosAMostrar.map((libro, index) => (
                <div key={index} className="cuadrado">
                  <div className="cuadrado_img">
                    <img src="foto_usuario.png" alt="" height="40px" />
                  </div>
                  <div className="cuadrado_letras">
                    <p>
                      <a href="pantalla3.html">{libro.libro.titulo}</a>
                      <br />
                      {libro.reserva.fechaInicio && formatDate(libro.reserva.fechaInicio)}
                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a>
                      {libro.libro && libro.libro['imagenLibro'] && (
                        <img src={libro.libro['imagenLibro']} height="100px" />
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </section>
            <br />
            <p1>Los más pedidos</p1>
            <br /><br />
            <section className="cuerpo1">
              {librosMasPedidos.map((libro, index) => (
                <div key={index} className="cuadrado">
                  <div className="cuadrado_img">
                    <img src="foto_usuario.png" alt="" height="40px" />
                  </div>
                  <div className="cuadrado_letras">
                    <p>
                      <a href="pantalla3.html">{libro.libro.titulo}</a>
                      <br />
                      {` Pedidos: ${libro.cantidadPedidos}`}
                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a>
                    {libro.libro && libro.libro['imagenLibro'] && (
                        <img src={libro.libro['imagenLibro']} height="100px" />
                      )}
                    </a>
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}, ${hours}:${minutes}`;
}

export default App;

