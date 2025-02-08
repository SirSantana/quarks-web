import React, { useState, useEffect } from "react";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/router";

const linkHoverStyle = {
    backgroundColor: "#E5E7EB",
  };
const sections = [
    {
      title: "Direccion y Suspension",
      links: [
        { name: "Amortiguador", icon: "cloud-download", url:'Amortiguador-648d069fa78195fbadfa31e2' },
        { name: "Bomba de direccion hidraulica", icon: "play",url:'Bomba-de-direccion-hidraulica-648e8048ae5cde6b95562cf0'  },
        { name: "Cremallera de direccion", icon: "play",url:'Cremallera-de-direccion-64960af4abfa94222079afb0'  },
      ],
    },
    {
      title: "Electricos",
      links: [
        { name: "Alternador", icon: "settings", url: "Alternador-648de2b0821d58598a34a5c0" },
        { name: "Bateria", icon: "construct",url:'Bateria-648e2e60821d58598a34a5c2'  },
        { name: "Bobina de encendido", icon: "send", url:'Bobina-de-encendido-648e48bb821d58598a34a5c3' },
        { name: "Bujia", icon: "alert-circle", url:'Bujia-648f2bd6ea6b952ff84977ac' },
        { name: "Bujia de precalentamiento", icon: "time",url:'Bujia-de-precalentamiento-648f34fbea6b952ff84977ad'  },
        { name: "Cables de bujia", icon: "time",url:'Cables-de-bujia-6491b18b21ba69c72ecb4294'  },
        { name: "Caja de fusibles", icon: "time",url:'Caja-de-fusibles-6491c14e21ba69c72ecb4296'  },

      ],
    },
    {
      title: "Motor",
      links: [
        { name: "Arbol de levas", icon: "help-circle", url: "Arbol-de-levas-648df299821d58598a34a5c1" },
        { name: "Bomba de combustible", icon: "storefront", url:'Bomba-de-combustible-648e714dae5cde6b95562cef' },
        { name: "Bomba de aceite", icon: "people", url:'Bomba-de-aceite-648e8ea6ae5cde6b95562cf2' },
        { name: "Carburador", icon: "people", url:'Carburador-64948522787958e84ce45a15' },
        { name: "Catalizador", icon: "people", url:'Catalizador-64949037787958e84ce45a16' },
        { name: "Cigueñal", icon: "people", url:'Cigueñal-6494dfd0787958e84ce45a17' },
        { name: "Junta de culata", icon: "people", url:'Junta-de-culata-6498ff9031d022f51ba1308a' },
        { name: "Inyector de combustible", icon: "people", url:'Inyector-6499131c31d022f51ba1308c' },
      ],
    },
    {
        title:'Refrigeración',
        links: [
            { name: "Bomba de agua", icon: "people", url:'Bomba-de-agua-648e6934821d58598a34a5c4' },
        ],
    },
    {
        title:'Frenos',
        links:[
            { name: "Bomba de freno", icon: "people", url:'Bomba-de-freno-648e8821ae5cde6b95562cf1' },
            { name: "Campana de freno", icon: "people", url:'Campana-de-freno-64947e6a787958e84ce45a14' },
            { name: "Disco de freno", icon: "people", url:'Disco-de-freno-64961276abfa94222079afb1' },
            { name: "Freno de mano", icon: "people", url:'Freno-de-mano-649908e731d022f51ba1308b' },
        ]
    },
    {
        title:'Caja y Transmision',
        links:[
            { name: "Caja de cambios", icon: "people", url:'Caja-de-cambios-6491b9b021ba69c72ecb4295' },
            { name: "Caja de direccion", icon: "people", url:'Caja-de-direccion-6491c73921ba69c72ecb4297' },
            { name: "Caja de transferencia", icon: "people", url:'Caja-de-transferencia-6491cfd621ba69c72ecb4298' },
        ]
    },
    {
        title:'Reparticion',
        links:[
            { name: "Banda de distribucion", icon: "people", url:'Banda-de-distribucion-6495d64aabfa94222079afaf' },
            // { name: "Caja de direccion", icon: "people", url:'Caja-de-direccion-6491c73921ba69c72ecb4297' },
            // { name: "Caja de transferencia", icon: "people", url:'Caja-de-transferencia-6491cfd621ba69c72ecb4298' },
        ]
    },
    {
        title:'Embrague',
        links:[
            { name: "Embrague", icon: "people", url:'Embrague-64963e6e5ace1ce09f6b6987' },
        ]
    },
    {
        title:'Accesorios',
        links:[
            { name: "Plumilla limpiaparabrisas", icon: "people", url:'Plumilla-limpiaparabrisas-649648fb5ace1ce09f6b6988' },
        ]
    },
    {
        title:'Filtros',
        links:[
            { name: "Filtro de aire", icon: "people", url:'Filtro-de-aire-6496f585ce88f4f4490476e2' },
            { name: "Filtro de aceite", icon: "people", url:'Filtro-de-aceite-64965c5f5ace1ce09f6b6989' },
            { name: "Filtro de combustible", icon: "people", url:'Filtro-de-combustible-6496fbb8ce88f4f4490476e3' },
            { name: "Filtro de aceite", icon: "people", url:'Filtro-de-aceite-649648fb5ace1ce09f6b6988' },
        ]
    }
  ];

//   64960af4abfa94222079afb0
export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const isSmallScreen = window.innerWidth <= 768;
        setIsMobile(isSmallScreen);
        setIsOpen(!isSmallScreen); // Oculto en móviles, abierto en pantallas grandes
      }
    };

    handleResize(); // Llama al cargar la página
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Botón de Toggle (solo visible en pantallas pequeñas) */}
      {isMobile && (
        <button
          className={styles.toggleButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen?<ion-icon name="close-outline"></ion-icon>:<ion-icon name="menu-outline"></ion-icon>}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        {sections.map((section, index) => (
          <div className={styles.section} key={index}>
            <h6 style={{fontWeight:'600'}} className={styles.sectionTitle}>{section.title}</h6>
            <ul className={styles.linkList}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={`${link.url}`}
                    style={router.query.id.split('-').slice(0, -1).join('-').replaceAll('-', ' ') == link.name ? {backgroundColor: '#EDEDF2', color: '#182537'}:{}}
                    className={styles.link }
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        linkHoverStyle.backgroundColor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {/* <i
                      className={`ion-${link.icon}`}
                      style={iconStyle}
                    ></i> */}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Resto del contenido del sidebar */}
      </aside>
    </>
  );
}
