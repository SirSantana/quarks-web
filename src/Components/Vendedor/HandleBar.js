import personSharp from '@/public/person-sharp.svg'
import newsPaper from '@/public/newspaper-sharp.svg'
import styles from '@/styles/Vendedor.module.css'


export default function HandleBar({ setSection, section, data }) {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <div onClick={() => setSection(true)} style={{ backgroundColor: section && '#f50057', }} className={styles.containerIcons} >
          <img alt={data?.getOneUser?.name} src={personSharp.src} style={{ width: '22px', height: '22px', }} />
        </div>
        <div onClick={() => setSection(false)} style={{ backgroundColor: !section && '#f50057', }} className={styles.containerIcons} >
          <img alt={data?.getOneUser?.name} src={newsPaper.src} style={{ width: '22px', height: '22px', }} />
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {data?.getOneUser?.avatar
          ? <img alt={data?.getOneUser?.name} src={data?.getOneUser?.avatar} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50%' }} />
          : <h3 className={styles.avatar}>{data?.getOneUser?.name[0]}</h3>
        }
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }} className={styles.subtitle}>{data?.getOneUser?.name}</h3>
          <h3 style={{ margin: 0, width: '100%' }} className={styles.subtitle}>{data?.getOneUser?.ciudad}, {data?.getOneUser?.pais}</h3>
        </div>
      </div>
    </div>
  )
}