import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ================== SUPABASE ==================
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ================== CONSTANTES ==================
const ALLOWED_SERVICE_CATEGORIES = [
  "Mecánica General",
  "Mantenimiento Preventivo",
  "Revisión General",
  "Pre-compra / Revisión",
  "Tecnicomecanica",
  "Diagnóstico General (No Electrónico)",
  "Lavado y Detallado",
  "Motor",
  "Sistema de Combustible",
  "Sistema de Escape",
  "Sistema de Enfriamiento",
  "Transmisión y Embrague",
  "Frenos",
  "Suspensión",
  "Dirección",
  "Electricidad Automotriz",
  "Aire Acondicionado / Calefacción",
  "Diagnóstico Electrónico",
  "Latonería y Pintura",
  "Vidrios y Carrocería Menor",
  "Tapicería e Interiores",
  "Iluminación (Luces)",
  "Audio y Alarmas",
  "Polarizado / Películas de Seguridad",
  "Instalación de Accesorios",
  "Llantas y Rines",
  "Alineación",
  "Balanceo",
  "Sistemas de Seguridad (Airbags)",
  "Vehículos Pesados",
  "Motores Diesel",
  "Vehículos Híbridos/Eléctricos",
  "Sistemas 4x4 / Doble Tracción",
  "Restauración de Vehículos Clásicos",
  "Modificaciones / Tuning",
  "Cerrajería Automotriz",
];

// ================== SCHEMA IA ==================
const responseSchema = z.object({
  diagnostico: z.string(),
  preciosEstimados: z.array(
    z.object({
      item: z.string(),
      precio: z.string(),
    })
  ),
  serviciosRequeridos: z.array(z.string()),
  carMake: z.string().nullable(),
  carModel: z.string().nullable(),
  carYear: z.string().nullable(),
});

// ================== HANDLER ==================
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  let diagnosticId = null;

  try {
    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug requerido" });
    }

    // 1️⃣ Obtener diagnóstico por slug
    const { data: diagnostic, error } = await supabase
      .from("diagnostics")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !diagnostic) {
      return res.status(404).json({ error: "Diagnóstico no encontrado" });
    }

    if (diagnostic.status !== "pending") {
      return res.status(200).json({
        message: "Diagnóstico ya procesado o en proceso",
        status: diagnostic.status,
      });
    }

    diagnosticId = diagnostic.id;

    // 2️⃣ Marcar como processing
    await supabase
      .from("diagnostics")
      .update({ status: "processing" })
      .eq("id", diagnosticId);

    const mensaje = diagnostic.mensaje_usuario || '';

    let location = { city: 'Bogotá', country: 'Colombia' };
    let userCity = location.city || 'Bogotá';
    let userCountry = location.country || 'Colombia';

    // 3️⃣ Llamada a IA
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: responseSchema,
      prompt: `# ASISTENTE MECÁNICO VIRTUAL EXPERTO

Eres un mecánico certificado con 25+ años de experiencia en diagnósticos automotrices. 

## CONTEXTO DEL USUARIO
- **Ubicación**: ${userCity}, ${userCountry}
- **Problema reportado**: "${mensaje}"

## ANÁLISIS DEL VEHÍCULO
${(() => {
  // Esta función se ejecutará después de que structuredResponse esté disponible
  const buildVehicleContext = (response) => {
    const make = response?.carMake?.trim() || "";
    const model = response?.carModel?.trim() || "";
    const year = response?.carYear ? parseInt(response.carYear) : null;

    if (!make && !model && !year) {
      return "**Vehículo**: No especificado (aplicar diagnóstico general)";
    }

    let vehicleInfo = "**Vehículo identificado**: ";
    if (year) vehicleInfo += `${year} `;
    if (make) vehicleInfo += `${make} `;
    if (model) vehicleInfo += `${model}`;

    return (
      vehicleInfo +
      "\n- Aplicar conocimiento específico de esta marca/modelo para diagnóstico más preciso"
    );
  };

  return "<!-- Se completará con información del vehículo detectado -->";
})()}

## INSTRUCCIONES DE DIAGNÓSTICO

### 1. DIAGNÓSTICO PRELIMINAR
- Identifica las **2-5 causas más probables** basándote en los síntomas
- Usa analogías simples y explicaciones que cualquier persona entienda
- Incluye por qué sucede cada problema de forma didáctica
- Si hay información del vehículo, considera problemas conocidos de esa marca/modelo/año
- **Límite**: 500 caracteres máximo
- **Estilo**: Conversacional, empático, con jerga técnica
- No digas que el problema es algo común, a no ser que si sea verdad en el modelo del auto, no finalices diciendo que Revisaré cada uno para determinar la causa. 

### 2. ESTIMACIÓN DE COSTOS
- Proporciona costos realistas para **talleres de gama media** en ${userCity}, ${userCountry}
- Usa la **moneda local** de ${userCountry}
- Incluye tanto **repuestos** como **mano de obra**
- Prioriza los ítems más probables del diagnóstico
- Si no tienes datos específicos de ${userCity}, usa promedios de ${userCountry}
- Formato de rangos: "150,000 - 300,000 COP" (ejemplo)

### 3. CATEGORÍAS DE SERVICIO
**IMPORTANTE**: Solo selecciona de esta lista exacta (USAR TEXTO EXACTO, SIN MODIFICACIONES):
${JSON.stringify(ALLOWED_SERVICE_CATEGORIES)}

**REGLAS CRÍTICAS PARA SERVICIOS**:
- Copiar el texto EXACTAMENTE como aparece en la lista
- NO añadir saltos de línea (\n)
- NO modificar la puntuación ni acentos
- Máximo 3-5 categorías que mejor se alineen con tu diagnóstico preliminar
- Si tienes dudas, prefiere categorías más generales como "Diagnóstico General (No Electrónico)" o "Mecánica General"

## EJEMPLO DE SERVICIOS CORRECTOS:
✅ ["Motor", "Sistema de Combustible", "Diagnóstico General (No Electrónico)"]
❌ ["Motor", "Sistema de Combusti\nble", "Diagnóstico General"]

Selecciona máximo 3-5 categorías que mejor se alineen con tu diagnóstico preliminar.

### 4. DETECCIÓN DE VEHÍCULO
- **Marca**: Extrae solo si se menciona claramente (Toyota, Ford, Chevrolet, etc.)
- **Modelo**: Extrae solo si se especifica (Corolla, Focus, Spark, etc.)
- **Año**: Extrae solo si se menciona explícitamente un año válido (1990-2025)
- **Si hay dudas**: Usar null

## EJEMPLOS DE RESPUESTA ESPERADA

### Ejemplo 1 - Problema de motor:
\`\`\`json
{
  "diagnostico": "Basándome en los síntomas descritos, Falla de bobina de encendido (40%), sensor MAF sucio (25%), filtro de aire obstruido (20%), problema en inyectores (15%). Síntomas típicos de pérdida de potencia y consumo irregular.",
  "preciosEstimados": [
    {"item": "Reemplazo bobina de encendido", "precio": "80,000 - 150,000 COP"},
    {"item": "Limpieza sensor MAF", "precio": "25,000 - 45,000 COP"},
    {"item": "Cambio filtro de aire", "precio": "15,000 - 30,000 COP"}
  ],
  "serviciosRequeridos": ["Motor", "Sistema eléctrico", "Mantenimiento"],
  "carMake": "Toyota",
  "carModel": "Corolla",
  "carYear": "2015"
}
\`\`\`

## REGLAS CRÍTICAS
1. **Solo JSON válido** - Sin texto adicional fuera del objeto
2. **Límites de caracteres** - Diagnóstico máximo 500 caracteres
3. **Categorías exactas** - Solo usar las proporcionadas en ALLOWED_SERVICE_CATEGORIES
4. **Costos locales** - Siempre en moneda de ${userCountry}
5. **Especificidad** - Si hay marca/modelo, ser específico para ese vehículo

Genera el diagnóstico ahora:`,
    });

    const response = result.object;

    // 4️⃣ Limpieza y validación
    const diagnostico = response.diagnostico
      .replace(/\s+/g, " ")
      .trim();

    const servicios = response.serviciosRequeridos
      .map((s) => s.replace(/\s+/g, " ").trim())
      .filter((s) => ALLOWED_SERVICE_CATEGORIES.includes(s));

    const precios = Array.isArray(response.preciosEstimados)
      ? response.preciosEstimados.filter((p) => p.item && p.precio)
      : [];

    let carYear = null;
    if (response.carYear) {
      const y = parseInt(response.carYear, 10);
      if (!isNaN(y) && y >= 1900 && y <= new Date().getFullYear() + 1) {
        carYear = y;
      }
    }

    // 5️⃣ Guardar resultado
    await supabase
      .from("diagnostics")
      .update({
        diagnostico,
        precios,
        servicios,
        car_make: response.carMake?.trim() || null,
        car_model: response.carModel?.trim() || null,
        car_year: carYear,
        status: "done",
      })
      .eq("id", diagnosticId);

    return res.status(200).json({
      message: "Diagnóstico procesado correctamente",
      slug,
    });
  } catch (err) {
    console.error("❌ Error procesando diagnóstico:", err);

    if (diagnosticId) {
      await supabase
        .from("diagnostics")
        .update({ status: "error" })
        .eq("id", diagnosticId);
    }

    return res.status(500).json({ error: "Error procesando diagnóstico" });
  }
}
