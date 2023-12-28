
import styles from '@/styles/Faq.module.css'
import { categorias2 } from '../Talleres/ServiciosOfrecidos'
import { useState } from 'react'
import { MagicMotion } from "react-magic-motion";
import useAuth from '@/hooks/useAuth';


export default function AddServicios({ setPage, setCategorias, addCategory, setAddCategory, categorias, otherCategorias, setOtherCategorias }) {

const {user} = useAuth()

console.log(user);
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
  return (
    <MagicMotion>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
        <h1 className={styles.titleAccess}>Agreguemos los servicios que manejas para que tus usuarios lo sepan!</h1>

        <ul
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', gap: '20px', marginTop: '32px', width: '100%', justifyContent: 'space-between' }}
        >
          {categorias2.map(category => (
            <div onClick={() => handleChange(category.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
              <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {category?.img ? <img src={`./${category?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
              </div>
              <p style={{ fontSize: '14px', flex: 1 }}>{category.nombre}</p>
              {categorias.includes(category.db)
                ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
                : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black', margin:'2px' }}>
                </div>
              }

            </div>
          ))}
        </ul>
        {otherCategorias.length > 0 &&
          <ul
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', gap: '20px', marginTop: '12px', width: '100%', justifyContent: 'space-between' }}
          >
            {otherCategorias.map(category => (
              <div onClick={() => handleChange2(category)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
                </div>
                <p style={{ fontSize: '14px', flex: 1 }}>{category}</p>
                {otherCategorias.includes(category)
                  ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76'}} name="checkbox"></ion-icon>
                  : <div style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}>
                  </div>
                }

              </div>
            ))}
          </ul>

        }
        <form onSubmit={handleSubmitCategory} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px' }}>
          <div onClick={() => handleChange2(addCategory)} style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ion-icon name="add-outline" style={{ fontSize: '20px' }}></ion-icon>
          </div>
          <input value={addCategory} onChange={(e) => setAddCategory(e.target.value)} className={styles.inputsAddInfo} type='text' name='categoria' placeholder='Agregar otro' />

          {otherCategorias.includes(addCategory)
            ? <button type='submit'>
              <ion-icon  style={{ fontSize: '24px', cursor: 'pointer' }} name="checkbox"></ion-icon>
            </button>
            : <div onClick={() => handleChange2(addCategory)} style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}>
            </div>
          }
        </form>

        <button onClick={() => { setPage(3), window.scrollTo({ top: 0, behavior: 'smooth' }) }} type="submit" className={styles.button2}>
          Siguiente
        </button>
      </div>
    </MagicMotion>
  )
}