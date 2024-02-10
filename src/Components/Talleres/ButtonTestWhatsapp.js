import { useRouter } from "next/router";
import Icon, { IconCatalog } from "../Icon/Icon";
import sendWhatsappMessage from "@/utils/scripts";
import { useMutation } from "@apollo/client";
import { CREATE_ACCION } from "@/graphql/mutations";



export default function ButtonTestWhatsapp({whatsapp, id}) {
  const router = useRouter()
  const [createAccion, result] = useMutation(CREATE_ACCION)

  const handleWhatsAppClick = () => {
     if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: id, tipo: 'btn-solicitar-revision', estado: 'production' } });
    }
     sendWhatsappMessage({numero:whatsapp, path:router?.asPath})
  }
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '20px',
        width: '48px',
        height: '48px',
        backgroundColor: '#25d366', // Color de fondo de WhatsApp
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para resaltar el botón
        transition: 'background-color 0.3s ease', // Agregar transición para suavizar el cambio de color al pasar el mouse
      }}
      onClick={handleWhatsAppClick}
    >
      <Icon name={IconCatalog.logoWhatsapp} style={{ fontSize: '32px', color: 'white' }} />
    </div>
  )
}