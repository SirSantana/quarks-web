import React, { useEffect, useState } from "react";
import { Car, Search, Plus, Wrench, Clock, AlertCircle, MapPin } from "lucide-react";
import LayoutV2 from "@/src/Components/LayoutV2"; // Asegúrate de que la ruta sea correcta
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import DiagnosticosRecientes from "@/src/Components/Diagnosticos/DiagnosticosRecientes";

const DiagnosticosPage = () => {
  const styles = {
    mainContent: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'margin-left 0.3s ease',
      paddingTop:'48px'
    },
    container: {
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
      maxWidth: '640px',
      width: '100%',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
     problemText: {
      fontSize: "1rem",
      color: "#334155",
      lineHeight: "1.5",
      fontWeight: "500",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid #e2e8f0",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      letterSpacing: "-0.04em",
      color: "#0f172a",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#64748b",
      maxWidth: "700px",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      color: "#0f172a",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      letterSpacing: "-0.02em",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    },
    ctaCard: {
      backgroundColor: "#dbeafe",
      color: "#1e3a8a",
      textAlign: "center",
      padding: "3rem 2rem",
      borderRadius: "16px",
      border: "2px dashed #93c5fd",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    ctaCardHover: {
      backgroundColor: "#bfdbfe",
      borderColor: "#60a5fa",
    },
    ctaTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#172554",
      letterSpacing: "-0.03em",
    },
    ctaText: {
      fontSize: "1rem",
      color: "#3b82f6",
      maxWidth: "500px",
    },
    ctaButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.875rem 1.5rem",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontFamily: "inherit",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
    },
    ctaButtonHover: {
      backgroundColor: "#2563eb",
      transform: "translateY(-2px)",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "1.5rem",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    cardTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
    },
    cardSubtitle: {
      fontSize: "0.875rem",
      color: "#64748b",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    pill: {
      fontSize: "0.75rem",
      fontWeight: "600",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      display: "inline-block",
      alignSelf: "flex-start",
      textTransform: "uppercase",
    },
    pillSuccess: {
      backgroundColor: "#dcfce7",
      color: "#15803d",
    },
    pillDanger: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
    },
    pillInfo: {
      backgroundColor: "#e0f2fe",
      color: "#0c4a6e",
    },
  };

  const handleCtaHover = (e) => {
    Object.assign(e.currentTarget.style, styles.ctaCardHover);
  };
  const handleCtaOut = (e) => {
    Object.assign(e.currentTarget.style, styles.ctaCard);
  };

  const handleButtonHover = (e) => {
    Object.assign(e.currentTarget.style, styles.ctaButtonHover);
  };
  const handleButtonOut = (e) => {
    Object.assign(e.currentTarget.style, styles.ctaButton);
  };

 

  const handleNewDiagnostic = () => {
    // Lógica para iniciar un nuevo diagnóstico, por ejemplo, navegar a otra página
    alert("¡Iniciando un nuevo diagnóstico!");
  };



  return (
    <LayoutV2 >
        <div style={styles.mainContent}>
        <div style={styles.container}>
        {/* Encabezado de la página */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            {/* <Car size={40} color="#3b82f6" /> */}
            Diagnósticos
          </h1>
          <p style={styles.subtitle}>
            Inicia un nuevo diagnóstico para tu vehículo o revisa el historial
            de análisis anteriores. Obtén información detallada sobre el estado
            de tu coche.
          </p>
        </header>

        {/* Sección para iniciar nuevo diagnóstico */}
        <section style={styles.section}>
          <div
            style={styles.ctaCard}
            onMouseOver={handleCtaHover}
            onMouseOut={handleCtaOut}
            onClick={handleNewDiagnostic}
          >
            <Plus size={48} color="#3b82f6" strokeWidth={1.5} />
            <div style={styles.cardContent}>
              <h2 style={styles.ctaTitle}>Iniciar un nuevo diagnóstico</h2>
            </div>
          </div>
        </section>

        {/* Sección de diagnósticos recientes */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <Clock size={24} color="#64748b" />
            <h3 style={styles.sectionTitle}>Diagnósticos recientes</h3>
          </div>
          <DiagnosticosRecientes />
        </section>
        </div>
        </div>
    </LayoutV2>
  );
};

export default DiagnosticosPage;
