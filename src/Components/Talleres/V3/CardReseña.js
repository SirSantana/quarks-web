import { categorias } from "@/src/data/Categorias";
import Avatar from "../../UI/Avatar";
import { timeSince } from "@/utils/dateEs";
import renderStars from "@/utils/renderStars";



export default function CardReseña({ reseña }) {
  let categoriaImage = categorias.find(el => el.nombre === reseña?.servicios?.[0])
  return (
    <article style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', border: '1px solid #CFD5E1', boxSizing: 'border-box', borderRadius: '12px' }}>
      <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', width: '100%', }}>
        <div style={{ display: 'flex', marginBottom: '12px', width: '100%', justifyContent: 'space-between' }}>
          <span>{renderStars(reseña.calificacion || 5)}</span>
          <p style={{ fontSize: '14px', color: '#A6AEC1', fontWeight: '500' }}>hace {timeSince(reseña?.fecha)}</p>
        </div>
        {/* <h5 style={{ fontSize: '20px', color: '#182537', fontWeight: '600' }}>Excelente Servicio</h5> */}

        <p style={{ color: '#6C788E', fontSize: '14px', marginTop: '8px' }}>{reseña.descripcion}</p>

        <section style={{ display: 'flex', alignItems: 'center', marginTop: '16px', gap: '8px', flexDirection: 'row' }}>
          <Avatar src={reseña.foto} alt={reseña.nombre} size={'sm'} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '16px', color: '#182537', fontWeight: '600', lineHeight: '1.4' }}>{reseña?.nombre}</p>
            <p style={{ color: '#6C788E', fontSize: '14px', fontWeight: '500', lineHeight: '1.2' }}>{reseña?.marca} {reseña?.referencia}</p>
          </div>
        </section>
      </div>

      {reseña?.marca && <footer style={{ width: '100%', display: 'flex', backgroundColor: '#EDEDF2', borderTop: '1px solid #CFD5E1', borderRadius:'0 0 12px 12px' , alignItems: 'center', gap: '8px', flexDirection: 'row', padding: ' 16px 24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: '#6C788E', fontSize: '14px', fontWeight: '400' }}>Servicio</p>
          <p style={{ fontSize: '14px', color: '#182537', fontWeight: '600', lineHeight: '1.1' }}>{reseña?.servicios?.[0]}</p>
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px', backgroundColor: 'white' }}>
          <img alt="Talleres de baterías" width="32" height="32" src={categoriaImage?.img} />
        </div>
      </footer>}
    </article >
  );
}