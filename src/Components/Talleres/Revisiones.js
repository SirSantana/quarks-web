import { useQuery } from "@apollo/client";
import { GET_REVISIONES } from "@/graphql/queries";
import CardSolicitudRevision from "./V3/CardSolicitudRevision";
import styles from '@/styles/Negocio.module.css'
import { FileText, Loader2, Frown } from "lucide-react";

export default function Revisiones({ id }) {
  const { data, loading, error } = useQuery(GET_REVISIONES, { variables: { id: id } })
  const revisiones = data?.getRevisiones;

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', color: '#407BFF', gap: '12px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: '500' }}>Cargando solicitudes recientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', color: '#EF4444', gap: '12px', border: '1px solid #FEE2E2', borderRadius: '12px', backgroundColor: '#FEF2F2' }}>
        <Frown size={32} />
        <p style={{ fontWeight: '500' }}>Error al cargar las solicitudes.</p>
      </div>
    );
  }

  if (!revisiones || revisiones.length === 0) {
    return (
      <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#182537', marginBottom: '16px' }}>
          <FileText size={20} style={{ verticalAlign: 'middle', marginRight: '8px', color: '#407BFF' }} />
          Otras personas han solicitado:
        </h2>
        <p style={{ fontSize: '15px', color: '#6B7280' }}>
          Parece que aún no hay solicitudes de servicio recientes para mostrar.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontSize: '24px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: '#182537' }}>
        <FileText size={24} style={{ color: '#407BFF' }} />
        Otras personas han solicitado:
      </h2>
      
      <div 
        className={styles.containerRevisionesSlider}
        style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto',
          paddingBottom: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          marginLeft: '-16px',
          marginRight: '-16px',
        }}
      >
        {revisiones.map(el => (
          <div key={el.id} style={{ minWidth: '300px', flexShrink: 0 }}>
            <CardSolicitudRevision revision={el} />
          </div>
        ))}
      </div>
    </>
  )
}