

import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/ServiciosAutomotriz.module.css'

export default function MapaCobertura({ coordenadas, img, direccion, nombre }) {
  const center = [coordenadas?.[0] ? coordenadas?.[0] : 4.697782, coordenadas?.[1] ? coordenadas?.[1] : -74.133614];
  const radius = 15000;

  return (
      <MapContainer  center={center} zoom={10} zoomControl={false} scrollWheelZoom={true} className={styles.maps}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Circle center={center} radius={coordenadas?.[2] ? coordenadas?.[2] : radius} fillColor="rgba(0, 128, 255, 0.5)" color="blue" weight={2} />
      </MapContainer>
  );
};
