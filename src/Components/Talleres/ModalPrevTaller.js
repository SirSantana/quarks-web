
import { GET_CALIFICACION_OPINIONES, GET_ONE_NEGOCIOVDOS } from '@/graphql/queries';
import styles from '@/styles/Main.module.css'
import { useQuery } from '@apollo/client';
import Image from 'next/image'
import Button, { ButtonVariant } from '../Button/Button';
import WidgetComplete from '../Icon/WidgetComplete';
import { IconCatalog } from '../Icon/Icon';
import { categorias2 } from './ServiciosOfrecidos';
import { useRouter } from 'next/router';
import HorarioDias from './HorarioDias';
import dynamic from "next/dynamic";
import CalificacionWidget from './CalificacionWidget';
import { useRef, useState } from 'react';

const BogotaMap = dynamic(() => import('@/src/Components/Talleres/MapaBogotaCobertura'),
  { ssr: false })
  const RedesSociales = dynamic(() => import('@/src/Components/Talleres/RedesSociales'),
  { ssr: false })
  const ButtonsHeader = dynamic(() => import('@/src/Components/Talleres/ButtonsHeader'),
  { ssr: false })
  const MapaUbicacion = dynamic(() => import('@/src/Components/Talleres/MapaUbicacion'),
  { ssr: false })
  const Reseñas = dynamic(() => import('@/src/Components/Talleres/Reseñas'),
  { ssr: false })
  const Horario = dynamic(() => import('@/src/Components/Talleres/Horario'),
  { ssr: false })

export default function ModalPrevTaller({ userName, }) {
  const { data, loading, error } = useQuery(GET_ONE_NEGOCIOVDOS, { variables: { userName: userName } })
  const horariosSeparados = data?.getOneNegocioVDos.horario?.split(',');
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reseñasSectionRef = useRef(null);
  const router = useRouter()

  const handleVisibleHorario = () => {
    setVisibleFullHorario(!visibleFullHorario)
  }
  let categorias = data?.getOneNegocioVDos?.categorias?.reduce((result, el) => {
    const categoriaActual = categorias2.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })

  return (
    <div  className={styles.modal}>
      <div className={styles.modalContentComplete}>
        {loading
          ?
          <div
            className={styles.skeleton}
          />
          :
          <>
            <header className={styles.containerHeaderModalPrevTaller}>
              <Image
                width={400}
                height={300}
                className={styles.imgHeaderModalPrevTaller}
                src={data?.getOneNegocioVDos.fotoperfil}
                priority={true}
                loading="eager"
              />
              <ButtonsHeader data={data?.getOneNegocioVDos} />
              <div className={styles.sectionPrincipalDataModalPrevTaller}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  <h1 style={{ fontSize: '24px' }}>{data?.getOneNegocioVDos.nombre}</h1>

                  <p style={{ fontSize: '14px', fontWeight: '500', marginBottom:'8px' }}>{data?.getOneNegocioVDos.direccion}. {data?.getOneNegocioVDos?.localidad}, {data?.getOneNegocioVDos?.ciudad}</p>
                  {/* {result?.data?.getCalificacionOpiniones > 0 &&
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: '4px' }}>
                      <ion-icon style={{ color: '#FBBC04' }} name="star"></ion-icon>
                      <p style={{ fontSize: '12px', margin: 0, color: '#464646' }}>{result?.data?.getCalificacionOpiniones}</p>
                    </div>
                  } */}
                  <CalificacionWidget id={data?.getOneNegocioVDos.id} ctdCalificaciones={data?.getOneNegocioVDos.numerocalificacionesmaps} />
                  <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} idNegocio={data?.id} />
                </div>
                <div>
                  <WidgetComplete name={'telefono'} withBorder={false} text={data?.getOneNegocioVDos.telefono} icon={IconCatalog.callOutline} icon2={IconCatalog.callOutline} style={{ color: '#5c5c5c', }} badge={'Telefono'} />

                </div>
                <Button  variant={ButtonVariant.primary} size='sm' style={{ alignSelf: 'flex-end', margin: 0, borderRadius: '4px' }} fullWidth>
                  Solicitar Cotizacion
                </Button>
              </div>
            </header>
            <section className={styles.sectionsModalPrevTaller} >
              <h2 style={{ fontSize: '20px' }}>Servicios Ofrecidos</h2>
              <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                {/* {data?.getOneNegocioVDos?.categorias.map(el => {

                  const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
                  return (
                    <>
                      category &&
                      <div key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '4px 12px', height: '40px', }}>
                        {category?.img && <Image src={`/${category?.img}.png`} width={20} height={20} alt={`Taller de autos de ${el}`} />}
                        <p style={{ margin: 0, fontSize: '14px', color: '#464646', fontWeight: '500' }}>{category?.nombre}</p>
                      </div>
                    </>

                  )
                })} */}
                {categorias?.conImagen?.map(el => (
                  <div key={el?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '4px 12px', height: '40px', }}>
                    <Image src={`/${el.img}.png`} width={20} height={20} alt={`Taller de autos de ${el}`} />
                    <p style={{ margin: 0, fontSize: '14px', color: '#464646', fontWeight: '500' }}>{el?.nombre}</p>
                  </div>
                ))}
                {categorias?.sinImagen?.map(el => (
                  <div key={el} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '4px 12px', height: '40px', }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#464646', fontWeight: '500' }}>{el}</p>
                  </div>
                ))}
              </div>
            </section>
            {(data?.getOneNegocioVDos.facebook || data?.getOneNegocioVDos.instagram || data?.getOneNegocioVDos.whatsapp || data?.getOneNegocioVDos.paginaweb) &&
              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <RedesSociales data={data?.getOneNegocioVDos} />
              </section>

            }
            <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <MapaUbicacion ubicacion={data?.getOneNegocioVDos?.urltallermaps} username={data?.getOneNegocioVDos.userName} idNegocio={data?.getOneNegocioVDos.id} />
            </section>
            {data?.getOneNegocioVDos.tipo === 'Mecanico a Domicilio' &&
              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <BogotaMap />
              </section>
            }
            {data?.getOneNegocioVDos.horario &&
              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <HorarioDias horariosSeparados={horariosSeparados} data={data?.getOneNegocioVDos} />
              </section>
            }
            <section ref={reseñasSectionRef} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <Reseñas id={data?.getOneNegocioVDos.id} ctdCalificaciones={data?.getOneNegocioVDos.numerocalificacionesmaps} urlMaps={data?.getOneNegocioVDos.urltallermaps} userName={data?.getOneNegocioVDos.userName}/>
          </section>
          </>

        }
      </div>
    </div >

  )
}