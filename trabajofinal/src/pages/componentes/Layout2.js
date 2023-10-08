import Link from "next/link"
import Head from "next/head"
import { useRouter } from 'next/router';
export default props => {
  const router = useRouter();
  const isPantalla10 = router.pathname === '/pantalla10';
  const isPantalla11 = router.pathname === '/pantalla11';
  return(
<> 
    <nav id="MiPerfil">
    <ul id="segundoul">
          <li id="segundoil"><Link href="/pantalla10">
            <label id="label2" className={isPantalla10 ? "destacado" : ""}>DATOS PERSONALES</label></Link></li>
            <li id="segundoil"><Link href="/pantalla11">
              <label id="label2" className={isPantalla11 ? "destacado" : ""}>CUENTA</label></Link></li>
     </ul>

    </nav>
 

    
<main>

{props.content}
</main>


</>

);
}
