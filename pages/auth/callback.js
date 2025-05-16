import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      // El hash contiene el token de acceso y refresh token
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          router.push('/dashboard'); // Redirigir al dashboard después de iniciar sesión exitosamente
        } else {
          router.push('/login'); // Redirigir al login si no hay usuario
        }
      });
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redireccionando...</p>
    </div>
  );
}