import Link from "next/link"
import Head from "next/head"
import { useRouter } from 'next/router';
export default props => {
  const router = useRouter();
  const isPantalla3 = router.pathname === '/pantalla3';
  const isPantalla4 = router.pathname === '/pantalla4';
  const isPantalla5 = router.pathname === '/pantalla5';
  return(
<> 
    <nav id="PerfilAdmi">
    <ul id="admin7">
          <li id="admin11"><Link href="/pantalla3">
            <label id="label11" className={isPantalla3 ? "destacado" : ""}>DATOS PERSONALES</label></Link></li>
            <li id="admin11"><Link href="/pantalla4">
              <label id="label11" className={isPantalla4 ? "destacado" : ""}>CUENTA</label></Link></li>
              <li id="admin11"><Link href="/pantalla5">
                <label id="label11" className={isPantalla5 ? "destacado" : ""}>PREFERENCIAS</label></Link></li>
     </ul>

    </nav>
 

    
<main>

{props.content}
</main>


</>

);
}
