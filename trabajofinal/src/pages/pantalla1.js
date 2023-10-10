import Link  from "next/link"
import Head from "next/head"
import usuarioData from "./json/usuario.json"; 
import React, { useState } from "react";
import { handleLogin1 } from './funciones';
import { useRouter } from "next/router";

const Index = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const router = useRouter(); // Inicializa useRouter aquí

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    const usuarioEncontrado = handleLogin1(formData, usuarioData);

    if (usuarioEncontrado) {
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
        <input type="button" value="Registro usuario" className="registro-button"/> <t></t>
        <input type="submit" value="Ingresar" className="login-button" onClick={handleSubmit}/>
        </div>

    </form>

    </div>
 


 
      

    
  


</>
 )}

export default Index

