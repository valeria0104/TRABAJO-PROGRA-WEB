import Link  from "next/link"
import Head from "next/head"
import Layout1 from "./componentes/Layout1"
import Layout2 from "./componentes/Layout2"
import { useAuth } from './context/demo'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
        correo: user.correo,
        contrasena: user.contrasena,

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
 

  return (
<Layout1 content = 
{

<div id= "cuerpo">
<p className="Bienvenido">Mi Perfil</p>
<hr/>
<div id="Formulario">
    <div id = "Fondo">
    <Layout2 /> 

    <div className="contenedor">
    <aside id= "imagen1">
    <img src="pant10.png" alt="Chico estudiando" className="imagen"></img>
        

    </aside>

    <form id= "formulario1" action="#" method="get">
    <ul id="formul">
    <li id= "formil"><label id="label4"><span className="resaltado">Correo: </span></label>
                <input type="text" className="input-box1" id="correo" name="correo" defaultValue ={formData.correo}   onChange={handleInputChange}/>
    </li>  
    <li id= "formil"><label id="label7"><span className="resaltado">Contraseña:</span></label>
                <input  type="password" className="input-box1" id="contrasena" name="contrasena" defaultValue ={formData.contrasena}   onChange={handleInputChange}/>
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


}></Layout1>)}

export default Index1
