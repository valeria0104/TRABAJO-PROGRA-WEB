import Link  from "next/link"
import Head from "next/head"
import Layout from "./componentes/Layout"
import Layout4 from "./componentes/Layout4"
const Index2 = () => 
{
  return ( <Layout content ={
       <>
           <div id= "cuerpo">
        
               <p className="Bienvenido">Hola Juliana</p>
               <hr/>
               <div id="FormularioY">
               <div id = "FondoY">
               <Layout4 /> 

               <div className="contenedorY">
               <aside id="imagenAM1">
               <img src="jovennazhe.png" alt="Chica estudiando" className="imagenAM"></img>
               </aside>

               <form id= "formularioAM1" action="#" method="get">
               <ul id="formulAM">

               <li id= "formilAM"><label id="labelAM4"><span className="resaltado">Nombres:</span></label>
               <input type="text" className="input-boxAM1" id="op7" name="n7"/>
                </li>  


                <li id= "formilAM"><label id="labelAM6"><span className="resaltado">Tipo de Documento:</span></label>
               <input type="text" className="input-boxAM1" id="op8" name="n8"/>
                </li>  

                <li id= "formilAM"><label id="labelAM4"><span className="resaltado">Apellidos:</span></label>
               <input type="text" className="input-boxAM1" id="op9" name="n9"/>
                </li>  

                <li id= "formilAM" ><label id="labelAM5"><span className="resaltado">Número de Documento:</span></label>
               <input type="text" className="input-boxAM1" id="op10" name="n10"/>
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



       
       </>
}   
></Layout>)
}
 export default Index2