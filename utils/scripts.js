

const sendWhatsappMessage = ({ numero, path = null, text }) => {
  let url = `https://api.whatsapp.com/send?phone=57${numero}`;
  url += `&text=${encodeURI(text ? text : `Buen dia, encontre su taller en https://quarks.com.co${path}, tengo el siguiente problema...`)}&app_absent=0`
  window.open(url);
}

export const getLatLng = ({data}) => {
  const latLngRegex = /1d(-?\d+\.\d+)!2d(-?\d+\.\d+)/;
  const matches = data?.ubicacionmaps?.match(latLngRegex);
  console.log(data, 'data');
  if (matches) {
    const lat = parseFloat(matches[1]);
    const lng = parseFloat(matches[2]);
    return [lat, lng];
  }

  return [4.673605, -74.082539]; // Coordenadas por defecto
};

export function calcularDistancia(lat1, lon1, lat2, lon2) {
  const radioTierraKm = 6371; // Radio de la Tierra en kilómetros
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = radioTierraKm * c; // Distancia en kilómetros
  return distancia.toFixed(1);
}
export const priceToCheck =({price, filtros})=>{
  if(!filtros) return price.price;
  return filtros?.includes('extra') ? price.priceDos : filtros?.includes('corriente') ? price.price : price.priceCinco;
} 
export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
export function getLocalizacion(setUserLocation) {
  const options = {
    enableHighAccuracy: true, // Activar el modo de alta precisión
    timeout: 10000,           // Tiempo máximo para esperar una respuesta (en milisegundos)
    maximumAge: 0             // Descartar ubicaciones almacenadas en caché
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        localStorage.setItem('userLocation', JSON.stringify([latitude, longitude]));
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error.message);
        // Manejar los errores de ubicación aquí
      },
      options // Pasar las opciones de configuración
    );
  } else {
    console.error('La geolocalización no es compatible con este navegador.');
    // Manejar la falta de soporte de geolocalización aquí
  }
}

export default sendWhatsappMessage