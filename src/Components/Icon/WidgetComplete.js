import Divider from "../Box/Divider";
import Icon from "./Icon";

const Badge = ({ onClickBadge, text, type }) => {
  return (
    type === 'Telefono'
      ?
      <div onClick={onClickBadge} style={{ borderRadius: '4px', padding: '2px 10px', border: '1px solid #4EDD76', width: 'fitContent', display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', backgroundColor: '#EAFFF0' }}>
        <a href={`tel:+57${text}`} target="_blank" style={{ fontSize: '12px', color: '#4EDD76', fontWeight: '600' }}>
          Llamar
        </a>
      </div>
      :
      <div onClick={onClickBadge} style={{ borderRadius: '4px', padding: '2px 10px', border: '1px solid #c5c5c5', width: 'fitContent', display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
        <p style={{ fontSize: '12px', color: '#373737', fontWeight: '600' }}>
          Mapa
        </p>
      </div>
  )
}
export default function WidgetComplete({ withBorder = true, onClick = undefined, icon, text, style, badge = false, onClickBadge=null }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', backgroundColor: 'white', border: withBorder ? '1px solid #d6d6d6' : null, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '10px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: withBorder ? '90%' : '100%', maxWidth: '600px', }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', flex: 1 }}>
        <Icon name={icon} size="lg" style={style} />
        <Divider />
        <p style={{ fontSize: '14px', alignSelf: 'center', flex: 1 }}>{text}</p>
        {badge &&
          <Badge onClickBadge={onClickBadge} text={text} type={badge} />
        }
      </div>
    </div>
  )
}