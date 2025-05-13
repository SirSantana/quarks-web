// pages/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import {
  Send,
  Loader,
  Settings,
  AlertTriangle,
  LogIn,
  ChevronRight,
  Search,
  CheckCircle,
  Database
} from 'lucide-react';

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const IndexPage = () => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [etapaAnalisis, setEtapaAnalisis] = useState(0);
  const router = useRouter();

  // Mensajes de feedback por etapas
  const mensajesAnalisis = [
    "Analizando el problema...",
    "Identificando síntomas principales...",
    "Consultando base de datos de diagnósticos...",
    "Verificando posibles causas...",
    "Calculando estimados de reparación...",
    "Preparando el diagnóstico final..."
  ];

  const styles = {
    container: {
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
      maxWidth: '480px',
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    header: {
      marginBottom: '0.5rem'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    iconBadge: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      textAlign: 'left',
      marginBottom: '0.25rem',
      marginTop: '0',
      lineHeight: '1.25'
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#6b7280',
      marginTop: '0',
      lineHeight: '1.5'
    },
    alert: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    alertIcon: {
      flexShrink: 0,
      color: '#ef4444'
    },
    alertContent: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    loginPrompt: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      cursor: 'pointer',
      color: '#b91c1c',
      fontWeight: '500'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    textareaLabel: {
      fontWeight: '500',
      color: '#374151',
      fontSize: '0.95rem'
    },
    textareaWrapper: {
      position: 'relative',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      backgroundColor: '#fff'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      color: '#1f2937',
      resize: 'vertical',
      minHeight: '120px',
      outline: 'none',
      fontFamily: 'inherit',
      lineHeight: '1.5'
    },
    textareaDisabled: {
      backgroundColor: '#f9fafb',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    placeholder: {
      color: '#9ca3af',
      fontStyle: 'italic'
    },
    button: {
      width: '100%',
      padding: '0.875rem 1.25rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    buttonDisabled: {
      backgroundColor: '#e5e7eb',
      color: '#9ca3af',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    examplePrompts: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    examplesTitle: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    exampleButton: {
      backgroundColor: '#f3f4f6',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      color: '#4b5563',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    footer: {
      fontSize: '0.8rem',
      color: '#9ca3af',
      textAlign: 'center',
      marginTop: '1rem'
    },
    // Nuevos estilos para el sistema de feedback
    loadingContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.3s ease',
      border: '1px solid #bfdbfe'
    },
    loadingHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#1d4ed8'
    },
    loadingTitle: {
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '0'
    },
    progressBar: {
      height: '6px',
      backgroundColor: '#dbeafe',
      borderRadius: '3px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#3b82f6',
      borderRadius: '3px',
      transition: 'width 0.5s ease'
    },
    etapaInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    etapaIcon: {
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0
    },
    etapaText: {
      fontSize: '0.95rem',
      color: '#1e40af',
      fontWeight: '500'
    }
  };

  // Ejemplos de problemas comunes
  const ejemplosProblemas = [
    "Mi carro hace un ruido extraño al frenar",
    "El motor se apaga cuando está en ralentí",
    "El aire acondicionado no enfría lo suficiente"
  ];

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getUser(); // Usa el cliente Supabase del frontend para auth
      setUsuario(data.user);

      // Verificar el límite solo si no hay usuario autenticado
      if (!data.user && localStorage.getItem('usoConsultaGratis') === 'true') {
        setBloqueado(true);
      }
    };

    verificarSesion();
  }, []);

  // Avanzar progresivamente por las etapas durante la carga
  useEffect(() => {
    let intervalId;
    if (cargando) {
      setEtapaAnalisis(0);
      intervalId = setInterval(() => {
        setEtapaAnalisis(prevEtapa => {
          // Mantener en la última etapa cuando se complete
          if (prevEtapa >= mensajesAnalisis.length - 1) {
            clearInterval(intervalId);
            return mensajesAnalisis.length - 1;
          }
          return prevEtapa + 1;
        });
      }, 1200); // Cambia cada 1.2 segundos
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [cargando]);

  const enviarProblema = async () => {
    // Valida que el mensaje no esté vacío y no esté bloqueado o cargando
    if (!mensaje.trim() || bloqueado || cargando) return;

    setCargando(true); // Inicia estado de carga
    if (!usuario) {
      const yaUsoConsulta = localStorage.getItem('usoConsultaGratis');

      if (yaUsoConsulta === 'true') {
        setBloqueado(false); // Bloquear si ya usó la consulta gratis sin estar logueado
        setCargando(false); // Detener carga
        return; // Salir de la función
      }

      // localStorage.setItem('usoConsultaGratis', 'true'); // Marcar como usada la consulta gratis si no está logueado
    }


    try {
      // Simulamos un delay mínimo para que el usuario pueda ver todas las etapas
      // incluso si la API responde muy rápido
      const apiPromise = fetch('/api/asistente', {
        method: 'POST', // Usar método POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: mensaje.trim() }), // Enviar el mensaje en el cuerpo
      });
      
      // Garantizar que se muestren al menos 4 segundos de feedback
      const minDelay = new Promise(resolve => setTimeout(resolve, 4000));
      
      // Esperar a que ambas promesas se completen
      const [res] = await Promise.all([apiPromise, minDelay]);

      // Verificar si la respuesta del API fue exitosa
      if (!res.ok) {
        const errorData = await res.json(); // Leer el cuerpo del error del API
        throw new Error(errorData.error || 'Error al procesar la solicitud en la API.');
      }

      // Parsear la respuesta JSON del API (que debería contener el slug)
      const data = await res.json();
      const slug = data.slug; // Obtener el slug de la respuesta
      
      if (slug) {
        router.push(`/problemas/${slug.replaceAll(' ', '-').toLowerCase()}`); // Redirige a la página de resultados con el slug
      } else {
        throw new Error('La API no devolvió un identificador válido.');
      }

    } catch (error) {
      alert(`Ocurrió un error: ${error.message}`); // O usa un método de notificación más amigable

    } finally {
      setCargando(false); // Finaliza estado de carga SIEMPRE
    }
  };

  const seleccionarEjemplo = (ejemplo) => {
    setMensaje(ejemplo);
  };

  // Elige el icono adecuado para cada etapa de análisis
  const getIconoEtapa = (index) => {
    switch (index) {
      case 0: return <Search size={18} color="#3b82f6" />;
      case 1: return <CheckCircle size={18} color="#3b82f6" />;
      case 2: return <Database size={18} color="#3b82f6" />;
      default: return <Loader size={18} color="#3b82f6" />;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div style={styles.iconBadge}>
            <Settings size={24} color="#3b82f6" />
          </div>
          <h1 style={styles.title}>¿Tu carro está fallando?</h1>
        </div>
        <p style={styles.subtitle}>Describe el problema que estás experimentando y recibe un diagnóstico instantáneo junto con estimados de reparación.</p>
      </div>

      {bloqueado && (
        <div style={styles.alert}>
          <AlertTriangle size={24} style={styles.alertIcon} />
          <div style={styles.alertContent}>
            <span>Has alcanzado tu límite de consultas gratuitas.</span>
            <div
              style={styles.loginPrompt}
              onClick={() => router.push('/login')}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              <LogIn size={16} />
              <span>Inicia sesión o regístrate para continuar</span>
            </div>
          </div>
        </div>
      )}

      {/* Estado de análisis - visible solo durante carga */}
      {cargando && (
        <div style={styles.loadingContainer}>
          {/* <div style={styles.loadingHeader}>
            <Loader size={20} className="animate-spin" />
            <h4 style={styles.loadingTitle}>Analizando tu problema</h4>
          </div> */}
          
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${((etapaAnalisis + 1) / mensajesAnalisis.length) * 100}%`
              }}
            ></div>
          </div>
          
          <div style={styles.etapaInfo}>
            <div style={styles.etapaIcon}>
              {getIconoEtapa(etapaAnalisis)}
            </div>
            <span style={styles.etapaText}>
              {mensajesAnalisis[etapaAnalisis]}
            </span>
          </div>
        </div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.textareaLabel}>Describe el problema de tu vehículo:</label>
        <div
          style={{
            ...styles.textareaWrapper,
            boxShadow: mensaje ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
            borderColor: mensaje ? '#3b82f6' : '#e5e7eb',
            ...(bloqueado || cargando ? { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } : {})
          }}
          onMouseOver={(e) => {
            if (!bloqueado && !cargando) e.currentTarget.style.borderColor = '#3b82f6';
          }}
          onMouseOut={(e) => {
            if (!bloqueado && !cargando && !mensaje) e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <textarea
            style={{
              ...styles.textarea,
              ...(bloqueado || cargando ? styles.textareaDisabled : {})
            }}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Ej: Mi carro hace un ruido al frenar..."
            disabled={bloqueado || cargando}
          ></textarea>
        </div>
      </div>

      <button
        style={
          mensaje.trim() && !bloqueado && !cargando
            ? styles.button
            : { ...styles.button, ...styles.buttonDisabled }
        }
        onClick={enviarProblema}
        disabled={!mensaje.trim() || cargando || bloqueado}
        onMouseOver={(e) => {
          if (mensaje.trim() && !bloqueado && !cargando) {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }
        }}
        onMouseOut={(e) => {
          if (mensaje.trim() && !bloqueado && !cargando) {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }
        }}
      >
        {cargando ? (
          <>
            <Loader size={20} className="animate-spin" />
            <span>Analizando...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Analizar problema</span>
          </>
        )}
      </button>

      {!bloqueado && !cargando && (
        <div style={styles.examplePrompts}>
          <p style={styles.examplesTitle}>O prueba con uno de estos ejemplos:</p>
          {ejemplosProblemas.map((ejemplo, idx) => (
            <button
              key={idx}
              style={styles.exampleButton}
              onClick={() => seleccionarEjemplo(ejemplo)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              <span>{ejemplo}</span>
              <ChevronRight size={16} color="#6b7280" />
            </button>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        Mecánico Virtual &copy; {new Date().getFullYear()} — Diagnósticos de carro rápidos y confiables
      </div>
    </div>
  );
};

export default IndexPage;