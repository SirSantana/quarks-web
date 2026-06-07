"use client";

import { useState } from "react";

/* ================== UTIL ================== */
function generateSlugFromText(text) {
  return text
    .toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

/* ================== STEP INDICATOR ================== */
const STEPS_CONFIG = [
  { number: 1, label: "Inicio rápido" },
  { number: 2, label: "Describe el problema" },
  { number: 3, label: "IA entiende" },
  { number: 4, label: "Detalles rápidos" },
  { number: 5, label: "Diagnóstico instantáneo" },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="w-full bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Desktop: horizontal steps */}
        <div className="hidden sm:flex items-start justify-between relative">
          {STEPS_CONFIG.map((s, i) => (
            <div key={s.number} className="flex flex-col items-center flex-1 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1.5 transition-all duration-300
                ${currentStep > s.number ? "bg-blue-600 text-white" :
                  currentStep === s.number ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-gray-100 text-gray-400"}`}>
                {currentStep > s.number ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.number}
              </div>
              <span className={`text-[10px] text-center leading-tight max-w-[72px] font-medium
                ${currentStep >= s.number ? "text-blue-600" : "text-gray-400"}`}>
                {s.label}
              </span>
              {i < STEPS_CONFIG.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 transition-all duration-500
                  ${currentStep > s.number ? "bg-blue-600" : "bg-gray-200"}`}
                  style={{ left: "50%", width: "100%" }} />
              )}
            </div>
          ))}
        </div>
        {/* Mobile: compact step */}
        <div className="flex sm:hidden items-center gap-3">
          <div className="flex gap-1">
            {STEPS_CONFIG.map((s) => (
              <div key={s.number} className={`h-1.5 rounded-full transition-all duration-300
                ${currentStep >= s.number ? "bg-blue-600 w-6" : "bg-gray-200 w-3"}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Paso {currentStep} de {STEPS_CONFIG.length} · {STEPS_CONFIG[currentStep - 1]?.label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================== LISTENING ================== */
function ListeningPulse() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-blue-100 animate-ping opacity-30" />
        <div className="absolute w-20 h-20 rounded-full bg-blue-100 animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border border-blue-100">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C10.34 2 9 3.34 9 5v6c0 1.66 1.34 3 3 3s3-1.34 3-3V5c0-1.66-1.34-3-3-3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08C16.39 17.43 19 14.53 19 11h-2z"/>
          </svg>
        </div>
      </div>
      {/* Waveform bars */}
      <div className="flex items-end gap-1 h-10">
        {[3,5,8,6,9,7,4,8,5,3,7,5,9,6,4].map((h, i) => (
          <div key={i}
            className="w-1 bg-blue-400 rounded-full animate-pulse"
            style={{ height: `${h * 4}px`, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      <p className="text-gray-700 font-semibold text-base">Cuéntanos el problema</p>
      <p className="text-gray-400 text-sm text-center">Habla con naturalidad, la IA te entiende</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        00:08
      </div>
    </div>
  );
}

/* ================== ANALYZING ================== */
function AnalyzingView({ symptoms }) {
  return (
    <div className="flex flex-col items-center py-12 px-8 gap-5">
      {/* Glowing orb */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-30 animate-pulse scale-125" />
        <div className="relative w-20 h-20 rounded-full shadow-xl"
          style={{ background: "radial-gradient(circle at 35% 35%, #93C5FD, #2563EB 75%)",
            animation: "orbFloat 2.5s ease-in-out infinite" }} />
      </div>
      <h3 className="text-gray-900 font-bold text-lg text-center">Entendiendo tu problema</h3>

      {symptoms.length > 0 && (
        <div className="w-full max-w-xs bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">He identificado esto:</p>
          {symptoms.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-2 rounded-xl mb-2">
              <span className="text-blue-500">🔍</span> {s}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
        Analizando posibles causas...
      </div>
    </div>
  );
}

/* ================== DYNAMIC QUESTIONS ================== */
function QuickQuestions({ aiMessage, questions, answers, onAnswer, onSubmit, submitting }) {
  const answered = Object.keys(answers).length;
  const total = questions.length;
  const allAnswered = answered === total && total > 0;

  return (
    <div className="p-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
        </svg>
        Unas preguntas rápidas
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (answered / total) * 100 : 0}%` }} />
        </div>
        <span className="text-xs text-gray-400 font-medium shrink-0">{answered}/{total}</span>
      </div>

      {/* AI Message bubble */}
      {aiMessage && (
        <div className="flex gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a2 2 0 012 2c0 .74-.4 1.387-1 1.731V7h1a7 7 0 017 7h1a1 1 0 110 2h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 110-2h1a7 7 0 017-7h1V5.731A2 2 0 0110 4a2 2 0 012-2z"/>
            </svg>
          </div>
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-sm text-gray-700 leading-relaxed">{aiMessage}</p>
          </div>
        </div>
      )}

      {/* Questions */}
      {questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-3">{q.pregunta}</p>
          <div className="flex flex-wrap gap-2">
            {q.opciones.map((opt) => {
              const selected = answers[qi] === opt;
              return (
                <button key={opt} onClick={() => onAnswer(qi, opt)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border
                    ${selected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"}`}>
                  {selected && <span className="mr-1.5">✓</span>}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button onClick={onSubmit} disabled={submitting || !allAnswered}
        className={`w-full py-3.5 rounded-2xl text-base font-bold text-white transition-all duration-200
          ${allAnswered && !submitting
            ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Analizando...
          </span>
        ) : "Ver diagnóstico →"}
      </button>
    </div>
  );
}

/* ================== PROB BAR ================== */
function ProbBar({ pct }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
      <div className="h-full bg-blue-600 rounded-full transition-all duration-700"
        style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ================== DIAGNOSIS RESULT ================== */
function DiagnosisResult({ brand, model, data, onReset }) {
  const [tab, setTab] = useState("causas");
  const tabs = [
    { id: "causas", label: "Causas", icon: "🔍" },
    { id: "pruebas", label: "Pruebas", icon: "🧪" },
    { id: "soluciones", label: "Soluciones", icon: "🔧" },
    { id: "talleres", label: "Talleres", icon: "📍" },
    { id: "guardar", label: "¿Qué sigue?", icon: "💾" },
  ];
  const totalMin = data.solucionesCostos?.reduce((a, s) => a + s.precioMin, 0) || 0;
  const totalMax = data.solucionesCostos?.reduce((a, s) => a + s.precioMax, 0) || 0;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Diagnóstico listo</h2>
            <p className="text-sm text-gray-500">{brand} {model}</p>
          </div>
        </div>
        {/* Summary message */}
        {data.message && (
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 mb-4">
            {data.message}
          </p>
        )}
        {/* Price card */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3.5 flex justify-between items-center">
          <div>
            <p className="text-xs text-emerald-700 font-medium mb-0.5">Costo estimado</p>
            <p className="text-xl font-bold text-emerald-800">
              ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
              <span className="text-sm font-semibold ml-1">COP</span>
            </p>
          </div>
          <div className="text-2xl">💰</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide px-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 py-3 text-xs font-semibold transition-all duration-150 border-b-2 whitespace-nowrap
              ${tab === t.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"}`}>
            <span className="mr-1">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-5 py-5 min-h-52">

        {/* CAUSAS */}
        {tab === "causas" && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Causas más probables</p>
            {(data.causasProbables || []).map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-gray-900 flex-1 pr-2">{i + 1}. {c.causa}</p>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
                    {c.probabilidad}%
                  </span>
                </div>
                <ProbBar pct={c.probabilidad} />
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{c.explicacion}</p>
              </div>
            ))}
            {data.sintomasIdentificados?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Síntomas identificados</p>
                <div className="flex flex-wrap gap-2">
                  {data.sintomasIdentificados.map((s, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-100">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRUEBAS */}
        {tab === "pruebas" && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Pruebas recomendadas para confirmar</p>
            {(data.pruebasRecomendadas || []).map((p, i) => (
              <div key={i} className="flex gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {p.id || i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1">{p.nombre}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{p.descripcion}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                    ${p.prioridad === "Importante" ? "bg-amber-100 text-amber-700" :
                      p.prioridad === "Recomendado" ? "bg-blue-50 text-blue-600" :
                      "bg-gray-100 text-gray-500"}`}>
                    + {p.prioridad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SOLUCIONES */}
        {tab === "soluciones" && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Soluciones sugeridas y costos estimados</p>
            {(data.solucionesCostos || []).map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                {i === 0 && (
                  <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                    Solución más recomendada
                  </span>
                )}
                <p className="text-sm font-bold text-gray-900 mb-2">{s.item}</p>
                <p className="text-xs text-gray-500 mb-1">Costo estimado</p>
                <p className="text-base font-bold text-gray-900">
                  ${s.precioMin?.toLocaleString()} – ${s.precioMax?.toLocaleString()}
                  <span className="text-xs font-semibold text-gray-500 ml-1">COP</span>
                </p>
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Tiempo aprox. {s.tiempoEstimado}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TALLERES */}
        {tab === "talleres" && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Talleres cercanos</p>
              <button className="text-xs text-blue-600 font-semibold">Cambiar →</button>
            </div>
            {[
              { nombre: "AutoFix Premium", especialidad: "Especialistas en encendido", rating: 4.8, reviews: 128, dist: "1.2 km" },
              { nombre: "Mecánica Total", especialidad: "Electricidad y diagnóstico", rating: 4.6, reviews: 95, dist: "2.1 km" },
              { nombre: "Taller del Valle", especialidad: "Diagnóstico multimarca", rating: 4.5, reviews: 72, dist: "2.8 km" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3.5 border border-gray-100 mb-2.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">🔧</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{t.nombre}</p>
                  <p className="text-xs text-gray-500 truncate">{t.especialidad}</p>
                  <p className="text-xs text-gray-400 mt-0.5">⭐ {t.rating} ({t.reviews}) · 📍 {t.dist}</p>
                </div>
                <button className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 hover:bg-blue-700 transition-colors">
                  Ver →
                </button>
              </div>
            ))}
            <button className="w-full mt-2 py-2.5 border border-blue-200 text-blue-600 text-sm font-semibold rounded-2xl hover:bg-blue-50 transition-colors">
              Ver más talleres
            </button>
          </div>
        )}

        {/* QUÉ SIGUE */}
        {tab === "guardar" && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">¿Qué quieres hacer ahora?</p>
            {[
              { icon: "💾", title: "Guardar diagnóstico", desc: "Guarda este diagnóstico en tu historial", action: null },
              { icon: "🔄", title: "Seguir sin guardar", desc: "Realizar otro diagnóstico sin guardar este resultado", action: onReset },
            ].map((item, i) => (
              <button key={i} onClick={item.action}
                className="w-full flex items-center justify-between gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl p-4 text-left transition-all duration-150">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
            <p className="text-xs text-center text-gray-400 mt-4">
              🔒 No necesitas registrar tu auto para obtener diagnósticos
            </p>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-5 pb-5 pt-2 border-t border-gray-50">
        <button onClick={onReset}
          className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold text-sm rounded-2xl hover:bg-blue-50 transition-all duration-150 active:scale-[0.98]">
          + Nuevo diagnóstico
        </button>
      </div>
    </div>
  );
}

/* ================== MAIN ================== */
export default function DiagnosticChat() {
  const [flow, setFlow] = useState("home");
  const [uiStep, setUiStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [slug, setSlug] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [aiMessage, setAiMessage] = useState("");
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [inputBrand, setInputBrand] = useState("");
  const [inputModel, setInputModel] = useState("");
  const [inputProblem, setInputProblem] = useState("");
  const [homeStep, setHomeStep] = useState("brand");

  const callAPI = async (conv) => {
    const res = await fetch("/api/diagnostico/diagnostic-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, brand, model, conversation: conv }),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Error"); }
    return res.json();
  };

  const handleProblem = async () => {
    if (!inputProblem.trim()) return;
    const txt = inputProblem.trim();
    setProblem(txt);
    const s = generateSlugFromText(txt);
    setSlug(s);
    setFlow("listening"); setUiStep(2);
    await new Promise(r => setTimeout(r, 1800));
    setFlow("analyzing"); setUiStep(3);
    const initialConv = [{ role: "user", content: txt }];
    setConversation(initialConv);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const data = await callAPI(initialConv);
      if (data.isFinal) { setDiagnosisData(data); setFlow("result"); setUiStep(5); }
      else { setAiMessage(data.message); setDynamicQuestions(data.preguntasSeguimiento || []); setAnswers({}); setFlow("questions"); setUiStep(4); }
    } catch (err) { alert("Error: " + err.message); setFlow("home"); setUiStep(1); }
  };

  const handleAnswer = (qi, val) => setAnswers(p => ({ ...p, [qi]: val }));

  const handleSubmitAnswers = async () => {
    setSubmitting(true);
    const answersText = dynamicQuestions.map((q, i) => `${q.pregunta}: ${answers[i]}`).join(". ");
    const updatedConv = [...conversation, { role: "assistant", content: aiMessage }, { role: "user", content: answersText }];
    setConversation(updatedConv);
    try {
      const data = await callAPI(updatedConv);
      if (data.isFinal) { setDiagnosisData(data); setFlow("result"); setUiStep(5); }
      else { setAiMessage(data.message); setDynamicQuestions(data.preguntasSeguimiento || []); setAnswers({}); }
    } catch (err) { alert("Error: " + err.message); }
    setSubmitting(false);
  };

  const handleReset = () => {
    setFlow("home"); setUiStep(1); setHomeStep("brand");
    setInputBrand(""); setInputModel(""); setInputProblem("");
    setBrand(""); setModel(""); setProblem(""); setSlug(null);
    setConversation([]); setAiMessage(""); setDynamicQuestions([]);
    setAnswers({}); setDiagnosisData(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes orbFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-slate-50">
        {/* Top header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="max-w-2xl mx-auto px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">FLUJO RÁPIDO · Sin registrar tu auto</p>
              <p className="text-xs text-gray-400 leading-tight">Diagnóstico inmediato en menos de 1 minuto</p>
            </div>
          </div>
        </div>

        <StepIndicator currentStep={uiStep} />

        {/* Main card */}
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            key={flow + (dynamicQuestions.length > 0 ? dynamicQuestions[0]?.pregunta : "")}>

            {/* HOME */}
            {flow === "home" && (
              <div className="p-6">
                {homeStep === "brand" && (
                  <>
                    <div className="text-center mb-7">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 text-3xl">🚗</div>
                      <h1 className="text-2xl font-extrabold text-gray-900 mb-1.5">¿Qué problema<br />tiene tu vehículo?</h1>
                      <p className="text-gray-500 text-sm">Obtén un diagnóstico rápido en segundos</p>
                    </div>

                    {/* Quick entry card */}
                    <div className="bg-blue-600 rounded-2xl p-4 mb-5 flex items-center gap-3 cursor-pointer hover:bg-blue-700 transition-colors">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C10.34 2 9 3.34 9 5v6c0 1.66 1.34 3 3 3s3-1.34 3-3V5c0-1.66-1.34-3-3-3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08C16.39 17.43 19 14.53 19 11h-2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Diagnóstico rápido</p>
                        <p className="text-blue-200 text-xs">Habla sobre el problema y obtén respuestas al instante</p>
                      </div>
                      <svg className="w-4 h-4 text-white ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cuál es la marca del vehículo?</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all mb-4"
                      placeholder="Ej. Toyota, Chevrolet, Renault..."
                      value={inputBrand} onChange={e => setInputBrand(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && inputBrand.trim() && (setBrand(inputBrand.trim()), setHomeStep("model"))}
                      autoFocus />
                    <button onClick={() => { if (inputBrand.trim()) { setBrand(inputBrand.trim()); setHomeStep("model"); } }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-[0.98] shadow-lg shadow-blue-200">
                      Continuar →
                    </button>

                    <div className="flex flex-wrap gap-2 justify-center mt-5">
                      {["⚡ Rápido", "😊 Fácil", "🎯 Preciso", "💡 Útil al instante", "🔓 Sin compromiso"].map(f => (
                        <span key={f} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">{f}</span>
                      ))}
                    </div>

                    {/* Secondary option */}
                    <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                      <p className="text-xs text-gray-400 mb-2">¿Primera vez?</p>
                      <button className="text-sm text-blue-600 font-semibold hover:underline">
                        Soy nuevo aquí · Conoce cómo funciona la app →
                      </button>
                    </div>
                  </>
                )}

                {homeStep === "model" && (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <button onClick={() => setHomeStep("brand")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-bold text-blue-600">{brand}</span>
                        <span className="text-gray-300">›</span>
                        <span className="text-gray-500">Modelo</span>
                      </div>
                    </div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cuál es el modelo del vehículo?</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all mb-4"
                      placeholder="Ej. Corolla 2018, Spark GT, Sandero..."
                      value={inputModel} onChange={e => setInputModel(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && inputModel.trim() && (setModel(inputModel.trim()), setHomeStep("problem"))}
                      autoFocus />
                    <button onClick={() => { if (inputModel.trim()) { setModel(inputModel.trim()); setHomeStep("problem"); } }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-[0.98] shadow-lg shadow-blue-200">
                      Continuar →
                    </button>
                  </>
                )}

                {homeStep === "problem" && (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <button onClick={() => setHomeStep("model")} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-bold text-blue-600">{brand} {model}</span>
                        <span className="text-gray-300">›</span>
                        <span className="text-gray-500">Problema</span>
                      </div>
                    </div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cuéntanos el problema</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all mb-4 resize-none"
                      rows={4}
                      placeholder="Ej. Vibración al acelerar, pérdida de fuerza, ruido en el motor..."
                      value={inputProblem} onChange={e => setInputProblem(e.target.value)}
                      autoFocus />
                    <button onClick={handleProblem}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-[0.98] shadow-lg shadow-blue-200">
                      Iniciar diagnóstico →
                    </button>
                  </>
                )}
              </div>
            )}

            {flow === "listening" && <ListeningPulse />}
            {flow === "analyzing" && (
              <AnalyzingView symptoms={problem.split(/[,.]/).map(s => s.trim()).filter(Boolean).slice(0, 3)} />
            )}
            {flow === "questions" && (
              <QuickQuestions
                aiMessage={aiMessage}
                questions={dynamicQuestions}
                answers={answers}
                onAnswer={handleAnswer}
                onSubmit={handleSubmitAnswers}
                submitting={submitting}
              />
            )}
            {flow === "result" && diagnosisData && (
              <DiagnosisResult brand={brand} model={model} data={diagnosisData} onReset={handleReset} />
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-4 pb-2">
            Resultado inmediato · Sin necesidad de registrar tu auto
          </p>
        </div>
      </div>
    </>
  );
}