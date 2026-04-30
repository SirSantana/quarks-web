"use client";

import { useState, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────
const VEHICLE_TREE = {
  id: "root",
  label: "Tu Vehículo",
  icon: "🚗",
  color: "#111827",
  accent: "#F3F4F6",
  info: "Sistema completo de un automóvil moderno. Selecciona cualquier sistema para explorar sus componentes en detalle.",
  children: [
    {
      id: "motor",
      label: "Motor",
      icon: "⚙️",
      color: "#1D4ED8",
      accent: "#DBEAFE",
      info: "El corazón del vehículo. Convierte la energía química del combustible en energía mecánica mediante el ciclo de combustión interna de 4 tiempos.",
      stat1: { label: "Cilindros típicos", value: "4 – 8" },
      stat2: { label: "RPM máximas", value: "~6,500" },
      children: [
        {
          id: "bloque",
          label: "Bloque del Motor",
          icon: "🧱",
          color: "#1E40AF",
          accent: "#EFF6FF",
          info: "Estructura principal de hierro fundido o aluminio que alberga los cilindros, pistones y el cigüeñal. Es el esqueleto del motor.",
          stat1: { label: "Material", value: "Aluminio" },
          stat2: { label: "Peso aprox.", value: "30 – 80 kg" },
          children: [
            {
              id: "cilindros",
              label: "Cilindros",
              icon: "🔲",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Cámaras donde ocurre la combustión. Un motor de 4 cilindros genera entre 70 y 120 CV típicamente. El diámetro se llama 'bore'.",
              stat1: { label: "Cantidad típica", value: "4 cil." },
              stat2: { label: "Potencia", value: "70 – 120 CV" },
            },
            {
              id: "pistones",
              label: "Pistones",
              icon: "⬆️",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Se mueven arriba y abajo dentro de los cilindros transmitiendo la fuerza de la explosión al cigüeñal a miles de RPM.",
              stat1: { label: "Material", value: "Aluminio forjado" },
              stat2: { label: "Velocidad", value: "hasta 25 m/s" },
            },
            {
              id: "ciguenyal",
              label: "Cigüeñal",
              icon: "🔄",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Convierte el movimiento lineal de los pistones en movimiento rotativo. Gira a miles de RPM y transmite la potencia a la transmisión.",
              stat1: { label: "Material", value: "Acero forjado" },
              stat2: { label: "Velocidad", value: "800 – 7000 RPM" },
            },
            {
              id: "bielas",
              label: "Bielas",
              icon: "🦴",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "El brazo articulado que une el pistón con el cigüeñal. Transforma el empuje vertical en rotación.",
              stat1: { label: "Material", value: "Acero forjado" },
              stat2: { label: "Esfuerzo", value: "Alta tracción" },
            },
            {
              id: "camisas",
              label: "Camisas de Cilindro",
              icon: "🧥",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Revestimientos de metal duro insertados en los cilindros para resistir el desgaste del roce de los pistones.",
              stat1: { label: "Tipo", value: "Secas / Húmedas" },
              stat2: { label: "Dureza", value: "Alta resistencia" },
            },
            {
              id: "cojinetes",
              label: "Cojinetes / Casquillos",
              icon: "🛞",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Láminas de metal suave que reducen la fricción entre el cigüeñal y el bloque. Evitan el contacto metal con metal.",
              stat1: { label: "Material", value: "Bimetal / Trimetal" },
              stat2: { label: "Lubricación", value: "Hidrodinámica" },
            },
            {
              id: "conductos_refrigeracion",
              label: "Galerías de Agua",
              icon: "🌊",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Canales internos fundidos en el bloque por donde circula el refrigerante para absorber el calor de los cilindros.",
              stat1: { label: "Presión", value: "1.0 – 1.5 bar" },
              stat2: { label: "Función", value: "Control térmico" },
            },
            {
              id: "segmentos",
              label: "Segmentos / Anillos",
              icon: "⭕",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Aros metálicos situados en la cabeza del pistón. Sellan la cámara de combustión y barren el exceso de aceite de las paredes.",
              stat1: { label: "Tipo", value: "Compresión/Aceite" },
              stat2: { label: "Material", value: "Acero al carbono" },
            },
            {
              id: "bancadas",
              label: "Bancadas del Cigüeñal",
              icon: "🏗️",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Puntos de apoyo reforzados donde el cigüeñal se une al bloque. Mantienen el eje alineado a pesar de las explosiones.",
              stat1: {
                label: "Sujeción",
                value: "Tornillos de alta resistencia",
              },
              stat2: { label: "Componente", value: "Tapa de bancada" },
            },
            {
              id: "tapones_bloque",
              label: "Tapones de Expansión",
              icon: "🟡",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Discos metálicos diseñados para saltar si el refrigerante se congela, evitando que la presión del hielo raje el bloque.",
              stat1: { label: "Material", value: "Latón / Acero" },
              stat2: { label: "Función", value: "Seguridad térmica" },
            },
            {
              id: "reten_ciguenyal",
              label: "Retén del Cigüeñal",
              icon: "⭕",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Junta circular de goma que impide que el aceite se escape por los extremos del cigüeñal hacia la caja de cambios.",
              stat1: { label: "Ubicación", value: "Extremos del eje" },
              stat2: { label: "Material", value: "Viton / Silicona" },
            },
            {
              id: "sensores_bloque",
              label: "Sensores de Bloque",
              icon: "🔌",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Incluye el sensor de picado (Knock) y el de posición del cigüeñal (CKP). Permiten a la computadora ajustar el encendido.",
              stat1: { label: "Tipo", value: "Piezoeléctrico/Hall" },
              stat2: { label: "Función", value: "Monitoreo" },
            },
            {
              id: "soportes_motor",
              label: "Soportes de Motor",
              icon: "🏗️",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Puntos de anclaje que unen el bloque al chasis. Tienen silentblocks de goma para absorber las vibraciones.",
              stat1: { label: "Material", value: "Acero y Goma" },
              stat2: { label: "Vida útil", value: "80 – 120 mil km" },
            },
            {
              id: "galerias_aceite",
              label: "Galerías de Aceite",
              icon: "🧪",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Conductos internos que llevan el lubricante desde la bomba hacia el cigüeñal y hasta la parte superior del motor.",
              stat1: { label: "Presión", value: "Variable por RPM" },
              stat2: { label: "Mantenimiento", value: "Limpieza interna" },
            },
            {
              id: "bulon_piston",
              label: "Bulón del Pistón",
              icon: "📍",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Pasador de acero que articula el pistón con la biela. Debe soportar presiones extremas sin deformarse.",
              stat1: { label: "Material", value: "Acero templado" },
              stat2: { label: "Tipo", value: "Flotante / Fijo" },
            },
            {
              id: "sensores_bloque",
              label: "Sensores de Bloque",
              icon: "🔌",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Incluye el sensor de picado (Knock) y el de posición del cigüeñal (CKP). Permiten a la computadora ajustar el encendido.",
              stat1: { label: "Tipo", value: "Piezoeléctrico/Hall" },
              stat2: { label: "Función", value: "Monitoreo" },
            },
            {
              id: "soportes_motor",
              label: "Soportes de Motor",
              icon: "🏗️",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Puntos de anclaje que unen el bloque al chasis. Tienen silentblocks de goma para absorber las vibraciones.",
              stat1: { label: "Material", value: "Acero y Goma" },
              stat2: { label: "Vida útil", value: "80 – 120 mil km" },
            },
            {
              id: "galerias_aceite",
              label: "Galerías de Aceite",
              icon: "🧪",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Conductos internos que llevan el lubricante desde la bomba hacia el cigüeñal y hasta la parte superior del motor.",
              stat1: { label: "Presión", value: "Variable por RPM" },
              stat2: { label: "Mantenimiento", value: "Limpieza interna" },
            },
            {
              id: "bulon_piston",
              label: "Bulón del Pistón",
              icon: "📍",
              color: "#1E3A8A",
              accent: "#F0F9FF",
              info: "Pasador de acero que articula el pistón con la biela. Debe soportar presiones extremas sin deformarse.",
              stat1: { label: "Material", value: "Acero templado" },
              stat2: { label: "Tipo", value: "Flotante / Fijo" },
            },
          ],
        },
        {
          id: "culata",
          label: "Culata",
          icon: "🔩",
          color: "#2563EB",
          accent: "#EFF6FF",
          info: "Tapa superior del bloque. Contiene las válvulas, bujías y los conductos de admisión y escape. Sellada por la junta de culata.",
          stat1: { label: "Válvulas por cil.", value: "2 – 5" },
          stat2: { label: "Temp. operación", value: "~90 °C" },
          children: [
            {
              id: "valvulas",
              label: "Válvulas",
              icon: "🚪",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Abren y cierran para dejar entrar la mezcla y salir los gases. Cada cilindro tiene al menos 2 (admisión + escape).",
              stat1: { label: "Por cilindro", value: "2 – 5 válv." },
              stat2: { label: "Material", value: "Acero inox." },
            },
            {
              id: "bujias",
              label: "Bujías",
              icon: "⚡",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Generan la chispa que enciende la mezcla aire-combustible. Se reemplazan cada 30,000–60,000 km según el tipo.",
              stat1: { label: "Recambio", value: "30 – 60 mil km" },
              stat2: { label: "Voltaje chispa", value: "~20,000 V" },
            },
            {
              id: "arbol_levas",
              label: "Árbol de Levas",
              icon: "🌀",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Controla la apertura y cierre de las válvulas sincronizado con el cigüeñal mediante la correa o cadena de distribución.",
              stat1: { label: "Relación giro", value: "2:1 con cigüeñal" },
              stat2: { label: "Distribución", value: "Correa / cadena" },
            },
            {
              id: "junta_culata",
              label: "Junta de Culata",
              icon: "🎚️",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Lámina crítica que sella la unión entre el bloque y la culata. Evita que el refrigerante, el aceite y los gases de combustión se mezclen.",
              stat1: { label: "Material", value: "Multilámina acero" },
              stat2: { label: "Espesor", value: "0.5 – 1.5 mm" },
            },
            {
              id: "muelles_valvula",
              label: "Muelles de Válvula",
              icon: "🌀",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Resortes de alta resistencia que aseguran que las válvulas regresen a su posición cerrada rápidamente tras ser empujadas por las levas.",
              stat1: { label: "Esfuerzo", value: "Alta fatiga" },
              stat2: { label: "Material", value: "Aleación cromo" },
            },
            {
              id: "inyectores",
              label: "Inyectores",
              icon: "💉",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Pulverizan el combustible a alta presión directamente en la cámara (Inyección Directa) o en el colector (Indirecta).",
              stat1: { label: "Presión", value: "50 – 2000 bar" },
              stat2: { label: "Control", value: "Electrónico ECU" },
            },
            {
              id: "balancines_taques",
              label: "Balancines / Taqués",
              icon: "⚖️",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Piezas que transmiten el movimiento del árbol de levas a las válvulas. Los hidráulicos eliminan la necesidad de reglaje manual.",
              stat1: { label: "Tipo", value: "Hidráulico / Mecánico" },
              stat2: { label: "Ajuste", value: "Automático (Hyd)" },
            },
            {
              id: "guia_valvula",
              label: "Guías y Asientos",
              icon: "🔘",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Casquillos que mantienen la válvula centrada y anillos de metal duro donde esta apoya para sellar la cámara de combustión.",
              stat1: { label: "Material", value: "Bronce / Acero" },
              stat2: { label: "Función", value: "Sellado y Centrado" },
            },
            {
              id: "tapa_balancines",
              label: "Tapa de Balancines",
              icon: "🧢",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Cubierta superior que protege el tren de válvulas y evita fugas de aceite. Contiene el tapón de llenado de lubricante.",
              stat1: { label: "Sello", value: "Junta de goma" },
              stat2: { label: "Material", value: "Plástico / Alu" },
            },
            {
              id: "retenes_valvula",
              label: "Retenes de Válvula",
              icon: "💍",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Pequeños sellos de caucho que evitan que el aceite de la culata se deslice por la guía de la válvula hacia la cámara de combustión.",
              stat1: { label: "Falla común", value: "Humo azulado" },
              stat2: { label: "Material", value: "Caucho sintético" },
            },
            {
              id: "conductos_admision_escape",
              label: "Lumbreras / Puertos",
              icon: "🕳️",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Túneles esculpidos dentro de la culata que guían el aire fresco hacia las válvulas de admisión y los gases quemados hacia el escape.",
              stat1: { label: "Diseño", value: "Flujo optimizado" },
              stat2: { label: "Acabado", value: "Pulido / Rugoso" },
            },
            {
              id: "sensor_fase",
              label: "Sensor de Fase (CMP)",
              icon: "🔌",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Informa a la computadora la posición exacta del árbol de levas para sincronizar la inyección y la chispa en el momento justo.",
              stat1: { label: "Tipo", value: "Efecto Hall" },
              stat2: { label: "Importancia", value: "Sincronización" },
            },
            {
              id: "tornillos_culata",
              label: "Pernos de Culata",
              icon: "🔩",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Tornillos de alta resistencia que sujetan la culata al bloque. Se aprietan con un torque específico y en un orden estricto.",
              stat1: { label: "Apriete", value: "Torque + Ángulo" },
              stat2: { label: "Tipo", value: "Deformación elástica" },
            },
            {
              id: "camara_combustion",
              label: "Cámara de Combustión",
              icon: "💥",
              color: "#1D4ED8",
              accent: "#DBEAFE",
              info: "Espacio hueco en la culata donde se comprime la mezcla y ocurre la explosión. Su forma determina la eficiencia del motor.",
              stat1: { label: "Volumen", value: "40 – 60 cc" },
              stat2: { label: "Forma", value: "Hemisférica / Cuña" },
            },
          ],
        },
        {
          id: "lubricacion",
          label: "Lubricación",
          icon: "🛢️",
          color: "#3B82F6",
          accent: "#EFF6FF",
          info: "Distribuye aceite por todo el motor para reducir fricción, disipar calor y limpiar residuos de combustión.",
          stat1: { label: "Cambio de aceite", value: "5 – 10 mil km" },
          stat2: { label: "Presión típica", value: "3 – 5 bar" },
          children: [
            {
              id: "bomba_aceite",
              label: "Bomba de Aceite",
              icon: "💧",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Impulsa el aceite desde el cárter hacia todas las partes móviles del motor a presión constante.",
              stat1: { label: "Tipo", value: "Rotatoria" },
              stat2: { label: "Presión", value: "3 – 5 bar" },
            },
            {
              id: "filtro_aceite",
              label: "Filtro de Aceite",
              icon: "🫙",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Elimina impurezas y partículas metálicas del aceite. Cambiar en cada cambio de aceite (5,000–10,000 km).",
              stat1: { label: "Recambio", value: "5 – 10 mil km" },
              stat2: { label: "Filtración", value: "15 – 25 µm" },
            },
            {
              id: "carter_aceite",
              label: "Cárter",
              icon: "🥣",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Depósito metálico en la base del motor donde se acumula el aceite. Actúa como radiador pasivo para enfriar el líquido.",
              stat1: { label: "Capacidad", value: "4 – 7 Litros" },
              stat2: { label: "Material", value: "Acero / Aluminio" },
            },
            {
              id: "enfriador_aceite",
              label: "Enfriador de Aceite",
              icon: "❄️",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Intercambiador de calor que utiliza el refrigerante del motor para bajar la temperatura del aceite en condiciones de alta carga.",
              stat1: { label: "Tipo", value: "Placas / Radiador" },
              stat2: { label: "Mejora", value: "Vida del motor" },
            },
            {
              id: "bulbo_presion",
              label: "Sensor de Presión",
              icon: "🚨",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Mide la presión del flujo. Si baja de un nivel seguro, enciende el testigo rojo en el tablero para evitar que el motor se gripe.",
              stat1: { label: "Umbral min.", value: "~0.5 bar" },
              stat2: { label: "Conexión", value: "Hacia la ECU" },
            },
            {
              id: "varilla_medicion",
              label: "Varilla de Nivel",
              icon: "📏",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Herramienta manual para verificar el volumen de aceite. Indica los niveles mínimo y máximo recomendados por el fabricante.",
              stat1: { label: "Chequeo", value: "Cada 1,000 km" },
              stat2: { label: "Importancia", value: "Mantenimiento" },
            },
            {
              id: "alcachofa_aceite",
              label: "Tubo de Aspiración",
              icon: "🚿",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Tubo sumergido en el cárter con un tamiz metálico que evita que partículas grandes entren a la bomba de aceite.",
              stat1: { label: "Componente", value: "Malla filtrante" },
              stat2: { label: "Ubicación", value: "Fondo del cárter" },
            },
            {
              id: "valvula_alivio",
              label: "Válvula de Alivio",
              icon: "🛡️",
              color: "#2563EB",
              accent: "#DBEAFE",
              info: "Regula el exceso de presión cuando el aceite está frío o el motor va a altas RPM, devolviendo el sobrante al cárter.",
              stat1: { label: "Apertura", value: "5 – 6 bar" },
              stat2: { label: "Seguridad", value: "Evita explosión filtro" },
            },
          ],
        },
        {
          id: "admision_escape",
          label: "Admisión y Escape",
          icon: "🌬️",
          color: "#4B5563",
          accent: "#F3F4F6",
          info: "Gestiona el flujo de aire hacia el motor y la salida de gases quemados. Crucial para la eficiencia y el control de emisiones.",
          stat1: { label: "Relación aire/comb", value: "14.7:1" },
          stat2: { label: "Flujo de aire", value: "~200 kg/h" },
          children: [
            {
              id: "colector_admision",
              label: "Colector de Admisión",
              icon: "🐙",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Distribuye la mezcla de aire de forma equitativa a cada cilindro. Suele ser de polímero plástico o aluminio.",
              stat1: { label: "Material", value: "Polímero/Alu" },
              stat2: { label: "Presión", value: "Atmosférica/Turbo" },
            },
            {
              id: "filtro_aire",
              label: "Filtro de Aire",
              icon: "🌫️",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Retiene partículas de polvo y suciedad para que no entren a la cámara de combustión y rayen los cilindros.",
              stat1: { label: "Recambio", value: "15 – 30 mil km" },
              stat2: { label: "Eficiencia", value: "99.9%" },
            },
            {
              id: "colector_escape",
              label: "Colector de Escape",
              icon: "🔥",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Recoge los gases calientes de los cilindros y los dirige hacia el catalizador y el silenciador.",
              stat1: { label: "Temperatura", value: "hasta 800 °C" },
              stat2: { label: "Material", value: "Hierro fundido" },
            },
            {
              id: "cuerpo_mariposa",
              label: "Cuerpo de Aceleración",
              icon: "🦋",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Válvula que regula la cantidad de aire que entra al motor según cuánto pises el acelerador. Controla las RPM en ralentí.",
              stat1: { label: "Control", value: "Electrónico (Drive-by-wire)" },
              stat2: { label: "Falla común", value: "Ralentí inestable" },
            },
            {
              id: "caudalimetro_maf",
              label: "Sensor MAF",
              icon: "🌡️",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Mide la masa de aire que entra para que la computadora (ECU) sepa cuánto combustible inyectar exactamente.",
              stat1: { label: "Tipo", value: "Hilo caliente" },
              stat2: { label: "Precisión", value: "Alta" },
            },
            {
              id: "turbocompresor",
              label: "Turbocompresor",
              icon: "🌀",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Usa la energía de los gases de escape para girar una turbina que mete aire a presión, aumentando drásticamente la potencia.",
              stat1: { label: "RPM Turbo", value: "hasta 200,000" },
              stat2: { label: "Presión", value: "0.5 – 2.0 bar" },
            },
            {
              id: "valvula_egr",
              label: "Válvula EGR",
              icon: "♻️",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Recircula una parte de los gases de escape hacia la admisión para reducir las temperaturas de combustión y los óxidos de nitrógeno (NOx).",
              stat1: { label: "Función", value: "Reducir emisiones" },
              stat2: { label: "Efecto", value: "Combustión limpia" },
            },
            {
              id: "catalizador",
              label: "Catalizador",
              icon: "🧪",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Convierte gases tóxicos (CO, HC, NOx) en gases menos nocivos mediante reacciones químicas con metales preciosos.",
              stat1: { label: "Material", value: "Platino / Rodio" },
              stat2: { label: "Temp. mínima", value: "400 °C" },
            },
            {
              id: "sensor_oxigeno",
              label: "Sonda Lambda",
              icon: "🧬",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Mide la cantidad de oxígeno en el escape para ajustar la mezcla aire/combustible en tiempo real.",
              stat1: { label: "Ubicación", value: "Antes/Desp. Cataliz." },
              stat2: { label: "Relación", value: "Lambda = 1.0" },
            },
            {
              id: "silenciador",
              label: "Silenciador",
              icon: "🔇",
              color: "#374151",
              accent: "#F9FAFB",
              info: "Cámara diseñada con laberintos acústicos para reducir las ondas de sonido generadas por las explosiones del motor.",
              stat1: { label: "Reducción", value: "~30 – 50 dB" },
              stat2: { label: "Componente", value: "Cámaras de resonancia" },
            },
          ],
        },
        {
          id: "refrigeracion",
          label: "Refrigeración",
          icon: "❄️",
          color: "#0891B2",
          accent: "#ECFEFF",
          info: "Mantiene el motor en su temperatura óptima de funcionamiento (85-100°C) para evitar que las piezas se fundan por el calor.",
          stat1: { label: "Capacidad fluido", value: "5 – 8 Litros" },
          stat2: { label: "Temp. óptima", value: "90 °C" },
          children: [
            {
              id: "radiador",
              label: "Radiador",
              icon: "🧊",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Intercambiador de calor que enfría el líquido refrigerante mediante el flujo de aire exterior.",
              stat1: { label: "Material", value: "Aluminio" },
              stat2: { label: "Tipo", value: "Flujo cruzado" },
              children: [
                {
                  id: "electroventilador",
                  label: "Electroventilador",
                  icon: "🚁",
                  color: "#065F46",
                  accent: "#D1FAE5",
                  info: "Ventilador eléctrico que se activa cuando el vehículo está detenido o el aire natural no es suficiente.",
                  stat1: { label: "Activación", value: "95 – 98 °C" },
                  stat2: { label: "Velocidades", value: "1 – 2" },
                },
                {
                  id: "panal_radiador",
                  label: "Panal / Celdas",
                  icon: "🥅",
                  color: "#065F46",
                  accent: "#D1FAE5",
                  info: "Red de tubos finos y aletas que maximizan la superficie de contacto con el aire para enfriar el líquido.",
                  stat1: { label: "Riesgo", value: "Obstrucción" },
                  stat2: { label: "Mantenimiento", value: "Limpieza externa" },
                },
              ],
            },
            {
              id: "deposito_expansion",
              label: "Depósito de Expansión",
              icon: "🧪",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Contenedor que recibe el refrigerante sobrante cuando este se expande por el calor.",
              stat1: { label: "Nivel", value: "Min / Max" },
              stat2: { label: "Presión", value: "1.2 – 1.4 bar" },
              children: [
                {
                  id: "tapón_radiador",
                  label: "Tapón Presurizado",
                  icon: "🔘",
                  color: "#065F46",
                  accent: "#D1FAE5",
                  info: "Válvula de seguridad que mantiene la presión del sistema para elevar el punto de ebullición del líquido.",
                  stat1: { label: "Punto ebullición", value: "> 120 °C" },
                  stat2: { label: "Seguridad", value: "Válvula de alivio" },
                },
              ],
            },
            {
              id: "manguitos",
              label: "Manguitos / Tuberías",
              icon: "🐍",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Conductos de goma reforzada que transportan el refrigerante entre el motor y el radiador.",
              stat1: { label: "Material", value: "EPDM / Silicona" },
              stat2: { label: "Resistencia", value: "Alta presión/temp" },
            },
            {
              id: "refrigerante",
              label: "Líquido Refrigerante",
              icon: "🟢",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Mezcla de agua desmineralizada y etilenglicol. Evita la corrosión, la congelación y la ebullición.",
              stat1: { label: "Compuesto", value: "Anticongelante" },
              stat2: { label: "Vida útil", value: "2 – 4 años" },
            },
            {
              id: "sensor_ect",
              label: "Sensor de Temp (ECT)",
              icon: "🌡️",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Envía la señal de temperatura a la ECU para ajustar la mezcla y encender el ventilador.",
              stat1: { label: "Ubicación", value: "Culata / Termostato" },
              stat2: { label: "Señal", value: "Resistencia NTC" },
            },
            {
              id: "calefaccion",
              label: "Radiador de Calefacción",
              icon: "🔥",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Pequeño radiador dentro del habitáculo que usa el calor del motor para calentar el interior del coche.",
              stat1: { label: "Ubicación", value: "Tablero" },
              stat2: { label: "Función", value: "Confort térmico" },
            },
            {
              id: "purga_aire",
              label: "Válvulas de Purga",
              icon: "🌬️",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Pequeños tornillos situados en los puntos más altos del sistema para eliminar burbujas de aire que podrían causar sobrecalentamiento.",
              stat1: { label: "Riesgo", value: "Bolsas de aire" },
              stat2: { label: "Uso", value: "Tras cambio fluido" },
            },
            {
              id: "termo_contacto",
              label: "Termocontacto",
              icon: "🔌",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Interruptor térmico independiente (a veces integrado en el radiador) que actúa como respaldo para encender el ventilador si falla la ECU.",
              stat1: { label: "Tipo", value: "Bimetálico" },
              stat2: { label: "Seguridad", value: "Fail-safe" },
            },
            {
              id: "camisa_agua",
              label: "Chaqueta de Agua",
              icon: "🦺",
              color: "#0E7490",
              accent: "#CFFAFE",
              info: "Espacio hueco que rodea las cámaras de combustión y las guías de válvulas por donde el líquido absorbe el calor directamente del metal.",
              stat1: { label: "Ubicación", value: "Bloque/Culata" },
              stat2: { label: "Intercambio", value: "Térmico directo" },
            },
          ],
        },
        {
          id: "carter",
          label: "Cárter de Aceite",
          icon: "🥣",
          color: "#065F46",
          accent: "#ECFDF5",
          info: "Recipiente situado en la base del motor que sirve como depósito para el aceite lubricante.",
          stat1: { label: "Capacidad", value: "4 – 6 Litros" },
          stat2: { label: "Material", value: "Acero / Alu" },
          children: [
            {
              id: "tapón_vaciado",
              label: "Tapón de Drenaje",
              icon: "🔩",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Tornillo en la parte más baja para vaciar el aceite usado durante el mantenimiento.",
              stat1: { label: "Par de apriete", value: "25 – 40 Nm" },
              stat2: { label: "Sello", value: "Arandela cobre" },
            },
            {
              id: "junta_carter",
              label: "Junta del Cárter",
              icon: "📏",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Elemento de sellado entre el bloque motor y el cárter para evitar fugas de aceite al exterior.",
              stat1: { label: "Material", value: "Corcho / Silicona" },
              stat2: { label: "Vida útil", value: "150 mil km" },
            },
            {
              id: "rompeolas",
              label: "Tabiques Rompeolas",
              icon: "🌊",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Placas internas que evitan que el aceite se desplace violentamente por la inercia en curvas o frenadas, manteniendo la bomba siempre sumergida.",
              stat1: { label: "Función", value: "Estabilidad fluido" },
              stat2: { label: "Efecto", value: "Evita cavitación" },
            },
            {
              id: "alcachofa_succion",
              label: "Colador / Alcachofa",
              icon: "🚿",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Tubo de succión de la bomba de aceite que llega hasta el fondo del cárter. Incluye una malla para filtrar impurezas gruesas.",
              stat1: { label: "Filtrado", value: "Partículas grandes" },
              stat2: { label: "Estado", value: "Crítico para flujo" },
            },
            {
              id: "sensor_nivel_aceite",
              label: "Sensor de Nivel/Temp",
              icon: "🌡️",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Sensor electrónico que avisa en el tablero si el nivel de aceite es bajo o si la temperatura excede los límites seguros.",
              stat1: { label: "Tipo", value: "Ultrasónico / Térmico" },
              stat2: { label: "Señal", value: "Digital ECU" },
            },
            {
              id: "carter_superior",
              label: "Cárter Superior (Bancada)",
              icon: "🧱",
              color: "#059669",
              accent: "#D1FAE5",
              info: "En motores modernos, es una pieza intermedia de aluminio que refuerza la unión del cigüeñal y reduce vibraciones.",
              stat1: { label: "Material", value: "Aluminio fundido" },
              stat2: { label: "Función", value: "Refuerzo estructural" },
            },
            {
              id: "iman_limpieza",
              label: "Imán de Cárter",
              icon: "🧲",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Pequeño imán (a veces integrado en el tapón) que atrapa virutas metálicas desprendidas por el desgaste del motor.",
              stat1: { label: "Atrapa", value: "Residuos ferrosos" },
              stat2: { label: "Mantenimiento", value: "Limpiar en cambios" },
            },
          ],
        },
      ],
    },
    {
      id: "transmision",
      label: "Transmisión",
      icon: "🔀",
      color: "#7C3AED",
      accent: "#EDE9FE",
      info: "Transfiere la potencia del motor a las ruedas, adaptando velocidad y par mediante relaciones de engranaje. Manual, automática o CVT.",
      stat1: { label: "Velocidades", value: "5 – 10" },
      stat2: { label: "Tipos", value: "Manual / Auto / CVT" },
      children: [
        {
          id: "caja_cambios",
          label: "Caja de Cambios",
          icon: "⚙️",
          color: "#6D28D9",
          accent: "#F5F3FF",
          info: "Conjunto de engranajes que multiplica o reduce la velocidad y el par transmitido.",
          children: [
            {
              id: "ejes_internos",
              label: "Ejes de Transmisión",
              icon: "🦯",
              color: "#5B21B6",
              accent: "#EDE9FE",
              info: "Soportan los engranajes y transmiten el movimiento a través de la caja.",
              children: [
                {
                  id: "eje_primario",
                  label: "Eje Primario",
                  icon: "➡️",
                  info: "Recibe el par del motor a través del embrague.",
                  stat1: { label: "Conexión", value: "Motor" },
                },
                {
                  id: "eje_intermediario",
                  label: "Eje Intermedio",
                  icon: "🔄",
                  info: "Transfiere el giro desde el primario al secundario.",
                  stat2: { label: "Función", value: "Contra-eje" },
                },
                {
                  id: "eje_secundario",
                  label: "Eje Secundario",
                  icon: "🏁",
                  info: "Lleva el par hacia el diferencial y las ruedas.",
                  stat1: { label: "Salida", value: "A las ruedas" },
                },
              ],
            },
            {
              id: "sistema_seleccion",
              label: "Sistema de Selección",
              icon: "🕹️",
              color: "#5B21B6",
              accent: "#EDE9FE",
              info: "Mecanismo que permite al conductor elegir la relación de marcha.",
              children: [
                {
                  id: "horquillas",
                  label: "Horquillas Selectoras",
                  icon: "🍴",
                  info: "Mueven los desplazables para engranar las marchas.",
                  stat1: { label: "Material", value: "Acero / Bronce" },
                },
                {
                  id: "tambor_selector",
                  label: "Tambor Selector",
                  icon: "🥁",
                  info: "Guía el movimiento de las horquillas en el orden correcto.",
                  stat2: { label: "Uso", value: "Cajas secuenciales" },
                },
              ],
            },
            {
              id: "carcasa_transmision",
              label: "Carcasa",
              icon: "🛡️",
              color: "#5B21B6",
              accent: "#EDE9FE",
              info: "Estructura exterior que contiene los engranajes y el aceite.",
              children: [
                {
                  id: "retenes_aceite",
                  label: "Retenes",
                  icon: "💍",
                  info: "Evitan que el lubricante se escape por los ejes de salida.",
                  stat1: { label: "Falla", value: "Goteo de valvulina" },
                },
                {
                  id: "rodamientos",
                  label: "Rodamientos",
                  icon: "🔘",
                  info: "Permiten que los ejes giren con mínima fricción.",
                  stat2: { label: "Tipo", value: "Rodillos / Bolas" },
                },
              ],
            },
            {
              id: "lubricacion_caja",
              label: "Valvulina (Aceite)",
              icon: "🛢️",
              color: "#5B21B6",
              accent: "#EDE9FE",
              info: "Aceite de alta viscosidad específico para proteger los engranajes.",
              stat1: { label: "Viscosidad", value: "75W-90 / 80W-90" },
              stat2: { label: "Aditivo", value: "Extrema Presión (EP)" },
            },
          ],
        },
        {
  id: "embrague",
  label: "Embrague",
  icon: "🤝",
  color: "#8B5CF6",
  accent: "#F5F3FF",
  info: "Desacopla el motor de la transmisión para permitir cambios de marcha y detener el vehículo sin apagar el motor.",
  children: [
    {
      id: "kit_embrague",
      label: "Kit de Embrague",
      icon: "📦",
      color: "#7C3AED",
      accent: "#EDE9FE",
      info: "Conjunto de piezas de fricción que realizan el acoplamiento mecánico.",
      children: [
        {
          id: "disco_friccion",
          label: "Disco de Fricción",
          icon: "💿",
          info: "Elemento con revestimiento de material de alto agarre y resortes amortiguadores.",
          stat1: { label: "Material", value: "Cerámico / Orgánico" },
          stat2: { label: "Diámetro", value: "200 – 240 mm" }
        },
        {
          id: "plato_opresor",
          label: "Prensa / Plato",
          icon: "🗜️",
          info: "Proporciona la presión necesaria mediante un muelle de diafragma.",
          stat1: { label: "Tipo", value: "Diafragma" }
        },
        {
          id: "cojinete_empuje",
          label: "Boutée / Collarín",
          icon: "🔘",
          info: "Rodamiento que presiona el diafragma para liberar el disco.",
          stat2: { label: "Falla", value: "Chillido al pisar" }
        }
      ]
    },
    {
      id: "volante_motor",
      label: "Volante de Inercia",
      icon: "🎡",
      color: "#7C3AED",
      accent: "#EDE9FE",
      info: "Pieza atornillada al cigüeñal donde se apoya el embrague. Suaviza las pulsaciones del motor.",
      children: [
        {
          id: "bimasa",
          label: "Volante Bimasa",
          icon: "🌗",
          info: "Dos masas unidas por resortes que absorben las vibraciones de los motores diésel modernos.",
          stat1: { label: "Ventaja", value: "Máximo confort" },
          stat2: { label: "Costo", value: "Elevado" }
        },
        {
          id: "corona_arranque",
          label: "Corona Dentada",
          icon: "⚙️",
          info: "Dientes externos donde engrana el motor de arranque para encender el vehículo.",
          stat1: { label: "Dientes", value: "100 – 150" }
        }
      ]
    },
    {
      id: "sistema_mando",
      label: "Mando del Embrague",
      icon: "🦶",
      color: "#7C3AED",
      accent: "#EDE9FE",
      info: "Mecanismo que transmite el movimiento del pedal hasta el collarín.",
      children: [
        {
          id: "bombin_embrague",
          label: "Cilindro Maestro",
          icon: "🧪",
          info: "Convierte la presión del pie en presión hidráulica usando líquido de frenos.",
          stat1: { label: "Fluido", value: "DOT 3 / DOT 4" }
        },
        {
          id: "cilindro_esclavo",
          label: "Cilindro Receptor",
          icon: "🏗️",
          info: "Recibe la presión hidráulica y empuja físicamente la horquilla del embrague.",
          stat2: { label: "Ubicación", value: "Sobre la caja" }
        }
      ]
    }
  ]
},
        {
          id: "diferencial",
          label: "Diferencial",
          icon: "🔃",
          color: "#A78BFA",
          accent: "#F5F3FF",
          info: "Permite que las ruedas del mismo eje giren a diferentes velocidades en curvas, evitando el derrape y el desgaste irregular.",
          stat1: { label: "Aceite cambio", value: "40 – 60 mil km" },
          stat2: { label: "Tipo", value: "Engranajes cónicos" },
          children: [
            {
              id: "corona",
              label: "Corona y Piñón",
              icon: "⭕",
              color: "#8B5CF6",
              accent: "#EDE9FE",
              info: "Par de engranajes cónicos que transfieren el movimiento del eje longitudinal a los semiárboles de las ruedas motrices.",
              stat1: { label: "Relación", value: "3:1 – 4:1" },
              stat2: { label: "Material", value: "Acero forjado" },
            },
          ],
        },
        {
          id: "semiejes",
          label: "Semiejes / Palieres",
          icon: "🪄",
          color: "#8B5CF6",
          accent: "#F5F3FF",
          info: "Barras de acero que transmiten el movimiento desde el diferencial hasta los cubos de las ruedas.",
          stat1: { label: "Esfuerzo", value: "Torsión extrema" },
          stat2: { label: "Tipo", value: "Macizo / Hueco" },
          children: [
            {
              id: "juntas_homocineticas",
              label: "Juntas Homocinéticas",
              icon: "🔩",
              color: "#7C3AED",
              accent: "#EDE9FE",
              info: "Permiten que el eje transmita fuerza mientras la rueda sube, baja o gira con la dirección. Protegidas por fuelles de goma.",
              stat1: { label: "Ángulo máx", value: "hasta 45°" },
              stat2: { label: "Lubricación", value: "Grasa de molibdeno" },
            },
          ],
        },
        {
          id: "arbol_transmision",
          label: "Árbol de Transmisión",
          icon: "🚀",
          color: "#8B5CF6",
          accent: "#F5F3FF",
          info: "En vehículos de tracción trasera o 4x4, es el eje largo que une la caja de cambios delantera con el diferencial trasero.",
          stat1: { label: "Equilibrado", value: "Dinámico" },
          stat2: { label: "Material", value: "Acero / Carbono" },
        },
      ],
    },
    {
      id: "frenos",
      label: "Frenos",
      icon: "🛑",
      color: "#DC2626",
      accent: "#FEE2E2",
      info: "Sistema de seguridad crítico. Convierte la energía cinética en calor mediante fricción para detener el vehículo de forma controlada.",
      stat1: { label: "Pastillas", value: "Revisar 20 mil km" },
      stat2: { label: "Tipos", value: "Disco / Tambor" },
      children: [
        {
          id: "frenos_disco",
          label: "Frenos de Disco",
          icon: "⭕",
          color: "#B91C1C",
          accent: "#FEF2F2",
          info: "Sistema más efectivo y común en ruedas delanteras. Mejor disipación de calor y mayor potencia de frenada que los de tambor.",
          stat1: { label: "Temperatura", value: "hasta 800 °C" },
          stat2: { label: "Disco", value: "Revisar 60 mil km" },
          children: [
            {
              id: "disco",
              label: "Disco de Freno",
              icon: "🔘",
              color: "#991B1B",
              accent: "#FEE2E2",
              info: "Disco metálico ventilado que rota con la rueda. El calentamiento excesivo puede distorsionarlo provocando vibración al frenar.",
              stat1: { label: "Diámetro", value: "280 – 380 mm" },
              stat2: { label: "Recambio", value: "~60 mil km" },
            },
            {
              id: "pastillas",
              label: "Pastillas",
              icon: "📋",
              color: "#991B1B",
              accent: "#FEE2E2",
              info: "Material de fricción que aprieta el disco. Revisar grosor cada 20,000 km. El chirrido agudo indica desgaste crítico.",
              stat1: { label: "Grosor mín.", value: "2 – 3 mm" },
              stat2: { label: "Revisar", value: "20 mil km" },
            },
            {
              id: "calibre",
              label: "Pinza de Freno",
              icon: "🗜️",
              color: "#991B1B",
              accent: "#FEE2E2",
              info: "Contiene los pistones hidráulicos que presionan las pastillas contra el disco al activar el pedal de freno.",
              stat1: { label: "Pistones", value: "1 – 6" },
              stat2: { label: "Presión", value: "hasta 150 bar" },
            },
          ],
        },
        {
          id: "abs",
          label: "Sistema ABS",
          icon: "🔒",
          color: "#EF4444",
          accent: "#FEF2F2",
          info: "Anti-lock Braking System. Evita el bloqueo de ruedas al frenar bruscamente, manteniendo la capacidad de dirección del vehículo.",
          stat1: { label: "Frecuencia", value: "100 Hz" },
          stat2: { label: "Estándar desde", value: "2004 (EU)" },
          children: [
            {
              id: "sensores_abs",
              label: "Sensores de Rueda",
              icon: "📡",
              color: "#DC2626",
              accent: "#FEE2E2",
              info: "Detectan la velocidad de cada rueda en tiempo real enviando señales a la ECU del ABS hasta 100 veces por segundo.",
              stat1: { label: "Tipo", value: "Hall / inductivo" },
              stat2: { label: "Señales", value: "100/seg por rueda" },
            },
            {
              id: "modulo_abs",
              label: "Módulo ABS",
              icon: "🖥️",
              color: "#DC2626",
              accent: "#FEE2E2",
              info: "Procesa las señales de velocidad y modula la presión hidráulica individualmente en cada rueda para evitar el bloqueo.",
              stat1: { label: "Válvulas", value: "4 – 8" },
              stat2: { label: "Respuesta", value: "<10 ms" },
            },
          ],
        },
      ],
    },
    {
      id: "suspension",
      label: "Suspensión",
      icon: "🌊",
      color: "#059669",
      accent: "#D1FAE5",
      info: "Absorbe las irregularidades del terreno y mantiene las ruedas en contacto con el suelo para máxima estabilidad y confort de marcha.",
      stat1: { label: "Amortiguadores", value: "Revisar 80 mil km" },
      stat2: { label: "Tipos", value: "McPherson / Multilink" },
      children: [
        {
          id: "suspension_delantera",
          label: "Suspensión Delantera",
          icon: "🔼",
          color: "#047857",
          accent: "#ECFDF5",
          info: "Soporta el peso del motor y permite la dirección. Tipo McPherson es el más común en vehículos modernos por su simplicidad y bajo costo.",
          stat1: { label: "Tipo", value: "McPherson" },
          stat2: { label: "Geometría", value: "Camber / Caster" },
          children: [
            {
              id: "amortiguadores_d",
              label: "Amortiguadores",
              icon: "📏",
              color: "#065F46",
              accent: "#D1FAE5",
              info: "Controlan el rebote del resorte. Amortiguadores gastados reducen el control y aumentan la distancia de frenada hasta un 30%.",
              stat1: { label: "Revisar", value: "80 mil km" },
              stat2: { label: "Tipo", value: "Telescópico" },
            },
            {
              id: "resortes_d",
              label: "Resortes",
              icon: "🌀",
              color: "#065F46",
              accent: "#D1FAE5",
              info: "Absorben los impactos y soportan el peso del vehículo. Su tasa (kg/mm) define la firmeza de la suspensión.",
              stat1: { label: "Tasa típica", value: "15 – 40 kg/mm" },
              stat2: { label: "Material", value: "Acero de muelle" },
            },
            {
              id: "rotula",
              label: "Rótula",
              icon: "⚽",
              color: "#065F46",
              accent: "#D1FAE5",
              info: "Articulación esférica que une el brazo de suspensión con el muñón. Su desgaste produce ruidos y holguras peligrosas.",
              stat1: { label: "Revisar", value: "80 – 100 mil km" },
              stat2: { label: "Tipo", value: "Esférica" },
            },
          ],
        },
        {
          id: "suspension_trasera",
          label: "Suspensión Trasera",
          icon: "🔽",
          color: "#10B981",
          accent: "#ECFDF5",
          info: "Puede ser independiente o de eje rígido. Los modernos usan suspensión independiente multibrazo para mejor manejo y confort.",
          stat1: { label: "Tipo", value: "Multilink / Torsión" },
          stat2: { label: "Carga máx.", value: "500 – 800 kg" },
          children: [
            {
              id: "barra_estabilizadora",
              label: "Barra Estabilizadora",
              icon: "📊",
              color: "#059669",
              accent: "#D1FAE5",
              info: "Barra en U que reduce el balanceo lateral del vehículo en curvas, vinculando ambas ruedas del mismo eje mediante silentblocks.",
              stat1: { label: "Diámetro", value: "18 – 32 mm" },
              stat2: { label: "Material", value: "Acero de resorte" },
            },
          ],
        },
      ],
    },
    {
      id: "electrico",
      label: "Eléctrico",
      icon: "⚡",
      color: "#D97706",
      accent: "#FEF3C7",
      info: "Red de cables, sensores y módulos que controlan desde el encendido hasta los sistemas de confort, seguridad y entretenimiento.",
      stat1: { label: "Voltaje", value: "12 V (base)" },
      stat2: { label: "Sensores aprox.", value: "+50 por vehículo" },
      children: [
        {
          id: "generacion",
          label: "Generación Eléctrica",
          icon: "🔋",
          color: "#B45309",
          accent: "#FFFBEB",
          info: "Produce y almacena la energía eléctrica (12V) necesaria para todos los sistemas del vehículo en cualquier condición de operación.",
          stat1: { label: "Voltaje sistema", value: "12 – 14.4 V" },
          stat2: { label: "Potencia alt.", value: "60 – 150 A" },
          children: [
            {
              id: "bateria",
              label: "Batería",
              icon: "🔋",
              color: "#92400E",
              accent: "#FEF3C7",
              info: "Acumula energía eléctrica (12V). Vida útil de 3-5 años. El frío intenso puede reducir su capacidad hasta un 40%.",
              stat1: { label: "Vida útil", value: "3 – 5 años" },
              stat2: { label: "Capacidad", value: "45 – 100 Ah" },
            },
            {
              id: "alternador",
              label: "Alternador",
              icon: "🌪️",
              color: "#92400E",
              accent: "#FEF3C7",
              info: "Carga la batería mientras el motor funciona. Genera corriente alterna que se rectifica a 14.4V continuos.",
              stat1: { label: "Voltaje salida", value: "13.5 – 14.8 V" },
              stat2: { label: "Corriente", value: "60 – 180 A" },
            },
            {
              id: "motor_arranque",
              label: "Motor de Arranque",
              icon: "▶️",
              color: "#92400E",
              accent: "#FEF3C7",
              info: "Motor eléctrico que pone en marcha el motor de combustión. Consume 150-200A en el momento del arranque.",
              stat1: { label: "Consumo", value: "150 – 200 A" },
              stat2: { label: "Potencia", value: "1 – 3 kW" },
            },
          ],
        },
        {
          id: "ecu",
          label: "ECU / Computadora",
          icon: "🖥️",
          color: "#F59E0B",
          accent: "#FFFBEB",
          info: "Engine Control Unit: el cerebro del vehículo moderno. Procesa datos de 50+ sensores para optimizar rendimiento y emisiones.",
          stat1: { label: "Sensores", value: "+50 entradas" },
          stat2: { label: "Ciclos/seg", value: "~100 Hz" },
          children: [
            {
              id: "sensores_motor",
              label: "Sensores Motor",
              icon: "📡",
              color: "#D97706",
              accent: "#FEF3C7",
              info: "MAF, MAP, O2, temperatura del refrigerante. Envían datos continuos a la ECU para gestionar la inyección y el encendido.",
              stat1: { label: "Tipos", value: "MAF, MAP, O2, TPS" },
              stat2: { label: "Señales", value: "Analógica / CAN" },
            },
            {
              id: "inyectores",
              label: "Inyectores",
              icon: "💉",
              color: "#D97706",
              accent: "#FEF3C7",
              info: "Pulverizan el combustible en cantidades precisas (milisegundos) calculadas por la ECU según la demanda del motor.",
              stat1: { label: "Presión", value: "3 – 200 bar" },
              stat2: { label: "Tipo", value: "GDI / MPI" },
            },
          ],
        },
      ],
    },
    {
      id: "direccion",
      label: "Dirección",
      icon: "🎯",
      color: "#0891B2",
      accent: "#CFFAFE",
      info: "Permite al conductor controlar la trayectoria con precisión. Los sistemas modernos EPS (eléctrico) mejoran la eficiencia en combustible.",
      stat1: { label: "Tipo moderno", value: "EPS eléctrico" },
      stat2: { label: "Vueltas volante", value: "2.5 – 3.5" },
      children: [
        {
          id: "columna",
          label: "Columna de Dirección",
          icon: "↕️",
          color: "#0E7490",
          accent: "#ECFEFF",
          info: "Transmite el giro del volante hasta la caja de dirección. Puede ser colapsable en impacto para proteger al conductor.",
          stat1: { label: "Ajuste", value: "Altura / profundidad" },
          stat2: { label: "Seguridad", value: "Colapsable" },
          children: [
            {
              id: "volante",
              label: "Volante",
              icon: "🎮",
              color: "#155E75",
              accent: "#CFFAFE",
              info: "Interfaz directa con el conductor. Los modernos integran controles de audio, teléfono, crucero y paddle shifters.",
              stat1: { label: "Diámetro", value: "350 – 400 mm" },
              stat2: { label: "Controles", value: "Audio / Tel / CC" },
            },
            {
              id: "cardan_dir",
              label: "Junta Cardán",
              icon: "🔗",
              color: "#155E75",
              accent: "#CFFAFE",
              info: "Permite cambios de ángulo en la columna para mejorar la ergonomía del habitáculo y aislar vibraciones del suelo.",
              stat1: { label: "Ángulo máx.", value: "hasta 35°" },
              stat2: { label: "Tipo", value: "Universal / Homocinética" },
            },
          ],
        },
        {
          id: "caja_dir",
          label: "Caja de Dirección",
          icon: "📦",
          color: "#06B6D4",
          accent: "#ECFEFF",
          info: "Convierte el giro rotativo del volante en movimiento lateral para girar las ruedas. Tipo cremallera en la mayoría de autos modernos.",
          stat1: { label: "Tipo", value: "Cremallera" },
          stat2: { label: "Asistencia", value: "Hidráulica / EPS" },
          children: [
            {
              id: "cremallera",
              label: "Cremallera",
              icon: "🔩",
              color: "#0891B2",
              accent: "#CFFAFE",
              info: "Barra dentada que transforma el giro del piñón en movimiento lineal para accionar las barras de acoplamiento laterales.",
              stat1: { label: "Recorrido", value: "120 – 160 mm" },
              stat2: { label: "Material", value: "Acero inox." },
            },
            {
              id: "barra_direcc",
              label: "Barras de Acoplamiento",
              icon: "↔️",
              color: "#0891B2",
              accent: "#CFFAFE",
              info: "Transmiten el movimiento de la cremallera hasta los portamanguetas de cada rueda delantera. La rótula es su punto crítico.",
              stat1: { label: "Revisar", value: "Cada ITV" },
              stat2: { label: "Juego máx.", value: "< 2 mm" },
            },
          ],
        },
      ],
    },
  ],
};

// ─── TREE NODE ─────────────────────────────────────────────────────────────
function TreeNode({
  node,
  depth = 0,
  parentColor = "#111827",
  onSelect,
  selectedId,
}) {
  const [expanded, setExpanded] = useState(depth === 0);
  const [hovered, setHovered] = useState(false);
  const hasChildren = node.children?.length > 0;
  const isSelected = selectedId === node.id;
  const nodeColor = node.color || parentColor;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(node);
    if (hasChildren) setExpanded((ex) => !ex);
  };

  const pad = depth === 0 ? "9px 12px" : depth === 1 ? "7px 10px" : "6px 9px";
  const fontSize = depth === 0 ? 13 : depth === 1 ? 12 : 11;
  const iconSize = depth === 0 ? 28 : depth === 1 ? 23 : 20;
  const iconFont = depth === 0 ? 14 : depth === 1 ? 12 : 11;
  const radius = depth === 0 ? 12 : depth === 1 ? 10 : 9;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        {depth > 0 && (
          <div
            style={{
              position: "absolute",
              left: -18,
              top: "50%",
              width: 15,
              height: 1.5,
              background: `${parentColor}40`,
              marginTop: -0.75,
            }}
          />
        )}
        <div
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: pad,
            borderRadius: radius,
            border: `1.5px solid ${isSelected ? nodeColor + "70" : hovered ? nodeColor + "35" : "transparent"}`,
            background: isSelected
              ? `${nodeColor}12`
              : hovered
                ? `${nodeColor}07`
                : "transparent",
            cursor: "pointer",
            transition: "all 0.15s",
            width: "100%",
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: radius - 2,
              background: isSelected ? `${nodeColor}20` : `${nodeColor}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: iconFont,
              flexShrink: 0,
              transition: "all 0.15s",
            }}
          >
            {node.icon}
          </div>
          <span
            style={{
              fontSize,
              fontWeight: isSelected ? 700 : 500,
              color: isSelected ? nodeColor : "#374151",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "color 0.15s",
            }}
          >
            {node.label}
          </span>
          {hasChildren && (
            <svg
              width={8}
              height={8}
              viewBox="0 0 10 10"
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                flexShrink: 0,
              }}
            >
              <path
                d="M3 2L7 5L3 8"
                fill="none"
                stroke={nodeColor}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {hasChildren && expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 16,
            marginTop: 2,
            gap: 1,
            position: "relative",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -2,
              top: 10,
              bottom: 10,
              width: 1.5,
              background: `linear-gradient(to bottom, ${nodeColor}50 0%, ${nodeColor}08 100%)`,
            }}
          />
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              parentColor={nodeColor}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CENTER DETAIL PANEL ───────────────────────────────────────────────────
function CenterDetail({ selected }) {
  if (!selected) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: 48,
          textAlign: "center",
        }}
      >
        {/* Big car graphic placeholder */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 36,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            border: "2px dashed #E5E7EB",
          }}
        >
          🚗
        </div>
        <div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
            }}
          >
            Selecciona un componente
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#9CA3AF",
              lineHeight: 1.7,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              maxWidth: 320,
              margin: "0 auto",
            }}
          >
            Haz clic en cualquier nodo del árbol de la izquierda para explorar
            sus sistemas y componentes.
          </p>
        </div>
        {/* Quick system pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {VEHICLE_TREE.children.map((s) => (
            <div
              key={s.id}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                background: `${s.color}10`,
                border: `1px solid ${s.color}25`,
                fontSize: 12,
                color: s.color,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              {s.icon} {s.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const c = selected;
  const hasChildren = c.children?.length > 0;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "48px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 36,
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
        }}
      >
        {/* Big icon bubble */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: `${c.color}12`,
            border: `2px solid ${c.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
            boxShadow: `0 8px 32px ${c.color}18`,
            transition: "all 0.3s",
          }}
        >
          {c.icon}
        </div>

        {/* Label */}
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "3px 12px",
              borderRadius: 20,
              background: `${c.color}12`,
              border: `1px solid ${c.color}30`,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: c.color,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: 10,
            }}
          >
            {hasChildren
              ? `${c.children.length} subcomponentes`
              : "Componente final"}
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#111827",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.025em",
              margin: "0 0 12px",
              lineHeight: 1.1,
            }}
          >
            {c.label}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#4B5563",
              lineHeight: 1.8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {c.info}
          </p>
        </div>

        {/* Stats row */}
        {(c.stat1 || c.stat2) && (
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[c.stat1, c.stat2].filter(Boolean).map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 24px",
                  borderRadius: 16,
                  background: `${c.color}08`,
                  border: `1px solid ${c.color}18`,
                  textAlign: "center",
                  minWidth: 130,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: c.color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    marginTop: 4,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "#F3F4F6" }} />

      {/* ── Subcomponent cards ── */}
      {hasChildren && (
        <div>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#9CA3AF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Componentes internos
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {c.children.map((child) => (
              <SubCard key={child.id} node={child} parentColor={c.color} />
            ))}
          </div>
        </div>
      )}

      {/* ── If leaf: show related tip ── */}
      {!hasChildren && (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: "#F9FAFB",
            border: "1px solid #F0F0F0",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `${c.color}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🔧
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: 4,
              }}
            >
              Consejo de mantenimiento
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.7,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                margin: 0,
              }}
            >
              Este es un componente de nivel final. Para su revisión, consulta
              siempre el manual del fabricante y acude a un taller certificado.
              Un mantenimiento preventivo puede extender su vida útil
              significativamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUB-CARD ──────────────────────────────────────────────────────────────
function SubCard({ node, parentColor }) {
  const [hovered, setHovered] = useState(false);
  const color = node.color || parentColor;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px 16px",
        borderRadius: 16,
        border: `1.5px solid ${hovered ? color + "40" : color + "15"}`,
        background: hovered ? `${color}08` : "#fff",
        transition: "all 0.18s",
        cursor: "default",
        boxShadow: hovered
          ? `0 4px 20px ${color}12`
          : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 13,
          background: `${color}12`,
          border: `1px solid ${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          transition: "all 0.18s",
          ...(hovered ? { background: `${color}20` } : {}),
        }}
      >
        {node.icon}
      </div>

      {/* Label */}
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#111827",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.2,
            marginBottom: 5,
          }}
        >
          {node.label}
        </div>
        <p
          style={{
            fontSize: 11,
            color: "#6B7280",
            lineHeight: 1.65,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0,
          }}
        >
          {node.info?.slice(0, 80)}
          {(node.info?.length || 0) > 80 ? "…" : ""}
        </p>
      </div>

      {/* Mini stats */}
      {node.stat1 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 2,
          }}
        >
          {[node.stat1, node.stat2].filter(Boolean).map((s, i) => (
            <div
              key={i}
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: `${color}10`,
                border: `1px solid ${color}15`,
                fontSize: 10,
                fontWeight: 600,
                color,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {s.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Page() {
  const [selected, setSelected] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = useCallback((node) => {
    setSelected(node);
    setSelectedId(node.id);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .detail-enter { animation: fadeSlide 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      {/* ── Header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #EBEBEB",
          padding: "0 28px",
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🚗
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#111827",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              VehicleMap
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Anatomía del automóvil
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { n: "6", l: "Sistemas" },
            { n: "14", l: "Subsistemas" },
            { n: "+30", l: "Componentes" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: "#F3F4F6",
                border: "1px solid #EBEBEB",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ display: "flex", height: "calc(100vh - 58px)" }}>
        {/* LEFT: Tree sidebar */}
        <aside
          style={{
            width: 260,
            background: "#fff",
            borderRight: "1px solid #EBEBEB",
            overflowY: "auto",
            flexShrink: 0,
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C4C4C4",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              padding: "0 6px",
              marginBottom: 10,
            }}
          >
            Sistemas del vehículo
          </div>

          <TreeNode
            node={VEHICLE_TREE}
            depth={0}
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        </aside>

        {/* CENTER: Big detail */}
        <div
          className={selected ? "detail-enter" : ""}
          key={selectedId || "empty"}
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#FAFAFA",
            position: "relative",
          }}
        >
          {/* Dot grid */}
          <div
            style={{
              position: "fixed",
              left: 260,
              right: 0,
              top: 58,
              bottom: 0,
              backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              opacity: 0.6,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
            }}
          >
            <CenterDetail selected={selected} />
          </div>
        </div>
      </div>
    </main>
  );
}
