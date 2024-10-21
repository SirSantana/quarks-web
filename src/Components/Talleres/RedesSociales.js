
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Box from '../Box/Box';
import ItemBox from '../Box/ItemBox';
import { useMutation } from '@apollo/client';
import { CREATE_ACCION } from '@/graphql/mutations';
import sendWhatsappMessage from '@/utils/scripts';
import { useRouter } from 'next/router';

export default function RedesSociales({ data, }) {
  const [createAccion] = useMutation(CREATE_ACCION)
  const router = useRouter()

  const handleAccion = ({ red = 'btn-social-facebook' }) => {
    if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: data?.id, tipo: red, estado: 'production' } });
    }
  }
  const handleWhatsAppClick = () => {
    handleAccion({ red: 'btn-social-whatsapp' })
    sendWhatsappMessage({ numero: data?.whatsapp, path: router?.asPath })
  };
  return (
    <>
      <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px' }}>Redes Sociales de {data?.nombre}</h2>
      {data?.facebook &&
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }}>
          <Icon name={IconCatalog.logoFacebook} size='lg' style={{ color: '#407BFF' }} />
          <div>
            <p style={{ fontWeight: '400', color: '#182537', fontSize: '16px', lineHeight: '1.05' }}>Visitar perfil</p>
            <p style={{ color: '#6C788E', fontSize: '14px' }}>@{data?.facebook}</p>
          </div>
        </div>
        // <ItemBox onClick={() => handleAccion({ red: 'btn-social-facebook' })} link={data?.facebook} icon={IconCatalog.logoFacebook} color={'#0080FF'} textItem={'Ver perfil'} />
      }
      {data?.instagram &&
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }}>
          <Icon name={IconCatalog.logoInstagram} size='lg' style={{ color: '#EB4264' }} />
          <div>
            <p style={{ fontWeight: '400', color: '#182537', fontSize: '16px', lineHeight: '1.05' }}>Visitar perfil</p>
            <p style={{ color: '#407BFF', fontSize: '14px' }}>@{data?.instagram}</p>
          </div>
        </div>
        // <ItemBox onClick={() => handleAccion({ red: 'btn-social-facebook' })} link={data?.facebook} icon={IconCatalog.logoFacebook} color={'#0080FF'} textItem={'Ver perfil'} />
      }
      {data?.whatsapp &&
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }}>
          <Icon name={IconCatalog.logoWhatsapp} size='lg' style={{ color: '#407BFF' }} />
          <div>
            <p style={{ fontWeight: '400', color: '#182537', fontSize: '16px', lineHeight: '1.05' }}>Abrir Whatsapp</p>
            <p style={{ color: '#6C788E', fontSize: '14px' }}>{data?.indicativo}{data?.whatsapp}</p>
          </div>
        </div>
        // <ItemBox onClick={() => handleAccion({ red: 'btn-social-facebook' })} link={data?.facebook} icon={IconCatalog.logoFacebook} color={'#0080FF'} textItem={'Ver perfil'} />
      }
      {/* {data?.instagram &&
        <ItemBox onClick={() => handleAccion({ red: 'btn-social-instagram' })} link={`https://www.instagram.com/${data?.instagram}`} icon={IconCatalog.logoInstagram} color={'#EB4264'} textItem={'Ver perfil'} />
      } */}
      {/* {data?.whatsapp &&
        <ItemBox onClick={handleWhatsAppClick} icon={IconCatalog.logoWhatsapp} color={'#00bb2d'} textItem={'Abrir Whatsapp'} />
      }
      {data?.paginaweb &&
        <ItemBox onClick={() => handleAccion({ red: 'btn-social-paginaweb' })} link={data?.paginaweb} icon={IconCatalog.globeOutline} color={'#222222'} textItem={'Ver pagina web'} />
      } */}
    </>

  )
}