import { useRef, useState } from "react";
import Icon, { IconCatalog } from "../Icon/Icon";
import WidgetIcon from "../Icon/WidgetIcon";
import DatosImportantes from "./DatosImportantes";
import Horario from "./Horario";
import styles from '@/styles/Components.module.css'
import { useRouter } from "next/router";
import { EDIT_NEGOCIO_VDOS } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import AddFotoPerfil from "../Register/AddFotoPerfil";
import { ModalEditHorario } from "@/utils/Modales";


let secondForm = {
  direccion: '',
  fotoperfil: '',
  nombre: '',
  whatsapp: '',
  telefono: ''
}

export default function CardNegocioVDos({ data, user }) {
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editPerfil, setEditPerfil] = useState(secondForm)
  const router = useRouter()
  const [editNegocioVDos, result] = useMutation(EDIT_NEGOCIO_VDOS)
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reff = useRef(null)
  const [prevImage, setPrevImage] = useState(data?.fotoperfil)
  const [visibleModalEditHorario, setVisibleModalEditHorario] = useState(false)

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
        direccion: result?.data?.editNegocioVDos?.direccion ?result?.data?.editNegocioVDos?.direccion:data?.direccion,
        telefono: result?.data?.editNegocioVDos?.telefono ?result?.data?.editNegocioVDos?.telefono:data?.telefono,
        whatsapp: result?.data?.editNegocioVDos?.whatsapp ?result?.data?.editNegocioVDos?.whatsapp:data?.whatsapp
      })
    }
    if ((user?.userName === router?.query?.id) && !editMode) {
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
  }
  return (
    <>
      <div
        className={`${styles.cardContainerPrincipal} ${editMode ? styles.active : ''}`}
        onClick={handleClick}
      >
        <div onClick={() => setEditMode(true)} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {(data?.fotoperfil && !editMode) ?
            <img className={styles.imgFotoPerfil} src={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : prevImage ? prevImage : data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} />
            : user?.userName !== router?.query.id &&
            <ion-icon style={{ fontSize: '50px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
          }
          {(user?.userName === router?.query?.id) && editMode &&
            <AddFotoPerfil dataImportante={editPerfil} setDataImportante={setEditPerfil} setEditMode={setEditMode} editMode={editMode} fotoActual={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : data?.fotoperfil} setPrevImage={setPrevImage} />
          }
        </div>
        {/* <img
        className={styles.imgFotoPerfil}
        src="https://www.propartes.com/wp-content/uploads/2021/05/Tullanta116.jpg"
      /> */}
        {editMode
          ?
          <input style={{ fontSize: editPerfil.nombre.length > 18 ? '22px' : editPerfil?.nombre.length > 12 ? '24px' : '28px' }} className={styles.nameNegocio} type='text' value={editPerfil.nombre} onChange={(e) => inputName(e)} />
          : <h1
            className={styles.nameNegocio}
            style={{ fontSize: result?.data?.editNegocioVDos.nombre.length > 18 ? '22px' : result?.data?.editNegocioVDos.nombre.length > 12 ? '26px' : '28px' }}
          >
            {result?.data?.editNegocioVDos.nombre ? result?.data.editNegocioVDos.nombre : data?.nombre}
          </h1>

        }
        {/* <h1
        style={{
          fontSize: '26px',
          lineHeight: '1.1',
          fontWeight: '700',
          alignSelf: 'center',
          textAlign: 'center',
          width: '95%',
          justifyContent: 'center',
          border: null,
          textDecoration: 'none',
          outline: 'none',
        }}
      >
        Tu llanta.com
      </h1> */}
        <h3 style={{ fontSize: '16px', fontWeight: '400', padding: '8px 0 20px 0', alignSelf: 'center', textAlign: 'center' }}>
          {data?.direccion}. <span style={{ fontSize: '16px', fontWeight: '500', }}> {data?.ciudad}, {data?.pais}</span>
        </h3>
        <div style={{ height: '1px', backgroundColor: '#f1f1f1', width: '90%' }} />
        {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} editMode={editMode} setVisibleModalEditHorario={setVisibleModalEditHorario} />}
        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} setEditPerfil={setEditPerfil} editPerfil={editPerfil} editMode={editMode} result={result} />

        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '10px' }}>
          <WidgetIcon name={IconCatalog.logoFacebook} styles={{ color: '#373737' }} size={'lg'} />
          <WidgetIcon name={IconCatalog.logoInstagram} styles={{ color: '#373737' }} size={'lg'} />

        </div>
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
              <button onClick={() => setEditMode(false)} className={styles.editIcon}>
                <Icon name={IconCatalog.pencilOutline} size='sm' style={{ color: 'white' }} />
              </button>
            }
          </>
        )}
      </div>
      {visibleModalEditHorario &&
        <ModalEditHorario setVisibleModalEditHorario={setVisibleModalEditHorario} horarioActual={data?.horario} />
      }
    </>
  )
}