import styles from '@/styles/Negocio.module.css'
import { Calendar, MessageSquare, Car, Tag } from 'lucide-react'; 

export default function CardSolicitudRevision({ revision }) {
  
  const vehicleImageSrc = revision.marca ? `/${revision.marca}.webp` : '/default-car.webp';

  return (
    <article 
      className={styles.containerCardSolicitarRevision}
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'white',
        minWidth: '300px'
      }}
    >
      <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', width: '100%', }}>
        
        {/* Título - Servicio Solicitado (Foco Principal) */}
        <h5 style={{ fontSize: '20px', color: '#182537', fontWeight: '600', marginBottom: '8px' }}>
          {revision.servicios?.[0] || 'Servicio General'}
        </h5>

        {/* Identificador de Solicitud (Metadata) */}
        <section style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row', width:'100%', justifyContent:'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280' }}>
            <Tag size={14} />
            <p style={{ color: 'inherit', fontSize: '14px', fontWeight: '400' }}>
                Solicitud: #{revision?.id.toString().slice(0, 6)}...
            </p>
          </div>
        </section>

        {/* Descripción */}
        <p style={{ color: '#4B5563', fontSize: '15px', margin: '16px 0', lineHeight: '1.5' }}>
          {revision.descripcion}
        </p>


        {/* Fecha y Canal de Solicitud (Footer Interno) */}
        <section style={{ display: 'flex', alignItems: 'center', gap: '16px', flexDirection: 'row', width:'100%', justifyContent:'flex-start', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
            
            {/* Fecha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF' }}>
                <Calendar size={14} />
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '500', color: 'inherit' }}>
                    {new Date(revision.fecha).toLocaleDateString('es-CO')}
                </p>
            </div>
            
            {/* Canal (WhatsApp) */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '12px', padding: '4px 8px', width: 'fit-content', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                <MessageSquare size={14} color="#059669" /> 
                <p style={{ margin: 0, fontWeight: '600', fontSize: '12px', color: '#059669' }}>
                    Vía WhatsApp
                </p>
            </div>
        </section>
      </div>

      {/* Footer - Vehículo Solicitado (Ajuste aplicado aquí) */}
      <footer 
        style={{ 
          width: '100%', 
          display: 'flex', 
          backgroundColor: '#F7F8FA',
          borderTop: '1px solid #E5E7EB', 
          borderRadius: '0 0 12px 12px', 
          alignItems: 'center', 
          gap: '8px', 
          padding: ' 16px 24px', 
          justifyContent: 'space-between' 
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* AHORA en la misma fila: Icono Car y Etiqueta Vehículo */}
          <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Car size={14} style={{ color: '#6B7280' }} /> {/* Icono */}
            Vehículo {/* Palabra */}
          </p>
          
          {/* Información del Vehículo */}
          <p style={{ fontSize: '15px', color: '#182537', fontWeight: '600', lineHeight: '1.1' }}>
            {revision.marca} {revision.referencia}
          </p>
        </div>
        
        {/* Ícono/Logo del Vehículo */}
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D1D5DB', borderRadius: '8px', backgroundColor: 'white' }}>
          <img alt={`Logo de ${revision.marca}`} width="32" height="32" src={vehicleImageSrc} style={{ objectFit: 'contain' }} />
        </div>
      </footer>
    </article >
  )
}