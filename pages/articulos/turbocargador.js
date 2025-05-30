import React, { useState } from 'react';
import styles2 from '@/styles/MarkDown.module.css'
import styles from '@/styles/TurboInteractivo.module.css'; // Asegúrate de que este archivo CSS exista y tenga los estilos necesarios
import { useRouter } from 'next/router';
import MarkdownContent from '@/src/Components/Articulos/MarkdownContent';
import Layout from '@/src/Components/Layout';
import LayoutGlosario from '@/src/Components/Articulos/Layout';
// Como no podemos importar archivos CSS en este entorno, simularemos los estilos

 let data = `# Turbocargador: La Guía Definitiva para Potenciar tu Motor

## ¿Qué es un Turbocompresor y Cómo Funciona?

El **turbocompresor**, comúnmente conocido como "turbo", es un componente esencial en los motores de combustión interna modernos, diseñado para aumentar significativamente la potencia y la eficiencia del motor. A diferencia de un motor atmosférico que solo aspira el aire ambiente, un turbocompresor fuerza más aire (y, por lo tanto, más oxígeno) en los cilindros, permitiendo una combustión más completa y, en última instancia, una mayor producción de energía.

### Componentes Clave del Turbocompresor

Un turbocompresor consta principalmente de dos secciones principales interconectadas:

1.  **Turbina:** Situada en el flujo de los gases de escape del motor, esta rueda es impulsada por la energía de los gases de escape calientes y de alta presión.
2.  **Compresor:** Conectado a la turbina por un eje común, el compresor aspira aire del exterior y lo comprime antes de enviarlo a la admisión del motor.

### El Principio de Funcionamiento Explicado

El proceso es ingenioso y eficiente:

* **Paso 1: Recolección de Energía de Escape:** Los gases de escape del motor, que normalmente se perderían, se dirigen a la turbina.
* **Paso 2: Rotación de la Turbina:** La energía cinética de estos gases hace girar la turbina a velocidades extremadamente altas (hasta 250,000 RPM).
* **Paso 3: Compresión del Aire:** Como la turbina y el compresor están unidos, la rotación de la turbina impulsa el compresor. El compresor, con su diseño de álabes, aspira el aire ambiente y lo comprime, aumentando su densidad y presión.
* **Paso 4: Envío al Motor:** Este aire comprimido, ahora más denso en oxígeno, se dirige a los cilindros del motor a través del sistema de admisión.
* **Paso 5: Mayor Potencia y Eficiencia:** Con más oxígeno disponible para la combustión, el motor puede quemar más combustible de manera eficiente, lo que se traduce en un aumento notable de la potencia y el par motor, sin necesidad de aumentar el tamaño del motor.

## Ventajas y Desventajas del Turbocompresor

Los turbocompresores han revolucionado la industria automotriz, pero como toda tecnología, tienen sus pros y sus contras.

### Beneficios Principales

* **Aumento Significativo de Potencia:** La ventaja más obvia es el incremento sustancial en la potencia y el par motor. Un motor pequeño con turbo puede superar a un motor atmosférico de mayor cilindrada.
* **Mejora de la Eficiencia de Combustible:** Al extraer más potencia de una cantidad dada de combustible, los motores turbo pueden ser más eficientes, especialmente a cargas bajas y medias.
* **Reducción del Tamaño del Motor (Downsizing):** Permite a los fabricantes utilizar motores más pequeños y ligeros para alcanzar los niveles de potencia deseados, lo que contribuye a un menor peso del vehículo y, en ocasiones, a un mejor consumo de combustible.
* **Menores Emisiones:** Una combustión más eficiente puede llevar a una reducción de ciertas emisiones contaminantes.
* **Rendimiento a Gran Altitud:** Los turbocompresores compensan la menor densidad del aire a grandes altitudes, manteniendo el rendimiento del motor.

### Desventajas Potenciales

* **Turbo Lag (Retardo del Turbocompresor):** Es el tiempo que tarda el turbocompresor en generar presión una vez que se pisa el acelerador. Los avances tecnológicos han reducido este efecto, pero aún puede ser perceptible en algunos vehículos.
* **Mayor Complejidad y Costo:** Los motores con turbo son inherentemente más complejos y costosos de fabricar que los motores atmosféricos, lo que puede influir en el precio inicial del vehículo.
* **Mayor Esfuerzo Térmico:** El turbocompresor trabaja con gases de escape muy calientes, lo que somete a sus componentes a un estrés térmico considerable. Esto requiere materiales de alta calidad y sistemas de enfriamiento adecuados.
* **Mantenimiento Específico:** Requieren un mantenimiento adecuado, incluyendo el uso de aceites de motor de alta calidad y cambios regulares para garantizar su durabilidad.

## Tipos de Turbocompresores

La tecnología del turbocompresor ha evolucionado, dando lugar a diversas configuraciones para adaptarse a diferentes necesidades y aplicaciones.

### Turbocompresor de Geometría Variable (VGT o VTG)

* **Funcionamiento:** Utiliza álabes móviles en la turbina que ajustan el ángulo de ataque del flujo de los gases de escape.
* **Ventajas:** Reduce drásticamente el turbo lag, mejora el rendimiento a bajas RPM y aumenta la eficiencia general.
* **Aplicación:** Común en motores diésel, pero cada vez más en motores de gasolina de alto rendimiento.

### Twin-Turbo (Biturbo)

* **Funcionamiento:** Implica el uso de dos turbocompresores.
    * **Secuencial:** Un turbo más pequeño para bajas RPM y un turbo más grande que entra en acción a mayores RPM.
    * **Paralelo:** Dos turbos del mismo tamaño, cada uno alimentando la mitad de los cilindros del motor.
* **Ventajas:** Ofrece una respuesta más rápida y un rango de potencia más amplio.
* **Aplicación:** Motores V6, V8 y otros motores de alta cilindrada y rendimiento.

### Twin-Scroll (Doble Entrada)

* **Funcionamiento:** La carcasa de la turbina se divide en dos canales separados, cada uno recibiendo pulsos de escape de diferentes cilindros de forma escalonada.
* **Ventajas:** Minimiza la interferencia de los pulsos de escape, lo que mejora la eficiencia de la turbina y reduce el turbo lag.
* **Aplicación:** Ampliamente utilizado en motores de cuatro cilindros y algunos motores de seis cilindros.

### E-Turbo (Turbocompresor Eléctrico)

* **Funcionamiento:** Incorpora un motor eléctrico en el eje del turbocompresor que puede hacer girar el compresor independientemente de los gases de escape, especialmente a bajas RPM.
* **Ventajas:** Elimina prácticamente el turbo lag, proporciona un impulso instantáneo y puede recuperar energía.
* **Aplicación:** Tecnología emergente en vehículos híbridos y de alto rendimiento.

### Supercargador (Aunque no es un turbocompresor, a menudo se confunde)

Es importante diferenciar el supercargador del turbocompresor. Aunque ambos sobrealimentan el motor, el supercargador es impulsado directamente por el cigüeñal del motor mediante una correa, mientras que el turbocompresor utiliza los gases de escape.

## Mantenimiento y Cuidados del Turbocompresor

La durabilidad de un turbocompresor depende en gran medida de un mantenimiento adecuado y de hábitos de conducción conscientes.

### Consejos Clave para la Vida Útil de tu Turbo

* **Aceite de Motor de Calidad:** Utiliza siempre el tipo y la viscosidad de aceite recomendados por el fabricante. El turbo opera a altas temperaturas y RPM, y un aceite de alta calidad es crucial para su lubricación y enfriamiento.
* **Cambios de Aceite Regulares:** Sigue el intervalo de cambio de aceite recomendado. El aceite sucio o degradado puede acumular depósitos y afectar la lubricación del eje del turbo.
* **Calentamiento y Enfriamiento del Motor:**
    * **Calentamiento:** Antes de exigir el máximo rendimiento al motor, permite que alcance su temperatura de funcionamiento ideal para que el aceite circule correctamente y lubrique el turbo.
    * **Enfriamiento (Turbo Timer):** Después de un viaje exigente, evita apagar el motor inmediatamente. Deja que funcione en ralentí por unos minutos para que el turbo se enfríe y el aceite siga circulando, evitando el "coqueo" del aceite en el eje del turbo.
* **Filtro de Aire Limpio:** Un filtro de aire obstruido restringe el flujo de aire al compresor, lo que puede forzar al turbo a trabajar más y potencialmente reducir su vida útil.
* **Atención a Ruidos y Síntomas Anormales:** Presta atención a ruidos extraños (silbidos agudos, chirridos), humo inusual por el escape (azul o blanco), o pérdida de potencia. Estos pueden ser indicadores de un problema con el turbo.
* **Conducción Suave:** Evita aceleraciones bruscas y repentinas, especialmente en frío.

## Problemas Comunes del Turbocompresor

Aunque son componentes robustos, los turbocompresores pueden experimentar fallas.

### Señales de Avería del Turbo

* **Ruido de Silbido Excesivo:** Un silbido fuerte, similar a una sirena, puede indicar desgaste en los rodamientos o fugas en el sistema de admisión/escape.
* **Humo Azul o Blanco del Escape:** El humo azul indica que el aceite del motor se está quemando, posiblemente debido a sellos del turbo defectuosos. El humo blanco puede ser un indicio de aceite quemado o de fugas en el sistema de enfriamiento del turbo.
* **Pérdida de Potencia:** Una reducción significativa en la potencia del motor es un síntoma claro de un turbo que no está funcionando correctamente.
* **Consumo Excesivo de Aceite:** Si notas que el nivel de aceite disminuye rápidamente sin fugas visibles, el turbo podría estar enviando aceite al sistema de admisión o escape.
* **Luz de "Check Engine":** La computadora del vehículo puede encender la luz de "check engine" si detecta un problema con el sistema de sobrealimentación.

### Causas Comunes de Fallas

* **Falta de Lubricación:** La causa más común. Aceite sucio, bajo nivel de aceite o intervalos de cambio inadecuados.
* **Contaminación del Aceite:** Partículas metálicas o residuos en el aceite pueden dañar los rodamientos del turbo.
* **Objetos Extraños:** Pequeñas partículas (polvo, arena) que ingresan al compresor o turbina pueden causar daños severos a los álabes.
* **Sobrecalentamiento:** Un enfriamiento inadecuado o un apagado repentino después de un uso intenso pueden carbonizar el aceite, dañando los rodamientos.
* **Desgaste Natural:** Con el tiempo y el kilometraje, los componentes internos se desgastan.

## El Futuro del Turbocompresor: Innovación Continua

La tecnología del turbocompresor sigue evolucionando rápidamente, impulsada por la necesidad de motores más potentes, eficientes y limpios.

* **Electrificación y E-Turbos:** La integración de motores eléctricos promete eliminar el turbo lag y mejorar aún más la eficiencia.
* **Materiales Avanzados:** El desarrollo de materiales más ligeros y resistentes a altas temperaturas permitirá turbos más pequeños, eficientes y duraderos.
* **Control Electrónico Sofisticado:** Sistemas de gestión del motor más avanzados permitirán un control aún más preciso de la presión del turbo y una integración más fluida con otros sistemas del vehículo.

## Conclusión: El Turbocompresor, un Pilar de la Ingeniería Automotriz

El turbocompresor ha transformado el panorama automotriz, permitiendo a los vehículos ser más potentes, eficientes y respetuosos con el medio ambiente. Desde sus inicios hasta las innovaciones actuales, el turbo continúa siendo una pieza fundamental en la búsqueda del rendimiento óptimo. Comprender su funcionamiento, sus ventajas y cómo mantenerlo es clave para cualquier entusiasta del mundo automotor.

---

**Palabras Clave SEO:** turbocompresor, turbo, funcionamiento turbocompresor, partes turbocompresor, ventajas turbo, desventajas turbo, tipos de turbo, turbo lag, mantenimiento turbo, problemas turbo, turbo diésel, turbo gasolina, supercargador, twin turbo, turbo geometría variable, e-turbo, potenciar motor, eficiencia motor, coches turbo, mecánica automotriz, sobrealimentación.`
const TurboInteractivo = () => {
     const router = useRouter()
    
      let productoMarcado = {
    titulo: 'Turbocompresor: La Guía Definitiva para Potenciar tu Motor',
    image: '/turboimg.jpg',
    description: 'Descubre todo sobre el turbocompresor: qué es, cómo funciona, sus ventajas y desventajas, tipos (VGT, Twin-Turbo, E-Turbo), mantenimiento esencial y solución de problemas comunes. ¡Potencia y eficiencia para tu vehículo!',
    keywords: 'turbocompresor, turbo, funcionamiento turbo, ventajas turbo, tipos turbo, mantenimiento turbo, problemas turbo, potencia motor, eficiencia, automotriz',
    type: 'Artículo', // O 'Product' si estás vendiendo turbos, 'WebPage' si es solo informativo sin un foco específico en "articulo"
    url: router.asPath, // Esto ya está correcto, asume que `router.asPath` es el path actual de la URL.
    fecha: '2025-05-30' // Fecha actual, puedes ajustarla si el artículo se publica en otro momento.
    , tags: [ 'turbocompresor', 'turbo', 'funcionamiento turbo', 'ventajas turbo', 'tipos turbo', 'mantenimiento turbo', 'problemas turbo', 'potencia motor', 'eficiencia', 'automotriz']
};
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);

  const turboParts = {
    exhaustInlet: {
      name: "Entrada de Escape",
      description: "Parte que recibe los gases del múltiple de escape y los dirige hacia la turbina. Generalmente forma parte del conjunto de la carcasa de la turbina.",
      function: "Canaliza los gases de escape hacia la turbina para generar movimiento",
      color: "#4a90e2"
    },
    turbineHousing: {
      name: "Carcasa de la Turbina",
      description: "Carcasa construida para resistir temperaturas extremas (hasta 1050°C). Dirige los gases de escape calientes hacia el impulsor de la turbina de manera eficiente.",
      function: "Canaliza los gases de escape para impulsar la turbina",
      color: "#4a90e2"
    },
    centerHousing: {
      name: "Carcasa Central (CHRA)",
      description: "Centro de Ensamblaje de Cojinetes Rotativos. Contiene los cojinetes de alta precisión, el eje principal y los conductos de aceite y refrigerante.",
      function: "Soporta el eje giratorio y proporciona lubricación y refrigeración",
      color: "#4a90e2"
    },
    compressorHousing: {
      name: "Carcasa del Compresor",
      description: "Carcasa espiral (voluta) que alberga el impulsor del compresor. Su forma caracol optimiza el flujo de aire comprimido hacia el motor, aumentando la velocidad y presión del aire.",
      function: "Recoge y dirige el aire comprimido desde el impulsor hacia la salida",
      color: "#4a90e2"
    },
    wastegate: {
      name: "Wastegate y Actuador",
      description: "Sistema de control de presión compuesto por una válvula de derivación y un actuador neumático que responde a la presión de boost del motor.",
      function: "Controla la presión máxima desviando gases de escape cuando es necesario",
      color: "#4a90e2"
    }
  };

  const handlePartClick = (partId) => {
    setSelectedPart(partId === selectedPart ? null : partId);
  };

  const handlePartHover = (partId) => {
    setHoveredPart(partId);
  };

  const handlePartLeave = () => {
    setHoveredPart(null);
  };

  const getInteractiveAreaClasses = (partId) => {
    let classes = `${styles.interactiveArea} ${styles[partId]}`;
    if (hoveredPart === partId) classes += ` ${styles.hovered}`;
    if (selectedPart === partId) classes += ` ${styles.selected}`;
    return classes;
  };

  const getLegendItemClasses = (partId) => {
    let classes = styles.legendItem;
    if (selectedPart === partId) classes += ` ${styles.selected}`;
    return classes;
  };

  return (
     <Layout 
          title={productoMarcado.titulo}
          productoMarcado={productoMarcado}
          description={productoMarcado.description}
          keywords={productoMarcado.keywords}
          type='article'
          fecha={productoMarcado?.createdAt} image={productoMarcado?.image} tags={productoMarcado?.tags}
          url={router?.asPath}>
    
           <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Turbocompresor Interactivo
        </h1>
        <p className={styles.subtitle}>
          Explora cada componente del turbocompresor real
        </p>

        <div className={styles.mainGrid}>
          {/* Image with Interactive Areas */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <img
                  src="/turboimg.jpg"
                  alt="Turbocompresor"
                  className={styles.turboImage}
                />

                {/* Interactive Areas */}
                {Object.keys(turboParts).map((partId) => (
                  <div
                    key={partId}
                    className={getInteractiveAreaClasses(partId)}
                    onClick={() => handlePartClick(partId)}
                    onMouseEnter={() => handlePartHover(partId)}
                    onMouseLeave={handlePartLeave}
                  >
                    {hoveredPart === partId && (
                      <div className={styles.tooltip}>
                        {turboParts[partId].name}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className={styles.instructions}>
                <p className={styles.instructionsText}>
                  {selectedPart ? 'Componente seleccionado - Haz clic en otro para comparar' : 'Pasa el cursor y haz clic en cada componente'}
                </p>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className={styles.infoSection}>
            {selectedPart ? (
              <div className={styles.infoPanel}>
                <div className={styles.infoPanelHeader}>
                  <div
                    className={styles.colorIndicator}
                    style={{ backgroundColor: turboParts[selectedPart].color }}
                  ></div>
                  <h2 className={styles.infoTitle}>
                    {turboParts[selectedPart].name}
                  </h2>
                </div>

                <div className={styles.infoContent}>
                  <div>
                    <h3 className={styles.infoSubtitle}>Descripción:</h3>
                    <p className={styles.infoText}>
                      {turboParts[selectedPart].description}
                    </p>
                  </div>
                  <div>
                    <h3 className={styles.infoSubtitle}>Función Principal:</h3>
                    <p className={styles.infoText}>
                      {turboParts[selectedPart].function}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPart(null)}
                  className={styles.backButton}
                >
                  Explorar otros componentes
                </button>
              </div>
            ) : (
              <div className={styles.defaultPanel}>
                <h2 className={styles.defaultTitle}>Turbocompresor: Potencia Inteligente</h2>
                <div className={styles.defaultContent}>
                  <p className={styles.defaultText}>
                    El turbocompresor aprovecha los gases de escape "desperdiciados" para comprimir el aire
                    que ingresa al motor, aumentando significativamente la potencia sin incrementar el tamaño del motor.
                  </p>

                  <div className={styles.sidesGrid}>
                    <div className={`${styles.sideBox} ${styles.sideBoxCold}`}>
                      <div className={styles.sideBoxHeader}>
                        <div className={`${styles.sideBoxIndicator} ${styles.sideBoxIndicatorCold}`}></div>
                        <span className={styles.sideBoxTitle}>Lado Frío</span>
                      </div>
                      <p className={styles.sideBoxText}>Compresor de aire</p>
                    </div>
                    <div className={`${styles.sideBox} ${styles.sideBoxHot}`}>
                      <div className={styles.sideBoxHeader}>
                        <div className={`${styles.sideBoxIndicator} ${styles.sideBoxIndicatorHot}`}></div>
                        <span className={styles.sideBoxTitle}>Lado Caliente</span>
                      </div>
                      <p className={styles.sideBoxText}>Turbina de escape</p>
                    </div>
                  </div>

                  <p className={styles.defaultText}>
                    <strong>Proceso:</strong> Los gases calientes impulsan la turbina → La turbina mueve el compresor →
                    El compresor succiona y comprime aire → Más oxígeno = más combustible = más potencia.
                  </p>

                  <div className={styles.highlightBox}>
                    <p className={styles.highlightText}>
                      <span style={{ marginRight: '0.5rem' }}>🔍</span>
                      Explora cada componente para entender su función específica
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Component Legend */}
            <div className={styles.componentLegend}>
              <h3 className={styles.legendTitle}>Componentes</h3>
              <div className={styles.legendList}>
                {Object.entries(turboParts).map(([key, part]) => (
                  <div
                    key={key}
                    className={getLegendItemClasses(key)}
                    onClick={() => handlePartClick(key)}
                    onMouseEnter={() => handlePartHover(key)}
                    onMouseLeave={handlePartLeave}
                  >
                    <div
                      className={styles.legendIndicator}
                      style={{ backgroundColor: part.color }}
                    ></div>
                    <span className={styles.legendText}>{part.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className={styles.specsGrid}>
              <div className={styles.specCard}>
                <h3 className={styles.specTitle}>Velocidad</h3>
                <p className={styles.specValue}>300,000</p>
                <p className={styles.specUnit}>RPM máximo</p>
              </div>
              <div className={styles.specCard}>
                <h3 className={styles.specTitle}>Temperatura</h3>
                <p className={styles.specValue}>1050°C</p>
                <p className={styles.specUnit}>Gases de escape</p>
              </div>
              <div className={styles.specCard}>
                <h3 className={styles.specTitle}>Presión</h3>
                <p className={styles.specValue}>2.5 bar</p>
                <p className={styles.specUnit}>Boost típico</p>
              </div>
              <div className={styles.specCard}>
                <h3 className={styles.specTitle}>Eficiencia</h3>
                <p className={styles.specValue}>75%</p>
                <p className={styles.specUnit}>Energía aprovechada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div style={{margin:'0 auto', width:'100%', maxWidth:'1000px'}} className={styles2.containerBig}>
          {/* <AsideGlosario /> */}
          <main className={styles2.containerMain}>
            <div className={styles2.container}>
              {/* <p style={{fontSize:'14px', fontWeight:'500', color:'#A6AEC1'}}>Glosario - {router.query.id.split('-')[0]}</p> */}
            <MarkdownContent content={data} />
            </div>
            {/* <ArticulosRelacionados /> */}
            {/* <BottomArticulo palabras={data?.palabrasClave} /> */}
          </main>
        </div>
        </Layout>
   
  );
};

export default TurboInteractivo;

// export async function getStaticProps({ params }) {
//   const parts = params?.slug;

//   const { data, error } = await client.query(
//     {
//       query: GET_TERMINO,
//       variables: { slug: parts[0]  || "" },
//     }
//   )
  
//   return {
//     props: {
//       data: data?.getTermino,
//     },
//     // revalidate:86400
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [], 
//     fallback: "blocking", // Genera las páginas bajo demanda
//   };
// }
