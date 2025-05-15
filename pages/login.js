import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {

  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const redirectToUrl = `${siteUrl}/api/supabase/callback`; // <--- ¡APUNTA A LA API ROUTE!

  console.log("Iniciando flujo Google OAuth, redirigiendo a:", redirectToUrl);
  
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectToUrl,
      },
    })
    if (error) console.error('Error al iniciar sesión', error)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Iniciar sesión con Google
      </button>
    </div>
  )
}