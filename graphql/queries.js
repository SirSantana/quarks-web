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
            almacen
            marcas
        }
    }
`
export const GET_ONE_USER = gql`
    query getOneUser($id:ID){
      getOneUser(id:$id){
            name
            ciudad 
            pais
            id
            cotizaciones
            avatar
            marcas
            almacen
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
   cotizaciones

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
   imagen
   id
    }

  }
`
export const GET_COTIZACIONES = gql`
query getCotizaciones($id:ID) {
  getCotizaciones(id:$id) {
   descripcion
   marca
   garantia
   precio
   id
   user
   celular
   stock
   envio
   estado
  }
}
`
export const GET_COTIZACIONES_USER = gql`
query getCotizacionesUser($id:ID, $limit:Int) {
  getCotizacionesUser(id:$id, limit:$limit) {
   descripcion
   marca
   garantia
   precio
   id
   user
   celular
   stock
   envio
   pregunta
   estado
  }
}
`
export const GET_AVATAR_USER = gql`
query getAvatar($id:ID) {
  getAvatar(id:$id) {
            avatar
            name
            ciudad
            celular
            almacen
            direccion
            
  }
}`


export const GET_BATALLAS=gql`
  query getBatallas{
    getBatallas{
      carroUno
      carroDos
      carroUnoImg
      carroDosImg
      carroUnoVotos
      carroDosVotos
      carroUnoId
      carroDosId
      id
    }
  }
`