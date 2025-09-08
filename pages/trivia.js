import React, { useState } from "react";
import { Car, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

const VehicleTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const questions = [
    {
      image: "🔧",
      question: "¿Qué parte del vehículo se muestra?",
      options: ["Motor", "Transmisión", "Frenos", "Suspensión"],
      correct: 0,
      description: "Componente que convierte combustible en energía mecánica"
    },
    {
      image: "🛞",
      question: "¿Cómo se llama esta parte?",
      options: ["Llanta", "Rin", "Neumático", "Todas las anteriores"],
      correct: 3,
      description: "El conjunto completo incluye neumático, rin y llanta"
    },
    {
      image: "💡",
      question: "¿Qué sistema representa esta imagen?",
      options: ["Sistema eléctrico", "Faros", "Iluminación", "Todas las anteriores"],
      correct: 3,
      description: "Los faros forman parte del sistema de iluminación eléctrica"
    },
    {
      image: "🔋",
      question: "¿Cuál es la función principal de esta parte?",
      options: ["Almacenar energía", "Generar electricidad", "Enfriar el motor", "Filtrar combustible"],
      correct: 0,
      description: "La batería almacena energía eléctrica para el vehículo"
    },
    {
      image: "⚙️",
      question: "¿Qué componente se representa?",
      options: ["Alternador", "Transmisión", "Diferencial", "Motor de arranque"],
      correct: 1,
      description: "La transmisión transfiere potencia del motor a las ruedas"
    },
    {
      image: "🌡️",
      question: "¿Qué sistema monitorea esta parte?",
      options: ["Sistema de combustible", "Sistema de refrigeración", "Sistema de escape", "Sistema de dirección"],
      correct: 1,
      description: "El termómetro monitorea la temperatura del sistema de refrigeración"
    },
    {
      image: "🛡️",
      question: "¿Qué función cumple esta parte?",
      options: ["Protección", "Aerodinámica", "Estética", "Todas las anteriores"],
      correct: 3,
      description: "Los paneles de carrocería cumplen múltiples funciones"
    },
    {
      image: "🔄",
      question: "¿Qué sistema representa?",
      options: ["Sistema de dirección", "Sistema de frenos", "Sistema de suspensión", "Sistema de escape"],
      correct: 0,
      description: "Permite controlar la dirección del vehículo"
    },
    {
      image: "💨",
      question: "¿Cuál es la función de este sistema?",
      options: ["Filtrar aire", "Expulsar gases", "Refrigerar", "Lubricar"],
      correct: 1,
      description: "El sistema de escape expulsa los gases de combustión"
    },
    {
      image: "🛠️",
      question: "¿Qué representa esta herramienta en el contexto automotriz?",
      options: ["Mantenimiento", "Reparación", "Servicio técnico", "Todas las anteriores"],
      correct: 3,
      description: "Las herramientas son esenciales para el mantenimiento integral"
    }
  ];

  const styles = {
    mainContent: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    container: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '2rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    iconWrapper: {
      width: '64px',
      height: '64px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '0.5rem',
      letterSpacing: '-0.025em',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#64748b',
      lineHeight: '1.6',
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      marginBottom: '2rem',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#3b82f6',
      transition: 'width 0.3s ease',
    },
    questionCard: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    imageContainer: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '120px',
    },
    questionText: {
      fontSize: '1.25rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '1.5rem',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '2rem',
    },
    option: {
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
      fontWeight: '500',
      textAlign: 'left',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    optionHover: {
      borderColor: '#3b82f6',
      backgroundColor: '#f0f9ff',
    },
    optionSelected: {
      borderColor: '#3b82f6',
      backgroundColor: '#dbeafe',
    },
    optionCorrect: {
      borderColor: '#10b981',
      backgroundColor: '#d1fae5',
      color: '#065f46',
    },
    optionIncorrect: {
      borderColor: '#ef4444',
      backgroundColor: '#fee2e2',
      color: '#991b1b',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3b82f6',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      width: '100%',
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
    },
    scoreDisplay: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
    },
    resultCard: {
      textAlign: 'center',
      padding: '2rem',
    },
    resultIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 1.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    finalScore: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1rem',
    },
    resultMessage: {
      fontSize: '1.125rem',
      marginBottom: '2rem',
      color: '#64748b',
    },
    explanation: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      fontSize: '0.875rem',
      color: '#0369a1',
      textAlign: 'left',
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "¡Excelente! Eres un experto en vehículos 🏆";
    if (percentage >= 70) return "¡Muy bien! Tienes buenos conocimientos 👍";
    if (percentage >= 50) return "¡Bien! Puedes mejorar con más práctica 📚";
    return "¡Sigue aprendiendo! La práctica hace al maestro 💪";
  };

  const getOptionStyle = (index) => {
    let style = { ...styles.option };
    
    if (!showResult && selectedAnswer === index) {
      style = { ...style, ...styles.optionSelected };
    }
    
    if (showResult) {
      if (index === questions[currentQuestion].correct) {
        style = { ...style, ...styles.optionCorrect };
      } else if (selectedAnswer === index && index !== questions[currentQuestion].correct) {
        style = { ...style, ...styles.optionIncorrect };
      }
    }
    
    return style;
  };

  if (gameFinished) {
    return (
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.resultCard}>
            <div style={{
              ...styles.resultIcon,
              backgroundColor: score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
            }}>
              <Trophy size={40} color="#ffffff" />
            </div>
            <h2 style={styles.title}>¡Juego Completado!</h2>
            <div style={{
              ...styles.finalScore,
              color: score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
            }}>
              {score}/{questions.length}
            </div>
            <p style={styles.resultMessage}>{getScoreMessage()}</p>
            <button onClick={resetGame} style={styles.button}>
              <RotateCcw size={16} />
              Jugar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContent}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.iconWrapper}>
            <Car size={32} color="#ffffff" />
          </div>
          <h1 style={styles.title}>Trivia de Vehículos</h1>
          <p style={styles.subtitle}>
            Identifica las partes y sistemas de los vehículos
          </p>
        </header>

        <div style={styles.scoreDisplay}>
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span>Puntuación: {score}/{questions.length}</span>
        </div>

        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        <div style={styles.questionCard}>
          <div style={styles.imageContainer}>
            {questions[currentQuestion].image}
          </div>
          <h2 style={styles.questionText}>
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={getOptionStyle(index)}
              disabled={showResult}
            >
              {showResult && index === questions[currentQuestion].correct && (
                <CheckCircle size={20} style={{ marginRight: '8px', color: '#10b981' }} />
              )}
              {showResult && selectedAnswer === index && index !== questions[currentQuestion].correct && (
                <XCircle size={20} style={{ marginRight: '8px', color: '#ef4444' }} />
              )}
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div style={styles.explanation}>
            <strong>Explicación:</strong> {questions[currentQuestion].description}
          </div>
        )}

        <button
          onClick={showResult ? handleNextQuestion : handleSubmitAnswer}
          style={{
            ...styles.button,
            ...(selectedAnswer === null && !showResult ? styles.buttonDisabled : {})
          }}
          disabled={selectedAnswer === null && !showResult}
        >
          {showResult 
            ? (currentQuestion < questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultados')
            : 'Confirmar respuesta'
          }
        </button>
      </div>
    </div>
  );
};

export default VehicleTrivia;