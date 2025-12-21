import dynamic from 'next/dynamic';

const TriviaMovil = dynamic(() => import('@/src/Components/Trivia/TriviaV1'), {
  ssr: false, // ¡Esto es clave!
});

export default function PaginaDeTrivia() {
  return (
    // ... otros elementos que sí se renderizan en el servidor
    <TriviaMovil /> 
    // ...
  );
}