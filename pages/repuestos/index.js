import { useState } from "react";
import Layout from "@/src/Components/Layout";
import Link from "next/link";
import {
  Search,
  Grid3x3,
  List,
  Package,
  ChevronRight,
  ChevronLeft,
  Home,
} from "lucide-react";
import autopartesData from "@/src/data/catalogo_autopartes.json";

const PAGE_SIZE = 24;

function slugify(text) {
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

function getCategories(autopartes) {
  return [...new Set(autopartes.map((item) => item.Tipo).filter(Boolean))].sort();
}

function getFilteredProducts(autopartes, searchTerm, sortBy) {
  const q = searchTerm.toLowerCase();
  let filtered = autopartes.filter(
    (p) =>
      !q ||
      p.Nombre?.toLowerCase().includes(q) ||
      p.Tipo?.toLowerCase().includes(q) ||
      p.Marca?.toLowerCase().includes(q) ||
      p.Modelo?.toLowerCase().includes(q) ||
      p.Codigo?.toLowerCase().includes(q)
  );

  filtered.sort((a, b) => {
    if (sortBy === "price") {
      const pa = parseFloat(String(a.Precio || "0").replace(/,/g, ""));
      const pb = parseFloat(String(b.Precio || "0").replace(/,/g, ""));
      return pa - pb;
    }
    if (sortBy === "category") return (a.Tipo || "").localeCompare(b.Tipo || "");
    return (a.Nombre || "").localeCompare(b.Nombre || "");
  });

  return filtered;
}

// ── Grid card ────────────────────────────────────────────────────────────────
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
        {product.Brand && (
          <span className="text-gray-400 ml-1.5">· {product.Brand}</span>
        )}
      </p>
      <h3 className="text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-4 group-hover:text-[#407BFF] transition-colors flex-1">
        {product.Nombre}
      </h3>

      {product.Modelo && (
        <p className="text-[12px] text-gray-400 mb-3 truncate">{product.Modelo}</p>
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

// ── List row ─────────────────────────────────────────────────────────────────
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
            <span className="ml-2 font-mono text-gray-300">#{product.Codigo}</span>
          )}
        </p>
      </div>

      {price !== null && (
        <div className="text-right shrink-0">
          <p className="text-[16px] font-bold text-gray-900">{formatPrice(price)}</p>
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

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pages.push("...");
    }
  }
  const dedupedPages = pages.filter(
    (p, idx) => !(p === "..." && pages[idx - 1] === "...")
  );

  const goTo = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-1.5 pt-12"
    >
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-[#407BFF] hover:text-[#407BFF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {dedupedPages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-[13px] text-gray-300"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            aria-label={`Página ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-medium border transition-colors ${
              p === currentPage
                ? "bg-[#407BFF] border-[#407BFF] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#407BFF] hover:text-[#407BFF]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-[#407BFF] hover:text-[#407BFF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function RepuestosPage({ autopartes }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = getCategories(autopartes);
  const filteredProducts = getFilteredProducts(autopartes, searchTerm, sortBy);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(start, start + PAGE_SIZE);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const seoDescription =
    "Venta de repuestos para carros en Colombia. Encuentra frenos, suspensión y partes de motor con precios de distribuidor. Envíos nacionales y garantía de calidad.";

  return (
    <Layout
      title="Repuestos para Carros en Colombia | Catálogo de Autopartes"
      navbarRepuestos={false}
      visibleNavbar={true}
      description={seoDescription}
      repuestos={paginatedProducts}
    >
      <div className="min-h-screen bg-white">
        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-0 max-sm:px-4">
            <div className="border-b border-gray-100">
              <div className="max-w-[1200px] mx-auto py-3 max-sm:px-4">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-1.5 text-[12px] text-gray-400 flex-wrap"
                >
                  <Home size={12} className="shrink-0" aria-hidden="true" />
                  <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
                  <a href="/repuesto" className="hover:text-gray-700 transition-colors">
                    Catalogo de repuestos
                  </a>
                </nav>
              </div>
            </div>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-gray-950 tracking-tight leading-tight mb-2">
              Venta de Repuestos y Autopartes en Colombia
            </h1>
            <p className="text-[16px] text-gray-400 mb-8 max-w-[700px]">
              Explora nuestro catálogo de componentes de suspensión, frenos y motor. Calidad
              profesional para Chevrolet, Mazda, Renault y más marcas líderes.
            </p>

            {/* ── Controls bar ─────────────────────────────────────────── */}
            <div className="flex items-end gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <label htmlFor="search-repuestos" className="sr-only">
                  Buscar repuestos
                </label>
                <input
                  id="search-repuestos"
                  type="search"
                  placeholder="Buscar por nombre, código, marca…"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
                />
              </div>

              {/* Category select */}
              <div className="shrink-0">
                <label
                  htmlFor="filter-categoria"
                  className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5"
                >
                  Categoría
                </label>
                <select
                  id="filter-categoria"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      window.location.href = `/repuesto/${slugify(e.target.value)}`;
                    }
                  }}
                  className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="shrink-0">
                <label
                  htmlFor="sort-repuestos"
                  className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5"
                >
                  Ordenar
                </label>
                <select
                  id="sort-repuestos"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="name">Nombre</option>
                  <option value="price">Precio</option>
                  <option value="category">Categoría</option>
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

              {/* Result count */}
              <div className="ml-auto self-end shrink-0 max-sm:hidden">
                <p className="text-[13px] text-gray-400 pb-2.5" aria-live="polite">
                  <span className="font-semibold text-gray-700">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "producto" : "productos"}
                  {totalPages > 1 && (
                    <span className="ml-1 text-gray-300">
                      · pág. {safePage}/{totalPages}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Category pills */}
            {categories.length > 0 && (
              <nav
                aria-label="Filtrar por categoría"
                className="flex gap-2 overflow-x-auto scrollbar-hide pt-6 pb-1"
              >
                <Link
                  href="/repuesto"
                  className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-[#407BFF] bg-[#eef2ff] text-[#407BFF] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  Todos
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/repuestos/${slugify(cat)}`}
                    className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-gray-200 text-gray-500 hover:border-[#407BFF] hover:text-[#407BFF] hover:bg-[#eef2ff] transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    {cat}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* ── Product area ────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 py-12 max-sm:px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-28">
              <Search className="w-9 h-9 text-gray-200 mx-auto mb-5" aria-hidden="true" />
              <p className="text-[17px] font-semibold text-gray-900 mb-2">Sin resultados</p>
              <p className="text-[15px] text-gray-400">
                Intenta con otros términos o ajusta los filtros.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-8 sm:gap-10 list-none p-0"
              aria-label="Catálogo de repuestos"
            >
              {paginatedProducts.map((product, i) => (
                <li key={product.Codigo || product.titulo || product.Nombre || i}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <ul aria-label="Catálogo de repuestos" className="list-none p-0">
              {paginatedProducts.map((product, i) => (
                <li key={product.Codigo || product.titulo || product.Nombre || i}>
                  <ProductRow product={product} />
                </li>
              ))}
            </ul>
          )}

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* ── SECCIÓN SEO ─────────────────────────────────────────────────────────── */}
          <section className="mt-24 pt-16 border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6 max-sm:px-4">
              {/* Intro */}
              <div className="max-w-[780px] mb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                  Quarks · Autopartes
                </p>
                <h2 className="text-[28px] sm:text-[34px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                  Tu Distribuidora de Repuestos y Autopartes en Colombia
                </h2>
                <p className="text-[16px] text-gray-400 leading-relaxed">
                  En{" "}
                  <strong className="text-gray-700 font-semibold">Quarks Autopartes</strong>,
                  entendemos que el mantenimiento de tu vehículo no da espera. Por eso, hemos
                  consolidado el catálogo más completo de{" "}
                  <strong className="text-gray-700 font-semibold">
                    repuestos para carros en Colombia
                  </strong>
                  , cubriendo desde modelos comerciales de{" "}
                  <strong className="text-gray-700 font-semibold">
                    Chevrolet, Renault y Mazda
                  </strong>
                  , hasta vehículos de alta gama y utilitarios.
                </p>
              </div>

              {/* Grilla de categorías */}
              <div className="grid md:grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 mb-16">
                {[
                  {
                    titulo: "Sistema de Frenos y Seguridad",
                    descripcion:
                      "La seguridad es innegociable. Ofrecemos pastillas de freno cerámicas y semimetálicas, discos ventilados y bandas de freno con altos estándares de fricción.",
                    items: ["Líquido de frenos DOT 4", "Sensores de ABS", "Cilindros de rueda", "Discos de freno"],
                  },
                  {
                    titulo: "Suspensión, Dirección y Tracción",
                    descripcion:
                      "¿Ruidos al pasar por baches? Nuestro inventario incluye tijeras, terminales de dirección, axiales y bujes de suspensión reforzados.",
                    items: ["Kit de amortiguadores", "Rodamientos de rueda", "Puntas de eje", "Rótulas y terminales"],
                  },
                  {
                    titulo: "Motor y Kit de Distribución",
                    descripcion:
                      "Evita daños catastróficos manteniendo al día el kit de distribución. Correas dentadas, tensores y bombas de agua para motores a gasolina y diésel.",
                    items: ["Correas de tiempo", "Bombas de combustible", "Filtros de aire y aceite", "Válvulas y pistones"],
                  },
                  {
                    titulo: "Embrague y Transmisión (Clutch)",
                    descripcion:
                      "Kit de embrague completo con prensa, disco y balinera para Kia, Hyundai, Toyota y más. Aceites para cajas automáticas y manuales con especificaciones originales.",
                    items: ["Volante bimasa", "Cilindro maestro", "Kit de embrague", "Soportes de caja"],
                  },
                ].map(({ titulo, descripcion, items }) => (
                  <div key={titulo} className="bg-white p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-1.5 h-5 bg-[#407BFF] rounded-full shrink-0" />
                      <h3 className="text-[16px] font-bold text-gray-900">{titulo}</h3>
                    </div>
                    <p className="text-[14px] text-gray-400 leading-relaxed mb-5">{descripcion}</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 list-none p-0">
                      {items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-[#407BFF]">
                          <span className="w-1 h-1 rounded-full bg-[#407BFF] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Stats de logística */}
              <div className="border border-gray-100 rounded-2xl p-8 sm:p-12 mb-16">
                <div className="flex flex-col sm:flex-row sm:items-start gap-10 sm:gap-0 sm:divide-x divide-gray-100">
                  <div className="sm:pr-12 flex-1">
                    <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                      Logística Nacional
                    </p>
                    <h2 className="text-[22px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                      Despachos de Autopartes a Nivel Nacional
                    </h2>
                    <p className="text-[15px] text-gray-400 leading-relaxed">
                      No importa si te encuentras en Barranquilla, Bucaramanga, Pereira o cualquier
                      rincón de Colombia. Cada pieza es verificada antes del envío.
                    </p>
                  </div>
                  <div className="sm:pl-12 flex flex-row sm:flex-col gap-10 sm:gap-8 flex-wrap">
                    {[
                      { valor: "100%", label: "Garantía de Calidad" },
                      { valor: "24/48h", label: "Envíos Principales Ciudades" },
                      { valor: "+10k", label: "Referencias en Stock" },
                    ].map(({ valor, label }) => (
                      <div key={label}>
                        <p className="text-[28px] font-bold text-gray-950 leading-none mb-1">{valor}</p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.8px] text-gray-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="max-w-[800px] pb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                  Soporte
                </p>
                <h3 className="text-[22px] font-bold text-gray-950 tracking-tight mb-2">
                  Centro de Ayuda y Preguntas Frecuentes
                </h3>
                <p className="text-[15px] text-gray-400 mb-10">
                  Todo lo que necesitas saber antes de hacer tu pedido.
                </p>
                <ul className="list-none p-0 space-y-0">
                  {[
                    {
                      q: "¿Venden repuestos originales o genéricos?",
                      a: "Ofrecemos ambas opciones: repuestos originales (OEM) y repuestos homologados de marcas reconocidas con equilibrio perfecto entre costo y durabilidad.",
                    },
                    {
                      q: "¿Cómo puedo comprar con el número de chasis (VIN)?",
                      a: "Si no estás seguro de la referencia, contacta a nuestro equipo técnico con el número de chasis y localizamos el repuesto exacto en nuestro catálogo.",
                    },
                    {
                      q: "¿Qué medios de pago aceptan en Colombia?",
                      a: "Aceptamos transferencias bancarias, pagos con tarjeta de crédito, PSE y opciones de pago contra entrega en ciudades seleccionadas.",
                    },
                  ].map(({ q, a }, i, arr) => (
                    <li
                      key={q}
                      className={`py-8 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <h4 className="text-[15px] font-semibold text-gray-900 mb-3">{q}</h4>
                      <p className="text-[14px] text-gray-400 leading-relaxed">{a}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { autopartes: autopartesData || [] },
  };
}