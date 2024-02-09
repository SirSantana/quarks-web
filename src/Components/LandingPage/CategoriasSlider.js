
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Icon, { IconCatalog } from '../Icon/Icon';

export default function CategoriasSlider({ categorias, mode }) {
  const router = useRouter()
  // const categoriaRouter = router?.query?.id?.split("-")[0]

  const categoriaServicio = router?.query.id
  const initialSlideIndex = categorias.findIndex(
    (categoria) =>
      categoria.url.toLowerCase().replace(/ /g, '-').replace(/-/g,' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '')  ==
      categoriaServicio?.toLocaleLowerCase().replace(/-/g,' ')
      
  );
  const CustomPrevArrow = (props) => (
    <div className={styles.customPrevArrow} onClick={props.onClick}>
      <Icon size='sm' name={IconCatalog.chevronBackOutline}/>
      {/* <ion-icon style={{color:'#464646'}} name="chevron-back-"></ion-icon> */}
    </div>
  );
  const CustomNextArrow = (props) => (
    <div className={styles.customNextArrow} onClick={props.onClick}>
      <Icon size='sm' name={IconCatalog.chevronForwardOutline}/>
    </div>
  );
  const settings = {
    horizontal: true,
    infinite: true,
    draggable: true,
    speed: 500,
    speed: 500,
    slidesToShow: 1, // Muestra una slide a la vez
    slidesToScroll: 2,
    variableWidth: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    initialSlide: initialSlideIndex !== -1 ? initialSlideIndex-1 : 0,
  };
  return (
    <div className={styles.categoriasSlider}>

      <Slider   {...settings}>
        {categorias.map((categoria, index) => (
          // <Link
          // prefetch={false}
          //   href={mode
          //     ?
          //     `/servicios-automotriz/${categoria.url.toLowerCase().replace(/ /g,'-').replace(/\s+/g, '-') // Reemplazar espacios con guiones
          //     .normalize("NFD")     // Normalizar para descomponer caracteres acentuados
          //     .replace(/[\u0300-\u036f]/g, '')}`
          //     :  `/?servicio=${categoria.nombre.toLowerCase().replace(/ /g, '-').replace(/\s+/g, '-') // Reemplazar espacios con guiones
          //     .normalize("NFD")     // Normalizar para descomponer caracteres acentuados
          //     .replace(/[\u0300-\u036f]/g, '')}`
          //   }
          //   key={index}
          //   style={{ width: 140 }}
          //   className={styles.categoria}
          // >
          <Link
          prefetch={false}
          scroll={true}
            href={
              `/servicios-automotriz/${categoria.url.toLowerCase().replace(/ /g,'-').replace(/\s+/g, '-') // Reemplazar espacios con guiones
              .normalize("NFD")     // Normalizar para descomponer caracteres acentuados
              .replace(/[\u0300-\u036f]/g, '')}`
            }
            key={index}
            style={{ width: 140 }}
            className={styles.categoria}
          >
            <div style={{opacity:categoria.url == router.route}} className={`${styles.centeredContent} ${initialSlideIndex === index ? styles.activeCategory : ''}`}>
              <Image  src={`/${categoria.img}.png`} width={32} height={32}  alt={`Taller mecanico cerca de mi de ${categoria.nombre}`} />
              {categoriaServicio?.replace(/-/g,' ') === categoria.nombre ?
                <>
                  <h3 className={`${styles.textCategoriaTallerA} ${initialSlideIndex === index ? styles.activeCategory : ''}`}>{categoria.nombre}</h3>
                  <div className={styles.lineaDivisoraA} />
                </>
                :
                <>
                  <h3 className={`${styles.textCategoriaTaller} ${initialSlideIndex === index ? styles.activeCategory : ''}`}>{categoria.nombre}</h3>
                  <div className={` ${initialSlideIndex === index ? styles.lineaDivisoraA : styles.lineaDivisora}`} />
                </>
              }

            </div>
          </Link>
        ))}
      </Slider>

    </div>
  );
}