import React, { useState, useEffect } from 'react';
import { Music, Utensils, Palette, Calendar, X, MapPin, List, Heart, Search, Navigation2 } from 'lucide-react';

const EventMap = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentZoom, setCurrentZoom] = useState(13);
  const [visibleEvents, setVisibleEvents] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState(null);
  const [L, setL] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showListMobile, setShowListMobile] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 1024);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowListMobile(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    const loadMapComponents = async () => {
      const leaflet = await import('leaflet');
      const { MapContainer, TileLayer, Marker, Popup, useMapEvents } = await import('react-leaflet');
      
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      
      setL(leaflet);
      setMapComponents({ MapContainer, TileLayer, Marker, Popup, useMapEvents });
    };
    
    loadMapComponents();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const center = [4.6097, -74.0817];

  const eventTypes = {
    music: { 
      name: 'Música', 
      icon: Music, 
      color: '#FF375F  ', 
      lightColor: '#FF2D55',
      emoji: '🎵'
    },
    food: { 
      name: 'Gastronomía', 
      icon: Utensils, 
      color: '#FFD60A  ', 
      lightColor: '#FF9500',
      emoji: '🍽️'
    },
    culture: { 
      name: 'Cultura', 
      icon: Palette, 
      color: '#00E0B0', 
      lightColor: '#BF5AF2',
      emoji: '🎨'
    },
    dance: { 
      name: 'Baile', 
      icon: Calendar, 
      color: '#5AC8FA', 
      lightColor: '#5AC8FA',
      emoji: '💃'
    }
  };

  const events = [
    { id: 1, name: 'Festival de Jazz', type: 'music', position: [4.6500, -74.0600], date: '15 Nov', time: '20:00', minZoom: 11, venue: 'Teatro Colón', price: 'Gratis' },
    { id: 2, name: 'Mercado Gourmet', type: 'food', position: [4.6800, -74.0500], date: '12 Nov', time: '18:00', minZoom: 11, venue: 'Parque 93', price: '$50.000' },
    { id: 3, name: 'Exposición de Arte', type: 'culture', position: [4.5950, -74.0750], date: '18 Nov', time: '10:00', minZoom: 11, venue: 'MAMBO', price: '$20.000' },
    { id: 4, name: 'Noche de Salsa', type: 'dance', position: [4.6400, -74.1000], date: '16 Nov', time: '21:00', minZoom: 11, venue: 'Café Havana', price: '$30.000' },
    { id: 5, name: 'Concierto Rock', type: 'music', position: [4.6200, -74.0650], date: '14 Nov', time: '19:30', minZoom: 13, venue: 'Royal Center', price: '$80.000' },
    { id: 6, name: 'Festival Gastronómico', type: 'food', position: [4.6600, -74.0800], date: '20 Nov', time: '12:00', minZoom: 13, venue: 'Usaquén', price: 'Gratis' },
    { id: 7, name: 'Teatro Contemporáneo', type: 'culture', position: [4.6100, -74.0900], date: '17 Nov', time: '19:00', minZoom: 13, venue: 'Teatro Jorge Eliécer', price: '$45.000' },
    { id: 8, name: 'Milonga Urbana', type: 'dance', position: [4.6700, -74.0550], date: '13 Nov', time: '22:00', minZoom: 13, venue: 'Casa del Tango', price: '$25.000' },
    { id: 9, name: 'DJ Set Electrónico', type: 'music', position: [4.5850, -74.0700], date: '19 Nov', time: '23:00', minZoom: 13, venue: 'Theatron', price: '$40.000' },
    { id: 10, name: 'Food Trucks Festival', type: 'food', position: [4.6450, -74.0850], date: '21 Nov', time: '17:00', minZoom: 13, venue: 'Simón Bolívar', price: 'Gratis' },
    { id: 11, name: 'Café Literario', type: 'culture', position: [4.6150, -74.0680], date: '16 Nov', time: '17:00', minZoom: 15, venue: 'Librería Nacional', price: 'Gratis' },
    { id: 12, name: 'Bar de Tapas', type: 'food', position: [4.6350, -74.0780], date: '13 Nov', time: '19:00', minZoom: 15, venue: 'Zona T', price: '$60.000' },
    { id: 13, name: 'Karaoke Night', type: 'music', position: [4.6550, -74.0620], date: '14 Nov', time: '22:00', minZoom: 15, venue: 'Star Karaoke', price: '$35.000' },
    { id: 14, name: 'Taller de Baile', type: 'dance', position: [4.6250, -74.0950], date: '18 Nov', time: '18:00', minZoom: 15, venue: 'Dance Studio', price: '$40.000' },
    { id: 15, name: 'Galería Underground', type: 'culture', position: [4.6650, -74.0920], date: '20 Nov', time: '11:00', minZoom: 15, venue: 'Espacio Odeón', price: 'Gratis' },
    { id: 16, name: 'Pizza al Horno', type: 'food', position: [4.6050, -74.0820], date: '15 Nov', time: '13:00', minZoom: 15, venue: 'La Pizzería', price: '$45.000' },
    { id: 17, name: 'Jam Session', type: 'music', position: [4.6180, -74.0730], date: '17 Nov', time: '21:00', minZoom: 16, venue: 'Jazz al Parque', price: 'Gratis' },
    { id: 18, name: 'Cervecería Artesanal', type: 'food', position: [4.6380, -74.0760], date: '19 Nov', time: '20:00', minZoom: 16, venue: 'BBC Bogotá', price: '$55.000' },
    { id: 19, name: 'Cine Arte', type: 'culture', position: [4.6120, -74.0710], date: '21 Nov', time: '16:00', minZoom: 16, venue: 'Cinemateca', price: '$18.000' },
    { id: 20, name: 'Clase de Tango', type: 'dance', position: [4.6480, -74.0640], date: '12 Nov', time: '19:00', minZoom: 16, venue: 'Club de Tango', price: '$50.000' },
  ];

  const createCustomIcon = (event, size = 'medium') => {
    if (!L) return null;
    
    const eventType = eventTypes[event.type];
    const sizes = {
      small: { pin: 50, label: 100 },
      medium: { pin: 60, label: 120 },
      large: { pin: 70, label: 140 }
    };
    const pinSize = isMobile ? sizes[size].pin - 10 : sizes[size].pin;
    const labelWidth = isMobile ? sizes[size].label : sizes[size].label;
    
   const svgIcon = `
  <div style="
    position: relative;
    width: ${labelWidth}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  ">

    <!-- Pin con brillo real -->
    <div style="
      position: relative;
      width: ${pinSize * 0.8}px;
      height: ${pinSize * 1.1}px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pinPop 0.35s cubic-bezier(0.25, 1.25, 0.5, 1);
    ">

      <!-- Círculo principal con resplandor -->
      <div style="
        position: absolute;
        width: ${pinSize * 0.8}px;
        height: ${pinSize * 0.8}px;
        background: radial-gradient(circle at 30% 30%, ${eventType.color} 30%, ${adjustBrightness(eventType.color, -20)} 100%);
        border-radius: 50%;
        box-shadow:
          0 0 15px ${eventType.color}aa,
          0 0 35px ${eventType.color}66,
          0 4px 8px rgba(0,0,0,0.15);
      ">
        <!-- Emoji -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: ${pinSize * 0.4}px;
          line-height: 1;
          filter: drop-shadow(0 0 2px white);
        ">${eventType.emoji}</div>
      </div>

      <!-- Punta del pin -->
      <div style="
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: ${pinSize * 0.2}px solid transparent;
        border-right: ${pinSize * 0.2}px solid transparent;
        border-top: ${pinSize * 0.3}px solid ${adjustBrightness(eventType.color, -20)};
        filter: drop-shadow(0 0 8px ${eventType.color}88);
      "></div>

      <!-- Luz ambiental sobre el mapa -->
      <div style="
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: ${pinSize * 1.6}px;
        height: ${pinSize * 0.5}px;
        background: radial-gradient(ellipse, ${eventType.color}66 0%, transparent 70%);
        filter: blur(10px);
        opacity: 0.8;
        pointer-events: none;
      "></div>
    </div>

    <!-- Label -->
    <div style="
      padding: 4px 12px;
      border-radius: 12px;
      white-space: nowrap;
      font-family: Poppins, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      font-weight: 600;
      max-width: ${labelWidth}px;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(0,0,0,0.45);
      color: white;
      backdrop-filter: blur(6px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      ${event.name}
    </div>
  </div>

  <style>
    @keyframes pinPop {
      0% { transform: scale(0.4); opacity: 0; }
      60% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
  </style>
`;

// Función auxiliar para ajustar brillo del color
function adjustBrightness(color, percent) {
  // Si el color es en formato hex
  if (color.startsWith('#')) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, ((num >> 16) & 0xFF) + percent));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) + percent));
    const b = Math.max(0, Math.min(255, (num & 0xFF) + percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  return color;
}
    
    return L.divIcon({
      className: 'custom-marker-3d',
      html: svgIcon,
      iconSize: [labelWidth, pinSize + 40],
      iconAnchor: [labelWidth / 2, pinSize + 35],
      popupAnchor: [0, -(pinSize + 40)]
    });
  };

  const getIconSize = (zoom) => {
    if (zoom < 13) return 'small';
    if (zoom < 15) return 'medium';
    return 'large';
  };

  const MapEventHandler = () => {
    if (!MapComponents) return null;
    
    const { useMapEvents } = MapComponents;
    const map = useMapEvents({
      zoomend: () => {
        const zoom = map.getZoom();
        setCurrentZoom(zoom);
        const visible = filteredEvents.filter(e => zoom >= e.minZoom).length;
        setVisibleEvents(visible);
      },
    });

    useEffect(() => {
      const zoom = map.getZoom();
      setCurrentZoom(zoom);
      const visible = filteredEvents.filter(e => zoom >= e.minZoom).length;
      setVisibleEvents(visible);
    }, [map]);

    return null;
  };

  const toggleFavorite = (eventId) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = events
    .filter(e => activeFilter === 'all' || e.type === activeFilter)
    .filter(e => searchQuery === '' || 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const visibleFilteredEvents = filteredEvents.filter(e => currentZoom >= e.minZoom);

  if (!isClient || !MapComponents || !L) {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-xl">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-gray-900 text-xl font-semibold">Cargando mapa...</p>
          <p className="text-gray-500 text-sm mt-2">Preparando tu experiencia</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker } = MapComponents;

  return (
    <div className="h-screen w-full relative overflow-hidden flex bg-white">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      
      {/* Sidebar Desktop / Modal Mobile */}
      <div className={`
        ${isMobile 
          ? `fixed inset-0 z-[1002] transform transition-transform duration-300 ${showListMobile ? 'translate-x-0' : '-translate-x-full'}`
          : 'relative w-96 flex-shrink-0'
        }
      `}>
        <div className={`h-full bg-white ${isMobile ? '' : 'border-r border-gray-200'} flex flex-col`}>
          {/* Header del sidebar */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-sm">
                  <List className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Eventos</h2>
                  <p className="text-sm text-gray-500">{filteredEvents.length} disponibles</p>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowListMobile(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {Object.entries(eventTypes).map(([key, type]) => {
                const Icon = type.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                      activeFilter === key
                        ? 'text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={activeFilter === key ? { backgroundColor: type.color } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {type.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista de eventos */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {filteredEvents.map(event => {
              const type = eventTypes[event.type];
              const Icon = type.icon;
              const isFavorite = favorites.includes(event.id);
              
              return (
                <div
                  key={event.id}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 cursor-pointer transition-all group hover:shadow-md active:scale-[0.98]"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex gap-3">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: type.color }}
                    >
                      <span className="text-2xl">{type.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {event.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(event.id);
                          }}
                          className="flex-shrink-0"
                        >
                          <Heart 
                            className={`w-5 h-5 transition-all ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-red-400'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs font-medium mb-2" style={{ color: type.color }}>{type.name}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{event.date} • {event.time}</span>
                          <span className="text-gray-900 font-semibold">{event.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Header Mobile */}
        {isMobile && (
          <header className="absolute top-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-2xl border-b border-gray-200">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">EventMap</h1>
                    <p className="text-xs text-gray-500">{visibleEvents} eventos</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowListMobile(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:bg-gray-800 transition-all active:scale-95"
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm">Lista</span>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Mapa */}
        <MapContainer
          center={center}
          zoom={13}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
         <TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='© OpenStreetMap, © CartoDB'
/>
          
          <MapEventHandler />

          {visibleFilteredEvents.map(event => {
            return (
              <Marker
                key={event.id}
                position={event.position}
                icon={createCustomIcon(event, getIconSize(currentZoom))}
                eventHandlers={{
                  click: () => setSelectedEvent(event),
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Event Detail Card */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1003] flex items-end md:items-center justify-center p-0 md:p-6" 
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 w-full md:max-w-md shadow-2xl transform transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: eventTypes[selectedEvent.type].color }}
                >
                  <span className="text-4xl">{eventTypes[selectedEvent.type].emoji}</span>
                </div>
                <div 
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                  style={{ backgroundColor: eventTypes[selectedEvent.type].color }}
                >
                  {React.createElement(eventTypes[selectedEvent.type].icon, { className: "w-5 h-5 text-white" })}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedEvent.id);
                  }}
                  className="text-gray-400 hover:text-gray-900 transition-colors p-3 hover:bg-gray-100 rounded-xl"
                >
                  <Heart 
                    className={`w-6 h-6 ${
                      favorites.includes(selectedEvent.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-900 transition-colors p-3 hover:bg-gray-100 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedEvent.name}</h2>
            <p 
              className="text-base md:text-lg font-semibold mb-6"
              style={{ color: eventTypes[selectedEvent.type].color }}
            >
              {eventTypes[selectedEvent.type].name}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Lugar</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Fecha y hora</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.date} • {selectedEvent.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💵</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Precio</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.price}</p>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              style={{ backgroundColor: eventTypes[selectedEvent.type].color }}
            >
              Ver detalles del evento
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-marker-3d {
          background: transparent;
          border: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes pinBounce {
          0%, 100% {
            transform: rotate(-45deg) translateY(0) scale(1);
          }
          50% {
            transform: rotate(-45deg) translateY(-6px) scale(1.05);
          }
        }
        
        @keyframes labelFade {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .leaflet-container {
          background: #f5f5f7 !important;
        }

        .leaflet-control-zoom {
          display: none !important;
        }
        
        /* Evitar que las etiquetas se corten */
        .leaflet-marker-icon {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
};

export default EventMap;