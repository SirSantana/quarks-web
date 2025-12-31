import React, { useState, useEffect } from 'react';
import { Music, Utensils, Palette, Calendar, X, MapPin, List, Heart, Search } from 'lucide-react';

const EventMap = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentZoom, setCurrentZoom] = useState(13);
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
      color: '#FF375F',
      emoji: '🎵',
      image: 'events/image2307.png'
    },
    food: { 
      name: 'Gastronomía', 
      icon: Utensils, 
      color: '#FFD60A',
      emoji: '🍽️',
      image: 'events/image2304.png'
    },
    culture: { 
      name: 'Cultura', 
      icon: Palette, 
      color: '#00E0B0',
      emoji: '🎨',
      image: 'events/image2305.png'
    },
    dance: { 
      name: 'Baile', 
      icon: Calendar, 
      color: '#5AC8FA',
      emoji: '💃',
      image: 'events/image2306.png'
    }
  };

  const events = [
    { id: 1, name: 'Festival de Jazz', type: 'music', position: [4.6500, -74.0600], date: '15 Nov', time: '20:00', venue: 'Teatro Colón', price: 'Gratis' },
    { id: 2, name: 'Mercado Gourmet', type: 'food', position: [4.6800, -74.0500], date: '12 Nov', time: '18:00', venue: 'Parque 93', price: '$50.000' },
    { id: 3, name: 'Exposición de Arte', type: 'culture', position: [4.5950, -74.0750], date: '18 Nov', time: '10:00', venue: 'MAMBO', price: '$20.000' },
    { id: 4, name: 'Noche de Salsa', type: 'dance', position: [4.6400, -74.1000], date: '16 Nov', time: '21:00', venue: 'Café Havana', price: '$30.000' },
    { id: 5, name: 'Concierto Rock', type: 'music', position: [4.6200, -74.0650], date: '14 Nov', time: '19:30', venue: 'Royal Center', price: '$80.000' },
    { id: 6, name: 'Festival Gastronómico', type: 'food', position: [4.6600, -74.0800], date: '20 Nov', time: '12:00', venue: 'Usaquén', price: 'Gratis' },
    { id: 7, name: 'Teatro Contemporáneo', type: 'culture', position: [4.6100, -74.0900], date: '17 Nov', time: '19:00', venue: 'Teatro Jorge Eliécer', price: '$45.000' },
    { id: 8, name: 'Milonga Urbana', type: 'dance', position: [4.6700, -74.0550], date: '13 Nov', time: '22:00', venue: 'Casa del Tango', price: '$25.000' },
    { id: 9, name: 'DJ Set Electrónico', type: 'music', position: [4.5850, -74.0700], date: '19 Nov', time: '23:00', venue: 'Theatron', price: '$40.000' },
    { id: 10, name: 'Food Trucks Festival', type: 'food', position: [4.6450, -74.0850], date: '21 Nov', time: '17:00', venue: 'Simón Bolívar', price: 'Gratis' },
    { id: 11, name: 'Café Literario', type: 'culture', position: [4.6150, -74.0680], date: '16 Nov', time: '17:00', venue: 'Librería Nacional', price: 'Gratis' },
    { id: 12, name: 'Bar de Tapas', type: 'food', position: [4.6350, -74.0780], date: '13 Nov', time: '19:00', venue: 'Zona T', price: '$60.000' },
    { id: 13, name: 'Karaoke Night', type: 'music', position: [4.6550, -74.0620], date: '14 Nov', time: '22:00', venue: 'Star Karaoke', price: '$35.000' },
    { id: 14, name: 'Taller de Baile', type: 'dance', position: [4.6250, -74.0950], date: '18 Nov', time: '18:00', venue: 'Dance Studio', price: '$40.000' },
    { id: 15, name: 'Galería Underground', type: 'culture', position: [4.6650, -74.0920], date: '20 Nov', time: '11:00', venue: 'Espacio Odeón', price: 'Gratis' },
    { id: 16, name: 'Pizza al Horno', type: 'food', position: [4.6050, -74.0820], date: '15 Nov', time: '13:00', venue: 'La Pizzería', price: '$45.000' },
    { id: 17, name: 'Jam Session', type: 'music', position: [4.6180, -74.0730], date: '17 Nov', time: '21:00', venue: 'Jazz al Parque', price: 'Gratis' },
    { id: 18, name: 'Cervecería Artesanal', type: 'food', position: [4.6380, -74.0760], date: '19 Nov', time: '20:00', venue: 'BBC Bogotá', price: '$55.000' },
    { id: 19, name: 'Cine Arte', type: 'culture', position: [4.6120, -74.0710], date: '21 Nov', time: '16:00', venue: 'Cinemateca', price: '$18.000' },
    { id: 20, name: 'Clase de Tango', type: 'dance', position: [4.6480, -74.0640], date: '12 Nov', time: '19:00', venue: 'Club de Tango', price: '$50.000' },
  ];

  const createIslandIcon = (event) => {
    if (!L) return null;
    
    const eventType = eventTypes[event.type];
    // Tamaño base ajustado según zoom
    const baseSize = 150;
    const zoomMultiplier = currentZoom < 12 ? 0.5 : currentZoom < 13 ? 0.7 : currentZoom < 14 ? 0.9 : currentZoom < 15 ? 1.1 : 1.3;
    const size = baseSize * zoomMultiplier;
    
    const iconHtml = `
      <div class="island-container" style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
      ">
        <!-- Sombra proyectada -->
        <div class="island-shadow" style="
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: ${size * 0.8}px;
          height: ${size * 0.3}px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%);
          filter: blur(15px);
          z-index: -1;
        "></div>
        
        <!-- Resplandor de isla -->
        <div class="island-glow" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size * 1.3}px;
          height: ${size * 1.3}px;
          background: radial-gradient(circle, ${eventType.color}33 0%, transparent 70%);
          filter: blur(20px);
          z-index: -1;
          opacity: 0.6;
        "></div>
        
        <!-- Imagen de la isla -->
        <img 
          src="${eventType.image}" 
          style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
            position: relative;
            z-index: 1;
          "
          alt="${event.name}"
        />
        
        <!-- Etiqueta flotante -->
        <div class="island-label" style="
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          border: 1px solid ${eventType.color}66;
          z-index: 2;
          pointer-events: none;
        ">
          ${event.name}
        </div>
      </div>
    `;
    
    return L.divIcon({
      className: 'island-marker-custom',
      html: iconHtml,
      iconSize: [size, size + 40],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  };

  const MapEventHandler = () => {
    if (!MapComponents) return null;
    
    const { useMapEvents } = MapComponents;
    const map = useMapEvents({
      zoomend: () => {
        setCurrentZoom(map.getZoom());
      },
    });

    useEffect(() => {
      setCurrentZoom(map.getZoom());
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

  if (!isClient || !MapComponents || !L) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gray-800 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
              <MapPin className="w-10 h-10 text-black" />
            </div>
          </div>
          <p className="text-white text-xl font-semibold">Cargando mapa...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando tu experiencia</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker } = MapComponents;

  return (
    <div className="h-screen w-full relative overflow-hidden flex bg-black">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      
      {/* Sidebar Desktop / Modal Mobile */}
      <div className={`
        ${isMobile 
          ? `fixed inset-0 z-[1002] transform transition-transform duration-300 ${showListMobile ? 'translate-x-0' : '-translate-x-full'}`
          : 'relative w-96 flex-shrink-0'
        }
      `}>
        <div className={`h-full bg-neutral-900 ${isMobile ? '' : 'border-r border-neutral-800'} flex flex-col`}>
          {/* Header del sidebar */}
          <div className="p-5 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <List className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Eventos</h2>
                  <p className="text-sm text-gray-400">{filteredEvents.length} disponibles</p>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowListMobile(false)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-neutral-800 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="px-5 py-4 border-b border-neutral-800">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
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
                        ? 'text-black shadow-sm'
                        : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
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
                  className="bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 rounded-2xl p-4 cursor-pointer transition-all group hover:shadow-lg active:scale-[0.98]"
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
                        <h3 className="font-semibold text-white text-sm truncate">
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
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-400'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs font-medium mb-2" style={{ color: type.color }}>{type.name}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{event.date} • {event.time}</span>
                          <span className="text-white font-semibold">{event.price}</span>
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
          <header className="absolute top-0 left-0 right-0 z-[1000] bg-black/80 backdrop-blur-2xl border-b border-neutral-800">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">EventMap</h1>
                    <p className="text-xs text-gray-400">{filteredEvents.length} eventos</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowListMobile(true)}
                  className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium shadow-sm hover:bg-gray-200 transition-all active:scale-95"
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
          zoom={12}
          minZoom={11}
          maxZoom={16}
          zoomControl={true}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='© OpenStreetMap, © CartoDB'
          />
          
          <MapEventHandler />

          {filteredEvents.map(event => {
            return (
              <Marker
                key={event.id}
                position={event.position}
                icon={createIslandIcon(event)}
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1003] flex items-end md:items-center justify-center p-0 md:p-6" 
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="relative bg-neutral-900 rounded-t-3xl md:rounded-3xl w-full md:max-w-md shadow-2xl border border-neutral-800 transform transition-transform overflow-visible"
            onClick={e => e.stopPropagation()}
          >
            {/* Isla flotante superior */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative">
                <img 
                  src={eventTypes[selectedEvent.type].image}
                  alt={selectedEvent.name}
                  className="w-64 h-64 object-contain drop-shadow-2xl floating-modal-island"
                />
                <div 
                  className="absolute inset-0 opacity-60 blur-2xl"
                  style={{ 
                    background: `radial-gradient(circle, ${eventTypes[selectedEvent.type].color}88 0%, transparent 70%)`
                  }}
                ></div>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="pt-32 p-6 md:p-8">
              <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-6 md:hidden"></div>
              
              {/* Botones de acción */}
              <div className="flex justify-end gap-2 mb-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedEvent.id);
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-3 hover:bg-neutral-800 rounded-xl"
                >
                  <Heart 
                    className={`w-6 h-6 ${
                      favorites.includes(selectedEvent.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white transition-colors p-3 hover:bg-neutral-800 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Título y categoría */}
              <div className="text-center mb-8">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ 
                    backgroundColor: `${eventTypes[selectedEvent.type].color}22`,
                    border: `1px solid ${eventTypes[selectedEvent.type].color}44`
                  }}
                >
                  {React.createElement(eventTypes[selectedEvent.type].icon, { 
                    className: "w-4 h-4",
                    style: { color: eventTypes[selectedEvent.type].color }
                  })}
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: eventTypes[selectedEvent.type].color }}
                  >
                    {eventTypes[selectedEvent.type].name}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selectedEvent.name}
                </h2>
              </div>
              
              {/* Información del evento */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-4 bg-neutral-800/50 rounded-2xl p-4 border border-neutral-700/50 backdrop-blur-sm">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${eventTypes[selectedEvent.type].color}22` }}
                  >
                    <MapPin 
                      className="w-6 h-6"
                      style={{ color: eventTypes[selectedEvent.type].color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium mb-1">Lugar</p>
                    <p className="text-white font-semibold">{selectedEvent.venue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-neutral-800/50 rounded-2xl p-4 border border-neutral-700/50 backdrop-blur-sm">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${eventTypes[selectedEvent.type].color}22` }}
                  >
                    <Calendar 
                      className="w-6 h-6"
                      style={{ color: eventTypes[selectedEvent.type].color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium mb-1">Fecha y hora</p>
                    <p className="text-white font-semibold">{selectedEvent.date} • {selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-neutral-800/50 rounded-2xl p-4 border border-neutral-700/50 backdrop-blur-sm">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${eventTypes[selectedEvent.type].color}22` }}
                  >
                    <span className="text-2xl">💵</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium mb-1">Precio</p>
                    <p className="text-white font-semibold">{selectedEvent.price}</p>
                  </div>
                </div>
              </div>
              
              {/* Botón de acción */}
              <button 
                className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98] relative overflow-hidden group"
                style={{ backgroundColor: eventTypes[selectedEvent.type].color }}
              >
                <span className="relative z-10">Ver detalles del evento</span>
                <div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                ></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .island-marker-custom {
          background: transparent !important;
          border: none !important;
          overflow: visible !important;
        }

        .island-container {
          animation: floatIsland 6s ease-in-out infinite;
        }

        @keyframes floatIsland {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .island-marker-custom:hover .island-container {
          animation: floatIslandHover 2s ease-in-out infinite;
        }

        @keyframes floatIslandHover {
          0%, 100% {
            transform: translateY(-8px) scale(1.08);
          }
          50% {
            transform: translateY(-16px) scale(1.08);
          }
        }

        .island-marker-custom:hover .island-glow {
          opacity: 1 !important;
          transition: opacity 0.3s ease;
        }

        .island-marker-custom:hover .island-shadow {
          opacity: 0.8;
          transform: translateX(-50%) scale(1.1);
          transition: all 0.3s ease;
        }

        .island-label {
          opacity: 0;
          transform: translateX(-50%) translateY(5px);
          transition: all 0.3s ease;
        }

        .island-marker-custom:hover .island-label {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .floating-modal-island {
          animation: floatModalIsland 4s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
        }

        @keyframes floatModalIsland {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(2deg);
          }
          75% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .leaflet-container {
          background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%) !important;
        }
      `}</style>
    </div>
  );
};

export default EventMap;