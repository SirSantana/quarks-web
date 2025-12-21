import { useState, useEffect, useRef } from 'react';
import { Volume2, CheckCircle, XCircle, RotateCcw, Clock, Zap } from 'lucide-react';

export default function TriviaMovil() {
  const [selectedSound, setSelectedSound] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [playingSound, setPlayingSound] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
      setIsActive(false);
      playSound('wrong');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResult]);

  const sounds = [
    { id: 1, label: 'Sonido A', emoji: '🔊', isCorrect: false },
    { id: 2, label: 'Sonido B', emoji: '🎵', isCorrect: true },
    { id: 3, label: 'Sonido C', emoji: '🔉', isCorrect: false },
    { id: 4, label: 'Sonido D', emoji: '🎶', isCorrect: false }
  ];

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'wrong') {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } else if (type === 'tick') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    }
  };

  const handleSoundSelect = (soundId) => {
    if (!showResult) {
      setSelectedSound(soundId);
      if (!isActive) {
        setIsActive(true);
      }
      playSound('tick');
    }
  };

  const handlePlaySound = (soundId) => {
    setPlayingSound(soundId);
    playSound('tick');
    setTimeout(() => setPlayingSound(null), 2000);
  };

  const handleSubmit = () => {
    if (selectedSound) {
      setShowResult(true);
      setIsActive(false);
      const sound = sounds.find(s => s.id === selectedSound);
      if (sound.isCorrect) {
        const bonusTime = Math.floor(timeLeft / 5);
        setScore(score + 100 + bonusTime);
        setStreak(streak + 1);
        playSound('correct');
      } else {
        setStreak(0);
        playSound('wrong');
      }
    }
  };

  const handleReset = () => {
    setSelectedSound(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsActive(false);
  };

  const isCorrect = selectedSound && sounds.find(s => s.id === selectedSound)?.isCorrect;
  const progress = (timeLeft / 30) * 100;

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Score Header */}
        <div className="bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-down">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Puntos</p>
                <p className="text-2xl font-bold text-gray-800">{score}</p>
              </div>
            </div>
            
            {streak > 0 && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full animate-bounce-in">
                <p className="text-white font-bold">🔥 {streak}x</p>
              </div>
            )}
          </div>

          {/* Timer Circular */}
          <div className="relative flex justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                {/* Círculo de fondo */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E0E7FF"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Círculo de progreso */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke={timeLeft <= 10 ? '#EF4444' : '#3B82F6'}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 - (2 * Math.PI * 28 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              {/* Contenido central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}>
                  {timeLeft}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-2xl p-6">
          {/* Question */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              ¿Cuál es el sonido correcto?
            </h1>
            <p className="text-sm text-gray-600">
              Junta homocinética dañada
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-6">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg">
              <video
                className="w-full h-full object-cover"
                controls
                poster="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=450&fit=crop"
              >
                <source src="/video-junta-homocinetica.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                <div className="text-center text-white p-4">
                  <Volume2 className="w-12 h-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium">Video de referencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sound Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {sounds.map((sound, index) => (
              <button
                key={sound.id}
                onClick={() => handleSoundSelect(sound.id)}
                disabled={showResult}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform ${
                  selectedSound === sound.id && !showResult
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 active:scale-95'
                } ${
                  showResult && sound.id === selectedSound
                    ? sound.isCorrect
                      ? 'border-green-500 bg-green-50 scale-105'
                      : 'border-red-500 bg-red-50 scale-95'
                    : ''
                } ${showResult ? 'cursor-not-allowed' : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideUp 0.5s ease-out forwards'
                }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{sound.emoji}</div>
                  <span className="text-sm font-bold text-gray-700">
                    {sound.label}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySound(sound.id);
                    }}
                    disabled={showResult}
                    className={`mt-3 w-full p-2 rounded-xl transition-all duration-300 ${
                      playingSound === sound.id
                        ? 'bg-blue-500 scale-110'
                        : 'bg-blue-100 hover:bg-blue-200 active:scale-95'
                    } ${showResult ? 'opacity-50' : ''}`}
                  >
                    <Volume2
                      className={`w-5 h-5 mx-auto ${
                        playingSound === sound.id ? 'text-white' : 'text-blue-600'
                      }`}
                    />
                  </button>
                </div>
                
                {showResult && sound.id === selectedSound && (
                  <div className="absolute -top-2 -right-2 animate-pop-in">
                    {sound.isCorrect ? (
                      <div className="bg-green-500 p-2 rounded-full shadow-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-500 p-2 rounded-full shadow-lg">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedSound}
                className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform active:scale-95 ${
                  selectedSound
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Verificar Respuesta
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                Nueva Pregunta
              </button>
            )}
          </div>
        </div>

        {/* Result Card */}
        {showResult && (
          <div className={`rounded-b-3xl shadow-2xl p-6 animate-slide-up ${
            isCorrect 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : 'bg-gradient-to-br from-red-500 to-red-600'
          }`}>
            <div className="text-center text-white">
              <div className="text-6xl mb-3 animate-bounce-in">
                {isCorrect ? '🎉' : '😔'}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
              </h2>
              <p className="text-lg opacity-90">
                {isCorrect
                  ? `+${100 + Math.floor(timeLeft / 5)} puntos`
                  : 'Sigue intentando'}
              </p>
              {isCorrect && timeLeft > 20 && (
                <p className="text-sm mt-2 opacity-80">
                  ⚡ Bonus por velocidad!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-pop-in {
          animation: pop-in 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}