
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useEffect, useState } from "react";
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '../Button/Button';

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
function CalculatePrice({ price }) {
  let priceCalculate = PriceFormat({ price: price?.toString() }) ? PriceFormat({ price: price?.toString() }) : 'Precio desconocido'
  return priceCalculate
}
const MapRecenter = ({ lat, lng, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    // Fly to that coordinates and set new zoom level
    map.flyTo([lat, lng], zoomLevel);
  }, [lat, lng]);
  return null;

};
export default function Map({ data, estacionCheck, setVisibleModal, setEstacionCheck, filtros, }) {
  const [mapCenter, setMapCenter] = useState([data[data.length - 1].lat, data[data.length - 1].lng]);

  const [zoomLevel, setZoomLevel] = useState(12);

  const gasolineraEncontrada = data.find(gasolinera => gasolinera.nombre === estacionCheck);

  return (
    <MapContainer
      style={{ width: '100vw', height: '100vh', zIndex: 1, maxWidth: '100%' }}
      center={mapCenter} zoom={zoomLevel} zoomControl={false} scrollWheelZoom={true}>
      {/* <ChangeView center={[data[0].lat, data[0].lng]} zoom={12} /> */}
      <MapRecenter lat={data[Math.round(data.length / 2)].lat} lng={data[Math.round(data.length / 2)].lng} zoomLevel={13} />

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />

      {data.map((gasolinera) => (
        <Marker
          key={gasolinera.nom}
          eventHandlers={{
            click: (e) => {
              setVisibleModal(true), setEstacionCheck(gasolinera.nombre)
            }
          }}
          position={[gasolinera.lat, gasolinera.lng]}
          icon={
            L.divIcon({
              className: 'dummy',
              html: `
              <div style="position: relative; display: ${zoomLevel >= 13 ? 'flex' : 'none'}; gap: 8px; align-items: center; padding: ${zoomLevel >= 13 ? '2px 4px' : '2px'}; width: fit-content; justify-content: space-between; flex-direction: row; align-items: center; border: 1px solid white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); border-radius: ${zoomLevel >= 13 ? '8px' : '50%'}; background-color: white;">
                <img loading="lazy" src="/${gasolinera.img}.png" alt="Icon" preload style="object-fit: cover; width: 24px; height: 24px; border-radius: 50%;">
                <p style="display: ${zoomLevel >= 13 ? 'flex' : 'none'}; margin: 0; color: #373737; font-size: 12px; font-weight: 600; white-space: nowrap;">
                  $${filtros?.includes('extra') ? CalculatePrice({ price: gasolinera?.priceDos }) : CalculatePrice({ price: gasolinera?.price })}
                </p>
                <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid white;"></div>
              </div>
               `,
            })
          }
        >
          {/* <Popup >
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'black' }}>{gasolinera.nombre}</p>
            <p style={{ fontSize: '14px', fontWeight: '400', margin: 0, color: '#727272' }}>{gasolinera.direccion}</p>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '24px', gap: '4px' }}>
              <p style={{ fontSize: '14px', fontWeight: '400', margin: 0, color: '#373737' }}>Precio Corriente:</p>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>${CalculatePrice({ price: gasolinera?.price })}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4px', gap: '4px' }}>
              <p style={{ fontSize: '14px', fontWeight: '400', margin: 0, color: '#373737' }}>Precio Extra:</p>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: 0, }}>${CalculatePrice({ price: gasolinera?.priceDos })}</p>
            </div>

            <Button onClick={() => { setVisibleModal(true), setEstacionCheck(gasolinera.nombre) }} style={{ marginTop: '16px' }} fullWidth={true} variant={ButtonVariant.gradient} size='sm'>
              Calcula tu Ahorro
            </Button>
          </Popup> */}
        </Marker>
      ))
      }

    </MapContainer>
  )
}