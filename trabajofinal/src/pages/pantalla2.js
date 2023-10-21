import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import datos from './json/archivo.json';
import { useRouter } from "next/router";
import reservas from '../../public/reserva.json';
import { useAuth } from './context/demo'; // Importa el contexto de autenticación

function App() {
  // Obtén las últimas reservas
  const librosAMostrar = reservas.slice(-5);

  // Fusiona las reservas con los datos de los libros
  const librosMasPedidos = fusionarDatos(reservas, datos);
  const { state } = useAuth();
  const user = state.user;
  const welcomeMessage = user ? `Bienvenido, ${user.nombres}` : 'Bienvenido';
  console.log('User:', user); 

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
                      18/09/2023 08:00 am
                    </p>
                  </div>
                  <div className="cuadrado_libro">
                    <a href="pantalla3.html">
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
                      18/09/2023 08:00 am
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

function fusionarDatos(reservas, libros) {
  // Crear un objeto para rastrear las veces que se pide cada libro
  const pedidos = {};
  reservas.forEach((libro) => {
    pedidos[libro.titulo] = (pedidos[libro.titulo] || 0) + 1;
  });

  // Fusionar los datos de libros con la cantidad de pedidos
  const librosConPedidos = libros.map((libro) => ({
    ...libro,
    pedidos: pedidos[libro.titulo] || 0,
  }));

  // Ordenar los libros por la cantidad de pedidos en orden descendente
  librosConPedidos.sort((a, b) => b.pedidos - a.pedidos);

  // Devolver los 10 libros más pedidos
  return librosConPedidos.slice(0, 10);
}

export default App;