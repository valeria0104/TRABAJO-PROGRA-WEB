import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
import { useAuth } from './context/demo';
const Index1 = () => 
{
   /* cambio*/
   const { state } = useAuth();
   const user = state.user; 


 

  return (
<Layout1 content = 
{

<div id= "cuerpo">
<p className="Bienvenido">Mi Perfil</p>
<hr/>
<div id="Formulario">
    <div id = "Fondo">
    <Layout2 /> 

    <div className="contenedor">
    <aside id= "imagen1">
    <img src="pant10.png" alt="Chico estudiando" className="imagen"></img>
        

    </aside>

    <form id= "formulario1" action="#" method="get">
    <ul id="formul">
    <li id= "formil"><label id="label4"><span className="resaltado">Correo: </span></label>
                <input type="text" className="input-box1" id="op7" name="n7" value ={user && user.correo}/>
    </li>  
    <li id= "formil"><label id="label7"><span className="resaltado">Contraseña:</span></label>
                <input  type="text" className="input-box1" id="op8" name="n8" value ={user && user.contrasena}/>
    </li>  
    </ul>
    <div className="buttons">
                    <input type="submit" value="GUARDAR" className="submit-button"/> <t></t>
                  </div>
    </form>




    </div>

    </div>
</div>





</div>


}></Layout1>)}

export default Index1
