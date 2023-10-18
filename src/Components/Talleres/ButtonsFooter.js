
import { CREATE_CLICK_COMPARTIDO, CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function ButtonsFooter({data}) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()

  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)
  const [createClickCompartido] = useMutation(CREATE_CLICK_COMPARTIDO)

  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: data?.id } })
    let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }

  const handleClickCompartir = () => {
    setVisibleShareArticulo(true)
    createClickCompartido({ variables: { id: data?.id } })
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    scrolled &&
    <div className={styles.divFixed}>
      <button className={styles.buttonFixed} onClick={sendMessageWha} ><ion-icon style={{ color: 'white', fontSize: '20px' }} name="logo-whatsapp"></ion-icon>Contactar ahora</button>
      <button className={styles.buttonFixed2} onClick={handleClickCompartir} ><ion-icon style={{ color: 'white', fontSize: '20px' }} name="paper-plane-outline"></ion-icon></button>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    
    </div>

  )
}