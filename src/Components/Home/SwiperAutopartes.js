

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import styles from '@/styles/HomeArticulos.module.css'

const categorias = ['Accesorios', 'Clutch', 'Caja y Transmision', 'Carroceria', 'Correas','Direccion y suspension',  'Filtros', 'Electricos', 'Lubricantes', 'Frenado', 'Iluminacion', 'Motor', 'Refrigeracion',]


export default function SwiperAutopartes({quantity}) {
  return (
    <Swiper
    style={{paddingBottom:'32px',}}
    className={styles.swipperContainer}
    freeMode={true}
    modules={[FreeMode, Pagination]}
    grabCursor={true}
    pagination={{ clickable: true }}
    breakpoints={{
      0: {
        slidesPerView: quantity ? 4: 4,
        spaceBetween: 8
      },
      500: {
        slidesPerView: quantity ? 4: 6,
        spaceBetween: 8
      },
      750: {
        slidesPerView: quantity ? 6: 8,
        spaceBetween: 32
      },
      1000: {
        slidesPerView: quantity ? 8: 10,
        spaceBetween: 32
      },
      1200: {
        slidesPerView: quantity ? 8: 10,
        spaceBetween: 32
      },
    }}
    >
      {categorias.map(el => (
        <SwiperSlide style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <div style={{backgroundColor:el=== 'Caja y Transmision' && '#ffefef', borderColor:el === 'Caja y Transmision' && '#5b0221'}} className={styles.circleAutopartes}>
            <img src={`./${el}.png`} style={{ height: '24px', width: '24px' }} />
          </div>
          <p style={{fontSize:'12px',  textAlign:'center', marginTop:'8px'}}>{el}</p>
        </SwiperSlide>
      ))}


    </Swiper>
  )
}