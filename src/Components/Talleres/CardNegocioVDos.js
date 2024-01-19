import { useEffect, useRef, useState } from "react";
import Icon, { IconCatalog } from "../Icon/Icon";
import DatosImportantes from "./DatosImportantes";
import Horario from "./Horario";
import styles from '@/styles/Components.module.css'
import { useRouter } from "next/router";
import { EDIT_NEGOCIO_VDOS } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import AddFotoPerfil from "../Register/AddFotoPerfil";
import { ModalEditHorario } from "@/utils/Modales";
import Image from "next/image";


let secondForm = {
  direccion: '',
  fotoperfil: '',
  nombre: '',
  whatsapp: '',
  telefono: ''
}

export default function CardNegocioVDos({ data,  }) {
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reff = useRef(null)
  const [loadingImage, setLoadingImage] = useState(true)
  const horariosSeparados = data?.horario?.split(',');


  const handleVisibleHorario = () => {
    setVisibleFullHorario(!visibleFullHorario)
  }

  useEffect(() => {
    // Simulamos una demora de 2 segundos para cargar los iconos
    const timeoutId = setTimeout(() => {
      setLoadingImage(false);
    }, 800);

    // Limpieza del temporizador en caso de que el componente se desmonte antes de que termine la carga simulada
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <section
        className={styles.cardContainerPrincipal}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
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
        </div>
        <h1
          className={styles.nameNegocio}
          style={{ fontSize: (data?.nombre.length > 18) ? '22px' : (data?.nombre.length > 12) ? '26px' : '28px' }}
        >
          { data?.nombre}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', boxSizing: 'border-box', padding: '5px 0 10px 0' }}>
          <Image alt={`Taller de autos ${data?.nombre}`} style={{ objectFit: 'contain' }} width={26} height={20} src='/EmojiTaller.png' />
          <p style={{ fontSize: '16px', fontWeight: '400', alignSelf: 'center', textAlign: 'center', color: '#969595' }}>{data?.userName === 'corsa-motors' ? 'Almacen de Repuestos' : 'Taller Automotriz'}</p>
        </div>


        <div style={{ height: '1px', backgroundColor: '#f1f1f1', width: '90%' }} />
        {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} />}
        <DatosImportantes data={data} ref={reff}     />
      </section>
    </>
  )
}