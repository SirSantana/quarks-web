
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalEditServicios } from '@/utils/Modales';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddServicios from '../Register/AddServicios';
import Icon, { IconCatalog } from '../Icon/Icon';
import { EDIT_NEGOCIO_VDOS } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { MagicMotion } from 'react-magic-motion';
import EditCategories from './EditServicios';
import { client } from '@/client';
import { GET_SERVICIOS_NEGOCIO } from '@/graphql/queries';

const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos', db: "Servicio de Lujos" },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'Baterias', url: 'Baterias', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'Caja y Transmision', url: 'Cajas', db: 'Servicio de Caja' },
  { nombre: 'Cambio de aceite', img: 'Filtros', url: 'Cambio de aceite', db: 'Cambio de Aceite' },
  { nombre: 'Clutch', img: 'Clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Direccion y suspension', img: 'Direccion y suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'Electricos', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Frenos', img: 'Frenado', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'Carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: '' },
  { nombre: 'Motor', img: 'Motor', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: '' },
];
export const categorias2 = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', db: "Servicio de Lujos" },
  { nombre: 'Aire acondicionado', img: 'servicio-aire', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'bateria', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', db: 'Servicio de Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', db: 'Cambio de Aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Electronica', img: 'servicio-electronico', url: 'Electronica', db: 'Servicio de Electronica' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', db: 'Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor', },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: '' },
  { nombre: 'Taller Mecanico', img: 'taller-mecanico', url: '', db: 'Taller mecanico' },
  { nombre: 'Mecanica Basica', img: 'mecanica-basica', url: '', db: 'Mecanica Basica' },
  { nombre: 'Mecanica Avanzada', img: 'mecanica-avanzada', url: '', db: 'Mecanica Avanzada' },
];
export default function ServidosOfrecidos({ data, user, setEditModeHiddenButtons,  }) {
  const [editMode, setEditMode] = useState(false)
  const [visibleModalEditServicios, setVisibleModalEditServicios] = useState(false)
  const [categorias, setCategorias] = useState(data?.categorias)
  const [addCategory, setAddCategory] = useState('')
  const [otherCategorias, setOtherCategorias] = useState([])
  const [editNegocioVDos, result] = useMutation(EDIT_NEGOCIO_VDOS)
  const router = useRouter()


  const handleClick = (e) => {
    e.stopPropagation()
    if ((user?.userName === router?.query?.id) && !editMode) {
      setEditModeHiddenButtons(true)
      return setEditMode(!editMode)
    }
  }
  const handleChange = (category) => {
    setCategorias((prevCategorias) => {
      if (prevCategorias.includes(category)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== category);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, category];
      }
    });
  }
  const handleChange2 = (category) => {
    setAddCategory('')
    setOtherCategorias((prevCategorias) => {
      if (prevCategorias.includes(category)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== category);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, category];
      }
    });
  }

  const handleSubmitCategory = (e) => {
    e.preventDefault()
    setOtherCategorias((prevCategorias) => {
      if (prevCategorias.includes(addCategory)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== addCategory);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, addCategory];
      }
    });
    setAddCategory('')

  }
  const handleClose = () => {
    setCategorias(result?.data?.editNegocioVDos?.categorias ? result?.data.editNegocioVDos?.categorias : data?.categorias)
    setEditMode(false)
    setEditModeHiddenButtons(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setEditMode(false)
    let totalCategorias = categorias.concat(otherCategorias)
    editNegocioVDos({ variables: { categorias: totalCategorias } });
    setEditModeHiddenButtons(false)
  }
  useEffect(() => {
    if (result?.data) {
      setCategorias(result?.data?.editNegocioVDos?.categorias)
    }
  }, [result?.data])

  

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>{data?.tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
      <div onClick={handleClick} className={`${styles.containerHeaderCalendario} ${editMode ? styles.active : ''}`} style={{ flexDirection: 'column', alignItems: 'center', }}>
        {!editMode ? categorias.map(el => {
          const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
          return (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
              <div style={{ borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',border: '1px solid #c5c5c5', }}>
                {category?.img ? <img src={`./${category?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
              </div>
              <p style={{ fontSize: '14px', flex: 1 }}>{data?.tipo === 'Almacen' ? category.nombre : el}</p>

            </div>
          )
        })
          :
          <MagicMotion>
            {
              categorias2.map(el => {
                let categoryChecked = categorias.find(cat => cat?.toLocaleLowerCase() == el?.db.toLocaleLowerCase())

                return (
                  <div onClick={() => handleChange(el.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {el?.img ? <img src={`./${el?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
                    </div>
                    <p style={{ fontSize: '14px', flex: 1 }}>{el.nombre}</p>
                    {categoryChecked
                      ?
                      <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                      :
                      <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }} />
                    }
                  </div>
                )
              })
            }
            {
              categorias
                .filter(el => !categorias2.some(cat => cat?.db?.toLocaleLowerCase() === el?.toLocaleLowerCase()))
                .map(el => (
                  <div onClick={() => handleChange(el)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
                    </div>
                    <p style={{ fontSize: '14px', flex: 1 }}>{el}</p>
                    {categorias.includes(el)
                      ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                      : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
                      </div>
                    }
                  </div>
                ))
            }
            {/* {categorias.map(el => {
              const category = categorias2?.find(cat => cat?.db?.toLocaleLowerCase() == el.toLocaleLowerCase())
              return (
                category
                  ?
                  <div onClick={() => handleChange(category?.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {category?.img ? <img src={`./${category?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
                    </div>
                    <p style={{ fontSize: '14px', flex: 1 }}>{data?.tipo === 'Almacen' ? category.nombre : el}</p>
                    {el == category?.db
                      ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                      : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
                      </div>
                    }
                  </div>
                  :
                  <div onClick={() => handleChange(el)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
                    </div>
                    <p style={{ fontSize: '14px', flex: 1 }}>{data?.tipo === 'Almacen' ? category.nombre : el}</p>
                    <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                  </div>

              )
            })
            } */}
            {/* {
              categorias2
                .filter(el => !categorias.some(cat => cat.toLocaleLowerCase() === el.db.toLocaleLowerCase()))
                .map(el => (
                  <div onClick={() => handleChange(el.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {el.img ? <img src={`./${el?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
                    </div>
                    <p style={{ fontSize: '14px', flex: 1 }}>{el.nombre}</p>
                    {categorias.includes(el.db)
                      ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                      : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
                      </div>
                    }
                  </div>
                ))
            } */}
            {
              otherCategorias.map(el => (
                <div onClick={() => handleChange2(el)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                  <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
                  </div>
                  <p style={{ fontSize: '14px', flex: 1 }}>{el}</p>
                  {otherCategorias.includes(el)
                    ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                    : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
                    </div>
                  }
                </div>
              ))
            }
            < form onSubmit={handleSubmitCategory} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div onClick={() => handleChange2(addCategory)} style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ion-icon name="add-outline" style={{ fontSize: '20px' }}></ion-icon>
              </div>
              <input value={addCategory} onChange={(e) => setAddCategory(e.target.value)} className={styles.inputsAddInfo} type='text' name='categoria' style={{ textAlign: 'left', flex: 1, backgroundColor: 'transparent', paddingLeft: '0' }} placeholder='Agregar otro' />

              {otherCategorias.includes(addCategory)
                ? <button type='submit'>
                  <ion-icon style={{ fontSize: '24px', cursor: 'pointer' }} name="checkbox"></ion-icon>
                </button>
                : <div onClick={() => handleChange2(addCategory)} style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}>
                </div>
              }
            </form>
          </MagicMotion>
        }

        {editMode && (
          <>
            {(categorias !== data?.categorias || otherCategorias.length > 0) ?
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
      </div >
      {/* {visibleModalEditServicios &&
        <AddServicios setCategorias={setCategorias} addCategory={addCategory} setAddCategory={setAddCategory} categorias={categorias} otherCategorias={otherCategorias} setOtherCategorias={setOtherCategorias} />

        //  <ModalEditServicios setCategorias={setCategorias} addCategory={addCategory} setAddCategory={setAddCategory} categorias={categorias} otherCategorias={otherCategorias} setOtherCategorias={setOtherCategorias}/>
      } */}
    </>
  )
}


