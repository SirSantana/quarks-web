import Link from "next/link";
import Icon, { IconCatalog } from "../Icon/Icon";
import { useState } from "react";
import { ModalShareArticulo } from "@/utils/Modales";
import { useRouter } from "next/router";
import styles from '@/styles/ServiciosAutomotriz.module.css'


export default function ButtonsHeader() {
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const router = useRouter()

  const handleBack = () => {
      router.back();
  };
  const handleClickCompartir = () => {
    setVisibleShareArticulo(true)
  }
  return (
    <>
      <div className={styles.containerButtonsHeader}>
        <div onClick={handleBack} style={{ backgroundColor: 'white', height: '36px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.chevronBackOutline} size="md" />
        </div>
        <div onClick={handleClickCompartir} style={{ backgroundColor: 'white', height: '36px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.shareSocialOutline} size="md" />
        </div>
      </div>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}

    </>
  )
}