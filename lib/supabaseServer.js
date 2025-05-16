// @/lib/supabaseServer.js
// Helper para crear un cliente Supabase del lado del servidor para Pages Router API routes
import { createServerClient } from '@supabase/ssr';
// *** ¡IMPORTACIÓN CORRECTA! ***
import { parse, serialize } from 'cookie'; // <-- parse y serialize están disponibles por sus nombres

export function createClient(req, res) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => {
          const cookies = req?.headers?.cookie ?? '';
          // *** ¡CORRECCIÓN: USA parse DIRECTAMENTE! ***
          const parsed = parse(cookies); // Antes: cookie.parse(cookies)
          return Object.entries(parsed).map(([name, value]) => ({ name, value }));
        },
        setAll: (cookies) => {
          const setCookies = cookies.map(({ name, value, options }) =>
            // *** ¡CORRECCIÓN: USA serialize DIRECTAMENTE! ***
            serialize(name, value, { // Antes: cookie.serialize(...)
              path: '/',
              httpOnly: true,
              sameSite: 'Lax',
              secure: process.env.NODE_ENV === 'production',
              ...options,
            })
          );
          res.setHeader('Set-Cookie', setCookies);
        },
      },
    }
  );
}