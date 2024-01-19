
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Box from '../Box/Box';
import ItemBox from '../Box/ItemBox';

export default function RedesSociales({ data, }) {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.globeOutline} size='lg' />Redes Sociales</h2>
      <Box>
        {data?.facebook &&
          <ItemBox link={data?.facebook} icon={IconCatalog.logoFacebook} color={'#0080FF'} textItem={'Ver perfil'}/>
        }
        {data?.instagram &&
          <ItemBox link={`https://www.instagram.com/${data?.instagram}`} icon={IconCatalog.logoInstagram} color={'#EB4264'}textItem={'Ver perfil'} />
        }
        {data?.paginaweb &&
          <ItemBox link={data?.paginaweb} icon={IconCatalog.globeOutline} color={'#222222'} textItem={'Ver pagina web'}/>
        }
      </Box>
    </>

  )
}