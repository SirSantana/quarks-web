
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import Box from '../Box/Box';
import ItemBox from '../Box/ItemBox';
import { useEffect, useState } from 'react';
import ModalSolicitaServicio from './ModalSolicitaServicio';
import { useRouter } from 'next/router';


export default function HorarioDias({horariosSeparados, data}) {
  const [visibleModalSolicitaServicio, setVisibleModalSolicitaServicio] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if(!router.query.length>0){
      const timer = setTimeout(() => {
        setVisibleModalSolicitaServicio(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600',display:'flex', gap:'16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.calendarNumberOutline} size='lg' /> Horario</h2>
      <Box >
        {horariosSeparados?.map(horario => {
          const primeraTresLetras = horario.substring(0, 3);
          const restoHorario = horario.substring(3);
          return (
          <ItemBox textItem={restoHorario} textIcon={primeraTresLetras}/>
        )})}
      </Box>
      {visibleModalSolicitaServicio && <ModalSolicitaServicio data={data} setVisibleModalSolicitaServicio={setVisibleModalSolicitaServicio} />}

    </>
  )
}