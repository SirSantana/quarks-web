import React, { useState } from 'react';
import { 
  Star, Send, CheckCircle2, MapPin
} from 'lucide-react';

export default function RFQMPage() {
  const [formData, setFormData] = useState({
    tipoServicio: '',
    vehiculo: '',
    problema: '',
    telefono: '',
    nombre: ''
  });

  const [selectedTalleres, setSelectedTalleres] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const servicios = [
    "Cambio de aceite",
    "Cambio de pastillas de freno",
    "Alineación y balanceo",
    "Revisión general",
    "Diagnóstico electrónico",
    "Revisión de suspensión",
    "Sistema eléctrico",
    "Mantenimiento preventivo",
    "Otro"
  ];

  const talleres = [
    {
      id: 1,
      nombre: "Taller Mecánico El Pinón",
      calificacion: 4.8,
      reviews: 234,
      especialidades: "Especialista en Suspensión y Frenos",
      ubicacion: "Chapinero",
      fotoperfil: "/taller-ilustration.webp"
    },
    {
      id: 2,
      nombre: "AutoService Express",
      calificacion: 4.9,
      reviews: 189,
      especialidades: "Mantenimiento General y Diagnóstico",
      ubicacion: "Suba",
      fotoperfil: "/taller-ilustration.webp"
    },
    {
      id: 3,
      nombre: "Centro Automotriz Total",
      calificacion: 4.7,
      reviews: 312,
      especialidades: "Especialista en Motor y Transmisión",
      ubicacion: "Kennedy",
      fotoperfil: "/taller-ilustration.webp"
    },
    {
      id: 4,
      nombre: "Mecánica Profesional",
      calificacion: 4.8,
      reviews: 156,
      especialidades: "Frenos y Sistema Eléctrico",
      ubicacion: "Engativá",
      fotoperfil: "/taller-ilustration.webp"
    },
    {
      id: 5,
      nombre: "Taller Premium Cars",
      calificacion: 4.6,
      reviews: 98,
      especialidades: "Mantenimiento Preventivo",
      ubicacion: "Usaquén",
      fotoperfil: "/taller-ilustration.webp"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleTaller = (tallerId) => {
    setSelectedTalleres(prev => 
      prev.includes(tallerId) 
        ? prev.filter(id => id !== tallerId)
        : prev.length < 5 ? [...prev, tallerId] : prev
    );
  };

  const handleSubmit = () => {
    if (selectedTalleres.length === 0) {
      alert('Selecciona al menos un taller');
      return;
    }
    if (!formData.nombre || !formData.telefono || !formData.tipoServicio || !formData.vehiculo || !formData.problema) {
      alert('Completa todos los campos requeridos');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-8 border border-gray-200">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              ¡Solicitud Enviada!
            </h2>
            <p className="text-gray-600 mb-8">
              Tu solicitud fue enviada a <strong>{selectedTalleres.length} {selectedTalleres.length === 1 ? 'taller' : 'talleres'}</strong> en Bogotá.
              Te contactarán pronto con sus cotizaciones.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-gray-900">Los talleres te contactarán por WhatsApp o llamada</strong>
              </p>
              <p className="text-xs text-gray-600">
                Recibirás las cotizaciones en las próximas horas. Compara precios y elige la mejor opción.
              </p>
            </div>

            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  tipoServicio: '', vehiculo: '', problema: '', telefono: '', nombre: ''
                });
                setSelectedTalleres([]);
              }}
              className="w-full bg-blue-600 text-white font-medium py-3 hover:bg-blue-700 transition-colors"
            >
              Nueva Solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Solicita Múltiples Cotizaciones
          </h1>
          <p className="text-gray-600 text-lg">
            Recibe cotizaciones de hasta 5 talleres en Bogotá. <strong>Compara y Ahorra.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Cuéntanos qué necesitas
              </h2>

              <div className="space-y-5">
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Qué servicio necesitas? *
                  </label>
                  <select
                    name="tipoServicio"
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio, index) => (
                      <option key={index} value={servicio}>{servicio}</option>
                    ))}
                  </select>
                </div>

                {/* Vehicle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca y modelo de tu vehículo *
                  </label>
                  <input
                    type="text"
                    name="vehiculo"
                    value={formData.vehiculo}
                    onChange={handleChange}
                    placeholder="Ej: Chevrolet Spark 2020"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe el problema o trabajo a realizar *
                  </label>
                  <textarea
                    name="problema"
                    value={formData.problema}
                    onChange={handleChange}
                    placeholder="Ej: El auto hace un ruido extraño al frenar y vibra..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="border-t border-gray-200 pt-5 mt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Información de contacto
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de WhatsApp o teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="300 123 4567"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 mt-6">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Los talleres te contactarán directamente</strong> por WhatsApp o llamada para darte su cotización.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Talleres Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Selecciona talleres
                </h2>
                <span className="text-sm font-medium text-blue-600">
                  {selectedTalleres.length}/5
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Elige hasta 5 talleres en Bogotá
              </p>

              <div className="space-y-3 mb-6">
                {talleres.map((taller) => {
                  const isSelected = selectedTalleres.includes(taller.id);
                  return (
                    <div
                      key={taller.id}
                      onClick={() => toggleTaller(taller.id)}
                      className={`border p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </div>

                        {/* Photo */}
                        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={taller.fotoperfil}
                            alt={taller.nombre}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">
                            {taller.nombre}
                          </h4>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span className="text-xs font-semibold text-gray-900">{taller.calificacion}</span>
                            <span className="text-xs text-gray-400">({taller.reviews})</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{taller.especialidades}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{taller.ubicacion}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedTalleres.length === 0}
                className={`w-full font-medium py-4 transition-colors flex items-center justify-center gap-2 ${
                  selectedTalleres.length > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>
                  Enviar solicitud
                </span>
              </button>

              {selectedTalleres.length === 0 && (
                <p className="text-xs text-center text-gray-500 mt-3">
                  Selecciona al menos un taller
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}