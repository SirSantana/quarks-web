
import { CREATE_VISITA_WHATSAPP, EDIT_NEGOCIO_VDOS } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Icon, { IconCatalog } from '../Icon/Icon';
import { useState } from 'react';
import AddFotoPerfil from '../Register/AddFotoPerfil';
import { GET_ONE_NEGOCIOVDOS } from '@/graphql/queries';


let secondForm = {
  direccion: '',
  fotoperfil: '',
  nombre: ''
}


export default function CardPerfil({ data, user }) {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [prevImage, setPrevImage] = useState(data?.fotoperfil)
  const [createVisitaWhatsapp] = useMutation(CREATE_VISITA_WHATSAPP)
  const [editNegocioVDos, result] = useMutation(EDIT_NEGOCIO_VDOS, {
    refetchQueries: { query: GET_ONE_NEGOCIOVDOS, variables: { id: router?.query.id } }
  })

  const [editPerfil, setEditPerfil] = useState(secondForm)

  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: data?.id } })
    let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }
  const handleClick = (e) => {

    e.stopPropagation()
    if (data && !editMode) {
      setEditPerfil({ ...editPerfil, nombre: result?.data?.editNegocioVDos?.nombre ? result?.data?.editNegocioVDos?.nombre : data?.nombre, direccion: data?.direccion, })
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
    if (editPerfil.nombre.length >= 20) {
      alert("El nombre no puede superar los 20 caracteres")
    }
    setEditPerfil({ ...editPerfil, nombre: e.target.value })

  }
  const handleClose = () => {
    setEditPerfil({ ...editPerfil, nombre: data?.nombre, fotoperfil: '' })
    setPrevImage(data?.fotoperfil)
    setEditMode(false)
  }
  return (
    <div onClick={handleClick} className={`${styles.containerCardPerfil} ${editMode ? styles.active : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', alignItems: 'center', height: '80%', alignSelf: 'center' }}>
        <div onClick={() => setEditMode(true)} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {(data?.fotoperfil && !editMode) ?
            <img style={{ borderRadius: '50%', border: '1px solid #f1f1f1', width: '160px', height: '160px', marginBottom: '16px' }} src={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : prevImage ? prevImage : data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
            : user?.userName !== router?.query.id &&
            <ion-icon style={{ fontSize: '72px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
          }
          {(user?.userName === router?.query?.id) && editMode &&
            <AddFotoPerfil dataImportante={editPerfil} setDataImportante={setEditPerfil} setEditMode={setEditMode} editMode={editMode} fotoActual={result?.data?.editNegocioVDos?.fotoperfil ? result?.data?.editNegocioVDos?.fotoperfil : data?.fotoperfil} setPrevImage={setPrevImage} />
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {editMode
            ?
            <input style={{
              fontSize: '28px',
              lineHeight: '1.1',
              alignSelf: 'center',
              textAlign: 'center',
              width: '95%',
              justifyContent: 'center',
              border: null,
              textDecoration: 'none',
              border: '0 solid white',
              outline: 'none',
              fontWeight: 700
            }} type='text' value={editPerfil.nombre} onChange={(e) => inputName(e)} />
            : <h1
              className={styles.titleNegocio}
              style={{
                fontSize: '28px',
                lineHeight: '1.1',
                alignSelf: 'center',
                textAlign: 'center',
                width: '95%',
                justifyContent: 'center',
                border: null,
                textDecoration: 'none',
                outline: 'none'
              }}
            >
              {result?.data?.editNegocioVDos.nombre ? result?.data.editNegocioVDos.nombre : data?.nombre}
            </h1>

          }

          <h3 style={{ fontSize: '16px', fontWeight: '400', alignSelf: 'center', textAlign: 'center' }}>
            {data?.direccion}. {data?.ciudad}, {data?.pais}</h3>
          {/* {user?.userName === router?.query?.id &&
            <input className={styles.inputsAddInfo} type='text' name='direccion' placeholder='Agregar direccion' />
          } */}
        </div>

        {data?.tipo === 'Almacen'
          &&
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
            {data?.marcasAutos.map(el => (
              <img style={{ width: '40px', height: '40px', borderRadius: '10px' }} src={`${el}.png`} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
            ))}
          </div>
        }
      </div>
      {user?.userName === router?.query?.id
        ?
        <button style={{ fontSize: '16px', width: '100%', }} className={styles.buttonFixed} onClick={sendMessageWha} ><Icon name={IconCatalog.createOutline} style={{ color: 'white' }} size='md' /> Editar Taller</button>
        :
        <button style={{ width: '100%', gap: '16px', borderRadius: '12px', fontSize: '16px' }} onClick={sendMessageWha} className={styles.buttonPrimaryMobile}><Icon name={IconCatalog.logoWhatsapp} style={{ color: 'white' }} size='md' />Contactar ahora</button>
      }
      {editMode && (
        <>
          {(editPerfil.direccion != data?.direccion || editPerfil.nombre != data?.nombre || prevImage != data?.fotoperfil) ?
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
    </div >
  )
}