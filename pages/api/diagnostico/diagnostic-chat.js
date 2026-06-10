import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const responseSchema = z.object({
  isFinal: z.boolean(),
  message: z.string(),

  // Solo cuando isFinal = false: preguntas dinámicas para el usuario
  preguntasSeguimiento: z
    .array(
      z.object({
        pregunta: z.string(),
        opciones: z.array(z.string()).min(2).max(5),
      }),
    )
    .optional(),

  // Solo cuando isFinal = true
  sintomasIdentificados: z.array(z.string()).optional(),
  causasProbables: z
    .array(
      z.object({
        causa: z.string(),
        probabilidad: z.number(),
        explicacion: z.string(),
      }),
    )
    .optional(),
  pruebasRecomendadas: z
    .array(
      z.object({
        id: z.number(),
        nombre: z.string(),
        descripcion: z.string(),
        prioridad: z.enum(["Importante", "Recomendado", "Opcional"]),
      }),
    )
    .optional(),
  solucionesCostos: z
    .array(
      z.object({
        item: z.string(),
        precioMin: z.number(),
        precioMax: z.number(),
        tiempoEstimado: z.string(),
      }),
    )
    .optional(),
});

const FALLBACK_MODELS = [
  // "gemini-2.5-flash",
   "gemini-2.0-flash"];

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  try {
    const { slug, conversation, brand, model } = req.body;
    console.log(slug, conversation);

    if (!slug || !conversation) {
      return res.status(400).json({ error: "Faltan parámetros requeridos" });
    }

    const prompt = `
Eres un mecánico experto en Colombia. Analiza la conversación sobre el vehículo ${brand || "Vehículo"} ${model || ""}.

REGLAS ESTRICTAS:
1. Lee toda la conversación y evalúa si tienes suficiente información para un diagnóstico certero.
2. Si la información es suficiente → pon isFinal = true y llena todos los arrays del diagnóstico.
3. Si necesitas más datos → pon isFinal = false, en 'message' escribe un breve resumen de lo que entendiste, y en 'preguntasSeguimiento' genera entre 1 y 3 preguntas ESPECÍFICAS al problema descrito (no genéricas). Cada pregunta debe tener entre 2 y 5 opciones de respuesta cortas y concretas.
4. Las preguntas deben ser relevantes al síntoma: si alguien dice "vibración", pregunta cuándo vibra, a qué velocidad, si va acompañado de ruido, etc.
5. Cuando isFinal = true: causasProbables con porcentajes que sumen ~100, pruebasRecomendadas con prioridades, solucionesCostos con precios reales en COP.

Conversación actual:
${JSON.stringify(conversation)}
`;

    let lastError;

    for (const modelId of FALLBACK_MODELS) {
      try {
        const result = await generateObject({
          model: google(modelId),
          schema: responseSchema,
          maxRetries: 2,
          prompt,
        });

        const data = result.object;

        if (data.isFinal) {
          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
          );

          const costos = data.solucionesCostos || [];
          const { error: sbError } = await supabase
            .from("diagnostics_v2")
            .upsert(
              {
                slug,
                car_make: brand,
                car_model: model,
                user_problem:
                  conversation.find((m) => m.role === "user")?.content || "",
                conversation,
                sintomas: data.sintomasIdentificados || [],
                causas_probables: data.causasProbables || [],
                pruebas_recomendadas: data.pruebasRecomendadas || [],
                soluciones_costos: data.solucionesCostos || [],
                precio_min: costos.length
                  ? Math.min(...costos.map((s) => s.precioMin))
                  : null,
                precio_max: costos.length
                  ? Math.max(...costos.map((s) => s.precioMax))
                  : null,
                status: "done",
              },
              { onConflict: "slug" },
            );
          if (sbError) console.error("[supabase] Error:", sbError);
          else console.log("[supabase] Guardado correctamente");
        }

        return res.status(200).json(data);
      } catch (err) {
        const isOverload =
          err.message?.includes("high demand") ||
          err.message?.includes("overloaded") ||
          err.message?.includes("503") ||
          err.reason === "maxRetriesExceeded";

        lastError = err;

        if (isOverload) {
          console.warn(
            `[diagnostic-chat] ${modelId} saturado, probando siguiente...`,
          );
          continue;
        }

        throw err;
      }
    }

    console.error("[diagnostic-chat] Todos los modelos saturados:", lastError);
    return res.status(503).json({
      error:
        "El servicio de IA está temporalmente saturado. Intenta de nuevo en unos segundos.",
    });
  } catch (error) {
    console.error("[diagnostic-chat] Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
