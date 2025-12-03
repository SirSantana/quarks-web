import React, { useState } from 'react';
import { X, Phone, User, Wrench } from 'lucide-react';
import { servicios } from '@/pages/[id]/agendar';
import { useMutation } from '@apollo/client';
import { CREATE_SOLICITUD_SERVICIO } from '@/graphql/mutations';

export default function CallModal({ isOpen, onClose, taller }) {
  const [formData, setFormData] = useState({
    celular: '',
    indicativo: '+57',
    servicios:""
  });
const [createSolicitudServicio, { loading, data, error }] = useMutation(CREATE_SOLICITUD_SERVICIO, {
    onCompleted: () => {
      setTimeout(() => {
        onClose();
      }, 4000);
    }
  })
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCall = () => {
    // Validar que los campos estén completos
    if (!formData.servicios || !formData.celular) {
      alert('Por favor completa todos los campos');
      return;
    }
createSolicitudServicio({ variables: {...formData, servicios:[formData.servicios], almacen: taller.id, indicativo:formData?.indicativo ?formData.indicativo:'+57'} })


    // Realizar la llamada
    window.location.href = `tel:${taller.telefono}`;
    
    // Cerrar el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Llamar a {taller.nombre}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
           
<div className="mb-8">
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <Wrench className="w-4 h-4" />
                  Tipo de servicio
                </label>
                <select
                  name="servicios"
                  value={formData.servicios}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 border border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-colors rounded-lg  "
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio, index) => (
                    <option key={index} value={servicio}>
                      {servicio}
                    </option>
                  ))}
                </select>
              </div>
            {/* Teléfono */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Phone className="w-4 h-4 text-gray-500" />
                Tu número de teléfono
              </label>
              <div className="flex gap-2">
                <select
                  name="indicativo"
                  value={formData.indicativo}
                  onChange={handleChange}
                  className="px-3 py-3 pr-8 border border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-colors rounded-lg appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat text-base"
                >
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+58">🇻🇪 +58</option>
                </select>
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="300 123 4567"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-base"
                  required
                />
              </div>
            </div>

            {/* Info adicional */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">¿Por qué pedimos esto?</strong><br />
                Con tus datos, el taller podrá identificarte mejor y darte un servicio más personalizado.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCall}
            className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Llamar ahora
          </button>
        </div>
      </div>
    </div>
  );
}