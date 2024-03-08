
import talleres from '@/pages/servicios-automotriz/talleres.json'
// Ajusta la ruta según tu estructura de carpetas

export default (req, res) => {
  try {
    let filter;
    const talleresFilter = talleres?.talleres.filter(taller => taller?.lat)
    const levenshteinDistance = (s1, s2) => {
      const m = s1.length;
      const n = s2.length;
  
      // Inicializar una matriz m × n con 0
      const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
      // Llenar la matriz con los valores de distancia
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
    
    let categoriaNormalized = normalizeString(req.query.categoria.replace(/-/g, ' ').toLowerCase())
    filter = talleresFilter.filter(taller => taller?.categorias?.some(categoriaa =>
      categoriaa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(categoriaNormalized.toLowerCase())) ||
      levenshteinDistance(taller.nombre.toLowerCase(), categoriaNormalized.toLowerCase()) < 10)
   
      function normalizeString(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const resultados2 = shuffleArray(filter);
    console.log(resultados2, 'holaaa');
    res.status(200).json(resultados2);
  } catch (error) {
    console.error('Error en el endpoint de talleres:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};