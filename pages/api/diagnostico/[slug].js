// pages/api/diagnostico/[slug].js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Usa la clave de rol de servicio
);

export default async function handler(req, res) {
  // Este API Route solo debe responder a solicitudes GET.
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usa GET.' });
  }

  const { slug } = req.query;
  
  // Verifica que el slug esté presente en la solicitud
  if (!slug) {
    return res.status(400).json({ error: 'El slug del diagnóstico es requerido en la URL.' });
  }

  try {
    // Consulta la tabla 'diagnoses' en Supabase para encontrar el registro con el slug dado.
    // !!! Asegúrate de que el nombre de tu tabla sea 'diagnoses' o cámbialo aquí si es diferente !!!
    // !!! Asegúrate de que los nombres de las columnas ('slug', 'mensaje_usuario', etc.) coincidan exactamente con tu tabla !!!
    const { data, error: dbError } = await supabase
      .from('diagnostics') // Nombre de tu tabla de diagnósticos
      .select('mensaje_usuario, city, country, diagnostico, precios, servicios, slug, car_make, car_model, car_year')
      .ilike('slug', slug) // Filtra el resultado para que coincida con el slug de la URL
      .single(); // Esperamos como máximo UN resultado porque el slug debería ser único
        
    // Manejo de errores de la base de datos durante la consulta
    if (dbError) {
      console.error('Error al obtener diagnóstico por slug de Supabase:', dbError);
      // Supabase suele usar el código 'PGRST301' cuando no encuentra ninguna fila
      if (dbError.code === 'PGRST301') {
        // Si no se encuentra el diagnóstico con ese slug, devuelve un 404 Not Found.
        return res.status(404).json({ error: 'Diagnóstico no encontrado.' });
      }
      // Para cualquier otro error de la base de datos, devuelve un 500 Internal Server Error.
      return res.status(500).json({
        error: 'Error al obtener el diagnóstico.',
        detalle: dbError.message, // Incluir el mensaje técnico de la DB para depuración
      });
    }

    // Si la base de datos no devolvió datos (y no hubo un error de DB que lo explique),
    // también consideramos que el diagnóstico no fue encontrado.
    if (!data) {
      return res.status(404).json({ error: 'Diagnóstico no encontrado.' });
    }

    return res.status(200).json(data);

  } catch (error) {
    // Manejo de cualquier otra excepción inesperada que pueda ocurrir.
    console.error('Error general en la API de obtener diagnóstico:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al procesar la solicitud.',
      detalle: error.message, // Incluir el mensaje técnico del error
    });
  }
}