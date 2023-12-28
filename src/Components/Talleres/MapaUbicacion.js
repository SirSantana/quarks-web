import styles from '@/styles/ServiciosAutomotriz.module.css'



export default function MapaUbicacion({ ubicacion }) {

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Ubicacion </h2>
      <div className={styles.maps}>
        <iframe style={{ height: '100%', width: '100%', borderRadius:'8px' }} src={ubicacion} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
    </>
  )
}