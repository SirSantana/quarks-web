
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useEffect, useState } from "react";
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '../Button/Button';
import { getLatLng } from '@/utils/scripts';

function MyComponent({ setZoomLevel, }) {
  const mapEvents = useMapEvents({
    // move:()=>{
    //   console.log(mapEvents);
    // },
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });
  return null
}
const MapRecenter = ({ lat, lng, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    // Fly to that coordinates and set new zoom level
    map.flyTo([lat, lng], zoomLevel);
  }, [lat, lng]);
  return null;

};

export default function MapV3({ data, setVisibleModal, setNegocioCheck, }) {
  const [mapCenter, setMapCenter] = useState(()=>getLatLng({data:data?.[0]}));
  const [zoomLevel, setZoomLevel] = useState(12);
 
  // console.log(`Latitud: ${lat}, Longitud: ${lng}`);
  // console.log(matches[1]);
  return (
    <MapContainer
      style={{ width: '100vw', height: '100vh', zIndex: 1, maxWidth: '100%' }}
      center={mapCenter} zoom={zoomLevel} zoomControl={false} scrollWheelZoom={true}>
      {/* <ChangeView center={[data[0].lat, data[0].lng]} zoom={12} /> */}
      <MapRecenter lat={mapCenter[0]} lng={mapCenter[1]} zoomLevel={13} />

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />

      {data.map((cda) => {
        const position = getLatLng({data:cda});
        return(
        <Marker
          key={cda.nombre}
          eventHandlers={{
            click: (e) => {
              setVisibleModal(true), setNegocioCheck(cda)
            }
          }}
          position={position}
          icon={
            L.divIcon({
              className: 'dummy',
              html: `
              <div style="position: relative; display: ${zoomLevel >= 13 ? 'flex' : 'none'}; gap: 8px; align-items: center; padding: 4px; width: fit-content; justify-content: space-between; flex-direction: row; align-items: center; border: 1px solid white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); border-radius:50%; background-color: white;">
                <img loading="lazy" src=${cda.fotoperfil} alt="Icon" preload style="object-fit: cover; width: 32px; height: 32px; border-radius: 50%;">
                <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid white;"></div>
              </div>
               `,
            })
          }
        >
        </Marker>
      )})
      }

    </MapContainer>
  )
}