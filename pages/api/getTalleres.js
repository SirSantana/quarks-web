// pages/api/getTalleres.js
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { categorias } from '@/src/Components/LandingPage/SliderTiposTalleres'

const levenshteinDistance = (s1, s2) => {
  const m = s1.length;
  const n = s2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function handler(req, res) {
  const { query } = req;
  const talleresFilter = talleres.talleres?.filter(taller => taller?.lat && taller.userName !== 'corsa-motors')
  let filter;
  if (query.servicio) {
    let categoriaNormalized = normalizeString(query.servicio.replace(/-/g, ' ').toLowerCase())
    filter = talleresFilter.filter(taller => taller?.categorias?.some(categoriaa =>
      categoriaa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(categoriaNormalized.toLowerCase())))

    const iconImg = categorias?.find(cat => cat.nombre?.replace(/-/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase() == query?.servicio?.replace(/-/g, ' ').toLocaleLowerCase())
    res.status(200).json({ data: filter, iconImg });
  } else {
    res.status(200).json({ data: talleresFilter });
  }
}
