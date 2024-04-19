
import styles from '@/styles/Faq.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'

export default function TipoNegocio({ setDataImportante, dataImportante, setPage, router }) {
  return (
    <div style={{ marginTop: '32px', }}>
      <h1 style={{textAlign:'center'}} className={styles.titleAccess}>Elige tu opción</h1>
      <div style={{ display: 'flex', justifyContent:'center', flexWrap:'wrap', flexDirection: 'row', margin: '32px 0 64px 0', maxWidth:'1200px', width: '100%',  alignItems: 'center', gap: '32px' }}>
        <div style={{ borderColor: dataImportante?.tipo === 'Mecanico'&& dataImportante.vehiculo === 'Autos' ? '#373737' : '#d9d9d9' }} onClick={() => setDataImportante({ ...dataImportante, tipo: 'Mecanico', vehiculo:'Autos'})} className={styles.cardChooseTipoNegocio} >
          <Icon name={dataImportante.tipo === 'Mecanico'&& dataImportante.vehiculo === 'Autos' ? IconCatalog.checkmarkCircle : IconCatalog.ellipseOultine} style={{ top: '8px', right: '8px', position: 'absolute', color: dataImportante.tipo === 'Mecanico'&& dataImportante.vehiculo === 'Autos' ? '#373737' : '#d9d9d9' }} />
          <img src={'/mecanico.png'} className={styles.imgCardChoose}/>
          <p className={styles.textCardChoose}>Soy Mecanico de Autos</p>
        </div>
        <div style={{ borderColor: dataImportante?.tipo === 'Mecanico' && dataImportante.vehiculo === 'Motos' ? '#373737' : '#d9d9d9' }} onClick={() => setDataImportante({ ...dataImportante, tipo: 'Mecanico', vehiculo:'Motos' })} className={styles.cardChooseTipoNegocio} >
          <Icon name={dataImportante.tipo === 'Mecanico' && dataImportante.vehiculo === 'Motos' ? IconCatalog.checkmarkCircle : IconCatalog.ellipseOultine} style={{ top: '8px', right: '8px', position: 'absolute', color: dataImportante.tipo === 'Mecanico' && dataImportante.vehiculo === 'Motos' ? '#373737' : '#d9d9d9' }} />
          <img src={'/mecanico.png'}className={styles.imgCardChoose} />
          <p className={styles.textCardChoose}>Soy Mecanico de Motos</p>
        </div>
        <div style={{ borderColor: dataImportante?.tipo === 'Taller'&& dataImportante.vehiculo === 'Autos' ? '#373737' : '#d9d9d9' }} onClick={() => setDataImportante({ ...dataImportante, tipo: 'Taller', vehiculo:'Autos' })} className={styles.cardChooseTipoNegocio} >
          <Icon name={dataImportante.tipo === 'Taller'&& dataImportante.vehiculo === 'Autos' ? IconCatalog.checkmarkCircle : IconCatalog.ellipseOultine} style={{ top: '8px', right: '8px', position: 'absolute', color: dataImportante.tipo === 'Taller' && dataImportante.vehiculo === 'Autos'? '#373737' : '#d9d9d9' }} />
          <img src={'/taller-ilustration.png'} className={styles.imgCardChoose} />
          <p className={styles.textCardChoose}>Tengo un Taller de Autos</p>
        </div>
        <div style={{ borderColor: dataImportante?.tipo === 'Taller'&& dataImportante.vehiculo === 'Motos' ? '#373737' : '#d9d9d9' }} onClick={() => setDataImportante({ ...dataImportante, tipo: 'Taller', vehiculo:'Motos' })} className={styles.cardChooseTipoNegocio} >
          <Icon name={dataImportante.tipo === 'Taller' && dataImportante.vehiculo === 'Motos' ? IconCatalog.checkmarkCircle : IconCatalog.ellipseOultine} style={{ top: '8px', right: '8px', position: 'absolute', color: dataImportante.tipo === 'Taller'&& dataImportante.vehiculo === 'Motos' ? '#373737' : '#d9d9d9' }} />
          <img src={'/taller-ilustration.png'}className={styles.imgCardChoose} />
          <p className={styles.textCardChoose}>Tengo un Taller de Motos</p>
        </div>
      </div>
      {dataImportante.tipo?.length>0 &&
        <Button onClick={()=> {setPage(1), setDataImportante({...dataImportante, pageCheck:1}), router.push('/signup?page=1')}} size='lg' variant={ButtonVariant.secondary}>
          Siguiente
        </Button>
      }
    </div>
  )
}