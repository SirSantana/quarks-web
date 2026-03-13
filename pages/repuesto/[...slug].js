import Layout from '@/src/Components/Layout';
import autopartes from '@/src/data/catalogo_autopartes.json';
import ProductDetailPage from '../../src/Components/Repuestos/RepuestoComponent';
import Head from 'next/head';
import FooterV2 from '@/src/Components/Footer/FooterV2';

export default function RepuestosSlug({ data }) {

  function generarDescripcionSEO(data) {
    const precioFinal = data.Descuento
      ? Number(data.Precio2) * (1 - Number(data.Descuento) / 100)
      : Number(data.Precio2);

    return `Autoparte para ${data.Marca}. ${data.Nombre}, código ${data.Codigo}, referencia ${data.Referencia} de la marca ${data.Brand}. Repuesto que garantiza el rendimiento y la seguridad de tu vehículo. Disponible ${data.Descuento ? `con ${data.Descuento}% de descuento` : ''} a un precio de $${precioFinal.toLocaleString('es-CO')} COP.`;
  }

  const precioOriginal = Number(data.Precio2);
  const descuento = Number(data.Descuento) || 0;

  const precioFinal =
    descuento > 0
      ? precioOriginal * (1 - descuento / 100)
      : precioOriginal;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": data.titulo,
    "image": data.images?.[0] || "/piston-glosario.webp",
    "description": generarDescripcionSEO(data),
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
    <Layout
      title={toTitleCase(data.Nombre)}
      image={data?.images?.[0] || '/piston-glosario.webp'}
      footer={false}
      navbarRepuestos={false}
      visibleNavbar={true}
      url={`/repuesto/${data.titulo}`}
    >

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>

      <ProductDetailPage repuesto={data} />
      <FooterV2 />

    </Layout>
  );
}

// Elimina el import global del JSON
// import autopartes from '@/src/data/catalogo_autopartes.json'; ❌

import { readFileSync } from 'fs';
import path from 'path';

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'src/data/catalogo_autopartes.json');
  const autopartes = JSON.parse(readFileSync(filePath, 'utf-8'));

  const slugDecoded = decodeURIComponent(params?.slug?.[0]);
  const findAutotopart = autopartes.find(el => el.titulo === slugDecoded);
  
  if (!findAutotopart) {
    return { notFound: true };
  }

  return {
    props: {
      data: findAutotopart,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}