import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {

    const { page, all } = req.query;

    const limit = 10;

    let query = supabase
      .from('diagnostics')
      .select(
        `
        mensaje_usuario,
        car_make,
        car_model,
        car_year,
        diagnostico,
        slug,
        city,
        fecha,
        servicios,
        precios
        `,
        { count: 'exact' }
      )
      .order('fecha', { ascending: false });

    // ======================
    // 👉 MODO TODOS
    // ======================
    if (all === 'true') {

      const { data, error, count } = await query;
      console.log('hola', data);
      
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener diagnósticos' });
      }

      return res.status(200).json({
        mode: 'all',
        total: count,
        data
      });
    }

    // ======================
    // 👉 MODO PAGINADO
    // ======================
    const currentPage = parseInt(page || '1', 10);

    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener diagnósticos' });
    }

    return res.status(200).json({
      mode: 'paged',
      page: currentPage,
      perPage: limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data
    });

  } catch (err) {

    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });

  }
}
