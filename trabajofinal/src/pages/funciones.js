import datos from './json/archivo.json'
import usuarioData from "./json/usuario.json"; 

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

export function buscarOpcionesPorCategoria(categoria) {
    const opcionesFiltradas = datos.filter((opcion) =>
        opcion.categoria &&
        opcion.categoria.trim().toLowerCase().includes(categoria.trim().toLowerCase())
    );

    // Crear un conjunto para mantener un registro de las categorías únicas
    const categoriasUnicas = new Set();

    // Filtrar las opciones únicas basadas en la categoría
    const opcionesUnicas = opcionesFiltradas.filter((opcion) => {
        const categoriaLowerCase = opcion.categoria.trim().toLowerCase();
        if (!categoriasUnicas.has(categoriaLowerCase)) {
            categoriasUnicas.add(categoriaLowerCase);
            return true;
        }
        return false;
    });

    return opcionesUnicas;
}
 export const handleLogin1  = (formData, usuarioData)=> {
    const correo = formData.correo;
    const contrasena = formData.contrasena;
  
    const usuarioEncontrado = usuarioData.find(
        (usuario) => usuario.correo === correo && usuario.contrasena === contrasena
    );
  
    if (usuarioEncontrado) {
      if (usuarioEncontrado.tipo === 1) {
        // Redirecciona al usuario tipo 1 a pantalla2.js
        window.location.href = "/pantalla2";
      } else if (usuarioEncontrado.tipo === 2) {
        // Redirecciona al usuario tipo 2 a pantalla9.js
        window.location.href = "/pantalla9";
      }
    } else {
      // Usuario no encontrado, muestra un mensaje de error
      alert("Usuario inválido");
    }
  };