

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Scrollbar } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

const categorias = [ 'Clutch', 'Caja y Transmision', 'Correas','Direccion y suspension',  'Filtros', 'Electricos',  'Frenado',  'Motor', ]


export default function SwiperAutopartes({quantity, select, imgPath}) {
  const router = useRouter()
  const changeCategory=(category)=>{
    router.push(`/glosario-de-autopartes/${category.split(" ").join('-')}`)
  }
  return (
    <Swiper
    style={{paddingBottom:'32px', textDecoration:'none'}}
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
        <SwiperSlide style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textDecoration:'none'}}>
          <div onClick={()=> changeCategory(el)} style={{backgroundColor:el=== select && '#ffefef', borderColor:el === select && '#5b0221', cursor:'pointer'}} className={styles.circleAutopartes}>
            <img src={imgPath?`../../${el}.png`:`./${el}.png`} style={{ height: '24px', width: '24px' }} />
          </div>
          <p style={{fontSize:'12px',  textAlign:'center', marginTop:'8px', textDecoration:'none'}}>{el}</p>

        </SwiperSlide>
      ))}


    </Swiper>
  )
}