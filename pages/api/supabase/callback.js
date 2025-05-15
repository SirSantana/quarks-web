// pages/api/supabase/callback.ts
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
  const supabase = createPagesServerClient({ req, res });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Error obteniendo el usuario:', error);
    return res.redirect('/login');
  }

  const { id, user_metadata } = user;
  const name = user_metadata?.full_name || user_metadata?.name || '';
  const avatar_url = user_metadata?.avatar_url || '';

  // Upsert a la tabla 'profiles'
  const { error: upsertError } = await supabase.from('profiles').upsert({
    id,
    name,
    avatar_url,
  });

  if (upsertError) {
    console.error('Error al guardar en profiles:', upsertError);
  }

  // Redirige al home o a donde tú quieras
  return res.redirect('/');
}
