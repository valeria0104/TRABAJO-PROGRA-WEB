import Link  from "next/link"
import Head from "next/head"
import Layout from "./componentes/Layout"
import Layout4 from "./componentes/Layout4"

const Index2 = () => <Layout content =
{
  <>

<div id= "cuerpo">
<p className="Bienvenido">Hola Valeria</p>
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

  </>
}></Layout>

export default Index2
