import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/styles/Almacenes.module.css'
import Link from "next/link";
import Almacen from "./Almacen";
import { GET_ALMACENES_BY_CATEGORIA } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
let settings = {
  dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
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
            slidesToScroll: 1,
           
          }
        }
      ]
  
};

export default function AlmacenesByCategoria({categoria}) {
  const [getAlmacenesByCategoria,{ loading, data, error }] = useLazyQuery(GET_ALMACENES_BY_CATEGORIA)
  const handleChangePestaña = (almacen) => {
    window.open(`/almacenes/${almacen?.id}-${almacen?.nombre?.split(" ").join('-')}`);
  }
  useEffect(()=>{
    getAlmacenesByCategoria({variables:{categoria:categoria}})
  },[categoria])
  return (
    <Slider className={styles.slider} {...settings}>
      {data?.getAlmacenesByCategoria?.map(almacen => (
        <Link style={{textDecoration:'none'}} href={'#'} onClick={() => handleChangePestaña(almacen)} >
          <div style={{margin:'16px 8px'}} className={styles.card}>
            <Almacen almacen={almacen} />
          </div>
        </Link>
      ))}
    </Slider>
  )
}