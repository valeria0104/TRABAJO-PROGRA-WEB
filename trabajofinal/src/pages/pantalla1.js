import Link  from "next/link"
const Index = () => {
 return (
    <>

      <div>
        <p id="olis">Sistema de reserva de libros</p>
        <form action="#" method="get">
        <ul>
            <li>Usuario o Correo: <br></br>
                <input type="text" id="op1" name="n1" />
            </li>
            <li>Contraseña: <br></br>
                <input type="text" id="op2" name="n2" />
            </li>
        </ul>
        <input type="submit" value="Enviar"/>
        <input type="reset" value="Limpiar"/>

    </form>
      


      </div>
  


</>
 )}

export default Index


