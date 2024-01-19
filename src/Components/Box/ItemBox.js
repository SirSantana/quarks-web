import Icon from '../Icon/Icon'
import styles from './Box.module.css'
import Link from 'next/link'
import Divider from './Divider'

export default function ItemBox({ link, icon, color = '#373737', textIcon = false, textItem }) {
  return (
    link
      ?
      <Link href={link} target='_blank' className={styles.itemBoxLink} >
        <div className={styles.containerIcon}>
          {textIcon
            ?
            <p style={{ fontSize: '14px', fontWeight: '600', width: '40px' }}>{textIcon}</p>
            :
            <Icon size='lg' name={icon} style={{ color: color }} />
          }
        </div>
          <Divider/>
        <p className={styles.pItemBoxLink} >{textItem}</p>
      </Link>
      :
      <div className={styles.itemBoxLink} >
        <div className={styles.containerIcon}>
          {textIcon
            ?
            <p style={{ fontSize: '14px', fontWeight: '600', width: '40px', textAlign: 'center' }}>{textIcon}</p>
            :
            <Icon size='lg' name={icon} style={{ color: color }} />
          }
        </div>
        <Divider/>
        <p style={{ fontSize: '14px', flex: 1 }}>{textItem}</p>
      </div>
  )
}