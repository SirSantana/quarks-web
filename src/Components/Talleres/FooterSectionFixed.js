import { useState } from "react";
import Button, { ButtonVariant } from "../Button/Button";
import { useRouter } from "next/router";
import ModalButtonsContacto from "./ModalButtonsContacto";
import { ModalShareArticulo } from "@/utils/Modales";
import Icon, { IconCatalog } from "../Icon/Icon";



export default function FooterSectionFixed({ data }) {
  const router = useRouter()
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [visibleModalButtons, setVisibleModalButtons] = useState(false)
  const sendMessageWha = () => {
    setVisibleModalButtons(true)
// let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    // url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    // window.open(url);
  }
  return (
    <>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', padding: '0 24px', height: '90px', borderTop: '1px solid #d6d6d6', maxWidth: '500px', margin: '0 auto', alignSelf: 'center', alignItems: 'center', }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '16px 0', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems:'flex-start'}}>
            <Icon style={{ color: '#10C673', marginTop:'2px'}} size='md' name={IconCatalog.checkmarkCircle} />
            <p style={{ margin: 0, fontSize: '14px',lineHeight:'18px', fontWeight: '400', flex:1 }}><span style={{ fontWeight: '600' }}>8</span> personas lo <span style={{ fontWeight: '600' }}>recomiendan</span></p>
          </div>
          <Button onClick={sendMessageWha} style={{ flexShrink: 0, height: '48px', width: '148px' }} variant={ButtonVariant.gradient} >
            Contacta
          </Button>
        </div>
      </div>
      {visibleModalButtons && <ModalButtonsContacto data={data} setVisibleModalButtons={setVisibleModalButtons} />}
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    </>

  )
}