import styles from '@/styles/ServiciosAutomotriz.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import talleres from '@/pages/servicios-automotriz/talleres.json'


export default function OnlyMap({ username, nombre, direccion, coordenadas, img, ubicacion, maxWidth='100%', }) {
  let ubicacionMaps = talleres.talleres.find(el => el.userName == username)
  const position = { lat: coordenadas?.[0], lng: coordenadas?.[1] }
  const mapCenter = [coordenadas?.[0], coordenadas?.[1]];
  return (
    <MapContainer
      className={styles.maps}
      style={{ borderRadius:'16px', maxWidth:maxWidth}}
      center={mapCenter} zoom={15} zoomControl={false} scrollWheelZoom={true}>
      {/* <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions"></a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
  )
}
