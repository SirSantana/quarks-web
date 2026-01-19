import React, { useState } from 'react';
import { 
  Car, Wrench, AlertCircle, CheckCircle2, Loader2, ChevronRight, Info
} from 'lucide-react';

export default function DiagnosticoPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    problema: ''
  });
  const [diagnostico, setDiagnostico] = useState(null);

  const marcasAutos = [
    "Chevrolet", "Renault", "Mazda", "Nissan", "Toyota", "Hyundai", 
    "Kia", "Ford", "Volkswagen", "Honda", "Suzuki", "Mitsubishi",
    "Jeep", "Peugeot", "Fiat", "BMW", "Mercedes-Benz", "Audi", "Otra"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const canProceedStep1 = () => {
    return formData.marca !== '' && formData.modelo.trim() !== '' && formData.año !== '';
  };

  const canProceedStep2 = () => {
    return formData.problema.trim().length >= 20;
  };

  const handleContinue = () => {
    if (step === 1 && canProceedStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!canProceedStep2()) return;

    setLoading(true);

    // Simular llamada API con delay mínimo de 2 segundos
    const apiPromise = new Promise((resolve) => {
      setTimeout(() => {
        // Aquí iría tu llamada real a la API
        // const response = await fetch('/api/asistente', {...});
        
        // Simulación de respuesta
        const mockResponse = {
          preciosEstimados: [
            { item: "Pastillas de freno delanteras", precio: "$180.000 - $250.000" },
            { item: "Discos de freno", precio: "$300.000 - $450.000" },
            { item: "Mano de obra", precio: "$80.000 - $120.000" }
          ],
          serviciosRequeridos: ["Sistema de frenos", "Inspección de seguridad"],
          descripcionDetallada: "Basado en los síntomas descritos (ruido al frenar), el problema más probable está relacionado con el desgaste de las pastillas de freno. Es recomendable revisar también el estado de los discos de freno para garantizar un frenado seguro.",
          prioridad: "Media-Alta",
          tiempoEstimado: "2-3 horas"
        };
        
        resolve(mockResponse);
      }, 2000);
    });

    try {
      const data = await apiPromise;
      setDiagnostico(data);
      setStep(3);
    } catch (error) {
      alert('Ocurrió un error al procesar el diagnóstico. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ marca: '', modelo: '', año: '', problema: '' });
    setDiagnostico(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pb-24 md:pb-32 pt-8 md:pt-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Wrench className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
              Diagnóstico Inteligente
            </h1>
            <p className="text-blue-100 text-base md:text-lg">
              Obtén un diagnóstico preliminar y estimación de costos
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 md:gap-3 max-w-md mx-auto">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
              step >= 1 ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/20 text-white/60'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded transition-all ${step >= 2 ? 'bg-white' : 'bg-white/20'}`} />
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
              step >= 2 ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/20 text-white/60'
            }`}>
              2
            </div>
            <div className={`flex-1 h-1 rounded transition-all ${step >= 3 ? 'bg-white' : 'bg-white/20'}`} />
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
              step >= 3 ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/20 text-white/60'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-0 md:px-4 -mt-16 md:-mt-24 pb-8">
        {/* Desktop: Card with shadow, Mobile: No card */}
        <div className="md:bg-white md:rounded-2xl md:shadow-2xl">
          <div className="p-4 md:p-8">
            {/* Step 1: Vehicle Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Car className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Datos del Vehículo
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Ingresa la información de tu vehículo
                  </p>
                </div>

                <div className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Marca del vehículo
                    </label>
                    <select
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-base md:text-lg bg-white transition-all"
                    >
                      <option value="">Selecciona la marca</option>
                      {marcasAutos.map((marca, index) => (
                        <option key={index} value={marca}>{marca}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      placeholder="Ej: Spark, Logan, Mazda 3"
                      className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-base md:text-lg transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Año
                    </label>
                    <input
                      type="number"
                      name="año"
                      value={formData.año}
                      onChange={handleChange}
                      placeholder="Ej: 2020"
                      min="1990"
                      max="2026"
                      className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-base md:text-lg transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!canProceedStep1()}
                  className={`w-full font-semibold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base md:text-lg ${
                    canProceedStep1()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl active:scale-95'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continuar
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Problem Description */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Describe el Problema
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Cuéntanos los síntomas y detalles
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Qué le pasa a tu vehículo?
                  </label>
                  <textarea
                    name="problema"
                    value={formData.problema}
                    onChange={handleChange}
                    placeholder="Describe el problema, síntomas, ruidos o cualquier detalle relevante. Por ejemplo: 'El auto hace un ruido chirriante cuando freno, especialmente a altas velocidades.'"
                    rows="6"
                    className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-sm md:text-base resize-none transition-all"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs md:text-sm text-gray-500">
                      Mínimo 20 caracteres
                    </p>
                    <p className={`text-xs md:text-sm font-medium ${
                      formData.problema.length >= 20 ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {formData.problema.length} caracteres
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                        Tip para un mejor diagnóstico:
                      </p>
                      <p className="text-xs md:text-sm text-gray-700">
                        Menciona cuándo ocurre, qué ruidos escuchas y cualquier cambio en el comportamiento del vehículo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white text-blue-600 font-semibold py-3 md:py-4 rounded-xl hover:bg-blue-50 transition-all border-2 border-blue-600 active:scale-95"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceedStep2() || loading}
                    className={`flex-1 font-semibold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      canProceedStep2() && !loading
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl active:scale-95'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="hidden md:inline">Analizando...</span>
                        <span className="md:hidden">Cargando...</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden md:inline">Generar Diagnóstico</span>
                        <span className="md:hidden">Analizar</span>
                        <Wrench className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Diagnostic Results */}
            {step === 3 && diagnostico && (
              <div className="space-y-5 md:space-y-6">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Diagnóstico Generado
                  </h2>
                  <p className="text-sm md:text-base text-gray-500">
                    {formData.marca} {formData.modelo} {formData.año}
                  </p>
                </div>

                {/* Análisis del problema */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Análisis del Problema</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {diagnostico.descripcionDetallada}
                  </p>
                </div>

                {/* Servicios requeridos */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Servicios Requeridos</h3>
                  <div className="flex flex-wrap gap-2">
                    {diagnostico.serviciosRequeridos.map((servicio, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 border border-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium"
                      >
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Precios estimados */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Estimación de Costos</h3>
                  <div className="space-y-2">
                    {diagnostico.preciosEstimados.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <span className="text-gray-700 font-medium text-sm md:text-base">{item.item}</span>
                          <span className="text-blue-600 font-bold text-lg md:text-xl">{item.precio}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Precios aproximados que pueden variar según el taller
                  </p>
                </div>

                {/* Info adicional */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-1.5">Prioridad</p>
                    <p className="text-base md:text-lg font-bold text-gray-900">{diagnostico.prioridad}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-1.5">Tiempo Estimado</p>
                    <p className="text-base md:text-lg font-bold text-gray-900">{diagnostico.tiempoEstimado}</p>
                  </div>
                </div>

                {/* Botón para nuevo diagnóstico */}
                <button
                  onClick={resetForm}
                  className="w-full bg-blue-600 text-white font-semibold py-3 md:py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 mt-6"
                >
                  Realizar Nuevo Diagnóstico
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Help */}
        <div className="text-center mt-6 px-4 md:px-0">
          <p className="text-gray-600 text-xs md:text-sm">
            Este es un diagnóstico preliminar basado en IA. Para confirmación, consulta con un mecánico profesional.
          </p>
        </div>
      </div>
    </div>
  );
}