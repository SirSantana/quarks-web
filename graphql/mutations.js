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
        celular
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
export const CHANGE_PASSWORD = gql`
mutation changePassword($email:String,$password:String, $previusPassword:String, ){
  changePassword(email:$email,password:$password, previusPassword:$previusPassword)
}
`

export const SEND_EMAIL = gql`
mutation contactoEmail($name:String,$email:String, $mensaje:String, ){
  contactoEmail(name:$name,email:$email, mensaje:$mensaje)
}
`
export const INTERESADO_PREMIUM = gql`
mutation interesadoPremium($nombre:String,$email:String ){
  interesadoPremium(nombre:$nombre,email:$email)
}
`
export const CREATE_VOTE = gql`
mutation createVote($id:String, $idCarro:String ){
  createVote(id:$id, idCarro:$idCarro)
}
`

export const CREATE_OPINION = gql`
mutation createOpinion($email:String, $descripcion:String, $idpregunta:ID,$calificacion:Int,$almacen:ID, $nombre:String, $foto:String, $marca:String, $referencia:String, $servicios:[String] ){
  createOpinion(input:{ email:$email , descripcion:$descripcion, idpregunta:$idpregunta, calificacion:$calificacion, almacen:$almacen, nombre:$nombre, foto:$foto, marca:$marca, referencia:$referencia, servicios:$servicios}){
    email
    calificacion
    descripcion
    id
    nombre
    foto
    servicios
    marca
    referencia
    fecha
  }
}
`
export const CREATE_SOLICITUD_SERVICIO = gql`
mutation createSolicitudServicio($descripcion:String,$almacen:ID, $nombre:String, $marca:String, $referencia:String, $servicios:[String], $celular:String){
  createSolicitudServicio(input:{descripcion:$descripcion, almacen:$almacen, nombre:$nombre, marca:$marca, referencia:$referencia, servicios:$servicios, celular:$celular})  
}
`
export const CREATE_ACCION = gql`
mutation createAccion($almacen:ID,$tipo:String,$estado:String ){
  createAccion(input:{ almacen:$almacen, tipo:$tipo,estado:$estado})  
}
`
export const CREATE_VISITA_ALMACEN = gql`
mutation createVisitaAlmacen($id:ID){
  createVisitaAlmacen(id:$id)
}
`
export const CREATE_IMPRESION_ALMACEN = gql`
mutation createImpresionAlmacen($id:ID){
  createImpresionAlmacen(id:$id)
}
`
export const INTERESADO_ALMACEN = gql`
mutation interesadoAlmacen($name:String, $celular:String, $almacen:ID){
  interesadoAlmacen(name:$name, celular:$celular, almacen:$almacen)
}
`
export const INTERESADO_ANUNCIO = gql`
mutation interesadoAnuncio($name:String, $celular:String){
  interesadoAnuncio(name:$name, celular:$celular)
}
`


export const CREATE_VISTA_ARTICULO = gql`
mutation createVistaArticulo($id:ID){
  createVistaArticulo(id:$id)
}
`

export const CREATE_VISITA_WHATSAPP = gql`
mutation createVisitaWhatsapp($id:ID){
  createVisitaWhatsapp(id:$id)
}
`

export const CREATE_TALLER = gql`
mutation createTaller($nombre:String, $direccion:String, $localidad:String,$telefono:String,$whatsapp:String, $horario:String, $categorias:[String] ){
  createTaller(input:{ nombre:$nombre, direccion:$direccion, localidad:$localidad,telefono:$telefono , whatsapp:$whatsapp, horario:$horario, categorias:$categorias}){
    nombre
    id
  }
}
`

export const CREATE_CLICK_COMPARTIDO = gql`
mutation createClickCompartido($id:ID){
  createClickCompartido(id:$id)
}
`
export const CREATE_CLICK_NEGOCIO_PREV_MAP = gql`
mutation createClickNegocioPrevMap($id:ID){
  createClickNegocioPrevMap(id:$id)
}
`
export const CREATE_CLICK_NEGOCIO_MAP = gql`
mutation createClickNegocioMap($id:ID){
  createClickNegocioMap(id:$id)
}
`
export const CREATE_CLICK_MAPA = gql`
mutation createClickMapaDireccion($id:ID){
  createClickMapaDireccion(id:$id)
}
`
export const CREATE_CLICK_TELEFONO = gql`
mutation createClickTelefono($id:ID){
  createClickTelefono(id:$id)
}
`

export const CREATE_CONSUMO = gql`
mutation createConsumo($fecha:String, $galon:String, $consumo:String){
  createConsumo(fecha:$fecha, galon:$galon, consumo:$consumo){
    fecha
    galon
    consumo
  }
}
`

export const CREATE_NEGOCIO_VDOS = gql`
mutation createNegocioVDos($email:String, $password:String, $username:String){
  createNegocioVDos(email:$email, password:$password, username:$username){
    negocio{
      email
    password
    userName
    }
    token
  }
}
`

export const EDIT_NEGOCIO_VDOS = gql`
mutation editNegocioVDos($direccion:String,  $ciudad:String,$pais:String, $whatsapp:String, $telefono:String, $horario:String, $fotoperfil:String, $categorias:[String], $nombre:String){
  editNegocioVDos(input:{direccion:$direccion, ciudad:$ciudad,pais:$pais,  whatsapp:$whatsapp, telefono:$telefono,horario:$horario, fotoperfil:$fotoperfil,categorias:$categorias, nombre:$nombre} ){
      nombre
      direccion
      userName
      fotoperfil
      categorias
      telefono
      whatsapp
      id
  }
}
`
export const EDIT_NEGOCIO_VDOS_REDES =gql`
mutation editNegocioVDosRedes($facebook:String,  $instagram:String, $paginaweb:String, ){
  editNegocioVDosRedes(input:{facebook:$facebook, instagram:$instagram, paginaweb:$paginaweb, } ){
      nombre
      facebook
      instagram
      paginaweb
      whatsapp
      id
      userName
  }
}
`

export const SIGNIN_NEGOCIO_VDOS = gql`
mutation signInNegocio($email:String, $password:String){
  signInNegocio(email:$email, password:$password ){
    negocio{
      email
    password
    userName
    }
    token
  }
}
`