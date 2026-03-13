import Layout from '@/src/Components/Layout';
import autopartes from '@/src/data/catalogo_autopartes.json';
import ProductDetailPage from '../../src/Components/Repuestos/RepuestoComponent';
import Head from 'next/head';
import FooterV2 from '@/src/Components/Footer/FooterV2';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}

export default function RepuestosSlug({ data }) {
  if (!data) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>No se encontraron resultados</h1>
        <p>Intenta buscar otro repuesto.</p>
      </div>
    )
  }

  function generarDescripcionSEO(data) {
    const precioFinal = data.Descuento || 0
      ? Number(data.Precio2) * (1 - Number(data.Descuento) / 100)
      : Number(data.Precio2);

    return `Autoparte para ${data?.Marca}. ${data.Nombre}, código ${data.Codigo}, referencia ${data.Referencia} de la marca ${data.Brand}. Repuesto que garantiza el rendimiento y la seguridad de tu vehículo. Disponible ${data.Descuento ? `con ${data.Descuento}% de descuento` : ''} a un precio de $${precioFinal.toLocaleString('es-CO')} COP.`;
  }

  const precioOriginal = Number(data.Precio2);
  const descuento = Number(data.Descuento) || 0;
  const precioFinal = descuento > 0
    ? precioOriginal * (1 - descuento / 100)
    : precioOriginal;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": data.titulo,
    "image": data.images?.length ? data.images?.[0] : ["/piston-glosario.webp"],
    "description": generarDescripcionSEO(data) || `Compra ${data.titulo} al mejor precio.`,
    "brand": {
      "@type": "Brand",
      "name": data.Marca || "Genérico"
    },
    "sku": data.Codigo,
    "offers": {
      "@type": "Offer",
      "url": `https://quarks.com.co/repuesto/${data.titulo}`,
      "priceCurrency": "COP",
      "price": precioFinal.toFixed(0),
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "12"
    }
  };

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <Layout title={toTitleCase(data.Nombre)} image={data?.images?.[0] || '/piston-glosario.webp'} footer={false} navbarRepuestos={true} visibleNavbar={false} description={generarDescripcionSEO(data)} url={`/repuesto/${data.titulo}`}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>

      <ProductDetailPage repuesto={data} />
      <FooterV2 />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const slug = params?.slug?.[0];

  // Slugs reservados para [categoria] y [marca] — no deben caer aquí
  const categoriaSlugs = new Set(
    [...new Set(autopartes.map(item => item.Tipo).filter(Boolean))].map(slugify)
  );
  const marcaSlugs = new Set(
    [...new Set(autopartes.map(item => item.Marca).filter(Boolean))].map(slugify)
  );

  if (categoriaSlugs.has(slug) || marcaSlugs.has(slug)) {
    return { notFound: true };
  }

  const findAutotopart = autopartes.find(el => el.titulo === slug);

  return {
    props: {
      data: findAutotopart || null,
    },
  };
}

export async function getStaticPaths() {
  // Slugs reservados para carpetas [categoria] y [marca]
  const categoriaSlugs = new Set(
    [...new Set(autopartes.map(item => item.Tipo).filter(Boolean))].map(slugify)
  );
  const marcaSlugs = new Set(
    [...new Set(autopartes.map(item => item.Marca).filter(Boolean))].map(slugify)
  );

  // Pre-genera SOLO rutas de productos — excluye cualquier titulo que
  // coincida con un slug de categoría o marca para evitar conflictos
  const paths = autopartes
    .filter(p => {
      if (!p.titulo) return false;
      const s = slugify(p.titulo);
      return !categoriaSlugs.has(s) && !marcaSlugs.has(s);
    })
    .map(p => ({
      params: { slug: [p.titulo] },
    }));

  return {
    paths,
    fallback: false, // 404 para cualquier ruta no pre-generada
  };
}