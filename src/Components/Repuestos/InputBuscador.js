import CreatableSelect from "react-select/creatable";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import autopartes from "@/src/data/catalogo_autopartes.json";

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    fontWeight: "500",
    color: "#929292",
    maxWidth: "100%",
    width: "100%",
    minWidth: 0,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    backgroundColor: "#EDEDF2",
    flex: 1,
    padding: "0px",
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  singleValue: (provided) => ({
    ...provided,
    maxWidth: "calc(100% - 8px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  input: (provided) => ({
    ...provided,
    maxWidth: "100%",
    overflow: "hidden",
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxWidth: "100%",
    overflow: "hidden",
    flexWrap: "nowrap",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    zIndex: 5,
    maxWidth: "100%",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    maxWidth: "100%",
    maxHeight: "300px",
    overflowY: "auto",
    scrollbarWidth: "thin",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#EDEDF2" : "white",
    color: state.isSelected ? "black" : "#5c5c5c",
    ":hover": {
      backgroundColor: "#EDEDF2",
      color: "black",
    },
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    fontWeight: "500",
    alignItems: "center",
    paddingLeft: "8px",
  }),
};

// Función para truncar texto largo
const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Función para normalizar texto (quitar acentos, convertir a minúsculas, etc.)
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^\w\s]/g, "") // Remover caracteres especiales excepto espacios
    .trim();
};

// Función para filtrar repuestos basada en múltiples campos
const filterRepuestos = (repuestos, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return repuestos.slice(0, 50); // Mostrar primeros 50 cuando no hay búsqueda
  }

  const normalizedSearch = normalizeText(searchTerm);
  const searchWords = normalizedSearch.split(/\s+/).filter(word => word.length > 0);

  return repuestos.filter((repuesto) => {
    // Campos a buscar
    const searchableFields = [
      repuesto.Nombre,
      repuesto.Codigo,
      repuesto.Referencia,
      repuesto.Marca,
      repuesto.Modelo,
      repuesto.Tipo,
      repuesto.Brand,
      repuesto.titulo
    ];

    // Crear un texto combinado de todos los campos
    const combinedText = normalizeText(
      searchableFields.filter(Boolean).join(' ')
    );

    // Verificar si todas las palabras de búsqueda están presentes
    return searchWords.every(word => combinedText.includes(word));
  }).slice(0, 100); // Limitar resultados a 100
};

const createRepuestoOption = (repuesto) => ({
  value: repuesto.titulo,
  label: (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        padding: "4px 0",
        justifyContent: "space-between",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {repuesto.images && repuesto.images[0] ? (
          <img
            src={repuesto.images[0]}
            alt={repuesto.Nombre}
            style={{ 
              width: "24px", 
              height: "24px", 
              objectFit: "contain",
              flexShrink: 0 
            }}
          />
        ) : (
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#EDEDF2",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            🔧
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#5c5c5c",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "auto",
        scrollbarWidth: "none",

            }}
          >
            {repuesto.Nombre}
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
            {repuesto.Codigo && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#888",
                  backgroundColor: "#f5f5f5",
                  padding: "2px 4px",
                  borderRadius: "3px",
                }}
              >
                {repuesto.Codigo}
              </span>
            )}
            
          </div>
        </div>
      </div>
    </div>
  ),
  data: repuesto, // Incluir datos completos del repuesto
  searchableText: normalizeText([
    repuesto.Nombre,
    repuesto.Codigo,
    repuesto.Referencia,
    repuesto.Marca,
    repuesto.Modelo,
    repuesto.Tipo,
    repuesto.Brand
  ].filter(Boolean).join(' '))
});

const placeholders = [
  "Busca repuestos por nombre o código",
  "Encuentra el repuesto que necesitas",
  "Busca por referencia o modelo",
  "Encuentra repuestos para tu vehículo",
  "Busca y compara repuestos",
];

export default function InputBuscador({
  handleChange,
  inputValue,
  onInputChange,
}) {
  const router = useRouter();
  const formatCreateLabel = (inputValue) => `Buscar por "${inputValue}"`;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    router.query.id ? router.query.id.replaceAll("-", " ") : placeholders[0]
  );

  // Memo para las opciones filtradas
  const filteredOptions = useMemo(() => {
    const filtered = filterRepuestos(autopartes, inputValue);
    return filtered.map(createRepuestoOption);
  }, [inputValue]);

  // Función personalizada para el filtro (deshabilitamos el filtro por defecto)
  const filterOption = () => true;

  // Función personalizada para manejar "no options"
  const noOptionsMessage = ({ inputValue }) => {
    if (!inputValue || inputValue.trim() === '') {
      return "Comienza a escribir para buscar repuestos...";
    }
    return `No se encontraron repuestos para "${inputValue}"`;
  };

  return (
    <CreatableSelect
      onChange={handleChange}
      options={filteredOptions}
      styles={customStyles}
      placeholder={currentPlaceholder}
      formatCreateLabel={formatCreateLabel}
      isSearchable
      isClearable
      className={styles.control}
      inputValue={inputValue}
      onInputChange={onInputChange}
      noOptionsMessage={noOptionsMessage}
      closeMenuOnSelect={false}
      filterOption={filterOption} // Deshabilitamos el filtro por defecto
      menuIsOpen={inputValue && inputValue.length > 0 ? undefined : false} // Solo abrir si hay input
      blurInputOnSelect={false}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
}