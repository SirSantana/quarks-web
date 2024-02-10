import styles from '@/styles/ServiciosAutomotriz.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import Icon, { IconCatalog } from '../Icon/Icon'
import { CREATE_ACCION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useState } from 'react'


export default function MapaUbicacion({ ubicacion, username, idNegocio }) {
  // const [createAccion, result] = useMutation(CREATE_ACCION)
  // const [created, setCreated] = useState(false)

  let ubicacionMaps = talleres.talleres.find(el => el.userName == username)

  // const handleAccion = () => {
  //   if (process.env.NODE_ENV === 'development' && !created) {
  //     createAccion({ variables: { almacen: idNegocio, tipo: 'btn-mapa', estado: 'production' } });
  //     setCreated(true)
  //   }
  // }
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.earthOutline} size='lg' /> Ubicacion </h2>
      <div className={styles.maps}>
        <iframe title={`Ubicacion ${ubicacionMaps.nombre}`} style={{ height: '100%', width: '100%', borderRadius: '8px' }} src={ubicacionMaps.ubicacionmaps} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  )
}