import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import CardsPreguntas from "../components/Cotizaciones/Cards/CardsPreguntas";
import CotizacionesRender from "../components/Cotizaciones/Cotizaciones";
import { GET_PREV_PREGUNTAS } from "../graphql/queries";
import styles from '../styles/carrousel.module.css'
import { Loader } from "./loader";

export default function MultipleItems() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [getPrevPreguntas, result] = useLazyQuery(GET_PREV_PREGUNTAS)

  useEffect(() => {
    getPrevPreguntas({ variables: { marca: 'Chevrolet', limit: 8 } })
  }, [])

  return (
    <div className={styles.container}>
      <h4 style={{ color: '#1b333d', fontWeight: '600' }}>Otras personas han preguntado...</h4>
      {result?.loading && <Loader />}
      <Slider className={styles.slickSlide} {...settings}>
        {result?.data?.getPreguntas && result?.data?.getPreguntas.map(el => <Link href={`/cotizaciones/${el.id} ${el.titulo}`} className={styles.card}><div className={styles.slickList}> <CardsPreguntas el={el} /></div></Link>)}
      </Slider>
    </div>
  );
}