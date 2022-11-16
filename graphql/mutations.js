import { gql } from "@apollo/client";

export const CREATE_PREGUNTA=gql`
mutation createPregunta($marca:String, $celular:String, $referencia:String, $titulo:String, $user:ID,$userName:String ) {
    createPregunta(input: {marca:$marca, celular:$celular, referencia:$referencia, titulo:$titulo, user:$user,userName:$userName}) {
        titulo
        marca
        userName
        referencia
        id
        fecha
    }
  }
`