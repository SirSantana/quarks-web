import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Filter, Heart, Truck, Shield, Award } from 'lucide-react';

// Datos de ejemplo para los productos
const sampleProducts = [
  {
    id: 1,
    name: "Pastillas de Freno Cerámicas Premium",
    brand: "Brembo",
    price: 89900,
    originalPrice: 119900,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    rating: 4.8,
    reviews: 124,
    category: "Frenos",
    compatibility: "Toyota Corolla 2015-2023",
    inStock: true,
    features: ["Duración extendida", "Bajo ruido", "Resistente al calor"]
  },
  {
    id: 2,
    name: "Filtro de Aceite Original",
    brand: "Mann Filter",
    price: 24900,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop",
    rating: 4.6,
    reviews: 89,
    category: "Filtros",
    compatibility: "Honda Civic 2016-2024",
    inStock: true,
    features: ["OEM Quality", "Máxima filtración", "Fácil instalación"]
  },
  {
    id: 3,
    name: "Amortiguadores Deportivos",
    brand: "KYB",
    price: 189900,
    originalPrice: 249900,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
    rating: 4.9,
    reviews: 67,
    category: "Suspensión",
    compatibility: "Mazda 3 2014-2022",
    inStock: false,
    features: ["Mejor control", "Confort mejorado", "Durabilidad garantizada"]
  },
  {
    id: 4,
    name: "Batería de Alto Rendimiento",
    brand: "Bosch",
    price: 299900,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1609250291996-83e3c4c44e92?w=300&h=200&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Eléctrico",
    compatibility: "Universal 12V",
    inStock: true,
    features: ["60 meses garantía", "Arranque en frío", "Libre mantenimiento"]
  }
];

const categories = [
  "Todos", "Frenos", "Filtros", "Suspensión", "Eléctrico", "Motor", "Transmisión"
];

export default function AutoPartsStore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#fafbfc',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#2563eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              AP
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0 
            }}>
              AutoPartes Pro
            </h1>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative'
          }}>
            <button style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            margin: 0 
          }}>
            Encuentra las Mejores Autopartes
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            opacity: 0.9 
          }}>
            Calidad garantizada, envío rápido y precios competitivos
          </p>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Buscar por marca, modelo o referencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            />
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '3rem 2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Truck size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '0.5rem' }}>
                Envío Gratis
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                En compras superiores a $150.000
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Shield size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '0.5rem' }}>
                Garantía Extendida
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Hasta 24 meses en productos seleccionados
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Award size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '0.5rem' }}>
                Calidad Original
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Repuestos OEM y marcas reconocidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{
        backgroundColor: 'white',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Filter size={20} color="#6b7280" />
            <span style={{ fontWeight: '600', color: '#374151' }}>Categorías:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: selectedCategory === category ? '2px solid #2563eb' : '1px solid #d1d5db',
                  backgroundColor: selectedCategory === category ? '#dbeafe' : 'white',
                  color: selectedCategory === category ? '#2563eb' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image */}
              <div style={{ position: 'relative' }}>
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <Heart 
                    size={16} 
                    color={wishlist.includes(product.id) ? "#ef4444" : "#6b7280"}
                    fill={wishlist.includes(product.id) ? "#ef4444" : "none"}
                  />
                </button>
                
                {product.originalPrice && (
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    OFERTA
                  </div>
                )}
                
                {!product.inStock && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Agotado
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontSize: '12px',
                  color: '#2563eb',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {product.brand}
                </div>
                
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {product.name}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>
                  Compatible: {product.compatibility}
                </p>
                
                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                        color="#fbbf24"
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
                
                {/* Features */}
                <div style={{ marginBottom: '1rem' }}>
                  {product.features.slice(0, 2).map((feature, index) => (
                    <div key={index} style={{
                      fontSize: '12px',
                      color: '#059669',
                      backgroundColor: '#d1fae5',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      display: 'inline-block',
                      margin: '0.25rem 0.25rem 0.25rem 0'
                    }}>
                      ✓ {feature}
                    </div>
                  ))}
                </div>
                
                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div style={{
                        fontSize: '14px',
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  {product.originalPrice && (
                    <div style={{
                      fontSize: '14px',
                      color: '#ef4444',
                      fontWeight: 'bold'
                    }}>
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.inStock) addToCart(product);
                  }}
                  disabled={!product.inStock}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: product.inStock ? '#2563eb' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (product.inStock) {
                      e.target.style.backgroundColor = '#1d4ed8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.inStock) {
                      e.target.style.backgroundColor = '#2563eb';
                    }
                  }}
                >
                  {product.inStock ? 'Agregar al Carrito' : 'Producto Agotado'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#6b7280'
              }}
            >
              ×
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <img 
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px 0 0 0'
                  }}
                />
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#2563eb',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {selectedProduct.brand}
                </div>
                
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {selectedProduct.name}
                </h2>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(selectedProduct.rating) ? "#fbbf24" : "none"}
                        color="#fbbf24"
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedProduct.rating} ({selectedProduct.reviews} reseñas)
                  </span>
                </div>
                
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {formatPrice(selectedProduct.price)}
                </div>
                
                {selectedProduct.originalPrice && (
                  <div style={{
                    fontSize: '16px',
                    color: '#9ca3af',
                    textDecoration: 'line-through',
                    marginBottom: '1rem'
                  }}>
                    {formatPrice(selectedProduct.originalPrice)}
                  </div>
                )}
                
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Características:
                  </h4>
                  {selectedProduct.features.map((feature, index) => (
                    <div key={index} style={{
                      fontSize: '14px',
                      color: '#374151',
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: '#059669' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <strong style={{ fontSize: '14px', color: '#374151' }}>
                    Compatibilidad: {selectedProduct.compatibility}
                  </strong>
                </div>
                
                <button
                  onClick={() => {
                    if (selectedProduct.inStock) {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }
                  }}
                  disabled={!selectedProduct.inStock}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: selectedProduct.inStock ? '#2563eb' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: selectedProduct.inStock ? 'pointer' : 'not-allowed'
                  }}
                >
                  {selectedProduct.inStock ? 'Agregar al Carrito' : 'Producto Agotado'}
                </button>
              </div>
            </div>
            
            {/* Related Products */}
            <div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem' }}>
                Productos Similares
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {sampleProducts
                  .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                  .slice(0, 3)
                  .map(product => (
                    <div key={product.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedProduct(product)}
                    >
                      <img 
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginBottom: '0.5rem'
                        }}
                      />
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'bold' }}>
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '3rem 2rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem' }}>
                AutoPartes Pro
              </h4>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
                Tu tienda de confianza para autopartes de calidad. 
                Más de 10 años sirviendo a Colombia con productos originales y garantizados.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem' }}>
                Categorías
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Frenos y Suspensión', 'Motor y Transmisión', 'Sistema Eléctrico', 'Filtros y Aceites', 'Carrocería', 'Accesorios'].map(cat => (
                  <a key={cat} href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem' }}>
                Servicio al Cliente
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Contacto', 'Envíos y Devoluciones', 'Garantías', 'Preguntas Frecuentes', 'Términos y Condiciones', 'Política de Privacidad'].map(item => (
                  <a key={item} href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem' }}>
                Contáctanos
              </h4>
              <div style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.5rem' }}>📞 +57 1 234-5678</p>
                <p style={{ marginBottom: '0.5rem' }}>📧 info@autopartespro.co</p>
                <p style={{ marginBottom: '0.5rem' }}>📍 Bogotá, Colombia</p>
                <p style={{ marginBottom: '1rem' }}>🕒 Lun-Vie: 8AM-6PM, Sáb: 8AM-2PM</p>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  {['Facebook', 'Instagram', 'WhatsApp'].map(social => (
                    <a key={social} href="#" style={{
                      backgroundColor: '#374151',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '12px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #374151',
            marginTop: '2rem',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              © 2025 AutoPartes Pro. Todos los derechos reservados. | 
              Desarrollado con tecnología de vanguardia para tu experiencia de compra.
            </p>
          </div>
        </div>
      </footer>
    </div>
)}


    