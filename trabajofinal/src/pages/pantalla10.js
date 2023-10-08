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
                <li id="il4"><label id="label4"><span className="resaltado">Nombres:</span></label>
                <input className="input-box1" type="text" id="op3" name="n3"/>
                 </li>  

                 <li id="il4"><label id="label5"><span className="resaltado">Tipo de Documento:</span></label>
                <input className="input-box1" type="text" id="op4" name="n4"/>
                 </li>  

                 <li id="il4"><label id="label4"><span className="resaltado">Apellidos:</span></label>
                <input className="input-box1" type="text" id="op5" name="n5"/>
                 </li>  

                 <li id="il4"><label id="label5"><span className="resaltado">Número de Documento:</span></label>
                <input className="input-box1" type="text"  id="op6" name="n6" oninput="validarNumeroDocumento(this)"/>
                 </li>  
                 <div id="errorNumeroDocumento" class="error-message"></div>
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


 function validarNumeroDocumento(input) {
    const valor = input.value;
    const esNumero = /^\d+$/.test(valor);
    const errorNumeroDocumento = document.getElementById('errorNumeroDocumento');
    
    if (!esNumero) {
        errorNumeroDocumento.textContent = 'Carácter inválido. Ingrese solo números.';
        input.setCustomValidity('Carácter inválido');
    } else {
        errorNumeroDocumento.textContent = '';
        input.setCustomValidity('');
    }
}