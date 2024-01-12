import { MapContainer, Marker, Popup, TileLayer, useMapEvents, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'

import PlaceCard from './Placecard';
import { useRouter } from 'next/router';
import { categorias } from '../Navbar/NewNavbar2';

const userIcon = () => new L.Icon({
  iconUrl: 'person.svg',
  iconSize: [16, 16],
  iconAnchor: [16, 32],
  popupAnchor: [0, -16],

});

function MyComponent({ setZoomLevel }) {

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
  let { servicio } = router?.query
  // const handleMarkerDragEnd = (event) => {
  //   const { lat, lng } = event.target.getLatLng();
  //   setUserLocation([lat, lng]);
  // };
  // useEffect(() => {
  //   // Obtener la ubicación del usuario
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation([latitude, longitude]);
  //         setMapCenter([latitude, longitude]);
  //       },
  //       (error) => {
  //         console.error('Error al obtener la ubicación:', error.message);
  //       }
  //     );
  //   } else {
  //     console.error('La geolocalización no es compatible con este navegador.');
  //   }
  // }, [])


  // const talleresFilter = talleres?.talleres.filter(taller => taller?.lat)
  let emoji = categorias.find(cat => cat.url === servicio)

 
  return (
   
      <MapContainer
        className={styles.map} center={userLocation ? userLocation : mapCenter} zoom={15} zoomControl={false} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <MyComponent setZoomLevel={setZoomLevel} />
        {/* {userLocation && (
        <Marker icon={userIcon()} position={userLocation}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        >
          <Popup ><PlaceCard /></Popup>
        </Marker>
      )} */}
        {/* {coordenadas.map((coordenada) => (
            <Marker
              key={coordenada.id}
              icon={customIcon({ icon: coordenada.img})}
              position={[coordenada.lat, coordenada.lng]}
            >
              <Popup className={styles.card}><PlaceCard data={coordenada}/></Popup>
            </Marker>
        ))} */}
        {talleres.map((taller) => (
          <Marker
            key={taller.id}
            position={[taller.lat, taller.lng]}
            icon={
              L.divIcon({
                html: `
                   <div style="display: ${servicio ? 'flex' : taller.nivel >= 3 ? 'flex' : taller.nivel === 2 ? zoomLevel >= 15 ? 'flex' : 'none' : zoomLevel >= 17 ? 'flex' : 'none'};gap:8px;align-items:center; padding:4px 8px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;   box-shadow: 0 4px 8px rgba(200, 200, 200, 0.9); border-radius:8px; background-color:white">
                     <img src="${emoji ? taller?.fotoperfil ? taller?.fotoperfil : '/' + taller.emojisservicio + ".png" : '/' + taller.emojisservicio + ".png"}" alt="Icon" style="object-fit:cover;width: ${servicio ? '24px' : taller.nivel >= 3 ? '24px' : taller.nivel === 2 ? '20px' : '16px'}; height: ${servicio ? '24px' : taller.nivel >= 3 ? '24px' : taller.nivel === 2 ? '20px' : '16px'}; ">
                     <p style="margin: 0;color:#373737;font-size:12px; font-weight:600; white-space:nowrap">${servicio ? taller?.nombre : taller.servicio}</p>
                   </div>
                 `,
                //  iconSize: [32, 32],
                //  iconAnchor: [16, 32],
                //  popupAnchor: [0, -32],
              })
            }
          >
            <Popup className={styles.card}>
              <PlaceCard data={taller} />
            </Popup>
          </Marker>
        ))}
        {/* {coordenadas.map((coordenada) => (
          <Marker
            key={coordenada.id}
            position={[coordenada.lat, coordenada.lng]}
            icon={
              L.divIcon({
                html: `
                   <div style="display: ${coordenada.nivel >=3 ?'flex':coordenada.nivel===2?zoomLevel >=13?'flex':'none':zoomLevel >=14?'flex':'none'};gap:8px;align-items:center; padding:4px 8px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;   box-shadow: 0 4px 8px rgba(200, 200, 200, 0.9); border-radius:8px; background-color:white">
                     <img src="${coordenada.servicios[0].img}" alt="Icon" style="width: ${coordenada.nivel >=3 ?'24px': coordenada.nivel === 2 ?'20px':'16px'}; height: ${coordenada.nivel >=3 ?'24px': coordenada.nivel === 2 ?'20px':'16px'}; border-radius: 50%; ">
                     <p style="margin: 0;color:#373737;font-size:12px; font-weight:600; white-space:nowrap">${coordenada.servicios[0].nombre}</p>
                   </div>
                 `,
                //  iconSize: [32, 32],
                //  iconAnchor: [16, 32],
                //  popupAnchor: [0, -32],
              })
            }
          >
            <Popup className={styles.card}>
              <PlaceCard data={coordenada} />
            </Popup>
          </Marker>
        ))} */}
      </MapContainer>
  )
}

