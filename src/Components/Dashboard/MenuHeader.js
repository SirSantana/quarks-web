
import styles from '@/styles/Dashboard.module.css'
import { useRouter } from 'next/router'


export default function MenuHeader() {
  const router = useRouter()
  return (
    <div className={styles.menu}>
      {/* <h6 className={styles.subtitle}>Quarks</h6> */}
      <div className={styles.containerDivs}>
        <div onClick={()=>router.push('/dashboard') } style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor:'pointer' }}>
          
          <img alt={'Cotiza tus repuestos logo'} src={router?.pathname ==='/dashboard' ?'/home-fill.svg' :'/home-outline.svg' } style={{ height: '24px', width: '24px', }} />
          <p style={{ fontSize: '12px', color: 'white' }}>Inicio</p>
        </div>

        <div onClick={()=>router.push('/dashboard/analiticas') } style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor:'pointer' }}>
          <img alt={'Cotiza tus repuestos logo'} src={router?.pathname ==='/dashboard/analiticas'?'/bar-chart-fill.svg' :'/bar-chart-outline.svg'} style={{ height: '24px', width: '24px', }} />
          <p style={{ fontSize: '12px', color: 'white' }}>Analiticas</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img alt={'Cotiza tus repuestos logo'} src={'/car-sport-outline.svg'} style={{ height: '24px', width: '24px', }} />
          <p style={{ fontSize: '12px', color: 'white' }}>Tus carros</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img alt={'Cotiza tus repuestos logo'} src={'/newspaper-outline.svg'} style={{ height: '24px', width: '24px', }} />
          <p style={{ fontSize: '12px', color: 'white' }}>cotizaciones</p>
        </div>
      </div>
    </div>
  )
}