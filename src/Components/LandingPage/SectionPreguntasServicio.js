


import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";


export default function SectionPreguntasServicio({ data }) {
  const router = useRouter()
  const [visibleResponse, setVisibleResponse] = useState([0, 0, 0])
  const handleClick = (index) => {
    const updatedResponse = [...visibleResponse];
    updatedResponse[index] = visibleResponse[index] === 0 ? 1 : 0;
    setVisibleResponse(updatedResponse);
  }


  return (
    <MagicMotion>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '1100px', justifyContent: 'space-between', margin: '0 auto', marginTop: '32px', }}>
        <p style={{ fontSize: '18px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '8px' }}>Preguntas Frecuentes</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
          <li style={{ cursor: 'pointer' }} key={0} onClick={() => handleClick(0)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
              <p style={{ fontWeight: '500', color: '#373737' }}>¿Cuáles son los mejores {router.query.id === 'cda' ? 'talleres de tecnicomecanica' : `talleres de ${router.query.id?.replace(/-/g, ' ')}`} en Bogotá?</p>
              <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[0] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
            </div>
            <p
              style={{
                color: '#5c5c5c',
                fontSize: '14px',
                display: visibleResponse[0] === 1 ? 'inline-block' : 'none',
              }}
            >
              Los mejores talleres de {router.query.id?.replace(/-/g, ' ')} en Bogotá son:&nbsp;
              {data?.map((el, index) => (
                <span style={{ fontWeight: '600',  }} key={el?.userName}>
                  <Link style={{ color: '#f50057' }} href={`/${el?.userName}`}> {el?.nombre} </Link>
                  {index < data.length - 1 && ', '}
                </span>
              ))}
            </p>
          </li>
          <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />
          <li style={{ cursor: 'pointer' }} key={0} onClick={() => handleClick(1)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
              <p style={{ fontWeight: '500', color: '#373737' }}>{router.query.id === 'cda' ? 'Revision tecnomecanica' : `talleres de ${router.query.id?.replace(/-/g, ' ')}`} en Bogotá</p>
              <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[0] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
            </div>
            <p
              style={{
                color: '#5c5c5c',
                fontSize: '14px',
                display: visibleResponse[1] === 1 ? 'inline-block' : 'none',
              }}
            >
              Algunos {router.query.id === 'cda' ? 'cda' : `talleres de ${router.query.id?.replace(/-/g, ' ')}`} en Bogotá son:&nbsp;
              {data?.map((el, index) => (
                <span style={{ fontWeight: '500' }} key={el?.userName}>
                  <Link href={`/${el?.userName}`}> {el?.nombre} </Link>
                  {index < data.length - 1 && ', '}
                </span>
              ))}
            </p>
          </li>
          <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />

          {router.query.id === 'cda' &&
            <>
              <li style={{ cursor: 'pointer' }} key={0} onClick={() => handleClick(2)}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                  <p style={{ fontWeight: '500', color: '#373737' }}>Tecnicomecanica en Bogotá</p>
                  <ion-icon style={{ fontSize: '20px', color: '#757A7E' }} name={visibleResponse[0] ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
                </div>
                <p
                  style={{
                    color: '#5c5c5c',
                    fontSize: '14px',
                    display: visibleResponse[2] === 1 ? 'inline-block' : 'none',
                  }}
                >
                  Haz tu revision tecnicomecanica en Bogotá en los mejores talleres de tecnicomecanica en Bogotá.
                </p>
              </li>
              <div style={{ width: '100%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />
            </>
          }
        </ul>
      </div>
    </MagicMotion>

  )
}