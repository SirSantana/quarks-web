import { gql } from "@apollo/client";

//PREGUNTA
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
//COTIZACION
export const CREATE_COTIZACION=gql`
mutation createCotizacion($marca:String, $descripcion:String, $precio:String, $garantia:String,$pregunta:ID ) {
  createCotizacion(input: {marca:$marca, descripcion:$descripcion, precio:$precio, garantia:$garantia,pregunta:$pregunta}) {
        descripcion
        marca
        precio
        garantia
        id
        fecha
    }
  }
`
//USER
export const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!, $password:String!) {
    signIn(input:{email: $email, password:$password}) {
      user {
        email
        id
        name
        role
      }
      token
    }
  }
`  