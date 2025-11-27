import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Wrench, Zap } from 'lucide-react';

const AIAssistantBubble = ({ tallerName = "Taller" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: `¡Hola! 👋 Soy el asistente virtual de ${tallerName}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus en input cuando se abre
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setMessage('');

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. 🔧',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Wrench, text: 'Agendar revisión' },
    { icon: MessageCircle, text: 'Consultar precios' },
    { icon: Zap, text: 'Servicio urgente' }
  ];

  return (
    <>
      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col max-h-[600px] animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#407BFF] to-[#5b8fff] p-5 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Wrench size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Asistente Mecánico IA</h3>
                  <p className="text-white/80 text-xs">En línea • Responde en minutos</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-[#407BFF] text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${
                    msg.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-2 font-medium">Acciones rápidas:</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setMessage(action.text)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors whitespace-nowrap"
                    >
                      <Icon size={14} />
                      {action.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#407BFF] transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-12 h-12 bg-[#407BFF] hover:bg-[#3668d9] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[#407BFF]/30 hover:shadow-xl hover:shadow-[#407BFF]/40 disabled:shadow-none"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 w-16 h-16 bg-gradient-to-r from-[#407BFF] to-[#5b8fff] hover:from-[#3668d9] hover:to-[#4a7fee] rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110 group"
        aria-label="Abrir asistente virtual"
      >
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <>
            <MessageCircle size={28} className="text-white" />
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-[#407BFF] animate-ping opacity-20" />
          </>
        )}
      </button>

      <style jsx>{`
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

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default AIAssistantBubble;