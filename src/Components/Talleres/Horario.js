import styles from '@/styles/ServiciosAutomotriz.module.css'


export default function Horario({horariosSeparados, handleVisibleHorario, visibleFullHorario, handleScroll}) {
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;

  const handleClick = () => {
    handleVisibleHorario();
    handleScroll();
  };
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: visibleFullHorario ? "column" : "row", alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px', transition: "height 0.5s ease" }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', marginBottom: visibleFullHorario ? '8px' : '0px' }}>
        <ion-icon style={{ fontSize: '20px' }} name="calendar-number-outline"></ion-icon>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
            {!visibleFullHorario && <h4 style={{ fontSize: '14px', fontWeight: '400' }}>{horariosSeparados[indiceDia].substring(0, 3)}</h4>}
            <p style={{ fontSize: '14px', fontWeight: '600', }}>{visibleFullHorario ? 'Horario' : horariosSeparados[indiceDia].substring(3)}</p>
          </div>
          <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name={visibleFullHorario ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
        </div>
      </div>
      {visibleFullHorario &&
        horariosSeparados?.map(horario => {
          const primeraTresLetras = horario.substring(0, 3);
          const restoHorario = horario.substring(3);
          return (
            <div className={styles.containerHorarios} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
              <h5 style={{ fontSize: '14px', fontWeight: '400', width: '40px' }}>{primeraTresLetras}</h5>
              <p style={{ fontSize: '14px', fontWeight: '600', }}>{restoHorario}</p>
            </div>
          )
        }
        )
      }
    </div>
  )
}