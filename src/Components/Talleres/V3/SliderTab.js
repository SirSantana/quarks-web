
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/Negocio.module.css'
import { useRef, useState } from 'react';

let tabs = ['Ubicacion','Servicios',  'Horario','Redes Sociales', 'Acerca de',  'Reseñas'];
// export default function SliderTab({ handleChangeSection, refs, desktop}) {
//   const [activeTab, setActiveTab] = useState(-1); // Estado para mantener la pestaña activa
//   const [disableClick, setDisableClick] = useState(false);
//   const settings = {
//     horizontal: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 2,
//     variableWidth: true,
//     arrows: false,
//     onSwipe: () => {
//       // Cuando se inicia el desplazamiento, desactivar el clic
//       setDisableClick(true);
//     },
//     afterChange: () => {
//       // Cuando finaliza el desplazamiento, volver a habilitar el clic
//       setDisableClick(false);
//     },
//   };
//   const handleTabClick = (index) => {
//     if (disableClick) {
//       // Si el clic está desactivado, no hacer nada
//       return;
//     }
//     setActiveTab(index);
//     const refss = [refs.refServicios, refs.mapSectionRef, refs.refHorarios,refs.refRedes,  refs.refAcercaDe,refs.refReseñas,  ];
//     handleChangeSection({ ref: refss[index] });
//   };

//   return (
//     <div className={desktop?styles.containerSliderTabDesktop:styles.containerSliderTab} >
//       <Slider className={styles.sliderTab} {...settings}>
//         {tabs.map((el, index) => (
//           <div key={index} className={index === activeTab ? styles.activeTab : styles.tab}>
//             <h3
//               className={index === activeTab ? styles.activeTextTab : styles.textTab}
//               onClick={() => handleTabClick(index)}
//               style={{ fontSize: "14px", fontWeight: "500", lineHeight: "1.1", overflow: "hidden", textOverflow: "ellipsis", textAlign: 'center' }}
//             >
//               {el}
//             </h3>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

export default function SliderTab({ handleChangeSection, refs, desktop }) {
  const [activeTab, setActiveTab] = useState(0); // Estado para la pestaña activa
  const sliderRef = useRef(null); // Referencia para el contenedor del carrusel

  const handleTabClick = (index) => {
    setActiveTab(index);
    const refss = [
       refs.mapSectionRef,refs.refServicios, refs.refHorarios, 
      refs.refRedes, refs.refAcercaDe, refs.refReseñas
    ];
    handleChangeSection({ ref: refss[index] });
  };


  return (
    <div className={styles.containerSliderTab}>
      <div className={styles.sliderTab} ref={sliderRef}>
        {tabs.map((el, index) => (
          <div key={index} className={index === activeTab ? styles.activeTab : styles.tab}>
            <h3
              className={index === activeTab ? styles.activeTextTab : styles.textTab}
              onClick={() => handleTabClick(index)}
            >
              {el}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}