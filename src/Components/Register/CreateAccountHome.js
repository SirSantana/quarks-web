

import styles from '@/styles/Faq.module.css'
import styles2 from '@/styles/ServiciosAutomotriz.module.css'
import Image from 'next/image'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import DataTaller from '../Talleres/V3/DataTaller';
import Button, { ButtonVariant } from '../Button/Button';
import { signIn, useSession } from 'next-auth/react';
import { useLazyQuery } from '@apollo/client';
import { GET_NEGOCIOVDOS_BY_EMAIL } from '@/graphql/queries';


export default function CreateAccountHome({ setPage, router }) {
  const [disableClick, setDisableClick] = useState(false);
  const [getNegocioVDosByEmail, result] = useLazyQuery(GET_NEGOCIOVDOS_BY_EMAIL)
  const { data } = useSession()

  const getNegocioVDos = () => {
    getNegocioVDosByEmail({ variables: { email: data?.user.email } })
  }
  useEffect(() => {
    if (result?.data?.getNegocioVDosByEmail) {
      router.push(`/${result.data.getNegocioVDosByEmail}`)
    }
  }, [result])
  const settings = {
    horizontal: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activar autoplay
    speed: 2000, // Velocidad de cambio en milisegundos
    cssEase: "linear", // Cambiar el efecto de transición si lo deseas
    onSwipe: () => {
      // Cuando se inicia el desplazamiento, desactivar el clic
      setDisableClick(true);
    },
    afterChange: () => {
      // Cuando finaliza el desplazamiento, volver a habilitar el clic
      setDisableClick(false);
    },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '32px' }} >
      <div className={styles.containerSticky}>
        <Slider className={styles.sliderTab2} {...settings}>
          {talleres.talleres.slice(0, 20).map(el => {
            return (
              el.fotoperfil &&
              <div style={{ justifyContent: 'center', alignItems: 'center', width: '700px', borderRadius: 'none', margin: 0, maxWidth: 'auto', padding: 0 }} className={styles2.divDesktopCard}>
                <Image
                  width={300}
                  height={500}
                  className={styles2.imgFotoPortada2}
                  src={el.fotoperfil}
                  priority={true}
                  style={{ margin: 0, height: '100vh', width: '100%', objectFit: 'cover', borderRadius: '0', maxWidth: '800px' }}
                  loading="eager"
                  alt={`Taller mecanico  Bogota`}
                />
                <div
                  style={{ width: '100%', margin: '0 auto', borderRadius: '0' }}
                  className={styles.opacityImg}
                />
                <div style={{ width: '100%', margin: '0 auto', borderRadius: '0', margin: '0 0 16px 16px' }} className={styles.cardDataDesktop} >
                  <DataTaller data={el} mobile={true} />
                </div>
              </div>
            )
          }

          )}
        </Slider>
      </div>
      <div className={styles.containerCreateAccountHome}>
        <p style={{ fontSize: '14px', color: '#25d366', fontWeight: '600', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><ion-icon style={{ color: '#25d366', fontSize: '24px' }} name="ribbon-outline"></ion-icon>+50 talleres y mecanicos registrados</p>
        <h1 className={styles.titleAccess}>La red de mecanicos mas grande del mundo</h1>
        <p style={{ margin: '8px 0 32px 0', color: '#5c5c5c' }}>
          Decenas de mecanicos y talleres ya se unieron <span style={{ fontWeight: '700' }}>¿Que esperas para unirte?</span>
        </p>
        {data
          ?
          <Button onClick={getNegocioVDos} size='lg' variant={ButtonVariant.primary}>
            Ya tienes un perfil, Ver perfil
          </Button>
          :
          <>
            <Button onClick={() => { setPage(0), router.push('/signup?page=0') }} size='lg' variant={ButtonVariant.primary}>
              Crea tu perfil Gratis!
            </Button>
            <div style={{width:'100%', height:'1px ', backgroundColor:'#d9d9d9', margin:'16px 0'}}/>
            <Button onClick={() =>  signIn('google')} size='lg' variant={ButtonVariant.outlined}>
              Ya tienes una cuenta?
            </Button>
          </>
        }
      </div>
      {/* <img src="./taller-ilustration.png" className={styles.imgCard} alt="Crea tu perfil" /> */}

    </div>
  )
}