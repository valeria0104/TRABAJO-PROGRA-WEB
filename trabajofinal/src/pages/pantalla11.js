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
        id : user.id,
        correo: user.correo,
        contrasena: user.contrasena,
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
    const response = await fetch(`/api/user/editarUsuarioC?id=${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: formData.correo,
        contrasena: formData.contrasena,
        imagenPerfil :formData.imagenPerfil 

      }),

    });
  } catch (error) {
    console.error('Error en la solicitud:', error);
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
    <aside id="imagen1">
               <img src={formData.imagenPerfil} id= "imagen" alt={`Imagen de ${formData.nombres}`} className="imagen"></img>
    </aside>
        

    

    <form id= "formulario1" action="#" method="get">
    <ul id="formul">
    <li id= "formil"><label id="label4"><span className="resaltado">Correo: </span></label>
                <input type="text" className="input-box1" id="correo" name="correo" defaultValue ={formData.correo}   onChange={handleInputChange}/>
    </li>  
    <li id= "formil"><label id="label7"><span className="resaltado">Contraseña:</span></label>
                <input  type="password" className="input-box1" id="contrasena" name="contrasena" defaultValue ={formData.contrasena}   onChange={handleInputChange}/>
    </li>  
    <li id="formil" ><label id="label4"><span className="resaltado">Imagen:</span></label>
                <input type="text" className="input-box1" id="imagenPerfil" name="imagenPerfil" defaultValue={formData.imagenPerfil} onChange={handleInputChange} />
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
