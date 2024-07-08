
import picoyplaca from './picoyplaca.json'

const generateSiteMap = (data) => {

  const picoYplacaBta = [];
  const picoYplacaMed = []
  const picoYplacaBuc = []

  for (let j = 0; j < data.length; j++) {
    for (const i in data[j]) {
      if (data[j][i].ciudad === 'Medellin') {
        picoYplacaMed.push(data[j][i]);
      } else if (data[j][i].ciudad === 'Bucaramanga') {
        picoYplacaBuc.push(data[j][i]);
      } else {
        picoYplacaBta.push(data[j][i]);
      }
    }
  }

  //   console.log(picoYplacaBta)
  let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.quarks.com.co</loc>
    </url>
    ${picoYplacaBta && picoYplacaBta.map(item => {
    let mes = new Date(item.fecha).getMonth();
    return `<url>
        <loc>
          https://www.quarks.com.co/pico-y-placa-hoy/bogota/${meses[mes]}/${item.fechaFormat}
        </loc>
      </url>`;
  }).join('')}
  ${picoYplacaBuc && picoYplacaBuc.map(item => {
    let mes = new Date(item.fecha).getMonth();
    return `<url>
    <loc>
      https://www.quarks.com.co/pico-y-placa-hoy/bucaramanga/${meses[mes]}/${item.fechaFormat}
    </loc>
  </url>`;
  }).join('')}
    ${picoYplacaMed && picoYplacaMed.map(item => {
    let mes = new Date(item.fecha).getMonth();
    return `<url>
    <loc>
      https://www.quarks.com.co/pico-y-placa-hoy/medellin/${meses[mes]}/${item.fechaFormat}
    </loc>
  </url>`;
  }).join('')}
  </urlset>
  `;
};

function SiteMap() { }

export const getServerSideProps = async ({ res }) => {

  const sitemap = generateSiteMap(picoyplaca.picoyplaca);



  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;