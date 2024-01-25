


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function SliderCatVDos({ categorias, mode }) {
  const router = useRouter()
  // const categoriaRouter = router?.query?.id?.split("-")[0]

  const categoriaServicio = router?.query.servicio

  const CustomPrevArrow = (props) => (
    <div className={styles.customPrevArrow} onClick={props.onClick}>
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
  );
  const CustomNextArrow = (props) => (
    <div className={styles.customNextArrow} onClick={props.onClick}>
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  );
  const settings = {
    horizontal: true,
    vertical: false,
    infinite: false,
    speed: 500,
    speed: 500,
    slidesToShow: 1, // Muestra una slide a la vez
    slidesToScroll: 2,
    variableWidth: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    
  };
  return (
    <div  className={styles.categoriasSlider}>

      <Slider   {...settings}>
        {categorias.map((categoria, index) => (
          <Link
            prefetch={false}
            href={mode
              ?
              `/servicios-automotriz/${categoria.url.toLowerCase().replace(/ /g, '-').replace(/\s+/g, '-') // Reemplazar espacios con guiones
                .normalize("NFD")     // Normalizar para descomponer caracteres acentuados
                .replace(/[\u0300-\u036f]/g, '')}`
              : `/?servicio=${categoria.nombre.toLowerCase().replace(/ /g, '-').replace(/\s+/g, '-') // Reemplazar espacios con guiones
              .normalize("NFD")     // Normalizar para descomponer caracteres acentuados
              .replace(/[\u0300-\u036f]/g, '')}`
            }
            key={index}
            className={styles.categoria}
          >
            <div className={categoriaServicio?.replace(/-/g, ' ') === categoria.nombre ?styles.centeredContentCheck: styles.centeredContent}>
              <Image src={`/${categoria.img}.png`} width={20} height={20} alt={`Taller mecanico cerca de mi de ${categoria.nombre}`} />
              {categoriaServicio?.replace(/-/g, ' ') === categoria.nombre ?
                <h3 className={styles.textCategoriaTaller}>{categoria.nombre}</h3>
                :
                <h3 className={styles.textCategoriaTaller}>{categoria.nombre}</h3>
              }

            </div>
          </Link>
        ))}
      </Slider>


    </div>
  );
}