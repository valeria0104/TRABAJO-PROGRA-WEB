import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
 const Index1 = () => <Layout1 content =
 {
   
        <>
            <div id= "cuerpo">
            
                <p className="Bienvenido">Mi Perfil</p>
                <hr/>
                <div id="Formulario">
                <Layout2>    
                </Layout2>  
                <div class="contenedor">
                  <img src="pant10.png" alt="Chico estudiando" class="imagen"></img>
                 
                 <form id = "form" action="#" method="get">
        <ul id="tercerul">
            <li id="il3"><label id="label1"><span className="resaltado">Nombres:</span></label>
                <input className="input-box" type="text" id="op3" name="n3"/>
            </li>
            </ul>
            </form>
            </div>
            
                </div>
            </div>



        
        </>
    
 }></Layout1>

 export default Index1
