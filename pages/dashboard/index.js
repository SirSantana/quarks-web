import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/Context/AuthContext';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Información del usuario</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Proveedor:</strong> {user.app_metadata?.provider || 'Desconocido'}</p>
        </div>
      </div>
    </div>
  );
}