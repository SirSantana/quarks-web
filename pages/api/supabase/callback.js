import { createClient } from '@/lib/supabaseServer'

export default async function handler(req, res) {
  const supabase = createClient(req, res)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return res.redirect('/login')
  }

  // Puedes hacer upsert a la tabla "profiles", etc.

  return res.redirect('/dashboard')
}
