import { GET_CALIFICACION_OPINIONES } from '@/graphql/queries';
import styles from '@/styles/Landing.module.css'
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import OpinionesPrev from '../Index/OpinionesPrev';
import { useRouter } from 'next/router';


const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos' },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo' },
]

export default function CardNewTaller({ taller }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: taller?.id } })

  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = taller?.horario.split(',');
  const router = useRouter()
  return (
    <Link target="_blank" href={`/servicios-automotriz/negocio/${taller?.id}-${taller?.nombre}`} className={styles.cardNewTaller}>

      <div className={styles.containerDataNewTaller}>
        {taller?.fotoperfil &&
          <img className={styles.imgPerfilTaller} src={taller?.fotoperfil} />
        }

        <div style={{display:'flex', flexDirection:'column', padding:'8px', width:'100%'}}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems:'center' }}>
            {taller?.fotoperfil &&
              <img className={styles.imgPerfilTaller2} src={taller?.fotoperfil} />
            }
            <p style={{ fontSize: '12px', color: '#5C5C5C' }}>Hoy {horariosSeparados?.[indiceDia]}</p>
          </div>
          {/* <p style={{ fontSize: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}>
            <ion-icon style={{ color: '#f50057' }} name="star"></ion-icon>
            4.5</p> */}
          {result?.data?.getCalificacionOpiniones > 0 &&
            <OpinionesPrev id={taller?.id} />
          }
        </div>
        <h2 style={{ fontSize: '18px' }}>{taller?.nombre}</h2>
        <p style={{ fontSize: '14px' }}>{taller?.direccion}. {taller?.localidad}, {taller?.ciudad}</p>
        <div style={{ display: 'flex', marginTop: '16px', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          {taller?.categorias.slice(0, 3).map(el => (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', backgroundColor: '#f1f1f1', borderRadius: '4px', padding: '4px 8px' }}>
              {/* <img src={router?.pathname === '/'?`./${el}.png`:`../../${el}.png`} style={{ height: '14px', width: '14px' }} /> */}
              <p style={{ fontSize: '12px', color: '#5C5C5C' }}>{el}</p>
            </div>
          )
          )}
          <p style={{ fontSize: '12px', color: '#5C5C5C', fontWeight: '600' }}>+{taller?.categorias?.length} servicios</p>
          {/* {categorias.map(el => (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <img src={router.pathname === '/'?`./${el.img}.png`:`../../${el.img}.png`} style={{ height: '14px', width: '14px' }} />
              <p style={{ fontSize: '12px', color: '#5C5C5C' }}>{el.nombre}</p>
            </div>
          ))} */}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '8px', width: '100%', alignItems: 'flex-end' }}>
          <button style={{ fontWeight: '600', fontSize: '12px', padding: '0', borderRadius: '2px', alignSelf: 'flex-end', color: '#f50057', backgroundColor: 'inherit', margin: 0, height: '28px' }} className={styles.button}>
            Ver taller
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>

        </div>
        </div>
      </div>
    </Link>
  )
}