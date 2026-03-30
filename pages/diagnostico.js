import React, { useState } from 'react';
import { Car, Wrench, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Calendar, FileText } from 'lucide-react';
import { useRouter } from 'next/router';

const marcasAutos = [
  "Chevrolet", "Renault", "Mazda", "Nissan", "Toyota", "Hyundai",
  "Kia", "Ford", "Volkswagen", "Honda", "Suzuki", "Mitsubishi",
  "Jeep", "Peugeot", "Fiat", "BMW", "Mercedes-Benz", "Audi", "Otra"
];

// ─── Small shared components ────────────────────────────────────────────────
function StepLabel({ current, total }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400 mb-2">
      Paso {current} de {total}
    </p>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Continuar", disabled = false, loading = false, showBack = true }) {
  return (
    <div className="flex gap-3 mt-8">
      {showBack && (
        <button
          onClick={onBack}
          className="px-4 py-2.5 text-[13px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={onNext}
        disabled={disabled || loading}
        className={`flex-1 py-2.5 text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-opacity ${
          disabled || loading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-[#407BFF] text-white hover:opacity-90'
        }`}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Analizando…</>
        ) : (
          <>{nextLabel} <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────
export default function DiagnosticoPage() {
  const router = useRouter();
  const [step,        setStep]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [diagnostico, setDiagnostico] = useState(null);
  const [formData,    setFormData]    = useState({ marca: '', modelo: '', año: '', problema: '' });

  const set = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const canProceed = () => {
    if (step === 1) return formData.marca !== '';
    if (step === 2) return formData.modelo.trim() !== '';
    if (step === 3) return formData.año !== '';
    if (step === 4) return formData.problema.trim().length >= 20;
    return false;
  };
  const handleSubmit = async () => {
    if (!canProceed()) return;
    setLoading(true);
    setStep(5);
    try {
      const res = await fetch('/api/asistentelite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: `${formData.problema} ${formData.marca} ${formData.modelo} ${formData.año}`, userId: null }),
      });
      if (!res.ok) throw new Error('Error al procesar la solicitud');
      const data = await res.json();
      if (data.slug) {
        const slug = data.slug.toLowerCase();
        router.push(`/diagnostico/${slug}`, undefined, { shallow: true });
        const iv = setInterval(async () => {
          try {
            const r = await fetch(`/api/diagnostico/${slug}`);
            const d = await r.json();
            if (d.status === 'done') {
              clearInterval(iv);
              setDiagnostico({ diagnostico: d.diagnostico, servicios: d.servicios || [], precios: d.precios || [] });
            }
            if (d.status === 'error') { clearInterval(iv); alert('Error al generar el diagnóstico'); setStep(1); }
          } catch { clearInterval(iv); }
        }, 3000);
      }
    } catch (err) {
      alert(`Ocurrió un error: ${err.message}`);
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setFormData({ marca: '', modelo: '', año: '', problema: '' });
    setDiagnostico(null); router.push('/diagnostico', undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Top progress bar ─────────────────────────────────────────── */}
      {step <= 4 && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
          <div
            className="h-full bg-[#407BFF] transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {/* ── Header strip ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-sm:px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#407BFF] rounded-lg flex items-center justify-center">
            <Wrench className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold text-gray-900">Quarks</span>
        </div>
        {step <= 4 && (
          <span className="text-[12px] text-gray-400">
            {step} / 4
          </span>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center px-6 py-12 max-sm:px-4 max-sm:py-8">
        <div className="w-full max-w-[480px]">

          {/* STEP 1 — Marca */}
          {step === 1 && (
            <div>
              <StepLabel current={1} total={4} />
              <h1 className="text-[28px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
                ¿Cuál es la marca?
              </h1>
              <p className="text-[14px] text-gray-400 mb-8">Selecciona la marca de tu vehículo.</p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {marcasAutos.map((marca) => (
                  <button
                    key={marca}
                    onClick={() => { set('marca', marca); setTimeout(() => setStep(2), 120); }}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all ${
                      formData.marca === marca
                        ? 'border-[#407BFF] bg-[#eef2ff] text-[#407BFF]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={`/${marca}.webp`}
                      alt={marca}
                      className="w-6 h-6 object-contain opacity-70 shrink-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-[13px] font-medium truncate">{marca}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Modelo */}
          {step === 2 && (
            <div>
              <StepLabel current={2} total={4} />
              <h1 className="text-[28px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
                ¿Qué modelo es?
              </h1>
              <p className="text-[14px] text-gray-400 mb-8">
                Ingresa el modelo de tu <span className="font-semibold text-gray-600">{formData.marca}</span>.
              </p>

              <input
                type="text"
                value={formData.modelo}
                onChange={(e) => set('modelo', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && setStep(3)}
                placeholder="Ej: Spark, Logan, Corolla…"
                autoFocus
                className="w-full px-4 py-3 text-[15px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
              />

              <NavButtons
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
                disabled={!canProceed()}
              />
            </div>
          )}

          {/* STEP 3 — Año */}
          {step === 3 && (
            <div>
              <StepLabel current={3} total={4} />
              <h1 className="text-[28px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
                ¿De qué año?
              </h1>
              <p className="text-[14px] text-gray-400 mb-8">
                Año de tu <span className="font-semibold text-gray-600">{formData.marca} {formData.modelo}</span>.
              </p>

              <input
                type="number"
                value={formData.año}
                onChange={(e) => set('año', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && setStep(4)}
                placeholder="2020"
                min="1990"
                max="2026"
                autoFocus
                className="w-full px-4 py-3 text-[15px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <NavButtons
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
                disabled={!canProceed()}
              />
            </div>
          )}

          {/* STEP 4 — Problema */}
          {step === 4 && (
            <div>
              <StepLabel current={4} total={4} />
              <h1 className="text-[28px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
                Describe el problema
              </h1>
              <p className="text-[14px] text-gray-400 mb-8">
                Cuéntanos qué está pasando con tu vehículo.
              </p>

              <textarea
                value={formData.problema}
                onChange={(e) => set('problema', e.target.value)}
                placeholder="Ej: Mi auto hace un ruido extraño al frenar, especialmente cuando voy en bajada…"
                rows={5}
                autoFocus
                className="w-full px-4 py-3 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors resize-none leading-relaxed"
              />

              {/* Char counter */}
              <div className="flex items-center justify-between mt-1.5 mb-5">
                <span className="text-[12px] text-gray-400">Mínimo 20 caracteres</span>
                <span className={`text-[12px] font-medium tabular-nums ${formData.problema.length >= 20 ? 'text-[#407BFF]' : 'text-gray-300'}`}>
                  {formData.problema.length} / 20
                </span>
              </div>

              {/* Summary chip */}
              {formData.problema.length >= 20 && (
                <div className="flex items-center gap-3 py-3 border-t border-gray-100 mb-1">
                  <img
                    src={`/${formData.marca}.webp`}
                    alt={formData.marca}
                    className="w-8 h-8 object-contain opacity-60"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                      {formData.marca} {formData.modelo} {formData.año}
                    </p>
                    <p className="text-[11px] text-gray-400">Listo para analizar</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#407BFF] ml-auto shrink-0" />
                </div>
              )}

              <NavButtons
                onBack={() => setStep(3)}
                onNext={handleSubmit}
                nextLabel="Obtener diagnóstico"
                disabled={!canProceed()}
                loading={loading}
              />
            </div>
          )}

          {/* STEP 5 — Loading / Result */}
          {step === 5 && (
            <div>
              {!diagnostico ? (
                <div className="pt-8 text-center">
                  <Loader2 className="w-8 h-8 text-[#407BFF] animate-spin mx-auto mb-6" />
                  <h2 className="text-[22px] font-bold text-gray-950 tracking-tight mb-2">
                    Analizando tu vehículo
                  </h2>
                  <p className="text-[14px] text-gray-400">Esto puede tardar unos segundos…</p>
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                    <img
                      src={`/${formData.marca}.webp`}
                      alt={formData.marca}
                      className="w-8 h-8 object-contain opacity-50"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <p className="text-[13px] font-semibold text-gray-600">
                      {formData.marca} {formData.modelo} {formData.año}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Done header */}
                  <div className="flex items-center gap-2.5 mb-8 pb-6 border-b border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#407BFF] shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400">Diagnóstico completo</p>
                      <p className="text-[15px] font-bold text-gray-900">{formData.marca} {formData.modelo} {formData.año}</p>
                    </div>
                  </div>

                  {/* Análisis */}
                  <section className="mb-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">Análisis</p>
                    <p className="text-[15px] text-gray-600 leading-[1.75]">{diagnostico.diagnostico}</p>
                  </section>

                  {/* Servicios */}
                  {diagnostico.servicios.length > 0 && (
                    <section className="mb-8 pt-6 border-t border-gray-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">Servicios</p>
                      <div className="flex flex-wrap gap-1.5">
                        {diagnostico.servicios.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[12px] font-medium rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Costos */}
                  {diagnostico.precios.length > 0 && (
                    <section className="mb-8 pt-6 border-t border-gray-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">Costos estimados</p>
                      <div>
                        {diagnostico.precios.map((item, i) => (
                          <div key={i} className="flex justify-between items-baseline py-2.5 border-b border-gray-100 last:border-0 gap-4">
                            <span className="text-[14px] text-gray-600">{item.item}</span>
                            <span className="text-[14px] font-semibold text-gray-900 shrink-0">{item.precio}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="pt-6 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 py-2.5 text-[13px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Nuevo diagnóstico
                    </button>
                    <button
                      onClick={() => router.push('/diagnosticos')}
                      className="flex-1 py-2.5 text-[13px] font-semibold bg-[#407BFF] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          {step <= 4 && (
            <p className="text-center text-[12px] text-gray-400 mt-8">
              Diagnóstico preliminar con IA · Consulta un profesional para confirmación
            </p>
          )}

        </div>
      </div>
    </div>
  );
}