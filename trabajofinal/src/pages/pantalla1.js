import Link  from "next/link"
import Head from "next/head"
const Index = () => {
 return (
    <>
  <div>
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />

         <h1 id="olis">Sistema de reserva de libros</h1>
        <form action="#" method="get">
        <ul>
            <li><label><span class="resaltado">Usuario o Correo:</span></label>
                <input class="input-box" type="text" id="op1" name="n1"/>
            </li>
            <li><label><span class="resaltado">Contraseña:</span></label>
            <div className="input-with-link">
              <input className="input-box" type="text" id="op2" name="n2" />
              <div className="forgot-password">
                <Link href="/contraseña" className="password">
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
            </li>
            
        </ul>    

        <div className="buttons">
        <input type="button" value="Registro usuario" className="registro-button"/> <t></t>
        <input type="button" value="Ingresar" className="login-button"/>
        </div>

    </form>

    </div>
 
      

    
  


</>
 )}

export default Index


