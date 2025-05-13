import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

import { createClient } from '@supabase/supabase-js'; // Importa createClient

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // OK usar la URL pública
  process.env.SUPABASE_SERVICE_ROLE_KEY // !!! USAR LA CLAVE DE ROL DE SERVICIO AQUI !!!
);

const MAX_MESSAGE_LENGTH = 400;
// --- Esquema para la respuesta estructurada de Gemini ---
const responseSchema = z.object({
  diagnostico: z.string().describe("Diagnóstico preliminar del problema descrito por el usuario."),
  preciosEstimados: z.array(z.object({
    item: z.string().describe("Nombre del item de reparación, parte o servicio"),
    precio: z.string().describe("Estimación de precio o rango")
  })).describe("Lista de estimaciones de precios."),
  serviciosRequeridos: z.array(z.string()).describe("Lista de tipos de servicios generales requeridos."),
});


export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }


  try {
    const { mensaje } = req.body;
    if (!mensaje || typeof mensaje !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }

    const mensajeTrimmed = mensaje.trim();

    if (mensajeTrimmed.length === 0) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío' });
    }

    if (mensajeTrimmed.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `El mensaje es demasiado largo. Máximo ${MAX_MESSAGE_LENGTH} caracteres.`,
      });
    } // Usar la versión limpia para la búsqueda

    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(',')[0]?.trim();


    if (ip) {
      try {
        // Cambiamos a ipapi.co (más confiable)
        const geoRes = await fetch(`https://ipapi.co/ ${ip}/json/`);

        if (!geoRes.ok) throw new Error('Error al obtener ubicación');

        const geoData = await geoRes.json();

        // Validar campos antes de asignarlos
        userCity = geoData.city ? geoData.city.trim() : 'Ciudad desconocida';
        userCountry = geoData.country_name ? geoData.country_name.trim() : 'País desconocido';

        console.log('Ubicación obtenida:', { city: userCity, country: userCountry });
      } catch (geoError) {
        console.warn('Error usando ipapi:', geoError);
        userCity = 'Bogotá'; // Fallback seguro
        userCountry = 'Colombia';
      }
    }

    // !!! CAMBIO AQUI: Usar .ilike() en lugar de .eq() para búsqueda case-insensitive !!!
    const { data: existingDiagnosis, error: selectError } = await supabase
      .from('diagnostics') // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
      .select('mensaje_usuario') // Seleccionar ID y mensaje_usuario del existente
      .ilike('mensaje_usuario', mensajeTrimmed) // !!! USAR .ilike() y comparar con el mensaje limpio !!!
    // Manejar error en la consulta de existencia (PGRST301 es 'no rows found' con .single())
    if (selectError && selectError.code !== 'PGRST301') {
      return res.status(500).json({
        error: 'Error de base de datos al verificar diagnóstico existente.',
        detalle: selectError.message,
      });
    }

    // Si existingDiagnosis NO es null, significa que se encontró un registro con ese mensaje exacto (case-insensitive)
    if (existingDiagnosis.length > 0) {
      return res.status(200).json({ slug: mensaje, message: 'Diagnóstico ya existe.' }); // Devolver el ID
    }

    // ... (Llamada a generateObject con Gemini se mantiene igual)
    const result = await generateObject({
      model: google('models/gemini-1.5-flash'),
      schema: responseSchema,
      prompt: `Eres un asistente mecánico virtual experimentado, especializado en diagnósticos preliminares de vehículos. Un usuario en ${userCity}, ${userCountry} te describe el siguiente problema con su carro: "${mensaje}".

    Tu tarea es proporcionar una evaluación inicial y información útil en formato JSON, siguiendo estrictamente el esquema proporcionado. Considera que la reparación se realizaría en ${userCity}, ${userCountry}.

    Genera un objeto JSON con los siguientes campos:


    1.  'diagnostico': Una descripción concisa de las **2 a 3 causas preliminares más probables** o áreas afectadas basadas en el problema descrito. Sé directo y técnico, pero fácil de entender. No uses mas de 500 caracteres.
    2.  'preciosEstimados': Una lista de objetos JSON. Por cada objeto, identifica un 'item' (una reparación común, parte principal o mano de obra asociada a las causas más probables) y su 'precio' (un rango estimado en la **moneda local de ${userCountry}** y costos típicos para **talleres de gama media en ${userCity}, ${userCountry}**. Si no tienes información específica para ${userCity}, proporciona una estimación general para **${userCountry}**. Si no tienes información específica para el país, proporciona una estimación general global). Enfócate en los **costos más probables** relacionados con las causas identificadas (ej: "Cambio de Pastillas (Piezas + Mano de obra)", "Rectificación de Discos", "Revisión Sistema Eléctrico").
    3.  'serviciosRequeridos': Una lista de strings. Identifica las CATEGORÍAS generales de servicios automotrices que un taller debería ofrecer para solucionar este tipo de problema (ejemplos: "Frenos", "Suspensión", "Motor", "Electricidad", "Alineación", "Transmisión", "Diagnóstico Electrónico", "Revisiones Generales"). Lista solo las categorías de **alto nivel más relevantes** (máximo 3-5).

    La respuesta debe ser SÓLO el objeto JSON válido que cumpla el esquema exactamente. No incluyas texto explicativo adicional, introducciones o conclusiones fuera del JSON.`,
    });
    const structuredResponse = result.object;


    // Paso 3: Guardar la información del diagnóstico en Supabase
    // !!! CAMBIO AQUI: NO INCLUIR slug en la inserción, Supabase genera el ID !!!
    const { data, error: dbError } = await supabase
      .from('diagnostics') // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
      .insert([
        {
          mensaje_usuario: mensaje, // <-- Guardando el mensaje original (con mayúsculas/minúsculas, etc.)
          city: userCity || null,
          country: userCountry || null,
          diagnostico: structuredResponse.diagnostico,
          precios: structuredResponse.preciosEstimados,
          servicios: structuredResponse.serviciosRequeridos,
        },
      ])
      .select('mensaje_usuario') // Seleccionar el ID del registro recién insertado
      .single(); // USAR .single() para obtener el objeto insertado con el ID

    if (dbError) {
      console.error('Error al guardar diagnóstico en Supabase:', dbError);
      return res.status(500).json({
        error: 'Error al guardar el diagnóstico.',
        detalle: dbError.message,
      });
    }
    return res.status(200).json({ slug: mensaje }); // DEVOLVER EL ID


  } catch (error) {
    // ... (manejo de errores generales se mantiene igual)
    let userErrorMessage = 'Ocurrió un error al procesar tu solicitud.';

    if (error.message) {
      if (error.message.includes('GenerateContentRequest')) {
        userErrorMessage = 'Error al generar el diagnóstico con el asistente. Intenta de nuevo más tarde.';
      } else if (error.message.includes('duplicate key')) {
        // Manejo si intentó insertar un mensaje_usuario exacto y tienes UNIQUE en esa columna (no recomendado)
        userErrorMessage = 'Este problema exacto ya ha sido diagnosticado.';
      }
      // Otros posibles errores podrían ser de red, etc.
    } else {
      userErrorMessage = 'Error interno desconocido.';
    }

    if (error.response?.status) {
      userErrorMessage += ` (HTTP ${error.response.status})`;
    }


    return res.status(500).json({
      error: userErrorMessage,
      detalle: error.message || 'Error desconocido',
    });
  }
}