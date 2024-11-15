
import styles from '@/styles/Negocio.module.css'
import { categorias } from '@/src/data/Categorias';

export default function SectionCategorias({ data, }) {
  let { conImagen, sinImagen } = data?.categorias?.reduce((result, el) => {
    const categoriaActual = categorias.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })
  return (
    <>
      <section style={{
        paddingTop: '',
      }}>
        <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px' }}>{data?.tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
        <div
          className={styles.gridCategorias}
        >
          {conImagen.map((el, index) => (
            <div key={index} style={{ borderRadius: '8px', width: 'fit-content', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
              <img
                src={`/${el.img}`}
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}

                alt={`Talleres de ${el.nombre} cerca a mi en Bogotá`}
              />
              <p style={{ color: '#182537', fontWeight: '400', fontSize: '16px', lineHeight: '1.1' }}>{el.nombre.replace('Servicio de ', '')}</p>
            </div>
          ))}
          {sinImagen?.map(category => (
            <div key={category} style={{paddingLeft:'48px', borderRadius: '8px', width: 'fit-content', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
              <p style={{ color: '#182537', fontWeight: '400', fontSize: '16px', lineHeight: '1.1' }}>{category.replace('Servicio de ', '')}</p>
            </div>
          )
          )}
        </div>
      </section>
      
    </>
  )
}


