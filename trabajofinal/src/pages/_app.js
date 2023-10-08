import './css/estilo.css'
import './css/estilo1.css'
import './css/cuerpo2.css'
import './css/colores.css'
import './css/index.css'
import { AppProps } from 'next/app'

export default function MyApp({Component, pageProps }){
    return <Component {...pageProps} />
}/// esto es para hacer el estilo global 