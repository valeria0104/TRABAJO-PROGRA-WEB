import datos from './json/archivo.json'
import { useRouter } from "next/router"; 

function MenuDesplegable() {
    const menu = document.getElementById('menu');
    const cuerpo = document.getElementById('cuerpo');
    const cuerpo1 = document.getElementById('cuerpo1');
    const cuerpo2 = document.getElementById('cuerpo2');

    if (menu.style.left === '0px') { //si esta abierto
        menu.style.left = '-250px'; // desaparece
        cuerpo.style.marginLeft = '0';
      
    } else {
        menu.style.left = '0px'; // aparece
        cuerpo.style.marginLeft = '100px';
    
        

    }
}

export const handleLogin1 = (formData, usuarioData) => {
    const correo = formData.correo;
    const contrasena = formData.contrasena;
  
    // Supongamos que los datos de usuario están en un objeto con propiedades de usuario
    // Debes adaptar esto según la estructura real de tus datos
    const usuarioEncontrado = Object.values(usuarioData).find(
      (usuario) => usuario.correo === correo && usuario.contrasena === contrasena
    );
  
    return usuarioEncontrado;
  };
////IMAGEN 
export function abrirCuadroSeleccionImagen() {
   /* const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => handleImageUpload(e.target.files[0]);
    input.click();*/

    const file = document.getElementById('foto');
    const img = document.getElementById('imagen')
    file.addEventListener('change', e => {
        if(e.target.files[0]){
            const reader = new FileReader(); 
            reader.onload= function(e) {
            img.src= e.target.result;
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            e.preventDefault();
        }
    })
  }

 
  //////