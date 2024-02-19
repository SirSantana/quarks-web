import { GET_ALL_ADMIN_ACCION } from "@/graphql/queries"
import { timeSince } from "@/utils/dateEs";
import { useQuery } from "@apollo/client"
import { useState } from "react";
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { useRouter } from "next/router";


export default function DashboardAdmin() {
  const { data } = useQuery(GET_ALL_ADMIN_ACCION)
  const [filter, setFilter] = useState(false)
  const router = useRouter()
  
  const handleClickNegocio=({almacen})=>{
    let taller = talleres.talleres.find(taller=> taller.id == almacen)
    console.log(taller, talleres);
    router.push(`/${taller.userName}`)
  }
  const almacenCount = {};
  if (data?.getAllAdminAccion?.length > 0) {
    data.getAllAdminAccion.forEach(accion => {
      almacenCount[accion.almacen] = (almacenCount[accion.almacen] || 0) + 1;
    });
  }
  
  let sortedData = [];
  if (data?.getAllAdminAccion?.length > 0) {
    sortedData = [...data.getAllAdminAccion].sort((a, b) => {
      return almacenCount[b.almacen] - almacenCount[a.almacen];
    });
  }
  return (
    <>
      <button style={{padding:'8px 16px'}} onClick={()=> setFilter(!filter)}>Mas Recientes</button>

      <table style={{ maxWidth: '700px', alignSelf: 'center', margin: '20px auto', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Almacen</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Tipo</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filter
          ?
          sortedData?.map((accion, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
              <td style={{ padding: '10px' }}>{accion.almacen}</td>
              <td style={{ padding: '10px' }}>{accion.tipo}</td>
              <td style={{ padding: '10px' }}>{timeSince(accion.fecha)}</td>
            </tr>
          ))
          :
            data?.getAllAdminAccion?.map((accion, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <td onClick={()=>handleClickNegocio({almacen:accion.almacen})} style={{ padding: '10px' }}>{accion.almacen}</td>
                <td style={{ padding: '10px' }}>{accion.tipo}</td>
                <td style={{ padding: '10px' }}>{timeSince(accion.fecha)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}