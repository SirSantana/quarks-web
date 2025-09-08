import { supabase } from "@/lib/supabaseClient";
import { Car, MapPin, Calendar, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DiagnosticosRecientes() {
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      maxWidth: "1200px",
      width: "100%",
      margin: "0 auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      backgroundColor: "#fafafa",
      minHeight: "100vh",
    },
    header: {
      marginBottom: "3rem",
      textAlign: "center",
    },
    title: {
      fontSize: "2.75rem",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "0.75rem",
      letterSpacing: "-0.05em",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#6b7280",
      fontWeight: "400",
      lineHeight: "1.6",
      textAlign: "left",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      gap: "1rem",
    },
    flexContainer:{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    loadingText: {
      color: "#6b7280",
      fontSize: "1rem",
      fontWeight: "500",
    },
    errorContainer: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      color: "#dc2626",
    },
    errorText: {
      fontSize: "1rem",
      fontWeight: "500",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "1.5rem",
      border: "1px solid #e5e7eb",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      position: "relative",
      overflow: "hidden",
    },
    cardHeader: {
      marginBottom: "1rem",
    },
    userMessage: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
      lineHeight: "1.5",
      marginBottom: "0.75rem",
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    diagnosticText: {
      fontSize: "0.95rem",
      color: "#059669",
      backgroundColor: "#ecfdf5",
      padding: "0.5rem 0.75rem",
      borderRadius: "8px",
      fontWeight: "500",
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    metaInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    metaIcon: {
      width: "16px",
      height: "16px",
      flexShrink: 0,
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      border: "2px dashed #d1d5db",
    },
    emptyIcon: {
      width: "64px",
      height: "64px",
      color: "#9ca3af",
      margin: "0 auto 1.5rem",
    },
    emptyTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    emptyText: {
      fontSize: "1rem",
      color: "#6b7280",
      marginBottom: "2rem",
      lineHeight: "1.6",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.875rem 1.5rem",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      fontWeight: "600",
      borderRadius: "12px",
      textDecoration: "none",
      fontSize: "1rem",
      boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
      transition: "all 0.2s ease",
    },
    ctaButtonHover: {
      backgroundColor: "#2563eb",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 15px -3px rgba(59, 130, 246, 0.4)",
    },
    cardAccent: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "3px",
      background: "linear-gradient(90deg, #3b82f6, #3b82f6)",
    },
  };

  useEffect(() => {
    const fetchDiagnostics = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(
            "Error al obtener la sesión de usuario: " + sessionError.message
          );
        }

        if (!session) {
          setDiagnostics([]);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/diagnosticos", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Fallo al cargar los diagnósticos."
          );
        }

        const data = await response.json();
        setDiagnostics(data);
      } catch (err) {
        console.error("Error al cargar diagnósticos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, []);
  console.log(diagnostics);
  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCardHover = (e) => {
    Object.assign(e.currentTarget.style, {
      ...styles.card,
      ...styles.cardHover,
    });
  };

  const handleCardLeave = (e) => {
    Object.assign(e.currentTarget.style, styles.card);
  };

  const handleButtonHover = (e) => {
    Object.assign(e.currentTarget.style, {
      ...styles.ctaButton,
      ...styles.ctaButtonHover,
    });
  };

  const handleButtonLeave = (e) => {
    Object.assign(e.currentTarget.style, styles.ctaButton);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <Loader2 size={40} style={{ color: "#3b82f6", animation: "spin 1s linear infinite" }} />
          <p style={styles.loadingText}>Cargando diagnósticos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <AlertCircle size={20} />
          <span style={styles.errorText}>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {diagnostics.length === 0 ? (
        <div style={styles.emptyState}>
          <Car style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>No hay diagnósticos aún</h3>
          <p style={styles.emptyText}>
            Comienza realizando tu primer diagnóstico vehicular para ver el
            historial aquí.
          </p>
          <Link
            href="/v2"
            style={styles.ctaButton}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <Car size={18} />
            Realizar Diagnóstico
          </Link>
        </div>
      ) : (
        <div style={styles.flexContainer}>
          {diagnostics.map((diagnostic) => (
            <Link
              href={`/diagnostico/${diagnostic.slug}`}
              key={diagnostic.id}
              style={styles.card}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div style={styles.cardAccent} />
              <div style={styles.cardHeader}>
                <h3 style={styles.userMessage}>
                  "{diagnostic.mensaje_usuario}"
                </h3>
                {diagnostic.diagnostico && (
                  <div style={styles.diagnosticText}>
                    {diagnostic.diagnostico}
                  </div>
                )}
              </div>

              <div style={styles.metaInfo}>
                {(diagnostic?.car_make ||
                  diagnostic?.car_model ||
                  diagnostic?.car_year) && (
                  <div style={styles.metaItem}>
                    <Car style={styles.metaIcon} />
                    <span>
                      {[diagnostic.car_make, diagnostic.car_model, diagnostic.car_year]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  </div>
                )}

                {(diagnostic?.city || diagnostic?.country) && (
                  <div style={styles.metaItem}>
                    <MapPin style={styles.metaIcon} />
                    <span>
                      {[diagnostic.city, diagnostic.country]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}

                {diagnostic.fecha && (
                  <div style={styles.metaItem}>
                    <Calendar style={styles.metaIcon} />
                    <span>{formatDate(diagnostic.fecha)}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}