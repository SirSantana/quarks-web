import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ResponsiveSidebar({sections=[]}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const activeItemRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 768;
      setIsMobile(smallScreen);
      setIsOpen(!smallScreen); // En móvil cerrado, en escritorio abierto
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (isMobile) {
      setIsOpen(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [router.asPath]);

  return (
    <>
      {/* Botón de Toggle en móvil */}
      {isMobile && (
        <button className={styles.toggleButton} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="menu-outline"></ion-icon>}
        </button>
      )}

      {/* Sidebar con referencia */}
      <aside ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        {sections.map((section, index) => (
          <div className={styles.section} key={index}>
            <h6 className={styles.sectionTitle}>{section.title}</h6>
            <ul className={styles.linkList}>
              {section.links.map((link, linkIndex) => {
                const isActive = router.asPath === link.url;
                return (
                  <li key={linkIndex} ref={isActive ? activeItemRef : null}>
                    <Link
                      href={link.url}
                      className={`${styles.link} ${isActive ? styles.activeLink : ""}`}
                      style={isActive ? { backgroundColor: "#EDEDF2", color: "#182537" } : {}}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
}