

import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon';

const BogotaMap = ({ coordenadas, img, direccion, nombre }) => {
  // GeoJSON que representa el área de cobertura de Bogotá (ejemplo)
  const center = [coordenadas?.[0] ? coordenadas?.[0] : 4.697782, coordenadas?.[1] ? coordenadas?.[1] : -74.133614];

  // Radio del círculo que representa Bogotá (en metros)
  const radius = 15000;

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.earthOutline} size='lg' /> Zona de cobertura de {nombre}</h2>
      <MapContainer style={{ height: '300px', width: '100%' }} center={center} zoom={10} zoomControl={false} scrollWheelZoom={true} className={styles.maps}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Circle center={center} radius={coordenadas?.[2] ? coordenadas?.[2] : radius} fillColor="rgba(0, 128, 255, 0.5)" color="blue" weight={2} />
      </MapContainer>
      <span style={{ textAlign: 'left', width: '90%' }}>{direccion}</span>

    </>

  );
};

export default BogotaMap;