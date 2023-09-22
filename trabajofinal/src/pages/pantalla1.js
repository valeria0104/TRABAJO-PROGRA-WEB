import Link  from "next/link"
const Index = () => {
 return (
    <>
  <div>
   
        <p id="olis">Sistema de reserva de libros</p>
       
        <div class= "input-container">
            <label class="input-label"> Usuario o Correo:  </label>
                <input type="text" id="op1" name="n1" />
        </div>
        <br></br>
        <div class= "input-container">
             <label class="input-label" >Contraseña:</label> 
             <input type="text" id="op2" name="n2" />
        </div>
       
        <input type="submit" value="Enviar"/>
        <input type="reset" value="Limpiar"/>
    </div>
 
      

    
  


</>
 )}

export default Index


