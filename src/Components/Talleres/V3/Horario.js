import ItemBox from "../../Box/ItemBox";

const diasCompletos = {
  "Lun": "Lunes",
  "Mar": "Martes",
  "Mié": "Miércoles",
  "Jue": "Jueves",
  "Vie": "Viernes",
  "Sáb": "Sábado",
  "Dom": "Domingo"
};

export default function Horario({ horariosSeparados }) {
  return (
    <>
      <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom:'24px' }}>Horarios de Apertura y Cierre</h2>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px', }}>
        <span style={{ fontSize: '24px', }}>🗓️</span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {horariosSeparados?.map(horario => {
            const primeraTresLetras = horario.substring(0, 3);
            const restoHorario = horario.substring(3);
            return (
              <div key={diasCompletos[primeraTresLetras]}>
                <p style={{ fontWeight: '400', color: '#182537', fontSize: '16px', lineHeight: '1.05' }}>{restoHorario}</p>
                <p style={{ color: '#6C788E', fontSize: '14px' }}>{diasCompletos[primeraTresLetras]}</p>
              </div>
            )
          })}
        </div>
        
      </div>
    </>
  )
}