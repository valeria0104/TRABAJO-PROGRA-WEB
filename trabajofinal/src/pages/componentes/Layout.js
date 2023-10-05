import Link from "next/link"
import Head from "next/head"
export default props => (
        <>
            <header>
                

                <nav>
                    <div className="menu-button" onclick="MenuDesplegable()">&#9776;</div>
                    <h1>Administración de bibliotecas</h1>

                    <a href="pantalla3.html">
                        <img src="usuario.png" alt="" className="usuario"/></a>

                    <section id="menu">
                        <a href="./pantalla3.html">Inicio</a>
                        <a href="">Perfil</a>
                        <a href="">Biblioteca</a>
                        <footer>
                            <p>
                            </p>
                        </footer>
                    </section>

                </nav>
            </header>
            <main>
                {props.content}
            </main>



    </>
)
