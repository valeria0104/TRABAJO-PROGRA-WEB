import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
import { useUser } from './context/demo';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import usuarioData from "./json/usuario.json"; 


const Index1 = () => 
{
////
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState({
    nombres: '',
    apellidos: '',
    tipodoc: '',
    numerodoc: '',
    correo: '',
    tipo: '',
  });
  useEffect(() => {
    if (user) {
      setUserData({
        nombres: user.nombres,
        apellidos: user.apellidos,
        tipodoc: user.tipodoc,
        numerodoc: user.numerodoc,
        correo: user.correo,
        tipo: user.tipo,
      });
    }
  }, [user]);
//////


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

               <li id= "formil"><label id="label4"><span className="resaltado">Nombres:</span></label>
               <input type="text" className="input-box1" id="op3" name="n3" value= {userData.nombres} readOnly  />
                </li>  


                <li id= "formil"><label id="label6"><span className="resaltado">Tipo de Documento:</span></label>
               <input type="text" className="input-box1" id="op4" name="n4"/>
                </li>  

                <li id= "formil"><label id="label4"><span className="resaltado">Apellidos:</span></label>
               <input type="text" className="input-box1" id="op5" name="n5"/>
                </li>  

                <li id= "formil" ><label id="label5"><span className="resaltado">Número de Documento:</span></label>
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
 export default Index1