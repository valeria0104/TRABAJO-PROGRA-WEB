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
    <aside>
    <img src="jovennazhe.png" alt="Chica estudiando" className="imagen11"></img>
        

    </aside>
    <section>
    <form>
    <li id="il11"><label id="label21"><span className="resaltado11">Correo</span></label>
                <input className="input-box11" type="text" id="tp7" name="m7"/>
    </li>  
    <li id="il11"><label id="label21"><span className="resaltado11">Contraseña</span></label>
                <input className="input-box11" type="text" id="tp8" name="m8"/>
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