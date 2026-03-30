import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const MAX_MESSAGE_LENGTH = 400;

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
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { mensaje, userId } = req.body;

    const mensajeTrimmed = mensaje?.trim();
    if (!mensajeTrimmed) {
      return res.status(400).json({ error: "Mensaje inválido" });
    }

    if (mensajeTrimmed.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Máximo ${MAX_MESSAGE_LENGTH} caracteres`,
      });
    }

    const slug = createSlug(mensajeTrimmed);

    // 1️⃣ Verificar si ya existe
    const { data: existing } = await supabase
      .from("diagnostics")
      .select("slug, status")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return res.status(200).json(existing);
    }
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    // 2️⃣ Crear diagnóstico pendiente
    await supabase.from("diagnostics").insert({
      slug,
      mensaje_usuario: mensajeTrimmed,
      user_id: userId,
      status: "pending",
    });
    process.nextTick(() => {
      fetch(`${baseUrl}/api/diagnostico/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
    });
    // 3️⃣ Responder rápido
    return res.status(202).json({
      slug,
      status: "pending",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
}
