import Layout from "../componentes/Layout";
import { useState, useEffect } from 'react'

import MiLista from "./lista"

const Form = () => {
  const [state, setEstate] = useState( {
    user : ''
  })

  const [flagCambio, setFlagCambio] = useState( 0 )
  const actualizarEstado = (nuevoValor) => {
    console.log("En actualizar estado")
    setFlagCambio(1);
   };

  
  function registrarEstado(e) {
    //console.log( e.target.name , ' - ' , e.target.value)
    setEstate( {...state, [e.target.name] : e.target.value })
  }

  const doEnviarJSON = async () => {
    // Recuperar los valore sy armar un JSON
    const jsonObject = {}
    jsonObject['user'] = state.user

    const params = JSON.stringify(jsonObject)
    console.log( params)
    // Invocar a la API
    try {
      const peticion = await fetch(
        '/api/user',
        {
          method : 'POST',
          body : params,
          headers : {
            'Content-Type' : 'application/json'
          }
        }
      )

      const data = await peticion.json()
      console.log(data)
      actualizarEstado(99)
      console.log("Valor de flagCambio " , flagCambio)
      setEstate( {
        user : ''
      })

    } catch (err) {
      console.log(err)
    }
   
    
  }

  function hacernada(e) {
    e.preventDefault()
  }

  useEffect(() => {
    // Código que se ejecutará cuando estado cambie
   }, [flagCambio]);

  // Ahora retornar el formulario
  return (
      <>
        <form onSubmit={hacernada}>
          <p>
            Usuario: <input name="user" type="text" 
            placeholder="Ingrese su Usuario" required 
            onChange={registrarEstado}
            value={state.user}
            ></input>
          </p>

        <button onClick={doEnviarJSON}>Enviar a API</button>
        </form>
        <MiLista estado={flagCambio} />
      </>
  )
  
}

const Contacto = () => {
  return (
    <Layout content={

    <div>
      <h1>Ejemplo de Backend 1</h1>
      <Form />

    </div>
    } ></Layout>
  )
}

export default Contacto


