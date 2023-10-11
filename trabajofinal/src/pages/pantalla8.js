import Link from "next/link"
import Head from "next/head"
import Layout6 from './componentes/Layout6.js'
import datos from './json/archivo.json'
import { useRouter } from "next/router";
import Layout5 from "./componentes/Layout5.js";
const Index = () =>  <Layout6 content =

{

  
  <>
  <div>
  
            <div id="cuerpo">
                <p className="Bienvenido">Hola, Juliana</p>
                <hr/>
                <br/>
                <div id="Formulario">
                <div id = "Fondo">
                <Layout5 ></Layout5>
                <div className="contenedor">
                <aside id="imagen1">
                <img src="Rectangle 5.png" alt="Libros" className="imagen"></img>
                </aside>
             
               <form id= "formularioAM1" action="#" method="get">
               <ul id="formulAM">

               <li id= "formilAM"><label id="labelAM4"><span className="resaltado">TITULO</span></label>
               <input type="text" className="input-boxAM1" id="op12" name="12"/>
                </li>  


                <li id= "formilAM"><label id="labelAM4"><span className="resaltado">Autor, Autores</span></label>
               <input type="text" className="input-boxAM1" id="op13" name="n13"/>
                </li>  

                <li id= "formilAM"><label id="labelAM4"><span className="resaltado">ISBN</span></label>
               <input type="text" className="input-boxAM1" id="op14" name="n14"/>
                </li>  

                <li id= "formilAM"><label id="labelAM4"><span className="resaltado">Serie, tipo</span></label>
               <input type="text" className="input-boxAM1" id="op15" name="n15"/>
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
                </div>
             
</>
                    
}></Layout6>


export default Index