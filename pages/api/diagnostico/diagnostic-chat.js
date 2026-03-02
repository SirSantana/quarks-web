import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

/* ================== SUPABASE ================== */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* ================== SCHEMA IA ================== */

const responseSchema = z.object({
  message: z.string(),
  isFinal: z.boolean(),

  preciosEstimados: z.array(
    z.object({
      item: z.string(),
      precio: z.string(),
    })
  ).optional()
});

/* ================== HANDLER ================== */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { slug, brand, model, conversation } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug requerido" });
    }

    if (!conversation || !Array.isArray(conversation)) {
      return res.status(400).json({ error: "Conversación inválida" });
    }

    /* ================== IA ================== */

    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: responseSchema,
      prompt: `
Eres un mecánico automotriz experto con 25 años de experiencia en Colombia.

Vehículo: ${brand} ${model}

Analiza la conversación completa.

REGLAS CRÍTICAS:

- Si existe una causa probable identificable,
  emite inmediatamente el diagnóstico final.
  isFinal = true

- Si isFinal = true, incluye también precios estimados reales en COP.
- Los precios deben incluir mano de obra + repuestos.
- Usa rangos claros. Ejemplo: "350.000 - 800.000 COP"

- Solo haz UNA pregunta adicional si la información es completamente insuficiente.
- No prolongues la conversación innecesariamente.
- No hagas más de una pregunta por respuesta.
- Máximo 500 caracteres si es diagnóstico final.

Español neutro latino.
Tono profesional y claro.

Conversación:
${JSON.stringify(conversation)}

Responde SOLO en JSON válido:

{
  "message": "...",
  "isFinal": boolean,
  "preciosEstimados": [
    { "item": "...", "precio": "..." }
  ]
}

Si NO es diagnóstico final, no incluyas preciosEstimados.
`
    });

    const response = result.object;

    const firstUserMessage =
      conversation.find((msg) => msg.role === "user")?.content || "";

    /* ================== GUARDAR EN DB ================== */

    if (response.isFinal) {

      const precios = Array.isArray(response.preciosEstimados)
        ? response.preciosEstimados.filter(
            (p) => p.item && p.precio
          )
        : [];

      const { error: dbError } = await supabase
        .from("diagnostics")
        .upsert({
          slug,
          car_model: model,
          car_make: brand,
          diagnostico: response.message.trim(),
          precios,
          status: "done",
          fecha: new Date(),
          mensaje_usuario: firstUserMessage,
        });

      if (dbError) {
        console.error("Error guardando en DB:", dbError);
      }
    }

    /* ================== RESPUESTA ================== */

    return res.status(200).json({
      message: response.message,
      isFinal: response.isFinal,
      preciosEstimados: response.isFinal
        ? response.preciosEstimados || []
        : []
    });

  } catch (error) {
    console.error("❌ Error en diagnóstico:", error);
    return res.status(500).json({
      error: "Error procesando diagnóstico",
    });
  }
}
