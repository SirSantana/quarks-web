// pages/auth/callback.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error en callback:', error);
          router.push('/login?error=auth_error');
          return;
        }

        if (data.session) {
          // Aquí defines a dónde quieres redirigir después del login exitoso
          router.push('/v2'); // Cambia esta ruta por la que necesites
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error procesando callback:', error);
        router.push('/login?error=callback_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div>
      <div>
        <div></div>
        <p>Procesando autenticación...</p>
      </div>
    </div>
  );
}