import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_REVISIONES } from "@/graphql/queries";

export default function Revisiones() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, error } = useQuery(GET_ALL_REVISIONES, {
    variables: { page, limit },
    fetchPolicy: "cache-and-network",
  });

  const handleWhatsAppClick = (celular, almacen, servicio) => {
    const mensaje = encodeURIComponent(
      `Hola! ¿Cómo estuvo tu experiencia con el servicio de ${servicio} en ${almacen}?`
    );
    window.open(`https://wa.me/${celular}?text=${mensaje}`, '_blank');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#407bff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400">Error al cargar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Revisiones</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-3">
          {data.getAllRevisiones.map((rev) => (
            <div
              key={rev.id}
              className="group bg-white border border-gray-100 rounded-xl p-4 sm:p-6 hover:border-[#407bff] hover:shadow-sm transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Avatar del almacén */}
                <img
                  src={rev.almacen.fotoperfil}
                  alt={rev.almacen.nombre}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                />

                {/* Contenido principal */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-0.5 truncate">
                        {rev.marca} {rev.referencia}
                      </h3>
                      
                      <p className="text-sm text-gray-500 truncate">{rev.almacen.nombre}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 flex-shrink-0">
                      <span className="whitespace-nowrap">{rev.fecha}</span>
                      <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></span>
                      <button
                        onClick={() => handleWhatsAppClick(rev.celular, rev.almacen.nombre, rev.servicios)}
                        className="flex items-center gap-1.5 text-[#407bff] hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
                        title="Contactar por WhatsApp"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span className="hidden sm:inline">{rev.celular}</span>
                        <span className="sm:hidden">WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {rev.descripcion && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {rev.descripcion}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#407bff]/5 text-[#407bff]">
                      {rev.servicios}
                    </span>
                    <span className="text-xs text-gray-400">
                      {rev.almacen.revisiones.length} revisiones
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación minimalista */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          <div className="flex items-center gap-1 px-3 sm:px-4">
            <span className="text-sm font-medium text-gray-900">{page}</span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            className="px-3 sm:px-4 py-2 text-sm font-medium text-[#407bff] hover:text-blue-600 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}