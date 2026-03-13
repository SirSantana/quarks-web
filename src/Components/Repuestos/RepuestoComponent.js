import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Home,
  MessageCircle,
  Plus,
  Minus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
} from "lucide-react";
import autopartes from "@/src/data/catalogo_autopartes.json";
import Link from "next/link";

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

function toTitleCase(str) {
  return (
    str
      ?.toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") ?? ""
  );
}

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
      extras.forEach((extra) => variantes.push(`${b} ${modelo} ${extra}`));
    });
  });
  return [...new Set(variantes)];
}

// ── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating = 4.8, count = 12 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < Math.floor(rating) ? "#f59e0b" : "none"}
            color={i < Math.floor(rating) ? "#f59e0b" : "#d1d5db"}
          />
        ))}
      </div>
      <span className="text-[13px] font-semibold text-gray-700">{rating}</span>
      <span className="text-[12px] text-gray-400">
        ({count} calificaciones)
      </span>
    </div>
  );
}

function RelatedProductCard({ product }) {
  const discountedPrice =
    Number(product.Precio2) * (1 - Number(product.Descuento) / 100);
  return (
    <Link
      href={`${product.titulo}`}
      style={{ textDecoration: "none" }}
      className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors bg-white"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images?.[0] || "/piston-glosario.webp"}
          alt={product.Nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={200}
          height={200}
        />
        {product.Descuento > 0 && (
          <div className="absolute top-2 left-2 bg-[#407BFF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            -{product.Descuento}%
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#407BFF]">
          {product.Marca}
          {product.Brand && (
            <span className="text-gray-400 ml-1">· {product.Brand}</span>
          )}
        </p>
        <h3 className="text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2">
          {product.Nombre}
        </h3>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[14px] font-bold text-gray-900">
            {formatPrice(discountedPrice)}
          </span>
          {product.Descuento > 0 && (
            <span className="text-[11px] text-gray-400 line-through">
              {formatPrice(product.Precio2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function ProductDetailPage({ repuesto }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discountedPrice =
    Number(repuesto.Precio2) * (1 - Number(repuesto.Descuento) / 100);
  const savings = Number(repuesto.Precio2) - discountedPrice;
  const variantesSEO = generarVariantesSEO(repuesto);

  const nextImage = () =>
    setSelectedImageIndex((p) =>
      p === repuesto.images.length - 1 ? 0 : p + 1,
    );
  const prevImage = () =>
    setSelectedImageIndex((p) =>
      p === 0 ? repuesto.images.length - 1 : p - 1,
    );

  const contactWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola, estoy interesado en el siguiente repuesto: https://www.quarks.com.co/repuesto/${repuesto.titulo}`,
    );
    window.open(`https://wa.me/573143551942?text=${msg}`, "_blank");
  };

  const relatedByModel = autopartes.filter((p) => {
    const currentModel = repuesto.Modelo?.split("/")?.[0]
      ?.trim()
      ?.toLowerCase();
    const productModels =
      p.Modelo?.split("/").map((m) => m.trim().toLowerCase()) || [];
    return (
      currentModel &&
      productModels.includes(currentModel) &&
      p.Codigo !== repuesto.Codigo
    );
  });

  const relatedByType = autopartes.filter(
    (p) => p.Tipo === repuesto.Tipo && p.Codigo !== repuesto.Codigo,
  );

  // Section anchor nav items
  const sections = [
    { id: "descripcion", label: "Descripción" },
    { id: "tecnica", label: "Ficha técnica" },
    { id: "beneficios", label: "Beneficios" },
    { id: "faq", label: "Preguntas" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 py-3 max-sm:px-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-gray-400 flex-wrap"
          >
            <Home size={12} className="shrink-0" aria-hidden="true" />
            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <a href="/repuesto" className="hover:text-gray-700 transition-colors">
              Catalogo
            </a>
            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <a
              href={`/repuesto/${repuesto.Tipo?.toLowerCase()}`}
              className="hover:text-gray-700 transition-colors"
            >
              {repuesto.Tipo.toLowerCase()}
            </a>
            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <a
              href={`/repuesto/${repuesto.Tipo?.toLowerCase()}/${repuesto.Marca?.toLowerCase()}`}
              className="hover:text-gray-700 transition-colors"
            >
              {repuesto.Marca}
            </a>

            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <span
              className="text-gray-600 truncate max-w-[200px]"
              aria-current="page"
            >
              {repuesto.Nombre}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8 max-sm:px-4">
        {/* ── Product grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-[1fr_1fr] gap-12 max-[768px]:grid-cols-1 mb-16">
          {/* LEFT — Image gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              {repuesto?.images?.length > 0 ? (
                <img
                  src={repuesto.images[selectedImageIndex]}
                  alt={`${repuesto.Nombre} — vista ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <img
                    src="/piston-glosario.webp"
                    alt={repuesto.Nombre}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <span className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-gray-400 bg-white/80 py-1">
                    Sin imagen disponible
                  </span>
                </div>
              )}

              {repuesto.Descuento > 0 && (
                <div className="absolute top-3 left-3 bg-[#407BFF] text-white text-[12px] font-bold px-2.5 py-1 rounded-lg">
                  -{repuesto.Descuento}% OFF
                </div>
              )}

              {repuesto?.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors border border-gray-200"
                  >
                    <ChevronLeft size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Imagen siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors border border-gray-200"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {repuesto?.images?.length > 1 && (
              <div
                className="flex gap-2 overflow-x-auto scrollbar-hide"
                role="list"
                aria-label="Miniaturas de imágenes"
              >
                {repuesto.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-pressed={selectedImageIndex === i}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === i
                        ? "border-[#407BFF]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${repuesto.Nombre} miniatura ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-2">
                {repuesto.Tipo}
              </p>
              <h1
                className="text-[22px] sm:text-[26px] font-bold text-gray-950 tracking-tight leading-snug mb-1"
                itemProp="name"
              >
                {repuesto.Nombre}
              </h1>
              <p className="text-[12px] text-gray-400 font-mono">
                SKU: {repuesto.Codigo}
              </p>
            </div>

            <StarRating />

            <div
              className="py-4 border-y border-gray-100"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="COP" />
              <meta itemProp="price" content={String(discountedPrice)} />
              <meta
                itemProp="availability"
                content="https://schema.org/InStock"
              />
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[32px] font-bold text-gray-950 leading-none tracking-tight">
                  {formatPrice(discountedPrice)}
                </span>
                {repuesto.Descuento > 0 && (
                  <span className="text-[16px] text-gray-400 line-through">
                    {formatPrice(repuesto.Precio2)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-[13px] text-emerald-600 font-semibold mt-1">
                  Ahorras {formatPrice(savings)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                aria-hidden="true"
              />
              <span className="text-[13px] text-gray-600">
                En stock · 4 disponibles
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-2">
                Compatible con
              </p>
              <ul className="flex flex-col gap-1.5 list-none p-0">
                {repuesto.Modelo?.split("/").map((modelo, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check
                      size={14}
                      className="text-emerald-500 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] text-gray-700">
                      {modelo.trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-gray-500">Cantidad:</span>
                <div
                  className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
                  role="group"
                  aria-label="Selector de cantidad"
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Reducir cantidad"
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} className="text-gray-500" />
                  </button>
                  <span
                    className="px-4 py-2 text-[14px] font-semibold text-gray-800 border-x border-gray-200 min-w-[40px] text-center"
                    aria-live="polite"
                    aria-label={`Cantidad: ${quantity}`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar cantidad"
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <button
                onClick={contactWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#407BFF] text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-[15px]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Estoy interesado · {formatPrice(discountedPrice * quantity)}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: Truck, label: "Envío rápido" },
                { icon: ShieldCheck, label: "Garantizado" },
                { icon: RotateCcw, label: "Devoluciones" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-2.5 bg-gray-50 rounded-xl"
                >
                  <Icon
                    size={16}
                    className="text-[#407BFF]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] text-gray-500 text-center font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section anchor nav ──────────────────────────────────────────── */}
        <nav
          aria-label="Secciones del producto"
          className="border-b border-gray-200 mb-10"
        >
          <ul className="flex gap-0 overflow-x-auto scrollbar-hide list-none p-0">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="block px-5 py-3 text-[13px] font-semibold whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Always-visible content sections ────────────────────────────── */}
        <div className="max-w-[740px] mb-16 space-y-0">
          {/* Descripción */}
          <section id="descripcion" className="scroll-mt-6 pb-12">
            <h2 className="text-[20px] font-bold text-gray-950 tracking-tight mb-4">
              Descripción {toTitleCase(repuesto.Nombre)}
            </h2>
            <p className="text-[15px] text-gray-600 leading-[1.8] mb-6">
              La <strong className="text-gray-800">{repuesto.Tipo}</strong>{" "}
              código{" "}
              <strong className="text-gray-800">{repuesto.Codigo}</strong>,
              también conocida como{" "}
              <strong className="text-gray-800">{repuesto.Nombre}</strong>, es
              un repuesto diseñado para{" "}
              <strong className="text-gray-800">
                {repuesto.Marca} {repuesto.Modelo}
              </strong>
              . Compatible con la referencia original{" "}
              <strong className="text-gray-800">{repuesto.Referencia}</strong>,
              fabricado por{" "}
              <strong className="text-gray-800">{repuesto.Brand}</strong>, este
              componente garantiza durabilidad, resistencia y un ajuste perfecto
              para tu vehículo. Actualmente disponible con un descuento del{" "}
              <strong className="text-gray-800">{repuesto.Descuento}%</strong>,
              ofreciendo la mejor relación entre precio y calidad.
            </p>
            <ul className="flex flex-col gap-2 list-none p-0">
              {[
                `Repuesto nuevo y garantizado`,
                `Compatible con ${repuesto.Marca} ${repuesto.Modelo}`,
                `Referencia OEM: ${repuesto.Referencia}`,
                `Fabricado por ${repuesto.Brand}`,
                `Descuento especial del ${repuesto.Descuento}%`,
                `Ideal para mantener la suspensión en óptimas condiciones`,
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#407BFF] mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-gray-600">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Ficha técnica */}
          <section
            id="tecnica"
            className="scroll-mt-6 pt-10 pb-12 border-t border-gray-100"
          >
            <h2 className="text-[20px] font-bold text-gray-950 tracking-tight mb-4">
              Detalles Técnicos de{" "}
              {repuesto.Nombre?.replace(
                repuesto.Marca.toUpperCase(),
                "",
              ).toLowerCase()}
            </h2>
            <table className="w-full text-[14px]">
              <tbody>
                {[
                  ["Marca", repuesto.Marca],
                  ["Modelo", repuesto.Modelo],
                  ["Referencia", repuesto.Referencia],
                  ["Código", repuesto.Codigo],
                  ["Fabricante", repuesto.Brand],
                  ["Condición", "Nuevo"],
                ].map(([key, val]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <th className="py-3 pr-6 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-gray-400 whitespace-nowrap w-[140px]">
                      {key}
                    </th>
                    <td className="py-3 text-gray-700 font-medium">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-3">
                Compatibilidad
              </p>
              <p className="text-[14px] text-gray-600 leading-[1.75]">
                Esta pieza{" "}
                <strong className="text-gray-800">{repuesto.Tipo}</strong> es
                compatible con vehículos{" "}
                <strong className="text-gray-800">
                  {repuesto.Marca} {repuesto.Modelo}
                </strong>
                . Verifica la referencia{" "}
                <strong className="text-gray-800">{repuesto.Referencia}</strong>{" "}
                para asegurarte de que se ajuste a tu vehículo.
              </p>
            </div>
          </section>

          {/* Beneficios */}
          <section
            id="beneficios"
            className="scroll-mt-6 pt-10 pb-12 border-t border-gray-100"
          >
            <h2 className="text-[20px] font-bold text-gray-950 tracking-tight mb-4">
              Beneficios de este repuesto
            </h2>
            <ul className="flex flex-col gap-0 list-none p-0">
              {[
                `Repuesto homologado para ${repuesto.Marca} ${repuesto.Modelo}`,
                `Fabricado por ${repuesto.Brand}, con altos estándares de calidad`,
                `Compatible con referencia ${repuesto.Referencia}`,
                `Garantiza seguridad y durabilidad en tu vehículo`,
                `Envíos rápidos a todo el país`,
              ].map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check
                      size={13}
                      className="text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[14px] text-gray-700 leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section
            id="faq"
            className="scroll-mt-6 pt-10 pb-12 border-t border-gray-100"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h2 className="text-[20px] font-bold text-gray-950 tracking-tight mb-6">
              Preguntas Frecuentes
            </h2>
            <dl className="flex flex-col gap-0">
              {[
                {
                  q: "¿Este repuesto es nuevo o usado?",
                  a: "Todos nuestros repuestos son nuevos y cuentan con garantía.",
                },
                {
                  q: "¿Es compatible con otros modelos?",
                  a: `Principalmente con ${repuesto.Modelo}, aunque puede compartir compatibilidad con variantes similares. Revisa el código ${repuesto.Codigo}.`,
                },
                {
                  q: "¿Cuánto tarda el envío?",
                  a: "Envíos rápidos: 1–3 días hábiles en Bogotá y 3–5 días al resto del país.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="py-5 border-b border-gray-100 last:border-0"
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <dt
                    className="text-[14px] font-semibold text-gray-900 mb-2"
                    itemProp="name"
                  >
                    {q}
                  </dt>
                  <dd
                    className="text-[14px] text-gray-500 leading-[1.7] m-0"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{a}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* ── CTA SEO ──────────────────────────────────────────────────────── */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-16 max-w-[740px]">
          <p className="text-[14px] text-gray-600 leading-[1.7]">
            Compra{" "}
            <strong className="text-gray-800">
              {repuesto.Tipo} {repuesto.Marca} {repuesto.Modelo}
            </strong>{" "}
            (referencia {repuesto.Referencia}, código {repuesto.Codigo}) al
            mejor precio con {repuesto.Descuento}% de descuento. Garantía y
            envío rápido en toda Colombia.
          </p>
        </div>

        {/* ── Related by model ─────────────────────────────────────────────── */}
        {relatedByModel.length > 0 && (
          <section className="mb-16" aria-labelledby="related-model-heading">
            <div className="flex items-baseline gap-2 mb-5">
              <h2
                id="related-model-heading"
                className="text-[18px] font-bold text-gray-950 tracking-tight"
              >
                Otros repuestos de {repuesto.Modelo?.split("/")?.[0]?.trim()}
              </h2>
              <span className="text-[12px] text-gray-400">
                {relatedByModel.length} artículos
              </span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 list-none p-0">
              {relatedByModel.map((product, i) => (
                <li key={i}>
                  <RelatedProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Related by type ──────────────────────────────────────────────── */}
        {relatedByType.length > 0 && (
          <section className="mb-16" aria-labelledby="related-type-heading">
            <div className="flex items-baseline gap-2 mb-5">
              <h2
                id="related-type-heading"
                className="text-[18px] font-bold text-gray-950 tracking-tight"
              >
                Otros {toTitleCase(repuesto.Tipo)}
              </h2>
              <span className="text-[12px] text-gray-400">
                {relatedByType.length} artículos
              </span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 list-none p-0">
              {relatedByType.map((product, i) => (
                <li key={i}>
                  <RelatedProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── SEO variants ─────────────────────────────────────────────── */}
        <section className="mb-8" aria-labelledby="variantes-heading">
          <h2
            id="variantes-heading"
            className="text-[18px] font-bold text-gray-950 tracking-tight mb-4"
          >
            Variantes del repuesto {repuesto.Titulo}
          </h2>
          <ul className="flex flex-wrap gap-1.5 list-none p-0">
            {variantesSEO.map((v, i) => (
              <li
                key={i}
                className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[11px] rounded-full"
              >
                {v}
              </li>
            ))}
            <li className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[11px] rounded-full">
              {repuesto.Nombre?.replace(repuesto.Marca.toUpperCase(), "")}
            </li>
          </ul>
        </section>
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
