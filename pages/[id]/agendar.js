import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Car,
  Wrench,
  Phone,
  MapPin,
  AlertCircle,
} from "lucide-react";
import ConfirmationModal from "@/src/Components/Talleres/V3/ConfirmationModal";
import renderStars from "@/utils/renderStars";

  export const servicios = [
    "Electricos",
    "Frenos",
    "Motor",
    "Baterias",
    "Lujos",
    "Cambio de Aceite",
    "Clutch",
    "Accesorios y Lujos",
    "Aire acondicionado",
    "Alineación y balanceo",
    "Caja y transmisión",
    "Correas",
    "Direccion y suspensión",
    "Electronica",
    "Inyección",
    "Latonería y pintura",
    "Mecánico a domicilio",
    "Peritaje",
    "Sincronización",
    "Técnico Mecánica",
    "Taller Mecanico",
    "Mecánica Básica",
    "Mecánica Avanzada",
  ];

export default function BookingPage({ data: taller }) {
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    marca: "",
    referencia: "",
    servicios: "",
    descripcion: "",
    celular: "",
    indicativo: "+57",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const marcasVehiculos = [
    "Audi",
    "BMW",
    "Chery",
    "Chevrolet",
    "Citroën",
    "Fiat",
    "Ford",
    "Great Wall",
    "Haval",
    "Honda",
    "Hyundai",
    "Isuzu",
    "JAC",
    "Jeep",
    "Kia",
    "Land Rover",
    "Mazda",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Peugeot",
    "Porsche",
    "Renault",
    "Seat",
    "Skoda",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "Otra",
  ];

  const getDisplayDate = (dateValue) => {
    if (!dateValue) return "No seleccionada";
    const date = new Date(dateValue + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    if (
      !formData.date ||
      !formData.timeSlot ||
      !formData.servicios ||
      !formData.celular
    ) {
      alert("Por favor completa la fecha, hora, servicio y teléfono.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 0) {
        days.push(date);
      }
    }
    return days;
  };

  const getDateValue = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto sm:p-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Agendar Cita
          </h1>
          <p className="text-base sm:text-base text-gray-600">
            Completa el formulario para solicitar una revisión de tu vehículo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
          {/* Formulario */}
          <div className="w-full lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full border-0 sm:border sm:border-gray-200 px-4 py-6 sm:p-6 shadow-none sm:shadow-sm"
            >
              {/* Selección de Fecha */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <Calendar className="w-4 h-4" />
                  Selecciona el día
                </label>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="flex gap-2 px-4 sm:px-0 pb-2">
                    {getNextDays().map((date, index) => {
                      const dateValue = getDateValue(date);
                      const isSelected = formData.date === dateValue;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, date: dateValue })
                          }
                          className={`flex flex-col items-center px-4 py-3 border transition-colors min-w-[80px] flex-shrink-0 ${
                            isSelected
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium mb-1 ${
                              isSelected ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {date
                              .toLocaleDateString("es-ES", { weekday: "short" })
                              .toUpperCase()}
                          </span>
                          <span className="text-lg font-semibold">
                            {date.getDate()}
                          </span>
                          <span
                            className={`text-xs ${
                              isSelected ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {date.toLocaleDateString("es-ES", {
                              month: "short",
                            })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selección de Horario */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <Clock className="w-4 h-4" />
                  Selecciona el horario
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: "AM" })}
                    className={`py-4 px-4 border transition-colors text-left rounded-lg ${
                      formData.timeSlot === "AM"
                        ? "bg-gray-100 text-gray-900 border-gray-300"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium mb-1">Mañana</div>
                    <div
                      className={`text-xs ${
                        formData.timeSlot === "AM"
                          ? "text-gray-600"
                          : "text-gray-500"
                      }`}
                    >
                      8:00 AM - 12:00 PM
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: "PM" })}
                    className={`py-4 px-4 border transition-colors text-left rounded-lg ${
                      formData.timeSlot === "PM"
                        ? "bg-gray-100 text-gray-900 border-gray-300"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium mb-1">Tarde</div>
                    <div
                      className={`text-xs ${
                        formData.timeSlot === "PM"
                          ? "text-gray-600"
                          : "text-gray-500"
                      }`}
                    >
                      12:00 PM - 6:00 PM
                    </div>
                  </button>
                </div>
              </div>

              {/* Información del vehículo */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <Car className="w-4 h-4" />
                  Información del vehículo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Marca
                    </label>
                    <select
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-colors rounded-lg  "
                      required
                    >
                      <option value="">Selecciona la marca</option>
                      {marcasVehiculos.map((marca, index) => (
                        <option key={index} value={marca}>
                          {marca}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="referencia"
                      value={formData.referencia}
                      onChange={handleChange}
                      placeholder="Ej: Corolla, Spark"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de servicio */}
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

              {/* Problema */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  Describe el problema
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe con detalle lo que necesita tu vehículo..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none rounded-lg"
                  required
                />
              </div>

              {/* Contacto */}
              <div className="mb-8 w-full">
                <label className="text-base font-semibold text-gray-900 mb-4 block">
                  Información de contacto
                </label>
                <div className="w-full">
                  <label className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Phone className="w-3.5 h-3.5" />
                    Teléfono celular
                  </label>
                  <div className="flex w-full items-center gap-2">
                    <select
                      name="indicativo"
                      value={formData.indicativo || "+57"}
                      onChange={handleChange}
                      style={{maxWidth:'30%'}}
                      className="px-3 py-3 pr-8 border border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-colors rounded-lg w-24"
                    >
                      <option value="+57">+57</option>
                      <option value="+58">+58</option>
                    </select>

                    <input
                      type="tel"
                      name="celular"
                      value={formData.celular}
                      onChange={handleChange}
                      placeholder="300 123 4567"
                      className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
                      required
                      style={{flex:1, maxWidth:'70%'}}
                    />
                  </div>
                </div>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                className="w-full bg-[#407BFF] text-white font-semibold px-6 py-4 hover:bg-blue-600 transition-colors"
              >
                Enviar Solicitud por WhatsApp
              </button>
            </form>
          </div>

          <div className=" lg:block lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 sticky top-4 shadow-sm ">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Agendar cita con:
              </h3>

              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 bg-gray-100 overflow-hidden flex-shrink-0 rounded-lg">
                  <img
                    src={taller?.fotoperfil}
                    alt={taller.nombre}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider block mb-1">
                    {taller.tipo}
                  </span>
                  <h4 className="font-semibold text-gray-900 line-clamp-2 text-base">
                    {taller.nombre}
                  </h4>
                   {taller?.promediocalificacionesmaps > 0 && (
                    <div className="flex gap-1 mt-1">
                      <div className="flex gap-0.5">
                        {renderStars(Number(taller?.promediocalificacionesmaps))}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {taller?.promediocalificacionesmaps}
                      </span>
                    </div>
                  )}

                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-base">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{taller.direccion}</p>
                    <p className="text-gray-500">{taller.ciudad}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-base">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-900">
                    {taller.telefono.replace(
                      /(\+\d{2})(\d{3})(\d{3})(\d{4})/,
                      "$1 $2 $3 $4"
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 p-4 border-l-4 border-blue-500 rounded">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Nota:</strong> Esta es una
                    solicitud de cita. El taller se pondrá en contacto contigo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        taller={taller}
        getDisplayDate={getDisplayDate}
      />
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const parts = params?.id?.replace(/&/g, "");

  try {
    const { data } = await client.query({
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts },
      fetchPolicy: "network-only",
    });

    if (parts === "s&i_master_paint") {
      return {
        redirect: {
          destination: "/si_master_paint",
          permanent: false,
        },
      };
    }

    if (!data?.getOneNegocioVDos) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: data.getOneNegocioVDos,
      },
    };
  } catch (error) {
    console.error("Error en getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}
