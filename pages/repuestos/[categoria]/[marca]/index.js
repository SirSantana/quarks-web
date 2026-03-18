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
import { slugify } from "../index"; // reuse slugify from categoria page
import { useRouter } from "next/router";

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
export default function MarcaPage({
  productos,
  categoriaLabel,
  marcaLabel,
  categoriaSlug,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();

  const formatLabel = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const catClean = formatLabel(categoriaLabel);

  const seoTitle = `${catClean} para ${marcaLabel} · Repuestos Originales Colombia`;
  const seoDescription = `Compra ${catClean} para carros ${marcaLabel} al mejor precio en Colombia. Catálogo completo de repuestos certificados con envío rápido a nivel nacional.`;
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    let filtered = productos.filter(
      (p) =>
        !q ||
        p.Nombre?.toLowerCase().includes(q) ||
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
      title={seoTitle}
      navbarRepuestos={false}
      visibleNavbar={true}
      description={seoDescription}
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
                  <Home size={12} className="shrink-0" aria-hidden="true" />
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
                    href={`/repuestos/${router.query.categoria.replaceAll(' ', '-')}`}
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
                    href={`/repuestos/${router.query.categoria.replaceAll(' ', '-')}/${router.query.marca.replaceAll(' ', '-')}`}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {router.query.marca}
                  </a>
                </nav>
              </div>
            </div>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-gray-950 tracking-tight leading-snug mb-2">
              {catClean} para {marcaLabel}
            </h1>
            <p className="text-[16px] text-gray-400 mb-8">
              Contamos con {productos.length}{" "}
              {productos.length === 1
                ? "referencia técnica"
                : "referencias técnicas"}{" "}
              de <strong>{catClean}</strong> para vehículos{" "}
              <strong>{marcaLabel}</strong> en Colombia.
            </p>

            {/* Controls */}
            <div className="flex items-end gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <label htmlFor="search-marca" className="sr-only">
                  Buscar en {marcaLabel}
                </label>
                <input
                  id="search-marca"
                  type="search"
                  placeholder={`Buscar en ${marcaLabel}…`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="shrink-0">
                <label
                  htmlFor="sort-marca"
                  className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5"
                >
                  Ordenar
                </label>
                <select
                  id="sort-marca"
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

            {/* Otras marcas de esta categoría */}
            <OtherMarcas
              categoriaSlug={categoriaSlug}
              currentMarca={marcaLabel}
            />
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
                Intenta con otros términos.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 list-none p-0"
              aria-label={`Repuestos ${marcaLabel}`}
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
              aria-label={`Repuestos ${marcaLabel}`}
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
            {/* Intro */}
            <div className="max-w-[780px] mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                Quarks · {catClean} · {marcaLabel}
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                Distribución Especializada de {catClean} para {marcaLabel}
              </h2>
              <p className="text-[16px] text-gray-400 leading-relaxed">
                En nuestro catálogo digital nos especializamos en la
                comercialización de{" "}
                <strong className="text-gray-700 font-semibold">
                  autopartes de alta precisión
                </strong>
                . Entendemos que un{" "}
                <strong className="text-gray-700 font-semibold">
                  {marcaLabel}
                </strong>{" "}
                requiere componentes que respeten los estándares de ingeniería
                original para garantizar el rendimiento y la seguridad en las
                vías colombianas.
              </p>
            </div>

            {/* Beneficios técnicos */}
            <div className="grid sm:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 mb-16">
              {[
                {
                  icon: <Package className="w-5 h-5" />,
                  titulo: "Stock Disponible",
                  texto: (
                    <>
                      Mantenemos inventario real de{" "}
                      <strong className="text-gray-600 font-semibold">
                        {catClean}
                      </strong>{" "}
                      para despacho el mismo día a Bogotá, Medellín, Cali y
                      Barranquilla.
                    </>
                  ),
                },
                {
                  icon: <ChevronRight className="w-5 h-5" />,
                  titulo: "Calidad Certificada",
                  texto: (
                    <>
                      Solo trabajamos con fabricantes que cumplen normas ISO,
                      asegurando que cada repuesto de{" "}
                      <strong className="text-gray-600 font-semibold">
                        {marcaLabel}
                      </strong>{" "}
                      sea de larga duración.
                    </>
                  ),
                },
                {
                  icon: <Search className="w-5 h-5" />,
                  titulo: "Asesoría Técnica",
                  texto: (
                    <>
                      ¿No estás seguro del modelo? Nuestro equipo técnico valida
                      la compatibilidad de tus{" "}
                      <strong className="text-gray-600 font-semibold">
                        {catClean}
                      </strong>{" "}
                      antes del envío.
                    </>
                  ),
                },
              ].map(({ icon, titulo, texto }) => (
                <div key={titulo} className="bg-white p-8">
                  <div className="w-9 h-9 bg-[#eef2ff] text-[#407BFF] rounded-xl flex items-center justify-center mb-5">
                    {icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">
                    {titulo}
                  </h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {texto}
                  </p>
                </div>
              ))}
            </div>

            {/* Texto largo + FAQ */}
            <div className="grid md:grid-cols-2 gap-12 items-start pb-16">
              {/* Texto largo */}
              <div>
                <h3 className="text-[20px] font-bold text-gray-950 tracking-tight mb-6">
                  ¿Por qué elegir nuestros repuestos para {marcaLabel}?
                </h3>
                <div className="space-y-4">
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    Adquirir{" "}
                    <strong className="text-gray-700 font-semibold">
                      {catClean} para vehículos {marcaLabel}
                    </strong>{" "}
                    en el mercado colombiano puede ser un reto debido a la
                    proliferación de piezas genéricas de baja calidad. Nuestra
                    propuesta se basa en ofrecer componentes{" "}
                    <strong className="text-gray-700 font-semibold">
                      Premium y OEM (Original Equipment Manufacturer)
                    </strong>{" "}
                    que han sido probados en las condiciones topográficas
                    exigentes de Colombia.
                  </p>
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    Ya sea que busques mantenimiento preventivo o correctivo,
                    cada pieza de {marcaLabel} en nuestro inventario cuenta con
                    trazabilidad y garantía directa. Esto reduce el tiempo de
                    permanencia de tu vehículo en el taller y optimiza el
                    consumo de combustible al mantener la eficiencia original
                    del sistema.
                  </p>
                  <ul className="list-none p-0 space-y-2.5 pt-2">
                    {[
                      "Compatibilidad garantizada con líneas sedán, SUV y Pick-up.",
                      "Materiales resistentes al calor y la fricción extrema.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-[14px] font-medium text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#407BFF] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-1">
                    Soporte
                  </p>
                  <h3 className="text-[17px] font-bold text-gray-950">
                    Preguntas Frecuentes
                  </h3>
                </div>
                <ul className="list-none p-0 divide-y divide-gray-100">
                  {[
                    {
                      q: "¿Tienen envío a todo Colombia?",
                      a: (
                        <>
                          Sí, cubrimos el 98% del territorio nacional. Los
                          tiempos de entrega para{" "}
                          <strong className="text-gray-700 font-semibold">
                            {catClean}
                          </strong>{" "}
                          suelen ser de 24 a 48 horas hábiles.
                        </>
                      ),
                    },
                    {
                      q: `¿Cómo sé si le sirve a mi ${marcaLabel}?`,
                      a: "Puedes comparar el código de referencia en la descripción o enviarnos el número de chasis (VIN) para una validación exacta.",
                    },
                    {
                      q: "¿Manejan repuestos originales?",
                      a: "Contamos con una línea de piezas originales y también marcas homologadas de primer nivel que ofrecen la misma durabilidad a un precio más competitivo.",
                    },
                  ].map(({ q, a }) => (
                    <li key={q} className="px-8 py-6">
                      <h4 className="text-[14px] font-semibold text-gray-900 mb-2">
                        {q}
                      </h4>
                      <p className="text-[13px] text-gray-400 leading-relaxed">
                        {a}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// ── Other marcas nav ───────────────────────────────────────────────────────────
function OtherMarcas({ categoriaSlug, currentMarca }) {
  const marcas = useMemo(() => {
    const categorias = [
      ...new Set(autopartesData.map((item) => item.Tipo).filter(Boolean)),
    ];
    const categoriaLabel = categorias.find(
      (cat) => slugify(cat) === categoriaSlug,
    );
    if (!categoriaLabel) return [];
    const productos = autopartesData.filter((p) => p.Tipo === categoriaLabel);
    return [...new Set(productos.map((p) => p.Marca).filter(Boolean))].sort();
  }, [categoriaSlug]);

  if (marcas.length <= 1) return null;

  return (
    <nav
      aria-label="Otras marcas"
      className="flex gap-2 overflow-x-auto scrollbar-hide pt-4 pb-1"
    >
      <Link
        href={`/repuestos/${categoriaSlug}`}
        className="shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
        style={{ textDecoration: "none" }}
      >
        Todas las marcas
      </Link>
      {marcas.map((m) => (
        <Link
          key={m}
          href={`/repuestos/${categoriaSlug}/${slugify(m)}`}
          className={`shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-colors ${
            m === currentMarca
              ? "border-[#407BFF] bg-[#eef2ff] text-[#407BFF]"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
          style={{ textDecoration: "none" }}
        >
          {m}
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

  const paths = [];
  categorias.forEach((cat) => {
    const productos = autopartesData.filter((p) => p.Tipo === cat);
    const marcas = [...new Set(productos.map((p) => p.Marca).filter(Boolean))];
    marcas.forEach((marca) => {
      paths.push({
        params: {
          categoria: slugify(cat),
          marca: slugify(marca),
        },
      });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { categoria, marca } = params;

  const categorias = [
    ...new Set(autopartesData.map((item) => item.Tipo).filter(Boolean)),
  ];
  const categoriaLabel = categorias.find((cat) => slugify(cat) === categoria);
  if (!categoriaLabel) return { notFound: true };

  const productosDeCat = autopartesData.filter(
    (p) => p.Tipo === categoriaLabel,
  );
  const marcas = [
    ...new Set(productosDeCat.map((p) => p.Marca).filter(Boolean)),
  ];
  const marcaLabel = marcas.find((m) => slugify(m) === marca);
  if (!marcaLabel) return { notFound: true };

  const productos = productosDeCat.filter((p) => p.Marca === marcaLabel);

  return {
    props: { productos, categoriaLabel, marcaLabel, categoriaSlug: categoria },
  };
}
