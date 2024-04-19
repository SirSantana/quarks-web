

import {useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import styles from '@/styles/Home.module.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet


export default function MapDireccion({ setDataImportante, dataImportante }) {
  const [mapCenter, setMapCenter] = useState([4.657782, -74.073614]);
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState({ lat: 4.6577, lng: -74.0736 })
  const markerRef = useRef(null)
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const lat = marker.getLatLng().lat;
        const lng = marker.getLatLng().lng;
        setPosition(marker.getLatLng());
        setDataImportante(prevState => ({
          ...prevState,
          coordenadas: [lat, lng]
        }));
      }
    },
  };
  return (
    <MapContainer
      className={styles.map2}
      center={userLocation ? userLocation : mapCenter} zoom={11} zoomControl={false} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={
          L.divIcon({
            html: `
                 <div style="display: flex;gap:8px;align-items:center; padding:8px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:50%;background: linear-gradient(180deg,#E50051, #9C0037);">
                   <img loading="lazy" src="/mecanico.png" alt="Icon" preload style="object-fit:cover;width:24px; height:24px; ">
                 </div>
               `,
          })
        }>

        <Popup minWidth={90}>
          <span >
            Arrastra el Pin hasta tu ubicacion
          </span>
        </Popup>
      </Marker>
    </MapContainer>

  )
}