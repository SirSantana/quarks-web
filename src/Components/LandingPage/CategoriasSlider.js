
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CategoriasSlider({ categorias }) {
  const router = useRouter()
  const categoriaRouter = router?.query?.id?.split("-")[0]

  const CustomPrevArrow = (props) => (
    <div className={styles.customPrevArrow} onClick={props.onClick}>
      <ion-icon name="chevron-back-circle-outline"></ion-icon>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div className={styles.customNextArrow} onClick={props.onClick}>
      <ion-icon name="chevron-forward-circle-outline"></ion-icon>
    </div>
  );
  const settings = {
    horizontal: true,
    vertical: false,
    infinite: false,
    speed: 500,
    speed: 500,
    slidesToShow: 1, // Muestra una slide a la vez
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className={styles.categoriasSlider}>
      
      <Slider  {...settings}>
      {categorias.map((categoria, index) => (
        <Link
          href={`/servicios-automotriz/${categoria.url}-Bogota,%20Colombia`}
          key={index}
          style={{width:140}}
          className={styles.categoria}
        >
         
          <div className={styles.centeredContent}>
            <img src={router.pathname === '/'?`./${categoria.img}.png`:`../../${categoria.img}.png`} style={{ height: '24px', width: '24px' }} alt={categoria.nombre} />
            {categoriaRouter === categoria.nombre || (router?.pathname === '/' && categoria.nombre === 'Alineación y balanceo')  ?
              <>
                <p className={styles.textCategoriaTallerA}>{categoria.nombre}</p>
                <div className={styles.lineaDivisoraA} />
              </>
              :
              <>
                <p className={styles.textCategoriaTaller}>{categoria.nombre}</p>
                <div className={styles.lineaDivisora} />
              </>
            }

          </div>
        </Link>
      ))}
    </Slider>
      

    </div>
  );
}