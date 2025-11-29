import { useState } from "react";
import Button from "../../Button/Button";
import SelectServicioProfile from "../../MenuSelects/SelectServicioProfile";
import styles from '@/styles/Negocio.module.css'
import { useRouter } from "next/router";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"; // Importar iconos de colapso
import ComparisonQuoteBanner from "./ComparissonQuoteBanner";

let initialForm = {
  servicios: ['Electricos'],
  fecha: '',
  franjaHoraria: ''
}

export default function CardSolicitarServicio({ openModal }) {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  
  // 1. Estado para controlar la visibilidad del contenido adicional en MÓVIL (colapsado por defecto)
  // En desktop, esta lógica será anulada por las clases md:block
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false); 

  // Generar próximos 14 días
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    const todayDate = today.getDate();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(todayDate + i);
      days.push(date);
    }
    return days;
  };

  const getDateValue = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Función de redirección central
  const redirectToAgendar = () => {
    if (!form.servicios[0] || !form.fecha) {
        alert('Por favor selecciona un servicio y una fecha.');
        return;
    }
    router.push(`/${router.asPath}/agendar`);
  };

  // Manejador para la selección de fecha (con redirección inmediata)
  const handleDateSelect = (dateValue) => {
    // 1. Actualiza el estado de la fecha
    setForm(prevForm => {
        const newForm = { ...prevForm, fecha: dateValue };
        
        // 2. Ejecuta la redirección INMEDIATA si ya hay servicio seleccionado
        if (newForm.servicios[0]) {
            router.push(`/${router.asPath}/agendar`);
        }
        return newForm;
    });
  };

  return (
    <>
      <div className={styles.cardSolicitarServicio}>
        
        {/* Contenedor del Título y el Botón de Toggle */}
        <div className="flex justify-between items-center w-full mb-4 md:mb-6"> 
          
          {/* Título (Siempre visible) */}
          <h1 style={{ fontSize: '18px', fontWeight: '600' }}>
            Agendar Cita
          </h1>
          
          {/* Botón de Colapso: VISIBLE solo en mobile (oculto en md:hidden) */}
          <button 
            onClick={() => setIsMobileContentVisible(!isMobileContentVisible)}
            className="md:hidden" // Ocultar en pantallas medianas y superiores (Desktop)
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#407BFF',
              padding: '4px',
              display: 'block' 
            }}
            title={isMobileContentVisible ? 'Ocultar opciones' : 'Mostrar más opciones'}
          >
            {isMobileContentVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* 1. Selector de Servicio (Siempre visible) */}
        <div onClick={() => setIsMobileContentVisible(!isMobileContentVisible)} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>
            ¿Qué servicio necesitas? *
          </label>
          <SelectServicioProfile 
            handleChange={(e) => setForm({ ...form, servicios: [e.label] })} 
            width={'100%'} 
            
            defaultInitial={form.servicios[0] ? form.servicios[0] : 'Cambio de Aceite'} 
            form={form} 
          />
        </div>

        {/* 2. Contenido Colapsable: Fechas y Botón Final */}
        {/* CLASE CLAVE: Colapso en móvil, siempre visible en desktop */}
        <div 
          className={`
            ${isMobileContentVisible ? 'block' : 'hidden'} 
            md:block 
          `}
          style={{ transition: 'all 0.3s ease' }} 
        >
            {/* Selección de Fecha */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Selecciona el día *
                </label>
                <div style={{ overflowX: 'auto', width: '100%', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
                        {getNextDays().slice(0, 7).map((date, index) => {
                            const dateValue = getDateValue(date);
                            const isSelected = form.fecha === dateValue;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    // LLAMADA CLAVE: Redirección inmediata al seleccionar la fecha
                                    onClick={() => handleDateSelect(dateValue)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        border: isSelected ? '1px solid #407BFF' : '1px solid #E5E7EB',
                                        backgroundColor: isSelected ? '#407BFF' : 'white',
                                        color: isSelected ? 'white' : '#374151',
                                        minWidth: '70px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontFamily: 'inherit',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <span style={{ 
                                        fontSize: '10px', 
                                        fontWeight: '500', 
                                        marginBottom: '4px',
                                        color: isSelected ? '#DBEAFE' : '#6B7280'
                                    }}>
                                        {date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}
                                    </span>
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>
                                        {date.getDate()}
                                    </span>
                                    <span style={{ 
                                        fontSize: '10px',
                                        color: isSelected ? '#DBEAFE' : '#6B7280'
                                    }}>
                                        {date.toLocaleDateString('es-ES', { month: 'short' })}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Botón Agendar Cita (Alternativa para Desktop/flujo manual) */}
            <Button 
                onClick={redirectToAgendar} 
                fullWidth 
                className={'desktopButton'} 
                style={{ 
                    alignSelf: 'flex-end', 
                    margin: '24px 0 0 0', 
                    backgroundColor: '#407BFF', 
                    whiteSpace: 'nowrap',
                    borderRadius: '8px'
                }}
            >
                Agendar Cita
            </Button>
        </div>
        
      </div>
      
      {/* <ComparisonQuoteBanner services={form.servicios}/> */}
    </>
  )
}