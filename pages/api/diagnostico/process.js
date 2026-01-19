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

    const mensaje = diagnostic.mensaje_usuario;
    const city = diagnostic.city || "Bogotá";
    const country = diagnostic.country || "Colombia";

    // 3️⃣ Llamada a IA
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: responseSchema,
      prompt: `
Eres un mecánico experto con más de 25 años de experiencia.

Ubicación: ${city}, ${country}
Problema del vehículo: "${mensaje}"

Diagnostica el problema, estima precios aproximados locales
y selecciona servicios SOLO de esta lista:
${JSON.stringify(ALLOWED_SERVICE_CATEGORIES)}

Responde SOLO con JSON válido.
`,
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
