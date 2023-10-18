import styles from '@/styles/ServiciosAutomotriz.module.css'



export default function MapaUbicacion({taller}) {
  
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Ubicacion </h2>
      <iframe style={{ height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', gap: '32px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px', justifyContent: 'space-between' }} className={styles.mapsImage} src={taller?.ubicacionmaps} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </>
  )
}