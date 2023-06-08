


export default function SelectGraph({setTipoGrafico, tipoGrafico}) {
  return (
    <>
      <div onClick={()=> setTipoGrafico(tipoGrafico > 0 ? tipoGrafico- 1:tipoGrafico )} style={{ display: 'flex', flexDirection: 'row',cursor:'pointer', alignItems: 'center', padding: '4px', backgroundColor: '#FBF6F6' }}>
        <img alt={'Cotiza tus repuestos logo'} src={'/arrowDown.svg'} style={{ width: '16px', transform: "rotate(90deg)", borderRadius: '8px' }} />
      </div>
      <div onClick={()=> setTipoGrafico(tipoGrafico <2 ? tipoGrafico + 1:tipoGrafico )} style={{ display: 'flex', flexDirection: 'row',cursor:'pointer', alignItems: 'center', padding: '4px', backgroundColor: '#FBF6F6' }}>
        <img alt={'Cotiza tus repuestos logo'} src={'/arrowDown.svg'} style={{ width: '16px', transform: "rotate(270deg)", borderRadius: '8px' }} />
      </div>
    </>
  )
}