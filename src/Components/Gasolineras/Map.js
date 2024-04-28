
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useState } from "react";

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
export default function Map({data}) {
  const [mapCenter, setMapCenter] = useState([4.657782, -74.073614]);
  const [zoomLevel, setZoomLevel] = useState(5);
  return (
    <MapContainer
      style={{ width: '100vw', height: '100vh', zIndex:0 }}
      center={mapCenter} zoom={11} zoomControl={false} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel}  />

      {data.map((gasolinera) => (
        <Marker
          key={gasolinera.nom}
          position={[gasolinera.lat, gasolinera.lon]}
          icon={
            L.divIcon({
              html: `
                   <div style="display: flex;gap:8px;align-items:center; padding:2px 4px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); border-radius:8px; background-color:white">
                     <img loading="lazy" src="/logoterpel.png" alt="Icon" preload style="object-fit:cover;width:16px; height:16px; border-radius:50% ">
                      <p style="display:${zoomLevel >= 14 ? 'flex' : 'none'}; margin: 0;color:#373737;font-size:12px; font-weight:600; white-space:nowrap">$${gasolinera.price.find(ele=> ele.id ==1)?.retailPrice}</p>
                     </div>
                 `,
            })
          }
        >
          <Popup >
            <p style={{fontSize:'12px', fontWeight:'600', margin:0}}>{gasolinera.nom}</p>
            <p style={{fontSize:'14px', fontWeight:'400', margin:0}}>{gasolinera.dir}</p>

          </Popup>
        </Marker>
      ))}

    </MapContainer>
  )
}