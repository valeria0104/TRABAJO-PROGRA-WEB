import Link  from "next/link"
import Head from "next/head"
import React, { useState, useEffect } from "react";
import { handleLogin1 } from './funciones';
import { useRouter } from 'next/router';
import { useAuth } from './context/demo';



const Index = () => {


  const router = useRouter();
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  

  const [usuarioData, setUsuarioData] = useState([]);
  const obtenerDatosUsuario = async () => {
    try {
        const response = await fetch('/api/user/datos');
        if (response.ok) {
            const data = await response.json();
            setUsuarioData(data);
        } else {
            const errorMessage = await response.text();  // Obtener el mensaje de error del cuerpo de la respuesta
            console.error(`Error al obtener los datos de usuario del backend: ${errorMessage}`);
            // Manejar el error, mostrar un mensaje al usuario, etc.
        }
    } catch (error) {
        console.error('Error al obtener los datos de usuario:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
    }
};

useEffect(() => {
    obtenerDatosUsuario();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
   
    const usuarioEncontrado = handleLogin1(formData, usuarioData);
 
    if (usuarioEncontrado) {
      dispatch({ type: 'LOGIN', payload: usuarioEncontrado });
      if (usuarioEncontrado.tipo === 1) {
        // Redirecciona al usuario tipo 1 a pantalla2.js
 
        router.push("/pantalla2");
      } else if (usuarioEncontrado.tipo === 2) {

        // Redirecciona al usuario tipo 2 a pantalla9.js
        router.push("/pantalla9");
      }
    } else {
      // Usuario no encontrado, muestra un mensaje de error
      alert("Usuario inválido");
    }
  };
  const handleRegistroUsuario = () => {
    router.push("/pantalla7");
  };

 return (
    <>
 
    
      <div className="holi1">
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />

         <h1 id="olis">Sistema de reserva de libros</h1>
        <form action="#" method="get">
        <ul id="primerul">
            <li id="il1"><label id="label1"><span className="resaltado">Usuario o Correo:</span></label>
                <input className="input-box" type="text" id="op1" name="n1" 
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}/>
            </li>
            <li id="il1"><label id="label8" ><span className="resaltado">Contraseña:</span></label>
            <div className="input-with-link">
              <input className="input-box" type="password" id="op2" name="n2" 
              value={formData.contrasena}
              onChange={(e) =>
                setFormData({ ...formData, contrasena: e.target.value })
              }/>
              <div className="forgot-password">
                <Link href="/contraseña" className="password">
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
            </li>
            
        </ul>    

        <div className="buttons">
        <input type="button" value="Registro usuario" className="registro-button" onClick={handleRegistroUsuario}/>
        <input type="submit" value="Ingresar" className="login-button" onClick={handleSubmit}/>
        </div>

    </form>
    

    </div>
 


 
      

    
  


</>
 )}

export default Index

