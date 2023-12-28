import Icon from "./Icon";


export default function WidgetIcon({ name, img, styles, size='md', stylesContainer}) {
  return (
    <div style={{...stylesContainer, border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {img
        ? <img src={`./${img}.png`} style={{ width: '30px', height: '30px' }} />
        : <Icon name={name} size={size} style={styles} />
      }
    </div>
  )
}