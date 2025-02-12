const sections = [
    {
      title: "Direccion y Suspension",
      links: [
        { url: "amortiguadores-funcionamiento" },
        { url: "bomba-direccion-hidraulica-funcionamiento" },
        { url: "cremallera-direccion-funcionamiento" },
      ],
    },
    {
      title: "Electricos",
      links: [
        { url: "alternador-funcionamiento" },
        { url: "bateria-funcionamiento" },
        { url: "bobina-encendido-funcionamiento" },
        { url: "bujia-funcionamiento" },
        { url: "bujia-precalentamiento-funcionamiento" },
        { url: "cables-bujia-funcionamiento" },
        { url: "caja-fusibles-funcionamiento" },
      ],
    },
    {
      title: "Motor",
      links: [
        { url: "arbol-levas-funcionamiento" },
        { url: "bomba-combustible-funcionamiento" },
        { url: "bomba-aceite-funcionamiento" },
        { url: "carburador-funcionamiento" },
        { url: "catalizador-funcionamiento" },
        { url: "cigueñal-funcionamiento" },
        { url: "junta-culata-funcionamiento" },
        { url: "inyector-combustible-funcionamiento" },
      ],
    },
    {
      title: "Refrigeración",
      links: [{ url: "bomba-agua-funcionamiento" }],
    },
    {
      title: "Frenos",
      links: [
        { url: "bomba-freno-funcionamiento" },
        { url: "campana-freno-funcionamiento" },
        { url: "disco-freno-funcionamiento" },
        { url: "freno-mano-funcionamiento" },
      ],
    },
    {
      title: "Caja y Transmision",
      links: [
        { url: "caja-cambios-funcionamiento" },
        { url: "caja-direccion-funcionamiento" },
        { url: "caja-transferencia-funcionamiento" },
      ],
    },
    {
      title: "Distribucion",
      links: [{ url: "banda-distribucion-funcionamiento" }],
    },
    {
      title: "Embrague",
      links: [{ url: "embrague-funcionamiento" }],
    },
    {
      title: "Accesorios",
      links: [{ url: "escobilla-limpiaparabrisas-funcionamiento" }],
    },
    {
      title: "Filtros",
      links: [
        { url: "filtro-aire-funcionamiento" },
        { url: "filtro-aceite-funcionamiento" },
        { url: "filtro-combustible-funcionamiento" },
      ],
    },
  ];
  
  const generateSiteMap = (data) => {
    const posts = [];
  
    for (const section of data) {
      for (const link of section.links) {
        posts.push(link.url);
      }
    }
  
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.quarks.com.co</loc>
      </url>
      ${posts.map(url => `
      <url>
        <loc>https://www.quarks.com.co/glosario-terminos/${url}</loc>
      </url>`).join('')}
    </urlset>`;
  };
  
  function SiteMap() { }
  
  export const getServerSideProps = async ({ res }) => {
    const sitemap = generateSiteMap(sections);
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  
    return { props: {} };
  };
  
  export default SiteMap;