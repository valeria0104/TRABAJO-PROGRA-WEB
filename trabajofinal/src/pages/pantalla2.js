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
  const welcomeMessage = user ? `Bienvenido, ${user.nombres}` : 'Bienvenido';
  console.log('User:', user); 
  // Efecto para cargar las reservas al montar el componente
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await fetch('/api/reservas');
        const data = await response.json();
        setReservas(data);

        // Obtén las últimas reservas
        const ultimasReservas = data.slice(-5);
        setLibrosAMostrar(ultimasReservas);

        // Contar la cantidad de pedidos por libro
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

        setLibrosMasPedidos(librosMasPedidos);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    obtenerReservas();
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
                      <a href="pantalla3.html">{libro.titulo}</a>
                      <br/>
                      {libro.fechaReserva}
                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a>
                      <img src={libro['imagen-portada-url']} height="100px" />
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
                      <a href="pantalla3.html">{libro.titulo}</a>
                      <br/>
                      {` Pedidos: ${libro.pedidos}`}

                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a>
                    <img src={datos.find((d) => d.titulo === libro.titulo)['imagen-portada-url']} height="100px" />
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
export default App;