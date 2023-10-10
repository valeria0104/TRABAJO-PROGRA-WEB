import Link  from "next/link"
import Head from "next/head"
import Layout from "./componentes/Layout.js"
import Layout4 from "./componentes/Layout4.js"
 const Index = () => <Layout content =
 {
   
        <>
            <div id= "cuerpo">
         
                <p className="Bienvenido">Mi Perfil</p>
                <hr/>
                <div id="Formulario11">
                <div id = "Fondo11">
                <Layout4> 
                </Layout4>  
                <div className="contenedor11">
                <aside id="imagen21">
                <img src="jovennazhe.png" alt="Chica estudiando" className="imagen11"></img>
                </aside>
               <section id= "seccion1">
                <form id= "formulario2">
                <li id="il11"><label id="label21"><span className="resaltado11">Nombres</span></label>
                <input className="input-box11" type="text" id="tp3" name="m3"/>
                 </li>  

                 <li id="il11"><label id="label22"><span className="resaltado11">Tipo de Documento</span></label>
                <input className="input-box11" type="text" id="tp4" name="m4"/>
                 </li>  

                 <li id="il11"><label id="label21"><span className="resaltado11">Apellidos</span></label>
                <input className="input-box11" type="text" id="tp5" name="m5"/>
                 </li>  

                 <li id="il11"><label id="label22"><span className="resaltado11">Número de Documento</span></label>
                <input className="input-box11" type="text"  id="tp6" name="m6"/>
                 </li>  
                   <div className="buttons11">
                    <input type="submit" value="GUARDAR" className="submit-button11"/> <t></t>
                  </div>
                </form>

               </section>
                 </div>
                 </div>
                </div>
            </div>



        
        </>
    
 }></Layout>

 export default Index