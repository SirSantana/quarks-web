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
  const modelos = data?.Modelo.split("/").map((m) => m.trim());
  const base = [
    `${data?.Tipo}`,
    `${data?.Tipo} ${data?.Marca}`,
    `${data.Nombre}`,
    `${data?.Tipo} ${data?.Referencia}`,
    `${data?.Tipo} ${data?.Brand}`,
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
    const currentModel = repuesto?.Modelo?.split("/")?.[0]
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
    (p) => p.Tipo === repuesto?.tipo && p.Codigo !== repuesto.Codigo,
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
            <a href="/repuestos" className="hover:text-gray-700 transition-colors">
              Catalogo
            </a>
            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <a
              href={`/repuestos/${repuesto?.Tipo?.toLowerCase().replaceAll(' ', '-')}`}
              className="hover:text-gray-700 transition-colors"
            >
              {repuesto?.Tipo.toLowerCase()}
            </a>
            <ChevronRight size={11} className="shrink-0" aria-hidden="true" />
            <a
              href={`/repuestos/${repuesto?.Tipo?.toLowerCase().replaceAll(' ', '-')}/${repuesto?.Marca?.toLowerCase().replaceAll(' ', '-')}`}
              className="hover:text-gray-700 transition-colors"
            >
              {repuesto?.Marca}
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
                {repuesto?.Tipo}
              </p>
              <h1
                className="text-[22px] sm:text-[26px] font-bold text-gray-950 tracking-tight leading-snug mb-1"
                itemProp="name"
              >
                {repuesto?.Nombre}
              </h1>
              <p className="text-[12px] text-gray-400 font-mono">
                SKU: {repuesto?.Codigo}
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
                {repuesto?.Modelo?.split("/").map((modelo, i) => (
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
              La <strong className="text-gray-800">{repuesto?.Tipo}</strong>{" "}
              código{" "}
              <strong className="text-gray-800">{repuesto?.Codigo}</strong>,
              también conocida como{" "}
              <strong className="text-gray-800">{repuesto?.Nombre}</strong>, es
              un repuesto diseñado para{" "}
              <strong className="text-gray-800">
                {repuesto.Marca} {repuesto?.Modelo}
              </strong>
              . Compatible con la referencia original{" "}
              <strong className="text-gray-800">{repuesto?.Referencia}</strong>,
              fabricado por{" "}
              <strong className="text-gray-800">{repuesto?.Brand}</strong>, este
              componente garantiza durabilidad, resistencia y un ajuste perfecto
              para tu vehículo. Actualmente disponible con un descuento del{" "}
              <strong className="text-gray-800">{repuesto?.Descuento}%</strong>,
              ofreciendo la mejor relación entre precio y calidad.
            </p>
            <ul className="flex flex-col gap-2 list-none p-0">
              {[
                `Repuesto nuevo y garantizado`,
                `Compatible con ${repuesto?.Marca} ${repuesto?.Modelo}`,
                `Referencia OEM: ${repuesto?.Referencia}`,
                `Fabricado por ${repuesto?.Brand}`,
                `Descuento especial del ${repuesto?.Descuento}%`,
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
                  ["Modelo", repuesto?.Modelo],
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
                <strong className="text-gray-800">{repuesto?.Tipo}</strong> es
                compatible con vehículos{" "}
                <strong className="text-gray-800">
                  {repuesto?.Marca} {repuesto?.Modelo}
                </strong>
                . Verifica la referencia{" "}
                <strong className="text-gray-800">{repuesto?.Referencia}</strong>{" "}
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
                `Repuesto homologado para ${repuesto?.Marca} ${repuesto?.Modelo}`,
                `Fabricado por ${repuesto?.Brand}, con altos estándares de calidad`,
                `Compatible con referencia ${repuesto?.Referencia}`,
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
                  a: `Principalmente con ${repuesto?.Modelo}, aunque puede compartir compatibilidad con variantes similares. Revisa el código ${repuesto.Codigo}.`,
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
              {repuesto?.Tipo} {repuesto.Marca} {repuesto?.Modelo}
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
                Otros repuestos de {repuesto?.Modelo?.split("/")?.[0]?.trim()}
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
                Otros {toTitleCase(repuesto?.tipo)}
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
