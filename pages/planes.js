'use client';

import Scene1Source from '@/src/Components/Videos/Scene1Source';
import Scene2Coil from '@/src/Components/Videos/Scene2Coil';
import Scene3Cable from '@/src/Components/Videos/Scene3Cable';
import Scene4Spark from '@/src/Components/Videos/Scene4Spark';
import Scene5Engine from '@/src/Components/Videos/Scene5Engine';
import SceneSpark1 from '@/src/Components/Videos/SceneSpark1';
import SceneSpark2 from '@/src/Components/Videos/SceneSpark2';
import SceneSpark3 from '@/src/Components/Videos/SceneSpark3';
import SceneSpark4 from '@/src/Components/Videos/SceneSpark4';
import SceneSpark5 from '@/src/Components/Videos/SceneSpark5';
import SceneSpark6 from '@/src/Components/Videos/SceneSpark6';
import UIContainer from '@/src/Components/Videos/UIContainer';
import React, { useState, useEffect } from 'react';

// Datos explicativos de cada escena
const STEPS_DATA = [
  {
    title: "1. El Origen de la Energía",
    description: "Todo comienza en la batería del auto, suministrando un flujo continuo de 12 voltios hacia la computadora central.",
    dataTag: "FUENTE: 12V DC"
  },
  {
    title: "2. La Bobina de Encendido",
    description: "La bobina actúa como un transformador que multiplica los 12V iniciales hasta convertirlos en 25,000 voltios.",
    dataTag: "ELEVACIÓN: 25,000V"
  },
  {
    title: "3. Recorrido de Alta Tensión",
    description: "La descarga eléctrica de alto voltaje viaja a través del cable aislado dirigiéndose hacia el cabezal del motor.",
    dataTag: "FLUJO: ALTA TENSIÓN"
  },
  {
    title: "4. Salto de la Chispa",
    description: "El voltaje supera la resistencia del aire entre los electrodos, creando un arco de plasma extremadamente caliente.",
    dataTag: "GAP: 0.8 MM"
  },
  {
    title: "5. Combustión en el Cilindro",
    description: "La chispa enciende el combustible comprimido, generando la fuerza expansiva que mueve el pistón hacia abajo.",
    dataTag: "TEMPERATURA: > 2000°C"
  }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reproducción automática para grabación continua
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % STEPS_DATA.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <UIContainer
      currentStep={currentStep}
      totalSteps={STEPS_DATA.length}
      stepData={STEPS_DATA[currentStep]}
      onNext={() => setCurrentStep((prev) => (prev + 1) % STEPS_DATA.length)}
      onPrev={() => setCurrentStep((prev) => (prev - 1 + STEPS_DATA.length) % STEPS_DATA.length)}
      onSelectStep={(index) => setCurrentStep(index)}
      isPlaying={isPlaying}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
    >
    {/* {currentStep === 0 && <Scene1Source />}
      {currentStep === 1 && <Scene2Coil />}
      {currentStep === 2 && <Scene3Cable />}
      {currentStep === 3 && <Scene4Spark />}
      {currentStep === 4 && <Scene5Engine />} */}

       {currentStep === 0 && <SceneSpark1 />}
       {currentStep === 1 && <SceneSpark2 />}
       {currentStep === 2 && <SceneSpark3 />}
       {currentStep === 3 && <SceneSpark4/>}
       {currentStep === 4 && <SceneSpark5/>}
       {currentStep === 5 && <SceneSpark6/>}



    </UIContainer>
  );
}