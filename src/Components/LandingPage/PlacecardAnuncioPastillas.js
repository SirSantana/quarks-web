import Image from "next/image";
import Button, { ButtonVariant } from "../Button/Button";
import sendWhatsappMessage from "@/utils/scripts";



export default function PlacecardAnuncioPastillas() {
  const handleClick =()=>{
    let frase = `Deseo canjear mi cupon del 15%. \nEstoy buscando las pastillas de freno de: ` 

    sendWhatsappMessage({numero:'3114754394', text:frase})
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px', margin: '16px 0 8px 0', justifyContent: 'space-between', alignItems:'center' }}>
      <Image width={48} height={48} src={'/LogoTupastilla.png'} />
      <div style={{ margin:'16px 0',gap:'8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
        <p style={{margin:0, fontSize: '16px', fontWeight: '700', textAlign:'center'}}>Reclama tu Cupon del 15% de descuento</p>
        <p style={{margin:0, fontSize: '14px', textAlign:'center'}}>En tus proximas pastillas de freno con Tupastilladefreno.com</p>
      </div>
      <Button onClick={handleClick} variant={ButtonVariant.secondary} size="sm">
        Reclamar
      </Button>
    </div>
  )
}