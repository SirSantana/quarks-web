import Button, { ButtonVariant } from "../../Button/Button";
import { ArrowRight, Search, Star, Wallet } from "lucide-react";
import { useRouter } from "next/router";

// Este componente utiliza estilos en línea y clases de utilidad (si usas Tailwind en tu proyecto)
// para mantener el estilo moderno y limpio.

export default function ComparisonQuoteBanner({ services, handleQuoteClick }) {
  const router = useRouter();

  const handleCompareClick = () => {
        router.push(`${router.asPath}/cotizar`)

  };

  return (
    <div className="w-full bg-white border border-gray-200 p-6 mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          ¿Quieres comparar precios?
        </h3>
        <p className="text-sm text-gray-600">
          Envía tu solicitud a varios talleres y recibe múltiples cotizaciones
        </p>
      </div>

      {/* Lista de talleres difuminada */}
      <div className="relative mb-4">
        <div className="space-y-3">
          {/* Taller 1 */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 opacity-70">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gray-300 fill-current" />
                ))}
                <span className="text-xs text-gray-400 ml-1">4.8</span>
              </div>
            </div>
          </div>

          {/* Taller 2 */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 opacity-50">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gray-300 fill-current" />
                ))}
                <span className="text-xs text-gray-400 ml-1">4.7</span>
              </div>
            </div>
          </div>

          
        </div>

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white pointer-events-none"></div>
      </div>

      {/* Beneficios */}
      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-600">
        <ul className="space-y-1 text-xs text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
            <span>Recibe hasta 5 cotizaciones</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
            <span>Compara y ahorra hasta 30%</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
            <span>Gratis y sin compromiso</span>
          </li>
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleCompareClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <span>Comparar Precios</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}