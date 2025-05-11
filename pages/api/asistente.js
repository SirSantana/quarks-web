// pages/api/asistente.js
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod'; // Importamos Zod

// --- Esquema para la respuesta estructurada ---
// CAMBIO PRINCIPAL: preciosEstimados ahora es un array de objetos
const responseSchema = z.object({
  diagnostico: z.string().describe("Diagnóstico preliminar del problema descrito por el usuario."),
  preciosEstimados: z.array(z.object({
    item: z.string().describe("Nombre del item de reparación, parte o servicio (Ej: Pastillas de freno, Mano de obra)"),
    precio: z.string().describe("Estimación de precio o rango en Bogotá (Ej: $100.000 - $200.000)")
  })).describe("Lista de estimaciones de precios en Bogotá para las reparaciones más probables."),
  // recomendacion: z.string().describe("Recomendación de acción para el usuario, incluyendo qué tipo de taller buscar."),
  serviciosRequeridos: z.array(z.string()).describe("Lista de tipos de servicios generales requeridos basados en el diagnóstico (Ej: ['Frenos', 'Suspensión', 'Motor'])."),
});

// Datos simulados de talleres (esto debería venir de tu base de datos o API en producción)
const talleres = [
  // Los 3 talleres originales
  { nombre: 'Taller Mecánico San Rafael', ubicacion: 'Chapinero', calificacion: 4.7, servicios: ['Suspensión', 'Frenos', 'Motor', 'Tecnicomecanica'], telefono: '3100000000' },
  { nombre: 'Autofrenos Bogotá', ubicacion: 'Engativá', calificacion: 4.5, servicios: ['Frenos', 'Alineación'], telefono: '3100000001' },
  { nombre: 'Serviteca Ferrecar', ubicacion: 'Teusaquillo', calificacion: 4.9, servicios: ['Suspensión', 'Motor', 'Frenos'], telefono: '3100000002' },

  // 20 talleres adicionales simulados
  { nombre: 'Auto Servicio Usaquén', ubicacion: 'Usaquén', calificacion: 4.6, servicios: ['Cambio de Aceite', 'Filtros', 'Baterías', 'Revisiones'], telefono: '3100000003' },
  { nombre: 'Frenos y Algo Más - Suba', ubicacion: 'Suba', calificacion: 4.3, servicios: ['Frenos', 'Suspensión', 'Alineación', 'Balanceo'], telefono: '3100000004' },
  { nombre: 'Eléctricos del Norte', ubicacion: 'Usaquén', calificacion: 4.8, servicios: ['Electricidad Automotriz', 'Baterías', 'Arranque', 'Alternador'], telefono: '3100000005' },
  { nombre: 'Centro Automotriz Barrios Unidos', ubicacion: 'Barrios Unidos', calificacion: 4.4, servicios: ['Motor', 'Cajas de Cambio', 'Transmisión', 'Embrague'], telefono: '3100000006' },
  { nombre: 'Servicio Rápido 127', ubicacion: 'Chapinero', calificacion: 4.2, servicios: ['Cambio de Aceite', 'Llantas', 'Balanceo', 'Alineación'], telefono: '3100000007' },
  { nombre: 'Taller La Felicidad', ubicacion: 'Fontibón', calificacion: 4.7, servicios: ['Latonería', 'Pintura', 'Mecánica General', 'Estética Vehicular'], telefono: '3100000008' },
  { nombre: 'Mecánica Especializada Kennedy', ubicacion: 'Kennedy', calificacion: 4.1, servicios: ['Motor', 'Electricidad Automotriz', 'Diagnóstico Computarizado'], telefono: '3100000009' },
  { nombre: 'Auto Check Bosa', ubicacion: 'Bosa', calificacion: 4.0, servicios: ['Suspensión', 'Frenos', 'Alineación', 'Revisiones'], telefono: '3100000010' },
  { nombre: 'Serviteca Suba Avenida', ubicacion: 'Suba', calificacion: 4.5, servicios: ['Llantas', 'Balanceo', 'Frenos', 'Nitrógeno'], telefono: '3100000011' },
  { nombre: 'Taller General Teusaquillo', ubicacion: 'Teusaquillo', calificacion: 4.6, servicios: ['Mecánica General', 'Tecnicomecanica', 'Revisiones'], telefono: '3100000012' },
  { nombre: 'Diagnóstico Rápido Bogotá', ubicacion: 'Chapinero', calificacion: 4.9, servicios: ['Diagnóstico Computarizado', 'Electricidad Automotriz', 'Inyección'], telefono: '3100000013' },
  { nombre: 'El Motorcito Fontibón', ubicacion: 'Fontibón', calificacion: 4.3, servicios: ['Motor', 'Cambio de Aceite', 'Reparación de Motor'], telefono: '3100000014' },
  { nombre: 'Reparación Total Kennedy', ubicacion: 'Kennedy', calificacion: 4.5, servicios: ['Mecánica General', 'Suspensión', 'Frenos', 'Motor', 'Electricidad Automotriz'], telefono: '3100000015' },
  { nombre: 'Servifrenos Engativá Centro', ubicacion: 'Engativá', calificacion: 4.8, servicios: ['Frenos', 'Pastillas', 'Discos', 'Líquido de Frenos'], telefono: '3100000016' },
  { nombre: 'Auto Diagnóstico Usaquén', ubicacion: 'Usaquén', calificacion: 4.7, servicios: ['Diagnóstico Computarizado', 'Electricidad Automotriz', 'Aire Acondicionado'], telefono: '3100000017' },
  { nombre: 'Pit Stop Chapinero', ubicacion: 'Chapinero', calificacion: 4.4, servicios: ['Cambio de Aceite', 'Filtros', 'Baterías', 'Llantas', 'Revisiones'], telefono: '3100000018' },
  { nombre: 'Taller Industrial Puente Aranda', ubicacion: 'Puente Aranda', calificacion: 4.2, servicios: ['Camiones', 'Vehículos Pesados', 'Mecánica General', 'Motores Diesel'], telefono: '3100000019' },
  { nombre: 'Serviteca La Castellana', ubicacion: 'Barrios Unidos', calificacion: 4.9, servicios: ['Llantas', 'Balanceo', 'Alineación', 'Nitrógeno', 'Suspensión'], telefono: '3100000020' },
  { nombre: 'Frenos Premium Teusaquillo', ubicacion: 'Teusaquillo', calificacion: 4.6, servicios: ['Frenos de Alto Rendimiento', 'ABS', 'Servofreno', 'Líquido de Frenos'], telefono: '3100000021' },
  { nombre: 'Mecánica Eléctrica Suba', ubicacion: 'Suba', calificacion: 4.1, servicios: ['Electricidad Automotriz', 'Alternadores', 'Motores de Arranque', 'Cableado'], telefono: '3100000022' },
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { mensaje } = req.body;

    // Paso 1: Procesar el mensaje y generar el diagnóstico estructurado
    const result = await generateObject({
      model: google('models/gemini-1.5-flash'), // O el modelo que estés usando
      schema: responseSchema, // Le decimos al modelo que genere un objeto que cumpla este esquema
      prompt: `Eres un asistente mecánico experimentado, especializado en diagnósticos preliminares de vehículos. Un usuario en Bogotá te describe el siguiente problema con su carro: "${mensaje}".
    
    Tu tarea es proporcionar una evaluación inicial y información útil en formato JSON, siguiendo estrictamente el esquema proporcionado. Considera que la reparación se realizaría en Bogotá, Colombia.
    
    Genera un objeto JSON con los siguientes campos:
    
    1.  'diagnostico': Una descripción concisa de las **2 a 4 causas preliminares más probables** o áreas afectadas basadas en el problema descrito. Sé directo y técnico, pero fácil de entender. 
    2.  'preciosEstimados': Una lista de objetos JSON. Por cada objeto, identifica un 'item' (una reparación común, parte principal o mano de obra asociada a las causas más probables) y su 'precio' (un **rango estimado** en pesos colombianos, **COP**, para talleres de gama media en **Bogotá**). Enfócate en los **costos más probables** relacionados con las causas identificadas (ej: "Cambio de Pastillas (Piezas + Mano de obra)", "Rectificación de Discos", "Revisión Sistema Eléctrico").
    3.  'serviciosRequeridos': Una lista de strings. Identifica las **CATEGORÍAS generales de servicios automotrices** que un taller debería ofrecer para solucionar este tipo de problema (ejemplos: "Frenos", "Suspensión", "Motor", "Electricidad", "Alineación", "Transmisión", "Diagnóstico Electrónico", "Revisiones Generales"). Lista solo las categorías de **alto nivel más relevantes** (máximo 3-5).
    
    La respuesta debe ser **SÓLO** el objeto JSON válido que cumpla el esquema exactamente. No incluyas texto explicativo adicional, introducciones o conclusiones fuera del JSON.`,
    });

    const structuredResponse = result.object; // Accedemos al objeto JSON generado

    // Paso 2: Buscar talleres según los servicios identificados
    const talleresRecomendados = buscarTalleresPorServicios(structuredResponse.serviciosRequeridos);

    // Paso 3: Devolver la respuesta combinada (diagnóstico estructurado + talleres)
    return res.status(200).json({
      diagnostico: structuredResponse.diagnostico,
      estimacionPrecios: structuredResponse.preciosEstimados, // Ahora esto es un array
      talleres: talleresRecomendados,
    });
  } catch (error) {
    console.error('Error al generar respuesta:', error);
    let userErrorMessage = 'Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.';
    // Mantengo el chequeo de error, aunque esperamos que el cambio resuelva este específico
    if (error.message.includes('property is not defined') || error.message.includes('schema')) {
      userErrorMessage = 'Error de configuración interna del asistente. Contacta al administrador si persiste.';
    }

    return res.status(500).json({
      error: userErrorMessage,
      detalle: error.message,
    });
  }
}

// Función para buscar talleres según los servicios que necesita el usuario
// Esta función se mantiene igual, ya que usa serviciosRequeridos que no cambió
function buscarTalleresPorServicios(serviciosNecesarios) {
  if (!serviciosNecesarios || serviciosNecesarios.length === 0) {
    console.log("No se encontraron servicios requeridos para buscar talleres.");
    return [];
  }
  console.log("Buscando talleres para servicios:", serviciosNecesarios);

  const serviciosLower = serviciosNecesarios.map(s => s.toLowerCase());

  return talleres.filter(taller => {
    const tallerServiciosLower = taller.servicios.map(s => s.toLowerCase());
    return serviciosLower.some(servicioNecesario =>
      tallerServiciosLower.includes(servicioNecesario)
    );
  });
}