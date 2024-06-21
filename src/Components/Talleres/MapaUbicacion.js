import styles from '@/styles/ServiciosAutomotriz.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

export default function MapaUbicacion({ username, nombre, direccion, coordenadas, img, ubicacion}) {
  let ubicacionMaps = talleres.talleres.find(el => el.userName == username)
  const position = { lat: coordenadas?.[0], lng: coordenadas?.[1] }
  const mapCenter= [coordenadas?.[0], coordenadas?.[1]];
  return (
    ubicacionMaps || ubicacion
      ?
      <>
        <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}> Ubicacion de {nombre}  </h2>
        <div className={styles.maps}>
          <iframe title={`Ubicacion ${ubicacionMaps?.nombre? ubicacionMaps.nombre : nombre}`} style={{ height: '100%', width: '100%', borderRadius: '8px' }} src={ubicacionMaps?.ubicacionmaps? ubicacionMaps.ubicacionmaps : ubicacion} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <span style={{ textAlign: 'left', width: '90%' }}>{direccion}</span>
      </>
      :
      <>
        <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}> Ubicacion de {nombre}  </h2>
        <MapContainer
          className={styles.maps}
          center={mapCenter} zoom={11} zoomControl={false} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={
              L.divIcon({
                html: `
                 <div style="display: flex;gap:8px;align-items:center; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:50%;background: linear-gradient(180deg,#E50051, #9C0037);">
                   <img loading="lazy" src="${img}" alt="Icon"  style="object-fit:cover;border-radius:50%;width:48px; height:48px; ">
                 </div>
               `,
              })
            }>

            <Popup minWidth={90}>
              <span >
                {direccion}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
        <span style={{ textAlign: 'left', width: '90%' }}>{direccion}</span>

      </>

  )
}