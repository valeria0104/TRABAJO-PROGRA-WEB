import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
import { useAuth } from './context/demo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index1 = () => 
{
  /* cambio*/
  const { state } = useAuth();
  const user = state.user; 
  const router = useRouter();
///SOLO ES PARA VERIFICAR LA AUTENTICACION --> SI NO HAY ME MANDA A INICIO 
  useEffect(() => {
    console.log('User:', user); 
    if (!user) {
      router.push("/");
      console.log('Redirigiendo a /index.js'); 
    }
  }, [user, router]);
  /////

  /*cambio*/
  return ( <Layout1 content ={
       <>
           <div id= "cuerpo">
        
               <p className="Bienvenido">Mi Perfil</p>
               <hr/>
               <div id="Formulario">
               <div id = "Fondo">
               <Layout2 /> 

               <div className="contenedor">
               <aside id="imagen1">
               <img src="pant10.png" alt="Chico estudiando" className="imagen"></img>
               </aside>

               <form id= "formulario1" action="#" method="get">
               <ul id="formul">

               <li id="formil"><label id="label4"><span className="resaltado">Nombres: {user && user.nombres} </span></label>
               <input type="text" className="input-box1" id="op3" name="n3" />
                </li>  


                <li id="formil"><label id="label6"><span className="resaltado">Tipo de Documento:</span></label>
               <input type="text" className="input-box1" id="op4" name="n4"/>
                </li>  

                <li id="formil"><label id="label4"><span className="resaltado">Apellidos:</span></label>
               <input type="text" className="input-box1" id="op5" name="n5"/>
                </li>  

                <li id="formil" ><label id="label5"><span className="resaltado">Número de Documento:</span></label>
               <input type="text" className="input-box1" id="op6" name="n6"/>
                </li>
                </ul>  
                  <div className="buttons">
                   <input type="submit" value="GUARDAR" className="submit-button"/> 
                 </div>
               </form>

                </div>
                </div>
               </div>
           </div>



       
       </>
}   
></Layout1>)
}
 export default Index1;