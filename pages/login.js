import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import { LogIn, User, ArrowRight, LogOut, Mail } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user, loading: load, signOut } = useAuth();

  const styles = {
    mainContent: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    container: {
      maxWidth: '400px',
      width: '100%',
      borderRadius: '16px',
      padding: '2rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    iconWrapper: {
      width: '64px',
      height: '64px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '0.5rem',
      letterSpacing: '-0.025em',
    },
    subtitle: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
    },
    buttonPrimary: {
      width: '100%',
      padding: '0.875rem 1rem',
      backgroundColor: '#3b82f6',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem',
    },
    buttonSecondary: {
      width: '100%',
      padding: '0.875rem 1rem',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      color: '#475569',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '0.75rem',
      marginBottom: '1rem',
      color: '#dc2626',
      fontSize: '0.875rem',
      textAlign: 'center',
    },
    welcomeContainer: {
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    welcomeText: {
      fontSize: '1rem',
      color: '#374151',
      marginBottom: '0.5rem',
    },
    userEmail: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '500',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.push("/");
    } catch (error) {
      setError(error.message || "Ocurrió un error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const isLocalhost = window.location.hostname === "localhost";
      const redirectBase = isLocalhost
        ? "http://localhost:3000"
        : "https://quarks.com.co";

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${redirectBase}/auth/callback`,
          createUser: true,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(
        error.message || "Ocurrió un error durante la autenticación con Google"
      );
    } finally {
      setLoading(false);
    }
  };

  // Vista para usuario ya autenticado
  if (user) {
    return (
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <header style={styles.header}>
            <div style={styles.iconWrapper}>
              <User size={32} color="#ffffff" />
            </div>
            <h1 style={styles.title}>¡Bienvenido!</h1>
          </header>

          <div style={styles.welcomeContainer}>
            <p style={styles.welcomeText}>Sesión iniciada correctamente</p>
            {user.email && (
              <p style={styles.userEmail}>{user.email}</p>
            )}
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              onClick={() => router.push("/v2")}
              style={styles.buttonPrimary}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Ir al Home
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleLogout}
              style={{
                ...styles.buttonSecondary,
                ...(loading ? styles.buttonDisabled : {})
              }}
              disabled={loading}
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#e2e8f0')}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#f1f5f9')}
            >
              {loading ? "Cerrando sesión..." : "Cerrar Sesión"}
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista de login
  return (
    <div style={styles.mainContent}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.iconWrapper}>
            <LogIn size={32} color="#ffffff" />
          </div>
          <h1 style={styles.title}>Iniciar Sesión</h1>
          <p style={styles.subtitle}>
            Con Gmail puedes acceder directamente. Si es tu primera vez, crearemos tu cuenta automáticamente.
          </p>
        </header>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          style={{
            ...styles.buttonPrimary,
            ...(loading ? styles.buttonDisabled : {})
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {loading ? "Procesando..." : "Continuar con Gmail"}
          <Mail size={16} />
        </button>
      </div>
    </div>
  );
}