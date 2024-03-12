import { GET_CALIFICACION_OPINIONES } from '@/graphql/queries';
import styles from '@/styles/Landing.module.css'
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { categorias2 } from '../Talleres/ServiciosOfrecidos';
import Image from 'next/image';
import Button, { ButtonVariant } from '../Button/Button';
import { useRouter } from 'next/router';


export default function CardNewTaller({ taller, setVisibleModal}) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: taller?.id } })

  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = taller?.horario.split(',');
  const router = useRouter()
  
  return (
    <article onClick={()=> router.push(`?visible-negocio=${taller?.userName}`, undefined, { shallow: true })} className={styles.cardNewTaller}>
      <div 
      // href={`/${taller?.userName}`}
       style={{position:'relative'}} className={styles.containerDataNewTaller}>
        {taller?.fotoperfil &&
          <Image width={160} height={160} className={styles.imgPerfilTaller} src={taller?.fotoperfil} alt={`Taller de carros ${taller?.nombre}`} loading='lazy' />
        }
        {/* <div style={{position:'absolute', top:'-24px', left:'70%', backgroundColor:'#fbbc04',border:'1px solid #d9d9d9', borderRadius:'8px', padding:'4px 8px' }}>
          <p style={{color:'#373737', fontWeight:'600', fontSize:'12px'}}>Accesorios y Lujos</p>
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px', width: '100%' }}>
          <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              {taller?.fotoperfil &&
                <Image width={160} height={160} className={styles.imgPerfilTaller2} src={taller?.fotoperfil} alt={`Taller de carros ${taller?.nombre}`} />
              }
              <p style={{ fontSize: '12px', color: '#5C5C5C' }}>Hoy {horariosSeparados?.[indiceDia]}</p>
            </div>
            {result?.data?.getCalificacionOpiniones > 0 &&
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: '4px' }}>
                <ion-icon style={{ color: '#FBBC04' }} name="star"></ion-icon>
                <p style={{ fontSize: '12px', margin: 0, color: '#464646' }}>{result?.data?.getCalificacionOpiniones}</p>
              </div>
            }
          </header>
          <h2 style={{ fontSize: '18px' }}>{taller?.nombre}</h2>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>{taller?.direccion}. {taller?.localidad}, {taller?.ciudad}</p>
          <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {taller?.categorias.slice(0, 3).map(el => {
              const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                category &&
                <div key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center',backgroundColor:'#f3f3f3' , borderRadius: '8px', padding: '4px 8px', }}>
                  {category?.img && <Image src={`/${category?.img}.png`} width={20} height={20} alt={`Taller de autos de ${el}`} />}
                  <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>{category?.nombre}</p>
                </div>
              )
            })}
            <p style={{ fontSize: '12px', color: '#5C5C5C', fontWeight: '600' }}>+{taller?.categorias?.length} servicios</p>
          </div>
          <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '8px', width: '100%', alignItems: 'flex-end' }}>
            {/* <button style={{ fontWeight: '600', fontSize: '12px', padding: '0', borderRadius: '2px', alignSelf: 'flex-end', color: '#f50057', backgroundColor: 'inherit', margin: 0, height: '28px' }} className={styles.button}>
              Ver taller
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button> */}
            <Button variant={ButtonVariant.outlined} size='sm' style={{alignSelf:'flex-end', margin:0, borderRadius:'4px'}}>
              Ver taller
            </Button>
          </footer>
          
        </div>
      </div>
    </article>
  )
}