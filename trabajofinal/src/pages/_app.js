import './css/estilo.css'
import { AppProps } from 'next/app'

export default function MyApp({Component, pageProps }){
    return <Component {...pageProps} />
}/// esto es para hacer el estilo global 