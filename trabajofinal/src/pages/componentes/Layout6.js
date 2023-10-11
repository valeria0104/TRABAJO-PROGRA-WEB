import Link from "next/link"
import Head from "next/head"
export default props => (

    
        <>
            <header>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />


                <nav id="nav1">
                <div className="menu-button" onClick={MenuDesplegable}>&#9776;</div>
                    <a href="/pantalla9">
                        <img src="usuario.png" alt="" className="usuario"/></a>
                  
                    <section id="menu">
                    <a href="/pantalla9">Principal</a>
                     <a href="/pantalla10">Perfil</a>
                    <a href="">Biblioteca</a>

                    <footer>
                    
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

    if (menu.style.left === '0px') { //si esta abierto
        menu.style.left = '-250px'; // desaparece
        cuerpo.style.marginLeft = '0';
      
    } else {
        menu.style.left = '0px'; // aparece
        cuerpo.style.marginLeft = '50px';
    
        

    }
}
