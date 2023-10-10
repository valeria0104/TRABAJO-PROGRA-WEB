import Link from "next/link"
import Head from "next/head"
import Layout from './componentes/Layout.js'
import datos from './json/archivo.json'
import { useRouter } from "next/router";
const Index = () =>  {
const router = useRouter();
  const { nombre } = router.query;
return (
    <Layout content ={
  <>
  <div>
  
            <div id="cuerpo">
                <p className="Bienvenido">{`Bienvenido, ${nombre|| "Juan"}`}</p>
                <hr/>
                <br/>
                <p1>Últimas reservas</p1>
                <br/><br/>
                <section className="cuerpo1">

                    <div className="cuadrado">
                        <div className="cuadrado_img">
                        <img src="foto_usuario.png" alt="" height="40px" />
                        </div>

                        <div className="cuadrado_letras">
                            <p>
                                <a href="pantalla3.html">"Clean Code: A Handbook of Agile Software
                                    Craftsmanship"</a>

                                18/09/2023 08:00 am
                            </p>
                        </div>

                        <div className="cuadrado_libro">
                            <a href="pantalla3.html">
                                <img src="libro1.jpg" alt="" height="100px" /></a>
                        </div>

                    </div>


                    <div className="cuadrado">
                        <div className="cuadrado_img">
                            <img src="foto_usuario.png" alt="" height="40px" />
                        </div>

                        <div className="cuadrado_letras">
                            <p>
                                <a href="pantalla3.html">”Introduction to the Theory of Computation”</a>
                                18/09/2023 08:00 am
                            </p>
                        </div>

                        <div className="cuadrado_libro">
                            <a href="pantalla3.html">
                                <img src="libro2.jpg" alt="" height="100px" /></a>
                        </div>

                    </div>

          
                </section>

                <br/>
                    <p1>Los más pedidos</p1>
                    <br/><br/>
                        <section className="cuerpo1">

                            <div className="cuadrado">
                                <div className="cuadrado_img">
                                    <img src="foto_usuario.png" alt="" height="40px" />
                                </div>

                                <div className="cuadrado_letras">
                                    <p>
                                        <a href="pantalla3.html">"Clean Code: A Handbook of Agile Software
                                            Craftsmanship"</a>
                                        18/09/2023 08:00 am
                                    </p>
                                </div>

                                <div className="cuadrado_libro">
                                    <a href="pantalla3.html">
                                        <img src="libro1.jpg" alt="" height="100px" /></a>
                                </div>

                            </div>


                            <div className="cuadrado">
                                <div className="cuadrado_img">
                                    <img src="foto_usuario.png" alt="" height="40px" />
                                </div>

                                <div className="cuadrado_letras">
                                    <p>
                                        <a href="pantalla3.html">"”Introduction to the Theory of Computation”
                                        </a>
                                        18/09/2023 08:00 am
                                    </p>
                                </div>

                                <div className="cuadrado_libro">
                                    <a href="pantalla3.html">
                                        <img src="libro2.jpg" alt="" height="100px" /></a>
                                </div>

                            </div>


                        </section>
                    </div>
      </div>              


                    </>
}></Layout>)
}

export default Index