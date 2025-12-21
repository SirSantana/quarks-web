import { useState, useMemo } from 'react';
import Layout from '@/src/Components/Layout';
import Link from 'next/link';
import { Search, Grid3x3, List, SlidersHorizontal, Package, Tag, ShoppingCart } from 'lucide-react';
import autopartes from '@/src/data/catalogo_autopartes.json';

export default function RepuestosPage({ autopartes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(autopartes.map(item => item.Tipo).filter(Boolean))];
    return cats.sort();
  }, [autopartes]);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = autopartes.filter(product => {
      const matchesSearch = product.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.Tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.Marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.Modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.Codigo?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.Tipo === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.Nombre || '').localeCompare(b.Nombre || '');
        case 'price':
          const priceA = parseFloat((a.Precio || '0').replace(/,/g, ''));
          const priceB = parseFloat((b.Precio || '0').replace(/,/g, ''));
          return priceA - priceB;
        case 'category':
          return (a.Tipo || '').localeCompare(b.Tipo || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, autopartes]);

  const formatPrice = (price) => {
    if (!price) return null;
    const numPrice = parseFloat(price.replace(/,/g, ''));
    return numPrice.toLocaleString('es-CO');
  };

  const calculateDiscount = (precio, precio2) => {
    if (!precio || !precio2) return null;
    const p1 = parseFloat(precio.replace(/,/g, ''));
    const p2 = parseFloat(precio2.replace(/,/g, ''));
    return Math.round(((p2 - p1) / p2) * 100);
  };

  const ProductCard = ({ product }) => {
    const discount = product.Descuento || calculateDiscount(product.Precio, product.Precio2);
    const hasDiscount = discount && discount > 0;

    return (
      <Link href={`/repuesto/${product.titulo}`} style={{ textDecoration: 'none' }}>
        <div className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          {/* Imagen */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br">
            {product.images?.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.Nombre}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-20 h-20 text-gray-300" />
              </div>
            )}
            
            {/* Badges superiores */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
              {hasDiscount && (
                <span className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full shadow-lg">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Brand badge */}
            {product.Brand && (
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full shadow-lg">
                  {product.Brand}
                </span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-5">
            {/* Código y Referencia */}
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              {product.Codigo && (
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {product.Codigo}
                </span>
              )}
              {product.Referencia && (
                <span className="px-2 py-0.5 bg-gray-100 rounded">
                  Ref: {product.Referencia}
                </span>
              )}
            </div>

            {/* Título */}
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-3 min-h-[2.5rem]">
              {product.Nombre}
            </h3>
            
            {/* Marca y Modelo */}
            {(product.Marca || product.Modelo) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.Marca && (
                  <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    {product.Marca}
                  </span>
                )}
                {product.Modelo && (
                  <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    {product.Modelo}
                  </span>
                )}
              </div>
            )}

            {/* Precios */}
            <div className="mb-4">
              {hasDiscount && product.Precio2 && (
                <div className="text-sm text-gray-400 line-through mb-1">
                  ${formatPrice(product.Precio2)}
                </div>
              )}
              {product.Precio && (
                <div className="text-2xl font-bold text-blue-600">
                  ${formatPrice(product.Precio)}
                </div>
              )}
            </div>
            
            {/* Botón de acción */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                <span>Ver detalles</span>
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Layout title="Catálogo de Repuestos">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Catálogo de Repuestos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra el repuesto perfecto para tu vehículo con la mejor calidad y precio
            </p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
            {/* Búsqueda principal */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, código, marca, modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Filtros en una fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordenar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="name">Nombre</option>
                  <option value="price">Precio</option>
                  <option value="category">Categoría</option>
                </select>
              </div>

              {/* Vista */}
              <div className="flex items-end">
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Cuadrícula</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Lista</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </span>
            </div>
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.Codigo || index} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600">
                Intenta ajustar los filtros de búsqueda o usar otros términos
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}


// Obtener datos del servidor
export async function getStaticProps() {
  return {
    props: {
      autopartes: autopartes || [],
    },
  };
}