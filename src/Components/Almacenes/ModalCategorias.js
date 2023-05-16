import styles from '@/styles/Almacenes.module.css'

const categorias = ['Accesorios', 'Baterias', 'Clutch','Caja y Transmision', 'Carroceria',  'Correas', 'Direccion y suspension', 'Electricos', 'Filtros','Lubricantes', 'Frenado', 'Iluminacion',  'Motor', 'Refrigeracion', ]

export default function ModalCategorias({ categoria, setCategoria, form, setForm}) {
  const handlePress =(el)=>{
    setCategoria(categoria === el?'Todos' : el)
    setForm({...form, categoria: el})
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '16px' }}>
      {categorias.map(el=>(
        <div onClick={() => handlePress(el)} className={categoria === el ? styles.categoriaCheck : styles.categoria}>
        <img src={`./${el}.png`} style={{ height: '24px', width: '24px' }} />
        <h4 className={styles.labelCategoria}>{el}</h4>
      </div>
      ))}
      
    

    </div>
  )
}