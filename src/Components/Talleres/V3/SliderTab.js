
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Award, Clock, MessageCircle, Star, HelpCircle, FileText } from 'lucide-react';

export default function SliderTab ({ sections })  {
const [activeSection, setActiveSection] = useState('ubicacion');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);

  // Detectar scroll para agregar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll a la sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
  };

  // Iconos para cada sección
  const getIcon = (id) => {
    const icons = {
      ubicacion: MapPin,
      servicios: Award,
      horarios: Clock,
      contacto: MessageCircle,
      resenas: Star,
      preguntas: HelpCircle,
      acerca: FileText
    };
    return icons[id] || Award;
  };

  return (
    <nav 
      className="sticky  top-0 z-2 bg-white border-b border-gray-200"
    >
      <div className="lg:max-w-7xl lg:mx-auto lg:px-6">
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 py-3 overflow-x-auto scrollbar-hide px-4 lg:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {sections.map((section) => {
            const Icon = getIcon(section.id);
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm
                  transition-all duration-200 whitespace-nowrap shrink-0
                  ${isActive 
                    ? 'bg-[#407BFF] text-white shadow-lg shadow-[#407BFF]/30' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CSS para ocultar scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};