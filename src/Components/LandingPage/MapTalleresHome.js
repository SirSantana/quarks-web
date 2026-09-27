import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Star, Phone, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

function MyComponent({ setZoomLevel }) {
  const map = useMap();
  map.on('zoomend', () => setZoomLevel(map.getZoom()));
  return null;
}

const MapRecenter = ({ lat, lng, zoomLevel }) => {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lng], zoomLevel); }, [lat, lng]);
  return null;
};

function MarkerClusterGroup({ data, setHoveredInfo, focusedWorkshop, setFocusedWorkshop }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 14,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (cluster) => L.divIcon({
        className: 'dummy',
        html: `<div style="
          width:36px; height:36px; border-radius:50%;
          background:#007BFF; color:#fff; display:flex;
          align-items:center; justify-content:center;
          font-size:13px; font-weight:800;
          border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,123,255,0.4);
        ">${cluster.getChildCount()}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    });

    data.forEach((location, index) => {
      const isSelected = focusedWorkshop === index;

      const markerHtml = `
        <div style="
          position:relative;
          display:flex; flex-direction:column; align-items:center;
        ">
          <div style="
            width:${isSelected ? '44px' : '36px'};
            height:${isSelected ? '44px' : '36px'};
            border-radius:50%;
            background:${isSelected ? '#1d4ed8' : '#007BFF'};
            color:#fff;
            display:flex; align-items:center; justify-content:center;
            font-size:${isSelected ? '14px' : '12px'};
            font-weight:800;
            border:${isSelected ? '3px solid #fff' : '2px solid #fff'};
            box-shadow:${isSelected
              ? '0 4px 16px rgba(29,78,216,0.5)'
              : '0 2px 8px rgba(0,123,255,0.35)'};
            transition:all 0.2s ease;
            transform:${isSelected ? 'scale(1.15)' : 'scale(1)'};
          ">${index + 1}</div>
          <div style="
            width:0; height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:8px solid ${isSelected ? '#1d4ed8' : '#007BFF'};
            margin-top:-1px;
          "></div>
        </div>
      `;

      const marker = L.marker(
        [location.lat || 4.909526, location.lng || -73.989772],
        {
          icon: L.divIcon({
            className: 'dummy',
            html: markerHtml,
            iconSize: [44, 52],
            iconAnchor: [22, 52],
          }),
        }
      );

      marker.on('click', (e) => {
        const screenPos = map.latLngToContainerPoint(e.latlng);
        setHoveredInfo({ ...location, x: screenPos.x, y: screenPos.y });
        setFocusedWorkshop(index);
      });

      markers.addLayer(marker);
    });

    map.addLayer(markers);
    return () => map.removeLayer(markers);
  }, [map, data, focusedWorkshop]);

  return null;
}

/* ─── Popup del marcador ─── */
const MapCard = ({ hoveredInfo, onContactClick, onClose }) => (
  <div
    className="absolute z-[1000] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    style={{
      width: '260px',
      top: `${hoveredInfo.y}px`,
      left: `${hoveredInfo.x}px`,
      transform: 'translate(-50%, calc(-100% - 20px))',
      pointerEvents: 'auto',
    }}
  >
    {hoveredInfo.fotoperfil && (
      <div className="relative">
        <img
          src={hoveredInfo.fotoperfil}
          alt={hoveredInfo.nombre}
          className="w-full h-32 object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    )}
    <div className="p-3">
      <h4 className="font-extrabold text-gray-900 text-sm leading-tight mb-0.5">{hoveredInfo.nombre}</h4>
      {hoveredInfo.rating && (
        <div className="flex items-center gap-1 mb-1">
          <Star size={11} fill="#fbbf24" color="#fbbf24" />
          <span className="text-xs font-bold text-gray-800">{hoveredInfo.rating}</span>
          <span className="text-xs text-gray-400">({hoveredInfo.resenas} reseñas)</span>
        </div>
      )}
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
        <MapPin size={10} className="text-gray-400 flex-shrink-0" />
        {hoveredInfo.direccion}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onContactClick(hoveredInfo)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-[#007BFF] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Phone size={11} /> Llamar
        </button>
        <Link
          href={`/${hoveredInfo.userName}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold border border-[#007BFF] text-[#007BFF] rounded-lg hover:bg-blue-50 transition-colors"
        >
          <MessageCircle size={11} /> Ver perfil
        </Link>
      </div>
    </div>
  </div>
);

/* ─── Slider inferior del mapa ─── */
const WorkshopSlider = ({ data, onWorkshopFocus, focusedWorkshop }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_W = 320;
  const GAP = 12;

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scrollDir = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: (CARD_W + GAP) * (dir === 'left' ? -1 : 1), behavior: 'smooth' });
    setTimeout(updateScrollButtons, 350);
  };

  const scrollToCard = (index) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({ left: index * (CARD_W + GAP), behavior: 'smooth' });
    setTimeout(updateScrollButtons, 350);
  };

  useEffect(() => {
    if (focusedWorkshop !== null) { setCurrentIndex(focusedWorkshop); scrollToCard(focusedWorkshop); }
  }, [focusedWorkshop]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onScroll = () => {
      updateScrollButtons();
      setCurrentIndex(Math.round(el.scrollLeft / (CARD_W + GAP)));
    };
    el.addEventListener('scroll', onScroll);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', onScroll);
  }, [data]);

  const handleContact = (w) => {
    const msg = encodeURIComponent(`Hola ${w.nombre}, vi tu taller en el mapa.`);
    window.open(`https://wa.me/${w.telefono || '573143551942'}?text=${msg}`, '_blank');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-200 shadow-2xl">
      {/* Header del slider */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Talleres cercanos
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold tabular-nums">
            {currentIndex + 1} / {data?.length || 0}
          </span>
          <button
            onClick={() => scrollDir('left')}
            disabled={!canScrollLeft}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 disabled:opacity-25 hover:border-blue-400 hover:text-blue-500 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scrollDir('right')}
            disabled={!canScrollRight}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 disabled:opacity-25 hover:border-blue-400 hover:text-blue-500 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto px-4 py-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data?.map((w, index) => (
          <div
            key={w.id || index}
            onClick={() => { setCurrentIndex(index); onWorkshopFocus(w, index); }}
            className={`flex-shrink-0 cursor-pointer rounded-xl border transition-all duration-200 overflow-hidden bg-white
              ${focusedWorkshop === index
                ? 'border-blue-500 shadow-lg ring-1 ring-blue-500/20'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
            style={{ width: `${CARD_W}px` }}
          >
            <div className="flex gap-3 p-3">
              {/* Foto */}
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={w.fotoperfil || '/default-workshop.jpg'}
                  alt={w.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-sm font-extrabold text-gray-900 leading-tight line-clamp-2 flex-1">
                    {w.nombre}
                  </h3>
                  <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${
                    w.abierto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {w.abierto ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} fill="#fbbf24" color="#fbbf24" />
                  <span className="text-xs font-bold text-gray-800">{w.rating || '4.3'}</span>
                  <span className="text-xs text-gray-400">({w.resenas || '119'} reseñas)</span>
                </div>

                <p className="flex items-center gap-1 mt-0.5 text-xs text-gray-500 truncate">
                  <MapPin size={10} className="flex-shrink-0 text-gray-400" />
                  {w.direccion}
                </p>
              </div>
            </div>

            {/* Botones full-width como RepairPal */}
            <div className="grid grid-cols-2 border-t border-gray-100">
              <button
                onClick={(e) => { e.stopPropagation(); handleContact(w); }}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-[#007BFF] hover:bg-blue-700 transition-colors"
              >
                <Phone size={12} />
                Llamar
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleContact(w); }}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-[#007BFF] border-l border-gray-100 hover:bg-blue-50 transition-colors"
              >
                Solicitar cotización
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Componente principal ─── */
export default function MapTalleresHome({ data }) {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [focusedWorkshop, setFocusedWorkshop] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const centerLat = data?.[Math.floor(data?.length / 2)]?.lat || 4.909526;
  const centerLng = data?.[Math.floor(data?.length / 2)]?.lng || -73.989772;

  const handleWorkshopFocus = (workshop, index) => {
    setFocusedWorkshop(index);
    if (workshop.lat && workshop.lng && mapInstance) {
      mapInstance.flyTo([workshop.lat, workshop.lng], 15, { duration: 0.8 });
    }
    setTimeout(() => {
      if (mapInstance) {
        const screenPos = mapInstance.latLngToContainerPoint([
          workshop.lat || 4.909526,
          workshop.lng || -73.989772,
        ]);
        setHoveredInfo({ ...workshop, x: screenPos.x, y: screenPos.y });
      }
    }, 600);
  };

  const handleContactClick = (info) => {
    const msg = encodeURIComponent(`Hola ${info.nombre}, vi tu perfil en el mapa.`);
    window.open(`https://wa.me/${info.telefono || '573143551942'}?text=${msg}`, '_blank');
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={[centerLat, centerLng]}
        zoom={zoomLevel}
        zoomControl={false}
        scrollWheelZoom={true}
        whenCreated={setMapInstance}
      >
        <MapRecenter lat={centerLat} lng={centerLng} zoomLevel={zoomLevel} />
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
          onClose={() => setHoveredInfo(null)}
        />
      )}

      {/* <WorkshopSlider
        data={data}
        onWorkshopFocus={handleWorkshopFocus}
        focusedWorkshop={focusedWorkshop}
      /> */}
    </div>
  );
}