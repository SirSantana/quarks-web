
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Faq.module.css'
import { useState } from 'react';

let tabs = ['Servicios', 'Ubicacion', 'Horario','Redes Sociales', 'Acerca de',  'Reseñas'];
export default function SliderTab({ handleChangeSection, refs, desktop}) {
  const [activeTab, setActiveTab] = useState(-1); // Estado para mantener la pestaña activa
  const [disableClick, setDisableClick] = useState(false);
  const settings = {
    horizontal: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    arrows: false,
    onSwipe: () => {
      // Cuando se inicia el desplazamiento, desactivar el clic
      setDisableClick(true);
    },
    afterChange: () => {
      // Cuando finaliza el desplazamiento, volver a habilitar el clic
      setDisableClick(false);
    },
  };
  const handleTabClick = (index) => {
    if (disableClick) {
      // Si el clic está desactivado, no hacer nada
      return;
    }
    setActiveTab(index);
    // router.push(`/${router.query.id}?tab=${tabs[index]}`)
    const refss = [refs.refServicios, refs.mapSectionRef, refs.refHorarios,refs.refRedes,  refs.refAcercaDe,refs.refReseñas,  ];
    handleChangeSection({ ref: refss[index] });
    // handleChangeSection({ref:refServicios})
    // Aquí puedes agregar la lógica para cambiar de ruta según la pestaña seleccionada
  };

  return (
    <div className={desktop?styles.containerSliderTabDesktop:styles.containerSliderTab} >
      <Slider className={styles.sliderTab} {...settings}>
        {tabs.map((el, index) => (
          <div key={index} className={index === activeTab ? styles.activeTab : styles.tab}>
            <h3
              className={index === activeTab ? styles.activeTextTab : styles.textTab}
              onClick={() => handleTabClick(index)}
              style={{ fontSize: "14px", fontWeight: "500", lineHeight: "1.1", overflow: "hidden", textOverflow: "ellipsis", textAlign: 'center' }}
            >
              {el}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};