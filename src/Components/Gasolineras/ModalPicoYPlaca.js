

import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon'
import styles2 from '@/styles/PicoYPlaca.module.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import data from '@/pages/picoyplaca.json'

export default function ModalPicoYPlaca({setVisibleModalPicoyPlaca}) {
  const CustomPrevArrow = (props) => (
    <div className={styles.customPrevArrow} onClick={props.onClick}>
      <Icon size='sm' name={IconCatalog.chevronBackOutline} />
      {/* <ion-icon style={{color:'#464646'}} name="chevron-back-"></ion-icon> */}
    </div>
  );
  const CustomNextArrow = (props) => (
    <div className={styles.customNextArrow} onClick={props.onClick}>
      <Icon size='sm' name={IconCatalog.chevronForwardOutline} />
    </div>
  );
  let day = new Date().getDate()
  const settings = {
    horizontal: true,
    infinite: true,
    draggable: true,
    speed: 500,
    speed: 500,
    slidesToShow: 1, // Muestra una slide a la vez
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    initialSlide: day-1,

    // arrows:type==='Taller'?false:true,
  };

  return (
    <div onClick={() => setVisibleModalPicoyPlaca(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>Pico y Placa Bogotá</p>
          <Icon onClick={() => setVisibleModalPicoyPlaca(false)} name={IconCatalog.closeOutline} />
        </div>
        <div style={{ margin: '40px 0 0px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <Slider style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', textAlign: 'center', alignItems: 'center' }}  {...settings}>
            {data?.picoyplaca[4].filter(el=> !el.ciudad).map(el => (
              <>
                <p style={{ margin: '0', fontSize: '20px', fontWeight: '700', textAlign: 'center', color:'#373737' }}>{el.titulo.replaceAll('-', ' ')}</p>
                <div className={styles2.containerMiniPlaca} style={{ margin: '16px auto 0px auto' }}>
                  <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
                    <h4 style={{ fontSize: '32px', fontFamily: 'Impact', letterSpacing: '6px', fontWeight: '100' }}>{el.placas}</h4>
                  </div>
                </div>
                <div style={{ margin: '16px 0 32px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                  <p style={{ margin: '0', fontSize: '14px', fontWeight: '400', textAlign: 'center' }}>Vehiculos Particulares</p>
                  <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', textAlign: 'center' }}>{el.horario}</p>

                </div>
              </>
            ))}
          </Slider>
        </div>
      </div>

    </div>

  )
}