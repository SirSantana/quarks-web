import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import Divider from "../Box/Divider";
import Icon, { IconCatalog } from "../Icon/Icon";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../Button/Button";
import { ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import { useRouter } from "next/router";


export default function NotFoundInfo({ onClick, nombre }) {
  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA)
  const [sugerencia, setSugerencia] = useState('')
  const [visibleModal, setVisibleModal] = useState(false)
  const router = useRouter()

  const handleSugerenciaChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    setSugerencia(cleanedValue);
  };
  const handleSendSugerencia = (e) => {
    e.preventDefault()
    if (sugerencia.length <= 10) {
      return alert('Cuentanos la sugerencia que tienes!')
    }
    createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: 'perfil-talleres' } })
    setVisibleModal(true)
  }
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setVisibleModal(false)
      }, 3000)
    }
  }, [data])
  return (
    <>
      <div onClick={onClick} className={styles.containerHeaderCalendario} style={{ flexDirection: 'column', backgroundColor: '#FFEEF4', alignItems: 'center', gap: '16px', marginTop: '32px', cursor: 'pointer', borderColor: '#F50057' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', justifyContent:'flex-start', width:'100%' }}>
          <Icon size='md' name={IconCatalog.alertCircle} style={{ color: '#F50057', marginTop: '4px' }} />
          <Divider backgroundColor={'#F50057'} />
          <div style={{ display: 'flex', flexDirection: 'column', }}>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>No encontraste lo que buscabas?</p>
            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '1.6' }}>Nosotros te ayudamos!</p>
          </div>

        </div>
        <textarea
          onChange={handleSugerenciaChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'none',
            height: '100px'
          }}
          id="sugerencia"
          name="sugerencia"
          rows="4"
          cols="50"
          value={sugerencia}
          placeholder="Cuentanos tu sugerencia / cambio / mejora / problema aquí..."
        ></textarea>
        <Button onClick={handleSendSugerencia} variant={ButtonVariant.secondary} size='sm'>
          Enviar
        </Button>

      </div>
      {loading &&
        <ModalLoading title={'Enviando Sugerencia ... '} />
      }
      {data && visibleModal &&
        <ModalSuccessfull title={'Gracias'} subtitle={'Por compartir tu opinion, la tendremos en cuenta para mejorar!'} />
      }
    </>
  )
}