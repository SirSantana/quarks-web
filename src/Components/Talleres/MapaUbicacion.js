import styles from '@/styles/ServiciosAutomotriz.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'


export default function MapaUbicacion({ ubicacion, username}) {

  let ubicacionMaps = talleres.talleres.find(el=> el.userName == username)
  console.log(ubicacionMaps);
  console.log(talleres, username);
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Ubicacion </h2>
      <div className={styles.maps}>
        <iframe style={{ height: '100%', width: '100%', borderRadius:'8px' }} src={ubicacionMaps.ubicacionmaps} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
    </>
  )
}