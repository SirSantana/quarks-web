
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import SliderTiposTalleres, { categorias } from '../LandingPage/SliderTiposTalleres'
import CategoriasSlider from '../LandingPage/CategoriasSlider'
import Box from '../Box/Box'


export default function MiraMasTalleres() {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.ribbonOutline} size='lg' />Mira mas talleres. ¿Que servicio buscas? </h2>
      <CategoriasSlider categorias={categorias} type='Taller' />
    </>
  )
}