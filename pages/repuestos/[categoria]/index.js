import { useState, useMemo } from "react";
import Layout from "@/src/Components/Layout";
import Link from "next/link";
import {
  Search,
  Grid3x3,
  List,
  Package,
  ChevronRight,
  ArrowLeft,
  Home,
} from "lucide-react";
import autopartesData from "@/src/data/catalogo_autopartes.json";
import { useRouter } from "next/router";

// ── Helpers ───────────────────────────────────────────────────────────────────

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

function formatPrice(price) {
  if (!price) return null;
  const num = parseFloat(String(price).replace(/,/g, ""));
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(num);
}

function calcDiscount(precio, precio2) {
  if (!precio || !precio2) return null;
  const p1 = parseFloat(String(precio).replace(/,/g, ""));
  const p2 = parseFloat(String(precio2).replace(/,/g, ""));
  return Math.round(((p2 - p1) / p2) * 100);
}

// ── Grid card ─────────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const discount =
    product.Descuento || calcDiscount(product.Precio, product.Precio2);
  const price = product.Precio2
    ? Number(product.Precio2) * (1 - Number(product.Descuento || 0) / 100)
    : null;

  return (
    <Link
      href={`/repuesto/${product.titulo}`}
      className="group flex flex-col"
      style={{ textDecoration: "none" }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 mb-5">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.Nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-200" />
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#407BFF] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
            -{discount}%
          </div>
        )}
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#407BFF] mb-1.5">
        {product.Tipo}
        {product.Marca && (
          <span className="text-gray-400 ml-1.5">· {product.Marca}</span>
        )}
      </p>
      <h3 className="text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-4 group-hover:text-[#407BFF] transition-colors flex-1">
        {product.Nombre}
      </h3>
      {product.Modelo && (
        <p className="text-[12px] text-gray-400 mb-3 truncate">
          {product.Modelo}
        </p>
      )}
      {price !== null && (
        <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-gray-100">
          <span className="text-[16px] font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {discount > 0 && (
            <span className="text-[12px] text-gray-400 line-through">
              {formatPrice(product.Precio2)}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

// ── List row ──────────────────────────────────────────────────────────────────
function ProductRow({ product }) {
  const discount =
    product.Descuento || calcDiscount(product.Precio, product.Precio2);
  const price = product.Precio2
    ? Number(product.Precio2) * (1 - Number(product.Descuento || 0) / 100)
    : null;

  return (
    <Link
      href={`/repuesto/${product.titulo}`}
      className="group flex items-center gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 -mx-6 px-6 transition-colors"
      style={{ textDecoration: "none" }}
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.Nombre}
            className="w-full h-full object-cover"
            loading="lazy"
            width={80}
            height={80}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-7 h-7 text-gray-200" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#407BFF] mb-1">
          {product.Tipo}
          {product.Marca && (
            <span className="text-gray-400 ml-1.5">· {product.Marca}</span>
          )}
        </p>
        <h3 className="text-[15px] font-semibold text-gray-800 truncate group-hover:text-[#407BFF] transition-colors mb-1">
          {product.Nombre}
        </h3>
        <p className="text-[13px] text-gray-400">
          {product.Modelo}
          {product.Codigo && (
            <span className="ml-2 font-mono text-gray-300">
              #{product.Codigo}
            </span>
          )}
        </p>
      </div>

      {price !== null && (
        <div className="text-right shrink-0">
          <p className="text-[16px] font-bold text-gray-900">
            {formatPrice(price)}
          </p>
          {discount > 0 && (
            <p className="text-[12px] text-gray-400 line-through mt-0.5">
              {formatPrice(product.Precio2)}
            </p>
          )}
        </div>
      )}

      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#407BFF] shrink-0 max-sm:hidden transition-colors" />
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CategoriaPage({
  productos,
  categoriaLabel,
  marcas,
  categoriaSlug,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();
  const formatLabel = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
const labelClean = formatLabel(categoriaLabel);
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    let filtered = productos.filter(
      (p) =>
        !q ||
        p.Nombre?.toLowerCase().includes(q) ||
        p.Marca?.toLowerCase().includes(q) ||
        p.Modelo?.toLowerCase().includes(q) ||
        p.Codigo?.toLowerCase().includes(q),
    );

    filtered.sort((a, b) => {
      if (sortBy === "price") {
        const pa = parseFloat(String(a.Precio || "0").replace(/,/g, ""));
        const pb = parseFloat(String(b.Precio || "0").replace(/,/g, ""));
        return pa - pb;
      }
      return (a.Nombre || "").localeCompare(b.Nombre || "");
    });

    return filtered;
  }, [searchTerm, sortBy, productos]);

  return (
    <Layout
    
      title={`${labelClean} para Carros · Catálogo de Repuestos Colombia`}
      description={`Venta de ${labelClean} para todas las marcas (Chevrolet, Renault, Mazda). Repuestos originales y homologados con envíos a toda Colombia. ¡Compra online con seguridad!`}
      navbarRepuestos={false}
      visibleNavbar={true}
    >
      <div className="min-h-screen bg-white">
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-0 max-sm:px-4">
            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
              <div className="max-w-[1200px] mx-auto  py-3 max-sm:px-4">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-1.5 text-[12px] text-gray-400 flex-wrap"
                >
                  {/* <Home size={12} className="shrink-0" aria-hidden="true" /> */}
                  <ChevronRight
                    size={11}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="/repuestos"
                    className="hover:text-gray-700 transition-colors"
                  >
                    Catalogo de repuestos
                  </a>
                  <ChevronRight
                    size={11}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={`/repuestos/${router.query.categoria}`}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {router.query.categoria}
                  </a>
                  <ChevronRight
                    size={11}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={router.asPath}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {router.query.marca}
                  </a>
                </nav>
              </div>
            </div>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-gray-950 tracking-tight leading-snug mb-2">
              {labelClean} para Carros en Colombia
            </h1>
            <p className="text-[16px] text-gray-400 mb-8">
              {productos.length}{" "}
              {productos.length === 1
                ? "repuesto disponible"
                : "repuestos disponibles"}{" "}
              de {labelClean}.
            </p>

            {/* Controls */}
            <div className="flex items-end gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <label htmlFor="search-categoria" className="sr-only">
                  Buscar en {categoriaLabel}
                </label>
                <input
                  id="search-categoria"
                  type="search"
                  placeholder={`Buscar en ${categoriaLabel}…`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
                />
              </div>

              {/* Marca select — navega a /[categoria]/[marca] */}
              {marcas.length > 1 && (
                <div className="shrink-0">
                  <label
                    htmlFor="filter-marca"
                    className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5"
                  >
                    Marca
                  </label>
                  <select
                    id="filter-marca"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        window.location.href = `/repuestos/${categoriaSlug}/${slugify(e.target.value)}`;
                      }
                    }}
                    className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="">Todas las marcas</option>
                    {marcas.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort */}
              <div className="shrink-0">
                <label
                  htmlFor="sort-categoria"
                  className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5"
                >
                  Ordenar
                </label>
                <select
                  id="sort-categoria"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="name">Nombre</option>
                  <option value="price">Precio</option>
                </select>
              </div>

              {/* View toggle */}
              <div
                className="shrink-0 flex items-center border border-gray-200 rounded-xl overflow-hidden self-end"
                role="group"
                aria-label="Modo de vista"
              >
                <button
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Vista cuadrícula"
                  className={`px-3.5 py-2.5 transition-colors ${viewMode === "grid" ? "bg-[#407BFF] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  aria-label="Vista lista"
                  className={`px-3.5 py-2.5 border-l border-gray-200 transition-colors ${viewMode === "list" ? "bg-[#407BFF] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Count */}
              <div className="ml-auto self-end shrink-0 max-sm:hidden">
                <p
                  className="text-[13px] text-gray-400 pb-2.5"
                  aria-live="polite"
                >
                  <span className="font-semibold text-gray-700">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "producto" : "productos"}
                </p>
              </div>
            </div>

            {/* Marca pills — navegan a /[categoria]/[marca] */}
            {marcas.length > 1 && (
              <nav
                aria-label="Filtrar por marca"
                className="flex gap-2 overflow-x-auto scrollbar-hide pt-6 pb-1"
              >
                <Link
                  href={`/repuestos/${categoriaSlug}`}
                  className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-[#407BFF] bg-[#eef2ff] text-[#407BFF] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  Todas las marcas
                </Link>
                {marcas.map((m) => (
                  <Link
                    key={m}
                    href={`/repuestos/${categoriaSlug}/${slugify(m)}`}
                    className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-gray-200 text-gray-500 hover:border-[#407BFF] hover:text-[#407BFF] hover:bg-[#eef2ff] transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    {m}
                  </Link>
                ))}
              </nav>
            )}

            {/* Otras categorías */}
            <OtherCategories currentLabel={categoriaLabel} />
          </div>
        </div>

        {/* ── Products ──────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-12 max-sm:px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-28">
              <Search
                className="w-9 h-9 text-gray-200 mx-auto mb-5"
                aria-hidden="true"
              />
              <p className="text-[17px] font-semibold text-gray-900 mb-2">
                Sin resultados
              </p>
              <p className="text-[15px] text-gray-400">
                Intenta con otros términos o ajusta los filtros.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 list-none p-0"
              aria-label={`Repuestos de ${categoriaLabel}`}
            >
              {filteredProducts.map((product, i) => (
                <li
                  key={product.Codigo || product.titulo || product.Nombre || i}
                >
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <ul
              aria-label={`Repuestos de ${categoriaLabel}`}
              className="list-none p-0"
            >
              {filteredProducts.map((product, i) => (
                <li
                  key={product.Codigo || product.titulo || product.Nombre || i}
                >
                  <ProductRow product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* ── SECCIÓN SEO ─────────────────────────────────────────────────────────── */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 max-sm:px-4">
            {/* Introducción */}
            <div className="max-w-[780px] mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                Quarks · Autopartes · {categoriaLabel}
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                Especialistas en {categoriaLabel} para Carros en Colombia
              </h2>
              <p className="text-[15px] text-gray-400 leading-relaxed">
                Si buscas optimizar el rendimiento y la seguridad de tu
                vehículo, nuestra selección de{" "}
                <strong className="text-gray-700 font-semibold">
                  {categoriaLabel}
                </strong>{" "}
                es la solución definitiva. En el mercado colombiano, marcas como{" "}
                <strong className="text-gray-700 font-semibold">
                  Chevrolet, Renault, Mazda y Kia
                </strong>{" "}
                exigen componentes que cumplan con especificaciones técnicas
                rigurosas. Aquí encontrarás desde repuestos originales (OEM)
                hasta opciones homologadas de alta durabilidad, diseñadas
                específicamente para resistir la topografía y las condiciones de
                las vías nacionales.
              </p>
            </div>

            {/* Grilla de valor */}
            <div className="grid md:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 mb-16">
              {[
                {
                  titulo: "Calidad Certificada",
                  texto: (
                    <>
                      Cada pieza en nuestro catálogo de{" "}
                      <strong className="text-gray-600 font-semibold">
                        {categoriaLabel}
                      </strong>{" "}
                      ha sido verificada bajo estándares de calidad. Ofrecemos
                      componentes que garantizan una compatibilidad del 100% con
                      tu modelo de carro, evitando adaptaciones riesgosas.
                    </>
                  ),
                },
                {
                  titulo: "Marcas Líderes",
                  texto: (
                    <>
                      Distribuimos autopartes de fabricantes reconocidos
                      mundialmente. Ya sea que busques{" "}
                      <strong className="text-gray-600 font-semibold">
                        pastillas de freno, kits de embrague o amortiguadores
                      </strong>
                      , trabajamos con marcas que ofrecen garantía real en
                      Colombia.
                    </>
                  ),
                },
                {
                  titulo: "Envíos a Todo el País",
                  texto: (
                    <>
                      Llegamos a Bogotá, Medellín, Cali, Barranquilla y ciudades
                      intermedias. Tu pedido de{" "}
                      <strong className="text-gray-600 font-semibold">
                        repuestos para carros
                      </strong>{" "}
                      se despacha con logística prioritaria para minimizar el
                      tiempo de tu vehículo en el taller.
                    </>
                  ),
                },
              ].map(({ titulo, texto }) => (
                <div key={titulo} className="bg-white p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-5 bg-[#407BFF] rounded-full shrink-0" />
                    <h3 className="text-[16px] font-bold text-gray-900">
                      {titulo}
                    </h3>
                  </div>
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    {texto}
                  </p>
                </div>
              ))}
            </div>

            {/* Bloque de autoridad técnica */}
            <div className="border border-gray-100 rounded-2xl p-8 sm:p-12 mb-16">
              <h3 className="text-[20px] font-bold text-gray-950 tracking-tight mb-6">
                ¿Por qué comprar tus {categoriaLabel} con nosotros?
              </h3>
              <div className="max-w-[760px] space-y-4">
                <p className="text-[15px] text-gray-400 leading-relaxed">
                  Entendemos que el{" "}
                  <strong className="text-gray-700 font-semibold">
                    mantenimiento preventivo
                  </strong>{" "}
                  es la clave para prolongar la vida útil de tu motor y sistema
                  de transmisión. Por ello, nuestro buscador avanzado te permite
                  filtrar por{" "}
                  <strong className="text-gray-700 font-semibold">
                    código de parte, marca y modelo
                  </strong>
                  , asegurando que recibas exactamente lo que necesitas. Si no
                  encuentras la referencia específica de tu {categoriaLabel},
                  nuestro equipo técnico está disponible para asesorarte
                  mediante el número de chasis (VIN).
                </p>
                <p className="text-[15px] text-gray-400 leading-relaxed">
                  Además de {categoriaLabel}, contamos con un stock masivo en
                  otras categorías críticas como{" "}
                  <strong className="text-gray-700 font-semibold">
                    Suspensión y Dirección, Sistema de Frenos, Kit de
                    Distribución y Kit de Clutch
                  </strong>
                  . Somos el aliado estratégico de talleres y propietarios que
                  buscan repuestos confiables con la mejor relación
                  costo-beneficio del mercado.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-[800px] pb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                Soporte
              </p>
              <h3 className="text-[22px] font-bold text-gray-950 tracking-tight mb-10">
                Preguntas sobre Repuestos
              </h3>

              <ul className="list-none p-0 space-y-0">
                {[
                  {
                    q: "¿Tienen repuestos para todas las marcas en Colombia?",
                    a: (
                      <>
                        Sí, cubrimos el 90% del parque automotor colombiano,
                        incluyendo marcas populares como{" "}
                        <strong className="text-gray-700 font-semibold">
                          Toyota, Hyundai, Nissan, Ford y Volkswagen
                        </strong>
                        . Nuestro inventario se actualiza semanalmente con
                        nuevas referencias de {categoriaLabel}.
                      </>
                    ),
                  },
                  {
                    q: "¿Cómo garantizan que el repuesto le sirva a mi carro?",
                    a: (
                      <>
                        Utilizamos bases de datos técnicas vinculadas al{" "}
                        <strong className="text-gray-700 font-semibold">
                          código OEM
                        </strong>{" "}
                        de cada fabricante. Al seleccionar tu modelo y año, el
                        sistema filtra automáticamente las piezas compatibles.
                      </>
                    ),
                  },
                  {
                    q: "¿Cuál es el tiempo de entrega en ciudades principales?",
                    a: "Para Bogotá, Medellín y Cali, el tiempo estimado es de 24 a 48 horas hábiles. Para el resto de Colombia, el envío puede tardar entre 3 y 5 días dependiendo de la ubicación.",
                  },
                ].map(({ q, a }, i, arr) => (
                  <li
                    key={q}
                    className={`py-8 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <h4 className="text-[15px] font-semibold text-gray-900 mb-3">
                      {q}
                    </h4>
                    <p className="text-[14px] text-gray-400 leading-relaxed">
                      {a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// ── Other categories nav ───────────────────────────────────────────────────────
function OtherCategories({ currentLabel }) {
  const categories = useMemo(() => {
    return [
      ...new Set(autopartesData.map((item) => item.Tipo).filter(Boolean)),
    ].sort();
  }, []);

  return (
    <nav
      aria-label="Otras categorías"
      className="flex gap-2 overflow-x-auto scrollbar-hide pt-4 pb-1"
    >
      <Link
        href="/repuestos"
        className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
        style={{ textDecoration: "none" }}
      >
        Todos
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/repuestos/${slugify(cat)}`}
          className={`shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-colors ${
            cat === currentLabel
              ? "border-[#407BFF] bg-[#eef2ff] text-[#407BFF]"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
          style={{ textDecoration: "none" }}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}

// ── Static generation ──────────────────────────────────────────────────────────
export async function getStaticPaths() {
  const categorias = [
    ...new Set(autopartesData.map((item) => item.Tipo).filter(Boolean)),
  ];

  const paths = categorias.map((cat) => ({
    params: { categoria: slugify(cat) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { categoria } = params;

  const categorias = [
    ...new Set(autopartesData.map((item) => item.Tipo).filter(Boolean)),
  ];
  const categoriaLabel = categorias.find((cat) => slugify(cat) === categoria);

  if (!categoriaLabel) return { notFound: true };

  const productos = autopartesData.filter((p) => p.Tipo === categoriaLabel);
  const marcas = [
    ...new Set(productos.map((p) => p.Marca).filter(Boolean)),
  ].sort();

  return {
    props: { productos, categoriaLabel, marcas, categoriaSlug: categoria },
  };
}
