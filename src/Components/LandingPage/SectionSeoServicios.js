import Link from "next/link"
import { useRouter } from "next/router"


export default function SectionSeoServicios({ data, categoria, vehiculo, servicio }) {
  const router = useRouter()
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', margin: '32px auto 32px auto', }}>
        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>{servicio} en Bogotá</h2>
        <p style={{fontSize:'14px', color:'#929292'}}>Estas buscando un taller mecanico en Bogotá? Encuentra los mejores talleres de {servicio} para {vehiculo} en Bogotá en nuestra página de talleres mecanicos en Bogotá. Filtra por servicios, calificaciones, y más. Comparte tus opiniones y recibe recomendaciones de otros talleres.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', margin: '32px auto 32px auto', }}>
        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '18px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>Mejores 10 {servicio === 'cda' ? 'Talleres de revision tecnico mecanica' : `Talleres mecanicos de ${servicio} para ${vehiculo}`} en Bogotá</h2>
        <ol style={{marginLeft:'16px', gap:'8px', display:'flex', flexDirection:'column'}}>
          {data?.map((el, index) => (
            <li style={{ fontWeight: '500', }} key={el?.userName}>
              <Link style={{ color: '#407BFF', }} href={`/${el?.userName}`}> {el?.nombre} </Link>
              {index < data.length - 1 && ', '}
            </li>
          ))}
        </ol>
      </div>
    </>

  )
}