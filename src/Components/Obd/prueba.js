"use client";

import { useState, useEffect, useRef } from "react";
import {
  Cpu, ArrowLeft, ChevronRight, AlertTriangle, Wrench,
  Activity, Share2, BookOpen, Code2, CheckCircle2,
  Car, DollarSign, Wind, HelpCircle, Search,
  XCircle, ThumbsUp, Gauge, Clock,
} from "lucide-react";

// ─── Data shape ──────────────────────────────────────────────────────────────
/**
 * @typedef {{ title: string; probability: "alta"|"media"|"baja"; detail: string }} Cause
 * @typedef {{ step: number; title: string; detail: string; time: string; difficulty: "básico"|"intermedio"|"avanzado" }} Repair
 * @typedef {{ min: number; max: number; item: string; note?: string }} RepairCost
 * @typedef {{ make: string; models: string }} AffectedVehicle
 * @typedef {{ q: string; a: string }} Faq
 * @typedef {{
 *   code: string; title: string; category: string; severity: "low"|"medium"|"high";
 *   description: string; seriousness: string; canDrive: { answer: string; warning: string };
 *   symptoms: string[]; causes: Cause[]; diagnosis: string[]; repairs: Repair[];
 *   repairCosts: RepairCost[]; affectedVehicles: AffectedVehicle[];
 *   emissionsFailure: string; relatedCodes: string[]; faqs: Faq[];
 * }} ObdCode
 */

/** @type {ObdCode} */
const CODE_DATA = {
  code: "P0300",
  title: "Fallo de encendido aleatorio / múltiple cilindros",
  category: "Powertrain — Sistema de encendido",
  severity: "high",

  description:
    "El módulo de control del motor (ECM) ha detectado fallos de encendido aleatorios en uno o más cilindros. A diferencia de los códigos P0301–P0308, que apuntan a un cilindro específico, el P0300 indica fallos que migran entre cilindros o que el ECM no puede atribuir consistentemente a uno solo. Puede activar el testigo MIL de forma intermitente o permanente según la frecuencia y severidad de los eventos.",

  seriousness:
    "El P0300 es un código de severidad alta. Los fallos de encendido no corregidos permiten que combustible crudo llegue al catalizador, donde se quema a temperaturas extremas pudiendo destruirlo permanentemente. Además, el aceite se diluye con gasolina al haber combustión incompleta, acelerando el desgaste del motor. Si el testigo MIL parpadea en lugar de permanecer fijo, el ECM está detectando fallos activos en tiempo real: detén el vehículo de forma segura lo antes posible.",

  canDrive: {
    answer:
      "En corto plazo y a baja velocidad, sí; pero no es recomendable. Un fallo de encendido activo introduce combustible sin quemar al sistema de escape, lo que puede destruir el catalizador en cuestión de minutos de conducción agresiva.",
    warning:
      "Si el testigo MIL parpadea, detén el vehículo inmediatamente. El parpadeo indica daño potencial al catalizador en curso.",
  },

  symptoms: [
    "Testigo MIL (Check Engine) encendido o parpadeando",
    "Vibración o traqueteo del motor, especialmente en ralentí",
    "Pérdida notable de potencia durante la aceleración",
    "Consumo de combustible incrementado sin cambio de hábitos",
    "Olor a combustible sin quemar en el escape",
    "Dificultad para arrancar, especialmente en frío",
    "Ralentí inestable con oscilaciones de RPM",
    "Humo negro o azulado visible en el tubo de escape",
  ],

  causes: [
    {
      title: "Bujías desgastadas o defectuosas",
      probability: "alta",
      detail: "Electrodos erosionados o brecha fuera de especificación impiden la chispa correcta. Inspecciona el color del electrodo y mide la brecha con calibrador.",
    },
    {
      title: "Bobinas de encendido fallidas",
      probability: "alta",
      detail: "Una bobina con fallo intermitente causa fallos aleatorios. Intercámbiala con una adyacente: si el fallo migra de cilindro, la bobina es defectuosa.",
    },
    {
      title: "Inyectores obstruidos o defectuosos",
      probability: "media",
      detail: "Un inyector que no atomiza correctamente produce mezcla pobre en ese cilindro. Verifica con análisis de balance de inyectores o un escáner de datos en vivo.",
    },
    {
      title: "Fuga de vacío en múltiple de admisión",
      probability: "media",
      detail: "El aire no medido empobece la mezcla de forma impredecible. Usa smoke test o propano para localizar la fuga.",
    },
    {
      title: "Compresión baja por desgaste mecánico",
      probability: "media",
      detail: "Anillos desgastados o válvulas con mal asiento generan fallos mecánicos. Realiza prueba de compresión y de pérdida de cilindro.",
    },
    {
      title: "Presión de combustible insuficiente",
      probability: "baja",
      detail: "Bomba débil o filtro obstruido. Conecta un manómetro al riel: la presión debe sostenerse entre 280–380 kPa bajo carga.",
    },
    {
      title: "Sensor de cigüeñal (CKP) errático",
      probability: "baja",
      detail: "Una señal inestable del CKP confunde al ECM sobre el tiempo de encendido. Verifica con osciloscopio en el conector del sensor.",
    },
  ],

  diagnosis: [
    "Conecta un escáner OBD-II y registra todos los códigos presentes. Anota el freeze frame data del P0300 (RPM, carga, temperatura).",
    "Revisa si hay códigos P0301–P0308 junto al P0300. Si los hay, identifica el cilindro afectado y empieza por él.",
    "Extrae y examina todas las bujías. Compara su estado visual: depósitos, color del electrodo, brecha y estado de la porcelana.",
    "Usa un escáner con función de corte de inyector por cilindro o de contribución de potencia para aislar el cilindro que más falla.",
    "Intercambia la bobina del cilindro sospechoso con una adyacente. Borra los códigos y conduce. Si el fallo migra, reemplaza la bobina.",
    "Realiza prueba de compresión en todos los cilindros. Diferencias mayores al 10% entre cilindros indican desgaste mecánico.",
    "Verifica la presión del riel de combustible estática y dinámica con manómetro.",
    "Busca fugas de vacío con smoke test o aerosol de propano con motor en marcha.",
  ],

  repairs: [
    {
      step: 1,
      title: "Reemplazo de bujías",
      detail: "Extrae todas las bujías y evalúa el electrodo. Reemplaza si la brecha supera la especificación o hay depósitos. Usa siempre el tipo correcto (iridio, platino o cobre) según el manual del fabricante.",
      time: "45–90 min",
      difficulty: "básico",
    },
    {
      step: 2,
      title: "Diagnóstico y reemplazo de bobinas",
      detail: "Intercambia la bobina del cilindro con mayor frecuencia de fallo. Si el código sigue al nuevo cilindro, la bobina es defectuosa. Reemplaza individualmente o en juego según el costo y kilometraje.",
      time: "30–60 min",
      difficulty: "básico",
    },
    {
      step: 3,
      title: "Limpieza o reemplazo de inyectores",
      detail: "Realiza un análisis de balance de inyectores. Un inyector con caudal fuera del 10% del promedio debe limpiarse en banco o reemplazarse. Considera aditivo limpiador de inyectores como primera medida.",
      time: "60–120 min",
      difficulty: "intermedio",
    },
    {
      step: 4,
      title: "Reparación de fugas de vacío",
      detail: "Realiza smoke test con el motor apagado. Localiza la fuga y reemplaza la manguera, junta o sello afectado. Las juntas del múltiple de admisión son las más comunes en motores con más de 100.000 km.",
      time: "30–120 min",
      difficulty: "intermedio",
    },
    {
      step: 5,
      title: "Verificación del sistema de combustible",
      detail: "Conecta un manómetro al Schrader del riel. La presión estática con llave debe ser de 280–380 kPa. Una caída mayor a 30 kPa en 30 min indica regulador o válvula antirretorno defectuosa.",
      time: "20–40 min",
      difficulty: "intermedio",
    },
    {
      step: 6,
      title: "Evaluación mecánica del motor",
      detail: "Si las causas eléctricas y de combustible están descartadas, realiza prueba de compresión y de pérdida de cilindro. Una pérdida mayor al 20% indica desgaste interno. Puede requerir rectificación o reemplazo del motor.",
      time: "60–90 min",
      difficulty: "avanzado",
    },
  ],

  repairCosts: [
    { min: 40, max: 120, item: "Juego de bujías (repuesto + mano de obra)", note: "Primera revisión recomendada" },
    { min: 80, max: 300, item: "Bobina de encendido (por unidad)", note: "Precio varía según cilindros" },
    { min: 150, max: 500, item: "Limpieza de inyectores en banco" },
    { min: 100, max: 400, item: "Reparación de fuga de vacío" },
    { min: 200, max: 600, item: "Bomba de combustible" },
    { min: 800, max: 2500, item: "Reparación mecánica interna del motor", note: "Solo si hay desgaste" },
  ],

  affectedVehicles: [
    { make: "Ford", models: "F-150, Explorer, Mustang, Focus (motores EcoBoost)" },
    { make: "Chevrolet / GMC", models: "Silverado, Tahoe, Suburban, Equinox (motores V6/V8)" },
    { make: "Toyota", models: "Camry, Corolla, Tacoma, Tundra (especialmente >150.000 km)" },
    { make: "Honda", models: "Civic, Accord, CR-V (2.4L i-VTEC y 1.5T)" },
    { make: "Volkswagen / Audi", models: "Jetta, Golf, Passat, A4 (motores TSI y TDI)" },
    { make: "BMW", models: "Serie 3, Serie 5 (N52, N54, N55 — común a altos kilometrajes)" },
  ],

  emissionsFailure:
    "Sí. Un fallo de encendido activo casi garantiza el rechazo en una prueba de emisiones. El combustible sin quemar dispara los niveles de HC (hidrocarburos) muy por encima del límite permitido. Además, si el catalizador ha sido dañado por fallos previos, los niveles de CO y NOx también superarán los umbrales. El código P0300 activo con el testigo MIL encendido causa fallo directo en la mayoría de inspecciones que verifican el estado del OBD.",

  relatedCodes: ["P0301", "P0302", "P0303", "P0304", "P0305", "P0316", "P0351", "P0171", "P0174"],

  faqs: [
    {
      q: "¿Puede el P0300 aparecer solo por gasolina de mala calidad?",
      a: "Sí. La gasolina con bajo octanaje o contaminada puede provocar preignición o detonación que el ECM registra como fallo de encendido. Si el código apareció después de cargar en una estación diferente, consume el tanque con gasolina premium y verifica si el código regresa.",
    },
    {
      q: "¿Cuánto tiempo tengo para repararlo antes de dañar el catalizador?",
      a: "Depende de la frecuencia del fallo. Un fallo ocasional da margen de días. Uno continuo con el MIL parpadeando puede destruir el catalizador en 15–30 minutos de conducción. Si el testigo parpadea, no conduzcas.",
    },
    {
      q: "¿Puedo borrar el código y olvidarme?",
      a: "No. Borrar el código sin corregir la causa hace que reaparezca en el próximo ciclo de conducción. Además, borra el freeze frame data que es clave para diagnosticar. El problema subyacente sigue activo y empeora con el tiempo.",
    },
    {
      q: "¿El P0300 puede causar que el vehículo no pase la revisión técnica?",
      a: "Sí, casi con certeza. El código activo con el MIL encendido produce fallo directo en la mayoría de centros de inspección que verifican el estado del sistema OBD-II. Incluso si lo borras antes de ir, el sistema necesita completar sus ciclos de monitoreo (readiness monitors) para considerarse listo.",
    },
    {
      q: "¿Cuál es la diferencia entre P0300 y P0301?",
      a: "El P0301 señala fallo en el cilindro 1 específicamente (el último dígito indica el cilindro: P0302 = cilindro 2, etc.). El P0300 indica fallos aleatorios o múltiples que el ECM no puede atribuir a un solo cilindro de forma consistente. Es común que ambos aparezcan juntos.",
    },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

const SEV = {
  high:   { label: "Alta",  color: "#FF3B00", bg: "#FFF1EE", bar: 100 },
  medium: { label: "Media", color: "#F59E0B", bg: "#FFFBEB", bar: 60  },
  low:    { label: "Baja",  color: "#10B981", bg: "#ECFDF5", bar: 25  },
};
const PROB = {
  alta:  { w: "85%", color: "#FF3B00" },
  media: { w: "52%", color: "#F59E0B" },
  baja:  { w: "22%", color: "#10B981" },
};
const DIFF = {
  básico:     { color: "#10B981", label: "Básico"      },
  intermedio: { color: "#F59E0B", label: "Intermedio"  },
  avanzado:   { color: "#FF3B00", label: "Avanzado"    },
};

const NAV_SECTIONS = [
  { id: "meaning",   label: "Significado"  },
  { id: "serious",   label: "Severidad"    },
  { id: "drive",     label: "¿Puedes conducir?" },
  { id: "symptoms",  label: "Síntomas"     },
  { id: "causes",    label: "Causas"       },
  { id: "diagnosis", label: "Diagnóstico"  },
  { id: "repairs",   label: "Reparación"   },
  { id: "costs",     label: "Costos"       },
  { id: "vehicles",  label: "Vehículos"    },
  { id: "emissions", label: "Emisiones"    },
  { id: "related",   label: "Relacionados" },
  { id: "faq",       label: "FAQ"          },
];

function Section({ id, eyebrow, heading, icon: Icon, children, first }) {
  return (
    <section
      id={id}
      style={{
        paddingTop: 52,
        marginTop: first ? 0 : 52,
        borderTop: first ? "none" : "1px solid #E4E4E0",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        {Icon && <Icon size={13} style={{ color: "#FF3B00" }} />}
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: "#9B9B96",
        }}>
          {eyebrow}
        </span>
      </div>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22, fontWeight: 700,
        letterSpacing: "-0.6px", marginBottom: 24,
      }}>
        {heading}
      </h2>
      {children}
    </section>
  );
}

export default function CodePage() {
  const code = CODE_DATA;
  const sev = SEV[code.severity];
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("meaning");
  const [openFaq, setOpenFaq] = useState(null);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          font-family: 'Inter', sans-serif;
          background: #F8F8F6;
          color: #0F0F0F;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid #E4E4E0;
          position: sticky; top: 0;
          background: rgba(248,248,246,0.92);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 18px;
          letter-spacing: -0.3px; text-decoration: none; color: #0F0F0F;
        }
        .nav-dot {
          width: 8px; height: 8px; background: #FF3B00;
          border-radius: 50%; animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }

        .nav-back {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; color: #6B6B6B;
          text-decoration: none; transition: color .15s;
        }
        .nav-back:hover { color: #0F0F0F; }
        .nav-actions { display: flex; align-items: center; gap: 8px; }
        .icon-btn {
          width: 36px; height: 36px;
          border: 1px solid #E4E4E0; background: transparent;
          border-radius: 8px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #6B6B6B;
          transition: border-color .15s, color .15s;
        }
        .icon-btn:hover { border-color: #0F0F0F; color: #0F0F0F; }

        /* ── HERO ── */
        .hero {
          padding: 52px 48px 0;
          max-width: 1200px; margin: 0 auto;
        }
        .breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #9B9B96;
          letter-spacing: .8px; text-transform: uppercase;
          margin-bottom: 32px;
        }
        .breadcrumb span { color: #FF3B00; }

        .hero-top {
          display: grid; grid-template-columns: 1fr auto;
          gap: 48px; align-items: flex-start;
          padding-bottom: 40px; border-bottom: 1px solid #E4E4E0;
        }
        .hero-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 700; letter-spacing: -2px;
          line-height: 1; color: #FF3B00; margin-bottom: 10px;
        }
        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(17px, 2.2vw, 24px);
          font-weight: 600; letter-spacing: -0.4px;
          line-height: 1.25; margin-bottom: 10px; max-width: 560px;
        }
        .hero-cat {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #9B9B96;
          letter-spacing: 1px; text-transform: uppercase;
        }

        /* sev panel */
        .sev-panel {
          min-width: 210px; padding: 24px;
          border: 1px solid #E4E4E0; border-radius: 10px; background: #fff;
        }
        .sev-label-row {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 14px;
        }
        .sev-title-label {
          font-size: 10px; font-family: 'JetBrains Mono', monospace;
          letter-spacing: 1.2px; text-transform: uppercase; color: #9B9B96;
        }
        .sev-badge {
          font-size: 11px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: .5px; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px;
        }
        .sev-track {
          height: 4px; background: #F0F0EE;
          border-radius: 2px; overflow: hidden; margin-bottom: 24px;
        }
        .sev-fill { height: 100%; border-radius: 2px; }
        .sev-row {
          display: flex; justify-content: space-between;
          font-size: 11px; margin-bottom: 8px;
        }
        .sev-key {
          color: #9B9B96; font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: .3px;
        }
        .sev-val { font-weight: 500; font-size: 12px; }

        /* ── SECTION NAV (sticky toc) ── */
        .section-nav-wrap {
          border-bottom: 1px solid #E4E4E0;
          position: sticky; top: 65px; z-index: 90;
          background: rgba(248,248,246,0.95);
          backdrop-filter: blur(8px);
        }
        .section-nav {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px;
          display: flex; gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .section-nav::-webkit-scrollbar { display: none; }
        .section-nav-item {
          flex-shrink: 0;
          padding: 14px 16px;
          font-size: 12px; font-weight: 500;
          color: #9B9B96; cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color .15s, border-color .15s;
          white-space: nowrap; background: none; border-top: none;
          border-left: none; border-right: none;
        }
        .section-nav-item:hover { color: #0F0F0F; }
        .section-nav-item.active {
          color: #FF3B00; border-bottom-color: #FF3B00;
        }

        /* ── BODY ── */
        .body-wrap {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 100px;
          display: grid; grid-template-columns: 1fr 280px;
          gap: 72px; align-items: start;
        }
        .main-col { min-width: 0; }
        .side-col { padding-top: 52px; position: sticky; top: 140px; }

        /* body text */
        .body-text {
          font-size: 15px; line-height: 1.78; color: #3A3A3A; max-width: 660px;
        }

        /* callout */
        .callout {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 20px; border-radius: 8px; margin-top: 20px;
        }
        .callout p { font-size: 13px; line-height: 1.65; }

        /* symptoms */
        .sym-list { list-style: none; }
        .sym-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 13px 0; border-bottom: 1px solid #F0F0EE;
          font-size: 14px; color: #3A3A3A; line-height: 1.5;
        }
        .sym-item:last-child { border-bottom: none; }

        /* causes */
        .cause-item { padding: 20px 0; border-bottom: 1px solid #F0F0EE; }
        .cause-item:last-child { border-bottom: none; }
        .cause-top {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px; margin-bottom: 10px;
        }
        .cause-ttl {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: -0.2px;
        }
        .cause-prob {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; font-weight: 600; flex-shrink: 0;
        }
        .prob-track {
          height: 3px; background: #F0F0EE;
          border-radius: 2px; margin-bottom: 10px; overflow: hidden;
        }
        .prob-fill { height: 100%; border-radius: 2px; }
        .cause-detail { font-size: 13px; line-height: 1.68; color: #6B6B6B; }

        /* diagnosis steps */
        .diag-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .diag-item {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 16px 0; border-bottom: 1px solid #F0F0EE;
        }
        .diag-item:last-child { border-bottom: none; }
        .diag-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; font-weight: 700; color: #9B9B96;
          flex-shrink: 0; padding-top: 2px; min-width: 24px;
        }
        .diag-text { font-size: 14px; line-height: 1.65; color: #3A3A3A; }

        /* repairs */
        .repairs-wrap { position: relative; }
        .repairs-wrap::before {
          content: ''; position: absolute;
          left: 17px; top: 36px; bottom: 36px;
          width: 1px; background: #E4E4E0; z-index: 0;
        }
        .repair-item {
          display: grid; grid-template-columns: 36px 1fr;
          gap: 20px; padding: 20px 0; position: relative; z-index: 1;
        }
        .repair-num {
          width: 36px; height: 36px;
          background: #0F0F0F; color: #F8F8F6;
          border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; font-weight: 700; flex-shrink: 0; z-index: 2;
        }
        .repair-body { padding-top: 6px; }
        .repair-ttl {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px; font-weight: 600;
          letter-spacing: -0.3px; margin-bottom: 8px;
        }
        .repair-detail { font-size: 13px; line-height: 1.7; color: #6B6B6B; margin-bottom: 12px; }
        .repair-tags { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .repair-tag {
          display: flex; align-items: center; gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: .5px;
          color: #9B9B96; text-transform: uppercase;
        }
        .repair-tag::before {
          content: ''; display: inline-block;
          width: 4px; height: 4px; border-radius: 50%;
          background: currentColor;
        }

        /* costs */
        .costs-table { width: 100%; border-collapse: collapse; }
        .costs-table th {
          text-align: left; padding: 10px 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 1.2px;
          text-transform: uppercase; color: #9B9B96;
          border-bottom: 1px solid #E4E4E0;
        }
        .costs-table td {
          padding: 14px 0; border-bottom: 1px solid #F0F0EE;
          font-size: 14px; color: #3A3A3A;
          vertical-align: top;
        }
        .costs-table tr:last-child td { border-bottom: none; }
        .cost-range {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700; font-size: 13px; color: #0F0F0F;
          white-space: nowrap;
        }
        .cost-note { font-size: 11px; color: #9B9B96; margin-top: 2px; }

        /* vehicles */
        .vehicles-list { display: flex; flex-direction: column; gap: 0; }
        .vehicle-row {
          display: grid; grid-template-columns: 120px 1fr;
          gap: 24px; padding: 14px 0;
          border-bottom: 1px solid #F0F0EE; align-items: baseline;
        }
        .vehicle-row:last-child { border-bottom: none; }
        .vehicle-make {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: -0.2px;
        }
        .vehicle-models { font-size: 13px; color: #6B6B6B; line-height: 1.5; }

        /* related codes */
        .related-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;
        }
        .related-chip {
          display: flex; align-items: center; justify-content: center;
          padding: 12px 8px; border: 1px solid #E4E4E0;
          border-radius: 8px; text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px; font-weight: 700; color: #FF3B00;
          transition: border-color .15s, background .15s;
          letter-spacing: .5px;
        }
        .related-chip:hover { border-color: #FF3B00; background: #FFF1EE; }

        /* faq */
        .faq-item { border-bottom: 1px solid #E4E4E0; }
        .faq-item:first-child { border-top: 1px solid #E4E4E0; }
        .faq-q {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 0; text-align: left;
        }
        .faq-q-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: -0.2px; color: #0F0F0F;
        }
        .faq-icon { flex-shrink: 0; color: #9B9B96; transition: transform .2s; }
        .faq-icon.open { transform: rotate(45deg); color: #FF3B00; }
        .faq-a {
          overflow: hidden; max-height: 0;
          transition: max-height .3s ease, padding .3s ease;
        }
        .faq-a.open { max-height: 300px; padding-bottom: 20px; }
        .faq-a p { font-size: 14px; line-height: 1.72; color: #6B6B6B; }

        /* ── SIDEBAR ── */
        .side-card {
          border: 1px solid #E4E4E0; border-radius: 10px;
          overflow: hidden; background: #fff; margin-bottom: 14px;
        }
        .side-card-hdr {
          padding: 13px 18px; border-bottom: 1px solid #F0F0EE;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 1.5px;
          text-transform: uppercase; color: #9B9B96;
        }
        .side-card-body { padding: 14px 18px; }
        .qf-row {
          display: flex; justify-content: space-between;
          font-size: 12px; padding: 8px 0;
          border-bottom: 1px solid #F8F8F6;
        }
        .qf-row:last-child { border-bottom: none; }
        .qf-k {
          color: #9B9B96; font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: .5px; text-transform: uppercase;
        }
        .qf-v { font-weight: 500; font-size: 12px; }
        .related-side { list-style: none; }
        .related-side li a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 10px; border-radius: 6px; text-decoration: none;
          transition: background .15s;
        }
        .related-side li a:hover { background: #F8F8F6; }
        .related-side-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px; font-weight: 700; color: #FF3B00; letter-spacing: .5px;
        }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid #E4E4E0; padding: 32px 48px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 15px;
          display: flex; align-items: center; gap: 8px;
        }
        .footer-note {
          font-size: 12px; color: #9B9B96;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .nav { padding: 16px 20px; }
          .hero { padding: 36px 20px 0; }
          .hero-top { grid-template-columns: 1fr; gap: 28px; }
          .section-nav { padding: 0 20px; }
          .body-wrap { padding: 0 20px 60px; grid-template-columns: 1fr; gap: 0; }
          .side-col { position: static; padding-top: 0; }
          .repairs-wrap::before { display: none; }
          .footer { padding: 24px 20px; flex-direction: column; gap: 10px; text-align: center; }
          .related-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <Cpu size={18} />
          OBD<span style={{ color: "#FF3B00" }}>.</span>guide
          <div className="nav-dot" />
        </a>
        <a href="/" className="nav-back">
          <ArrowLeft size={14} /> Volver a códigos
        </a>
        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={handleCopy}
            title={copied ? "¡Copiado!" : "Copiar código"}
            style={copied ? { borderColor: "#10B981", color: "#10B981" } : {}}
          >
            {copied ? <CheckCircle2 size={15} /> : <Code2 size={15} />}
          </button>
          <button className="icon-btn" title="Compartir"><Share2 size={15} /></button>
          <button className="icon-btn" title="Documentación"><BookOpen size={15} /></button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="breadcrumb">
          Códigos OBD-II <ChevronRight size={12} />
          Powertrain <ChevronRight size={12} />
          <span>{code.code}</span>
        </div>
        <div className="hero-top">
          <div>
            <div className="hero-code">{code.code}</div>
            <h1 className="hero-title">{code.title}</h1>
            <div className="hero-cat">{code.category}</div>
          </div>
          <div className="sev-panel">
            <div className="sev-label-row">
              <span className="sev-title-label">Severidad</span>
              <span className="sev-badge" style={{ color: sev.color, background: sev.bg }}>
                {sev.label}
              </span>
            </div>
            <div className="sev-track">
              <div className="sev-fill" style={{ width: `${sev.bar}%`, background: sev.color }} />
            </div>
            {[
              ["Protocolo", "SAE J1979"],
              ["Modo OBD", "$03 / $07"],
              ["MIL activo", "Sí", "#FF3B00"],
              ["Freeze frame", "Disponible", "#10B981"],
              ["Tipo", "Genérico SAE"],
            ].map(([k, v, vc]) => (
              <div className="sev-row" key={k}>
                <span className="sev-key">{k}</span>
                <span className="sev-val" style={vc ? { color: vc } : {}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── SECTION TOC NAV ── */}
      <div className="section-nav-wrap">
        <div className="section-nav">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`section-nav-item${activeSection === id ? " active" : ""}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="body-wrap">
        <main className="main-col">

          {/* 1 — Meaning */}
          <Section id="meaning" eyebrow="Descripción técnica" heading={`¿Qué significa el ${code.code}?`} icon={Search} first>
            <p className="body-text">{code.description}</p>
          </Section>

          {/* 2 — Seriousness */}
          <Section id="serious" eyebrow="Evaluación de riesgo" heading={`¿Qué tan grave es el ${code.code}?`} icon={AlertTriangle}>
            <p className="body-text">{code.seriousness}</p>
          </Section>

          {/* 3 — Can you drive */}
          <Section id="drive" eyebrow="Condiciones de uso" heading={`¿Puedes conducir con el ${code.code}?`} icon={Car}>
            <p className="body-text">{code.canDrive.answer}</p>
            <div className="callout" style={{ background: "#FFF1EE", border: "1px solid #FFD5CC", marginTop: 20 }}>
              <AlertTriangle size={15} style={{ color: "#FF3B00", flexShrink: 0, marginTop: 1 }} />
              <p style={{ color: "#7A3A30", fontSize: 13, lineHeight: 1.65 }}>{code.canDrive.warning}</p>
            </div>
          </Section>

          {/* 4 — Symptoms */}
          <Section id="symptoms" eyebrow="Síntomas" heading={`Síntomas comunes del ${code.code}`} icon={Activity}>
            <ul className="sym-list">
              {code.symptoms.map((s, i) => (
                <li className="sym-item" key={i}>
                  <Activity size={13} style={{ color: "#FF3B00", flexShrink: 0, marginTop: 3 }} />
                  {s}
                </li>
              ))}
            </ul>
          </Section>

          {/* 5 — Causes */}
          <Section id="causes" eyebrow="Causas probables" heading={`¿Qué causa el ${code.code}?`} icon={Gauge}>
            <div>
              {code.causes.map((c, i) => {
                const p = PROB[c.probability];
                return (
                  <div className="cause-item" key={i}>
                    <div className="cause-top">
                      <span className="cause-ttl">{c.title}</span>
                      <span className="cause-prob" style={{ color: p.color }}>{c.probability}</span>
                    </div>
                    <div className="prob-track">
                      <div className="prob-fill" style={{ width: p.w, background: p.color }} />
                    </div>
                    <p className="cause-detail">{c.detail}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* 6 — Diagnosis */}
          <Section id="diagnosis" eyebrow="Procedimiento diagnóstico" heading={`Cómo diagnosticar el ${code.code}`} icon={Search}>
            <ul className="diag-list">
              {code.diagnosis.map((step, i) => (
                <li className="diag-item" key={i}>
                  <span className="diag-num">0{i + 1}</span>
                  <span className="diag-text">{step}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 7 — Repairs */}
          <Section id="repairs" eyebrow="Reparación" heading={`Cómo reparar el ${code.code}`} icon={Wrench}>
            <div className="repairs-wrap">
              {code.repairs.map((r) => {
                const d = DIFF[r.difficulty];
                return (
                  <div className="repair-item" key={r.step}>
                    <div className="repair-num">{r.step}</div>
                    <div className="repair-body">
                      <div className="repair-ttl">{r.title}</div>
                      <p className="repair-detail">{r.detail}</p>
                      <div className="repair-tags">
                        <span className="repair-tag" style={{ color: "#9B9B96" }}>
                          <Clock size={10} style={{ marginRight: 3 }} />
                          {r.time}
                        </span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10, letterSpacing: .5, textTransform: "uppercase",
                          fontWeight: 700, color: d.color,
                        }}>
                          {d.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* 8 — Costs */}
          <Section id="costs" eyebrow="Costos estimados" heading={`Costo de reparación del ${code.code}`} icon={DollarSign}>
            <p className="body-text" style={{ marginBottom: 24 }}>
              Los precios varían según la marca, modelo, año del vehículo y el taller. Los rangos incluyen repuesto y mano de obra estimada.
            </p>
            <table className="costs-table">
              <thead>
                <tr>
                  <th style={{ paddingRight: 32 }}>Reparación</th>
                  <th>Costo estimado (USD)</th>
                </tr>
              </thead>
              <tbody>
                {code.repairCosts.map((c, i) => (
                  <tr key={i}>
                    <td style={{ paddingRight: 32 }}>
                      {c.item}
                      {c.note && <div className="cost-note">{c.note}</div>}
                    </td>
                    <td>
                      <span className="cost-range">${c.min} – ${c.max}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* 9 — Vehicles */}
          <Section id="vehicles" eyebrow="Compatibilidad" heading={`Vehículos afectados por el ${code.code}`} icon={Car}>
            <p className="body-text" style={{ marginBottom: 24 }}>
              El P0300 es un código genérico SAE que aplica a todos los vehículos con OBD-II (1996 en adelante). Algunos modelos son más susceptibles por diseño o materiales.
            </p>
            <div className="vehicles-list">
              {code.affectedVehicles.map((v, i) => (
                <div className="vehicle-row" key={i}>
                  <span className="vehicle-make">{v.make}</span>
                  <span className="vehicle-models">{v.models}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 10 — Emissions */}
          <Section id="emissions" eyebrow="Revisión técnica" heading={`¿El ${code.code} causa fallo en emisiones?`} icon={Wind}>
            <p className="body-text">{code.emissionsFailure}</p>
            <div className="callout" style={{ background: "#FFFBEB", border: "1px solid #FDE68A", marginTop: 20 }}>
              <AlertTriangle size={15} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} />
              <p style={{ color: "#78350F", fontSize: 13, lineHeight: 1.65 }}>
                Incluso si borras el código antes de la inspección, el sistema OBD-II necesita completar todos sus ciclos de monitoreo (readiness monitors) antes de considerarse listo. Esto puede tomar entre 50 y 150 km de conducción.
              </p>
            </div>
          </Section>

          {/* 11 — Related codes */}
          <Section id="related" eyebrow="Códigos relacionados" heading="Otros códigos DTC relacionados" icon={Code2}>
            <p className="body-text" style={{ marginBottom: 28 }}>
              Estos códigos aparecen frecuentemente junto al {code.code} o comparten causas raíz similares.
            </p>
            <div className="related-grid">
              {code.relatedCodes.map((rc) => (
                <a href={`/codes/${rc}`} className="related-chip" key={rc}>{rc}</a>
              ))}
            </div>
          </Section>

          {/* 12 — FAQ */}
          <Section id="faq" eyebrow="Preguntas frecuentes" heading={`Preguntas sobre el ${code.code}`} icon={HelpCircle}>
            <div>
              {code.faqs.map((f, i) => (
                <div className="faq-item" key={i}>
                  <button
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="faq-q-text">{f.q}</span>
                    <ChevronRight
                      size={16}
                      className={`faq-icon${openFaq === i ? " open" : ""}`}
                      style={{
                        transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform .2s",
                        color: openFaq === i ? "#FF3B00" : "#9B9B96",
                      }}
                    />
                  </button>
                  <div className={`faq-a${openFaq === i ? " open" : ""}`}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className="side-col">
          <div className="side-card">
            <div className="side-card-hdr">Datos del código</div>
            <div className="side-card-body">
              {[
                ["Código", code.code],
                ["Tipo", "Genérico SAE"],
                ["Sistema", "Powertrain"],
                ["Protocolo", "SAE J1979"],
                ["Modo OBD", "$03 / $07"],
                ["Causas", `${code.causes.length} identificadas`],
                ["Pasos diagnóstico", `${code.diagnosis.length} pasos`],
                ["Reparaciones", `${code.repairs.length} procedimientos`],
              ].map(([k, v]) => (
                <div className="qf-row" key={k}>
                  <span className="qf-k">{k}</span>
                  <span className="qf-v">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="side-card">
            <div className="side-card-hdr">Códigos relacionados</div>
            <div className="side-card-body" style={{ padding: "8px 10px" }}>
              <ul className="related-side">
                {code.relatedCodes.map((rc) => (
                  <li key={rc}>
                    <a href={`/codes/${rc}`}>
                      <span className="related-side-code">{rc}</span>
                      <ChevronRight size={13} style={{ color: "#C4C4BE" }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            padding: "18px 20px", borderRadius: 10,
            background: "#FFF1EE", border: "1px solid #FFD5CC",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <AlertTriangle size={13} style={{ color: "#FF3B00" }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, letterSpacing: 1,
                textTransform: "uppercase", color: "#FF3B00", fontWeight: 700,
              }}>
                Nota técnica
              </span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "#7A3A30" }}>
              MIL parpadeando = fallo activo en curso. Detén el vehículo. El catalizador puede destruirse en minutos de conducción continua.
            </p>
          </div>
        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">
          <Cpu size={15} />
          OBD<span style={{ color: "#FF3B00" }}>.</span>guide
        </div>
        <span className="footer-note">Referencia técnica · SAE J1979 · ISO 15031</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#C4C4BE" }}>
          v2.4.1 · 2026
        </span>
      </footer>
    </div>
  );
}