import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase. Usamos la clave de rol de servicio para permisos elevados
// y evitar problemas de RLS (Row Level Security) si es necesario.
// IMPORTANTE: Asegúrate de que tu tabla 'diagnostics' tenga una política de RLS
// que permita a los usuarios leer sus propios registros.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Usa la clave de rol de servicio
);

export default async function handler(req, res) {
  // Este API Route solo debe responder a solicitudes GET.
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usa GET.' });
  }

  try {
    // 1. Obtener la sesión del usuario.
    // Para hacer esto, necesitas pasar el token de autorización en el header de la solicitud.
    const token = req.headers.authorization?.split(' ')[1]; // El token viene como 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ error: 'No autenticado. Se requiere un token de sesión.' });
    }

    // 2. Usar el token para obtener la sesión y el usuario desde Supabase.
    // Esto es crucial para obtener el user_id de forma segura en el backend.
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Error de autenticación:', authError);
      return res.status(401).json({ error: 'Fallo al autenticar la sesión. Token inválido o expirado.' });
    }
    
    const userId = user.id; // Obtenemos el ID del usuario autenticado

    // 3. Consultar la tabla 'diagnostics' para traer todos los diagnósticos del usuario.
    // !!! Asegúrate de que el nombre de tu tabla sea 'diagnostics' y que tenga una columna 'user_id' !!!
    const { data, error: dbError } = await supabase
      .from('diagnostics') // Nombre de tu tabla de diagnósticos
      .select('mensaje_usuario, car_make, car_model, car_year, diagnostico, slug, fecha') // Selecciona las columnas que necesites
      .eq('user_id', userId) // Filtra los resultados para que coincidan con el ID del usuario autenticado
      .order('fecha', { ascending: false }); // Opcional: Ordena los diagnósticos del más reciente al más antiguo

    // Manejo de errores de la base de datos durante la consulta
    if (dbError) {
      console.error('Error al obtener diagnósticos de Supabase:', dbError);
      return res.status(500).json({
        error: 'Error al obtener los diagnósticos del usuario.',
        detalle: dbError.message,
      });
    }

    // Si no hay datos, significa que el usuario no tiene diagnósticos.
    if (!data || data.length === 0) {
      return res.status(200).json([]); // Devuelve un array vacío si no hay diagnósticos
    }

    // Devuelve los datos de los diagnósticos
    return res.status(200).json(data);

  } catch (error) {
    // Manejo de cualquier otra excepción inesperada
    console.error('Error general en la API de obtener diagnósticos:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al procesar la solicitud.',
      detalle: error.message,
    });
  }
}