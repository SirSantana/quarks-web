
import styles from '@/styles/Almacenes.module.css'

export default function HeaderAlmacen({ almacen,  }) {
  
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
        <h3 className={styles.title3}>{almacen?.direccion} · {almacen?.barrio} - {almacen?.ciudad}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
        <img src={'../storefront-outline.svg'} style={{ height: '32px', width: '32px', marginRight: '16px' }} />
        <h1 style={{ marginBottom: 0 }} className={styles.title}>{almacen?.nombre}</h1>
      </div>
    </>
  )
}