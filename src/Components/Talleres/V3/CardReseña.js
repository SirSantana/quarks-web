import { categorias } from "@/src/data/Categorias";
import Avatar from "../../UI/Avatar";
import { timeSince } from "@/utils/dateEs";
import renderStars from "@/utils/renderStars";
import styles from '@/styles/Negocio.module.css'
import { CheckCircle } from 'lucide-react'; // Añadimos un ícono de verificación para la reseña

export default function CardReseña({ reseña }) {
  // Asumiendo que styles.containerCardSolicitarRevision define el estilo de la tarjeta (borde, sombra, fondo blanco)
  // .containerCardSolicitarRevision: { border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', transition: 'all 0.3s ease' }

  let categoriaImage = categorias.find(el => el.nombre === reseña?.servicios?.[0])

  return (
    <article 
      className={styles.containerCardSolicitarRevision}
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        overflow: 'hidden', // Importante para que el footer respete el redondeo
        backgroundColor: 'white',
      }}
    >
      {/* Contenido Principal de la Reseña */}
      <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', width: '100%' }}>
        
        {/* Calificación y Fecha */}
        <div style={{ display: 'flex', marginBottom: '16px', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Estrellas: Asegurar que renderStars use el color primario o amarillo vibrante */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {renderStars(reseña.calificacion || 5)} 
          </span>
          
          {/* Fecha: Color y tamaño discreto */}
          <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>
            hace {timeSince(reseña?.fecha)}
          </p>
        </div>

        {/* Descripción de la Reseña */}
        {reseña.descripcion && (
             <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px' }}>
                {reseña.descripcion}
            </p>
        )}
       

        {/* Autor de la Reseña */}
        <section style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: 'row', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
          <Avatar src={reseña.foto} alt={reseña.nombre} size={'sm'} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Nombre con más peso */}
            <p style={{ fontSize: '16px', color: '#182537', fontWeight: '600', lineHeight: '1.4' }}>{reseña?.nombre}</p>
            {/* Marca/Referencia: Información secundaria */}
            {reseña?.marca && (
                <p style={{ color: '#6B7280', fontSize: '13px', fontWeight: '500', lineHeight: '1.2' }}>{reseña?.marca} {reseña?.referencia}</p>
            )}
          </div>
        </section>
      </div>

      {/* Footer - Información del Servicio */}
      {reseña?.servicios?.[0] && 
        <footer 
          style={{ 
            width: '100%', 
            display: 'flex', 
            backgroundColor: '#F9FAFB', // Fondo muy claro para diferenciar
            borderTop: '1px solid #E5E7EB', 
            alignItems: 'center', 
            gap: '16px', 
            padding: ' 16px 24px', 
            justifyContent: 'space-between' 
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="#4BBF6B" /> {/* Ícono de verificación para "Servicio verificado" */}
                <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500' }}>Servicio Realizado</p>
            </div>
            {/* Nombre del Servicio */}
            <p style={{ fontSize: '15px', color: '#182537', fontWeight: '600', lineHeight: '1.1' }}>
                {reseña?.servicios?.[0]}
            </p>
          </div>
          
          {/* Ícono de Categoría */}
          {categoriaImage && (
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '1px solid #D1D5DB', 
                  borderRadius: '6px', 
                  backgroundColor: 'white',
                  flexShrink: 0
                }}
              >
                <img alt={reseña?.servicios?.[0]} width="28" height="28" src={`/${categoriaImage?.img}`} />
              </div>
          )}
        </footer>
      }
    </article >
  );
}