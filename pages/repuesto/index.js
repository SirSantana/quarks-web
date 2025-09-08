import { useState, useMemo } from 'react';
import Layout from '@/src/Components/Layout';
import autopartes from '@/src/data/catalogo_autopartes.json';
import Link from 'next/link';

export default function RepuestosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(autopartes.map(item => item.categoria).filter(Boolean))];
    return cats.sort();
  }, []);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = autopartes.filter(product => {
      const matchesSearch = product.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.categoria === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.titulo || '').localeCompare(b.titulo || '');
        case 'price':
          return (a.precio || 0) - (b.precio || 0);
        case 'category':
          return (a.categoria || '').localeCompare(b.categoria || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const ProductCard = ({ product }) => (
    <Link href={`/repuesto/${product.titulo}`} style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%'
      }}>
        {product.imagen && (
          <div style={{
            aspectRatio: '16/9',
            backgroundColor: '#f9fafb',
            overflow: 'hidden'
          }}>
            <img 
              src={product.imagen} 
              alt={product.titulo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}
        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              padding: '4px 12px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              borderRadius: '20px'
            }}>
              {product.categoria || 'General'}
            </span>
            {product.precio && (
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#16a34a'
              }}>
                ${product.precio.toLocaleString()}
              </span>
            )}
          </div>
          
          <h3 style={{
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px',
            fontSize: '16px',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.titulo}
          </h3>
          
          {product.descripcion && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.descripcion}
            </p>
          )}
          
          <div style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Ver detalles
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <Layout title="Catálogo de Repuestos">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Catálogo de Repuestos
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Encuentra el repuesto que necesitas para tu vehículo
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            {/* Búsqueda */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Buscar repuesto
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {/* Filtro por categoría */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenar por */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="category">Categoría</option>
              </select>
            </div>
          </div>

          {/* Estadísticas */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              {filteredProducts.length} productos encontrados
            </span>
            
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${viewMode === 'grid' ? '#3b82f6' : '#d1d5db'}`,
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'grid' ? '#eff6ff' : 'white',
                  color: viewMode === 'grid' ? '#3b82f6' : '#6b7280',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Cuadrícula
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${viewMode === 'list' ? '#3b82f6' : '#d1d5db'}`,
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'list' ? '#eff6ff' : 'white',
                  color: viewMode === 'list' ? '#3b82f6' : '#6b7280',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Lista
              </button>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(300px, 1fr))'
            : '1fr',
          gap: '24px'
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              gridColumn: '1 / -1'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                No se encontraron productos
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280'
              }}>
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}