import Icon, { IconCatalog } from "@/src/Components/Icon/Icon"
import Layout from "@/src/Components/Layout"
import ButtonTestWhatsapp from "@/src/Components/Talleres/ButtonTestWhatsapp";
import ButtonsFooter from "@/src/Components/Talleres/ButtonsFooter";
import CalificacionWidget from "@/src/Components/Talleres/CalificacionWidget";
import SliderTab from "@/src/Components/Talleres/V3/SliderTab";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Bio.module.css'
import { useState } from 'react';

let data = {
  fotoperfil: 'https://azurequarks.blob.core.windows.net/negocios/tarjetacorsamotors.jpg',
  nombre: 'Corsa Motors',
  tipo: 'Almacen de Autopartes',
  mapaUrl: 'https://www.google.com/maps/embed?pb=!4v1697561374702!6m8!1m7!1sYAM2wah5bxApYrR92Li3eA!2m2!1d4.657770543962067!2d-74.07361318533115!3f319.961134676433!4f-2.3154057628985356!5f0.7820865974627469',
  whatsapp: '+573143551942',
  direccion: 'cra 27a #64a-59',
  ciudad: 'Bogotá',
  pais: 'Colombia',
  horarios: 'Lun 9:00 AM - 6:00 PM,Mar 9:00 AM - 6:00 PM,Mié 9:00 AM - 6:00 PM,Jue 9:00 AM - 6:00 PM,Vie 9:00 AM - 6:00 PM,Sáb 9:00 AM - 3:00 PM,Dom 10:00 AM - 2:00 PM',
  facebook: '',
  instagram: '',
  twitter: '',
  website: '',
  horariosExtra: '',
  id: '652ebb646e27674e4c2876a9',
  cantidadCalificaciones: 1,
}
let tabs = ['Servicios', 'Ubicacion', 'Horario','Redes Sociales', 'Acerca de',  'Reseñas'];

export default function V3() {
  const handleAccion = ({ red = 'btn-social-facebook' }) => {
    if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: data?.id, tipo: red, estado: 'production' } });
    }
  }
  const [activeTab, setActiveTab] = useState(-1); // Estado para mantener la pestaña activa
  const [disableClick, setDisableClick] = useState(false);
  const settings = {
    horizontal: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    arrows: false,
    onSwipe: () => {
      // Cuando se inicia el desplazamiento, desactivar el clic
      setDisableClick(true);
    },
    afterChange: () => {
      // Cuando finaliza el desplazamiento, volver a habilitar el clic
      setDisableClick(false);
    },
  };
  const handleTabClick = (index) => {
    if (disableClick) {
      // Si el clic está desactivado, no hacer nada
      return;
    }
    setActiveTab(index);
    // router.push(`/${router.query.id}?tab=${tabs[index]}`)
    const refss = [refs.refServicios, refs.mapSectionRef, refs.refHorarios, refs.refRedes, refs.refAcercaDe, refs.refReseñas,];
    handleChangeSection({ ref: refss[index] });
    // handleChangeSection({ref:refServicios})
    // Aquí puedes agregar la lógica para cambiar de ruta según la pestaña seleccionada
  };

  return (
    <Layout visibleNavbar={false} title={`${data.nombre}`} footer={false} >

      <div style={{ backgroundColor: '#FCFDFF', minHeight: '100dvh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px', justifyContent: 'space-between', margin: '0 auto', margin: '0 auto 32px auto', alignItems: 'center' }}>
          {/* <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '500px', justifyContent: 'space-between', margin: '0 auto', margin: '16 auto 16px auto', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', border: '2px solid #373737', borderRadius: '50%', padding: '8px' }}>
              <Icon name={IconCatalog.call} style={{ color: '#373737', fontSize: '16px' }} />
            </div>
          </header> */}


          <img src={data.fotoperfil} alt={`Foto de ${data.nombre}`} style={{ borderRadius: '50%', height: '128px', width: '128px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0 auto', alignItems: 'center' }}>

            <h1  >{data.nombre}</h1>
            <h2 style={{ backgroundColor: '#EDEDF2', border: '1px solid #CFD5E1', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)', padding: '6px 16px 6px 12px', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', color: '#182537', margin: '8px 0', gap: '8px', fontWeight: '500' }}><img src='/mecanico.png' alt='mecanico' style={{ height: '20px', width: '20px' }} />{data.tipo}</h2>
            {/* <CalificacionWidget ctdCalificaciones={data.cantidadCalificaciones} id={data.id} /> */}

          </div>

          {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', margin: '16px 0' }}>
            <Icon name={IconCatalog.logoFacebook} style={{ color: '#0080FF', fontSize: '32px' }} />
            <Icon name={IconCatalog.logoInstagram} style={{ color: '#ED475B', fontSize: '32px' }} />
            <Icon name={IconCatalog.logoWhatsapp} style={{ color: '#00bb2d', fontSize: '32px' }} />
            <Icon name={IconCatalog.globeOutline} style={{ color: '#222222', fontSize: '32px' }} />
          </div> */}
          <iframe title={`Ubicacion ${data?.nombre}`} style={{ height: '260px', width: '90%', borderRadius: '16px', margin: '32px 0 0 0', }} src={data?.mapaUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <p style={{ fontSize: '14px', color: '#182537', display: 'flex', marginBottom: '64px', alignItems: 'center', gap: '8px' }}><Icon name={IconCatalog.locationSharp} style={{ color: '#A6AEC1', fontSize: '24px' }} /> {data.direccion} <span style={{ fontWeight: '500', color: '#182537' }}>{data.ciudad}, {data.pais}</span></p>


          <div className={styles.containerSliderTab} >
            <Slider className={styles.sliderTab} {...settings}>
              {tabs.map((el, index) => (
                <div key={index} className={index === activeTab ? styles.activeTab : styles.tab}>
                  <h3
                    className={index === activeTab ? styles.activeTextTab : styles.textTab}
                    onClick={() => handleTabClick(index)}
                    style={{ fontSize: "14px", fontWeight: "500", lineHeight: "1.1", overflow: "hidden", textOverflow: "ellipsis", textAlign: 'center' }}
                  >
                    {el}
                  </h3>
                </div>
              ))}
            </Slider>
          </div>

          <div style={{ position: 'fixed', maxWidth: '500px', bottom: '16px', display: 'flex', gap: '16px', width: '90%', justifyContent: 'space-between', alignItems: 'center', }}>
            <button style={{ backgroundColor: '#182537', color: '#FCFDFF', borderRadius: '8px', height: '48px', fontSize: '16px', fontWeight: '500', margin: '16px 0', flex: 1 }} onClick={() => { handleAccion({ red: 'btn-social-whatsapp' }) }}>
              Agendar Cita
            </button>
            <button style={{ width: '48px', height: '48px', border: '1px solid #182537', backgroundColor: '#FCFDFF', borderRadius: '8px', fontSize: '16px', fontWeight: '500', margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', }} onClick={() => { handleAccion({ red: 'btn-social-facebook' }) }}>
              <Icon name={IconCatalog.call} style={{ color: '#182537', fontSize: '20px' }} />
            </button>
          </div>
          <div>
            <h2>Redes</h2>
          </div>
          <div>
            <h2>Horario</h2>
          </div>
          <div>
            <h2>Servicios Ofrecidos</h2>
          </div>
        </div>

      </div>
    </Layout>
  )
}