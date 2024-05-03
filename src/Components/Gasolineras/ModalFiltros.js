


import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'

let combustibles = {
  corriente: true,
  extra: false
}

export default function ModalFiltrosGasolineras({ setVisibleModalFiltros }) {
  const router = useRouter()
  const queryString = router?.query?.combustible|| '';
  const corriente = queryString.includes('corriente');
  const extra = queryString.includes('extra');


  const [combustible, setCombustible] = useState({
    corriente: corriente || !router?.query?.combustible ? true : false,
    extra: extra
  });

  const handleToggleCombustible = (tipo) => {
    setCombustible({ ...combustible, [tipo]: !combustible[tipo] });
  };

  const handleSubmit = () => {
    const queryParams = Object.entries(combustible)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join(',');

    router.push(`?combustible=${queryParams}`);
    setVisibleModalFiltros(false)
  };
  return (
    <div onClick={() => setVisibleModalFiltros(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>Filtrar y ordenar</p>
          <Icon onClick={() => setVisibleModalFiltros(false)} name={IconCatalog.closeOutline} />
        </div>

        <div style={{ margin: '32px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>Filtrar</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Corriente</p>
            {combustible.corriente
              ? <Icon onClick={() => handleToggleCombustible('corriente')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleCombustible('corriente')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Extra</p>
            {combustible.extra
              ? <Icon onClick={() => handleToggleCombustible('extra')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleCombustible('extra')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>
        </div>

        <div style={{ margin: '16px 0 32px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>Ordenar</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>De menor a mayor precio</p>
            <Icon name={IconCatalog.checkbox} style={{ color: '#373737' }} />
          </div>
        </div>

        <Button onClick={handleSubmit} variant={ButtonVariant.secondary} fullWidth>
          Aplicar filtros
        </Button>
      </div>

    </div>

  )
}