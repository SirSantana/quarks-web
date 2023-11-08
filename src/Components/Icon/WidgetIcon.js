import Icon from "./Icon";


export default function WidgetIcon({ name, img, styles, size='md' }) {
  return (
    <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {img
        ? <img src={`./${img}.png`} style={{ width: '30px', height: '30px' }} />
        : <Icon name={name} size={size} style={styles} />
      }
    </div>
  )
}