// EditCategories.js
import React, { useState } from 'react';
import Icon, { IconCatalog } from '../Icon/Icon';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { categorias2 } from './ServiciosOfrecidos';
import { MagicMotion } from 'react-magic-motion';

export default function EditCategories({ setCategories, categories, onSave, onCancel }) {
  const [addCategory, setAddCategory] = useState('');
  const [otherCategorias, setOtherCategorias] =useState([])
  const handleChange = (category) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Si existe, elimínalo del array
        return prevCategories.filter((item) => item !== category);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategories, category];
      }
    });
    setAddCategory('')
  };
  console.log(categories);
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    setCategories((prevCategories) => {
      if (prevCategories.includes(addCategory)) {
        // Si existe, elimínalo del array
        return prevCategories.filter((item) => item !== addCategory);
      } else {
        // Si no existe, agrégalo al array
        setOtherCategorias([...otherCategorias, category])
        return [...prevCategories, addCategory];
      }
    });
    setAddCategory('');
  };

  return (
    <MagicMotion>
      {categorias2.map(el => {
        // const category = data?.categorias?.find(cat =>  cat.toLocaleLowerCase() === el.db.toLocaleLowerCase())
        // const categorySelect = el.db.toLocaleLowerCase() === data
        return (
          <div onClick={() => handleChange(el.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
            <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {el.img ? <img src={`./${el?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
            </div>
            <p style={{ fontSize: '14px', flex: 1 }}>{el.nombre}</p>
            {categories.includes(el.db)
              ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
              : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
              </div>
            }
          </div>

        )
      })}
      {
       otherCategorias.map(el => {
        // const category = data?.categorias?.find(cat =>  cat.toLocaleLowerCase() === el.db.toLocaleLowerCase())
        // const categorySelect = el.db.toLocaleLowerCase() === data
        return (
          <div onClick={() => handleChange(el)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
            <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
            </div>
            <p style={{ fontSize: '14px', flex: 1 }}>{el.nombre}</p>
            {categories.includes(el)
              ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#4EDD76' }} name="checkbox"></ion-icon>
              : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black' }}>
              </div>
            }
          </div>

        )
      }) 
      }
      <form onSubmit={handleSubmitCategory} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ion-icon name="add-outline" style={{ fontSize: '20px' }}></ion-icon>
        </div>
        <input
          value={addCategory}
          onChange={(e) => setAddCategory(e.target.value)}
          className={styles.inputsAddInfo}
          type="text"
          name="categoria"
          style={{ textAlign: 'left', flex: 1, backgroundColor: 'transparent', paddingLeft: '0' }}
          placeholder="Agregar otro"
        />

        {categories.includes(addCategory) ? (
          <button type="submit">
            <ion-icon style={{ fontSize: '24px', cursor: 'pointer' }} name="checkbox"></ion-icon>
          </button>
        ) : (
          <div onClick={() => handleChange(addCategory)} style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}></div>
        )}
      </form>

    </MagicMotion>
  );
}
