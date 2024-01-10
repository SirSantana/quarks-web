import talleres from './servicios-automotriz/talleres.json'

const generateSiteMap = (data) => {

  const posts= [];

  for (const i in data) {
    posts.push(data[i]);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://quarks.com.co</loc>
    </url>
    ${posts && posts.map(item => {
    return `<url>
        <loc>
          https://www.quarks.com.co/${item.userName}
        </loc>
      </url>`;
  }).join('')}
  </urlset>
  `;
};

function SiteMap() { }

export const getServerSideProps = async ({ res }) => {
  
  const sitemap = generateSiteMap(talleres.talleres);

  

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;