
import styles from '@/styles/Negocio.module.css'


export default function CardSolicitudRevision({ revision }) {
  return (
    <article className={styles.containerCardSolicitarRevision}>
      <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', width: '100%', }}>
        {/* <div style={{ display: 'flex', marginBottom: '12px', width: '100%', justifyContent: 'space-between' }}>
          <span>{renderStars(reseña.calificacion || 5)}</span>
          <p style={{ fontSize: '14px', color: '#A6AEC1', fontWeight: '500' }}>hace {timeSince(reseña?.fecha)}</p>
        </div> */}
        <h5 style={{ fontSize: '20px', color: '#182537', fontWeight: '600' }}>{revision.servicios?.[0]}</h5>

        <section style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row', width:'100%', justifyContent:'space-between' }}>
          <p style={{ color: '#A6AEC1', fontSize: '14px', fontWeight: '400' }}>Solicitud: #{revision?.id.toString().slice(0, 6)}...</p>
         
        </section>

        <p style={{ color: '#182537', fontSize: '14px', margin: '16px 0' }}>{revision.descripcion}</p>


        <section style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row', width:'100%', justifyContent:'space-between' }}>
        <p style={{ color: '#A6AEC1', fontSize: '12px'}}>{new Date(revision.fecha).toLocaleDateString('es-CO')}</p>
          <section style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '12px', padding: '0px 8px', width: 'fit-content' }}>
            {/* {category?.img && <img src={`/${category?.img}`} style={{height:'20px',width:'20px'}} alt={`Taller de autos de ${el}`} />} */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="none" stroke="#15803D" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32">
              <path d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z" />
            </svg>
            <p style={{ margin: 0, fontWeight: '500', fontSize: '12px', color: '#15803D' }}>Solicitud via WhatsApp</p>
          </section>
        </section>
      </div>

      <footer style={{ width: '100%', display: 'flex', backgroundColor: '#EDEDF2', borderTop: '1px solid #CFD5E1', borderRadius: '0 0 12px 12px', alignItems: 'center', gap: '8px', flexDirection: 'row', padding: ' 16px 24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: '#6C788E', fontSize: '14px', fontWeight: '400' }}>Vehículo</p>
          <p style={{ fontSize: '14px', color: '#182537', fontWeight: '600', lineHeight: '1.1' }}>{revision.marca} {revision.referencia}</p>
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px', backgroundColor: 'white' }}>
          <img alt="Talleres de baterías" width="32" height="32" src={`/${revision.marca}.webp`} />
        </div>
      </footer>
    </article >
  )
}