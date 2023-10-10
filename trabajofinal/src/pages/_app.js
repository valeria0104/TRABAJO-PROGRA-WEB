import './css/estilo.css'
import './css/estilo1.css'
import './css/cuerpo2.css'
import './css/colores.css'
import './css/pantalla6.css'
import {UserProvider} from './context/demo'

import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }) {
    return (
      <UserProvider> 
      <Component {...pageProps} />
    </UserProvider>

    );
  }
  
  export default MyApp;