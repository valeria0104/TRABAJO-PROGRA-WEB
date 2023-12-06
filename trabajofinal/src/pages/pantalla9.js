import Link from "next/link";
import Head from "next/head";
import Layout7 from './componentes/Layout7.js';
import datos from './json/archivo.json';
import { useAuth } from './context/demo'; // Importa el contexto de autenticación
import React, { useEffect, useState } from 'react';


function App() {
  const { state } = useAuth();
  const user = state.user;
  const welcomeMessage = user ? `Bienvenido, ${user.nombres}` : 'Bienvenido';

  const [librosMasPedidos, setLibrosMasPedidos] = useState([]);
  const [librosAMostrar2, setLibrosAMostrar2] = useState([]);

  const obtenerLibrosMasPedidos = async () => {
    try {
      const request = await fetch(`/api/muestra/librosMasPedidosPorUsuario/${user.id}`);
      const data = await request.json();
      setLibrosMasPedidos(data);
    } catch (error) {
      console.error('Error al obtener los libros más pedidos:', error);
    }
  };
  const obtenerLibrosProximosAVencer = async () => {
    try {
      const response = await fetch(`api/muestra/librosProximosAVencer/${user.id}`);
      const data = await response.json();
      setLibrosAMostrar2(data);
    } catch (error) {
      console.error('Error al obtener libros próximos a vencer:', error);
    }
  };

  useEffect(() => {
    obtenerLibrosMasPedidos();
    obtenerLibrosProximosAVencer();

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
                      <br />
                      <h>Fecha reserva: </h>{libro.fechaReserva && formatDate(libro.fechaReserva)}
                      <br/>
                      <h>Fecha final: </h> {libro.fechaFinal && formatDate(libro.fechaFinal)}

                    </p>
                  </div>
                  <div id="imagen_page2">
                    <div className="cuadrado_libro">
                      <a>
                      {libro && libro['imagenLibro'] && (
                        <img src={libro['imagenLibro']} height="100px" />
                        )}
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');


  return `${year}-${month}-${day}`;
}

export default App;
