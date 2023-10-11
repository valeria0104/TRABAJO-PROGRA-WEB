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

const { currentUser } = useUser();
  const [userData, setUserData] = useState({
    nombres: '',
    apellidos: '',
    tipodoc: '',
    numerodoc: '',
    correo: '',
    tipo: '',
  });
  // En tu componente de cliente (por ejemplo, Index1.js)

const handleEditData = async (e) => {
  e.preventDefault();

  // Crea un objeto con los datos del usuario a actualizar
  const data = {
    correo: userData.correo,
    nombres: userData.nombres,
    apellidos: userData.apellidos,
    tipodoc: userData.tipodoc,
    numerodoc: userData.numerodoc,
  };

  // Realiza una solicitud POST a la ruta API en el servidor
  try {
    const response = await fetch('/api/editarUsuario', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // Los datos se actualizaron correctamente
      console.log('Datos actualizados con éxito');
    } else {
      // Manejar errores o respuestas no exitosas
      const data = await response.json();
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};

  useEffect(() => {
    if (currentUser) {
      setUserData({
        nombres: currentUser.nombres,
        apellidos: currentUser.apellidos,
        tipodoc: currentUser.tipodoc,
        numerodoc: currentUser.numerodoc,
        correo: currentUser.correo,
        tipo: currentUser.tipo,
      });
    }
  }, [currentUser]);

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
               <input type="text" className="input-box1" id="op3" name="n3" value= {userData.nombres}    onChange={(e) => setUserData({ ...userData, nombres: e.target.value })} />
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
                   <input type="submit" value="GUARDAR" className="submit-button" onClick={handleEditData}/> 
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