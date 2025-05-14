import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

import { createClient } from '@supabase/supabase-js'; // Importa createClient

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // OK usar la URL pública
  process.env.SUPABASE_SERVICE_ROLE_KEY // !!! USAR LA CLAVE DE ROL DE SERVICIO AQUI !!!
);

const MAX_MESSAGE_LENGTH = 400;

const ALLOWED_SERVICE_CATEGORIES = [
  "Mecánica General",
  "Mantenimiento Preventivo",
  "Revisión General",
  "Pre-compra / Revisión",
  "Tecnicomecanica",
  "Diagnóstico General (No Electrónico)",
  "Lavado y Detallado",
  "Motor",
  "Sistema de Combustible",
  "Sistema de Escape",
  "Sistema de Enfriamiento",
  "Transmisión y Embrague",
  "Frenos",
  "Suspensión",
  "Dirección",
  "Electricidad Automotriz",
  "Aire Acondicionado / Calefacción",
  "Diagnóstico Electrónico",
  "Latonería y Pintura",
  "Vidrios y Carrocería Menor",
  "Tapicería e Interiores",
  "Iluminación (Luces)",
  "Audio y Alarmas",
  "Polarizado / Películas de Seguridad",
  "Instalación de Accesorios",
  "Llantas y Rines",
  "Alineación",
  "Balanceo",
  "Sistemas de Seguridad (Airbags)",
  "Vehículos Pesados",
  "Motores Diesel",
  "Vehículos Híbridos/Eléctricos",
  "Sistemas 4x4 / Doble Tracción",
  "Restauración de Vehículos Clásicos",
  "Modificaciones / Tuning",
  "Cerrajería Automotriz",
];


// --- Esquema para la respuesta estructurada de Gemini ---
const responseSchema = z.object({
  diagnostico: z.string().describe("Diagnóstico preliminar del problema descrito por el usuario."),
  preciosEstimados: z.array(z.object({
    item: z.string().describe("Nombre del item de reparación, parte o servicio"),
    precio: z.string().describe("Estimación de precio o rango")
  })).describe("Lista de estimaciones de precios."),
  serviciosRequeridos: z.array(z.string()).describe(`Lista de tipos de servicios generales requeridos, seleccionados EXCLUSIVAMENTE de la lista controlada de categorías automotrices.`),
  carMake: z.string().nullable().describe("Marca del vehículo mencionada por el usuario (ej: Chevrolet, Renault, Mazda). Null si no se menciona."),
  carModel: z.string().nullable().describe("Modelo del vehículo mencionado por el usuario (ej: Aveo, Sandero, CX-5). Null si no se menciona."),
  carYear: z.string().nullable().describe("Año del vehículo mencionado por el usuario (ej: 2015, 1998). Responde 'null' si no se menciona o es ambiguo."),
});
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/[^a-z0-9-]/g, '') // Elimina caracteres que no sean letras (a-z), números (0-9) o guiones
    .replace(/-+/g, '-') // Reemplaza múltiples guiones seguidos por uno solo
    .replace(/^-+|-+$/g, ''); // Elimina guiones al principio o al final
}

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

    // const ip = getClientIP(req);


    let userCity = 'Bogotá';
    let userCountry = 'Colombia';

    // if (!userCity || !userCountry) {
    //   try {
    //     const geoRes = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    //     const geoData = await geoRes.json();

    //     userCity = geoData.city || 'Ciudad desconocida';
    //     userCountry = geoData.country || 'País desconocido';
    //   } catch (geoError) {
    //     console.warn('Error usando geojs:', geoError);
    //     userCity = 'Bogotá';
    //     userCountry = 'Colombia';
    //   }
    // }
    const problemaSlug = createSlug(mensajeTrimmed);
    if (!problemaSlug) {
      // Si createSlug devuelve una cadena vacía (ej. por caracteres raros sin letras/números), validar.
      console.error("Error al generar slug: mensaje resultante vacío.");
      return res.status(400).json({ error: 'No se pudo generar un identificador válido para el problema a partir del mensaje.' });
    }
    // !!! CAMBIO AQUI: Usar .ilike() en lugar de .eq() para búsqueda case-insensitive !!!
    const { data: existingDiagnosis, error: selectError } = await supabase
      .from('diagnostics') // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
      .select('slug') // Seleccionar ID y mensaje_usuario del existente
      .ilike('slug', problemaSlug) // !!! USAR .ilike() y comparar con el mensaje limpio !!!
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
      prompt: `Eres un asistente mecánico virtual experimentado, especializado en diagnósticos preliminares de vehículos. Un usuario en ${userCity}, ${userCountry} te describe un problema.

      // Construir una descripción detallada del vehículo si se menciona información
      ${(structuredResponse) => { // structuredResponse estará disponible aquí gracias a generateObject/schema
          const make = structuredResponse.carMake || '';
          const model = structuredResponse.carModel || '';
          const year = structuredResponse.carYear || '';

          let carDescription = 'Con su carro';
          if (make || model || year) {
            carDescription = 'Con su vehículo';
            if (make) carDescription += ` marca ${make}`;
            if (model) carDescription += ` modelo ${model}`;
            if (year) carDescription += ` año ${year}`;
          }
          return carDescription + ':'; // Añadir dos puntos al final
        }
        } "${mensaje}".

    Tu tarea es proporcionar una evaluación inicial y información útil en formato JSON, siguiendo estrictamente el esquema proporcionado. Considera que la reparación se realizaría en ${userCity}, ${userCountry}. **Utiliza la marca, modelo y año del vehículo si fueron detectados para ofrecer un diagnóstico más preciso y relevante a ese vehículo específico.**

    Genera un objeto JSON con los siguientes campos:


    1.  'diagnostico': Una descripción concisa de las **2 a 3 causas preliminares más probables** o áreas afectadas basadas en el problema descrito. Sé directo y técnico, pero fácil de entender. No uses mas de 500 caracteres. NO DEBES INCLUIR introducciones, frases como "El usuario busca..."
    2.  'preciosEstimados': Una lista de objetos JSON. Por cada objeto, identifica un 'item' (una reparación común, parte principal o mano de obra asociada a las causas más probables) y su 'precio' (un rango estimado en la **moneda local de ${userCountry}** y costos típicos para **talleres de gama media en ${userCity}, ${userCountry}**. Si no tienes información específica para ${userCity}, proporciona una estimación general para **${userCountry}**. Si no tienes información específica para el país, proporciona una estimación general global). Enfócate en los costos más probables, considerando el vehículo si es posible.
    3.  'serviciosRequeridos': Una lista de strings. Identifica las CATEGORÍAS generales de servicios automotrices requeridos. **Debes seleccionar SOLO de la siguiente lista de categorías disponibles y usar los términos EXACTOS de la lista:**
      ${JSON.stringify(ALLOWED_SERVICE_CATEGORIES)}
      Lista las categorías más relevantes (máximo 3-5) que se ajusten a las causas probables que identificaste.
    4.  'carMake': La marca del vehículo mencionada por el usuario. Responde 'null' si no se menciona ninguna marca clara.
    5.  'carModel': El modelo del vehículo mencionado por el usuario. Responde 'null' si no se menciona ningún modelo claro.
    6.  'carYear': El año del vehículo mencionado por el usuario. Responde 'null' si no se menciona o es ambiguo.

    La respuesta debe ser SÓLO el objeto JSON válido que cumpla el esquema exactamente. No incluyas texto explicativo adicional, introducciones o conclusiones fuera del JSON.`,
    });
    const structuredResponse = result.object;


    const cleanedDiagnostico = structuredResponse.diagnostico.replace(/\n/g, ' ').trim();

    // Validar que los servicios generados por la IA estén en la lista permitida
    const validatedServices = Array.isArray(structuredResponse.serviciosRequeridos)
      ? structuredResponse.serviciosRequeridos.filter(service => ALLOWED_SERVICE_CATEGORIES.includes(service))
      : [];
    if (validatedServices.length !== structuredResponse.serviciosRequeridos.length) {
      console.warn("La IA generó servicios fuera de la lista controlada. Se usará la lista filtrada.", structuredResponse.serviciosRequeridos, validatedServices);
    }
    structuredResponse.serviciosRequeridos = validatedServices;

    // Limpiar y validar make/model (opcional, pero buena práctica)
    const carMake = structuredResponse.carMake ? structuredResponse.carMake.trim() : null;
    const carModel = structuredResponse.carModel ? structuredResponse.carModel.trim() : null;
    const carYearString = structuredResponse.carYear ? structuredResponse.carYear.trim() : null;
    const carYear = carYearString ? parseInt(carYearString, 10) : null;
    if (carYearString && carYear === null) {
        console.warn(`La IA devolvió un año no numérico: "${carYearString}". Se guardará como null.`);
    }
    // Paso 3: Guardar la información del diagnóstico en Supabase
    // !!! CAMBIO AQUI: NO INCLUIR slug en la inserción, Supabase genera el ID !!!
    const { data, error: dbError } = await supabase
      .from('diagnostics') // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
      .insert([
        {
          mensaje_usuario: mensaje, // <-- Guardando el mensaje original (con mayúsculas/minúsculas, etc.)
          city: userCity || null,
          slug: problemaSlug,
          country: userCountry || null,
          diagnostico: cleanedDiagnostico,
          precios: structuredResponse.preciosEstimados,
          servicios: structuredResponse.serviciosRequeridos,
          car_make: carMake,
          car_model: carModel,
          car_year:carYear
        },
      ])
      .select('slug')
      .single();

    if (dbError) {
      console.error('Error al guardar diagnóstico en Supabase:', dbError);
      return res.status(500).json({
        error: 'Error al guardar el diagnóstico.',
        detalle: dbError.message,
      });
    }
    return res.status(200).json({ slug: data.slug }); // DEVOLVER EL ID


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