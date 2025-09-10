import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Truck,
  Shield,
  Home,
} from "lucide-react";
import styles from "@/styles/Product.module.css";
import autopartes from "@/src/data/catalogo_autopartes.json";

const productData = {
  id: 1,
  name: "Pastillas de Freno Cerámicas Premium Brembo",
  brand: "Brembo",
  sku: "BRM-CER-001",
  price: 89900,
  originalPrice: 119900,
  compatibility: [
    "Toyota Corolla 2015-2023",
    "Toyota Yaris 2018-2024",
    "Mazda 2 2017-2023",
  ],
  inStock: true,
  stockQuantity: 15,
  rating: 4.8,
  reviewCount: 124,
  images: [
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609250291996-83e3c4c44e92?w=600&h=400&fit=crop",
  ],
  description:
    "Las pastillas de freno cerámicas Brembo Premium ofrecen un rendimiento excepcional con mayor durabilidad y menor ruido. Fabricadas con tecnología de vanguardia, estas pastillas proporcionan una frenada consistente y confiable en todas las condiciones de manejo.",
  features: [
    "Tecnología cerámica avanzada",
    "Reducción de ruido y vibración",
    "Resistencia superior al calor",
    "Menor generación de polvo",
    "Instalación directa",
  ],
};

const relatedProducts = [
  {
    id: 2,
    name: "Discos de Freno Ventilados",
    brand: "Brembo",
    price: 159900,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Kit de Frenos Completo",
    brand: "Brembo",
    price: 249900,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
    rating: 4.9,
  },
];

export default function ProductDetailPage({ repuesto }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = () => {
    setCartItems((prev) => [...prev, { ...productData, quantity }]);
  };

  const toggleWishlist = () => {
    setWishlist((prev) =>
      prev.includes(productData.id)
        ? prev.filter((id) => id !== productData.id)
        : [...prev, productData.id]
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === repuesto.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? repuesto.images.length - 1 : prev - 1
    );
  };

  const contactWhatsApp = () => {
    const phoneNumber = "573143551942"; // Número de Colombia con código de país
    const message = encodeURIComponent(
      "Hola, estoy interesado en el siguiente repuesto: " +
        `https://www.quarks.com.co/repuesto/${repuesto.titulo}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
  function generarVariantesSEO(data) {
    const modelos = data.Modelo.split("/").map((m) => m.trim());
    const base = [
      `${data.Tipo}`,
      `${data.Tipo} ${data.Marca}`,
      `${data.Nombre}`,
      `${data.Tipo} ${data.Referencia}`,
      `${data.Tipo} ${data.Brand}`,
    ];

    const extras = ["repuesto", "original", "precio", "barato", "venta"];

    let variantes = [];

    modelos.forEach((modelo) => {
      base.forEach((b) => {
        variantes.push(`${b} ${modelo}`);
        extras.forEach((extra) => {
          variantes.push(`${b} ${modelo} ${extra}`);
        });
      });
    });

    return [...new Set(variantes)]; // elimina duplicados
  }
  const variantesSEO = generarVariantesSEO(repuesto);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <div className={styles.breadcrumbContent}>
          <div className={styles.breadcrumbList}>
            <Home size={16} className={styles.breadcrumbIcon} />
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <a href="#" className={styles.breadcrumbLink}>
              {repuesto.Marca}
            </a>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <a href="#" className={styles.breadcrumbLink}>
              {repuesto.Tipo}
            </a>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbCurrent}>{repuesto.Nombre}</span>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.productGrid}>
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageContainer}>
              {repuesto?.images?.length > 0 && (
                <img
                  src={repuesto?.images?.[selectedImageIndex]}
                  alt={repuesto.Nombre}
                  className={styles.mainImage}
                />
              )}
              {!repuesto?.images?.length && (
                <div className={styles.noImage}>
                  <img
                    src="/piston-glosario.webp"
                    alt={`Imagen no disponible de ${repuesto.Nombre}`}
                    className={styles.mainImage}
                  />
                  <span className={styles.noImageLabel}>
                    Este repuesto no tiene imagen disponible
                  </span>
                </div>
              )}
              {repuesto?.images?.length > 0 && (
                <>
                  <button
                    onClick={prevImage}
                    className={`${styles.navigationButton} ${styles.prevButton}`}
                  >
                    <ChevronLeft size={20} color="#374151" />
                  </button>

                  <button
                    onClick={nextImage}
                    className={`${styles.navigationButton} ${styles.nextButton}`}
                  >
                    <ChevronRight size={20} color="#374151" />
                  </button>
                </>
              )}
            </div>

            <div className={styles.thumbnails}>
              {repuesto?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`${styles.thumbnailButton} ${
                    selectedImageIndex === index ? styles.active : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${repuesto.Nombre} vista ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            {/* Brand and Actions */}
            <div className={styles.productHeader}>
              <span className={styles.brandBadge}>{repuesto.Tipo}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className={styles.productTitle}>{repuesto.Nombre}</h1>
              <p className={styles.productSku}>SKU: {repuesto.Codigo}</p>
            </div>

            {/* Rating */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                <div className={styles.starsList}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.floor(productData.rating) ? "#fbbf24" : "none"
                      }
                      color={
                        i < Math.floor(productData.rating)
                          ? "#fbbf24"
                          : "#e5e7eb"
                      }
                    />
                  ))}
                </div>
                <span className={styles.ratingText}>{productData.rating}</span>
              </div>
              <span className={styles.reviewCount}>2 calificaciones</span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  {formatPrice(
                    Number(repuesto.Precio2) *
                      (1 - Number(repuesto.Descuento) / 100)
                  )}
                </span>

                {productData.originalPrice && (
                  <>
                    <span className={styles.originalPrice}>
                      {formatPrice(repuesto.Precio2)}
                    </span>
                    <span className={styles.discountBadge1}>
                      {repuesto.Descuento}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className={styles.savings}>
                Ahorras{" "}
                {formatPrice(
                  repuesto.Precio2 -
                    Number(repuesto.Precio2) *
                      (1 - Number(repuesto.Descuento) / 100)
                )}
              </p>
            </div>

            {/* Stock */}
            <div className={styles.stock}>
              <div className={styles.stockIndicator}></div>
              <span className={styles.stockText}>En stock 4 disponibles</span>
            </div>

            {/* Compatibility */}
            <div className={styles.compatibility}>
              <h3 className={styles.compatibilityTitle}>Compatible con:</h3>
              <div className={styles.compatibilityList}>
                {/* {productData.compatibility.map((vehicle, index) => (
                  <div key={index} className={styles.compatibilityItem}>
                    <Check size={18} color="#10b981" />
                    <span className={styles.compatibilityText}>{vehicle}</span>
                  </div>
                ))} */}
                {repuesto.Modelo?.split("/")?.map((modelo, index) => (
                  <div key={index} className={styles.compatibilityItem}>
                    <Check size={18} color="#10b981" />
                    <span className={styles.compatibilityText}>
                      {modelo.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className={styles.purchaseSection}>
              <div className={styles.quantityContainer}>
                <span className={styles.quantityLabel}>Cantidad:</span>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={styles.quantityButton}
                  >
                    <Minus size={16} color="#6b7280" />
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={styles.quantityButton}
                  >
                    <Plus size={16} color="#6b7280" />
                  </button>
                </div>
              </div>

              <button
                onClick={contactWhatsApp}
                className={styles.addToCartButton}
              >
                Estoy interesado •{" "}
                {formatPrice(
                  Number(repuesto.Precio2) *
                    (1 - Number(repuesto.Descuento) / 100) *
                    quantity
                )}
                {/* • 
                  -{formatPrice((repuesto.Precio2 - Number(repuesto.Precio2) *
                      (1 - Number(repuesto.Descuento) / 100) ) * quantity)} */}
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Descripción {toTitleCase(repuesto.Nombre)}
          </h2>
          <p className={styles.description}>
            La <strong>{repuesto.Tipo}</strong> código{" "}
            <strong>{repuesto.Codigo}</strong>, también conocida como{" "}
            <strong>{repuesto.Nombre}</strong>, es un repuesto diseñado para{" "}
            <strong>
              {repuesto.Marca} {repuesto.Modelo}
            </strong>
            . Compatible con la referencia original{" "}
            <strong>{repuesto.Referencia}</strong>, fabricado por{" "}
            <strong>{repuesto.Brand}</strong>, este componente garantiza
            durabilidad, resistencia y un ajuste perfecto para tu vehículo.
            Actualmente disponible con un descuento del{" "}
            <strong>{repuesto.Descuento}%</strong>, ofreciendo la mejor relación
            entre precio y calidad.
          </p>

          <div className={styles.featuresList}>
            {[
              `Repuesto nuevo y garantizado`,
              `Compatible con ${repuesto.Marca} ${repuesto.Modelo}`,
              `Referencia OEM: ${repuesto.Referencia}`,
              `Fabricado por ${repuesto.Brand}`,
              `Descuento especial del ${repuesto.Descuento}%`,
              `Ideal para mantener la suspensión en óptimas condiciones`,
            ].map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.featureBullet}></div>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Detalles Técnicos de{" "}
            {repuesto.Nombre?.replace(
              repuesto.Marca.toUpperCase(),
              ""
            ).toLowerCase()}
          </h2>
          <table className={styles.fichaTecnica}>
            <tbody>
              <tr>
                <th>Marca</th>
                <td>{repuesto.Marca}</td>
              </tr>
              <tr>
                <th>Modelo</th>
                <td>{repuesto.Modelo}</td>
              </tr>
              <tr>
                <th>Referencia</th>
                <td>{repuesto.Referencia}</td>
              </tr>
              <tr>
                <th>Código</th>
                <td>{repuesto.Codigo}</td>
              </tr>
              <tr>
                <th>Fabricante</th>
                <td>{repuesto.Brand}</td>
              </tr>
              <tr>
                <th>Condición</th>
                <td>Nuevo</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Beneficios */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Beneficios de este repuesto{" "}
            {repuesto.Nombre?.replace(
              repuesto.Marca.toUpperCase(),
              ""
            ).toLowerCase()}
          </h2>
          <ul className={styles.benefitsList}>
            <li>
              <Check size={18} color="#10b981" />
              <span>
                Repuesto original para {repuesto.Marca} {repuesto.Modelo}
              </span>
            </li>
            <li>
              <Check size={18} color="#10b981" />
              <span>
                Fabricado por {repuesto.Brand}, con altos estándares de calidad
              </span>
            </li>

            <li>
              {" "}
              <Check size={18} color="#10b981" />{" "}
              <span>Compatible con referencia {repuesto.Referencia}</span>
            </li>
            <li>
              <Check size={18} color="#10b981" />{" "}
              <span>Garantiza seguridad y durabilidad en tu vehículo</span>
            </li>
            <li>
              <Check size={18} color="#10b981" />{" "}
              <span>Envíos rápidos a todo el país</span>
            </li>
          </ul>
        </div>

        {/* Compatibilidad extendida */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Compatibilidad</h2>
          <p>
            Esta pieza <strong>{repuesto.Tipo}</strong> es compatible con
            vehículos{" "}
            <strong>
              {repuesto.Marca} {repuesto.Modelo}
            </strong>
            . Verifica la referencia <strong>{repuesto.Referencia} </strong>
            para asegurarte de que se ajuste a tu vehículo.
          </p>
        </div>

        {/* Preguntas Frecuentes */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
          <div className={styles.faqItem}>
            <h3>¿Este repuesto es nuevo o usado?</h3>
            <p>
              Todos nuestros repuestos son <strong>nuevos</strong> y cuentan con
              garantía.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>¿Es compatible con otros modelos?</h3>
            <p>
              Principalmente con {repuesto.Modelo}, aunque puede compartir
              compatibilidad con variantes similares. Revisa el código{" "}
              {repuesto.Codigo}.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>¿Cuánto tarda el envío?</h3>
            <p>
              Envíos rápidos: 1–3 días hábiles en Bogotá y 3–5 días al resto del
              país.
            </p>
          </div>
        </div>

        {/* Call to Action SEO */}
        <div className={styles.section}>
          <p>
            Compra{" "}
            <strong>
              {repuesto.Tipo} {repuesto.Marca} {repuesto.Modelo}
            </strong>
            (referencia {repuesto.Referencia}, código {repuesto.Codigo}) al
            mejor precio con {repuesto.Descuento}% de descuento. Garantía y
            envío rápido en toda Colombia.
          </p>
        </div>

        {/* Related Products */}
        <div className={styles.section}>
  <h2 className={styles.sectionTitle}>Otros repuestos de {repuesto.Modelo?.split("/")[0]?.trim()}</h2>
  <div className={styles.relatedGrid}>
    {autopartes
      .filter((product) => {
        // Obtener el primer modelo del repuesto actual
        const currentModel = repuesto.Modelo?.split("/")[0]?.trim()?.toLowerCase();
        
        // Verificar si el producto tiene algún modelo que coincida (sin importar mayúsculas)
        const productModels = product.Modelo?.split("/").map(model => model.trim().toLowerCase()) || [];
        
        return (
          currentModel && 
          productModels.includes(currentModel) &&
          product.Codigo !== repuesto.Codigo // evitar mostrar el mismo producto
        );
      })
      .map((product, index) => (
        <div key={index} className={styles.relatedProduct}>
          <div className={styles.relatedProductImageContainer}>
            <img
              src={
                product.images?.[0] || "/piston-glosario.webp" // fallback si no hay imagen
              }
              alt={product.Nombre}
              className={styles.relatedProductImage}
            />
            {/* Badge de descuento */}
            {product.Descuento && product.Descuento > 0 && (
              <div className={styles.discountBadge}>
                -{product.Descuento}%
              </div>
            )}
          </div>

          <div className={styles.relatedProductContent}>
            {/* Marca y Brand */}
            <div className={styles.relatedProductBrands}>
              <div className={styles.relatedProductBrand}>
                {product.Marca || "Genérico"}
              </div>
              {product.Brand && (
                <span className={styles.relatedProductManufacturer}>
                  {product.Brand}
                </span>
              )}
            </div>

            <h3 className={styles.relatedProductName}>
              {product.Nombre}
            </h3>

            {/* Precios con descuento */}
            <div className={styles.relatedProductPricing}>
              <div className={styles.relatedPriceContainer}>
                <span className={`${styles.relatedProductPrice} ${product.Descuento > 0 ? styles.relatedProductDiscountedPrice : ''}`}>
                  {formatPrice(
                    Number(product.Precio2) *
                      (1 - Number(product.Descuento) / 100)
                  )}
                </span>

                {product.Descuento && product.Descuento > 0 && (
                  <>
                    <span className={styles.relatedProductOriginalPrice}>
                      {formatPrice(product.Precio2)}
                    </span>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}
  </div>
</div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Otros {toTitleCase(repuesto.Tipo)}
          </h2>
          <div className={styles.relatedGrid}>
            {autopartes
              .filter(
                (product) =>
                  product.Tipo === repuesto.Tipo &&
                  product.Codigo !== repuesto.Codigo // evitar mostrar el mismo producto
              )
              .map((product, index) => (
                <div key={index} className={styles.relatedProduct}>
                  <img
                    src={
                      product.image?.[0] || "/piston-glosario.webp" // fallback si no hay imagen
                    }
                    alt={product.Nombre}
                    className={styles.relatedProductImage}
                  />

                  <div className={styles.relatedProductContent}>
                    <div className={styles.relatedProductBrand}>
                      {product.Marca || "Genérico"}
                    </div>

                    <h3 className={styles.relatedProductName}>
                      {product.Nombre}
                    </h3>

                    <div className={styles.relatedProductPrice}>
                      {formatPrice(product.Precio2)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Variantes del repuesto {repuesto.Titulo}
          </h2>
          <ul>
            {variantesSEO.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
            <li>
              {repuesto.Nombre?.replace(repuesto.Marca.toUpperCase(), "")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import {
//   Search,
//   ShoppingCart,
//   Star,
//   Heart,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Minus,
//   Check,
//   Truck,
//   Shield,
//   Home,
// } from "lucide-react";
// import styles from "@/styles/Product.module.css";
// import autopartes from "@/src/data/catalogo_autopartes.json";

// // Mock data para el ejemplo
// const productData = {
//   id: 1,
//   name: "Pastillas de Freno Cerámicas Premium Brembo",
//   brand: "Brembo",
//   sku: "BRM-CER-001",
//   price: 89900,
//   originalPrice: 119900,
//   compatibility: [
//     "Toyota Corolla 2015-2023",
//     "Toyota Yaris 2018-2024",
//     "Mazda 2 2017-2023",
//   ],
//   inStock: true,
//   stockQuantity: 15,
//   rating: 4.8,
//   reviewCount: 124,
//   images: [
//     "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1609250291996-83e3c4c44e92?w=600&h=400&fit=crop",
//   ],
//   description:
//     "Las pastillas de freno cerámicas Brembo Premium ofrecen un rendimiento excepcional con mayor durabilidad y menor ruido. Fabricadas con tecnología de vanguardia, estas pastillas proporcionan una frenada consistente y confiable en todas las condiciones de manejo.",
//   features: [
//     "Tecnología cerámica avanzada",
//     "Reducción de ruido y vibración",
//     "Resistencia superior al calor",
//     "Menor generación de polvo",
//     "Instalación directa",
//   ],
// };

// const repuesto = {
//   Nombre: "Pastillas de Freno Cerámicas Premium Brembo",
//   Codigo: "BRM-CER-001",
//   Tipo: "Pastillas de Freno",
//   Marca: "Toyota",
//   Modelo: "Corolla / Yaris Cross / Prius",
//   Referencia: "04465-02340",
//   Brand: "Brembo",
//   Precio2: 119900,
//   Descuento: 25,
//   images: [
//     "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1609250291996-83e3c4c44e92?w=600&h=400&fit=crop",
//   ]
// };

// const relatedProducts = [
//   {
//     id: 2,
//     Nombre: "Discos de Freno Ventilados Premium",
//     Marca: "Toyota",
//     Precio2: 159900,
//     image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop",
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     Nombre: "Kit de Frenos Completo Brembo",
//     Marca: "Toyota",
//     Precio2: 249900,
//     image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
//     rating: 4.9,
//   },
//   {
//     id: 4,
//     Nombre: "Líquido de Frenos DOT 4",
//     Marca: "Toyota",
//     Precio2: 35900,
//     image: "https://images.unsplash.com/photo-1609250291996-83e3c4c44e92?w=300&h=200&fit=crop",
//     rating: 4.6,
//   },
// ];

// export default function ProductDetailPage() {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("es-CO", {
//       style: "currency",
//       currency: "COP",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const addToCart = () => {
//     setCartItems((prev) => [...prev, { ...productData, quantity }]);
//   };

//   const toggleWishlist = () => {
//     setWishlist((prev) =>
//       prev.includes(productData.id)
//         ? prev.filter((id) => id !== productData.id)
//         : [...prev, productData.id]
//     );
//   };

//   const nextImage = () => {
//     setSelectedImageIndex((prev) =>
//       prev === repuesto.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setSelectedImageIndex((prev) =>
//       prev === 0 ? repuesto.images.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumb */}
//       <nav className={styles.breadcrumb}>
//         <div className={styles.breadcrumbContent}>
//           <div className={styles.breadcrumbList}>
//             <Home size={16} className={styles.breadcrumbIcon} />
//             <ChevronRight size={14} className={styles.breadcrumbSeparator} />
//             <a href="#" className={styles.breadcrumbLink}>AutoPartes</a>
//             <ChevronRight size={14} className={styles.breadcrumbSeparator} />
//             <a href="#" className={styles.breadcrumbLink}>{repuesto.Marca}</a>
//             <ChevronRight size={14} className={styles.breadcrumbSeparator} />
//             <a href="#" className={styles.breadcrumbLink}>{repuesto.Tipo}</a>
//             <ChevronRight size={14} className={styles.breadcrumbSeparator} />
//             <span className={styles.breadcrumbCurrent}>{repuesto.Nombre}</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className={styles.main}>
//         <div className={styles.productGrid}>
//           {/* Image Gallery */}
//           <div className={styles.imageGallery}>
//             <div className={styles.mainImageContainer}>
//               <img
//                 src={repuesto?.images?.[selectedImageIndex]}
//                 alt={repuesto.Nombre}
//                 className={styles.mainImage}
//               />

//               <button
//                 onClick={prevImage}
//                 className={`${styles.navigationButton} ${styles.prevButton}`}
//               >
//                 <ChevronLeft size={20} color="#374151" />
//               </button>

//               <button
//                 onClick={nextImage}
//                 className={`${styles.navigationButton} ${styles.nextButton}`}
//               >
//                 <ChevronRight size={20} color="#374151" />
//               </button>
//             </div>

//             <div className={styles.thumbnails}>
//               {repuesto?.images?.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`${styles.thumbnailButton} ${
//                     selectedImageIndex === index ? styles.active : ""
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`Vista ${index + 1}`}
//                     className={styles.thumbnailImage}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className={styles.productInfo}>
//             {/* Brand and Actions */}
//             <div className={styles.productHeader}>
//               <span className={styles.brandBadge}>{repuesto.Tipo}</span>

//               <button
//                 onClick={toggleWishlist}
//                 className={styles.wishlistButton}
//               >
//                 <Heart
//                   size={24}
//                   color={
//                     wishlist.includes(productData.id) ? "#ef4444" : "#d1d5db"
//                   }
//                   fill={wishlist.includes(productData.id) ? "#ef4444" : "none"}
//                 />
//               </button>
//             </div>

//             {/* Title */}
//             <div>
//               <h1 className={styles.productTitle}>{repuesto.Nombre}</h1>
//               <p className={styles.productSku}>SKU: {repuesto.Codigo}</p>
//             </div>

//             {/* Rating */}
//             <div className={styles.rating}>
//               <div className={styles.stars}>
//                 <div className={styles.starsList}>
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={18}
//                       fill={
//                         i < Math.floor(productData.rating) ? "#fbbf24" : "none"
//                       }
//                       color={
//                         i < Math.floor(productData.rating)
//                           ? "#fbbf24"
//                           : "#e5e7eb"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className={styles.ratingText}>{productData.rating}</span>
//               </div>
//               <span className={styles.reviewCount}>
//                 {productData.reviewCount} reseñas
//               </span>
//             </div>

//             {/* Price */}
//             <div className={styles.priceSection}>
//               <div className={styles.priceContainer}>
//                 <span className={styles.currentPrice}>
//                   {formatPrice(
//                     Number(repuesto.Precio2) *
//                       (1 - Number(repuesto.Descuento) / 100)
//                   )}
//                 </span>

//                 {productData.originalPrice && (
//                   <>
//                     <span className={styles.originalPrice}>
//                       {formatPrice(repuesto.Precio2)}
//                     </span>
//                     <span className={styles.discountBadge}>
//                       {repuesto.Descuento}% OFF
//                     </span>
//                   </>
//                 )}
//               </div>

//               <p className={styles.savings}>
//                 Ahorras{" "}
//                 {formatPrice(
//                   repuesto.Precio2 -
//                     Number(repuesto.Precio2) *
//                       (1 - Number(repuesto.Descuento) / 100)
//                 )}
//               </p>
//             </div>

//             {/* Stock */}
//             <div className={styles.stock}>
//               <div className={styles.stockIndicator}></div>
//               <span className={styles.stockText}>En stock 4 disponibles</span>
//             </div>

//             {/* Compatibility */}
//             <div className={styles.compatibility}>
//               <h3 className={styles.compatibilityTitle}>Compatible con:</h3>
//               <div className={styles.compatibilityList}>
//                 {repuesto.Modelo?.split("/")?.map((modelo, index) => (
//                   <div key={index} className={styles.compatibilityItem}>
//                     <Check size={18} color="#10b981" />
//                     <span className={styles.compatibilityText}>
//                       {modelo.trim()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity and Add to Cart */}
//             <div className={styles.purchaseSection}>
//               <div className={styles.quantityContainer}>
//                 <span className={styles.quantityLabel}>Cantidad:</span>
//                 <div className={styles.quantityControls}>
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className={styles.quantityButton}
//                   >
//                     <Minus size={16} color="#6b7280" />
//                   </button>
//                   <span className={styles.quantityValue}>{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className={styles.quantityButton}
//                   >
//                     <Plus size={16} color="#6b7280" />
//                   </button>
//                 </div>
//               </div>

//               <button onClick={addToCart} className={styles.addToCartButton}>
//                 Estoy interesado •{" "}
//                 {formatPrice(
//                   Number(repuesto.Precio2) *
//                     (1 - Number(repuesto.Descuento) / 100) *
//                     quantity
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Product Description */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Descripción</h2>
//           <p className={styles.description}>
//             La <strong>{repuesto.Tipo}</strong> código{" "}
//             <strong>{repuesto.Codigo}</strong>, también conocida como{" "}
//             <strong>{repuesto.Nombre}</strong>, es un repuesto diseñado para{" "}
//             <strong>
//               {repuesto.Marca} {repuesto.Modelo}
//             </strong>
//             . Compatible con la referencia original{" "}
//             <strong>{repuesto.Referencia}</strong>, fabricado por{" "}
//             <strong>{repuesto.Brand}</strong>, este componente garantiza
//             durabilidad, resistencia y un ajuste perfecto para tu vehículo.
//             Actualmente disponible con un descuento del{" "}
//             <strong>{repuesto.Descuento}%</strong>, ofreciendo la mejor relación
//             entre precio y calidad.
//           </p>

//           <div className={styles.featuresList}>
//             {[
//               `Repuesto nuevo y garantizado`,
//               `Compatible con ${repuesto.Marca} ${repuesto.Modelo}`,
//               `Referencia OEM: ${repuesto.Referencia}`,
//               `Fabricado por ${repuesto.Brand}`,
//               `Descuento especial del ${repuesto.Descuento}%`,
//               `Ideal para mantener la suspensión en óptimas condiciones`,
//             ].map((feature, index) => (
//               <div key={index} className={styles.featureItem}>
//                 <div className={styles.featureBullet}></div>
//                 <span className={styles.featureText}>{feature}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Detalles Técnicos</h2>
//           <table className={styles.fichaTecnica}>
//             <tbody>
//               <tr>
//                 <th>Marca</th>
//                 <td>{repuesto.Marca}</td>
//               </tr>
//               <tr>
//                 <th>Modelo</th>
//                 <td>{repuesto.Modelo}</td>
//               </tr>
//               <tr>
//                 <th>Referencia</th>
//                 <td>{repuesto.Referencia}</td>
//               </tr>
//               <tr>
//                 <th>Código</th>
//                 <td>{repuesto.Codigo}</td>
//               </tr>
//               <tr>
//                 <th>Fabricante</th>
//                 <td>{repuesto.Brand}</td>
//               </tr>
//               <tr>
//                 <th>Condición</th>
//                 <td>Nuevo</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Beneficios */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Beneficios de este repuesto</h2>
//           <ul className={styles.benefitsList}>
//             <li>
//               <Check size={18} color="#10b981" />
//               <span>
//                 Repuesto original para {repuesto.Marca} {repuesto.Modelo}
//               </span>
//             </li>
//             <li>
//               <Check size={18} color="#10b981" />
//               <span>
//                 Fabricado por {repuesto.Brand}, con altos estándares de calidad
//               </span>
//             </li>
//             <li>
//               <Check size={18} color="#10b981" />
//               <span>Compatible con referencia {repuesto.Referencia}</span>
//             </li>
//             <li>
//               <Check size={18} color="#10b981" />
//               <span>Garantiza seguridad y durabilidad en tu vehículo</span>
//             </li>
//             <li>
//               <Check size={18} color="#10b981" />
//               <span>Envíos rápidos a todo el país</span>
//             </li>
//           </ul>
//         </div>

//         {/* Trust Section */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>¿Por qué elegir AutoPartes Pro?</h2>
//           <div className={styles.trustGrid}>
//             <div className={styles.trustItem}>
//               <div className={`${styles.trustIcon} ${styles.trustIconShipping}`}>
//                 <Truck size={24} color="#0ea5e9" />
//               </div>
//               <div className={styles.trustContent}>
//                 <h3>Envío Rápido</h3>
//                 <p>Entrega en 1-3 días hábiles</p>
//               </div>
//             </div>
//             <div className={styles.trustItem}>
//               <div className={`${styles.trustIcon} ${styles.trustIconWarranty}`}>
//                 <Shield size={24} color="#10b981" />
//               </div>
//               <div className={styles.trustContent}>
//                 <h3>Garantía Total</h3>
//                 <p>Productos 100% garantizados</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compatibilidad extendida */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Compatibilidad</h2>
//           <p>
//             Esta pieza <strong>{repuesto.Tipo}</strong> es compatible con
//             vehículos{" "}
//             <strong>
//               {repuesto.Marca} {repuesto.Modelo}
//             </strong>
//             . Verifica la referencia <strong>{repuesto.Referencia} </strong>
//             para asegurarte de que se ajuste a tu vehículo.
//           </p>
//         </div>

//         {/* Preguntas Frecuentes */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
//           <div className={styles.faqItem}>
//             <h3>¿Este repuesto es nuevo o usado?</h3>
//             <p>
//               Todos nuestros repuestos son <strong>nuevos</strong> y cuentan con
//               garantía.
//             </p>
//           </div>
//           <div className={styles.faqItem}>
//             <h3>¿Es compatible con otros modelos?</h3>
//             <p>
//               Principalmente con {repuesto.Modelo}, aunque puede compartir
//               compatibilidad con variantes similares. Revisa el código{" "}
//               {repuesto.Codigo}.
//             </p>
//           </div>
//           <div className={styles.faqItem}>
//             <h3>¿Cuánto tarda el envío?</h3>
//             <p>
//               Envíos rápidos: 1–3 días hábiles en Bogotá y 3–5 días al resto del
//               país.
//             </p>
//           </div>
//         </div>

//         {/* Call to Action SEO */}
//         <div className={styles.section}>
//           <p>
//             Compra{" "}
//             <strong>
//               {repuesto.Tipo} {repuesto.Marca} {repuesto.Modelo}
//             </strong>
//             (referencia {repuesto.Referencia}, código {repuesto.Codigo}) al
//             mejor precio con {repuesto.Descuento}% de descuento. Garantía y
//             envío rápido en toda Colombia.
//           </p>
//         </div>

//         {/* Related Products */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Productos Relacionados</h2>
//           <div className={styles.relatedGrid}>
//             {relatedProducts.map((product, index) => (
//               <div key={index} className={styles.relatedProduct}>
//                 <img
//                   src={product.image}
//                   alt={product.Nombre}
//                   className={styles.relatedProductImage}
//                 />

//                 <div className={styles.relatedProductContent}>
//                   <div className={styles.relatedProductBrand}>
//                     {product.Marca}
//                   </div>

//                   <h3 className={styles.relatedProductName}>
//                     {product.Nombre}
//                   </h3>

//                   <div className={styles.relatedProductRating}>
//                     <div className={styles.relatedProductStars}>
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={14}
//                           fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
//                           color={i < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb"}
//                         />
//                       ))}
//                     </div>
//                     <span className={styles.relatedProductRatingText}>
//                       {product.rating}
//                     </span>
//                   </div>

//                   <div className={styles.relatedProductPrice}>
//                     {formatPrice(product.Precio2)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
