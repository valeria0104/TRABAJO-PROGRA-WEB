import Link from "next/link"
import Head from "next/head"
import Layout1 from './componentes/Layout1.js'
import datos from './json/archivo.json'
import { useRouter } from "next/router";
import reservas from '../../public/reserva.json'


function App() {
    const librosAMostrar = reservas.slice(-5);;
    const librosAMostrar2 = datos.slice(0,10)

    return (
        <Layout1 content=

            {


                <>
                    <div>

                        <div id="cuerpo">
                            <p className="Bienvenido">Bienvenido, Juan</p>
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
                        </div>
                    </div>


                </>
            }></Layout1>
    )
}

export default App