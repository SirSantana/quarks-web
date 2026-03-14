import autopartesData from "@/src/data/catalogo_autopartes.json";

export default function handler(req, res) {
  // 1. Configurar el encabezado para que Google lo lea como XML
  res.setHeader("Content-Type", "text/xml");

  // 2. Función interna para limpiar textos y evitar errores de XML
  const clean = (str) => str?.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || "";

  // 3. Construir el cuerpo del XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
      <title>Catálogo de Repuestos Colombia</title>
      <link>https://tusitio.com</link>
      <description>Venta de repuestos para carros en Colombia</description>`;

  autopartesData.forEach((product) => {
    // Generar la URL completa del producto (ajusta según tu ruta real)
    const productUrl = `https://www.quarks.com.co/repuesto/${product.titulo}`;
    const imageUrl = product.images?.[0] || "https://www.quarks.com.co/bujia-glosario.webp";
    
    // Limpiar el precio (Google pide: "123456.00 COP")
    const rawPrice = String(product.Precio2 || product.Precio).replace(/,/g, "");
    const formattedPrice = `${rawPrice}.00 COP`;

    xml += `
      <item>
        <g:id>${clean(product.Codigo || product.titulo)}</g:id>
        <g:title>${clean(product.Nombre)}</g:title>
        <g:description>${clean(product.Modelo || "Repuesto de alta calidad para vehículo")}</g:description>
        <g:link>${productUrl}</g:link>
        <g:image_link>${imageUrl}</g:image_link>
        <g:condition>new</g:condition>
        <g:availability>in stock</g:availability>
        <g:price>${formattedPrice}</g:price>
        <g:brand>${clean(product.Marca)}</g:brand>
        <g:google_product_category>Vehicles &amp; Parts &gt; Vehicle Parts &amp; Accessories &gt; Motor Vehicle Parts</g:google_product_category>
        <g:shipping>
          <g:country>CO</g:country>
          <g:service>Envío Nacional</g:service>
          <g:price>0.00 COP</g:price>
        </g:shipping>
      </item>`;
  });

  xml += `
    </channel>
  </rss>`;

  // 4. Enviar la respuesta
  res.status(200).send(xml);
}