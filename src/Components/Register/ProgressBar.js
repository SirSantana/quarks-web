import Icon, { IconCatalog } from "../Icon/Icon";

import styles from '@/styles/Faq.module.css'


export default function ProgressBar({ page = 0, setPage, form, router }) {
  const changeSection = ({ pagee }) => {
    if (form.pageCheck >= pagee) {
      router.push(`/signup?page=${pagee}`)
      return setPage(pagee)
    }
  }
  let pageUrl = router?.query?.page
  return (
    <div className={styles.containerProgressBar}>
      <div className={styles.containerItemProgress}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div onClick={() => changeSection({ pagee: 0 })} className={styles.circleProgress} style={{ backgroundColor: pageUrl >= 0 ? '#E50051' : '#d9d9d9' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{form?.pageCheck >= 1 ? <Icon name={IconCatalog.checkmarkOutline} /> : '1'}</span>
          </div>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 1 ? '#E50051' : '#d9d9d9'}} />
        </div>
        <p className={styles.textProgress} style={{  color: pageUrl >= 0 ? '#E50051' : '#d9d9d9' }}>Tipo</p>
      </div>

      <div className={styles.containerItemProgress} style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 1 ? '#E50051' : '#d9d9d9'}}  />
          <div onClick={() => changeSection({ pagee: 1 })} className={styles.circleProgress} style={{ backgroundColor: pageUrl >= 1 ? '#E50051' : '#d9d9d9' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{form?.pageCheck >= 2 ? <Icon name={IconCatalog.checkmarkOutline} /> : '2'}</span>
          </div>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 2 ? '#E50051' : '#d9d9d9'}} />
        </div>
        <p className={styles.textProgress} style={{  color: pageUrl >= 1 ? '#E50051' : '#d9d9d9' }}>Nombre</p>
      </div>



      <div className={styles.containerItemProgress} style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 2 ? '#E50051' : '#d9d9d9'}}  />
          <div onClick={() => changeSection({ pagee: 2 })} className={styles.circleProgress} style={{ backgroundColor: pageUrl >= 2 ? '#E50051' : '#d9d9d9' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{form?.pageCheck >= 3 ? <Icon name={IconCatalog.checkmarkOutline} /> : '3'}</span>
          </div>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 3 ? '#E50051' : '#d9d9d9'}} />
        </div>
        <p className={styles.textProgress} style={{  color: pageUrl >= 2 ? '#E50051' : '#d9d9d9' }}>Servicios</p>
      </div>

      <div className={styles.containerItemProgress} style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 3 ? '#E50051' : '#d9d9d9'}}  />
          <div onClick={() => changeSection({ pagee: 3 })} className={styles.circleProgress} style={{ backgroundColor: pageUrl >= 3 ? '#E50051' : '#d9d9d9' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{form?.pageCheck >= 4 ? <Icon name={IconCatalog.checkmarkOutline} /> : '4'}</span>
          </div>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 4 ? '#E50051' : '#d9d9d9'}} />

        </div>
        <p className={styles.textProgress} style={{  color: pageUrl >= 3 ? '#E50051' : '#d9d9d9' }}>Datos</p>
      </div>

      <div className={styles.containerItemProgress} style={{ alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.lineProgress} style={{backgroundColor: pageUrl >= 4 ? '#E50051' : '#d9d9d9'}} />
          <div onClick={() => changeSection({ pagee: 4 })} className={styles.circleProgress} style={{ backgroundColor: pageUrl >= 4 ? '#E50051' : '#d9d9d9' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center' }}>{form?.pageCheck >= 5 ? <Icon name={IconCatalog.checkmarkOutline} /> : '5'}</span>
          </div>
        </div>
        <p className={styles.textProgress} style={{  color: pageUrl >= 4 ? '#E50051' : '#d9d9d9' }}>Email</p>
      </div>
    </div>
  )
}