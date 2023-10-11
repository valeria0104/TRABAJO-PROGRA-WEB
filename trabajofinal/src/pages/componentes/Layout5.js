import Link from "next/link"
import Head from "next/head"
import { useRouter } from 'next/router';
export default props => {
  const router = useRouter();
  const isPantalla8 = router.pathname === '/pantalla8';
  return(
<> 
    <nav id="MiPerfil">
    <ul id="segundoul">
          <li id="segundoil"><Link href="/pantalla8">
            <label id="label2" className={isPantalla8 ? "destacado" : ""}>INSERTAR NUEVO LIBRO</label></Link></li>
     </ul>

    </nav>
 

    
<main>

{props.content}
</main>


</>

);
}
