


// export default function AnimationCalculator({ calcular, cylinderHeight, cylinderWidth, pistonHeight, setCilindrajeTotal, middle, cilindrajeTotal }) {
//   const [animationSpeed, setAnimationSpeed] = useState(5);
//   const maxPosition = cylinderHeight - pistonHeight;
//   const [position, setPosition] = useState(0);


//   function agregarPunto(numero) {
//     return numero.toLocaleString(undefined, { minimumFractionDigits: 0 });
//   }
//   useEffect(() => {
//     let cilindraje;
//     let animationFrameId;


//     let piTotal = (Math.PI * (calcular.diametro * calcular.diametro)) / 4;
//     cilindraje = Math.round(piTotal) * calcular.carrera * calcular.cilindros

//     const totalCilindraje = agregarPunto(Math.round(cilindraje / 1000));
//     setCilindrajeTotal(totalCilindraje)


//     const animate = () => {
//       setPosition((prevPosition) => {
//         if (prevPosition >= maxPosition && animationSpeed > 0) {
//           setAnimationSpeed(-animationSpeed);
//         } else if (prevPosition <= 0 && animationSpeed < 0) {
//           setAnimationSpeed(-animationSpeed);
//         }
//         return prevPosition + animationSpeed;
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [animationSpeed, maxPosition, calcular]);
//   let width = parseFloat(cylinderWidth) + 50
//   return (
//     <div style={{ margin: middle ? '32px auto 0 auto' : '48px auto 0 auto', height: middle ? cylinderHeight - 50 : cylinderHeight - 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '48px', width: `${middle ? width / 3 : width}px` }}>
//       {/* SVG */}
//       <svg style={{ marginTop: '8px' }} width={cylinderWidth} height={middle ? cylinderHeight / 2 : cylinderHeight - 2}>
//         {/* Rectángulo para representar el pistón */}
//         <rect
//           x={0}
//           y={cylinderHeight - pistonHeight * cylinderHeight - position}
//           width={cylinderWidth}
//           height={middle ? (pistonHeight * cylinderHeight) / 2 : pistonHeight * cylinderHeight}
//           fill="#999999"
//           stroke="black"
//           strokeWidth="2"
//         />
//         {/* Rectángulo para representar el cilindro */}
//         <rect
//           x={0}
//           y={0}
//           width={cylinderWidth}
//           height={cylinderHeight}
//           stroke="black"
//           strokeWidth="2"
//           fill="none"
//         />
//       </svg>
//       {!middle &&
//         <text style={{fontSize:'14px', position: 'absolute', top: 20, fontWeight: '600' }} x={cylinderWidth / 2} y="15" fill="red" fontSize="12" textAnchor="middle">{ (parseFloat(cilindrajeTotal) / calcular?.cilindros).toFixed(3) } cc</text>
//       }
//       {!middle &&
//         <>
//           <svg width={cylinderWidth} height="20" style={{ position: 'absolute', top: -20 }}>
//             <text x={cylinderWidth / 2} y="15" fill="red" fontSize="12" textAnchor="middle">{cylinderWidth} mm</text>
//             <line x1="0" y1="0" x2={cylinderWidth} y2="0" stroke="red" strokeWidth="1" />
//           </svg>

//           <svg width="30" height={cylinderHeight} style={{ position: 'absolute', left: 0, marginTop: '8px' }}>
//             <text x={-cylinderHeight / 2} y="10" fill="red" fontSize="12" transform={`rotate(-90) translate(${-cylinderHeight / 2}, 5)`}>{cylinderHeight} mm</text>
//             <line x1="0" y1="0" x2="0" y2={cylinderHeight} stroke="red" strokeWidth="1" />
//           </svg>
//         </>
//       }
//     </div>
//   )
// }

import React, { useState, useEffect, useMemo } from 'react';

export default function AnimationCalculator({ calcular, cylinderHeight, cylinderWidth, pistonHeight, setCilindrajeTotal, middle, isPlaying }) {
  const [animationSpeed, setAnimationSpeed] = useState(Number(calcular?.rpm) / 60);
  const maxPosition = cylinderHeight - pistonHeight;
  const [position, setPosition] = useState(0);

  function agregarPunto(numero) {
    return numero.toLocaleString(undefined, { minimumFractionDigits: 0 });
  }
  const cilindrajeTotal = useMemo(() => {
    let cilindraje;
    let piTotal = (Math.PI * (calcular.diametro * calcular.diametro)) / 4;
    cilindraje = Math.round(piTotal) * calcular.carrera * calcular.cilindros;
    setCilindrajeTotal(agregarPunto(Math.round(cilindraje / 1000)))
    return cilindraje.toLocaleString(undefined, { minimumFractionDigits: 0 });

  }, [calcular]);
  useEffect(() => {
    setAnimationSpeed(Number(calcular?.rpm) / 60)
  }, [calcular?.rpm])

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition >= maxPosition && animationSpeed > 0) {
          setAnimationSpeed(-animationSpeed);
        } else if (prevPosition <= 0 && animationSpeed < 0) {
          setAnimationSpeed(-animationSpeed);
        }
        return prevPosition + animationSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, animationSpeed, maxPosition]);



  let width = parseFloat(cylinderWidth) + 50;

  return (
    <div style={{ margin: middle ? '16px auto 0 auto' : '0px auto 0 auto', height: middle ? cylinderHeight - 50 : cylinderHeight - 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '48px', width: `${middle ? width / 3 : width}px` }}>
      {/* SVG */}

      <svg style={{ marginTop: '8px' }} width={cylinderWidth} height={middle ? cylinderHeight / 2 : cylinderHeight - 2}>
        {/* Rectángulo para representar el pistón */}
        <rect
          x={0}
          y={cylinderHeight - pistonHeight * cylinderHeight - position}
          width={cylinderWidth}
          height={middle ? (pistonHeight * cylinderHeight) / 2 : pistonHeight * cylinderHeight}
          fill="#999999"
          stroke="black"
          strokeWidth="2"
        />
        {/* Rectángulo para representar el cilindro */}
        <rect
          x={0}
          y={0}
          width={cylinderWidth}
          height={cylinderHeight}
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {!middle &&
        <text style={{ fontSize: '14px', position: 'absolute', top: 20, fontWeight: '600' }} x={cylinderWidth / 2} y="15" fill="red" fontSize="12" textAnchor="middle">{(parseFloat(cilindrajeTotal) / calcular?.cilindros).toFixed(3)} cc</text>
      }
      {!middle &&
        <>
          <svg width={cylinderWidth} height="20" style={{ position: 'absolute', top: -20 }}>
            <text x={cylinderWidth / 2} y="15" fill="red" fontSize="12" textAnchor="middle">{cylinderWidth} mm</text>
            <line x1="0" y1="0" x2={cylinderWidth} y2="0" stroke="red" strokeWidth="1" />
          </svg>

          <svg width="30" height={cylinderHeight} style={{ position: 'absolute', left: 0, marginTop: '8px' }}>
            <text x={-cylinderHeight / 2} y="10" fill="red" fontSize="12" transform={`rotate(-90) translate(${-cylinderHeight / 2}, 5)`}>{cylinderHeight} mm</text>
            <line x1="0" y1="0" x2="0" y2={cylinderHeight} stroke="red" strokeWidth="1" />
          </svg>
        </>
      }
    </div>
  )
}