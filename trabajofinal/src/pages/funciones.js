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
  
    // Eliminar duplicados utilizando un Set
    const opcionesUnicas = Array.from(new Set(opcionesFiltradas.map((opcion) => opcion.ISBN)));
    
    // Mapear los ISBN únicos de vuelta a las opciones correspondientes
    return opcionesUnicas.map((isbn) => opcionesFiltradas.find((opcion) => opcion.ISBN === isbn));
  }