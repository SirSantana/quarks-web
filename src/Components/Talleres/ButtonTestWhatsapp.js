import { useRouter } from "next/router";
import Icon, { IconCatalog } from "../Icon/Icon";
import { CREATE_VISITA_WHATSAPP } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";



export default function ButtonTestWhatsapp({whatsapp, id}) {
  const router = useRouter()
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)
  const handleWhatsAppClick = () => {
     createVisitaWhatsapp({ variables: { id: id } })
    let url = `https://api.whatsapp.com/send?phone=57${whatsapp}`;
    url += `&text=${encodeURI(`Buen dia, encontre su taller en https://quarks.com.co${router?.asPath}, tengo el siguiente problema...`)}&app_absent=0`
    window.open(url);
  };
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