import styles from '@/styles/ServiciosAutomotriz.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'


export default function MapaUbicacion({ username, nombre, direccion }) {
  let ubicacionMaps = talleres.talleres.find(el => el.userName == username)
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}> Ubicacion de {nombre}  </h2>
      <div className={styles.maps}>
        <iframe title={`Ubicacion ${ubicacionMaps.nombre}`} style={{ height: '100%', width: '100%', borderRadius: '8px' }} src={ubicacionMaps.ubicacionmaps} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <span style={{textAlign:'left', width:'90%'}}>{direccion}</span>

    </>
  )
}