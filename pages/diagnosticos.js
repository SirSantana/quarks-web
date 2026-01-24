import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  ChevronRight,
  Filter,
  Clock,
  Wrench,
  DollarSign,
  X,
  Eye,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
// Simulación de Header y Footer - reemplaza con tus componentes reales
const Header = () => <div className="h-16 bg-white border-b border-gray-100" />;
const FooterV2 = () => (
  <div className="h-32 bg-gray-50 border-t border-gray-100" />
);

export default function DiagnosticosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [diagnostics, setDiagnostics] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Datos de ejemplo - reemplazar con datos reales de tu API
  const diagnosticos = [
    {
      id: 1,
      slug: "mi-carro-no-arranca-en-frio",
      problema: "Mi carro no arranca en frío",
      carMake: "Toyota",
      carModel: "Corolla",
      carYear: "2018",
      city: "Bogotá",
      fecha: "2025-01-20",
      diagnostico:
        "El problema probablemente se debe a un sensor de temperatura defectuoso o batería débil que no proporciona suficiente corriente en temperaturas bajas.",
      precioMin: 150000,
      precioMax: 450000,
      vistas: 1245,
    },
    {
      id: 2,
      slug: "el-motor-vibra-al-ralenti",
      problema: "El motor vibra al ralentí",
      carMake: "Chevrolet",
      carModel: "Spark",
      carYear: "2020",
      city: "Medellín",
      fecha: "2025-01-19",
      diagnostico:
        "Las vibraciones en ralentí pueden indicar problemas con las bases del motor, bujías desgastadas o un sistema de inyección sucio.",
      precioMin: 200000,
      precioMax: 600000,
      vistas: 892,
    },
    {
      id: 3,
      slug: "frenos-hacen-ruido-al-frenar",
      problema: "Los frenos hacen ruido al frenar",
      carMake: "Renault",
      carModel: "Logan",
      carYear: "2019",
      city: "Cali",
      fecha: "2025-01-18",
      diagnostico:
        "El ruido en los frenos generalmente es causado por pastillas desgastadas, discos rayados o falta de lubricación en los componentes.",
      precioMin: 180000,
      precioMax: 400000,
      vistas: 2341,
    },
    {
      id: 4,
      slug: "bateria-se-descarga-rapido",
      problema: "La batería se descarga rápido",
      carMake: "Mazda",
      carModel: "3",
      carYear: "2021",
      city: "Barranquilla",
      fecha: "2025-01-17",
      diagnostico:
        "Una descarga rápida puede deberse al alternador defectuoso, consumos parásitos de accesorios o una batería al final de su vida útil.",
      precioMin: 250000,
      precioMax: 800000,
      vistas: 1567,
    },
    {
      id: 5,
      slug: "aire-acondicionado-no-enfria",
      problema: "El aire acondicionado no enfría",
      carMake: "Honda",
      carModel: "Civic",
      carYear: "2017",
      city: "Cartagena",
      fecha: "2025-01-16",
      diagnostico:
        "La falta de enfriamiento puede ser por fuga de refrigerante, compresor dañado, filtros sucios o problemas en el condensador.",
      precioMin: 300000,
      precioMax: 1200000,
      vistas: 3421,
    },
    {
      id: 6,
      slug: "luz-check-engine-encendida",
      problema: "La luz del check engine está encendida",
      carMake: "Volkswagen",
      carModel: "Jetta",
      carYear: "2016",
      city: "Bogotá",
      fecha: "2025-01-15",
      diagnostico:
        "El check engine puede activarse por múltiples razones: sensores de oxígeno, sistema de emisiones, bujías o problemas en el motor.",
      precioMin: 100000,
      precioMax: 500000,
      vistas: 1876,
    },
    {
      id: 7,
      slug: "transmision-automatica-falla",
      problema: "La transmisión automática falla al cambiar",
      carMake: "Nissan",
      carModel: "Sentra",
      carYear: "2019",
      city: "Medellín",
      fecha: "2025-01-14",
      diagnostico:
        "Problemas en la transmisión pueden deberse a bajo nivel de fluido, sensores defectuosos o desgaste interno de componentes.",
      precioMin: 400000,
      precioMax: 2000000,
      vistas: 987,
    },
    {
      id: 8,
      slug: "suspension-hace-ruido",
      problema: "La suspensión hace ruido en baches",
      carMake: "Hyundai",
      carModel: "Accent",
      carYear: "2020",
      city: "Cali",
      fecha: "2025-01-13",
      diagnostico:
        "Los ruidos en la suspensión suelen indicar bujes desgastados, amortiguadores dañados o rótulas flojas.",
      precioMin: 220000,
      precioMax: 650000,
      vistas: 1432,
    },
  ];

  const marcas = [...new Set(diagnosticos.map((d) => d.carMake))].sort();
  const years = [...new Set(diagnosticos.map((d) => d.carYear))].sort(
    (a, b) => b - a,
  );

  const filteredDiagnosticos = diagnosticos.filter((d) => {
    const matchSearch =
      d.problema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.carMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMake = !selectedMake || d.carMake === selectedMake;
    const matchYear = !selectedYear || d.carYear === selectedYear;

    return matchSearch && matchMake && matchYear;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMake("");
    setSelectedYear("");
  };

  const hasActiveFilters = searchTerm || selectedMake || selectedYear;

  // Función para obtener el logo de la marca
  useEffect(() => {
    const fetchDiagnostics = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/diagnosticos/publicos?page=${page}`);

        if (!res.ok) {
          throw new Error("Error al cargar diagnósticos");
        }

        const json = await res.json();

        setDiagnostics(json.data);
        setTotalPages(json.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, [page]);
  console.log(diagnostics);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Diagnósticos Realizados
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explora problemas comunes y encuentra soluciones para tu
                vehículo
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por problema, marca o modelo..."
                    className="w-full pl-12 pr-4 py-3.5 text-base border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white shadow-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors shadow-sm"
                >
                  <Filter className="w-5 h-5" />
                  Filtros
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Filters Dropdown */}
              {showFilters && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Marca
                      </label>
                      <select
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                      >
                        <option value="">Todas las marcas</option>
                        {marcas.map((marca) => (
                          <option key={marca} value={marca}>
                            {marca}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Año
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                      >
                        <option value="">Todos los años</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Results Header */}
          <div className="mb-8">
            <p className="text-base text-gray-600">
              <strong className="text-gray-900 font-semibold">
                {diagnostics.length}
              </strong>{" "}
              {diagnostics.length === 1
                ? "diagnóstico encontrado"
                : "diagnósticos encontrados"}
            </p>
          </div>

          {/* Masonry/List Layout */}
          <div className="space-y-6 mb-16">
            {diagnostics.map((diagnostico) => (
              <a
                key={diagnostico.id}
                href={`/diagnostico/${diagnostico.slug}`}
                className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left Section - Logo and Price */}
                  <div className="sm:w-56 bg-gradient-to-br from-gray-50 to-white p-8 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-100">
                    <div className="mb-6">
                      <img
                        src={`${diagnostico.car_make}.webp`}
                        alt={diagnostico.car_make}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    {/* <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                        Costo estimado
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${(diagnostico.precioMin / 1000).toFixed(0)}k - ${(diagnostico.precioMax / 1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-gray-500 mt-1">COP</p>
                    </div> */}
                    <span className="font-semibold text-gray-700 text-center">
                      {diagnostico.car_make} {diagnostico.car_model}{" "}
                      {diagnostico.car_year}
                    </span>
                  </div>

                  {/* Right Section - Content */}
                  <div className="flex-1 p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {diagnostico.mensaje_usuario}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {diagnostico.city}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {new Date(diagnostico.fecha).toLocaleDateString(
                              "es-CO",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                          {/* <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {diagnostico.vistas.toLocaleString()} vistas
                          </span> */}
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full group-hover:bg-blue-600 transition-colors flex-shrink-0">
                        <ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <div className="relative">
                      <p className="text-gray-700 leading-relaxed text-base max-h-20 overflow-hidden">
                        {diagnostico.diagnostico}
                      </p>

                      {/* Degradado */}
                      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
                    </div>
                    {diagnostico.servicios &&
                      diagnostico.servicios.length > 0 && (
                        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                          {diagnostico.servicios.map((servicio, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                            >
                              {servicio}
                            </span>
                          ))}
                        </div>
                      )}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                        Ver diagnóstico completo
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
              >
                Anterior
              </button>

              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          )}
          {/* No Results */}
          {filteredDiagnosticos.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Intenta con otros términos de búsqueda o ajusta los filtros
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                  Limpiar filtros
                </button>
              )}
            </div>
          )}

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                ¿No encontraste tu problema?
              </h2>
              <p className="text-blue-50 text-lg sm:text-xl mb-8 leading-relaxed">
                Obtén un diagnóstico personalizado para tu vehículo en menos de
                2 minutos
              </p>
              <button
                onClick={() => (window.location.href = "/diagnostico/nuevo")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
              >
                <Wrench className="w-6 h-6" />
                Crear nuevo diagnóstico
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterV2 />
    </div>
  );
}
