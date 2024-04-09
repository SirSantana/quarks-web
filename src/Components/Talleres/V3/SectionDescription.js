import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries"
import { useQuery } from "@apollo/client"




export default function SectionDescription({data}) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: data?.id } })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', justifyContent: 'space-between', margin: '32px 0 16px 0', }}>
      <p>{data?.nombre} es un {data?.tipo === 'Mecanico a Domicilio' ? 'Mecanico a Domicilio' : data?.tipo === 'Almacen' ? 'Almacen de Repuestos' : 'Taller Automotriz'} ubicado en {data?.direccion} - {data?.ciudad}. {data?.pais}.</p>
      <p>Ofrece los siguientes {data?.tipo === 'Almacen' ? 'repuestos' : 'servicio'}: {data?.categorias.map(el=> el + ' - ')}. </p>
      {result?.data?.getCalificacionOpiniones >0 && <p>{data?.nombre} Tiene una calificacion de {result?.data?.getCalificacionOpiniones}</p>}
    </div>
  )
}