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
               <section id= "seccion1">
                <form id= "formulario1">
                <li id="il4"><label id="label4"><span className="resaltado">TITULO</span></label>
                <input className="input-box1" type="text" id="op3" name="n3"/>
                 </li>  

                 <li id="il4"><label id="label5"><span className="resaltado">Autor, Autores</span></label>
                <input className="input-box1" type="text" id="op4" name="n4"/>
                 </li>  

                 <li id="il4"><label id="label4"><span className="resaltado">ISBN</span></label>
                <input className="input-box1" type="text" id="op5" name="n5"/>
                 </li>  

                 <li id="il4"><label id="label5"><span className="resaltado">Serie, Tipo</span></label>
                <input className="input-box1" type="text"  id="op6" name="n6"/>
                 </li>  
                   <div className="buttons">
                    <input type="submit" value="GUARDAR" className="submit-button"/> <t></t>
                  </div>
                </form>

               </section>
                 </div>
                 </div>
                </div>
                </div>
                </div>
             
</>
                    
}></Layout6>


export default Index