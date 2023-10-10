import Link  from "next/link"
import Head from "next/head"
import Layout from "./componentes/Layout"
import Layout4 from "./componentes/Layout4"
 const Index = () => <Layout content =
 {
   
        <>
            <div id= "cuerpo">
         
                <p className="Bienvenido">Mi Perfil</p>
                <hr/>
                <div id="Formulario">
                <div id = "Fondo">
                <Layout4> 
                </Layout4>  
                <div className="contenedor">
                <aside id="imagen1">
                <img src="jovennazhe.png" alt="Chica estudiando" className="imagen"></img>
                </aside>
               <section id= "seccion1">
                <form id= "formulario1">
                <li id="il4"><label id="label21"><span className="resaltado11">Idioma</span></label>
                <input className="input-box11" type="text" id="otp9" name="m9"/>
                 </li>  

                 <li id="il4"><label id="label11"><span className="resaltado11">Prefijo</span></label>
                <input className="input-box11" type="text" id="tp10" name="m10"/>
                 </li>  

                 <li id="il4"><label id="label21"><span className="resaltado11">Color</span></label>
                <input className="input-box11" type="text" id="tp11" name="m11"/>
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