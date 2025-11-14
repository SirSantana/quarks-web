import React, { useState } from 'react';
import { Plus, X, Zap, Gauge, Settings, Weight, Droplet } from 'lucide-react';

const MotorComparator = ({ motors }) => {
  const [selectedMotors, setSelectedMotors] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  const addMotor = (motor) => {
    if (selectedMotors.length < 4 && !selectedMotors.find(m => m.motor_id === motor.motor_id)) {
      setSelectedMotors([...selectedMotors, motor]);
      setShowSelector(false);
    }
  };

  const removeMotor = (motorId) => {
    setSelectedMotors(selectedMotors.filter(m => m.motor_id !== motorId));
  };

  const availableMotors = motors.filter(
    motor => !selectedMotors.find(m => m.motor_id === motor.motor_id)
  );

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Comparador de Motores
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Compara hasta 4 motores lado a lado
          </p>
        </div>

        {/* Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, index) => {
            const motor = selectedMotors[index];
            
            if (!motor) {
              return (
                <button
                  key={index}
                  onClick={() => setShowSelector(true)}
                  className="group relative h-64 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-red-600 hover:bg-red-50 transition-all flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-gray-100 group-hover:bg-red-600 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Plus className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-500 group-hover:text-red-600">
                    Agregar Motor
                  </p>
                </button>
              );
            }

            return (
              <div
                key={motor.motor_id}
                className="relative h-64 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeMotor(motor.motor_id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Motor Image */}
                <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 relative">
                  <img
                    src={`${motor.images[0]}`}
                    alt={motor.nombre_modelo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Motor Info */}
                <div className="p-4">
                  <h3 className="text-lg font-black text-gray-900 mb-1 truncate">
                    {motor.nombre_modelo}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 truncate">
                    {motor.especificaciones_generales.configuracion}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-gray-500 font-semibold">Potencia</p>
                      <p className="font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_potencia_hp.split(' ')[0]} hp</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 font-semibold">Torque</p>
                      <p className="font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_torque_lb_ft.split(' ')[0]} lb-ft</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedMotors.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-black text-gray-900 sticky left-0 bg-gray-50 z-10">
                      Especificación
                    </th>
                    {selectedMotors.map(motor => (
                      <th key={motor.motor_id} className="text-left py-4 px-6 min-w-64">
                        <div className="font-black text-gray-900">{motor.nombre_modelo}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Potencia */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-red-600" />
                        <span>Potencia</span>
                      </div>
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 font-semibold text-gray-900">
                        <div>{motor.rendimiento_potencia_torque.rango_potencia_hp}</div>
                        <div className="text-sm text-gray-500">{motor.rendimiento_potencia_torque.rango_potencia_kw}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Torque */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-red-600" />
                        <span>Torque</span>
                      </div>
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 font-semibold text-gray-900">
                        <div>{motor.rendimiento_potencia_torque.rango_torque_nm}</div>
                        <div className="text-sm text-gray-500">{motor.rendimiento_potencia_torque.rango_torque_lb_ft}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Configuración */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-red-600" />
                        <span>Configuración</span>
                      </div>
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 font-semibold text-gray-900">
                        {motor.especificaciones_generales.configuracion}
                      </td>
                    ))}
                  </tr>

                  {/* Cilindrada */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      Cilindrada
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 font-semibold text-gray-900">
                        {motor.especificaciones_generales.cilindrada_litros}L ({motor.especificaciones_generales.cilindrada_pulgadas_cubicas} in³)
                      </td>
                    ))}
                  </tr>

                  {/* Peso */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      <div className="flex items-center space-x-2">
                        <Weight className="w-4 h-4 text-red-600" />
                        <span>Peso Seco</span>
                      </div>
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 font-semibold text-gray-900">
                        {motor.especificaciones_generales.peso_seco_kg} kg
                      </td>
                    ))}
                  </tr>

                  {/* Sistema de Combustible */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      Sistema de Combustible
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 text-sm text-gray-900">
                        {motor.especificaciones_generales.sistema_combustible}
                      </td>
                    ))}
                  </tr>

                  {/* Sistema de Aspiración */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      Sistema de Aspiración
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 text-sm text-gray-900">
                        {motor.especificaciones_generales.sistema_aspiracion}
                      </td>
                    ))}
                  </tr>

                  {/* Emisiones */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      Certificación Emisiones
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 text-sm text-gray-900">
                        {motor.especificaciones_generales.emisiones_certificacion}
                      </td>
                    ))}
                  </tr>

                  {/* Aplicación */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-700 sticky left-0 bg-white z-10">
                      Aplicación Principal
                    </td>
                    {selectedMotors.map(motor => (
                      <td key={motor.motor_id} className="py-4 px-6 text-sm text-gray-900">
                        {motor.aplicacion_principal}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Motor Selector Modal */}
        {showSelector && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">Selecciona un Motor</h3>
                  <p className="text-red-100 text-sm">Elige un motor para agregar a la comparación</p>
                </div>
                <button
                  onClick={() => setShowSelector(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid sm:grid-cols-2 gap-4">
                  {availableMotors.map(motor => (
                    <button
                      key={motor.motor_id}
                      onClick={() => addMotor(motor)}
                      className="group text-left bg-white border-2 border-gray-200 hover:border-red-600 rounded-2xl p-6 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-black text-gray-900 group-hover:text-red-600 transition-colors">
                          {motor.nombre_modelo}
                        </h4>
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                          <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{motor.especificaciones_generales.configuracion}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-gray-500 font-semibold">Potencia: </span>
                          <span className="font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_potencia_hp.split(' ')[0]} hp</span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-semibold">Torque: </span>
                          <span className="font-bold text-gray-900">{motor.rendimiento_potencia_torque.rango_torque_lb_ft.split(' ')[0]} lb-ft</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotorComparator;