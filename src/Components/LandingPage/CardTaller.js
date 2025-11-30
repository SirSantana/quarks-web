import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { categorias } from "@/src/data/Categorias";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import renderStars from "@/utils/renderStars";
import { MapPin, Star, ChevronRight } from "lucide-react";

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
      className="group block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-md w-full"
    >
      {/* Header con imagen y info principal */}
      <div className="p-5">
        <div className="flex gap-4">
          {/* Imagen */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
              <img
                src={taller?.fotoperfil || '/taller-ilustration.webp'}
                alt={taller?.nombre}
                loading="lazy"
                className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                  taller?.fotoperfil ? 'object-cover' : 'object-contain p-2'
                }`}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="inline-block text-xs font-semibold text-blue-500 uppercase tracking-wide">
                {getBusinessType()}
              </span>
              
              {/* Rating con estrellas */}
              
            </div>

            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-2">
              {taller?.nombre}
            </h3>
{data?.getCalificacionOpiniones > 0 && (
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg flex-shrink-0">
                  <div className="flex gap-0.5">
                    {renderStars(Number(data?.getCalificacionOpiniones))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {data?.getCalificacionOpiniones}
                  </span>
                </div>
              )}
            {/* Ubicación */}
            <div className="flex items-center gap-1.5 text-sm text-gray-600 my-2">
              <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">{taller.direccion}, {taller?.ciudad}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Categorías/Servicios */}
      {taller?.categorias && taller.categorias.length > 0 && (
        <div className="px-5 pb-4">
          <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
            <div className="flex gap-2 min-w-max">
              {taller.categorias.slice(0, 5).map((el) => {
                const category = categorias?.find(
                  (cat) => cat.db.toLowerCase() === el.toLowerCase()
                );
                return (
                  category && (
                    <div
                      key={category?.nombre}
                      className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 flex-shrink-0"
                    >
                      {category?.img && (
                        <img
                          src={`/${category.img}`}
                          alt=""
                          className="w-3.5 h-3.5"
                        />
                      )}
                      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                        {category?.nombre}
                      </span>
                    </div>
                  )
                );
              })}
              {taller.categorias.length > 5 && (
                <div className="inline-flex items-center bg-gray-100 rounded-md px-2.5 py-1.5 flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                    +{taller.categorias.length - 5} más
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer con CTA */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        <button className="w-full bg-blue-500 text-white font-semibold text-sm py-3 rounded-lg transition-colors hover:bg-blue-600 flex items-center justify-center gap-2">
          <span>Ver perfil completo</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
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
    </Link>
  );
}