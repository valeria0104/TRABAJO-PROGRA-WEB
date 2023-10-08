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
    <div id = "Fondo">
    <Layout2> 
    </Layout2>  
    <div class="contenedor">
    <aside>
    <img src="pant10.png" alt="Chico estudiando" class="imagen"></img>
        

    </aside>
    <section>
    <form>
    <li id="il4"><label id="label4"><span className="resaltado">Correo:</span></label>
                <input className="input-box1" type="text" id="op7" name="n7"/>
    </li>  
    <li id="il4"><label id="label4"><span className="resaltado">Contraseña:</span></label>
                <input className="input-box1" type="text" id="op8" name="n8"/>
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

  </>
}></Layout1>

export default Index1
