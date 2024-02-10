import { useEffect, useRef, useState } from "react";
import DatosImportantes from "./DatosImportantes";
import Horario from "./Horario";
import styles from '@/styles/Components.module.css'
import Image from "next/image";
import Icon, { IconCatalog } from "../Icon/Icon";
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import CalificacionWidget from "./CalificacionWidget";
const Star = ({ index, stars, tamaño, }) => {
  return (
    // <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
    <Icon size='sm' name={IconCatalog.star} style={{ color: stars < index + 1 ? '#c5c5c5' : '#FBBC04', fontSize: '14px' }} />

  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function CardNegocioVDos({ data, onClick, onClickDos}) {
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reff = useRef(null)
  const horariosSeparados = data?.horario?.split(',');
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: data?.id } })

  const handleVisibleHorario = () => {
    setVisibleFullHorario(!visibleFullHorario)
  }
  return (
    <>
      <section
        className={styles.cardContainerPrincipal}
      >
        {/* <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {data?.fotoperfil ?
            loadingImage
              ?
              <div
                className={styles.skeletonFotoPerfil}
              />
              :
              <Image width={48} height={48} loading="lazy" className={styles.imgFotoPerfil} src={ data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} />
            :
            <ion-icon style={{ fontSize: '50px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
          }
        </div> */}
        <h1
          className={styles.nameNegocio}
          style={{ textAlign: 'center', fontSize: (data?.nombre.length > 18) ? '22px' : (data?.nombre.length > 12) ? '26px' : '28px', width:'100%' }}
        >
          {data?.nombre}
        </h1>
          <CalificacionWidget onClick={onClick} id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />
        {/* <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '16px', alignItems: 'center', boxSizing: 'border-box', padding: '0px 10px 10px 10px' }}>
          <Image alt={`Taller de autos ${data?.nombre}`} style={{ objectFit: 'contain' }} width={26} height={20} src='/EmojiTaller.png' />
          <p style={{ fontSize: '16px', fontWeight: '400', alignSelf: 'center', textAlign: 'center', color: '#969595' }}>{data?.userName === 'corsa-motors' ? 'Almacen de Repuestos' : 'Taller Automotriz'}</p>
        </div> */}


        {/* <div style={{ height: '1px', backgroundColor: '#dddddd', width: '90%' }} /> */}
        <DatosImportantes data={data} ref={reff} onClick={onClickDos} />
        {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} idNegocio={data?.id} />}
      </section>
    </>
  )
}