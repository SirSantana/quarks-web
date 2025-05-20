import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/Context/AuthContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
const { user, loading:load, signOut } = useAuth();

const handleLogout = async () => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    setUser(null);
    // Opcional: redirigir a la página de inicio después de cerrar sesión
    router.push('/');
  } catch (error) {
    setError(error.message || 'Ocurrió un error al cerrar sesión');
  } finally {
    setLoading(false);
  }
};
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

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Ya has iniciado sesión
          </h1>
          
          <div className="space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Ir al Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión o Registrarse</h1>
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
