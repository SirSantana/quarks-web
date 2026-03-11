import { useState, useMemo } from 'react';
import Layout from '@/src/Components/Layout';
import Link from 'next/link';
import { Search, Grid3x3, List, Package, ChevronRight } from 'lucide-react';
import autopartes from '@/src/data/catalogo_autopartes.json';

function formatPrice(price) {
  if (!price) return null;
  const num = parseFloat(String(price).replace(/,/g, ''));
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(num);
}

function calcDiscount(precio, precio2) {
  if (!precio || !precio2) return null;
  const p1 = parseFloat(String(precio).replace(/,/g, ''));
  const p2 = parseFloat(String(precio2).replace(/,/g, ''));
  return Math.round(((p2 - p1) / p2) * 100);
}

// ── Grid card ────────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const discount = product.Descuento || calcDiscount(product.Precio, product.Precio2);
  const price    = product.Precio2
    ? Number(product.Precio2) * (1 - Number(product.Descuento || 0) / 100)
    : null;

  return (
    <Link href={`/repuesto/${product.titulo}`} className="group flex flex-col" style={{ textDecoration: 'none' }}>
      {/* Image */}
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

      {/* Meta */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#407BFF] mb-1.5">
        {product.Tipo}
        {product.Brand && <span className="text-gray-400 ml-1.5">· {product.Brand}</span>}
      </p>
      <h3 className="text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-4 group-hover:text-[#407BFF] transition-colors flex-1">
        {product.Nombre}
      </h3>

      {/* Modelo pill */}
      {product.Modelo && (
        <p className="text-[12px] text-gray-400 mb-3 truncate">{product.Modelo}</p>
      )}

      {/* Price */}
      {price !== null && (
        <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-gray-100">
          <span className="text-[16px] font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {discount > 0 && (
            <span className="text-[12px] text-gray-400 line-through">{formatPrice(product.Precio2)}</span>
          )}
        </div>
      )}
    </Link>
  );
}

// ── List row ─────────────────────────────────────────────────────────────────
function ProductRow({ product }) {
  const discount = product.Descuento || calcDiscount(product.Precio, product.Precio2);
  const price    = product.Precio2
    ? Number(product.Precio2) * (1 - Number(product.Descuento || 0) / 100)
    : null;

  return (
    <Link
      href={`/repuesto/${product.titulo}`}
      className="group flex items-center gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 -mx-6 px-6 transition-colors"
      style={{ textDecoration: 'none' }}
    >
      {/* Thumb */}
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

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#407BFF] mb-1">
          {product.Tipo}{product.Marca && <span className="text-gray-400 ml-1.5">· {product.Marca}</span>}
        </p>
        <h3 className="text-[15px] font-semibold text-gray-800 truncate group-hover:text-[#407BFF] transition-colors mb-1">
          {product.Nombre}
        </h3>
        <p className="text-[13px] text-gray-400">
          {product.Modelo}
          {product.Codigo && <span className="ml-2 font-mono text-gray-300">#{product.Codigo}</span>}
        </p>
      </div>

      {/* Price */}
      {price !== null && (
        <div className="text-right shrink-0">
          <p className="text-[16px] font-bold text-gray-900">{formatPrice(price)}</p>
          {discount > 0 && (
            <p className="text-[12px] text-gray-400 line-through mt-0.5">{formatPrice(product.Precio2)}</p>
          )}
        </div>
      )}

      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#407BFF] shrink-0 max-sm:hidden transition-colors" />
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function RepuestosPage({ autopartes }) {
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode,         setViewMode]         = useState('grid');
  const [sortBy,           setSortBy]           = useState('name');

  const categories = useMemo(() => {
    return [...new Set(autopartes.map(item => item.Tipo).filter(Boolean))].sort();
  }, [autopartes]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    let filtered = autopartes.filter(p => {
      const matchSearch = !q ||
        p.Nombre?.toLowerCase().includes(q) ||
        p.Tipo?.toLowerCase().includes(q) ||
        p.Marca?.toLowerCase().includes(q) ||
        p.Modelo?.toLowerCase().includes(q) ||
        p.Codigo?.toLowerCase().includes(q);
      const matchCat = !selectedCategory || p.Tipo === selectedCategory;
      return matchSearch && matchCat;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'price') {
        const pa = parseFloat(String(a.Precio || '0').replace(/,/g, ''));
        const pb = parseFloat(String(b.Precio || '0').replace(/,/g, ''));
        return pa - pb;
      }
      if (sortBy === 'category') return (a.Tipo || '').localeCompare(b.Tipo || '');
      return (a.Nombre || '').localeCompare(b.Nombre || '');
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, autopartes]);

  return (
    <Layout title="Catálogo de Repuestos">
      <div className="min-h-screen bg-white">

        {/* ── Page header ────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-0 max-sm:px-4">
            <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
              Quarks · Autopartes
            </p>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-gray-950 tracking-tight leading-snug mb-2">
              Catálogo de Repuestos
            </h1>
            <p className="text-[16px] text-gray-400 mb-8">
              Encuentra el repuesto para tu vehículo con la mejor calidad y precio.
            </p>

            {/* ── Controls bar ────────────────────────────────────────── */}
            <div className="flex items-end gap-4 flex-wrap">

              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <label htmlFor="search-repuestos" className="sr-only">Buscar repuestos</label>
                <input
                  id="search-repuestos"
                  type="search"
                  placeholder="Buscar por nombre, código, marca…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
                />
              </div>

              {/* Category select */}
              <div className="shrink-0">
                <label htmlFor="filter-categoria" className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5">
                  Categoría
                </label>
                <select
                  id="filter-categoria"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="">Todas</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="shrink-0">
                <label htmlFor="sort-repuestos" className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5">
                  Ordenar
                </label>
                <select
                  id="sort-repuestos"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="name">Nombre</option>
                  <option value="price">Precio</option>
                  <option value="category">Categoría</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="shrink-0 flex items-center border border-gray-200 rounded-xl overflow-hidden self-end"
                role="group" aria-label="Modo de vista">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Vista cuadrícula"
                  className={`px-3.5 py-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#407BFF] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  aria-label="Vista lista"
                  className={`px-3.5 py-2.5 border-l border-gray-200 transition-colors ${viewMode === 'list' ? 'bg-[#407BFF] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Result count */}
              <div className="ml-auto self-end shrink-0 max-sm:hidden">
                <p className="text-[13px] text-gray-400 pb-2.5" aria-live="polite">
                  <span className="font-semibold text-gray-700">{filteredProducts.length}</span>{' '}
                  {filteredProducts.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>

            {/* Category pills */}
            {categories.length > 0 && (
              <nav aria-label="Filtrar por categoría" className="flex gap-2 overflow-x-auto scrollbar-hide pt-6 pb-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  aria-pressed={selectedCategory === ''}
                  className={`shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-colors ${
                    selectedCategory === ''
                      ? 'border-[#407BFF] bg-[#eef2ff] text-[#407BFF]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                    aria-pressed={selectedCategory === cat}
                    className={`shrink-0 px-4 py-2 text-[13px] font-medium rounded-full border transition-colors ${
                      selectedCategory === cat
                        ? 'border-[#407BFF] bg-[#eef2ff] text-[#407BFF]'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* ── Product area ───────────────────────────────────────────── */}
        <main className="max-w-[1200px] mx-auto px-6 py-12 max-sm:px-4">

          {filteredProducts.length === 0 ? (
            <div className="text-center py-28">
              <Search className="w-9 h-9 text-gray-200 mx-auto mb-5" aria-hidden="true" />
              <p className="text-[17px] font-semibold text-gray-900 mb-2">Sin resultados</p>
              <p className="text-[15px] text-gray-400">Intenta con otros términos o ajusta los filtros.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-8 sm:gap-10 list-none p-0"
              aria-label="Catálogo de repuestos"
            >
              {filteredProducts.map((product, i) => (
                <li key={product.Codigo || i}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <ul aria-label="Catálogo de repuestos" className="list-none p-0">
              {filteredProducts.map((product, i) => (
                <li key={product.Codigo || i}>
                  <ProductRow product={product} />
                </li>
              ))}
            </ul>
          )}
        </main>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { autopartes: autopartes || [] },
  };
}