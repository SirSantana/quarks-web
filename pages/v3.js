import Icon, { IconCatalog } from "@/src/Components/Icon/Icon"
import Layout from "@/src/Components/Layout"
import SliderTab from "@/src/Components/Talleres/V3/SliderTab";


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
}

export default function V3() {
  const handleAccion = ({ red = 'btn-social-facebook' }) => {
    if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: data?.id, tipo: red, estado: 'production' } });
    }
  }
 
  return (
    <Layout visibleNavbar={false} title={`${data.nombre}`} >
      <div style={{ backgroundColor: '#fbfbfb', height: '100dvh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px', justifyContent: 'space-between', margin: '0 auto', margin: '0 auto 32px auto', alignItems: 'center' }}>
          <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '500px', justifyContent: 'space-between', margin: '0 auto', margin: '16 auto 16px auto', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', border: '2px solid #373737', borderRadius: '50%', padding: '8px' }}>
              <Icon name={IconCatalog.call} style={{ color: '#373737', fontSize: '16px' }} />
            </div>
          </header>


          <img src={data.fotoperfil} alt={`Foto de ${data.nombre}`} style={{ borderRadius: '50%', height: '128px', width: '128px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0 auto', alignItems: 'center' }}>
            <h1  >{data.nombre}</h1>
            <h2 style={{ backgroundColor: '#E6E6E6', padding: '4px 8px', borderRadius: '4px', fontSize: '16px', fontWeight: '500', color: '#5C5C5C', marginBottom: '8px' }}>{data.tipo}</h2>
            <p style={{ fontSize: '14px', color: '#8C8C8C' }}>{data.direccion} <span style={{ fontWeight: '500' }}>{data.ciudad}, {data.pais}</span></p>
          </div>

          {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', margin: '16px 0' }}>
            <Icon name={IconCatalog.logoFacebook} style={{ color: '#0080FF', fontSize: '32px' }} />
            <Icon name={IconCatalog.logoInstagram} style={{ color: '#ED475B', fontSize: '32px' }} />
            <Icon name={IconCatalog.logoWhatsapp} style={{ color: '#00bb2d', fontSize: '32px' }} />
            <Icon name={IconCatalog.globeOutline} style={{ color: '#222222', fontSize: '32px' }} />
          </div> */}

          <iframe title={`Ubicacion ${data?.nombre}`} style={{ height: '200px', width: '90%', borderRadius: '8px', margin: '16px 0' }} src={data?.mapaUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          <SliderTab handleChangeSection={()=>{}}  desktop={false} />
        </div>

      </div>
    </Layout>
  )
}