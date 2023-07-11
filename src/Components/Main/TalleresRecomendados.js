import styles from '@/styles/Main.module.css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode, Pagination, Scrollbar } from 'swiper';
import Link from 'next/link';
import SwiperAutopartes from '../Home/SwiperAutopartes';
import DiccionarioHome from '../Index/DiccionarioHome';

let category = [1, 2, 3]

export default function TalleresRecomendados() {
  return (
    <div className={styles.containerServicios}>
      {/* <h2 className={styles.titleSections}>Talleres recomendados</h2> */}
      <Link href={'/glosario-de-autopartes'} style={{ textDecoration: 'none', color:'#373737'}}>
        <h2 style={{ marginBottom: '16px' }} className={styles.question}>Glosario de Autopartes</h2>
      </Link>

      <SwiperAutopartes />
      <DiccionarioHome />
      
      {/* <Swiper
        className={styles.containerTalleres2}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        grabCursor={true}
        pagination={false}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 16
          },
          600: {
            slidesPerView: 1.5,
            spaceBetween: 16
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 32
          },
        }}
      >
        {category.map(el => (

          <SwiperSlide className={styles.containerSlide} >
            <div className={styles.containerSli}>
              <img src={`./carro1.jpg`} style={{ height: '164px', width: '100%' }} />
              <h6 style={{ fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>El mundo del amortiguador</h6>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}>Amortiguadores · Clutch </p>
              <button className={styles.buttonSecondary}>
                Ver negocio
              </button>
            </div>
          </SwiperSlide>
        ))}

      </Swiper> */}


    </div>
  )
}