import { categorias } from "@/src/data/Categorias";
import Avatar from "../../UI/Avatar";
import { timeSince } from "@/utils/dateEs";



export default function CardReseña({ reseña }) {
  console.log(reseña);
  let categoriaImage = categorias.find(el => el.nombre === reseña?.servicios?.[0])

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    const integerPart = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= totalStars; i++) {
      let fill;
      if (i <= integerPart) {
        fill = '#FACC15'; // Llena
      } else if (i === integerPart + 1 && hasHalfStar) {
        fill = 'url(#half)'; // Media estrella
      } else {
        fill = '#CFD5E1'; // Vacía
      }

      stars.push(
        <svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '4px' }}
        >
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#CFD5E1" />
            </linearGradient>
          </defs>
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={fill}
            stroke={i <= integerPart || (i === integerPart + 1 && hasHalfStar) ? '#FACC15' : '#CFD5E1'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return stars;
  };
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