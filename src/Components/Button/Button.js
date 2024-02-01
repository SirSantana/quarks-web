
import Link from 'next/link';
import Icon, { IconCatalog } from '../Icon/Icon';
import styles from './Button.module.css'

export const ButtonSize = {
  sm: 'sm',
  base: 'base',
  lg: 'lg',
  xl: 'xl'
}
export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  terciary: 'terciary',
  outlined: 'outlined',
  gradient: 'gradient',

}

export default function Button({ children, size = ButtonSize.base, active = false, disable = false, onlyIcon = false, variant = ButtonVariant.primary, onClick, icon = false, fullWidth = false, style, link = false, href = null }) {
  const variantButton = styles[`button-${variant}`];
  const sizeButton = styles[`button-${size}`]
  return (
    link
      ?
      <Link target='_blank' href={href} className={`${styles.button} ${variantButton} ${sizeButton}`}
        style={{ ...style, width: fullWidth && '100%' }}>
        {children}
        {icon && <Icon name={icon} size='md' style={{ fontSize: '20px', color: 'white' }} />}
      </Link>
      :
      <button
        onClick={onClick}
        className={`${styles.button} ${variantButton} ${sizeButton}`}
        style={{ ...style, width: fullWidth && '100%' }}
      >
        {children}
        {icon && <Icon name={icon} size='md' style={{ fontSize: '20px', color: 'white' }} />}
      </button>
  )
}