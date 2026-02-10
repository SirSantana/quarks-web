import React, { useState } from 'react';
import { 
  Car, Wrench, AlertCircle, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Calendar, FileText
} from 'lucide-react';
import { useRouter } from 'next/router';

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    problema: ''
  });
  const [diagnostico, setDiagnostico] = useState(null);
  const [currentSlug, setCurrentSlug] = useState(null);

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

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.marca !== '';
      case 2: return formData.modelo.trim() !== '';
      case 3: return formData.año !== '';
      case 4: return formData.problema.trim().length >= 20;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setLoading(true);
    setStep(5);

    try {
      const res = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mensaje: `${formData.problema} ${formData.marca} ${formData.modelo} ${formData.año}`, 
          userId: null 
        }),
      });

      if (!res.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await res.json();

      if (data.slug) {
        const slugUrl = data.slug.toLowerCase();
        setCurrentSlug(slugUrl);
        router.push(`/diagnostico/${slugUrl}`, undefined, { shallow: true });
        startPolling(slugUrl);
      }
    } catch (error) {
      alert(`Ocurrió un error: ${error.message}`);
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (slug) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/diagnostico/${slug}`);
        if (!res.ok) {
          clearInterval(interval);
          return;
        }

        const data = await res.json();

        if (data.status === "done") {
          clearInterval(interval);
          setDiagnostico({
            diagnostico: data.diagnostico,
            servicios: data.servicios || [],
            precios: data.precios || [],
            prioridad: data.prioridad || "Media",
            tiempoEstimado: data.tiempo_estimado || "1-2 horas"
          });
        }

        if (data.status === "error") {
          clearInterval(interval);
          alert("Error al generar el diagnóstico");
          setStep(1);
        }
      } catch (err) {
        clearInterval(interval);
      }
    }, 3000);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ marca: '', modelo: '', año: '', problema: '' });
    setDiagnostico(null);
    setCurrentSlug(null);
    router.push('/diagnostico', undefined, { shallow: true });
  };

  const stepTitles = {
    1: "¿Cuál es la marca de tu vehículo?",
    2: "¿Qué modelo es?",
    3: "¿De qué año?",
    4: "Describe el problema"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      {step <= 4 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center md:p-4 pt-8">
        <div className="w-full max-w-2xl">
          {/* Logo/Header */}
          {step <= 4 && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">
                Paso {step} de 4
              </p>
            </div>
          )}

          {/* Step 1: Marca */}
          {step === 1 && (
            <div className=" md:bg-white md:rounded-3xl md:shadow-xl p-6 md:p-12">
              <div className="mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <Car className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {stepTitles[1]}
                </h1>
                <p className="text-gray-600">
                  Selecciona la marca de tu vehículo
                </p>
              </div>

              <div className="space-y-3">
                {marcasAutos.map((marca) => (
                  <button
                    key={marca}
                    onClick={() => {
                      setFormData({ ...formData, marca });
                      setTimeout(handleNext, 150);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all hover:border-blue-600 hover:bg-blue-50 ${
                      formData.marca === marca
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-900">{marca}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Modelo */}
          {step === 2 && (
            <div className="md:bg-white md:rounded-3xl md:shadow-xl p-6 md:p-12">
              <div className="mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <Car className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {stepTitles[2]}
                </h1>
                <p className="text-gray-600">
                  Ingresa el modelo de tu {formData.marca}
                </p>
              </div>

              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                placeholder="Ej: Spark, Logan, Mazda 3..."
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-6"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-6 py-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    canProceed()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Año */}
          {step === 3 && (
            <div className="md:bg-white md:rounded-3xl md:shadow-xl p-6 md:p-12">
              <div className="mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {stepTitles[3]}
                </h1>
                <p className="text-gray-600">
                  El año de fabricación de tu {formData.marca} {formData.modelo}
                </p>
              </div>

              <input
                type="number"
                name="año"
                value={formData.año}
                onChange={handleChange}
                onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                placeholder="2020"
                min="1990"
                max="2026"
                className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-6"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-6 py-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    canProceed()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Problema */}
          {step === 4 && (
            <div className="md:bg-white md:rounded-3xl md:shadow-xl p-6 md:p-12">
              <div className="mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {stepTitles[4]}
                </h1>
                <p className="text-gray-600">
                  Cuéntanos qué está pasando con tu vehículo
                </p>
              </div>

              <textarea
                name="problema"
                value={formData.problema}
                onChange={handleChange}
                placeholder="Ej: Mi auto hace un ruido extraño al frenar, especialmente cuando voy en bajada..."
                rows="6"
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none mb-3"
                autoFocus
              />

              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">Mínimo 20 caracteres</p>
                <p className={`text-sm font-medium ${
                  formData.problema.length >= 20 ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {formData.problema.length}/20
                </p>
              </div>

              {/* Resumen */}
              {formData.problema.length >= 20 && (
                <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Resumen</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehículo:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.marca} {formData.modelo} {formData.año}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-6 py-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    canProceed() && !loading
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      Obtener Diagnóstico
                      <Wrench className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Loading/Results */}
          {step === 5 && (
            <div className="md:bg-white md:rounded-3xl md:shadow-xl p-6 md:p-12">
              {!diagnostico ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Analizando tu vehículo
                  </h2>
                  <p className="text-gray-600">
                    Esto puede tardar unos segundos...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Diagnóstico Completo
                    </h2>
                    <p className="text-gray-600">
                      {formData.marca} {formData.modelo} {formData.año}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Análisis</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {diagnostico.diagnostico}
                    </p>
                  </div>

                  {diagnostico.servicios.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Servicios</h3>
                      <div className="flex flex-wrap gap-2">
                        {diagnostico.servicios.map((servicio, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                            {servicio}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {diagnostico.precios.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Costos</h3>
                      <div className="space-y-2">
                        {diagnostico.precios.map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-700">{item.item}</span>
                            <span className="font-bold text-blue-600">{item.precio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={resetForm}
                    className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Nuevo Diagnóstico
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {step <= 4 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Diagnóstico preliminar con IA • Consulta un profesional para confirmación
            </p>
          )}
        </div>
      </div>
    </div>
  );
}