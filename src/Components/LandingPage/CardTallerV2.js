

import Link from 'next/link';
import Button, { ButtonVariant } from '../Button/Button';
import Avatar from '../UI/Avatar';
import { categorias } from '@/src/data/Categorias';
import { useRouter } from 'next/router';


export default function CardTallerV2({ taller, setVisibleModal }) {
  // const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: taller?.id } })
  const router = useRouter()
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = taller?.horario?.split(',')
  return (
    <div style={{ border: '1px solid #CFD5E1', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Link href={`/${taller?.userName}`} style={{ display: 'flex', flexDirection: 'column', outline: 'none', textDecoration: 'none', width: '100%', gap: '16px' }}>
        <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', width: '100%' }}>
          {/* {taller?.fotoperfil &&
            <Image width={56} height={56} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '50%' }} src={taller?.fotoperfil} alt={`Taller de carros ${taller?.nombre}`} loading='lazy' />
          } */}
          <Avatar src={taller.fotoperfil} size={56} backgroundColor={'#FFFFFF'} alt={`Taller de ${router.query?.servicio?.replaceAll('-', ' ')} : ${taller?.nombre}`} />
          <div>
            <h3 style={{ fontSize: '20px', lineHeight: '22px', color: '#182537', fontWeight: '500' }}>{taller?.nombre}</h3>
            {/* <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>Taller especializado BMW</p> */}
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>{taller?.tipo === 'Almacen' ? "Almacén de Autopartes" : taller?.tipo === 'Mecanico a Domicilio' ? "Mecánico a domicilio" : "Taller Mecánico"}</p>
          </div>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>

          <ul style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {taller?.categorias?.slice(0, 3).map(el => {
              const category = categorias?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                category &&
                <li key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', }}>
                  {/* {category?.img && <img src={`/${category?.img}`} style={{height:'20px',width:'20px'}} alt={`Taller de autos de ${el}`} />} */}
                  <img
                    src={`/${category?.img}`} // Ruta de la imagen
                    alt={`Servicio de ${el}`} 
                    style={{height:'20px',width:'20px'}}
                  />
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '12px', color: '#464646' }}>{category?.nombre}</p>
                </li>
              )
            })}
            <li style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', color: '#929292', fontWeight: '500' }}>
              +{taller?.categorias?.length} servicios
            </li>
          </ul>

        </div>
        <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '8px', width: '100%', alignItems: 'flex-end' }}>
          {/* <Button variant={ButtonVariant.outlined} size='sm' style={{ alignSelf: 'flex-end', margin: 0, borderRadius: '4px' }}>
              Abrir mapa
            </Button> */}
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#A6AEC1' }}>📍 {taller?.ciudad}</p>
          <Button variant={ButtonVariant.primary} size='sm' style={{ backgroundColor: '#E1EAFF', color: '#407BFF', fontSize: '12px', alignSelf: 'flex-end', margin: 0, borderRadius: '4px' }}>
            Ver taller
          </Button>
        </footer>
      </Link>
    </div>
  )
}