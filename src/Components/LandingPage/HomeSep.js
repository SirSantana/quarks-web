import CardTallerV2 from "./CardTallerV2";
import SectionFixedServicios from "./SectionFixedServicios";
import styles2 from '@/styles/Landing.module.css'
import talleres from '@/src/data/talleres.json'
import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "../Loaders/CardLoader";
const MapTalleresHome = dynamic(() => import('@/src/Components/LandingPage/MapTalleresHome'),
  { ssr: false, loading: () => <Loader /> })

export default function HomeSep() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <SectionFixedServicios home={true} />
      <section style={{ paddingTop: '24px', backgroundColor: '#EDEDF2', maxWidth: '100%', width: '100vw', marginTop: '32px' }}  >
        {/* <MenuSelectsFilter setIsLoading={setIsLoading}/> */}
        <div className={styles2.containerListTalleres}>
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#6C788E' }}>Se encontraron +100 talleres mecanicos cerca a mi en Bogota</p>
          </div>

          {isLoading ?
            <div style={{
              width: '90%',
              maxWidth: '1200px',
              border: '1px solid #CFD5E1',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              backgroundColor: "#f3f3f3",
              margin: '32px auto',
              position: 'relative',
              height: '70vh'
            }} />
            :
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
                gap: '24px',
                alignItems: 'flex-start',
              }}
            >
              {talleres.talleres.slice(28, 40).reverse().map((taller, index) => (
                <CardTallerV2 key={taller.nombre} taller={taller} />
              ))}
            </div>
           
            //  <div style={{display:'flex', flexDirection:'row', width:'100%', gap:'32px', position:'relative', alignItems:'flex-start'}}>
            //  <div
            //    style={{
            //      display: 'grid',
            //      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
            //      gap: '24px',
            //      alignItems: 'flex-start',
            //    }}
            //  >
            //    {talleres.talleres.slice(28, 40).reverse().map((taller, index) => (
            //      <CardTallerV2 key={taller.nombre} taller={taller} />
            //    ))}
            //  </div>
            //  <div style={{ position:'sticky', top:'48px', width:'50%', height:'100%', border:'1px solid #CFD5E1', boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.1)'}}>
            //  <MapTalleresHome data={talleres.talleres.slice(20, 70).reverse()} />
            //  </div>
            //  </div>
          }
        </div>
      </section>
    </>
  )
}