import React, { useState } from 'react';
import styles from '@/styles/ServiciosAutomotriz.module.css'

import Link from 'next/link';
import Button, { ButtonVariant } from '../Button/Button';
import Icon, { IconCatalog } from '../Icon/Icon';
export default function PlacecardAnuncio() {
  return (
    <Link href={`/acceso`} style={{ width: '100%', textDecoration: 'none', color: '#373737' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '8px', margin: '16px 0 8px 0', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
          <Icon name={IconCatalog.image} style={{color:'#f1f1f1', fontSize:'64px'}} />
          <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>

            <h3 style={{ fontSize: '16px', fontWeight: '700', }}>Nombre de tu taller</h3>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ height: '20px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '4px', padding: '4px 4px 4px 0px', backgroundColor: '#f1f1f1', width: '80px' }}>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: '4px' }}>
                <Icon name={IconCatalog.star} size='sm' style={{ color: '#f1f1f1' }} />
                <p style={{ fontWeight: '500', fontSize: '12px', margin: 0, color: '#f1f1f1' }}>4.8</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div style={{ display: 'flex', marginBottom: '16px', flexDirection: 'row', flexWrap: 'wrap', gap: '6px', width: '100%' }}>
        {/* <p style={{ fontSize: '12px', margin: 0, color: '#464646', width: '100%', fontWeight: '600' }}>{data?.nombre === 'Corsa Motors' ? 'Almacen de Repuestos' : 'Taller Mecanico'}</p> */}

        <div style={{ height: '32px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '8px', padding: '4px 4px 4px 0px', backgroundColor: '#f1f1f1', width: '80px' }}>
        </div>
        <div style={{ height: '32px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '8px', padding: '4px 4px 4px 0px', backgroundColor: '#f1f1f1', width: '100px' }}>
        </div>
        <div style={{ height: '32px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '8px', padding: '4px 4px 4px 0px', backgroundColor: '#f1f1f1', width: '60px' }}>
        </div>
      </div>
      <Button size='sm' variant={ButtonVariant.secondary} fullWidth>
        Unete gratis!
      </Button>
    </Link>
  )
}