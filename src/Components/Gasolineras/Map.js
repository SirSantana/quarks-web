
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useEffect, useState } from "react";
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '../Button/Button';
import Icon, { IconCatalog } from '../Icon/Icon';
import { priceToCheck } from '@/utils/scripts';

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
  if(price === null) return ''
  let priceCalculate = PriceFormat({ price: price?.toString() }) ? PriceFormat({ price: price?.toString() }) : ''
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

export default function Map({ data, estacionCheck, setVisibleModal, setEstacionCheck, filtros, averagePrice }) {
  const [mapCenter, setMapCenter] = useState([data[data.length - 1].lat, data[data.length - 1].lng]);

  const [zoomLevel, setZoomLevel] = useState(12);

  const gasolineraEncontrada = data.find(gasolinera => gasolinera.nombre === estacionCheck);
  const margin = 0.01 * averagePrice;
  
  return (
    <MapContainer
      style={{position:'relative', width: '100vw', height: '80vh', zIndex: 1, maxWidth: '100%', borderRadius: '16px' }}
      center={mapCenter} zoom={zoomLevel} zoomControl={false} scrollWheelZoom={true}>
      {/* <ChangeView center={[data[0].lat, data[0].lng]} zoom={12} /> */}
      <MapRecenter lat={data[Math.round(data.length / 2)].lat} lng={data[Math.round(data.length / 2)].lng} zoomLevel={13} />
     
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />
      <Icon name={IconCatalog.arrowForwardOutline} size={16} style={{ color: 'red' }} />

      {data.map((gasolinera) => {
        let price = priceToCheck({price: gasolinera, filtros});
        const priceDifference = Math.abs(price - averagePrice);
        const isSimilar = priceDifference <= margin;
        const backgroundColor = isSimilar ? '#FFA500' : price > averagePrice ? '#FF3A33' : '#00A83E';
        const svgIcon = isSimilar
          ? `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M128 256h256"/></svg>`
          : price > averagePrice
            ? `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 268l144 144 144-144M256 392V100"/></svg>`;
        return (
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
              <div style="position: relative; display: ${!price?'none' :zoomLevel >= 12 ? 'flex' : 'none'}; gap: 8px; align-items: center; padding: ${zoomLevel >= 13 ? '2px 8px' : '2px'}; width: fit-content; justify-content: space-between; flex-direction: row; align-items: center; border: 1px solid #CFD5E1; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: ${zoomLevel >= 13 ? '4px' : '50%'}; background-color: white;">
                <p style="display: ${zoomLevel >= 13 ? 'flex' : 'none'}; margin: 0; color: #373737; font-size: 12px; font-weight: 600; white-space: nowrap;">
                  $${ CalculatePrice({ price: price })}
                </p>
                ${gasolinera.price === null  ? '' : `
                  <div style="position: absolute; top: -8px; right: -40%; transform: translateX(-50%); width: 22px; height: 22px;padding:2px; border-radius:50%; border: 1px solid white;color:white;  background-color: ${backgroundColor}">
                ${svgIcon}
              </div>
                  `}
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
        )
      })
      }

    </MapContainer>
  )
}