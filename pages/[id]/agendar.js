import React, { useState } from 'react';
import { Calendar, Clock, Car, Wrench, Phone, Mail, MapPin, AlertCircle, Check } from 'lucide-react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    marca: '',
    modelo: '',
    servicio: '',
    problema: '',
    telefono: '',
    email: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  // Datos del taller (esto vendría de props o API)
  const taller = {
    nombre: "AutoService Pro",
    tipo: "Taller Mecánico",
    direccion: "Calle 123 #45-67",
    ciudad: "Bogotá",
    telefono: "+57 300 123 4567",
    calificacion: 4.8,
    fotoperfil: "/taller-ilustration.webp"
  };

  const servicios = [
    "Cambio de aceite",
    "Cambio de pastillas de freno",
    "Revisión de frenos",
    "Alineación y balanceo",
    "Revisión general",
    "Cambio de llantas",
    "Diagnóstico electrónico",
    "Revisión de suspensión",
    "Mantenimiento preventivo",
    "Otro"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Aquí iría la lógica para enviar los datos
    console.log('Datos de la cita:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Generar próximos 14 días
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getDateValue = (date) => {
    return date.toISOString().split('T')[0];
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Tu solicitud de cita ha sido enviada a <strong>{taller.nombre}</strong>. 
            Te contactarán pronto para confirmar la disponibilidad.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 text-white font-medium py-3 hover:bg-blue-700 transition-colors"
          >
            Agendar otra cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Agendar Cita</h1>
          <p className="text-gray-600">Completa el formulario para solicitar una revisión de tu vehículo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6">
              {/* Selección de Fecha */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                  <Calendar className="w-4 h-4" />
                  Selecciona el día
                </label>
                <div className="overflow-x-auto -mx-6 px-6">
                  <div className="flex gap-2 min-w-max pb-2">
                    {getNextDays().map((date, index) => {
                      const dateValue = getDateValue(date);
                      const isSelected = formData.date === dateValue;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({ ...formData, date: dateValue })}
                          className={`flex flex-col items-center px-4 py-3 border transition-colors min-w-[80px] ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                            {date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}
                          </span>
                          <span className="text-lg font-semibold">
                            {date.getDate()}
                          </span>
                          <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                            {date.toLocaleDateString('es-ES', { month: 'short' })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selección de Horario */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                  <Clock className="w-4 h-4" />
                  Selecciona el horario
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: 'AM' })}
                    className={`py-4 border font-medium transition-colors ${
                      formData.timeSlot === 'AM'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">🌅</div>
                    <div>Mañana (AM)</div>
                    <div className={`text-xs mt-1 ${formData.timeSlot === 'AM' ? 'text-blue-100' : 'text-gray-500'}`}>
                      8:00 AM - 12:00 PM
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: 'PM' })}
                    className={`py-4 border font-medium transition-colors ${
                      formData.timeSlot === 'PM'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">🌆</div>
                    <div>Tarde (PM)</div>
                    <div className={`text-xs mt-1 ${formData.timeSlot === 'PM' ? 'text-blue-100' : 'text-gray-500'}`}>
                      12:00 PM - 6:00 PM
                    </div>
                  </button>
                </div>
              </div>

              {/* Información del Vehículo */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                  <Car className="w-4 h-4" />
                  Información del vehículo
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Marca</label>
                    <input
                      type="text"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      placeholder="Ej: Toyota, Chevrolet, Mazda"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Modelo</label>
                    <input
                      type="text"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      placeholder="Ej: Corolla, Spark, CX-5"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Servicio */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                  <Wrench className="w-4 h-4" />
                  Tipo de servicio
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white focus:outline-none focus:border-blue-600 transition-colors"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio, index) => (
                    <option key={index} value={servicio}>{servicio}</option>
                  ))}
                </select>
              </div>

              {/* Descripción del Problema */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  Describe el problema o servicio necesario
                </label>
                <textarea
                  name="problema"
                  value={formData.problema}
                  onChange={handleChange}
                  placeholder="Describe con detalle lo que necesita tu vehículo o el problema que presenta..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  required
                />
              </div>

              {/* Información de Contacto */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-gray-900 mb-4 block">
                  Información de contacto
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Phone className="w-3.5 h-3.5" />
                      Teléfono celular
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+57 300 123 4567"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Mail className="w-3.5 h-3.5" />
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-600 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-4 hover:bg-blue-700 transition-colors"
              >
                Enviar solicitud de cita
              </button>
            </form>
          </div>

          {/* Información del Taller */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 sticky top-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Agendar cita con:</h3>
              
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={taller.fotoperfil}
                    alt={taller.nombre}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                    {taller.tipo}
                  </span>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {taller.nombre}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(taller.calificacion) 
                            ? 'text-amber-400' 
                            : 'text-gray-300'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-xs font-semibold text-gray-900 ml-1">
                      {taller.calificacion}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{taller.direccion}</p>
                    <p className="text-gray-500">{taller.ciudad}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-900">{taller.telefono}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 p-4 border-l-4 border-blue-600">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Nota:</strong> Esta es una solicitud de cita. 
                    El taller se pondrá en contacto contigo para confirmar la disponibilidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}