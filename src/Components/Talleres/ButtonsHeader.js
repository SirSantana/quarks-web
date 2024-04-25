import Icon, { IconCatalog } from "../Icon/Icon";
import { useEffect, useState } from "react";
import { ModalShareArticulo } from "@/utils/Modales";
import { useRouter } from "next/router";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { CREATE_ACCION } from "@/graphql/mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import { GET_NEGOCIOVDOS_BY_EMAIL } from "@/graphql/queries";
import ModalEditTaller from "./ModalEditTaller";


export default function ButtonsHeader({ data }) {
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [createAccion, result] = useMutation(CREATE_ACCION)
  const { data: user } = useSession()
  const [getNegocioVDosByEmail, result2] = useLazyQuery(GET_NEGOCIOVDOS_BY_EMAIL,)

  const router = useRouter()

  const handleBack = () => {
    router.push('/', undefined, { shallow: true });
  };
  const handleClickCompartir = () => {
    if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: data?.id, tipo: 'btn-compartir', estado: 'production' } });
    }
    setVisibleShareArticulo(true)
  }
  useEffect(() => {
    if (user?.user.email) {
      getNegocioVDosByEmail({ variables: { email: user?.user.email } })
    }
  }, [user])
  return (
    <>
      <div className={styles.containerButtonsHeader}>
        <div onClick={handleBack} style={{ backgroundColor: 'white', height: '36px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.chevronBackOutline} size="md" />
        </div>
        {data?.userName === result2?.data?.getNegocioVDosByEmail
          ?
          <div onClick={()=> setVisibleEditModal(true)} style={{ backgroundColor: 'white', height: '36px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.settingsOutline} size="md" />
          </div>
          :
          <div onClick={handleClickCompartir} style={{ backgroundColor: 'white', height: '36px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.shareSocialOutline} size="md" />
          </div>
        }


      </div>

      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co/${data?.userName}`} />}
      {visibleEditModal && <ModalEditTaller setVisibleEditModal={setVisibleEditModal} signOut={signOut} setVisibleShareArticulo={setVisibleShareArticulo} />}

    </>
  )
}