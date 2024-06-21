import Image from "next/image"
import { useRouter } from "next/router"

let servicios = [
  { nombre: 'Gasolineras', icono: 'servicio-inyeccion', url:'/gasolineras' },
  { nombre: 'CDA', icono: 'taller-ilustration', url:'/cda' },
  // { nombre: 'Taller mecanico', icono: 'taller-mecanico', url:'/taller-mecanico' },
  // { nombre: 'Autolavado', icono: 'mecanico', url:'/autolavado' },
  // { nombre: 'Compra Ventas', icono: 'servicio-carroceria', url:'/compra-ventas' },
]

export default function HeaderNavTags({ tags }) {
  const router = useRouter()
  return (
    <div style={{ zIndex: 1, position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'row', gap: '24px', width: '100%', transition: 'height 0.3s ease' }}>
      <div style={{display:'flex', flexDirection:'row', padding: '0 32px 16px 16px',  paddingTop:'0',gap:'16px', maxWidth: '820px', minWidth: '300px', width: '100%', margin: '0 auto',  scrollBehavior: 'auto',  overflowY: 'auto' }}>
      {servicios.map((el, index) => (
        <div onClick={()=> router.push(`/${el.url}`)} key={el?.nombre} style={{cursor:'pointer', whiteSpace:'nowrap', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border:`1px solid ${router.pathname.replace('/', '') == el.nombre.toLocaleLowerCase() ?'#373737':'#d9d9d9'}`, display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor:'white', borderRadius: '8px', padding: '4px 8px', }}>
          {el?.icono && <Image src={`/${el?.icono}.png`} width={20} height={20} alt={`Taller de autos de ${el}`} style={{objectFit:'contain'}}/>}
          <p style={{ margin: 0, fontSize: '12px', color:'#464646', fontWeight:'600' }}>{el?.nombre}</p>
        </div>
      ))}
    </div>
    </div>


  )
}