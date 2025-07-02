import React, { useState } from "react";
import { MessageCircle, Send, HelpCircle } from "lucide-react";
import LayoutV2 from "@/src/Components/LayoutV2";

const AyudaPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const styles = {
    mainContent: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    container: {
      maxWidth: '500px',
      width: '100%',
      borderRadius: '16px',
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
      fontSize: '1rem',
      color: '#64748b',
      lineHeight: '1.6',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginLeft: '0.25rem',
    },
    input: {
      padding: '0.875rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      color: '#374151',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s ease',
      outline: 'none',
      fontFamily: 'inherit',
    },
    inputFocused: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    textarea: {
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    button: {
     padding: "0.75rem 1rem",
      backgroundColor: "#3b82f6",
      border: "none",
      borderRadius: "8px",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const whatsappNumber = "573143551942";
    const prefilledMessage = `Hola, soy ${name || 'un usuario'}. Necesito soporte con lo siguiente: \n\n${message}`;
    const encodedMessage = encodeURIComponent(prefilledMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const getInputStyle = (inputName) => ({
    ...styles.input,
    ...(focusedInput === inputName ? styles.inputFocused : {}),
  });

  return (
    <LayoutV2>
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <header style={styles.header}>
            <div style={styles.iconWrapper}>
              <HelpCircle size={32} color="#ffffff" />
            </div>
            <h1 style={styles.title}>Centro de Ayuda</h1>
            <p style={styles.subtitle}>
              Completa el formulario y te contactaremos por WhatsApp para brindarte soporte personalizado
            </p>
          </header>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>
                Nombre 
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                style={getInputStyle('name')}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="message" style={styles.label}>
                Describe tu consulta *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...getInputStyle('message'),
                  ...styles.textarea,
                }}
                placeholder="Describe tu problema, pregunta o solicitud de soporte..."
                required
              />
            </div>

            <button
              type="submit"
              style={styles.button}
            >
              Enviar mensaje por WhatsApp
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </LayoutV2>
  );
};

export default AyudaPage;