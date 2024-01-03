
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { MagicMotion } from 'react-magic-motion';

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'
import { useRouter } from 'next/router';
import { EDIT_NEGOCIO_VDOS, EDIT_NEGOCIO_VDOS_REDES } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { GET_ONE_NEGOCIOVDOS } from '@/graphql/queries';
import { ModalSuccessfull } from '@/utils/Modales';

const initialForm = {
  facebook: '',
  instagram: '',
  paginaweb: '',

}
export default function RedesSociales({ data, user }) {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [editNegocioVDosRedes, result] = useMutation(EDIT_NEGOCIO_VDOS_REDES, { refetchQueries: [{ query: GET_ONE_NEGOCIOVDOS, variables: { userName: data?.userName } }] })
  const router = useRouter()
  const handleClick = (e) => {
    e.stopPropagation()
    setEditMode(!editMode)

    setForm({ ...form, facebook: data?.facebook ? data?.facebook : '', instagram: data?.instagram ? data?.instagram : '', paginaweb: data?.paginaweb ? data?.paginaweb : '' })
    // if (user?.userName === router?.query?.id) {
    //   return setEditMode(!editMode)
    // }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleClose = () => {
    setForm(initialForm)
    setEditMode(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredEditPerfil = Object.keys(form).reduce((acc, key) => {
      if (form[key] !== '') {
        acc[key] = form[key];
      }
      return acc;
    }, {});
    editNegocioVDosRedes({ variables: filteredEditPerfil });
    setForm(initialForm)
    setEditMode(false);
  }
  let urlFacebook = result?.data?.editNegocioVDosRedes ? result?.data?.editNegocioVDosRedes?.facebook : data?.facebook
  let urlInstagram = result?.data?.editNegocioVDosRedes ? result?.data?.editNegocioVDosRedes?.instagram : data?.instagram
  let urlWeb = result?.data?.editNegocioVDosRedes ? result?.data?.editNegocioVDosRedes?.paginaweb : data?.paginaweb
  const handleChangePage = (e, { page }) => {
    e.stopPropagation()
    if (!editMode) {
      if (page === 'facebook' && urlFacebook) {
        return router.push(`${urlFacebook}`)
      }
      if (page === 'instagram' && urlInstagram) {
        return router.push(`https://www.instagram.com/${urlInstagram}`)
      }
      if (page === 'web' && urlWeb) {
        return router.push(`${urlWeb}`)
      } else if (user?.userName === router?.query?.id) {
        setEditMode(!editMode)
        setForm({ ...form, facebook: data?.facebook ? data?.facebook : '', instagram: data?.instagram ? data?.instagram : '', paginaweb: data?.paginaweb ? data?.paginaweb : '' })
      }
    }
  }
  let verification = (form.facebook !== data?.facebook || form.instagram !== data?.instagram || form.paginaweb !== data?.paginaweb)
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Redes Sociales</h2>
      <div className={`${styles.containerHeaderCalendario} ${editMode ? styles.active : ''}`} style={{ flexDirection: 'column', alignItems: 'center', }}>
        <MagicMotion>



          {urlFacebook &&
            <div onClick={(e) => handleChangePage(e, { page: 'facebook' })} style={{ color: 'black', border: editMode ? '1px solid #c5c5c5' : 'none', borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: editMode ? '8px' : '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: !editMode ? '1px solid #c5c5c5' : '1px solid white', }}>
                <Icon size='lg' name={IconCatalog.logoFacebook} style={{ color: '#0080FF', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5', display: editMode ? 'flex' : 'none' }} />
              {editMode
                ? <div style={{ display: 'flex', flexDirection: 'row', flex: 1, paddingRight: '8px', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>@</span>
                  <input style={{ backgroundColor: 'transparent', textDecoration: 'none', outline: 'none', fontSize: '14px', flex: 1, width: '100%', border: 'none' }} className={styles.nameNegocio} placeholder='nombre de usuario' type='text' value={form.facebook} name='facebook' onChange={handleChange} />
                </div>
                :
                <p style={{ fontSize: '14px', flex: 1 }}><span style={{ fontWeight: '600' }}></span> {urlFacebook ? 'Ver Perfil' : 'Agregar Perfil'}</p>
              }
            </div>
          }

          {urlInstagram &&
            <div onClick={(e) => handleChangePage(e, { page: 'instagram' })} style={{ color: 'black', border: editMode ? '1px solid #c5c5c5' : 'none', borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: editMode ? '8px' : '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: !editMode ? '1px solid #c5c5c5' : '1px solid white', }}>
                <Icon size='lg' name={IconCatalog.logoInstagram} style={{ color: '#EB4264', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5', display: editMode ? 'flex' : 'none' }} />
              {editMode
                ? <div style={{ display: 'flex', flexDirection: 'row', flex: 1, paddingRight: '8px', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>@</span>
                  <input style={{ backgroundColor: 'transparent', textDecoration: 'none', outline: 'none', fontSize: '14px', flex: 1, width: '100%', border: 'none' }} className={styles.nameNegocio} placeholder='nombre de usuario' type='text' value={form.instagram} name='instagram' onChange={handleChange} />
                </div>
                : <p style={{ fontSize: '14px', flex: 1 }}><span style={{ fontWeight: '600' }}>@</span> {urlInstagram ? urlInstagram : 'Agregar Perfil'}</p>
              }

            </div>
          }

          {urlWeb &&
            <div onClick={(e) => handleChangePage(e, { page: 'web' })} style={{ color: 'black', border: editMode ? '1px solid #c5c5c5' : 'none', borderRadius: '8px', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: editMode ? '8px' : '16px', width: '100%', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: !editMode ? '1px solid #c5c5c5' : '1px solid white', }}>
                <Icon size='lg' name={IconCatalog.globeOutline} style={{ color: '#222222', }} />
              </div>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5', display: editMode ? 'flex' : 'none' }} />
              <div style={{ display: 'flex', flexDirection: 'row', flex: 1, paddingRight: '8px', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                {editMode
                  ? <div style={{ display: 'flex', flexDirection: 'row', flex: 1, paddingRight: '8px', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                    <input style={{ backgroundColor: 'transparent', textDecoration: 'none', outline: 'none', fontSize: '14px', flex: 1, width: '100%', border: 'none', color: '#373737' }} className={styles.nameNegocio} placeholder='Ej: https://www.tupagina.com' type='text' value={form.paginaweb ? form?.paginaweb : urlWeb} name='paginaweb' onChange={handleChange} />
                  </div>
                  : <p style={{ fontSize: '14px', flex: 1 }}>{data?.paginaweb ? data?.paginaweb : 'Agregar Pagina Web'}</p>
                }
              </div>

            </div>
          }
        </MagicMotion>



        {verification && editMode &&
          <>
            <button onClick={handleSubmit} className={styles.checkIcon}>
              <Icon name={IconCatalog.checkmarkOutline} size='md' style={{ color: 'white' }} />
            </button>
            <button onClick={handleClose} className={styles.cancelIcon}>
              <Icon name={IconCatalog.closeOutline} size='md' style={{ color: '#373737' }} />
            </button>
          </>
        }
        {editMode && !verification
          &&
          <button onClick={handleClick} className={styles.editIcon}>
            <Icon name={IconCatalog.pencilOutline} size='sm' style={{ color: 'white' }} />
          </button>
        }
        {!editMode && user?.userName === router?.query?.id &&
          <button onClick={handleClick} className={styles.editIconDisabled}>
            <Icon name={IconCatalog.pencilOutline} size='sm' style={{ color: '#373737' }} />
          </button>
        }

      </div>
    </>

  )
}