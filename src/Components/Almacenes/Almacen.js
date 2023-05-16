import styles from '@/styles/Almacenes.module.css'


export default function Almacen({ almacen }) {
  const categoriasTrim = almacen?.categorias.slice(0,3)
  return (
    <div className={styles.cardAlmacen}>
      <img src={`${almacen?.fotoperfil}`} style={{ height: '150px',objectFit:'contain', width: '100%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
      <div className={styles.dataAlmacen}>
        <h3 className={styles.title2}>{almacen?.nombre}</h3>

        {/* <h3 className={styles.subtitle2}>Carroceria · Latas · Lujos · Espejos</h3> */}
        {almacen?.categorias.length > 3 ?
          <h6 className={styles.subtitle2}>{categoriasTrim?.map(categoria => categoria + " · ")} +{almacen?.categorias.length - 3}</h6>
          :
          <h6 className={styles.subtitle2}>{almacen?.categorias?.map(categoria => categoria + " · ")}</h6>
        }

        <div style={{ height: '2px', backgroundColor: '#d9d9d9', width: '100%', margin: '8px 0' }} />
        <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <section style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          {almacen?.marcas.map(el => (
          <img src={`./${el}.png`} style={{ height: '24px', width: '24px', marginRight: '8px' }} />
        ))}
          </section>
          <section style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <h6 className={styles.subtitle2} style={{margin:0, color:'#6D6D6D', fontWeight:'600'}}> {almacen?.barrio} · {almacen?.ciudad}</h6>
          </section>
        </div>
        

      </div>
    </div>
  )
}