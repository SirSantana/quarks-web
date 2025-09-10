// utils/seo.js
export function generarVariantesSEO(repuesto) {
  if (!repuesto) return [];

  const { Tipo, Marca, Modelo, Referencia, Brand } = repuesto;

  const modelos = Modelo ? Modelo.split("/").map(m => m.trim()) : [""];
  const variantes = [];

  modelos.forEach((modelo) => {
    // Base combinaciones
    const base = [
      `${Tipo} ${Marca} ${modelo}`,
      `${Tipo} ${Marca} ${modelo} ${Brand}`,
      `${Tipo} ${Marca} ${modelo} repuesto`,
      `Repuesto ${Tipo} ${Marca} ${modelo}`,
      `Comprar ${Tipo} ${Marca} ${modelo}`,
      `${Tipo} ${Marca} ${modelo} precio`,
      `${Tipo} ${Marca} ${modelo} barato`,
      `${Tipo} ${Marca} ${modelo} original`,
    ];

    // Si hay referencia, también la combinamos
    if (Referencia) {
      base.push(
        `${Tipo} ${Marca} ${modelo} ${Referencia}`,
        `Repuesto ${Tipo} ${Marca} ${modelo} ${Referencia}`,
        `Comprar ${Tipo} ${Marca} ${modelo} ${Referencia}`
      );
    }

    variantes.push(...base);
  });

  return [...new Set(variantes)]; // elimina duplicados
}
