import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { categorias } from "@/src/data/Categorias";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import renderStars from "@/utils/renderStars";
export default function CardTaller({ taller }) {
  const { data } = useQuery(GET_CALIFICACION_OPINIONES, { 
    variables: { id: taller?.id } 
  });

  const getBusinessType = () => {
    if (taller?.tipo === 'Almacen') return "Almacén de Autopartes";
    if (taller?.tipo === 'Mecanico a Domicilio') return "Mecánico a domicilio";
    return "Taller Mecánico";
  };

  return (
    <Link 
      href={`/${taller?.userName}`} 
      className="group block bg-white overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200"
    >
      {/* Header con foto circular y rating */}
      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-start gap-5">
          {/* Foto Circular */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm ring-2 ring-gray-100 overflow-hidden">
              <img
                src={taller?.fotoperfil || '/taller-ilustration.webp'}
                alt={taller?.nombre}
                loading="lazy"
                className={`w-full h-full transition-transform duration-300 group-hover:scale-110 ${
                  taller?.fotoperfil ? 'object-cover' : 'object-contain p-2'
                }`}
              />
            </div>
          </div>

          {/* Info principal */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-1.5">
              {getBusinessType()}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight mb-2">
              {taller?.nombre}
            </h3>
            
            {/* Rating con estrellas */}
            
{data?.getCalificacionOpiniones > 0 && (
            <div className="flex items-center gap-2 text-sm sm:text-base justify-center sm:justify-start">
                  <div className="flex gap-0.5 text-lg">
                    {renderStars(Number(data?.promediocalificacionesmaps))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {data?.promediocalificacionesmaps}
                  </span>
                  <span className="text-gray-500">
                    ({data?.numerocalificacionesmaps || 1} reseñas)
                  </span>
                </div>
)}
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="truncate">{taller.direccion}, {taller?.ciudad}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contenido - Categorías en slider horizontal */}
      <div className="px-6 py-4 bg-white">
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-2 min-w-max">
            {taller?.categorias?.map((el) => {
              const category = categorias?.find(
                (cat) => cat.db.toLowerCase() === el.toLowerCase()
              );
              return (
                category && (
                  <div
                    key={category?.nombre}
                    className="inline-flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 transition-colors hover:bg-gray-100 flex-shrink-0"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <img
                        src={`/${category?.img}`}
                        alt={`Servicio de ${el}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                      {category?.nombre}
                    </span>
                  </div>
                )
              );
            })}
          </div>
        </div>
        
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {/* Footer con CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button className="w-full bg-[#407BFF] text-white font-medium text-sm py-2.5 transition-all duration-200 hover:bg-blue-700 flex items-center justify-center gap-2">
          <span>Ver perfil</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </Link>
  );
}