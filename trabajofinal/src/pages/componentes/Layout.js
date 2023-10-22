import Link from "next/link"
import Head from "next/head"
export default props => (

    
        <>
            <header>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />


                <nav id="nav1" >
                    <div className="menu-button" onClick={MenuDesplegable}>&#9776;</div>
                    <h1>Administración de bibliotecas</h1>

                    <Link href="/pantalla3">
                        <img src="usuario.png" alt="" className="usuario"/></Link>

                    <section id="menu">
                        <Link href="/pantalla2">Inicio</Link>
                        <Link href="/pantalla3">Perfil</Link>
                        <Link href="/pantalla6">Biblioteca</Link>
                        <footer>
                            <p><strong>SAC v1 0.1 &copy; - alpha</strong></p>
                        </footer>
                    </section>

                </nav>
            </header>
            <main>
                {props.content}
            </main>
            


    </>
)

 function MenuDesplegable() {
    const menu = document.getElementById('menu');
    const cuerpo = document.getElementById('cuerpo');
    const cuerpo1 = document.getElementById('cuerpo1');
    const cuerpo2 = document.getElementById('cuerpo2');

    if (menu.style.left === '0px') { //si esta abierto
        menu.style.left = '-250px'; // desaparece
        cuerpo.style.marginLeft = '0';
      
    } else {
        menu.style.left = '0px'; // aparece
        cuerpo.style.marginLeft = '100px';
    
        

    }
}