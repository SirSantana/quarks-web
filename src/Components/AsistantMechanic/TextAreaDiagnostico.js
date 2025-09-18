import { Car, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import styles from "@/styles/TextAreaBuscador.module.css";

const TextareaWithButtons = ({
  mensaje,
  setMensaje,
  bloqueado = false,
  cargando = false,
  placeholder = "Ej: Mi Chevrolet Optra 1.8 2009 hace un ruido al frenar...",
  onAutoSeleccionado = () => {},
  onPaisSeleccionado = () => {},
}) => {
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [paisSeleccionado, setPaisSeleccionado] = useState("Colombia");
  const [mostrarMenuAuto, setMostrarMenuAuto] = useState(false);
  const [mostrarMenuPais, setMostrarMenuPais] = useState(false);

  // Datos de ejemplo para los menús
  const autosPopulares = [
    { id: 1, marca: "Chevrolet", modelo: "Optra", año: 2009, motor: "1.8L" },
  ];

  const paises = [
    { id: 1, nombre: "Colombia", codigo: "CO", bandera: "🇨🇴" },
    { id: 2, nombre: "México", codigo: "MX", bandera: "🇲🇽" },
    { id: 3, nombre: "Argentina", codigo: "AR", bandera: "🇦🇷" },
    { id: 4, nombre: "Chile", codigo: "CL", bandera: "🇨🇱" },
    { id: 5, nombre: "Perú", codigo: "PE", bandera: "🇵🇪" },
    { id: 6, nombre: "Ecuador", codigo: "EC", bandera: "🇪🇨" },
    { id: 7, nombre: "Venezuela", codigo: "VE", bandera: "🇻🇪" },
    { id: 8, nombre: "Uruguay", codigo: "UY", bandera: "🇺🇾" },
  ];

 

  // Manejo de selección de auto
  const handleAutoSeleccion = (auto) => {
    setAutoSeleccionado(auto);
    setMostrarMenuAuto(false);
    onAutoSeleccionado(auto);
  };

  // Manejo de selección de país
  const handlePaisSeleccion = (pais) => {
    setPaisSeleccionado(pais.nombre);
    setMostrarMenuPais(false);
    onPaisSeleccionado(pais);
  };

  // Manejo del clic en agregar auto personalizado
  const handleAgregarAuto = () => {
    setMostrarMenuAuto(false);
    console.log("Agregar auto personalizado");
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setMostrarMenuAuto(false);
        setMostrarMenuPais(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={`${styles.textareaContainer} dropdown-container`}>
        <textarea
          className={`${styles.textareaWithButtons} ${
            bloqueado || cargando ? styles.textareaDisabled : ""
          }`}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder={placeholder}
          disabled={bloqueado || cargando}
          onClick={() => {
            setMostrarMenuAuto(false);
            setMostrarMenuPais(false);
          }}
        />

        {/* Contenedor de botones */}
        {/* <div className={styles.buttonsContainer}>
            <button
              className={`${styles.metaItem} ${
                autoSeleccionado ? styles.iconButtonActive : ""
              } ${bloqueado || cargando ? styles.iconButtonDisabled : ""}`}
              onClick={() => {
                if (!bloqueado && !cargando) {
                  setMostrarMenuAuto(!mostrarMenuAuto);
                  setMostrarMenuPais(false);
                }
              }}
              disabled={bloqueado || cargando}
            >
              <Car className={`${styles.metaIcon} ${
                autoSeleccionado ? styles.metaIconActive : ""}`} />
              {autoSeleccionado && <div className={styles.selectedIndicator} />}
            </button>

            {mostrarMenuAuto && (
              <div className={styles.dropdown}>
                {autosPopulares.map((auto) => (
                  <div
                    key={auto.id}
                    className={`${styles.dropdownItem} ${
                      autoSeleccionado?.id === auto.id
                        ? styles.dropdownItemActive
                        : ""
                    }`}
                    onClick={() => handleAutoSeleccion(auto)}
                  >
                    <div className={styles.autoInfo}>
                      <span className={styles.autoMarca}>
                        {auto.marca} {auto.modelo}
                      </span>
                      <span className={styles.autoDetalle}>
                        {auto.año} • {auto.motor}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  className={`${styles.dropdownItem} ${styles.addCarButton}`}
                  onClick={handleAgregarAuto}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <span className={styles.autoMarca}>Agregar mi auto</span>
                </div>
              </div>
            )}

            <button
              className={`${styles.metaItem} ${
                paisSeleccionado !== "Colombia" ? styles.iconButtonActive : ""
              } ${bloqueado || cargando ? styles.iconButtonDisabled : ""}`}
              onClick={() => {
                if (!bloqueado && !cargando) {
                  setMostrarMenuPais(!mostrarMenuPais);
                  setMostrarMenuAuto(false);
                }
              }}
              disabled={bloqueado || cargando}
            >
              <MapPin className={`${styles.metaIcon} ${
                paisSeleccionado ? styles.metaIconActive : ""}`} />
              {paisSeleccionado !== "Colombia" && (
                <div className={styles.selectedIndicator}></div>
              )}
            </button>

            {mostrarMenuPais && (
              <div className={styles.dropdown}>
                {paises.map((pais) => (
                  <div
                    key={pais.id}
                    className={`${styles.dropdownItem} ${
                      paisSeleccionado === pais.nombre
                        ? styles.dropdownItemActive
                        : ""
                    }`}
                    onClick={() => handlePaisSeleccion(pais)}
                   
                  >
                    <div className={styles.paisInfo}>
                      <span className={styles.paisNombre}>{pais.nombre}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div> */}
      </div>
    </>
  );
};

export default TextareaWithButtons;
