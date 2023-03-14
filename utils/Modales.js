import styles from '@/styles/Main.module.css'



export function ModalSuccessfull({ title, subtitle }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#55C200', padding: '16px 32px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title}</p>
        <p style={{ fontSize: '13px', color: 'white', margin: 0 }}>{subtitle} </p>
      </div>
    </div>
  )
}


export function ModalLoading({ title }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#FFBB56', padding: '16px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title}</p>
      </div>
    </div>
  )
}

export function ModalError({ title, subtitle }) {
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: '#f50057', padding: '16px 32px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>{title} </p>
        <p style={{ fontSize: '13px', color: 'white', margin: 0 }}>{subtitle ? subtitle : 'Verifica tu conexión, e intentalo de nuevo'} </p>
      </div>
    </div>
  )
}