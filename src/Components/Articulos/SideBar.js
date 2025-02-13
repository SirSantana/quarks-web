import React, { useState, useEffect } from "react";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const linkHoverStyle = {
    backgroundColor: "#E5E7EB",
  };
const sections = [
    {
      title: "Direccion y Suspension",
      links: [
        { name: "Amortiguador", icon: "cloud-download", url:'/glosario-terminos/amortiguadores-funcionamiento' },
        { name: "Bomba de direccion hidraulica", icon: "play",url:'/glosario-terminos/bomba-direccion-hidraulica-funcionamiento'  },
        { name: "Cremallera de direccion", icon: "play",url:'/glosario-terminos/cremallera-direccion-funcionamiento'  },
      ],
    },
    {
      title: "Electricos",
      links: [
        { name: "Alternador", icon: "settings", url: "/glosario-terminos/alternador-funcionamiento" },
        { name: "Bateria", icon: "construct",url:'/glosario-terminos/bateria-funcionamiento'  },
        { name: "Bobina de encendido", icon: "send", url:'/glosario-terminos/bobina-encendido-funcionamiento' },
        { name: "Bujia", icon: "alert-circle", url:'/glosario-terminos/bujia-funcionamiento' },
        { name: "Bujia de precalentamiento", icon: "time",url:'/glosario-terminos/bujia-precalentamiento-funcionamiento'  },
        { name: "Cables de bujia", icon: "time",url:'/glosario-terminos/cables-bujia-funcionamiento'  },
        { name: "Caja de fusibles", icon: "time",url:'/glosario-terminos/caja-fusibles-funcionamiento'  },

      ],
    },
    {
      title: "Motor",
      links: [
        { name: "Arbol de levas", icon: "help-circle", url: "/glosario-terminos/arbol-levas-funcionamiento" },
        { name: "Bomba de combustible", icon: "storefront", url:'/glosario-terminos/bomba-combustible-funcionamiento' },
        { name: "Bomba de aceite", icon: "people", url:'/glosario-terminos/bomba-aceite-funcionamiento' },
        { name: "Carburador", icon: "people", url:'/glosario-terminos/carburador-funcionamiento' },
        { name: "Catalizador", icon: "people", url:'/glosario-terminos/catalizador-funcionamiento' },
        { name: "Cigueñal", icon: "people", url:'/glosario-terminos/cigueñal-funcionamiento' },
        { name: "Junta de culata", icon: "people", url:'/glosario-terminos/junta-culata-funcionamiento' },
        { name: "Inyector de combustible", icon: "people", url:'/glosario-terminos/inyector-combustible-funcionamiento' },
      ],
    },
    {
        title:'Refrigeración',
        links: [
            { name: "Bomba de agua", icon: "people", url:'/glosario-terminos/bomba-agua-funcionamiento' },
        ],
    },
    {
        title:'Frenos',
        links:[
            { name: "Bomba de freno", icon: "people", url:'/glosario-terminos/bomba-freno-funcionamiento' },
            { name: "Campana de freno", icon: "people", url:'/glosario-terminos/campana-freno-funcionamiento' },
            { name: "Disco de freno", icon: "people", url:'/glosario-terminos/disco-freno-funcionamiento' },
            { name: "Freno de mano", icon: "people", url:'/glosario-terminos/freno-mano-funcionamiento' },
        ]
    },
    {
        title:'Caja y Transmision',
        links:[
            { name: "Caja de cambios", icon: "people", url:'/glosario-terminos/caja-cambios-funcionamiento' },
            { name: "Caja de direccion", icon: "people", url:'/glosario-terminos/caja-direccion-funcionamiento' },
            { name: "Caja de transferencia", icon: "people", url:'/glosario-terminos/caja-transferencia-funcionamiento' },
        ]
    },
    {
        title:'Distribucion',
        links:[
            { name: "Banda de distribucion", icon: "people", url:'/glosario-terminos/banda-distribucion-funcionamiento' },
            // { name: "Caja de direccion", icon: "people", url:'Caja-de-direccion-6491c73921ba69c72ecb4297' },
            // { name: "Caja de transferencia", icon: "people", url:'Caja-de-transferencia-6491cfd621ba69c72ecb4298' },
        ]
    },
    {
        title:'Embrague',
        links:[
            { name: "Embrague", icon: "people", url:'/glosario-terminos/embrague-funcionamiento' },
        ]
    },
    {
        title:'Accesorios',
        links:[
            { name: "Plumilla limpiaparabrisas", icon: "people", url:'/glosario-terminos/escobilla-limpiaparabrisas-funcionamiento' },
        ]
    },
    {
        title:'Filtros',
        links:[
            { name: "Filtro de aire", icon: "people", url:'/glosario-terminos/filtro-aire-funcionamiento' },
            { name: "Filtro de aceite", icon: "people", url:'/glosario-terminos/filtro-aceite-funcionamiento' },
            { name: "Filtro de combustible", icon: "people", url:'/glosario-terminos/filtro-combustible-funcionamiento' },
        ]
    }
  ];

//   64960af4abfa94222079afb0
export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()

  
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (typeof window !== "undefined") {
  //       const isSmallScreen = window.innerWidth <= 768;
  //       setIsMobile(isSmallScreen);
  //       setIsOpen(!isSmallScreen); // Oculto en móviles, abierto en pantallas grandes
  //     }
  //   };

  //   handleResize(); // Llama al cargar la página
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

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
                  <Link
                    href={`${link.url}`}
                    onClick={(e) => {
                      if (router.asPath === link.url) {
                        e.preventDefault(); // Evita que se recargue la página innecesariamente
                      }
                    }}
                    style={
                      router.asPath === link.url
                        ? { backgroundColor: "#EDEDF2", color: "#182537" }
                        : {}
                    }
                    className={styles.link }
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        linkHoverStyle.backgroundColor)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                   
                    {link.name}
                  </Link>
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
