import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { categorias } from "@/src/data/Categorias";
import { useMutation, useQuery } from "@apollo/client";
import Button, { ButtonVariant } from "../Button/Button";



export default function CardTaller({ taller }) {
  const { data } = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: taller?.id } })

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    const integerPart = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= totalStars; i++) {
      let fill;
      if (i <= integerPart) {
        fill = '#407BFF'; // Llena
      } else if (i === integerPart + 1 && hasHalfStar) {
        fill = 'url(#half)'; // Media estrella
      } else {
        fill = '#EDEDF2'; // Vacía
      }

      stars.push(
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '4px' }}
        >
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#407BFF" />
              <stop offset="50%" stopColor="#EDEDF2" />
            </linearGradient>
          </defs>
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={fill}
            stroke={i <= integerPart || (i === integerPart + 1 && hasHalfStar) ? '#407BFF' : '#CFD5E1'}
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
    <div style={{ border: '1px solid #CFD5E1', backgroundColor: '#FFFFFF', height: '300px', borderRadius: '8px', display: 'flex', flexDirection: 'row', width: '100%' }}>
      {taller?.fotoperfil ?
        <img
          src={taller.fotoperfil}
          alt={taller.nombre}
          style={{ objectFit: 'cover', width: '40%', height: '100%', borderRadius: '8px 0px 0px 8px', borderRight: '1px solid #CFD5E1' }}
          loading='lazy'
        />
        :
        <img
          src={'/taller-ilustration.webp'}
          alt={taller.nombre}
          style={{ objectFit: 'contain', width: '40%', height: '100%', borderRadius: '8px 0px 0px 8px', borderRight: '1px solid #CFD5E1'  }}
          onLoadingComplete={() => setIsImageLoaded(true)}
          loading='lazy'
        />
      }

      <section style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '20px', lineHeight: '22px', color: '#182537', fontWeight: '600' }}>{taller?.nombre}</h3>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>Taller especializado BMW</p> */}
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#407BFF' }}>{taller?.tipo === 'Almacen' ? "Almacén de Autopartes" : taller?.tipo === 'Mecanico a Domicilio' ? "Mecánico a domicilio" : "Taller Mecánico"}</p>
          {data?.getCalificacionOpiniones > 0 &&
            <span style={{ marginTop: '24px', display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#182537', fontSize: '14px', fontWeight: '500' }}>{renderStars(Number(data?.getCalificacionOpiniones))}{data?.getCalificacionOpiniones} ({taller.numerocalificacionesmaps ? taller.numerocalificacionesmaps : 1} reseñas)</span>
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, marginTop:'8px'}}>

          <ul style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {taller?.categorias?.slice(0, 3).map(el => {
              const category = categorias?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                category &&
                <li key={category?.nombre} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', }}>
                  {/* {category?.img && <img src={`/${category?.img}`} style={{height:'20px',width:'20px'}} alt={`Taller de autos de ${el}`} />} */}
                  <img
                    src={`/${category?.img}`} // Ruta de la imagen
                    alt={`Servicio de ${el}`}
                    style={{ height: '20px', width: '20px' }}
                  />
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '12px', color: '#464646' }}>{category?.nombre}</p>
                </li>
              )
            })}
            <li style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', color: '#929292', fontWeight: '500' }}>
              +{taller?.categorias?.length} servicios
            </li>
          </ul>

        </div>
        <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '8px', width: '100%', alignItems: 'flex-end' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#A6AEC1' }}>📍 Calle 94b #56-12. {taller?.ciudad}</p>
          <Button variant={ButtonVariant.primary} size='sm' style={{ backgroundColor: '#E1EAFF', color: '#407BFF', fontSize: '12px', alignSelf: 'flex-end', margin: 0, borderRadius: '4px' }}>
            Ver taller
          </Button>
        </footer>
      </section>

    </div>
  )
}