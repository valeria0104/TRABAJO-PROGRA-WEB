import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
import { useAuth } from './context/demo';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { abrirCuadroSeleccionImagen } from './funciones';



const Index1 = () => 
{
  /* cambio*/
 
  const { state} = useAuth();
  const user = state.user; 
  const router = useRouter();

  const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario

  useEffect(() => {
    // Cargar los datos actuales del usuario en el formulario cuando se monte el componente
    if (user) {
      setFormData({
        nombres: user.nombres,
        apellidos: user.apellidos,
        tipodoc: user.tipodoc,
        numerodoc: user.numerodoc,
        imagenPerfil: user.imagenPerfil, 
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Campo cambiado:', name, 'Nuevo valor:', value);
    // Actualiza el estado de formData solo para el campo que cambió
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
///////

const handleUpdateUser = async (e) => {
  e.preventDefault(); // Prevenir el comportamiento de envío de formulario por defecto

  try {
    console.log('Datos a enviar al servidor:', formData);

    // Realizar una solicitud PUT a la API para actualizar los datos del usuario
    const response = await fetch('/api/editarUsuario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, id: user.id}),
    });

    if (response.ok) {
      // Actualización exitosa
      const updatedUser = await response.json();
      console.log('Respuesta del servidor:', updatedUser);
      // Actualiza la variable user con los datos actualizados
 
    
      alert('Datos de usuario actualizados correctamente');
    } else {
      // Error al actualizar
      alert('No se pudo actualizar los datos del usuario');
    }
  } catch (error) {
    console.error(error);
  }
};



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
               <img src={formData.imagenPerfil} id= "imagen" alt={`Imagen de ${formData.nombres}`} className="imagen"></img>
               <label htmlFor="foto" id= "fotito">Cambiar Imagen</label>
                <input type="file" name="foto" id="foto" accept="image/*" onClick={abrirCuadroSeleccionImagen }/>
               </aside>

               <form id= "formulario1" action="#" method="get">
               <ul id="formul">

               <li id="formil"><label id="label4"><span className="resaltado">Nombres:  </span></label>
               <input type="text" className="input-box1" id="nombres" name="nombres"   defaultValue={formData.nombres}
  onChange={handleInputChange}
  />
                </li>  


                <li id="formil"><label id="label6"><span className="resaltado">Tipo de Documento:</span></label>
               <input type="text" className="input-box1" id="tipodoc" name="tipodoc"  defaultValue={formData.tipodoc} onChange={handleInputChange}/>
                </li>  

                <li id="formil"><label id="label4"><span className="resaltado">Apellidos:</span></label>
               <input type="text" className="input-box1" id="apellidos" name="apellidos"  defaultValue={formData.apellidos}   onChange={handleInputChange}/>
                </li>  

                <li id="formil" ><label id="label5"><span className="resaltado">Número de Documento:</span></label>
               <input type="text" className="input-box1" id="numerodoc" name="numerodoc"  defaultValue={formData.numerodoc} onChange={handleInputChange} />
                </li>
                </ul>  
                  <div className="buttons">
                  <button type="button" onClick={handleUpdateUser} className="submit-button">Guardar</button>
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