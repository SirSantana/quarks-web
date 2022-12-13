import { gql } from "@apollo/client";

//USER
export const GET_USER = gql`
    query getUser{
        getUser{
            name
            apellido
            email
            vehiculos
            avatar
            role
            ciudad 
            pais
            id
            cotizaciones
        }
    }
`

//ALMACENES
export const GET_ALMACENES = gql`
query getAlmacenes {
    getAlmacenes {
    nombre
    marcas
    tipo
    ciudad
    pais
    id
    direccion
    celular
    repuestos
  }
}
`;
export const GET_ALMACENS = gql`
query getAlmacens($split:Int) {
    getAlmacens(split:$split) {
    nombre
    marcas
    tipo
    ciudad
    pais
    id
    direccion
    celular
    repuestos
  }
}
`;
export const GET_ONE_NEGOCIO = gql`
  query getOneNegocio($id:ID){
    getOneNegocio(id:$id){
      nombre
    marcas
    tipo
    ciudad
    pais
    celular
    direccion
    }

  }
`
//PRODUCTOS
export const GET_PRODUCTOS = gql`
query getProductos {
getProductos {
    titulo
    precio
    id
    imagen
  }
}
`;
export const GET_ONE_PRODUCT = gql`
  query getOneProducto($id:ID){
    getOneProducto(id:$id){
     titulo
     imagen
     precio
     id
     garantia
     user
     descripcion
     linkpago
    }

  }
`


//TALLERES
export const GET_TALLERES = gql`
  query getTalleres {
    getTalleres {
      nombre
      marcas
      tipo
      ciudad
      pais
      id
      direccion
      celular
      repuestos
    }
  }
`;




//PREGUNTAS/COTIZACIONES
export const GET_PREGUNTAS = gql`
query getBusquedaPreguntas($word:String) {
  getBusquedaPreguntas(word:$word) {
   titulo
   marca
   userName
   referencia
   id
   fecha
  }
}
`;
export const GET_PREV_PREGUNTAS = gql`
query getPreguntas($limit:Int, $marca:String) {
  getPreguntas(limit:$limit, marca:$marca) {
   titulo
   marca
   userName
   referencia
   id
   fecha
  }
}
`;
export const GET_ONE_PREGUNTA = gql`
  query getOnePregunta($id:ID){
    getOnePregunta(id:$id){
    titulo
    marca
    referencia
    fecha
    celular
    cotizaciones
    }

  }
`
export const GET_COTIZACIONES= gql`
query getCotizaciones($id:ID) {
  getCotizaciones(id:$id) {
   descripcion
   marca
   garantia
   precio
   id
   fecha
   user
   celular
  }
}
`
