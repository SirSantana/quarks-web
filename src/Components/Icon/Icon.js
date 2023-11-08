
import styles from '@/styles/Components.module.css'

export const IconCatalog = {
  storefrontOutline: 'storefront-outline',
  checkmarkCircle: 'checkmark-circle',
  storefrontOutline: 'storefront-outline',
  eyeOutline: 'eye-outline',
  eyeOutlineOff: 'eye-off-outline',
  alertCircle: 'alert-circle',
  chevronBackOutline: 'chevron-back-outline',
  compassOutline:'compass-outline',
  earthOutline:'earth-outline',
  callOutline:'call-outline',
  logoWhatsapp:'logo-whatsapp',
  calendarOutline:'calendar-outline',
  paperPlaneOutline:'paper-plane-outline',
  createOutline:'create-outline',
  pencilOutline:'pencil-outline',
  checkmarkOutline:'checkmark-outline',
  closeOutline:'close-outline',
  openOutline:'open-outline',
  calendarNumberOutline:'calendar-number-outline',
  logoFacebook:'logo-facebook',
  logoInstagram:'logo-instagram'

}

export default function Icon({ name, size = "md", style, onClick }) {
  return (
    <ion-icon
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : null,
        fontSize: size === 'sm' && '16px' || size === 'md' && '20px' || size === 'lg' && '24px',
        ...style
      }} name={name}></ion-icon>
  )
}