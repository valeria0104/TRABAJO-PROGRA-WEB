import Link  from "next/link"
import Head from "next/head"
import usuarioData from "./json/usuario.json"; 
import React, { useState } from "react";
import { handleLogin1 } from './funciones';
import { useRouter } from "next/router";

const Index = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipodoc: "",
    doc: "",
    correo: "",
    contrasena: "",
    repetir: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto con los datos del formulario
    const nuevoUsuario = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      tipodoc: formData.tipodoc,
      doc: formData.doc,
      correo: formData.correo,
      contrasena: formData.contrasena,
      repetir: formData.repetir,
    };

    // Realizar una solicitud POST al servidor para guardar los datos
    fetch('/usuario.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario registrado con éxito:', data);
        // Puedes realizar otras acciones, como redireccionar a una página de éxito, aquí.
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  };


      return (
        <>
     
        
          <div className="shoyo1">
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
    
             <h1 id="flor">Sistema de reserva de libros</h1>
             <h2 id="flor1">Registro de Usuario</h2>
            <form onSubmit={handleFormSubmit}>
            <ul id="primerul1">
                <div class="columna1">
                <p id="datos1">Datos personales</p>
                
                <li id="il1"><label id="label1"><span className="resaltado">Nombres</span></label>
                    <input className="input-box" type="text" id="op1" name="n1" 
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}/>
                </li>
    
                <li id="il1"><label id="label1" ><span className="resaltado">Apellidos</span></label>
                <div className="input-with-link">
                  <input className="input-box" type="text" id="op2" name="n2" 
                  value={formData.apellidos}
                  onChange={(e) =>
                    setFormData({ ...formData, apellidos: e.target.value })
                  }/>
                </div>
    
                </li>
                <li id="il1"><label id="label1"><span className="resaltado">Tipo de documento</span></label>
                    <input className="input-box" type="text" id="op1" name="n1" 
                    value={formData.tipodoc}
                    onChange={(e) => setFormData({ ...formData, tipodoc: e.target.value })}/>
                </li>
    
                <li id="il1"><label id="label1"><span className="resaltado">Nro de documento</span></label>
                    <input className="input-box" type="text" id="op1" name="n1" 
                    value={formData.doc}
                    onChange={(e) => setFormData({ ...formData, doc: e.target.value })}/>
                </li>
                </div>
    
                <div class="columna1">
                <p id="datos1">Datos de la cuenta</p>
                <li id="il1"><label id="label1"><span className="resaltado">Correo electrónico</span></label>
                    <input className="input-box" type="text" id="op1" name="n1" 
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}/>
                </li>
    
                <li id="il1"><label id="label1"><span className="resaltado">Password</span></label>
                    <input className="input-box" type="password" id="op1" name="n1" 
                    value={formData.contrasena1}
                    onChange={(e) => setFormData({ ...formData, contrasena1: e.target.value })}/>
                </li>
    
                <li id="il1"><label id="label1"><span className="resaltado">Ingrese password nuevamente</span></label>
                    <input className="input-box" type="password" id="op1" name="n1" 
                    value={formData.repetir}
                    onChange={(e) => setFormData({ ...formData, repetir: e.target.value })}/>
                </li>
    
                <div className="buttons1">
                <input type="button" value="Registrar" className="registrar1-button" onClick={handleFormSubmit}/>
                </div> 
                </div>
            </ul>   
        </form>          
        </div>
     
    
    
     
          
    
        
      
    
    
    </>
     )}

    

export default Index
