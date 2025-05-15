// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Necesitas esto para la redirección
import { supabase } from '@/lib/supabaseClient'; // tu cliente supabase PUBLICO

// Iconos básicos (necesitas instalarlos si no los tienes: npm install lucide-react)
import { User, Loader, AlertCircle, Wrench, ChevronRight, LogOut } from 'lucide-react';


export default function DashboardUsuario() {
  const router = useRouter(); // Inicializa el router

  const [user, setUser] = useState(null); // Usuario autenticado
  const [profileData, setProfileData] = useState(null); // Datos del perfil
  const [diagnoses, setDiagnoses] = useState([]); // Lista de diagnósticos

  const [loading, setLoading] = useState(true); // Estado general de carga inicial
  const [error, setError] = useState(null); // Estado para errores
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Para el estado de auth inicial

  // --- Efecto para cargar usuario, perfil y diagnósticos ---
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      setError(null); // Limpiar errores previos

      // 1. Obtener el usuario autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log('No hay usuario autenticado, redirigiendo a login.');
        // Si no hay usuario o error, redirigir a login
        setIsAuthenticated(false);
        router.push('/login'); // Redirigir
        return; // Detener la ejecución del efecto
      }

      // Si hay usuario, guardarlo y marcar como autenticado
      setUser(user);
      setIsAuthenticated(true);
      console.log('Usuario autenticado:', user.id); // Log para depuración


      // 2. Cargar Perfil
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles') // Nombre de tu tabla de perfiles
          // *** Selecciona SOLO los campos necesarios del perfil ***
          .select('id, name, city, country,  email') // Ajusta estos campos
          .eq('id', user.id) // Filtra por el ID del usuario logueado
          .single(); // Espera un solo resultado

        if (profileError && profileError.code !== 'PGRST301') { // PGRST301 = no encontrado
          console.error('Error al obtener perfil:', profileError);
          setError('Error al cargar tu perfil.'); // Mensaje genérico para el usuario
        } else {
          setProfileData(profile); // profile puede ser null si no se encontró
          console.log('Perfil cargado:', profile);
        }
      } catch (err) {
        console.error('Excepción al obtener perfil:', err);
        setError('Ocurrió un error al cargar tu perfil.');
      }


      // 3. Cargar Diagnósticos
      try {
        const { data: diagnoses, error: diagnosesError } = await supabase
          .from('diagnostics') // Nombre de tu tabla de diagnósticos (usando 'diagnostics')
          // *** Selecciona SOLO los campos necesarios de los diagnósticos ***
          .select('slug, mensaje_usuario, diagnostico, servicios, fecha') // Ajusta estos campos
          .eq('user_id', user.id) // Filtra por el ID del usuario logueado
          .order('fecha', { ascending: false }); // Ordena por fecha

        if (diagnosesError) {
          console.error('Error al obtener diagnósticos:', diagnosesError);
          setError('Error al cargar tus diagnósticos.'); // Mensaje genérico para el usuario
        } else {
          setDiagnoses(diagnoses || []); // Asegura que sea un array
          console.log('Diagnósticos cargados:', diagnoses);
        }
      } catch (err) {
         console.error('Excepción al obtener diagnósticos:', err);
         setError('Ocurrió un error al cargar tus diagnósticos.');
      }


      setLoading(false); // Termina el estado de carga inicial
    };

    loadUserData(); // Llama a la función asíncrona

    // Opcional: Listener para cerrar sesión desde otra pestaña
     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       if (!session) {
          console.log('Estado de auth cambió a null, redirigiendo.');
          router.push('/login'); // Redirigir si la sesión termina
       }
    });

    // Limpiar la suscripción al desmontar
    return () => {
        subscription?.unsubscribe();
    };

  }, [router]); // Dependencia: se ejecuta una vez al montar el componente. Router es para la redirección.


  // --- Función para cerrar sesión ---
  const handleLogout = async () => {
     setLoading(true); // Mostrar carga
     const { error } = await supabase.auth.signOut();
     if (error) {
        console.error('Error al cerrar sesión:', error);
        setError('No se pudo cerrar la sesión.');
        setLoading(false); // Si falla, quitar carga
     }
     // Si tiene éxito, el listener de auth state change redirigirá.
  };


  // --- Renderizado ---

  // Muestra esto mientras se carga inicialmente o se verifica la sesión
  if (loading || !isAuthenticated) {
      // Si loading es true O si isAuthenticated es false (y loading ya terminó, pero el efecto detectó no usuario y redirigió)
      // El router.push ya debería estar pasando, pero mostramos un fallback
       if (!isAuthenticated && !loading) {
            return (
                 <div style={{ fontFamily: 'inherit', padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
                    No autenticado. Redirigiendo...
                 </div>
            );
       }
      return (
        <div style={{ fontFamily: 'inherit', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          <Loader size={24} className="animate-spin" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Cargando datos...
           <style jsx>{` .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}</style>
        </div>
      );
   }

  // Si hay un error (después de la carga)
  if (error) {
    return (
      <div style={{ fontFamily: 'inherit', padding: '2rem', textAlign: 'center', color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
        <AlertCircle size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        {error}
      </div>
    );
  }


  // Si todo cargó correctamente
  return (
    <div style={{ fontFamily: 'inherit', padding: '1.5rem', maxWidth: '600px', margin: '2rem auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>

      {/* Encabezado y Botón de Salir */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>Mi Cuenta</h1>
         <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}>
            <LogOut size={16} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
             Salir
         </button>
      </div>

      {/* Sección de Perfil */}
      <div style={{ marginBottom: '1.5rem' }}>
         <h2 style={{ fontSize: '1.4rem', fontWeight: 'semibold', marginBottom: '1rem' }}>Tu Perfil</h2>
         {profileData ? (
            <div style={{ backgroundColor: '#f0f8ff', padding: '1rem', borderRadius: '8px', border: '1px solid #cfe2ff' }}>
               <p style={{ marginBottom: '0.5rem' }}><strong style={{ marginRight: '0.5rem' }}>Nombre:</strong> {profileData.name || 'No especificado'}</p>
               <p style={{ marginBottom: '0.5rem' }}><strong style={{ marginRight: '0.5rem' }}>Email:</strong> {profileData.email}</p> {/* Muestra email del perfil */}
               {profileData.city && <p style={{ marginBottom: '0.5rem' }}><strong style={{ marginRight: '0.5rem' }}>Ciudad:</strong> {profileData.city}</p>}
               {profileData.country && <p style={{ marginBottom: '0.5rem' }}><strong style={{ marginRight: '0.5rem' }}>País:</strong> {profileData.country}</p>}
               {profileData.telefono && <p style={{ marginBottom: '0.5rem' }}><strong style={{ marginRight: '0.5rem' }}>Teléfono:</strong> {profileData.telefono}</p>}
               {/* Añade aquí otros campos */}
            </div>
         ) : (
            // Estado si no se encontró perfil
             <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
                  Perfil no encontrado o no completo.
             </div>
         )}
      </div>


      {/* Sección de Diagnósticos */}
      <div>
         <h2 style={{ fontSize: '1.4rem', fontWeight: 'semibold', marginBottom: '1rem' }}>Tus Diagnósticos</h2>
         {diagnoses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
               {diagnoses.map((diag, idx) => (
                  <div
                     key={diag.slug || idx} // Usa slug como key si existe, si no idx
                     onClick={() => diag.slug && router.push(`/problemas/${diag.slug}`)} // Redirige si hay slug
                     style={{ padding: '1rem', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', cursor: diag.slug ? 'pointer' : 'default', transition: 'background-color 0.2s' }}
                     onMouseOver={(e) => { if(diag.slug) e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
                     onMouseOut={(e) => { if(diag.slug) e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
                  >
                     <p style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>"{diag.mensaje_usuario}"</p>
                      {diag.created_at && <p style={{ fontSize: '0.8rem', color: '#555' }}>{new Date(diag.created_at).toLocaleString()}</p>} {/* Fecha y hora */}
                      {/* Aquí podrías mostrar el diagnóstico si lo seleccionaste */}
                       {diag.diagnostico && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#333' }}>**Diagnóstico:** {diag.diagnostico}</p>}
                        {diag.servicios && diag.servicios.length > 0 && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#333' }}>**Servicios:** {diag.servicios.join(', ')}</p>}
                  </div>
               ))}
            </div>
         ) : (
            // Estado si no hay diagnósticos
            <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
               Aún no has generado diagnósticos con esta cuenta.
            </div>
         )}
      </div>

    </div>
  );
}