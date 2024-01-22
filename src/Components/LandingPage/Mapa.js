import { MapContainer, Marker, Popup, TileLayer, useMapEvents, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'; // Asegúrate de importar Leaflet
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'

import PlaceCard from './Placecard';
import { useRouter } from 'next/router';
import { categorias } from '../Navbar/NewNavbar2';
import CategoriasSlider from './CategoriasSlider';
import SliderCatVDos from './SliderCatV2';
import FormSearchTaller from './FormSearchTaller';

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

export default function Map({ talleres, mode }) {
  const [mapCenter, setMapCenter] = useState([4.657782, -74.073614]);
  const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer
  const router = useRouter()
  let { servicio } = router?.query
  useEffect(() => {
    if (servicio) {
      setMapCenter([4.657782, -74.073614])
      setZoomLevel(17)
    }
    console.log(servicio);
  }, [router?.query])

  return (

    <MapContainer
      className={styles.map} center={mapCenter} zoom={15} zoomControl={false} scrollWheelZoom={true}>
      <div className={styles.sliderCategorias} >
        <FormSearchTaller width={'90%'} height={'48px'}/>
        <SliderCatVDos categorias={categorias} mode={mode} />
      </div>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <MyComponent setZoomLevel={setZoomLevel} />
      {talleres.map((taller) => (
        <Marker
          key={taller.id}
          position={[taller.lat, taller.lng]}
          icon={
            L.divIcon({
              html: `
                   <div style="display: ${servicio ? 'flex' : taller.nivel >= 3 ? 'flex' : taller.nivel === 2 ? zoomLevel >= 15 ? 'flex' : 'none' : zoomLevel >= 17 ? 'flex' : 'none'};gap:8px;align-items:center; padding:4px 8px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:8px; background-color:white">
                     <img src="${taller?.fotoperfil ? taller?.fotoperfil : '/' + taller.emojisservicio + ".png"}" alt="Icon" style="object-fit:cover;width: ${servicio ? '24px' : taller.nivel >= 3 ? '24px' : taller.nivel === 2 ? '20px' : '16px'}; height: ${servicio ? '24px' : taller.nivel >= 3 ? '24px' : taller.nivel === 2 ? '20px' : '16px'}; ">
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

    </MapContainer>
  )
}

