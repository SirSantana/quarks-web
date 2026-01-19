import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_MESSAGE_LENGTH = 400;

const ALLOWED_SERVICE_CATEGORIES = [
  "Mecánica General", "Mantenimiento Preventivo", "Revisión General",
  "Motor", "Sistema de Combustible", "Transmisión y Embrague",
  "Frenos", "Suspensión", "Dirección", "Electricidad Automotriz",
  "Aire Acondicionado / Calefacción", "Diagnóstico Electrónico",
  "Latonería y Pintura", "Llantas y Rines", "Alineación"
];

const responseSchema = z.object({
  diagnostico: z.string().describe("Diagnóstico preliminar del problema descrito"),
  preciosEstimados: z.array(
    z.object({
      item: z.string().describe("Nombre del servicio o parte"),
      precio: z.string().describe("Rango de precio en COP"),
    })
  ),
  serviciosRequeridos: z.array(z.string()).describe("Servicios de la lista de categorías"),
  carMake: z.string().nullable().describe("Marca del vehículo o null"),
  carModel: z.string().nullable().describe("Modelo del vehículo o null"),
  carYear: z.string().nullable().describe("Año del vehículo o null"),
});

function createSlug(text) {
  return text
    .toLowerCase()
    .replaceAll(/ñ/g, "n")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  try {
    const { mensaje, userId } = req.body;
    
    if (!mensaje || typeof mensaje !== "string") {
      return res.status(400).json({ error: "Mensaje inválido" });
    }

    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from("diagnostico_usos")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfToday.toISOString());

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al verificar los límites" });
    }

    const { error: insertError } = await supabase
      .from("diagnostico_usos")
      .insert({ user_id: userId });

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ error: "No se pudo registrar el uso" });
    }
    
    const mensajeTrimmed = mensaje.trim();

    if (mensajeTrimmed.length === 0) {
      return res.status(400).json({ error: "El mensaje no puede estar vacío" });
    }

    if (mensajeTrimmed.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Mensaje muy largo. Máximo ${MAX_MESSAGE_LENGTH} caracteres.`,
      });
    }

    let location = { city: 'Bogotá', country: 'Colombia' };
    let userCity = location.city || 'Bogotá';
    let userCountry = location.country || 'Colombia';

    const problemaSlug = createSlug(mensajeTrimmed);
    if (!problemaSlug) {
      return res.status(400).json({
        error: "No se pudo generar identificador válido.",
      });
    }

    const { data: existingDiagnosis, error: selectError } = await supabase
      .from("diagnostics")
      .select("slug")
      .ilike("slug", problemaSlug);

    if (selectError && selectError.code !== "PGRST301") {
      return res.status(500).json({
        error: "Error al verificar diagnóstico existente.",
        detalle: selectError.message,
      });
    }

    if (existingDiagnosis.length > 0) {
      return res.status(200).json({ 
        slug: mensaje, 
        message: "Diagnóstico ya existe." 
      });
    }

    // PROMPT OPTIMIZADO - Reducido de 2500 a 1200 caracteres
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: responseSchema,
      prompt: `Eres mecánico experto con 25+ años de experiencia. Ubicación: ${userCity}, ${userCountry}. Problema: "${mensaje}"

DIAGNÓSTICO (máx 400 caracteres):
- Identifica 3-5 causas probables con % estimado
- Explica de forma simple y didáctica
- Si mencionan marca/modelo/año, considera problemas específicos de ese vehículo
- No uses frases genéricas como "es común" sin contexto

PRECIOS (talleres gama media en ${userCity}):
- 3-5 ítems con rangos en COP (ej: "150,000 - 200,000 COP")
- Incluye repuestos Y mano de obra
- Prioriza items del diagnóstico

SERVICIOS (solo de esta lista exacta):
${JSON.stringify(ALLOWED_SERVICE_CATEGORIES)}
Selecciona 2-4 categorías. Copia texto EXACTO sin modificar.

VEHÍCULO:
Extrae marca/modelo/año solo si se mencionan claramente. Si hay duda, usa null.

Ejemplo respuesta:
{
  "diagnostico": "Falla bobina encendido (40%), sensor MAF sucio (30%), filtro aire (20%), inyectores (10%). Pérdida potencia indica problema eléctrico o combustión.",
  "preciosEstimados": [
    {"item": "Bobina de encendido", "precio": "80,000 - 120,000 COP"},
    {"item": "Limpieza sensor MAF", "precio": "25,000 - 35,000 COP"}
  ],
  "serviciosRequeridos": ["Motor", "Electricidad Automotriz"],
  "carMake": "Toyota",
  "carModel": "Corolla",
  "carYear": "2015"
}

Responde SOLO con JSON válido:`,
    });
    
    const structuredResponse = result.object;

    // Limpieza y validación
    const cleanedDiagnostico = structuredResponse.diagnostico
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const cleanedServices = Array.isArray(structuredResponse.serviciosRequeridos)
      ? structuredResponse.serviciosRequeridos
          .map((service) => {
            if (typeof service !== "string") return "";
            return service
              .replace(/\n/g, " ")
              .replace(/\s+/g, " ")
              .trim();
          })
          .filter((service) => service.length > 0)
      : [];

    const validatedServices = cleanedServices.filter((service) => {
      return ALLOWED_SERVICE_CATEGORIES.includes(service);
    });

    const carMake = structuredResponse.carMake?.trim() || null;
    const carModel = structuredResponse.carModel?.trim() || null;
    const carYearString = structuredResponse.carYear?.toString().trim() || null;

    let carYear = null;
    if (carYearString) {
      const yearNum = parseInt(carYearString, 10);
      if (!isNaN(yearNum) && yearNum >= 1900 && yearNum <= new Date().getFullYear() + 1) {
        carYear = yearNum;
      }
    }

    const validatedPrecios = Array.isArray(structuredResponse.preciosEstimados)
      ? structuredResponse.preciosEstimados.filter(
          (item) => item && typeof item === "object" && item.item && item.precio
        )
      : [];

    structuredResponse.diagnostico = cleanedDiagnostico;
    structuredResponse.serviciosRequeridos = validatedServices;
    structuredResponse.preciosEstimados = validatedPrecios;
    structuredResponse.carMake = carMake;
    structuredResponse.carModel = carModel;
    structuredResponse.carYear = carYear;

    const { data, error: dbError } = await supabase
      .from("diagnostics")
      .insert([
        {
          mensaje_usuario: mensaje,
          city: userCity || null,
          slug: problemaSlug,
          country: userCountry || null,
          diagnostico: cleanedDiagnostico,
          precios: structuredResponse.preciosEstimados,
          servicios: structuredResponse.serviciosRequeridos,
          car_make: carMake,
          car_model: carModel,
          car_year: carYear,
          user_id: userId,
        },
      ])
      .select("slug")
      .single();

    if (dbError) {
      console.error("Error al guardar:", dbError);
      return res.status(500).json({
        error: "Error al guardar diagnóstico.",
        detalle: dbError.message,
      });
    }
    
    return res.status(200).json({ slug: data.slug, response: structuredResponse });
    
  } catch (error) {
    let userErrorMessage = "Error al procesar tu solicitud.";

    if (error.message) {
      if (error.message.includes("GenerateContentRequest")) {
        userErrorMessage = "Error con el asistente. Intenta más tarde.";
      } else if (error.message.includes("duplicate key")) {
        userErrorMessage = "Este problema ya fue diagnosticado.";
      }
    }

    if (error.response?.status) {
      userErrorMessage += ` (${error.response.status})`;
    }

    return res.status(500).json({
      error: userErrorMessage,
      detalle: error.message || "Error desconocido",
    });
  }
}

// Configuración para Vercel
export const config = {
  maxDuration: 10, // Optimizado para plan gratuito
};