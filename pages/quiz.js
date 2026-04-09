import Layout from "@/src/Components/Layout";
import { useState, useCallback, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    cat: "Motor", emoji: "⚙️",
    q: "¿Cuál es la función principal del árbol de levas?",
    opts: ["Enfriar el motor", "Controlar apertura y cierre de válvulas", "Bombear aceite al cárter", "Generar electricidad"],
    ans: 1,
    explain: "El árbol de levas controla el timing de apertura y cierre de las válvulas de admisión y escape, sincronizado con el cigüeñal.",
    scene: "engine",
  },
  {
    cat: "Neumáticos", emoji: "🛞",
    q: "¿Cuál es la presión recomendada típica para neumáticos de auto de pasajero?",
    opts: ["10-15 PSI", "32-35 PSI", "50-60 PSI", "5-8 PSI"],
    ans: 1,
    explain: "La mayoría de los autos de pasajero requieren entre 30 y 36 PSI. Una presión incorrecta afecta el consumo de combustible y la seguridad.",
    scene: "tire",
  },
  {
    cat: "Eléctrico", emoji: "⚡",
    q: "¿Cuántos voltios tiene una batería estándar de auto de combustión interna?",
    opts: ["6 voltios", "12 voltios", "24 voltios", "48 voltios"],
    ans: 1,
    explain: "La batería estándar de un auto es de 12V (aprox. 12.6V cargada). Entrega hasta 600A de arranque en frío para girar el motor de arranque.",
    scene: "battery",
  },
  {
    cat: "Refrigeración", emoji: "🌡️",
    q: "¿Qué indica el medidor de temperatura en rojo en el tablero?",
    opts: ["Motor frío, espera antes de acelerar", "El A/C está funcionando", "Sobrecalentamiento, detente de inmediato", "Bajo nivel de aceite"],
    ans: 2,
    explain: "Temperatura en rojo = sobrecalentamiento grave. Detenerse de inmediato evita daños irreversibles como la deformación de la culata.",
    scene: "temp",
  },
  {
    cat: "Aceite", emoji: "🛢️",
    q: '¿Qué significa "5W-30" en la nomenclatura de un aceite de motor?',
    opts: ["Viscosidad en frío 5, viscosidad en caliente 30", "Peso del aceite en libras", "Temperatura máxima en grados", "Nivel de energía química"],
    ans: 0,
    explain: "5W = viscosidad en frío (W = Winter). 30 = viscosidad a 100°C. Un aceite más fluido en frío facilita el arranque; la viscosidad en caliente protege el motor.",
    scene: "oil",
  },
  {
    cat: "Transmisión", emoji: "🏎️",
    q: '¿Qué es el "par motor" o torque?',
    opts: ["La velocidad máxima del vehículo", "La fuerza de rotación que genera el motor", "El número de revoluciones por minuto", "El consumo de gasolina"],
    ans: 1,
    explain: "El torque es la fuerza de giro del motor, medida en Newton-metro (Nm). Determina la capacidad de acelerar con carga o en pendientes.",
    scene: "trans",
  },
  {
    cat: "Frenos", emoji: "🔴",
    q: "¿Cuándo debes cambiar las pastillas de freno?",
    opts: ["Cada 5,000 km", "Solo cuando fallen completamente", "Cuando el grosor baja de ~3mm o hay chirridos", "Cada cambio de aceite"],
    ans: 2,
    explain: "Las pastillas deben reemplazarse cuando su grosor baja de 3mm. El chirrido metálico indica que el indicador de desgaste roza el disco.",
    scene: "brake",
  },
  {
    cat: "Combustible", emoji: "⛽",
    q: "¿Qué daño puede causar mezclar gasolina regular con Premium en un motor que requiere Premium?",
    opts: ["Ninguno, son compatibles", "Detonación y posible daño al motor", "El auto irá más rápido", "Mejora la economía de combustible"],
    ans: 1,
    explain: "Los motores de alto desempeño requieren Premium (92+ octanos). Usar regular puede causar detonación prematura, dañando pistones y bielas.",
    scene: "fuel",
  },
];

// ─── SVG SCENES ──────────────────────────────────────────────────────────────
function EngineScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#93C5FD" letterSpacing="2">MOTOR 4 CILINDROS</text>{[0,1,2,3].map((i)=>(<g key={i} transform={`translate(${22+i*80},28)`}><rect x="0" y="0" width="62" height="92" rx="6" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="1.5"/><text x="31" y="14" textAnchor="middle" fontSize="9" fill="#3B82F6">CIL {i+1}</text><g style={{animation:`pistonMove 1.2s ease-in-out ${i*0.3}s infinite`}}><rect x="8" y="20" width="46" height="38" rx="4" fill="#2563EB" opacity=".85"/><rect x="27" y="54" width="8" height="22" fill="#1D4ED8"/><g style={{animation:`sparkFlash 1.2s ease-in-out ${i*0.3}s infinite`}}><line x1="31" y1="18" x2="27" y2="11" stroke="#FCD34D" strokeWidth="1.5"/><line x1="31" y1="18" x2="35" y2="11" stroke="#FCD34D" strokeWidth="1.5"/><circle cx="31" cy="18" r="2.5" fill="#FEF3C7"/></g></g></g>))}<rect x="18" y="128" width="304" height="12" rx="6" fill="#BFDBFE"/><text x="170" y="155" textAnchor="middle" fontSize="10" fill="#60A5FA">Cigüeñal → movimiento rotatorio</text></svg>; }
function TireScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#93C5FD" letterSpacing="2">SECCIÓN TRANSVERSAL</text><g transform="translate(170,88)"><ellipse cx="0" cy="0" rx="62" ry="62" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="12"/><ellipse cx="0" cy="0" rx="40" ry="40" fill="#EFF6FF"/><circle cx="0" cy="0" r="20" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2"/>{[0,1,2,3,4].map((i)=>(<line key={i} x1="0" y1="0" x2={Math.cos(i*72*Math.PI/180)*17} y2={Math.sin(i*72*Math.PI/180)*17} stroke="#2563EB" strokeWidth="1.5"/>))}<circle cx="0" cy="0" r="4" fill="#2563EB"/><text x="0" y="80" textAnchor="middle" fontSize="11" fill="#60A5FA">205/55 R16 • 32-35 PSI</text></g><rect x="20" y="40" width="70" height="80" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1"/><text x="55" y="58" textAnchor="middle" fontSize="10" fill="#60A5FA">Presión</text><rect x="28" y="64" width="54" height="46" rx="4" fill="#DBEAFE"/><text x="55" y="98" textAnchor="middle" fontFamily="monospace" fontSize="22" fontWeight="700" fill="#2563EB">32</text><text x="55" y="116" textAnchor="middle" fontSize="10" fill="#60A5FA">PSI</text></svg>; }
function BatteryScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#93C5FD" letterSpacing="2">BATERÍA DE PLOMO-ÁCIDO</text><g transform="translate(80,30)"><rect x="0" y="0" width="140" height="100" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/><rect x="42" y="-10" width="18" height="12" rx="4" fill="#FCA5A5"/><rect x="80" y="-10" width="18" height="12" rx="4" fill="#93C5FD"/><text x="51" y="-1" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#EF4444">+</text><text x="87" y="-1" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#2563EB">−</text>{[0,1,2,3,4,5].map((i)=>(<g key={i}><rect x={10+i*20} y="16" width="14" height="68" rx="4" fill="#DBEAFE"/><rect x={10+i*20} y={16+68-Math.round(68*(i+1)/6)} width="14" height={Math.round(68*(i+1)/6)} rx="4" fill="#2563EB" opacity={0.5+i*0.09}/></g>))}<text x="70" y="128" textAnchor="middle" fontFamily="monospace" fontSize="18" fontWeight="700" fill="#2563EB">12.6V</text></g><g transform="translate(244,36)">{[["60 Ah","Capacidad"],["500 CCA","Arranque"],["3-5 años","Vida útil"]].map(([v,l],i)=>(<g key={i} transform={`translate(0,${i*44})`}><text x="0" y="0" fontSize="10" fill="#60A5FA">{l}</text><text x="0" y="22" fontFamily="monospace" fontSize="17" fontWeight="700" fill="#1E3A5F">{v}</text></g>))}</g></svg>; }
function TempScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#FCA5A5" letterSpacing="2">SISTEMA DE REFRIGERACIÓN</text><g transform="translate(100,28)"><circle cx="50" cy="70" r="58" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5"/>{["C","","","","H"].map((l,i)=>(<text key={i} x={50+48*Math.cos((i*45-90)*Math.PI/180)} y={70+48*Math.sin((i*45-90)*Math.PI/180)+5} textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="700" fill={i===4?"#EF4444":i===0?"#60A5FA":"#CBD5E1"}>{l||"·"}</text>))}<g style={{animation:"tempOsc 3s ease-in-out infinite",transformOrigin:"50px 70px"}}><line x1="50" y1="70" x2="50" y2="18" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></g><circle cx="50" cy="70" r="6" fill="#EF4444"/><text x="50" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#EF4444">¡ALTA TEMP!</text></g><g transform="translate(228,40)">{[["85-95 °C","Normal","#22C55E"],[">120 °C","Crítica","#EF4444"]].map(([v,l,c],i)=>(<g key={i} transform={`translate(0,${i*56})`}><text x="0" y="0" fontSize="10" fill="#94A3B8">{l}</text><text x="0" y="24" fontFamily="monospace" fontSize="20" fontWeight="700" fill={c}>{v}</text></g>))}</g></svg>; }
function OilScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#93C5FD" letterSpacing="2">ACEITE MULTIGRADO 5W-30</text><g transform="translate(60,28)"><rect x="0" y="0" width="80" height="118" rx="8" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5"/><rect x="22" y="-8" width="36" height="10" rx="4" fill="#DBEAFE"/><rect x="10" y="38" width="60" height="70" rx="4" fill="#DBEAFE"/><rect x="10" y="72" width="60" height="36" rx="4" fill="#2563EB" opacity=".7"/>{[0,1,2].map((i)=>(<circle key={i} cx={22+i*16} cy="38" r="4" fill="#2563EB" style={{animation:`dropFall 1.8s ease-in ${i*0.6}s infinite`}}/>))}<text x="40" y="24" textAnchor="middle" fontFamily="monospace" fontSize="16" fontWeight="700" fill="#2563EB">5W</text><text x="40" y="36" textAnchor="middle" fontSize="10" fill="#60A5FA">-30</text></g><g transform="translate(172,32)">{[["5W","FRÍO","#60A5FA","#EFF6FF","#BFDBFE"],["30","CALIENTE","#F87171","#FEF2F2","#FECACA"]].map(([v,l,c,bg,border],i)=>(<g key={i} transform={`translate(0,${i*70})`}><rect x="0" y="0" width="148" height="58" rx="10" fill={bg} stroke={border} strokeWidth="1"/><text x="74" y="18" textAnchor="middle" fontSize="9" fill="#94A3B8">Viscosidad en {l}</text><text x="74" y="46" textAnchor="middle" fontFamily="monospace" fontSize="28" fontWeight="700" fill={c}>{v}</text></g>))}</g><text x="170" y="155" textAnchor="middle" fontSize="10" fill="#60A5FA">Cambia cada 5,000–10,000 km</text></svg>; }
function TransScene() { const data=[40,65,90,75,50]; const vals=[180,260,320,290,220]; const rpms=["1k","2k","3k","4k","5k"]; return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#A78BFA" letterSpacing="2">TORQUE Y POTENCIA</text><g transform="translate(30,38)">{data.map((h,i)=>(<g key={i} transform={`translate(${i*50},0)`}><rect x="0" y={88-h} width="40" height={h} rx="4" fill="#7C3AED" opacity={0.4+i*0.13}/><text x="20" y={82-h} textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#7C3AED">{vals[i]}</text><text x="20" y="100" textAnchor="middle" fontSize="9" fill="#94A3B8">{rpms[i]}</text></g>))}<line x1="0" y1="90" x2="258" y2="90" stroke="#E2E8F0" strokeWidth="1"/><text x="125" y="118" textAnchor="middle" fontSize="9" fill="#94A3B8">RPM</text><text x="125" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7C3AED">Torque (Nm)</text></g><g transform="translate(296,44)">{[["320 Nm","Máx"],["3,000","RPM"]].map(([v,l],i)=>(<g key={i} transform={`translate(0,${i*52})`}><text x="0" y="0" fontSize="9" fill="#94A3B8">{l}</text><text x="0" y="24" fontFamily="monospace" fontSize="17" fontWeight="700" fill="#7C3AED">{v}</text></g>))}</g></svg>; }
function BrakeScene() { return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#FCA5A5" letterSpacing="2">SISTEMA DE FRENOS DE DISCO</text><g transform="translate(170,88)"><circle cx="0" cy="0" r="58" fill="#FEF2F2" stroke="#E2E8F0" strokeWidth="2"/><circle cx="0" cy="0" r="42" fill="#FFF5F5"/><circle cx="0" cy="0" r="14" fill="#FEE2E2" stroke="#FECACA" strokeWidth="1.5"/>{Array.from({length:12},(_,i)=>(<line key={i} x1={44*Math.cos(i*30*Math.PI/180)} y1={44*Math.sin(i*30*Math.PI/180)} x2={56*Math.cos(i*30*Math.PI/180)} y2={56*Math.sin(i*30*Math.PI/180)} stroke="#FECACA" strokeWidth="2"/>))}<rect x="-62" y="-20" width="16" height="40" rx="4" fill="#93C5FD" stroke="#BFDBFE" strokeWidth="1"/><rect x="46" y="-20" width="16" height="40" rx="4" fill="#93C5FD" stroke="#BFDBFE" strokeWidth="1"/><text x="0" y="5" textAnchor="middle" fontSize="9" fill="#F87171">DISCO</text></g><g transform="translate(20,48)">{[["12 mm","Nuevo","#22C55E"],["3 mm","Límite","#EF4444"]].map(([v,l,c],i)=>(<g key={i} transform={`translate(0,${i*54})`}><text x="0" y="0" fontSize="9" fill="#94A3B8">{l}</text><text x="0" y="24" fontFamily="monospace" fontSize="22" fontWeight="700" fill={c}>{v}</text></g>))}</g><text x="170" y="155" textAnchor="middle" fontSize="10" fill="#94A3B8">Chirrido metálico = al límite de desgaste</text></svg>; }
function FuelScene() { const fuels=[{oct:"87",label:"Regular",fill:"#DCFCE7",stroke:"#86EFAC",txt:"#16A34A"},{oct:"91",label:"Plus",fill:"#FEF9C3",stroke:"#FDE047",txt:"#A16207"},{oct:"95",label:"Premium",fill:"#EDE9FE",stroke:"#C4B5FD",txt:"#6D28D9"}]; return <svg viewBox="0 0 340 160" className="w-full max-h-[180px]"><text x="170" y="18" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#93C5FD" letterSpacing="2">OCTANAJE DE COMBUSTIBLE</text>{fuels.map((f,i)=>(<g key={i} transform={`translate(${48+i*90},32)`}><rect x="0" y="0" width="70" height="106" rx="8" fill={f.fill} stroke={f.stroke} strokeWidth="1.5"/><rect x="8" y="10" width="54" height="58" rx="4" fill="rgba(255,255,255,.5)"/><rect x="8" y={68-Math.round(48*(i+1)/3)} width="54" height={Math.round(48*(i+1)/3)} rx="4" fill={f.stroke} opacity=".8"/><text x="35" y="84" textAnchor="middle" fontFamily="monospace" fontSize="24" fontWeight="700" fill={f.txt}>{f.oct}</text><text x="35" y="100" textAnchor="middle" fontSize="10" fill={f.txt}>{f.label}</text></g>))}<text x="170" y="154" textAnchor="middle" fontSize="10" fill="#60A5FA">Mayor octanaje = mayor resistencia a detonación</text></svg>; }

const SCENE_MAP = { engine: EngineScene, tire: TireScene, battery: BatteryScene, temp: TempScene, oil: OilScene, trans: TransScene, brake: BrakeScene, fuel: FuelScene };
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
const SCORE_TITLES = ["¡Sigue practicando!", "¡Buen intento!", "¡Buen trabajo!", "¡Excelente!", "¡Maestro mecánico!"];
const KEYS = ["A", "B", "C", "D"];

const css = `
  @keyframes pistonMove { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
  @keyframes sparkFlash { 0%,44%,100%{opacity:0} 50%,62%{opacity:1} }
  @keyframes dropFall { 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(24px);opacity:0} 100%{opacity:0} }
  @keyframes tempOsc { 0%,100%{transform:rotate(-28deg)} 50%{transform:rotate(20deg)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes popIn { 0%{opacity:0;transform:scale(0.93)} 60%{transform:scale(1.02)} 100%{opacity:1;transform:scale(1)} }
  @keyframes shakeWrong { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes bounceCorrect { 0%,100%{transform:scale(1)} 35%{transform:scale(1.04)} 65%{transform:scale(0.97)} }
  @keyframes streakPop { 0%{opacity:0;transform:scale(0.5) translateY(6px)} 60%{transform:scale(1.15) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  .anim-slide-up { animation: slideUp 0.35s ease both; }
  .anim-pop-in { animation: popIn 0.3s ease both; }
  .anim-wrong { animation: shakeWrong 0.42s ease; }
  .anim-correct { animation: bounceCorrect 0.4s ease; }
  .anim-streak { animation: streakPop 0.4s ease both; }
`;

// ─── STREAK BADGE ─────────────────────────────────────────────────────────────
function StreakBadge({ streak }) {
  if (streak < 2) return null;
  const label = streak >= 5 ? `⚡ ×${streak}` : ["","","🔥 ×2","🔥 ×3","💥 ×4","⚡ ×5"][streak];
  return (
    <span key={streak} className="anim-streak inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-600 border border-orange-200 whitespace-nowrap">
      {label} Racha
    </span>
  );
}

// ─── RESULTS REVIEW ──────────────────────────────────────────────────────────
function ResultsReview({ questions, answers }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 w-full">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full py-3 rounded-2xl border-2 border-blue-200 text-blue-700 font-bold text-sm bg-white hover:bg-blue-50 transition-all active:scale-95"
      >
        {open ? "Ocultar revisión ▲" : "Revisar mis respuestas 📋"}
      </button>
      {open && (
        <div className="mt-3 space-y-3 anim-slide-up">
          {questions.map((q, i) => {
            const correct = answers[i] === q.ans;
            return (
              <div key={i} className={`rounded-2xl p-4 border ${correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-base shrink-0">{correct ? "✅" : "❌"}</span>
                  <p className="text-sm font-semibold text-slate-700 leading-snug">{q.q}</p>
                </div>
                {!correct && (
                  <p className="text-xs text-slate-500 ml-6 mb-1">
                    Tu respuesta: <span className="text-red-600 font-semibold">{q.opts[answers[i]]}</span>
                  </p>
                )}
                <p className="text-xs text-slate-500 ml-6">
                  Correcta: <span className={`font-semibold ${correct ? "text-green-700" : "text-blue-700"}`}>{q.opts[q.ans]}</span>
                </p>
                {!correct && (
                  <p className="text-xs text-slate-400 ml-6 mt-1 italic leading-relaxed">{q.explain}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AutoIQGame() {
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("play");
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animClass, setAnimClass] = useState({});

  const topRef = useRef(null);
  const feedbackRef = useRef(null);

  const q = questions[current];
  const answered = selected !== null;
  const progress = ((current / questions.length) * 100).toFixed(1);
  const SceneComp = SCENE_MAP[q?.scene] ?? (() => null);

  // Scroll to top when question changes
  useEffect(() => {
    if (phase === "play") {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [current, phase]);

  const handleAnswer = useCallback((idx) => {
    if (answered) return;

    const isCorrect = idx === q.ans;
    setSelected(idx);
    setAnswers(prev => [...prev, idx]);

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setAnimClass({ [idx]: "anim-correct" });
    } else {
      setStreak(0);
      setAnimClass({ [idx]: "anim-wrong" });
    }

    // Scroll to feedback after render
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 140);

    // Clear anim classes
    setTimeout(() => setAnimClass({}), 500);
  }, [answered, q]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }, [current, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(shuffle(QUESTIONS));
    setCurrent(0); setScore(0); setSelected(null);
    setPhase("play"); setStreak(0); setAnswers([]);
  }, []);

  const pct = Math.round((score / questions.length) * 100);
  const circ = 2 * Math.PI * 54;

  return (
    <Layout
      title="AutoIQ – Simulador de Mecánica Automotriz"
      image="/favicon.png"
      description="¿Sabes cómo funciona realmente tu motor? Pon a prueba tus conocimientos con AutoIQ."
      footer={false}
      visibleNavbar={false}
    >
      <style>{css}</style>
      <div className="min-h-screen bg-blue-50 text-slate-900 font-sans flex flex-col items-center">
        <div className="max-w-md w-full px-4 pt-5 pb-10 flex flex-col flex-1">

          {/* Scroll anchor — top of content */}
          <div ref={topRef} style={{ scrollMarginTop: "8px" }} />

          {/* ── Header ── */}
          <header className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="font-mono text-xl font-extrabold tracking-tighter text-blue-900">
              ⚙ AUTO<span className="text-blue-600">IQ</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StreakBadge streak={streak} />
              <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-600 shadow-sm">
                ⭐ {score * 125} XP
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-600 text-white">
                {phase === "result" ? `${questions.length}/${questions.length}` : `${current + 1}/${questions.length}`}
              </div>
            </div>
          </header>

          {/* ── Progress bar + dot tracker ── */}
          <div className="mb-5">
            <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-violet-500 transition-all duration-700 ease-out"
                style={{ width: `${phase === "result" ? 100 : progress}%` }}
              />
            </div>
            {/* Per-question dots */}
            <div className="flex justify-between px-0.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    answers[i] !== undefined
                      ? answers[i] === questions[i].ans
                        ? "bg-green-500 w-2 h-2"
                        : "bg-red-400 w-2 h-2"
                      : i === current && phase === "play"
                      ? "bg-blue-500 w-2.5 h-2.5 scale-110"
                      : "bg-blue-200 w-1.5 h-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ══════ PLAY PHASE ══════ */}
          {phase === "play" && (
            <main key={current} className="flex flex-col flex-1 anim-slide-up">

              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  {q.emoji} {q.cat}
                </span>
                <span className="text-xs text-slate-400 font-medium">Pregunta {current + 1} de {questions.length}</span>
              </div>

              {/* SVG Scene */}
              <div className="bg-white rounded-3xl p-4 mb-4 border border-blue-100 shadow-sm overflow-hidden">
                <SceneComp />
              </div>

              {/* Question */}
              <h1 className="text-[17px] font-bold leading-snug mb-4 text-slate-800">
                {q.q}
              </h1>

              {/* Options */}
              <div className="space-y-3 mb-2">
                {q.opts.map((opt, i) => {
                  const isCorrect = answered && i === q.ans;
                  const isWrong = answered && i === selected && i !== q.ans;
                  const isDimmed = answered && !isCorrect && !isWrong;

                  return (
                    <button
                      key={i}
                      disabled={answered}
                      onClick={() => handleAnswer(i)}
                      className={[
                        "w-full flex items-center gap-3 p-4 rounded-2xl text-[15px] font-semibold text-left transition-all duration-200",
                        isCorrect
                          ? `bg-green-50 border-2 border-green-500 text-green-800 ${animClass[i] || ""}`
                          : isWrong
                          ? `bg-red-50 border-2 border-red-400 text-red-800 ${animClass[i] || ""}`
                          : isDimmed
                          ? "bg-white border-2 border-transparent opacity-35 shadow-sm cursor-default"
                          : "bg-white border-2 border-transparent shadow-sm hover:border-blue-300 hover:shadow-blue-100 hover:shadow-md active:scale-[0.98] cursor-pointer",
                      ].join(" ")}
                    >
                      <span className={[
                        "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-all",
                        isCorrect ? "bg-green-500 text-white" : isWrong ? "bg-red-400 text-white" : "bg-slate-100 text-slate-500",
                      ].join(" ")}>
                        {KEYS[i]}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {isCorrect && <span className="text-green-500 shrink-0">✓</span>}
                      {isWrong && <span className="text-red-400 shrink-0">✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* ── Feedback + Next (scroll target) ── */}
              <div ref={feedbackRef} style={{ scrollMarginBottom: "16px" }}>
                {answered && (
                  <>
                    <div className={`anim-pop-in mt-4 rounded-2xl p-4 border-l-4 ${
                      selected === q.ans
                        ? "bg-white border-l-green-500 border border-green-100"
                        : "bg-white border-l-red-400 border border-red-100"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-base">{selected === q.ans ? "✅" : "❌"}</span>
                        <span className={`text-sm font-black ${selected === q.ans ? "text-green-700" : "text-red-600"}`}>
                          {selected === q.ans ? "¡Correcto!" : "Incorrecto"}
                        </span>
                        {selected !== q.ans && (
                          <span className="text-xs text-slate-400">
                            → La correcta: <span className="text-blue-600 font-semibold">{q.opts[q.ans]}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">{q.explain}</p>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full mt-4 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                      {current + 1 >= questions.length ? "Ver Resultados →" : "Siguiente Pregunta →"}
                    </button>
                  </>
                )}
              </div>
            </main>
          )}

          {/* ══════ RESULT PHASE ══════ */}
          {phase === "result" && (
            <div className="flex flex-col items-center flex-1 text-center anim-pop-in pt-2">

              {/* Score ring */}
              <div className="relative w-36 h-36 mb-5">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                  <circle
                    cx="64" cy="64" r="54" fill="none"
                    stroke={pct >= 75 ? "#22C55E" : pct >= 50 ? "#2563EB" : "#F59E0B"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${circ * pct / 100} ${circ}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800">{pct}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aciertos</span>
                </div>
              </div>

              {/* Stat pills */}
              <div className="flex gap-3 mb-5 w-full">
                {[
                  { label: "Correctas", value: score, color: "text-green-600", bg: "bg-green-50 border-green-100" },
                  { label: "Incorrectas", value: questions.length - score, color: "text-red-500", bg: "bg-red-50 border-red-100" },
                  { label: "XP ganado", value: score * 125, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className={`flex-1 rounded-2xl p-3 border ${bg}`}>
                    <div className={`text-xl font-black ${color}`}>{value}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide leading-tight mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Result card */}
              <div className="bg-white rounded-[2rem] p-7 w-full border border-blue-100 shadow-xl shadow-blue-900/5">
                <h2 className="text-2xl font-black text-slate-800 mb-2 italic">
                  {SCORE_TITLES[Math.min(Math.floor(pct / 25), 4)]}
                </h2>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                  Lograste <span className="text-blue-600 font-bold">{score}</span> de {questions.length} respuestas correctas.
                  {score === questions.length && " ¡Puntuación perfecta! 🏆"}
                </p>
                <button
                  onClick={handleRestart}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Reintentar Desafío 🔄
                </button>
                <ResultsReview questions={questions} answers={answers} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}