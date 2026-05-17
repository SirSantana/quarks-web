import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import renderStars from "@/utils/renderStars";
import { MapPin, Clock, ShieldCheck, Hash, ChevronRight, CalendarCheck } from "lucide-react";

// Parsear el horario para mostrar si está abierto ahora
function getEstadoHorario(horarioStr) {
  if (!horarioStr) return { abierto: null, texto: null };
  try {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const now = new Date();
    const diaActual = dias[now.getDay()];
    const horaActual = now.getHours() * 60 + now.getMinutes();

    const entradas = horarioStr.split(',').map(e => e.trim());
    const entrada = entradas.find(e => e.startsWith(diaActual));
    if (!entrada) return { abierto: false, texto: 'Cerrado hoy' };
    if (entrada.includes('Cerrado')) return { abierto: false, texto: 'Cerrado hoy' };

    // Ej: "Lun 8:00 AM - 5:30 PM"
    const match = entrada.match(/(\d+:\d+\s?[AP]M)\s*-\s*(\d+:\d+\s?[AP]M)/i);
    if (!match) return { abierto: null, texto: entrada.replace(diaActual, '').trim() };

    const toMin = (str) => {
      const [time, period] = str.trim().split(/\s+/);
      let [h, m] = time.split(':').map(Number);
      if (period?.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (period?.toUpperCase() === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    };

    const apertura = toMin(match[1]);
    const cierre = toMin(match[2]);
    const abierto = horaActual >= apertura && horaActual < cierre;

    return {
      abierto,
      texto: abierto
        ? `Abierto · Cierra a las ${match[2].trim()}`
        : `Cerrado · Abre a las ${match[1].trim()}`
    };
  } catch {
    return { abierto: null, texto: null };
  }
}

export default function CardTaller({ taller, index }) {
  const { data } = useQuery(GET_CALIFICACION_OPINIONES, {
    variables: { id: taller?.id },
  });

  const rating = Number(data?.getCalificacionOpiniones);
  const { abierto, texto: textoHorario } = getEstadoHorario(taller?.horario);

  const handleContact = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hola ${taller?.nombre}, vi tu taller y me gustaría contactarte.`);
    window.open(`https://wa.me/${taller?.telefono || '573143551942'}?text=${msg}`, '_blank');
  };

  return (
    <Link
      href={`/${taller?.userName}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {/* Foto */}
      <div className="relative w-full h-36 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={taller?.fotoperfil || '/taller-ilustration.webp'}
          alt={taller?.nombre}
          loading="lazy"
          className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
            taller?.fotoperfil ? 'object-cover' : 'object-contain p-4'
          }`}
        />
        {index === 1 && (
          <div className="absolute top-2 left-2 bg-[#007BFF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
            Mejor coincidencia
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-3">

        {/* Número + Nombre */}
        <div className="flex items-start gap-1 mb-1.5">
          <span className="text-sm font-semibold text-gray-800 leading-tight flex-shrink-0">{index}.</span>
          <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
            {taller?.nombre}
          </h3>
          <ChevronRight size={13} className="flex-shrink-0 text-gray-300 group-hover:text-blue-400 mt-0.5 transition-colors" />
        </div>

        {/* Rating */}
        {rating > 0 ? (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">{renderStars(rating)}</div>
            <span className="text-xs font-bold text-gray-800">{rating}</span>
          </div>
        ) : (
          <div className="mb-2">
            <span className="text-[11px] text-gray-400">Sin reseñas aún</span>
          </div>
        )}

        {/* Metadatos */}
        <div className="flex flex-col gap-1.5 flex-1 mb-3">

          {/* Horario real */}
          {textoHorario && (
            <div className="flex items-center gap-1.5 text-xs">
              <Clock size={11} className="flex-shrink-0 text-gray-400" />
              <span className={`font-semibold ${abierto ? 'text-green-600' : 'text-red-500'}`}>
                {textoHorario}
              </span>
            </div>
          )}

          {/* Distancia + Dirección */}
          <div className="flex items-start gap-1.5 text-xs text-gray-600">
            <MapPin size={11} className="flex-shrink-0 text-gray-400 mt-0.5" />
            <span className="line-clamp-2">{taller.direccion}, {taller?.ciudad}</span>
          </div>

          {/* Garantía si existe */}
          {taller?.garantia && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <ShieldCheck size={11} className="flex-shrink-0 text-gray-400" />
              <span>{taller.garantia}</span>
            </div>
          )}

          {/* Categorías como tags pequeños */}
          {taller?.categorias?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-0.5">
              {taller.categorias.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5"
                >
                  {cat}
                </span>
              ))}
              {taller.categorias.length > 2 && (
                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
                  +{taller.categorias.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-1.5 mt-auto">
          {/* <button
            onClick={handleContact}
            className="flex items-center justify-center py-2 text-[11px] font-bold text-[#007BFF] border border-[#007BFF] rounded-lg hover:bg-blue-50 transition-colors"
          >
            Cotización
          </button> */}
          <button
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-1 py-2 text-[11px] font-bold text-white bg-[#007BFF] rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CalendarCheck size={11} />
            Disponibilidad
          </button>
        </div>
      </div>
    </Link>
  );
}