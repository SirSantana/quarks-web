import Icon from "./Icon";

import styles from '@/styles/Components.module.css'


export default function WidgetComplete({ withBorder = true, onClick=undefined, icon, text, icon2 = false, editMode = false, onChange, name, editPerfil, valueEditCheck }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', backgroundColor: 'white', border: withBorder ? '1px solid #d6d6d6' : null, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: withBorder ? '90%' : '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
        <Icon name={icon} size="lg" />
        {/* <ion-icon style={{ fontSize: '20px' }} name="logo-whatsapp"></ion-icon> */}
        {editMode
          ?<input name={name} className={styles.inputDataNegocio} type={name === 'telefono'|| name === 'whatsapp' ?'number':'text'} value={editPerfil?.[name]} onChange={(e) => onChange(e)} />
      :
          <p style={{ fontSize: '14px' }}>{valueEditCheck? valueEditCheck: text}</p>
        }
      </div>
      {icon2 && <Icon size="md" style={{ color: '#757a7e' }} name={icon2} />}
    </div>
  )
}