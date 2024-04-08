import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { categorias2 } from "../ServiciosOfrecidos";
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Divider from "../../Box/Divider";



export default function SectionPreguntasFrecuentes({ data }) {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: data?.id } })

  const [visibleResponse, setVisibleResponse] = useState([0, 0, 0])
  const handleClick = (index) => {
    const updatedResponse = [...visibleResponse];
    updatedResponse[index] = visibleResponse[index] === 0 ? 1 : 0;
    setVisibleResponse(updatedResponse);
  }

  let { conImagen, sinImagen } = data?.categorias?.reduce((result, el) => {
    const categoriaActual = categorias2.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })

  return (
    <MagicMotion>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', justifyContent: 'space-between', margin: '32px 0 16px 0', }}>
        <h2 style={{ fontSize: '18px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }} >Preguntas Frecuentes</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
          <li style={{ cursor: 'pointer' }} key={0} onClick={() => handleClick(0)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontWeight: '500', color: '#373737' }}>¿Cual es la direccion de {data?.nombre}?</span>
              <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[0] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
            </div>
            <p style={{ color: '#5c5c5c', fontSize: '14px', display: visibleResponse[0] === 1 ? 'flex' : 'none' }}>La direccion de {data?.nombre} es {data?.direccion}</p>
          </li>
          <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />

          <li style={{ cursor: 'pointer' }} key={1} onClick={() => handleClick(1)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontWeight: '500', color: '#373737' }}>¿Que servicios ofrece {data?.nombre}?</span>
              <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[1] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
            </div>
            <p style={{ color: '#5c5c5c', fontSize: '14px', display: visibleResponse[1] === 1 ? 'flex' : 'none' }}>{data?.nombre} ofrece los siguientes servicios: {conImagen?.map(el => el?.nombre + " - ")} {sinImagen.map(el => el + " - ")}</p>
          </li>
          <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />

          <li style={{ cursor: 'pointer' }} key={2} onClick={() => handleClick(2)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500', color: '#373737' }}>¿Cual es la Calificacion de {data.nombre}?</span>
              <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[2] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
            </div>
            <p style={{ color: '#5c5c5c', fontSize: '14px', display: visibleResponse[2] === 1 ? 'flex' : 'none' }}>La calificacion de {data?.nombre} es de {result?.data?.getCalificacionOpiniones}</p>
          </li>
        </ul>
      </div>
    </MagicMotion>

  )
}