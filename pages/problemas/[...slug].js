import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { 
  ArrowLeft, 
  Wrench, 
  DollarSign, 
  MapPin, 
  MessageCircle, 
  AlertCircle, 
  Star,
  Loader
} from 'lucide-react';

const ResultadosPage = () => {
  const router = useRouter();
  const { problemaSlug, problemaOriginal } = router.query;

  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false);

  // Estilos en línea
  const styles = {
    container: {
      maxWidth: '32rem',
      margin: '2rem auto',
      padding: '2rem 1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease'
    },
    iconMarginRight: {
      marginRight: '0.5rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    problemCard: {
      marginBottom: '1.5rem',
      padding: '0.75rem',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #f3f4f6'
    },
    problemLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    problemText: {
      fontSize: '0.875rem',
      color: '#374151'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 0'
    },
    loadingText: {
      color: '#6b7280',
      marginTop: '1rem',
      fontSize: '0.95rem'
    },
    errorContainer: {
      marginTop: '1.5rem',
      padding: '1rem',
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      borderRadius: '6px'
    },
    errorFlex: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    errorIcon: {
      color: '#ef4444',
      marginRight: '0.75rem',
      marginTop: '2px'
    },
    errorTitle: {
      fontWeight: '600',
      color: '#b91c1c'
    },
    errorMessage: {
      marginTop: '0.25rem',
      fontSize: '0.875rem',
      color: '#dc2626'
    },
    errorDetails: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#ef4444'
    },
    retryButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    resultContainer: {
      marginTop: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    diagnosticoCard: {
      padding: '1rem',
      backgroundColor: '#eff6ff',
      borderRadius: '8px',
      borderLeft: '4px solid #3b82f6',
      color: '#374151',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    priceContainer: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    priceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #e5e7eb'
    },
    priceItemLast: {
      borderBottom: 'none'
    },
    priceLabel: {
      color: '#4b5563'
    },
    priceValue: {
      fontWeight: '500',
      color: '#1f2937'
    },
    emptyText: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    tallerContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    tallerCard: {
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #f3f4f6',
      transition: 'border-color 0.2s ease'
    },
    tallerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    tallerName: {
      fontWeight: '500',
      color: '#1f2937'
    },
    tallerLocation: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.25rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    ratingBadge: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fef3c7',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px'
    },
    ratingText: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563'
    },
    ctaButton: {
      width: '100%',
      marginTop: '1.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.2s ease'
    }
  };

  useEffect(() => {
    if (router.isReady && problemaOriginal && !hasFetched.current) {
      hasFetched.current = true;
  
      const fetchResultados = async () => {
        setCargando(true);
        setError(null);
  
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
  
          const { data: existing, error: selectError } = await supabase
            .from('diagnostics')
            .select('*')
            .ilike('mensaje_usuario', decodeURIComponent(problemaOriginal))
  
          if (selectError) throw selectError;
          console.log(existing);
          
          if (existing.length > 0) {
            setRespuesta({
              diagnostico: existing[0].diagnostico,
              estimacionPrecios: existing[0].precios,
              talleres: existing[0].talleres,
            });
            return;
          }
  
          // No existe, así que hacemos la solicitud
          const res = await fetch('/api/asistente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje: problemaOriginal }),
          });
  
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detalle || `Error HTTP: ${res.status}`);
          }
  
          const respuestaData = await res.json();
          setRespuesta(respuestaData);
  
          const { error: insertError } = await supabase.from('diagnostics').insert([{
            mensaje_usuario: decodeURIComponent(problemaOriginal),
            diagnostico: respuestaData.diagnostico,
            precios: respuestaData.estimacionPrecios,
            talleres: respuestaData.talleres,
            user_id: user?.id || null,
          }]);
  
          if (insertError) {
            console.error('Error al guardar en Supabase:', insertError);
          }
  
        } catch (err) {
          console.error('Error al obtener resultados:', err);
          setError({
            message: 'Ocurrió un error al obtener el diagnóstico y los resultados.',
            details: err.message,
          });
        } finally {
          setCargando(false);
        }
      };
  
      fetchResultados();
    } else if (router.isReady && !problemaOriginal) {
      setError({
        message: 'No se encontró la descripción original del problema en la URL.',
        details: 'Por favor, intente buscar desde la página principal.',
      });
    }
  }, [router.isReady, problemaOriginal]);

  return (
    <div style={styles.container}>
      <button 
        onClick={() => router.back()}
        style={styles.backButton}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <ArrowLeft size={18} style={styles.iconMarginRight} />
        <span>Volver</span>
      </button>

      <h1 style={styles.title}>Resultados del diagnóstico</h1>
      
      {problemaOriginal && (
        <div style={styles.problemCard}>
          <p style={styles.problemLabel}>Problema reportado:</p>
          <p style={styles.problemText}>"{decodeURIComponent(problemaOriginal)}"</p>
        </div>
      )}

      {cargando && (
        <div style={styles.loadingContainer}>
          <Loader size={32} style={{color: '#3b82f6'}} />
          <p style={styles.loadingText}>Analizando tu problema...</p>
        </div>
      )}

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorFlex}>
            <AlertCircle size={20} style={styles.errorIcon} />
            <div>
              <h2 style={styles.errorTitle}>Error</h2>
              <p style={styles.errorMessage}>{error.message}</p>
              {error.details && <p style={styles.errorDetails}>{error.details}</p>}
            </div>
          </div>
          {problemaOriginal && (
            <button 
              onClick={() => window.location.reload()}
              style={styles.retryButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            >
              Reintentar
            </button>
          )}
        </div>
      )}

      {respuesta && !error && (
        <div style={styles.resultContainer}>
          <section>
            <div style={styles.sectionHeader}>
              <Wrench size={20} style={{...styles.iconMarginRight, color: '#3b82f6'}} />
              <h2 style={styles.sectionTitle}>Diagnóstico</h2>
            </div>
            <div style={styles.diagnosticoCard}>
              {respuesta.diagnostico}
            </div>
          </section>

          <section>
            <div style={styles.sectionHeader}>
              <DollarSign size={20} style={{...styles.iconMarginRight, color: '#16a34a'}} />
              <h2 style={styles.sectionTitle}>Estimado de precios</h2>
            </div>
            
            {respuesta.estimacionPrecios && respuesta.estimacionPrecios.length > 0 ? (
              <div style={styles.priceContainer}>
                {respuesta.estimacionPrecios.map((item, index) => (
                  <div 
                    key={index}
                    style={
                      index !== respuesta.estimacionPrecios.length - 1 
                        ? styles.priceItem 
                        : {...styles.priceItem, ...styles.priceItemLast}
                    }
                  >
                    <span style={styles.priceLabel}>{item.item}</span>
                    <span style={styles.priceValue}>{item.precio}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.emptyText}>
                No se pudo obtener una estimación de precios detallada en este momento.
              </p>
            )}
          </section>

          <section>
            <div style={styles.sectionHeader}>
              <MapPin size={20} style={{...styles.iconMarginRight, color: '#ef4444'}} />
              <h2 style={styles.sectionTitle}>Talleres recomendados</h2>
            </div>
            
            {respuesta.talleres && respuesta.talleres.length > 0 ? (
              <div style={styles.tallerContainer}>
                {respuesta.talleres.map((taller, index) => (
                  <div 
                    key={index}
                    style={styles.tallerCard}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
                  >
                    <div style={styles.tallerHeader}>
                      <div>
                        <h3 style={styles.tallerName}>{taller.nombre}</h3>
                        <div style={styles.tallerLocation}>
                          <MapPin size={14} style={styles.iconMarginRight} />
                          <span>{taller.ubicacion}</span>
                        </div>
                      </div>
                      <div style={styles.ratingBadge}>
                        <Star size={14} style={{...styles.iconMarginRight, color: '#f59e0b', fill: '#f59e0b'}} />
                        <span style={styles.ratingText}>{taller.calificacion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.emptyText}>
                No se encontraron talleres recomendados para este servicio.
              </p>
            )}
          </section>

          <button 
            style={styles.ctaButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          >
            <MessageCircle size={18} style={styles.iconMarginRight} />
            <span>Recibir ofertas de talleres</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultadosPage;