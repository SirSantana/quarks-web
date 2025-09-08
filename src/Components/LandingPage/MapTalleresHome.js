{/* <svg width="16" height="16" viewBox="0 0 113 93" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0964 1.45018C18.4019 1.70238 17.4235 2.23832 16.9184 2.61662L16.0031 3.34171L17.8654 5.54849C18.8754 6.74645 22.0634 10.4665 24.9357 13.8397C27.8081 17.1814 30.6489 20.5231 31.2486 21.2481C31.8483 21.9417 35.2888 25.977 38.9187 30.2014C42.517 34.4258 45.4525 38.0827 45.4525 38.3034C45.4525 38.6817 42.5486 38.7763 26.9243 38.8393L8.36451 38.9339L6.37597 40.0058C4.29273 41.1407 3.12485 42.3702 1.86228 44.7661L1.10474 46.1848V61.6322V77.0797H21.5899H42.0751L42.6433 74.4C43.3377 70.9953 43.9059 69.419 45.2947 67.1807C49.3033 60.5604 57.51 56.9349 65.0223 58.4482C73.0712 60.0875 78.879 65.8566 80.3941 73.7695C80.6782 75.2512 80.9307 76.6383 80.9938 76.8275C81.0885 77.1427 84.4343 77.2373 96.3972 77.2373C111.232 77.2373 111.737 77.2058 112.053 76.6383C112.274 76.197 112.337 64.1543 112.306 39.0285L112.211 2.04916L91.7257 1.95459C76.5749 1.92306 71.1458 1.98611 70.7986 2.23832C70.5776 2.459 66.9793 7.59764 62.8444 13.682C52.2388 29.2556 52.5545 28.8458 52.1441 28.8458C51.7969 28.8458 48.893 25.5356 38.8871 13.7451C30.2701 3.59391 28.6919 2.04916 26.1667 1.29255C24.5885 0.819673 20.6114 0.914249 19.0964 1.45018ZM103.468 20.0817L103.531 29.6339H83.1718C71.5561 29.6339 62.8128 29.5078 62.8128 29.3502C62.8128 29.1926 63.8229 27.6163 65.0539 25.8193C66.2849 24.0224 68.9679 20.0502 71.0195 16.9922C73.0712 13.9658 74.9966 11.2231 75.2807 10.9393C75.7542 10.4349 77.0168 10.4034 89.5793 10.4665L103.373 10.561L103.468 20.0817Z" fill="currentColor" />
            <path d="M21.6847 20.7122C21.5584 20.8068 21.4637 21.5949 21.4637 22.4146C21.4637 24.0854 21.4322 24.117 18.9701 25.1258C17.1079 25.8824 16.7606 25.8193 15.4981 24.4638C15.0562 24.0224 14.5512 23.6441 14.3618 23.6441C13.9199 23.6441 12.6257 24.9682 12.6257 25.4095C12.6257 25.5987 13.1623 26.2607 13.8567 26.9227L15.0877 28.1207L14.3302 30.2014L13.6042 32.3136L11.7104 32.4082C10.3531 32.4712 9.78495 32.6288 9.65869 33.0071C9.24836 34.0475 9.65869 34.1421 14.0777 34.079L17.2972 34.0475L17.5182 32.6288C17.7391 31.0526 19.0333 29.2871 20.5484 28.499C21.9372 27.8054 24.3361 27.9315 25.5986 28.7827C26.9875 29.697 28.0606 31.3363 28.2816 32.8495L28.5025 34.0475L30.9014 34.079C32.2271 34.1105 33.616 34.1736 33.9947 34.2051C35.0995 34.3312 35.4151 33.9529 34.8785 33.1963C34.5629 32.7549 33.9947 32.4712 33.2687 32.4082C32.164 32.3136 32.1009 32.2505 31.5327 30.4221C31.2171 29.3817 30.933 28.436 30.933 28.2783C30.933 28.1522 31.5012 27.4271 32.1956 26.6705L33.4581 25.3149L32.6375 24.4638C32.164 24.0224 31.6274 23.6441 31.4696 23.6441C31.2802 23.6441 30.5858 24.1485 29.9545 24.779L28.7866 25.9454L26.9243 25.1888C24.3676 24.18 24.3045 24.117 24.3045 22.1939V20.4915H23.1051C22.4422 20.4915 21.7794 20.5861 21.6847 20.7122Z" fill="currentColor" />
            <path d="M59.3408 63.3661C53.028 64.501 48.4511 69.1037 47.3464 75.4088C46.1154 82.3759 50.9447 89.7528 57.9204 91.5498C66.2534 93.725 74.4601 88.2711 75.8173 79.6647C77.0168 71.941 71.5877 64.6586 63.7598 63.3976C61.4872 63.0193 61.3609 63.0193 59.3408 63.3661Z" fill="currentColor" />
          </svg> */}

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/Map.module.css';
import Link from 'next/link';
import { MessageCircle, User, MapPin, Star, Clock, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

function MyComponent({ setZoomLevel }) {
  const map = useMap();

  map.on('zoomend', () => {
    setZoomLevel(map.getZoom());
  });

  return null;
}

const MapRecenter = ({ lat='4.909526', lng='-73.989772', zoomLevel=12 }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoomLevel);
  }, [lat, lng]);

  return null;
};

// Componente de agrupación de marcadores
function MarkerClusterGroup({ data, setHoveredInfo, focusedWorkshop, setFocusedWorkshop }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 14,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
    });

    data.forEach((location, index) => {
      const isSelected = focusedWorkshop === index;
      
      const marker = L.marker([location.lat?location.lat:4.909526, location.lng?location.lng:-73.989772], {
        icon: L.divIcon({
          className: 'dummy',
          html: `
            <div style="
              position: relative;
              width: ${isSelected ? '40px' : '32px'};
              height: ${isSelected ? '40px' : '32px'};
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${isSelected ? '#3b82f6' : '#007BFF'};
              color: #ffffff;
              border-radius: 50%;
              border: 3px solid #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
              transition: all 0.3s ease;
              transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
              z-index: ${isSelected ? '1000' : '100'};
            ">
              <div style="
                position: absolute;
                bottom: ${isSelected ? '-12px' : '-10px'};
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: ${isSelected ? '12px' : '10px'} solid transparent;
                border-right: ${isSelected ? '12px' : '10px'} solid transparent;
                border-top: ${isSelected ? '12px' : '10px'} solid #ffffff;
                filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2));
              "></div>
            </div>
          `,
        }),
      });

      marker.on('mouseover', (e) => {
        const screenPos = map.latLngToContainerPoint(e.latlng);
        setHoveredInfo({
          ...location,
          x: screenPos.x,
          y: screenPos.y,
        });
      });

      marker.on('click', (e) => {
        const screenPos = map.latLngToContainerPoint(e.latlng);
        setHoveredInfo({
          ...location,
          x: screenPos.x,
          y: screenPos.y,
        });
        setFocusedWorkshop(index);
      });

      marker.on('mouseout', () => {
        setTimeout(() => {
          setHoveredInfo(null);
        }, 3000);
      });

      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map, data, setHoveredInfo, focusedWorkshop, setFocusedWorkshop]);

  return null;
}

// Componente de Card mejorada
const MapCard = ({ hoveredInfo, onContactClick }) => {
  const handleContactClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContactClick) {
      onContactClick(hoveredInfo);
    }
  };

  return (
    <div
      className={styles.mapCard}
      style={{
        top: `${hoveredInfo.y}px`,
        left: `${hoveredInfo.x}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <img 
        src={hoveredInfo.fotoperfil} 
        alt={hoveredInfo.nombre}
        className={styles.mapCardImage}
      />
      
      <div className={styles.mapCardContent}>
        <div>
          <h4 className={styles.mapCardTitle}>{hoveredInfo.nombre}</h4>
          <p className={styles.mapCardAddress}>
            <MapPin size={12} />
            {hoveredInfo.direccion}
          </p>
        </div>
        
        <div className={styles.mapCardButtons}>
          <button
            className={`${styles.mapCardButton} ${styles.contactButton}`}
            onClick={handleContactClick}
          >
            <MessageCircle size={14} />
            Contactar
          </button>
          
          <Link
            href={`/${hoveredInfo.userName}`}
            className={`${styles.mapCardButton} ${styles.profileButton}`}
          >
            <User size={14} />
            Ver Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

// Componente del Slider Moderno de Talleres
const WorkshopSlider = ({ data, onWorkshopFocus, focusedWorkshop }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getCardWidth = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      return containerWidth * 0.8 + 16; // 90% del contenedor + gap
    }
    return 0;
  };

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTo = (direction) => {
    if (!sliderRef.current) return;
    
    const cardWidth = getCardWidth();
    const scrollAmount = cardWidth * (direction === 'left' ? -1 : 1);
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(updateScrollButtons, 300);
  };

  const scrollToCard = (index) => {
    if (!sliderRef.current) return;
    
    const cardWidth = getCardWidth();
    const scrollPosition = index * cardWidth;
    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setTimeout(updateScrollButtons, 300);
  };

  const handleWorkshopClick = (workshop, index) => {
    setCurrentIndex(index);
    onWorkshopFocus(workshop, index);
  };

  const handleContactClick = (workshop) => {
    const whatsappNumber = workshop.telefono || "573143551942";
    const message = `Hola ${workshop.nombre}, vi tu taller en el mapa y me gustaría contactarte.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  useEffect(() => {
    if (focusedWorkshop !== null) {
      setCurrentIndex(focusedWorkshop);
      scrollToCard(focusedWorkshop);
    }
  }, [focusedWorkshop]);

  useEffect(() => {
    if (sliderRef.current) {
      const handleScroll = () => {
        updateScrollButtons();
        // Actualizar el índice actual basado en la posición del scroll
        const cardWidth = getCardWidth();
        if (cardWidth > 0) {
          const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
          setCurrentIndex(newIndex);
        }
      };

      sliderRef.current.addEventListener('scroll', handleScroll);
      updateScrollButtons();
      
      return () => {
        sliderRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [data]);

  const totalPages = data?.length || 0;
  const currentPage = currentIndex + 1;

  return (
    <div className={styles.workshopSlider}>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderHeader}>
          <h3 className={styles.sliderTitle}>
            {/* Talleres cercanos ({data?.length || 0}) */}
          </h3>
          
          <div className={styles.sliderControls}>
            <span className={styles.sliderCounter}>
              {currentPage} de {totalPages}
            </span>
            
            <button
              className={styles.sliderButton}
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              className={styles.sliderButton}
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className={styles.scrollContainer}
        >
          {data?.map((workshop, index) => (
            <div
              key={workshop.id || index}
              className={`${styles.workshopCard} ${
                focusedWorkshop === index ? styles.workshopCardFocused : ''
              }`}
              onClick={() => handleWorkshopClick(workshop, index)}
            >
              <div className={styles.workshopHeader}>
                <img 
                  src={workshop.fotoperfil || '/default-workshop.jpg'} 
                  alt={workshop.nombre}
                  className={styles.workshopImage}
                />
                <div className={styles.workshopInfo}>
                  <h3 className={styles.workshopName}>{workshop.nombre}</h3>
                  <div className={`${styles.workshopStatus} ${
                    workshop.abierto ? styles.workshopStatusOpen : ''
                  }`}>
                    {workshop.abierto ? 'Abierto' : 'Cerrado'} 
                  </div>
                  <div className={styles.workshopRating}>
                    <Clock size={12} />
                    {workshop.rating || '4.3'} ({workshop.resenas || '119'} reseñas)
                  </div>
                </div>
              </div>
              
              <div className={styles.workshopSpecialty}>
                <Star size={12} fill="#fbbf24" color="#fbbf24" />
                Especializado, bien valorado según usuarios
              </div>
              
              <div className={styles.workshopAddress}>
                <MapPin size={12} />
                {workshop.direccion}
              </div>
              
              <div className={styles.workshopActions}>
                <button 
                  className={`${styles.actionButton} ${styles.callButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactClick(workshop);
                  }}
                >
                  <Phone size={12} />
                  Llamar
                </button>
                <button 
                     className={`${styles.actionButton} ${styles.linkButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactClick(workshop);
                  }}
                >
                  Solicitar cotización
                </button>
               
                {/* <Link
                  href={`/${workshop.userName}`}
                  className={`${styles.actionButton} ${styles.linkButton}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Sitio web
                </Link> */}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default function MapTalleresHome({ data }) {
  const [mapCenter, setMapCenter] = useState([data?.[data?.length - 1]?.lat || 4.909526, data?.[data?.length - 1]?.lng || -73.989772]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [focusedWorkshop, setFocusedWorkshop] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const handleWorkshopFocus = (workshop, index) => {
    setFocusedWorkshop(index);
    
    // Centrar el mapa en el taller seleccionado
    if (workshop.lat && workshop.lng && mapInstance) {
      mapInstance.flyTo([workshop.lat, workshop.lng], 15);
    }
    
    // Simular hover en el marcador
    setTimeout(() => {
      if (mapInstance) {
        const screenPos = mapInstance.latLngToContainerPoint([workshop.lat || 4.909526, workshop.lng || -73.989772]);
        setHoveredInfo({
          ...workshop,
          x: screenPos.x,
          y: screenPos.y,
        });
      }
    }, 500);
  };

  const handleContactClick = (info) => {
    const whatsappNumber = info.telefono || "573143551942";
    const message = `Hola ${info.nombre}, vi tu perfil en el mapa y me gustaría contactarte.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh', maxHeight: '700px' }}>
      <MapContainer
        id="map"
        style={{ width: '100%', height: '100%', borderRadius: '16px' }}
        center={mapCenter}
        zoom={zoomLevel}
        zoomControl={false}
        scrollWheelZoom={true}
        whenCreated={setMapInstance}
      >
        <MapRecenter 
          lat={data?.[Math.floor(data?.length / 2)]?.lat || '4.909526'} 
          lng={data?.[Math.floor(data?.length / 2)]?.lng || '-73.989772'} 
          zoomLevel={zoomLevel} 
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright"></a> '
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <MyComponent setZoomLevel={setZoomLevel} />
        <MarkerClusterGroup 
          data={data} 
          setHoveredInfo={setHoveredInfo}
          focusedWorkshop={focusedWorkshop}
          setFocusedWorkshop={setFocusedWorkshop}
        />
      </MapContainer>

      {hoveredInfo && (
        <MapCard 
          hoveredInfo={hoveredInfo} 
          onContactClick={handleContactClick}
        />
      )}

      <WorkshopSlider 
        data={data}
        onWorkshopFocus={handleWorkshopFocus}
        focusedWorkshop={focusedWorkshop}
      />
    </div>
  );
}