import styles from "@/styles/AsistantMechanic.module.css";
import { ArrowDown } from "lucide-react";
import { useState } from "react";


export default function PreciosSection ({ diagnosticoData }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calcular el rango de precios total
  const calcularRangoPrecios = () => {
    if (!diagnosticoData?.precios || !Array.isArray(diagnosticoData.precios)) {
      return null;
    }

    let minTotal = 0;
    let maxTotal = 0;

    diagnosticoData.precios.forEach(precioItem => {
      const precio = precioItem.precio;
      
      // Extraer números del string de precio
      const numeros = precio.match(/[\d,]+/g);
      if (numeros) {
        const precios = numeros.map(num => parseInt(num.replace(/,/g, '')));
        
        if (precios.length === 2) {
          // Rango: "15,000 - 25,000"
          minTotal += precios[0];
          maxTotal += precios[1];
        } else if (precios.length === 1) {
          // Precio fijo: "20,000"
          minTotal += precios[0];
          maxTotal += precios[0];
        }
      }
    });

    return {
      min: minTotal.toLocaleString(),
      max: maxTotal.toLocaleString(),
      isRange: minTotal !== maxTotal
    };
  };

  const rangoTotal = calcularRangoPrecios();
  
  return (
    // Componente JSX - Una sola card unificada
<section className={styles.sectionAnchor}>
  
  {diagnosticoData?.precios &&
  Array.isArray(diagnosticoData?.precios) &&
  diagnosticoData?.precios.length > 0 ? (
    <div className={styles.priceContainer}>
      
      {/* Card unificada */}
      <div className={styles.priceCard}>
        {/* Header con precio total */}
        <div className={styles.cardHeader}>
            <div className={styles.priceDetails}>
              <h4 className={styles.priceTitle}>Total estimado</h4>
              <div className={styles.totalPrice}>
                <p className={styles.priceAmount}>
                  {rangoTotal?.isRange 
                    ? `$${rangoTotal.min} - $${rangoTotal.max}` 
                    : `$${rangoTotal?.min || '0'}`
                  }
                  <span className={styles.priceCurrency}>COP</span>
                </p>
                
              </div>
            </div>
          
          {/* Botón compacto */}
          <button 
            className={`${styles.toggleBtn} ${isExpanded ? styles.toggleBtnActive : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ocultar' : 'Detalle'}
              {isExpanded ? <ArrowDown size={16} style={{ color: "#6b7280" }} /> : <ArrowDown size={16} style={{ color: "#6b7280" }} />}

          </button>
        </div>

        {/* Desglose detallado dentro de la misma card */}
        <div className={`${styles.breakdown} ${isExpanded ? styles.breakdownExpanded : ''}`}>
          <div className={styles.breakdownContent}>
            <div className={styles.itemsList}>
              {diagnosticoData.precios.map((precioItem, index) => (
                <div key={index} className={styles.priceItem}>
                  <span className={styles.itemName}>{precioItem.item}</span>
                  <span className={styles.itemPrice}>{precioItem.precio}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.disclaimer}>
              <span className={styles.disclaimerIcon}>ℹ️</span>
              <span className={styles.disclaimerText}>
                Precios estimados. Pueden variar según el taller.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📊</div>
      <h4 className={styles.emptyTitle}>Sin estimación disponible</h4>
      <p className={styles.emptyText}>
        No se pudo obtener una estimación de precios para este diagnóstico.
      </p>
    </div>
  )}
</section>
  );
};