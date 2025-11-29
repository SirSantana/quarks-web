import { timeSince } from "@/utils/dateEs";
import { categorias } from "@/src/data/Categorias";
import styles from '@/styles/Negocio.module.css' // Usamos la clase para el contenedor
import { Clock } from 'lucide-react'; // Añadimos un ícono para la fecha

export default function Revision({ data }) {
  return (
    // Contenedor principal para simular una tarjeta limpia (asumiendo estilos en styles.Negocio.module.css)
    <div 
      className={styles.cardRevision} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        width: '100%',
        padding: '20px', 
        border: '1px solid #E5E7EB', // Borde limpio
        borderRadius: '10px', 
        backgroundColor: 'white' 
      }}
    >
      
      {/* Encabezado: Marca, Referencia y Fecha */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        
        {/* Marca y Referencia (Foco principal) */}
        <p style={{ fontSize: '18px', color:'#182537', fontWeight: '600' }}>
          {data?.marca} {data?.referencia}
        </p>
        
        {/* Fecha (Detalle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            <Clock size={14} color="#9CA3AF" />
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
                hace {timeSince(data?.fecha)}
            </p>
        </div>
      </div>
      
      {/* Tags de Servicios (Chips modernos) */}
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px' }}>
        {data?.servicios?.map(el => {
          let image = categorias.find(category => category.nombre === el)
          return (
            <div 
              key={el} 
              style={{ 
                borderRadius: '20px', // Mayor redondez para estilo chip
                padding: '4px 10px', 
                border: '1px solid #D1D5DB', 
                backgroundColor: '#F3F4F6', // Fondo sutil
                display: 'flex', 
                flexDirection: 'row', 
                gap: '6px', 
                alignItems: 'center' 
              }}
            >
              <img 
                style={{ width: '16px', height: '16px', borderRadius: '50%' }} 
                src={`../${image?.img}`} 
                alt={`Servicio de ${el}`} 
              />
              <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: '500' }}>
                {el}
              </p>
            </div>
          )
        })}
      </div>
      
      {/* Descripción/Detalles Adicionales */}
      <div>
        <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.5' }}>
          {data?.descripcion}
        </p>
      </div>
    </div>
  )
}