import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Esta función manejará tanto el login como el registro automático
      // Si el usuario no existe, Supabase lo creará automáticamente
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // Aseguramos que se creen nuevos usuarios si no existen
          createUser: true,
        },
      });

      if (error) throw error;
      
    } catch (error) {
      setError(error.message || 'Ocurrió un error durante la autenticación con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión o Registrarse</h1>
        
        {error && (
          <div className="bg-red-100 p-3 rounded mb-4 text-red-700">
            {error}
          </div>
        )}
        
        <div className="mb-4 text-sm text-gray-600 text-center">
          Con Gmail puedes acceder directamente. Si es tu primera vez, crearemos tu cuenta automáticamente.
        </div>
        
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Procesando...' : 'Continuar con Gmail'}
        </button>
      </div>
    </div>
  );
}
