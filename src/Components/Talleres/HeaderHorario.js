


export default function HeaderHorario({handleScroll, setVisibleFullHorario, visibleFullHorario}) {
  
  return (
    <div onClick={() => { handleScroll(), setVisibleFullHorario(visibleFullHorario ? false : true) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px', gap: '16px', boxSizing: 'border-box', border: '1px solid #d6d6d6', margin: '0 auto', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
      <ion-icon style={{ fontSize: '20px' }} name="calendar-number-outline"></ion-icon>
      <p style={{ color: '#373737', fontSize: '14px' }}>Hoy <span style={{ fontWeight: '600' }}> Lunes 6:00 AM - 8:00 PM</span></p>
    </div>
  )
}