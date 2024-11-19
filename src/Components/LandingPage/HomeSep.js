import CardTallerV2 from "./CardTallerV2";
import SectionFixedServicios from "./SectionFixedServicios";
import styles2 from '@/styles/Landing.module.css'
import talleres from '@/src/data/talleres.json'
import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "../Loaders/CardLoader";
import Button, { ButtonVariant } from "../Button/Button";
const MapTalleresHome = dynamic(() => import('@/src/Components/LandingPage/MapTalleresHome'),
  { ssr: false, loading: () => <Loader /> })

export default function HomeSep() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapa, setMapa] = useState(false)

  return (
    <>
      <SectionFixedServicios home={true} />
      <section style={{ paddingTop: '24px', backgroundColor: '#EDEDF2', maxWidth: '100%', width: '100vw', marginTop: '32px' }}  >
        {/* <MenuSelectsFilter setIsLoading={setIsLoading}/> */}
        <div className={styles2.containerListTalleres}>
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#6C788E' }}>Se encontraron +100 talleres mecanicos cerca a mi en Bogota</p>
            <Button className={'mobileButton'} onClick={() => setMapa(!mapa === true)} variant={ButtonVariant.outlined} style={{ margin: 0 }} size="sm">{mapa ? 'Listado' : 'Mapa'}</Button>
          </div>
          <div className={`${styles2.containerCardsAndMap} ${mapa ? styles2.containerMapMobile : ''}`}>
            <div
              style={{
                display: mapa ? 'none' : 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
                gap: '24px',
                alignItems: 'flex-start',
              }}
            >
              {talleres.talleres.slice(28, 40).reverse().map((taller, index) => (
                <CardTallerV2 key={taller.nombre} taller={taller} />
              ))}
            </div>
            <div  className={styles2.containerMapHome}>
              <MapTalleresHome data={talleres.talleres.slice(20, 70).reverse()} />
            </div>
          </div>
        </div>

      </section>
    </>
  )
}