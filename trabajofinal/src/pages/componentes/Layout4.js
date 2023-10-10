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
    <nav id="MiPerfilAdmin">
    <ul id="adminX">
          <li id="adminY"><Link href="/pantalla3">
            <label id="labelY" className={isPantalla3 ? "destacado" : ""}>DATOS PERSONALES</label></Link></li>
            <li id="adminY"><Link href="/pantalla4">
              <label id="labelY" className={isPantalla4 ? "destacado" : ""}>CUENTA</label></Link></li>
              <li id="adminY"><Link href="/pantalla5">
                <label id="labelY" className={isPantalla5 ? "destacado" : ""}>PREFERENCIAS</label></Link></li>
     </ul>

    </nav>
 

    
<main>

{props.content}
</main>


</>

);
}
