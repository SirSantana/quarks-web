import ItemBox from "../../Box/ItemBox";



export default function Horario({horariosSeparados}) {
  return (
    <>
      <h2  style={{ fontSize: '18px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom:'16px'}}> Horario</h2>
      <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'8px'}}>
        {horariosSeparados?.map(horario => {
          const primeraTresLetras = horario.substring(0, 3);
          const restoHorario = horario.substring(3);
          return (
            <ItemBox textItem={restoHorario} textIcon={primeraTresLetras} />
          )
        })}
      </div>
    </>
  )
}