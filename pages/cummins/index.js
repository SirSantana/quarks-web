import motorescummins from '@/utils/motorescummins.json' 
import React, { useState, useMemo } from 'react';
import { Search, X, Check, Zap, Gauge, Weight, Settings } from 'lucide-react';
import MotorComparator from '@/src/Components/Cummins/EngineComparator';

const CumminsMotorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMotors, setSelectedMotors] = useState([]);
  const [showComparator, setShowComparator] = useState(false);

  const motors = motorescummins.motorescummins;

  const filteredMotors = useMemo(() => {
    return motors.filter(motor =>
      motor.nombre_modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motor.aplicacion_principal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, motors]);

  const toggleMotorSelection = (motorId) => {
    setSelectedMotors(prev => {
      if (prev.includes(motorId)) {
        return prev.filter(id => id !== motorId);
      }
      if (prev.length < 3) {
        return [...prev, motorId];
      }
      return prev;
    });
  };

  const selectedMotorsData = motors.filter(m => selectedMotors.includes(m.motor_id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-2xl">C</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cummins</h1>
                <p className="text-xs font-medium text-gray-500 tracking-wide">POWER SOLUTIONS</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#motores" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">Catálogo</a>
              <a href="#comparador" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">Comparador</a>
              <button className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-600/50">
                Contacto
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-full border border-red-100">
                NUEVA GENERACIÓN
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight">
              Motores<br/>
              <span className="text-red-600">Cummins</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Potencia incomparable. Eficiencia superior. Tecnología de vanguardia.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por modelo, aplicación o especificación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border-2 border-gray-200 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 text-base transition-all shadow-lg shadow-gray-200/50"
            />
          </div>
        </div>
      </section>

      {/* Quick View Slider */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-gray-900">Vista Rápida</h3>
          <p className="text-gray-600 font-medium">Explora nuestros motores más destacados</p>
        </div>
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="flex space-x-6 w-max">
            {motors.map((motor) => (
              <div
                key={motor.motor_id}
                className="relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  const element = document.getElementById('motores');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={`${motor.images[0]}`}
                    alt={motor.nombre_modelo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-4">
                      <Zap className="w-4 h-4 text-red-400" />
                      <span className="text-white text-sm font-bold">
                        {motor.rendimiento_potencia_torque.rango_potencia_hp}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-white mb-2">
                    {motor.nombre_modelo}
                  </h4>
                  <p className="text-white/80 text-sm font-medium line-clamp-2">
                    {motor.especificaciones_generales.configuracion} • {motor.especificaciones_generales.cilindrada_litros}L
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MotorComparator motors={motorescummins.motorescummins} />

      {/* Motors Grid */}
      <section id="motores" className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMotors.map((motor) => (
            <div
              key={motor.motor_id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 hover:border-gray-300"
              onClick={() => toggleMotorSelection(motor.motor_id)}
            >
              {/* Selection Indicator */}
              <div className="absolute top-6 right-6 z-20">
                <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${
                  selectedMotors.includes(motor.motor_id)
                    ? 'bg-red-600 border-red-600 scale-110 shadow-lg shadow-red-600/50'
                    : 'bg-white/90 border-white backdrop-blur-sm shadow-lg'
                }`}>
                  {selectedMotors.includes(motor.motor_id) && (
                    <Check className="w-7 h-7 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <img
                  src={`${motor.images[0]}`}
                  alt={motor.nombre_modelo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <Settings className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-bold text-gray-900">{motor.especificaciones_generales.configuracion}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-black text-gray-900 mb-2">
                    {motor.nombre_modelo}
                  </h3>
                  <p className="text-sm font-medium text-gray-500">{motor.periodo_produccion}</p>
                </div>

                {/* Performance Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Potencia</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_potencia_hp}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <Gauge className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Torque</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_torque_lb_ft}</p>
                  </div>
                </div>

                {/* Application */}
                <div className="bg-red-50 rounded-2xl p-5 mb-6 border border-red-100">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Aplicación</p>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">{motor.aplicacion_principal}</p>
                </div>

                {/* Bottom Specs */}
                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cilindrada</p>
                    <p className="text-lg font-black text-gray-900">{motor.especificaciones_generales.cilindrada_litros}L</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Peso</p>
                    <p className="text-lg font-black text-gray-900">{motor.especificaciones_generales.peso_seco_kg} kg</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Emisiones</p>
                    <p className="text-xs font-bold text-red-600">{motor.especificaciones_generales.emisiones_certificacion?.split(',')[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparator Modal */}
      {showComparator && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-10 py-8 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-white mb-2">Comparador de Motores</h2>
                <p className="text-red-100 font-medium">Analizando {selectedMotorsData.length} motores seleccionados</p>
              </div>
              <button
                onClick={() => setShowComparator(false)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X className="w-7 h-7 text-white" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-10 overflow-auto max-h-[calc(90vh-140px)]">
              {selectedMotorsData.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-xl font-semibold">Selecciona motores para comparar</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-6 px-6 font-black text-gray-900 bg-gray-50 sticky left-0 z-10 rounded-tl-2xl">
                          ESPECIFICACIÓN
                        </th>
                        {selectedMotorsData.map(motor => (
                          <th key={motor.motor_id} className="text-left py-6 px-6 font-black text-gray-900 min-w-80">
                            <div className="flex flex-col space-y-2">
                              <span className="text-xl">{motor.nombre_modelo}</span>
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{motor.motor_id}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: 'Potencia (HP)', key: 'rango_potencia_hp', section: 'rendimiento_potencia_torque' },
                        { label: 'Potencia (kW)', key: 'rango_potencia_kw', section: 'rendimiento_potencia_torque' },
                        { label: 'Torque (N•m)', key: 'rango_torque_nm', section: 'rendimiento_potencia_torque' },
                        { label: 'Torque (lb-ft)', key: 'rango_torque_lb_ft', section: 'rendimiento_potencia_torque' },
                        { label: 'Configuración', key: 'configuracion', section: 'especificaciones_generales' },
                        { label: 'Cilindrada (L)', key: 'cilindrada_litros', section: 'especificaciones_generales' },
                        { label: 'Peso Seco (kg)', key: 'peso_seco_kg', section: 'especificaciones_generales' },
                        { label: 'Sistema de Combustible', key: 'sistema_combustible', section: 'especificaciones_generales' },
                        { label: 'Sistema de Aspiración', key: 'sistema_aspiracion', section: 'especificaciones_generales' },
                        { label: 'Emisiones', key: 'emisiones_certificacion', section: 'especificaciones_generales' },
                      ].map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-red-50/30 transition-colors">
                          <td className="py-5 px-6 font-bold text-gray-700 bg-gray-50 sticky left-0 z-10">
                            {spec.label}
                          </td>
                          {selectedMotorsData.map(motor => (
                            <td key={motor.motor_id} className="py-5 px-6 text-gray-900 font-medium">
                              {motor[spec.section][spec.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="hover:bg-red-50/30 transition-colors">
                        <td className="py-5 px-6 font-bold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          Aplicación Principal
                        </td>
                        {selectedMotorsData.map(motor => (
                          <td key={motor.motor_id} className="py-5 px-6 text-gray-900 text-sm font-medium leading-relaxed">
                            {motor.aplicacion_principal}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">C</span>
              </div>
              <span className="text-2xl font-black">Cummins</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">© 2024 Cummins Inc. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CumminsMotorsPage;