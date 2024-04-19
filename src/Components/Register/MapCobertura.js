
import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

export default function MapCobertura({ setDataImportante, dataImportante }) {
  const initialCenter = [dataImportante.coordenadas[0]>0?dataImportante.coordenadas[0]:4.697782, dataImportante.coordenadas[1]>0?dataImportante.coordenadas[1]:-74.133614];
  const [position, setPosition] = useState({ lat: dataImportante.coordenadas[0]>0?dataImportante.coordenadas[0]:4.6577, lng: dataImportante.coordenadas[1]>0?dataImportante.coordenadas[1]:-74.0736, })
  const initialRadius = 15000;
  const markerRef = useRef(null)
  const [center, setCenter] = useState(initialCenter);
  const [radius, setRadius] = useState(initialRadius);

  const handleMapClick = (e) => {
    setCenter(e.latlng);
  };
  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
    setDataImportante(prevState => ({
      ...prevState,
      coordenadas: [
        ...prevState.coordenadas.slice(0, 2), // Copiar las primeras dos coordenadas sin modificar
        Number(radius), // Agregar el nuevo valor en la posición 2
      ]
    }));
  };
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current
      const lat = marker.getLatLng().lat;
      const lng = marker.getLatLng().lng;
      if (marker != null) {
        setPosition(marker.getLatLng())
        setDataImportante({ ...dataImportante, coordenadas: [lat, lng, radius] })
      }
    },
  }
  return (
    <>
      <MapContainer style={{ height: '300px', width: '100%' }} center={initialCenter} zoom={10} zoomControl={false} scrollWheelZoom={true} onClick={handleMapClick}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        {/* CircleMarker para las coordenadas seleccionadas */}
        <Marker draggable={true} center={center} eventHandlers={eventHandlers}
          position={position} ref={markerRef} icon={
            L.divIcon({
              html: `
                 <div style="display: flex;gap:8px;align-items:center; padding:8px; width:fit-content;justify-content:space-between; flex-direction: row; align-items: center;border: 1px solid white;    box-shadow: 0 4px 4px rgba(200, 200, 200, 0.1); border-radius:50%;background: linear-gradient(180deg,#E50051, #9C0037);">
                   <img loading="lazy" src="/mecanico.png" alt="Icon" preload style="object-fit:cover;width:24px; height:24px; ">
                 </div>
               `,
              //  iconSize: [32, 32],
              //  iconAnchor: [16, 32],
              //  popupAnchor: [0, -32],
            })
          }>
          {/* Popup para mostrar las coordenadas */}
          <Popup>{center}</Popup>
        </Marker>
        {/* Circle para el radio */}
        <Circle center={position} radius={radius} fillColor="rgba(0, 128, 255, 0.5)" color="blue" weight={2} />
      </MapContainer>
      {/* Input para cambiar el radio */}
      <input type="range" min="1000" max="50000" step="1000" value={radius} onChange={handleRadiusChange} />
      <p>Rango de Cobertura: {radius / 1000} kilometros</p>
    </>
  )
}