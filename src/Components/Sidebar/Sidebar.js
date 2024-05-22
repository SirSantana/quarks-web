
import Icon, { IconCatalog } from '../Icon/Icon';
import styles from './Sidebar.module.css';


export default function Sidebar({ isOpen, onClose, header, body, footer }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <div className={`${styles.sidebarHeader} ${isOpen ? styles.sidebarHeaderWithText : ''}`}>
        {header}
        <Icon   style={{ color: '#464646' }}onClick={onClose} name={IconCatalog.menuOutline} />
      </div>
      <div className={styles.sidebarBody}>
        <div style={{height:'30px'}} className={isOpen ? styles.iconWithText : styles.icon}>
          <Icon  name={IconCatalog.searchOutline} />
          <p style={{ color: '#464646', margin: 0, fontSize:'14px' , fontWeight:'500'}}>Buscar</p>
        </div>
        <div style={{height:'30px'}}className={isOpen ? styles.iconWithText : styles.icon}>
          <Icon  name={IconCatalog.alertCircleOutline} />
          <p style={{ color: '#464646', margin: 0, fontSize:'14px' , fontWeight:'500'}}>Revision</p>
        </div>
        <div style={{height:'30px'}}className={isOpen ? styles.iconWithText : styles.icon}>
          <Icon   name={IconCatalog.settingsOutline} />
          <p style={{ color: '#464646', margin: 0, fontSize:'14px', fontWeight:'500' }}>Configuracion</p>
        </div>
      </div>
      {/* {isOpen && (
        <div className={styles.sidebarFooter}>
          {footer}
        </div>
      )} */}
    </div>
  )
}