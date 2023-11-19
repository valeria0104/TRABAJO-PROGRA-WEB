import Link  from "next/link"
import Head from "next/head"
import Layout from "./componentes/Layout"
import Layout4 from "./componentes/Layout4"
import { useAuth } from './context/demo'; // Importa el contexto de autenticación

const Index2 = () => 
{ 
 
  const { state } = useAuth();
  const user = state.user;
  const SALUDO = user ? `Hola, ${user.nombres}` : 'Hola';
  console.log('User:', user); 
return( <Layout content ={
<div id= "cuerpo">
<p className="Bienvenido">{SALUDO}</p>
<hr/>
<div id="FormularioY">
    <div id = "FondoY">
    <Layout4 /> 

    <div className="contenedorY">
    <aside id= "imagenAM1">
    <img src="jovennazhe.png" alt="Chica estudiando" className="imagenAM"></img>
        

    </aside>

    <form id= "formularioAM1" action="#" method="get">
    <ul id="formulAM">
    <li id= "formilAM"><label id="labelAM4"><span className="resaltado">Correo:</span></label>
                <input type="text" className="input-boxAM1" id="op11" name="n11"/>
    </li>  
    <li id= "formilAM"><label id="labelAM7"><span className="resaltado">Contraseña:</span></label>
                <input  type="text" className="input-boxAM1" id="op12" name="n12"/>
    </li>  
    </ul>
    <div className="buttons">
                    <input type="submit" value="GUARDAR" className="submit-buttonAM"/> <t></t>
                  </div>
    </form>




    </div>

    </div>
</div>





</div>


}></Layout>)}

export default Index2
