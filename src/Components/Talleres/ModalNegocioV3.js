
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Image from 'next/image'
import { categorias2 } from './ServiciosOfrecidos'
import Button, { ButtonVariant } from '../Button/Button'
import { useRouter } from 'next/router'
import WidgetMenu from './V3/WidgetMenu'

export default function ModalNegocioV3({ setVisibleModal, data }) {
  const router = useRouter()
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = data?.horario.split(',');
  return (
    <div onClick={() => setVisibleModal(false)}  className={styles.modal} >
      <div  onClick={() => router.push(`/${data?.userName}`)}  className={styles.modalContainer} style={{ maxWidth: '600px', borderEndEndRadius: 0, borderEndStartRadius: 0 }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Image
            src={data.fotoperfil}
            alt={data.nombre}
            width={80}
            height={80}
            style={{border:'4px solid white', position: 'absolute', top: '-64px', backgroundColor:'white', transform: 'translateX(-50%)', left: '50%', borderRadius: '50%', objectFit: 'cover', width: '80px', height: '80px' }}
          />
          {/* <Icon onClick={() => setVisibleModal(false)} name={IconCatalog.closeOutline} /> */}
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '22px', fontWeight: '600', margin: '32px 0 4px 0' }}>{data.nombre}</p>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>{data?.direccion}. {data?.localidad}, {data?.ciudad}</p>


        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '0px' }}>
        <WidgetMenu data={data} onClick={() => console.log('hola')} handleChangeSection={() => console.log('hola')} mapSectionRef={() => console.log('hola')} refReseñas={() => console.log('hola')} indicativo={data?.indicativo} />
          
          <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {data?.categorias.map(el => {
              const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                <div key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '4px 8px', }}>
                  {category?.img && <Image src={`/${category?.img}.png`} width={20} height={20} alt={`Taller de autos de ${el}`} style={{objectFit:'contain'}}/>}
                  <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>{category?.nombre? category?.nombre : el}</p>
                </div>
              )
            })}
            {/* <p style={{ fontSize: '12px', color: '#5C5C5C', fontWeight: '600' }}>+{data?.categorias?.length} servicios</p> */}
          </div>
         
          {/* <p style={{ fontSize: '12px', color: '#5C5C5C' }}>Hoy {horariosSeparados?.[indiceDia]}</p> */}
          {/* <CalificacionWidget onClick={() => console.log('hola')} id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} /> */}

        </div>
          <Button fullWidth variant={ButtonVariant.secondary}>
            Enviar Mensaje
          </Button>
      </div>
    </div>

  )
}