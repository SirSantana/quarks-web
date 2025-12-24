import React from 'react';
import { X, Calendar, Clock, Car, Wrench, MessageSquare, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_SOLICITUD_SERVICIO } from '@/graphql/mutations';
import { useRouter } from 'next/router';

export default function ConfirmationModal({ isOpen, onClose, formData, taller, getDisplayDate }) {
    const router = useRouter()
  if (!isOpen) return null;
    const [createSolicitudServicio, { loading, data, error }] = useMutation(CREATE_SOLICITUD_SERVICIO, {
    onCompleted: () => {
      setTimeout(() => {
        router.back()
      }, 4000);
    }
  })
  const handleConfirm = () => {
    // Construir mensaje de WhatsApp
createSolicitudServicio({ variables: {...formData, servicios:[formData.servicios], almacen: taller.id, indicativo:formData?.indicativo ?formData.indicativo:'+57', } })

    const mensaje = `¡Hola! Me gustaría agendar una cita en ${taller.nombre}

📅 *Fecha:* ${getDisplayDate(formData.date)}
⏰ *Horario:* ${formData.timeSlot === 'AM' ? 'Mañana (8:00 AM - 12:00 PM)' : 'Tarde (12:00 PM - 6:00 PM)'}
🚗 *Vehículo:* ${formData.marca} ${formData.referencia}
🔧 *Servicio:* ${formData.servicios}
📝 *Descripción:* ${formData.descripcion}
📞 *Celular:* +${formData.indicativo} ${formData.celular}


¿Tienen disponibilidad para esta fecha?`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=57${taller.whatsapp.replaceAll(' ', '')}&text=${encodeURI(mensaje)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl max-h-[100vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Confirmar Solicitud de Cita
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info del Taller */}
          <div className="bg-gray-50 border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
              <Building2 className="w-4 h-4" />
              <span>Agendar con</span>
            </div>
            <div className="flex items-start gap-4">
                <img
                  src={taller.fotoperfil}
                  alt={taller.nombre}
                  className=" object-cover p-2 w-16 h-16 rounded-full"
                />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{taller.nombre}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{taller.direccion}, {taller.ciudad}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la Cita */}
          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Detalles de tu cita
            </h3>

            {/* Fecha */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Fecha</p>
                <p className="font-medium text-gray-900">{getDisplayDate(formData.date)}</p>
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Horario</p>
                <p className="font-medium text-gray-900">
                  {formData.timeSlot === 'AM' 
                    ? 'Mañana (8:00 AM - 12:00 PM)' 
                    : 'Tarde (12:00 PM - 6:00 PM)'}
                </p>
              </div>
            </div>

            {/* Vehículo */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <Car className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Vehículo</p>
                <p className="font-medium text-gray-900">
                  {formData.marca} {formData.referencia}
                </p>
              </div>
            </div>

            {/* Servicio */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <Wrench className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Servicio</p>
                <p className="font-medium text-gray-900">{formData.servicios}</p>
              </div>
            </div>

            {/* Descripción */}
            {formData.descripcion && (
              <div className="flex items-start gap-3 py-3 border-b border-gray-100">
                <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">Descripción del problema</p>
                  <p className="text-sm text-gray-900 leading-relaxed">{formData.descripcion}</p>
                </div>
              </div>
            )}

            {/* Teléfono */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Teléfono</p>
                <p className="font-medium text-gray-900">{formData.indicativo} {formData.celular}</p>
              </div>
            </div>

            {/* Email */}
            {formData.email && (
              <div className="flex items-start gap-3 py-3 border-b border-gray-100">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{formData.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Nota Informativa */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              Al confirmar, se abrirá WhatsApp con un mensaje predefinido para enviar al taller. 
              El taller revisará tu solicitud y te confirmará la disponibilidad.
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="sm:flex-1 bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="sm:flex-[2] bg-[#407BFF] text-white font-medium px-6 py-4 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}