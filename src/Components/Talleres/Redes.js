
import styles from '@/styles/ServiciosAutomotriz.module.css'
import WidgetIcon from '../Icon/WidgetIcon'
import { IconCatalog } from '../Icon/Icon'
import { useState } from 'react'


export default function Redes() {
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Social </h2>
      <div className={`${styles.containerHeaderCalendario} ${editMode ? styles.active : ''}`} style={{ flexDirection: 'row', alignItems: 'center',}}>
        <WidgetIcon name={IconCatalog.logoFacebook} styles={{ color: '#0080FF', }} stylesContainer={{backgroundColor:'#E8F4FF'}} size={'lg'} />
        <WidgetIcon name={IconCatalog.logoInstagram} styles={{ color: '#ED475B'  }} stylesContainer={{backgroundColor:'#FFF0F9'}}size={'lg'} />
      </div>
    </>
  )
}