import styles from '@/styles/Diccionario.module.css'
import { useState } from 'react';
import data from '@/utils/repuestos.json'
import Link from 'next/link';
import { useRouter } from 'next/router';


const categorias = [
  'Clutch',
  'Caja y Transmision',
  'Correas',
  'Direccion y suspension',
  'Filtros',
  'Electricos',
  'Frenos',
  'Motor',
  'Accesorios',
  'Refrigeracion'

];


export default function AsideGlosario() {
  const router = useRouter()
  const [subcategoriasVisibles, setSubcategoriasVisibles] = useState(categorias.reduce((acc, categoria) => {
    acc[categoria] = true;
    return acc;
  }, {}));


  const subcategoriasPorDescripcion = {};
  Object.keys(data).forEach(letra => {
    data[letra].forEach(subcategoria => {
      const { description, ...rest } = subcategoria;
      if (!subcategoriasPorDescripcion[description]) {
        subcategoriasPorDescripcion[description] = [rest];
      } else {
        subcategoriasPorDescripcion[description].push(rest);
      }
    });
  });
  const toggleSubcategorias = (categoria) => {
    setSubcategoriasVisibles(prevState => ({
      ...prevState,
      [categoria]: !prevState[categoria]
    }));
  };

  return (
    <aside className={styles.asideBar}>
      
      <ul className={styles.asideUl}>
        {Object.entries(subcategoriasPorDescripcion).map(([categoria, subcategorias]) => (
          <li className={styles.asideLi} key={categoria}>
            <div onClick={() => toggleSubcategorias(categoria)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '16px', fontWeight: '600', marginTop: '8px' }}>
              <ion-icon name={subcategoriasVisibles[categoria] ? "chevron-down-outline" : "chevron-forward-outline"}></ion-icon>
              {categoria}
            </div>
            {subcategoriasVisibles[categoria] && (

              <ul className={styles.asideUlPadding}>
                {subcategorias.map(subcategoria => (
                  <Link target='_blank' key={subcategoria} href={`/glosario-de-autopartes/${subcategoria.name}-${subcategoria.id}`} style={{ textDecoration: 'none' }}>
                    <li 
                     className={styles.asideLi} key={subcategoria.id}>{subcategoria.name}</li>

                  </Link>
                ))}
              </ul>
            )}

          </li>
        ))}
      </ul>

    </aside>
  )
}