
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Faq.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SliderServiciosTaller({categorias, id}) {
  const router = useRouter()
  const settings = {
    horizontal: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 1, // Muestra una slide a la vez
    slidesToScroll: 2,
    variableWidth: true,
    arrows:false
  };
  return (

    <Slider  className={styles.slider}  {...settings}>
      {categorias.map(el => (
        <div onClick={()=> router.push(`/${router.query.id}/solicitar-revision?ide=${id}`)} className={styles.cardServicioNegocio}>
          <h3 style={{fontSize:'16px', marginBottom: '4px', fontWeight: '500', lineHeight: '1.1', overflow: 'hidden', textOverflow: 'ellipsis', }}>{el.nombre}</h3>
          {/* <p style={{ color: '#737373', fontSize: '12px' }}>Solicitar servicio</p> */}
          <Image
            src={`/${el.img}.png`}
            width={100}
            height={100}
            style={{
              width: '100px',
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            alt={`Talleres de ${el.nombre} cerca a mi en Bogotá`}
          />
        </div>
      ))}
    </Slider>
  )
}