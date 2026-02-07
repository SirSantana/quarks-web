import { createClient } from "@/lib/supabaseServer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }
console.log('req', req.query);

  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: "Slug requerido" });
    }

    // Obtener diagnóstico
    const { data: diagnostic, error } = await supabase
      .from("diagnostics")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !diagnostic) {
      return res.status(404).json({ 
        error: "Diagnóstico no encontrado",
        status: "not_found"
      });
    }

    // Retornar estado actual
    return res.status(200).json({
      status: diagnostic.status,
      diagnostico: diagnostic.diagnostico || null,
      servicios: diagnostic.servicios || [],
      precios: diagnostic.precios || [],
      prioridad: diagnostic.prioridad || null,
      tiempo_estimado: diagnostic.tiempo_estimado || null,
      car_make: diagnostic.car_make || null,
      car_model: diagnostic.car_model || null,
      car_year: diagnostic.car_year || null,
      city: diagnostic.city || null,
      country: diagnostic.country || null,
      mensaje_usuario: diagnostic.mensaje_usuario || null,
      slug: diagnostic.slug,
      causas: diagnostic.causas || [],
      soluciones: diagnostic.soluciones || [],
      faqs: diagnostic.faqs || [],

    });


  } catch (err) {
    console.error("Error obteniendo diagnóstico:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}