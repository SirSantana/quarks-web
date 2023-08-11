
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar los estilos de Leaflet
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: `./Clutch.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
export default function TalleresMap() {
  const talleres = [
    { id: 1, nombre: 'Taller A', latitud: 4.710989, longitud: -74.072090 },
    { id: 2, nombre: 'Taller B', latitud: 4.684579, longitud: -74.044571 },
    // Agrega más talleres aquí
  ];
  return (
    <MapContainer
      center={[4.710989, -74.072090]}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {talleres.map(taller => (
        <Marker
          key={taller.id}icon={customIcon}
          position={[taller.latitud, taller.longitud]}
        >
          <Popup>{taller.nombre}</Popup>
          <img src={`./Clutch.png`} style={{ height: '24px', width: '24px' }} />

        </Marker>
      ))}
    </MapContainer>
  )
}