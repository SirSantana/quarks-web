import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState } from 'react';
import PriceFormat from '@/utils/priceFormat';
import { priceToCheck } from '@/utils/scripts';

function MyComponent({ setZoomLevel }) {
  const map = useMap();
  
  map.on('zoomend', () => {
    setZoomLevel(map.getZoom());
  });
  
  return null;
}

function CalculatePrice({ price }) {
  if (price === null) return '';
  let priceCalculate = PriceFormat({ price: price?.toString() }) ? PriceFormat({ price: price?.toString() }) : '';
  return priceCalculate;
}

const MapRecenter = ({ lat, lng, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoomLevel);
  }, [lat, lng]);

  return null;
};

// Componente que gestiona los clusters
const MarkerCluster = ({ data, filtros, averagePrice, setVisibleModal, setEstacionCheck }) => {
  const map = useMap();
  const margin = 0.01 * averagePrice;

  useEffect(() => {
    // Crear el grupo de clusters con íconos personalizados
    const markers = L.markerClusterGroup();

    // Añadir marcadores al grupo de clusters
    data.forEach((gasolinera) => {
      let price = priceToCheck({ price: gasolinera, filtros });
      const priceDifference = Math.abs(price - averagePrice);
      const isSimilar = priceDifference <= margin;
      const backgroundColor = isSimilar ? '#FFA500' : price > averagePrice ? '#FF3A33' : '#00A83E';
      const svgIcon = isSimilar
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M128 256h256"/></svg>`
        : price > averagePrice
          ? `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 268l144 144 144-144M256 392V100"/></svg>`;

      const marker = L.marker([gasolinera.lat, gasolinera.lng], {
        icon: L.divIcon({
          className: 'dummy',
          html: `
            <div style="position: relative; display: ${!price ? 'none' : 'flex'}; gap: 8px; align-items: center; padding: 2px; width: fit-content; justify-content: space-between; flex-direction: row; align-items: center; border: 1px solid #CFD5E1; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 4px; background-color: white;">
              <p style="margin: 0; color: #373737; font-size: 12px; font-weight: 600; white-space: nowrap;">
                $${CalculatePrice({ price })}
              </p>
              ${gasolinera.price === null ? '' : `
                <div style="position: absolute; top: -8px; right: -40%; transform: translateX(-50%); width: 22px; height: 22px;padding:2px; border-radius:50%; border: 1px solid white;color:white;  background-color: ${backgroundColor}">
                  ${svgIcon}
                </div>
              `}
            </div>
          `,
        }),
      });

      marker.on('click', () => {
        setVisibleModal(true);
        setEstacionCheck(gasolinera.nombre);
      });

      markers.addLayer(marker); // Añadir el marcador al grupo de clusters
    });

    map.addLayer(markers); // Añadir el grupo de clusters al mapa

    return () => {
      map.removeLayer(markers); // Limpiar los clusters cuando el componente se desmonte
    };
  }, [data, filtros, averagePrice, map, setVisibleModal, setEstacionCheck]);

  return null;
};

export default function Map({ data, estacionCheck, setVisibleModal, setEstacionCheck, filtros, averagePrice }) {
  const [mapCenter, setMapCenter] = useState([data[data.length - 1].lat, data[data.length - 1].lng]);
  const [zoomLevel, setZoomLevel] = useState(12);
  
  return (
    <MapContainer
      id="map"
      style={{ position: 'relative', width: '100vw', height: '80vh', zIndex: 1, maxWidth: '100%', borderRadius: '16px' }}
      center={mapCenter} zoom={zoomLevel} zoomControl={false} scrollWheelZoom={true}>
      <MapRecenter lat={data[Math.round(data.length / 2)].lat} lng={data[Math.round(data.length / 2)].lng} zoomLevel={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />
      {/* Añadir el componente MarkerCluster que renderiza los clusters */}
      <MarkerCluster
        data={data}
        filtros={filtros}
        averagePrice={averagePrice}
        setVisibleModal={setVisibleModal}
        setEstacionCheck={setEstacionCheck}
      />
    </MapContainer>
  );
}
