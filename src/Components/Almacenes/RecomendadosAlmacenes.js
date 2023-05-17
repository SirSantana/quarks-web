import styles from '@/styles/Almacenes.module.css'
import Link from "next/link";
import Almacen from "./Almacen";
import { useQuery } from "@apollo/client";
import { GET_ALMACENES_RECOMENDADOS } from "@/graphql/queries";

import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Pagination, Scrollbar} from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1
      }
    }
  ]

};
export default function AlmacenesRecomendados() {
  const { loading, data, error } = useQuery(GET_ALMACENES_RECOMENDADOS)
  const handleChangePestaña = (almacen) => {
    window.open(`/almacenes/${almacen?.id}-${almacen?.nombre?.split(" ").join('-')}`);
  }

  return (
    <Swiper
      style={{ width: '100%', paddingBottom:'16px', paddingLeft:'4px' }}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      grabCursor={true}
      pagination={{ clickable: true }}
      breakpoints={{
        0: {
          slidesPerView: 1.1,
          spaceBetween: 8
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 8
        },
        980: {
          slidesPerView: 3,
          spaceBetween: 8
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 8
        },
      }}
    >
      {data?.getAlmacenesRecomendados?.map(almacen => (
        <SwiperSlide>
          <Link style={{ textDecoration: 'none' }} href={'#'} onClick={() => handleChangePestaña(almacen)} >
            <div style={{ margin: '16px 8px 16px 0' }} className={styles.card}>
              <Almacen almacen={almacen} />
            </div>
          </Link>
        </SwiperSlide>))}
       

    </Swiper>


  )
}