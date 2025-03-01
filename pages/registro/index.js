import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Layout from "@/src/Components/Layout";
import talleres from '@/src/data/talleres.json'
import styles2 from '@/styles/Landing.module.css'
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useState } from "react";
import ModalRegisterEmail from "@/src/Components/Register/ModalRegisterEmail";
import dynamic from "next/dynamic";

const MapTalleresHome = dynamic(() => import('@/src/Components/LandingPage/MapTalleresHome'),
  { ssr: false, loading: () =>  <div className={styles2.containerMapHome}>
  <div className={styles2.cardNewTallerSkeleton} style={{position: 'relative', width: '100%', height: '90vh' }}/>
  </div> })

export default function Registro() {
  const [visibleModalRegister, setVisibleModalRegister] = useState(false);
  return (
    <Layout title={'Registro Talleres'} footer={false} visibleNavbar={false}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            ¡Únete! <br />
            Podrías obtener
          </h1>
          <h2 className={styles.highlight}>
            +50 Clientes <span className={styles.subHighlight}>/mes</span>
          </h2>
          <p className={styles.description}>
            Sin comisiones. Sin intermediarios. Solo conectamos clientes con talleres y mecánicos de confianza.
          </p>
          <Button onClick={()=>setVisibleModalRegister(true)} variant={ButtonVariant.primary} style={{marginTop:'32px'}}>Haz crecer tu negocio</Button>
        </div>

        <div style={{zIndex:visibleModalRegister ? 0 : 10000000}} className={styles.mapContainer}>
          {/* Contenedor del buscador */}
          <div className={styles.searchBar}>
            <Icon name={IconCatalog.searchOutline} className={styles.icon} size="lg" />
            <div className={styles.location}>
              <strong>Bogotá</strong>
              <span>Talleres mecánicos para cambio de aceite</span>
            </div>
          </div>

          {/* Mapa */}
          <MapTalleresHome data={talleres.talleres.slice(20, 70).reverse()} />
        </div>
      </div>
      {visibleModalRegister && <ModalRegisterEmail setVisibleModalRegister={setVisibleModalRegister} />}
    </Layout>
  );
}
