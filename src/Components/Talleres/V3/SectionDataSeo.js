import Image from "next/image";
import CalificacionWidget from "../CalificacionWidget";
import Horario from "../Horario";



export default function SectionDataSeo({ data }) {
  const horariosSeparados = data?.horario?.split(',');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px',  margin: '32px 0 16px 0', }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '16px', justifyContent: 'flex-start', alignItems: 'center',}}>
        <Image
          width={32}
          height={32}
          src={data?.fotoperfil}
          priority={false}
          loading="lazy"
          alt={`Taller mecanico ${data?.nombre} Bogota`}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <h2 style={{ fontSize: '18px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px' }} >{data?.nombre} - {data?.localidad}</h2>
      </div>
      <div>
        <CalificacionWidget id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />
        <Horario horariosSeparados={horariosSeparados}/>
      </div>
    </div>
  )
}