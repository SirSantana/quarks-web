// pages/api/user/diagnoses.js
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// Ya no necesitas importar 'cookie' aquí si usas createPagesServerClient

export default async function handler(req, res) {
   // --- ¡AGREGA ESTE LOG AQUÍ! ---
   console.log(req.headers.cookie, 'Raw Cookie Header received by API');
   // --- Fin del Log ---

  if (req.method !== 'GET') {
    // ... resto del código ...
  }

  try {
    const supabase = createPagesServerClient({ req, res });

     console.log(supabase, 'Supabase Client Initialized in API'); // Opcional: ver inicialización del cliente

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    console.log(user, 'user after getUser() in API'); // <--- Este es el log que te da null

    // ... resto del código ...
  } catch (error) {
    // ... manejo de errores ...
  }
}