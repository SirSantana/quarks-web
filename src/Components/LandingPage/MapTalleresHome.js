import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState } from 'react';
import styles from '@/styles/Map.module.css';
import Link from 'next/link';

function MyComponent({ setZoomLevel }) {
  const map = useMap();

  map.on('zoomend', () => {
    setZoomLevel(map.getZoom());
  });

  return null;
}

const MapRecenter = ({ lat, lng, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoomLevel);
  }, [lat, lng]);

  return null;
};

// Componente de agrupación de marcadores
function MarkerClusterGroup({ data, setHoveredInfo, setIsHovered }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 14,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
    });

    data.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'dummy',
          html: `
            <div style="position: relative; display:flex; gap: 8px; align-items: center; padding: 2px; width: fit-content; justify-content: space-between; flex-direction: row; align-items: center; border: 1px solid #FCFDFF; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 50%; background-color: #E1EAFF;">
              ${location.fotoperfil === null ? '' : `
                <img src="${location.fotoperfil}" style="width:40px; height:40px; border-radius:50%; object-fit:cover" alt="foto"/>
              `}
            </div>
          `,
        }),
      });

      marker.on('mouseover', (e) => {
        const screenPos = map.latLngToContainerPoint(e.latlng);

        setHoveredInfo({
          nombre: location.nombre,
          direccion: location.direccion,
          fotoperfil: location.fotoperfil,
          userName: location.userName,
          x: screenPos.x,
          y: screenPos.y,
        });
      });
      marker.on('click', (e) => {
        const screenPos = map.latLngToContainerPoint(e.latlng);

        setHoveredInfo({
          nombre: location.nombre,
          direccion: location.direccion,
          fotoperfil: location.fotoperfil,
          userName: location.userName,
          x: screenPos.x,
          y: screenPos.y,
        });
      });

      marker.on('mouseout', () => {
        setTimeout(() => {
          setHoveredInfo(null);
        }, 3000);
      });

      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map, data, setHoveredInfo]);

  return null;
}

export default function MapTalleresHome({ data }) {
  const [mapCenter, setMapCenter] = useState([data[data.length - 1].lat, data[data.length - 1].lng]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <MapContainer
        id="map"
        style={{ width: '100%', height: '100%', borderRadius: '16px' }}
        center={mapCenter}
        zoom={zoomLevel}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <MapRecenter lat={data[Math.round(data.length / 2)].lat} lng={data[Math.round(data.length / 2)].lng} zoomLevel={13} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <MyComponent setZoomLevel={setZoomLevel} />
        <MarkerClusterGroup data={data} setHoveredInfo={setHoveredInfo} />
      </MapContainer>

      {hoveredInfo && (
        <Link
          href={`/${hoveredInfo.userName}`}
          className={styles.hoverCard}
          style={{
            position: 'absolute',
            top: `${hoveredInfo.y}px`,
            left: `${hoveredInfo.x}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 1000,
            textDecoration: 'none',
          }}
        >
          <img src={hoveredInfo.fotoperfil} alt="Taller" className={styles.hoverCardImage} />
          <div className={styles.hoverCardContent}>
            <h4>{hoveredInfo.nombre}</h4>
            <p>{hoveredInfo.direccion}</p>
          </div>
        </Link>
      )}
    </div>
  );
}
