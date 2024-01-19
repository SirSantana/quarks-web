
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { MagicMotion } from 'react-magic-motion';
import Icon, { IconCatalog } from '../Icon/Icon'
import { useRouter } from 'next/router';

export default function RedesSociales({ data,  }) {
  const router = useRouter()


  let urlFacebook =data?.facebook
  let urlInstagram = data?.instagram
  let urlWeb =  data?.paginaweb

  const handleChangePage = (e, { page }) => {
    e.stopPropagation()
      if (page === 'facebook' && urlFacebook) {
        return router.push(`${urlFacebook}`)
      }
      if (page === 'instagram' && urlInstagram) {
        return router.push(`https://www.instagram.com/${urlInstagram}`)
      }
      if (page === 'web' && urlWeb) {
        return router.push(`${urlWeb}`)
    }
  }
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Redes Sociales</h2>
      <div className={styles.containerHeaderCalendario} style={{ flexDirection: 'column', alignItems: 'center', }}>
        <MagicMotion>
          {urlFacebook &&
            <div onClick={(e) => handleChangePage(e, { page: 'facebook' })} style={{ color: 'black',  borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', }}>
                <Icon size='lg' name={IconCatalog.logoFacebook} style={{ color: '#0080FF', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5' }} />
              <p style={{ fontSize: '14px', flex: 1 }}> {urlFacebook ? 'Ver Perfil' : 'Agregar Perfil'}</p>
            </div>
          }
          {urlInstagram &&
            <div onClick={(e) => handleChangePage(e, { page: 'instagram' })} style={{ color: 'black', border: 'none', borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', }}>
                <Icon size='lg' name={IconCatalog.logoInstagram} style={{ color: '#EB4264', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5' }} />
              <p style={{ fontSize: '14px', flex: 1 }}>{urlInstagram ? 'Ver Perfil' : 'Agregar Perfil'}</p>
            </div>
          }
          {urlWeb &&
            <div onClick={(e) => handleChangePage(e, { page: 'web' })} style={{ color: 'black', border: 'none', borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white' }}>
                <Icon size='lg' name={IconCatalog.globeOutline} style={{ color: '#222222', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5' }} />
                <p style={{ fontSize: '14px', flex: 1 }}>{data?.paginaweb ? data?.paginaweb : 'Agregar Pagina Web'}</p>
            </div>
          }
        </MagicMotion>
      </div>
    </>

  )
}