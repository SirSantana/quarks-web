import { createClient } from "@/lib/supabaseServer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug requerido" });
  }

  try {
    const { data, error } = await supabase
      .from("diagnostics")
      .select(`
        slug,
        status,
        mensaje_usuario,
        diagnostico,
        servicios,
        precios,
        city,
        country,
        car_make,
        car_model,
        car_year
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST301") {
        return res.status(404).json({ error: "Diagnóstico no encontrado" });
      }

      console.error(error);
      return res.status(500).json({ error: "Error consultando diagnóstico" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
}