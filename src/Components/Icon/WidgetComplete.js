import Divider from "../Box/Divider";
import Icon from "./Icon";
export default function WidgetComplete({ withBorder = true, onClick=undefined, icon, text,  style }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', backgroundColor: 'white', border: withBorder ? '1px solid #d6d6d6' : null, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '10px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: withBorder ? '90%' : '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems:'center'}}>
        <Icon name={icon} size="lg" style={style}/>
        <Divider/>
          <p style={{ fontSize: '14px', alignSelf:'center' }}>{ text}</p>
      </div>
    </div>
  )
}