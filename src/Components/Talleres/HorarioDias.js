
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'


export default function HorarioDias({horariosSeparados}) {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600',display:'flex', gap:'16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.calendarNumberOutline} size='lg' /> Horario</h2>
      <div className={styles.containerHeaderCalendario} style={{ flexDirection: 'column', alignItems: 'center', }}>
        {horariosSeparados?.map(horario => {
          const primeraTresLetras = horario.substring(0, 3);
          const restoHorario = horario.substring(3);
          return (
            <div className={styles.containerHorarios} style={{ display: 'flex', flexDirection: 'row', gap: '16px',alignItems:'center', width: '100%' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', width: '40px' }}>{primeraTresLetras}</p>
              <div style={{ height: '32px', width: '1px', marginRight: '4px', backgroundColor: '#c5c5c5' }} />
              <p style={{ fontSize: '14px', fontWeight: '400', }}>{restoHorario}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}