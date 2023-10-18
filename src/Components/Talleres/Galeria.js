
import styles from '@/styles/ServiciosAutomotriz.module.css'

export default function Galeria({ data }) {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Galeria </h2>

      {/* <div style={{ width: '90%', height: '300px', overflow: 'hidden', borderRadius: '20px' }}>
        <iframe
          scrolling="no"
          src={'https://i.pinimg.com/originals/f1/60/e6/f160e6dd20b3a263a9d8bd3cee27a108.gif'}
          style={{
            width: '100%', // Establece el ancho al 100% para que se ajuste al contenedor
            height: '100%', // Establece la altura al 100% para que se ajuste al contenedor
            border: 'none',
            overflow: 'hidden' // Quita el borde si lo hay
          }}
        />
      </div> */}


      <div style={{ width: '90%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <img style={{ width: '46%', height: '150px', border: '1px solid #d6d6d6', borderRadius: '20px' }} src={data?.fotossecundarias[0]} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
        <img style={{ width: '47%', height: '150px', border: '1px solid #d6d6d6', borderRadius: '20px', objectFit:'contain' }} src={data?.fotossecundarias[1]} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />

      </div>
      <img style={{ width: '90%', height: '300px', border: '1px solid #d6d6d6', borderRadius: '20px' }} src={data?.fotossecundarias[2]} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
      <div style={{ width: '90%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <img style={{ width: '46%', height: '150px', border: '1px solid #d6d6d6', borderRadius: '20px', objectFit:'contain' }} src={data?.fotossecundarias[3]} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
        <img style={{ width: '47%', height: '150px', border: '1px solid #d6d6d6', borderRadius: '20px' }} src={data?.fotossecundarias[4]} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />

      </div>
    </>
  )
}