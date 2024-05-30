import { MapContainer, Marker, Popup, TileLayer, useMapEvents, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useState } from 'react';
import styles from '@/styles/Home.module.css'

import PlaceCard from './Placecard';
import { useRouter } from 'next/router';
import { categorias } from '../Navbar/NewNavbar2';

import PlacecardAnuncio from './PlacecardAnuncio';
import PlacecardAnuncioPastillas from './PlacecardAnuncioPastillas';

const userIcon = () => new L.Icon({
  iconUrl: 'person.svg',
  iconSize: [16, 16],
  iconAnchor: [16, 32],
  popupAnchor: [0, -16],

});

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

export default function Map({ talleres }) {
  const [mapCenter, setMapCenter] = useState([4.657782, -74.073614]);
  const [userLocation, setUserLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false);
  const [zoomMap, setZoomMap] = useState(14)
  // const [createClickNegocioPrevMap] = useMutation(CREATE_CLICK_NEGOCIO_PREV_MAP)

  let { servicio } = router?.query

  let emoji = categorias.find(cat => cat.url === servicio)
  const handleMarkerClick = ({ id }) => {
    // createClickNegocioPrevMap({ variables: { id } });
  };
  return (

    <MapContainer
      className={styles.map} center={userLocation ? userLocation : mapCenter} zoom={zoomMap} zoomControl={false} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />
      <Marker
        key={'Anuncie aqui'}
        position={[4.661882, -74.083614]}
        icon={
          L.divIcon({
            html: `
                   <div style="display: flex;gap:8px;align-items:center; padding:8px 16px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:8px;background: linear-gradient(180deg,#E50051, #9C0037);">
                     <img loading="lazy" src="/mecanico.png" alt="Icon" preload style="object-fit:cover;width:24px; height:24px; ">
                     <p style="margin: 0;color:white;font-size:12px; font-weight:600; white-space:nowrap">Anuncie su taller aqui</p>
                   </div>
                 `,
          })
        }
      >
        <Popup className={styles.card}>
          <PlacecardAnuncio />
        </Popup>
      </Marker>
      <Marker
        key={'Cupon pastillas de freno'}
        position={[4.661882, -74.063614]}
        icon={
          L.divIcon({
            html: `
                   <div style="display: flex;gap:8px;align-items:center; padding:8px 16px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:8px; background-color:rgba(249, 136, 11, 1);">
                     <p style="margin: 0;color:white;font-size:12px; font-weight:600; white-space:nowrap">Bono de 15% en Pastillas de freno</p>
                   </div>
                 `,
          })
        }
      >
        <Popup className={styles.card}>
          <PlacecardAnuncioPastillas />
        </Popup>
      </Marker>
      {talleres.map((taller) => {
        console.log(taller?.emojisservicio);
        let img = categorias.find(cat=> cat.img === taller?.emojisservicio)
        return(
        <Marker
          key={taller.id}
          position={[taller.lat, taller.lng]}
          icon={
            L.divIcon({
              html: `
                   <div style="display: ${servicio || router.pathname === '/servicios-automotriz/[id]' ? 'flex' : taller.nivel >= 3 ? 'flex' : taller.nivel === 2 ? zoomLevel >= 15 ? 'flex' : 'none' : zoomLevel >= 17 ? 'flex' : 'none'};gap:8px;align-items:center; padding:2px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); border-radius:50%; background-color:white">
                    <div style="display:flex;border-radius:50%; background-color:${img?.back?img.back:'#f1f1f1'}; padding:4px"> 
                    <img loading="lazy" src="${taller.emojisservicio ?'/' + taller.emojisservicio + ".png": taller?.fotoperfil  }" alt="Icon" preload style="object-fit:cover;width: ${servicio ? '28px' : '28px'}; height: ${servicio ? '28px' : '28px'}; border-radius:50% ">
                    </div>
                   </div>
                 `,
            })
          }
        >
          <Popup className={styles.card}>
            <PlaceCard data={taller} />
          </Popup>
        </Marker>
)})}
    </MapContainer>
  )
}

