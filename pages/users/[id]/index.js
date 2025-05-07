import { useSession } from "next-auth/react"
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import { useState } from "react";
import Input from "@/src/Components/Input/Input";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";


export default function User() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  return (
    <div style={{ width: '90%', margin: 'auto', marginTop: '32px', maxWidth: '1100px' }}>
      User {session && session.user.name}


      <div style={{ marginTop: '64px' }}>
        <div onClick={() => setOpen(open ? false : true)} style={{ padding:'0', maxWidth: '600px', borderRadius: '8px', width: '100%', flexDirection: 'column', gap:0 }} className={styles.cardContainerTipo}>
          <div style={{padding:'24px 32px', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ color: '#182537', fontWeight: '500', fontSize:'18px' }}>Nombre</h3>
              <p style={{ color: '#6C788E', fontSize:'16px' }}>{session && session.user.name}</p>
            </div>
            <Icon name={IconCatalog.chevronDownOutline} />
          </div>

          {open && <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: ' 0' }} />
            <div style={{padding:'32px'}}>
            <Input
              style={{ width: "100%"}}
              stylesInput={{ paddingLeft: "16px",borderColor:'#6C788E' }}
              type="text"
              name="nombre"
              placeholder={session && session.user.name}
            />
            </div>

            <div style={{padding:'12px 24px 24px 24px', display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'flex-end' }}>
              <Button style={{margin:0}} variant={ButtonVariant.terciary}>Cancelar</Button>
              <Button style={{margin:0}}  variant={ButtonVariant.primary}>Guardar</Button>
              </div>
          </div>
          
          }
        </div>
      </div>
    </div>
  )
}