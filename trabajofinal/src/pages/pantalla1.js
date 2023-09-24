import Link  from "next/link"

const Index = () => {
 return (
    <>
  <div>
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />

        <p id="olis">Sistema de reserva de libros</p>
        <form action="#" method="get">
        <ul>
            <li><label>Usuario o Correo:</label>
                <input class="input-box" type="text" id="op1" name="n1" />
            </li>
            <li><label>Contraseña:</label>
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
        <input type="submit" value="Ingresar" className="login-button"/>
        </div>

    </form>

    </div>
 
      

    
  


</>
 )}

export default Index


