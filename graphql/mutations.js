import { gql } from "@apollo/client";

//PREGUNTA
export const CREATE_PREGUNTA = gql`
mutation createPregunta($marca:String, $celular:String, $referencia:String, $titulo:String, $user:ID,$userName:String, $imagen:String ) {
    createPregunta(input: {marca:$marca, celular:$celular, referencia:$referencia, titulo:$titulo, user:$user,userName:$userName, imagen:$imagen}) {
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
export const CREATE_COTIZACION = gql`
mutation createCotizacion($marca:String,$estado:String, $descripcion:String, $precio:String, $garantia:String,$pregunta:ID, $envio:Boolean, $stock:String ) {
  createCotizacion(input: {marca:$marca,estado:$estado, descripcion:$descripcion, precio:$precio, garantia:$garantia,pregunta:$pregunta, envio:$envio, stock:$stock}) {
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
export const CREATE_VENDEDOR = gql`
mutation createVendedor($email: String!, $celular:String!,$marcas:[Boolean], $direccion:String!, $ciudad:String!,$name:String!, $almacen:String!, $verified:Boolean, $password:String ) {
  createVendedor(input:{email: $email, celular:$celular, direccion:$direccion, marcas:$marcas, ciudad:$ciudad, name:$name, almacen:$almacen, verified:$verified, password:$password}) 
}
`

export const EDIT_VENDEDOR = gql`
mutation editVendedor($name:String, $ciudad:String, $direccion:String, $pais:String, $celular:String, $avatar:String, $almacen:String){
  editVendedor(input:{celular:$celular, name:$name,ciudad:$ciudad, direccion:$direccion, pais:$pais,avatar:$avatar,almacen:$almacen }){
    name
    pais
    avatar
    ciudad
    almacen
    id
  }
}
`