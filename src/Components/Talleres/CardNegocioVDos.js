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

export default function CardNegocioVDos({ data, user, setEditModeHiddenButtons }) {
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editPerfil, setEditPerfil] = useState(secondForm)
  const router = useRouter()
  const [editNegocioVDos, result] = useMutation(EDIT_NEGOCIO_VDOS)
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reff = useRef(null)
  const [prevImage, setPrevImage] = useState(data?.fotoperfil)
  const [visibleModalEditHorario, setVisibleModalEditHorario] = useState(false)
  const [loadingImage, setLoadingImage] = useState(true)
  const horariosSeparados = data?.horario?.split(',');

  const handleScroll = () => {
    reff?.current?.scrollToRef();
  };
  const handleVisibleHorario = () => {
    setVisibleFullHorario(!visibleFullHorario)
  }
  const handleClick = (e) => {

    e.stopPropagation()
    // setEditMode(!editMode)
    if (data && !editMode) {
      setEditPerfil({
        ...editPerfil,
        nombre: result?.data?.editNegocioVDos?.nombre ? result?.data?.editNegocioVDos?.nombre : data?.nombre,
        direccion: result?.data?.editNegocioVDos?.direccion ? result?.data?.editNegocioVDos?.direccion : data?.direccion,
        telefono: result?.data?.editNegocioVDos?.telefono ? result?.data?.editNegocioVDos?.telefono : data?.telefono,
        whatsapp: result?.data?.editNegocioVDos?.whatsapp ? result?.data?.editNegocioVDos?.whatsapp : data?.whatsapp
      })
    }
    if ((user?.userName === router?.query?.id) && !editMode) {
      setEditModeHiddenButtons(true)

      return setEditMode(!editMode)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredEditPerfil = Object.keys(editPerfil).reduce((acc, key) => {
      if (editPerfil[key] !== '') {
        acc[key] = editPerfil[key];
      }
      return acc;
    }, {});
    editNegocioVDos({ variables: filteredEditPerfil });
    setEditPerfil(secondForm)
    setEditMode(false);
    setEditModeHiddenButtons(false)
  }
  const inputName = (e) => {
    if (editPerfil.nombre.length <= 22) {
      return setEditPerfil({ ...editPerfil, nombre: e.target.value })
    }
    else {
      setEditPerfil({ ...editPerfil, nombre: editPerfil.nombre.slice(0, editPerfil?.nombre.length - 1) })
      alert("El nombre no puede superar los 22 caracteres")
    }
  }
  const handleClose = () => {
    setEditPerfil({ ...editPerfil, nombre: data?.nombre, fotoperfil: '' })
    setPrevImage(data?.fotoperfil)
    setEditMode(false)
    setEditModeHiddenButtons(false)
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
        className={`${styles.cardContainerPrincipal} ${editMode ? styles.active : ''}`}
        onClick={handleClick}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {(data?.fotoperfil && !editMode) ?
            loadingImage
              ?
              <div
                className={styles.skeletonFotoPerfil}
              />
              :
              <Image width={48} height={48} loading="lazy" className={styles.imgFotoPerfil} src={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : prevImage ? prevImage : data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} />
            : user?.userName !== router?.query.id &&
            <ion-icon  style={{ fontSize: '50px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
          }
          {/* <div style={{ cursor: 'pointer', position:'absolute', top:'-70px', right:'0px',background:'0.8', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '8px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '8px', width: 'fit-content', maxWidth: '600px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
              <img style={{ width: '20px', height: '14px' }} src='./EmojiTaller.png' />
              <p style={{ fontSize: '10px' }}>Taller Automotriz</p>
            </div>
          </div> */}

          {(user?.userName === router?.query?.id) && editMode &&
            <AddFotoPerfil dataImportante={editPerfil} setDataImportante={setEditPerfil} setEditMode={setEditMode} editMode={editMode} fotoActual={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : data?.fotoperfil} setPrevImage={setPrevImage} />
          }
        </div>

        {/* <div >
          <img src="/star.svg" style={{ width: '20px', height: '20px' }} />
          <p style={{fontSize:'12px', color:'#5c5c5c'}}>4.6</p>
        </div> */}
        {editMode
          ?
          <input style={{ fontSize: editPerfil.nombre.length > 18 ? '22px' : editPerfil?.nombre.length > 12 ? '24px' : '28px' }} className={styles.nameNegocio} type='text' value={editPerfil.nombre} onChange={(e) => inputName(e)} />
          : <h1
            className={styles.nameNegocio}
            style={{ fontSize: (result?.data?.editNegocioVDos.nombre.length > 18 || data?.nombre.length > 18) ? '22px' : (result?.data?.editNegocioVDos.nombre.length > 12 || data?.nombre.length > 12) ? '26px' : '28px' }}
          >
            {result?.data?.editNegocioVDos.nombre ? result?.data.editNegocioVDos.nombre : data?.nombre}
          </h1>

        }

        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', boxSizing: 'border-box', padding: '5px 0 10px 0' }}>
          <Image alt={`Taller de autos ${data?.nombre}`} width={26} height={20} src='/EmojiTaller.png' />
          <h3 style={{ fontSize: '16px', fontWeight: '400', alignSelf: 'center', textAlign: 'center', color: '#969595' }}>Taller Automotriz</h3>
        </div>


        <div style={{ height: '1px', backgroundColor: '#f1f1f1', width: '90%' }} />


        {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} editMode={editMode} setVisibleModalEditHorario={setVisibleModalEditHorario} />}
        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} setEditPerfil={setEditPerfil} editPerfil={editPerfil} editMode={editMode} result={result} />

        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '10px',  }}>
          <WidgetIcon name={IconCatalog.logoFacebook} styles={{ color: '#373737', }} size={'lg'} />
          <WidgetIcon name={IconCatalog.logoInstagram} styles={{ color: '#373737' }} size={'lg'} />

        </div> */}
        {editMode && (
          <>
            {(editPerfil.direccion != data?.direccion || editPerfil.nombre != data?.nombre || prevImage != data?.fotoperfil || editPerfil.direccion != data?.direccion || editPerfil.whatsapp != data?.whatsapp || editPerfil.telefono != data?.telefono) ?
              <>
                <button onClick={handleSubmit} className={styles.checkIcon}>
                  <Icon name={IconCatalog.checkmarkOutline} size='md' style={{ color: 'white' }} />
                </button>
                <button onClick={handleClose} className={styles.cancelIcon}>
                  <Icon name={IconCatalog.closeOutline} size='md' style={{ color: '#373737' }} />
                </button>
              </>
              :
              <button onClick={() => { setEditMode(false); setEditModeHiddenButtons(false) }} className={styles.editIcon}>
                <Icon name={IconCatalog.pencilOutline} size='sm' style={{ color: 'white' }} />
              </button>
            }
          </>
        )}
      </section>
      {visibleModalEditHorario &&
        <ModalEditHorario setVisibleModalEditHorario={setVisibleModalEditHorario} horarioActual={data?.horario} />
      }
    </>
  )
}