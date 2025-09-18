import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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
  diagnostico: z
    .string()
    .describe("Diagnóstico preliminar del problema descrito por el usuario."),
  preciosEstimados: z
    .array(
      z.object({
        item: z
          .string()
          .describe("Nombre del item de reparación, parte o servicio"),
        precio: z.string().describe("Estimación de precio o rango"),
      })
    )
    .describe("Lista de estimaciones de precios."),
  serviciosRequeridos: z
    .array(z.string())
    .describe(
      `Lista de tipos de servicios generales requeridos, seleccionados EXCLUSIVAMENTE de la lista controlada de categorías automotrices.`
    ),
  carMake: z
    .string()
    .nullable()
    .describe(
      "Marca del vehículo mencionada por el usuario (ej: Chevrolet, Renault, Mazda). Null si no se menciona."
    ),
  carModel: z
    .string()
    .nullable()
    .describe(
      "Modelo del vehículo mencionado por el usuario (ej: Aveo, Sandero, CX-5). Null si no se menciona."
    ),
  carYear: z
    .string()
    .nullable()
    .describe(
      "Año del vehículo mencionado por el usuario (ej: 2015, 1998). Responde 'null' si no se menciona o es ambiguo."
    ),
});
function createSlug(text) {
  return text
    .toLowerCase()
    .replaceAll(/ñ/g, "n")
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/[^a-z0-9-]/g, "") // Elimina caracteres que no sean letras (a-z), números (0-9) o guiones
    .replace(/-+/g, "-") // Reemplaza múltiples guiones seguidos por uno solo
    .replace(/^-+|-+$/g, ""); // Elimina guiones al principio o al final
}
// Usando un servicio gratuito como ipapi.co
async function getUserLocation(req) {
  try {
    const userIP =
      req.ip || req.connection.remoteAddress || req.headers["x-forwarded-for"];

    // Para desarrollo local, usar una IP pública de ejemplo
    const ipToCheck =
      userIP === "127.0.0.1" || userIP === "::1"
        ? "187.141.45.10" // IP de ejemplo para testing
        : userIP;

    const response = await fetch(`https://ipapi.co/${ipToCheck}/json/`);
    const data = await response.json();
    console.log(response, "res");
    console.log(data, "dataaa");

    return {
      city: data.city || "Bogotá",
      country: data.country_name || "Colombia",
    };
  } catch (error) {
    console.error("Error obteniendo ubicación:", error);
    return {
      city: "Bogotá",
      country: "Colombia",
    };
  }
}

// En tu endpoint

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  try {
    const { mensaje, userId } = req.body;
    console.log(userId);
    
    if (!mensaje || typeof mensaje !== "string") {
      return res.status(400).json({ error: "Mensaje inválido" });
    }

    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from("diagnostico_usos")
      .select("*", { count: "exact", head: true })
      // .eq("user_id", userId)
      .gte("created_at", startOfToday.toISOString());

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al verificar los límites" });
    }

    // if (count >= 3) {
    //   return res
    //     .status(403)
    //     .json({ error: "Límite de 3 diagnósticos por día alcanzado" });
    // }

    // Guardar el nuevo uso
    const { error: insertError } = await supabase
      .from("diagnostico_usos")
      .insert({
        user_id: userId,
      });

    if (insertError) {
      console.error(insertError);
      return res
        .status(500)
        .json({ error: "No se pudo registrar el uso del diagnóstico" });
    }

    const mensajeTrimmed = mensaje.trim();

    if (mensajeTrimmed.length === 0) {
      return res.status(400).json({ error: "El mensaje no puede estar vacío" });
    }

    if (mensajeTrimmed.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `El mensaje es demasiado largo. Máximo ${MAX_MESSAGE_LENGTH} caracteres.`,
      });
    } // Usar la versión limpia para la búsqueda

    const location = await getUserLocation(req);
    let userCity = location.city;
    let userCountry = location.country;

    const problemaSlug = createSlug(mensajeTrimmed);
    if (!problemaSlug) {
      // Si createSlug devuelve una cadena vacía (ej. por caracteres raros sin letras/números), validar.
      console.error("Error al generar slug: mensaje resultante vacío.");
      return res.status(400).json({
        error:
          "No se pudo generar un identificador válido para el problema a partir del mensaje.",
      });
    }
    // !!! CAMBIO AQUI: Usar .ilike() en lugar de .eq() para búsqueda case-insensitive !!!
    const { data: existingDiagnosis, error: selectError } = await supabase
      .from("diagnostics") // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
      .select("slug") // Seleccionar ID y mensaje_usuario del existente
      .ilike("slug", problemaSlug); // !!! USAR .ilike() y comparar con el mensaje limpio !!!
    // Manejar error en la consulta de existencia (PGRST301 es 'no rows found' con .single())

    if (selectError && selectError.code !== "PGRST301") {
      return res.status(500).json({
        error: "Error de base de datos al verificar diagnóstico existente.",
        detalle: selectError.message,
      });
    }

    // Si existingDiagnosis NO es null, significa que se encontró un registro con ese mensaje exacto (case-insensitive)
    if (existingDiagnosis.length > 0) {
      return res
        .status(200)
        .json({ slug: mensaje, message: "Diagnóstico ya existe." }); // Devolver el ID
    }

    // ... (Llamada a generateObject con Gemini se mantiene igual)
    const result = await generateObject({
      model: google("models/gemini-1.5-flash"),
      schema: responseSchema,
      prompt: `# ASISTENTE MECÁNICO VIRTUAL EXPERTO

Eres un mecánico certificado con 25+ años de experiencia en diagnósticos automotrices. 

## CONTEXTO DEL USUARIO
- **Ubicación**: ${userCity}, ${userCountry}
- **Problema reportado**: "${mensaje}"

## ANÁLISIS DEL VEHÍCULO
${(() => {
  // Esta función se ejecutará después de que structuredResponse esté disponible
  const buildVehicleContext = (response) => {
    const make = response?.carMake?.trim() || "";
    const model = response?.carModel?.trim() || "";
    const year = response?.carYear ? parseInt(response.carYear) : null;

    if (!make && !model && !year) {
      return "**Vehículo**: No especificado (aplicar diagnóstico general)";
    }

    let vehicleInfo = "**Vehículo identificado**: ";
    if (year) vehicleInfo += `${year} `;
    if (make) vehicleInfo += `${make} `;
    if (model) vehicleInfo += `${model}`;

    return (
      vehicleInfo +
      "\n- Aplicar conocimiento específico de esta marca/modelo para diagnóstico más preciso"
    );
  };

  return "<!-- Se completará con información del vehículo detectado -->";
})()}

## INSTRUCCIONES DE DIAGNÓSTICO

### 1. DIAGNÓSTICO PRELIMINAR
- Identifica las **2-5 causas más probables** basándote en los síntomas
- Usa analogías simples y explicaciones que cualquier persona entienda
- Incluye por qué sucede cada problema de forma didáctica
- Si hay información del vehículo, considera problemas conocidos de esa marca/modelo/año
- **Límite**: 500 caracteres máximo
- **Estilo**: Conversacional, empático, con jerga técnica
- No digas que el problema es algo común, a no ser que si sea verdad en el modelo del auto, no finalices diciendo que Revisaré cada uno para determinar la causa. 

### 2. ESTIMACIÓN DE COSTOS
- Proporciona costos realistas para **talleres de gama media** en ${userCity}, ${userCountry}
- Usa la **moneda local** de ${userCountry}
- Incluye tanto **repuestos** como **mano de obra**
- Prioriza los ítems más probables del diagnóstico
- Si no tienes datos específicos de ${userCity}, usa promedios de ${userCountry}
- Formato de rangos: "150,000 - 300,000 COP" (ejemplo)

### 3. CATEGORÍAS DE SERVICIO
**IMPORTANTE**: Solo selecciona de esta lista exacta (USAR TEXTO EXACTO, SIN MODIFICACIONES):
${JSON.stringify(ALLOWED_SERVICE_CATEGORIES)}

**REGLAS CRÍTICAS PARA SERVICIOS**:
- Copiar el texto EXACTAMENTE como aparece en la lista
- NO añadir saltos de línea (\n)
- NO modificar la puntuación ni acentos
- Máximo 3-5 categorías que mejor se alineen con tu diagnóstico preliminar
- Si tienes dudas, prefiere categorías más generales como "Diagnóstico General (No Electrónico)" o "Mecánica General"

## EJEMPLO DE SERVICIOS CORRECTOS:
✅ ["Motor", "Sistema de Combustible", "Diagnóstico General (No Electrónico)"]
❌ ["Motor", "Sistema de Combusti\nble", "Diagnóstico General"]

Selecciona máximo 3-5 categorías que mejor se alineen con tu diagnóstico preliminar.

### 4. DETECCIÓN DE VEHÍCULO
- **Marca**: Extrae solo si se menciona claramente (Toyota, Ford, Chevrolet, etc.)
- **Modelo**: Extrae solo si se especifica (Corolla, Focus, Spark, etc.)
- **Año**: Extrae solo si se menciona explícitamente un año válido (1990-2025)
- **Si hay dudas**: Usar null

## EJEMPLOS DE RESPUESTA ESPERADA

### Ejemplo 1 - Problema de motor:
\`\`\`json
{
  "diagnostico": "Basándome en los síntomas descritos, Falla de bobina de encendido (40%), sensor MAF sucio (25%), filtro de aire obstruido (20%), problema en inyectores (15%). Síntomas típicos de pérdida de potencia y consumo irregular.",
  "preciosEstimados": [
    {"item": "Reemplazo bobina de encendido", "precio": "80,000 - 150,000 COP"},
    {"item": "Limpieza sensor MAF", "precio": "25,000 - 45,000 COP"},
    {"item": "Cambio filtro de aire", "precio": "15,000 - 30,000 COP"}
  ],
  "serviciosRequeridos": ["Motor", "Sistema eléctrico", "Mantenimiento"],
  "carMake": "Toyota",
  "carModel": "Corolla",
  "carYear": "2015"
}
\`\`\`

## REGLAS CRÍTICAS
1. **Solo JSON válido** - Sin texto adicional fuera del objeto
2. **Límites de caracteres** - Diagnóstico máximo 500 caracteres
3. **Categorías exactas** - Solo usar las proporcionadas en ALLOWED_SERVICE_CATEGORIES
4. **Costos locales** - Siempre en moneda de ${userCountry}
5. **Especificidad** - Si hay marca/modelo, ser específico para ese vehículo

Genera el diagnóstico ahora:`,
    });

    const structuredResponse = result.object;

    // Limpieza y validación mejorada
    const cleanedDiagnostico = structuredResponse.diagnostico
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ") // Eliminar espacios múltiples
      .trim();

    // ⭐ SOLUCIÓN: Limpieza de servicios antes de validación
    const cleanedServices = Array.isArray(
      structuredResponse.serviciosRequeridos
    )
      ? structuredResponse.serviciosRequeridos
          .map((service) => {
            if (typeof service !== "string") return "";
            return service
              .replace(/\n/g, " ") // Eliminar saltos de línea
              .replace(/\s+/g, " ") // Eliminar espacios múltiples
              .trim(); // Eliminar espacios al inicio/final
          })
          .filter((service) => service.length > 0) // Eliminar strings vacíos
      : [];

    // Validación robusta de servicios (DESPUÉS de la limpieza)
    const validatedServices = cleanedServices.filter((service) => {
      return ALLOWED_SERVICE_CATEGORIES.includes(service);
    });

    if (validatedServices.length !== cleanedServices.length) {
      console.warn(
        "⚠️ IA generó servicios inválidos:",
        "Originales:",
        structuredResponse.serviciosRequeridos,
        "Limpiados:",
        cleanedServices,
        "Válidos:",
        validatedServices
      );
    }

    // Validación mejorada de datos del vehículo
    const carMake = structuredResponse.carMake?.trim() || null;
    const carModel = structuredResponse.carModel?.trim() || null;
    const carYearString = structuredResponse.carYear?.toString().trim() || null;

    let carYear = null;
    if (carYearString) {
      const yearNum = parseInt(carYearString, 10);
      if (
        !isNaN(yearNum) &&
        yearNum >= 1900 &&
        yearNum <= new Date().getFullYear() + 1
      ) {
        carYear = yearNum;
      } else {
        console.warn(`⚠️ Año inválido detectado: "${carYearString}"`);
      }
    }

    // Validación de precios estimados
    const validatedPrecios = Array.isArray(structuredResponse.preciosEstimados)
      ? structuredResponse.preciosEstimados.filter(
          (item) => item && typeof item === "object" && item.item && item.precio
        )
      : [];

    // Actualizar respuesta con datos validados
    structuredResponse.diagnostico = cleanedDiagnostico;
    structuredResponse.serviciosRequeridos = validatedServices;
    structuredResponse.preciosEstimados = validatedPrecios;
    structuredResponse.carMake = carMake;
    structuredResponse.carModel = carModel;
    structuredResponse.carYear = carYear;
    // Paso 3: Guardar la información del diagnóstico en Supabase
    // !!! CAMBIO AQUI: NO INCLUIR slug en la inserción, Supabase genera el ID !!!
    const { data, error: dbError } = await supabase
      .from("diagnostics") // !!! Asegúrate que este es el nombre CORRECTO de tu tabla !!!
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
          car_year: carYear,
          user_id: userId,
        },
      ])
      .select("slug")
      .single();

    if (dbError) {
      console.error("Error al guardar diagnóstico en Supabase:", dbError);
      return res.status(500).json({
        error: "Error al guardar el diagnóstico.",
        detalle: dbError.message,
      });
    }
    return res.status(200).json({ slug: data.slug }); // DEVOLVER EL ID
  } catch (error) {
    console.log(error);

    // ... (manejo de errores generales se mantiene igual)
    let userErrorMessage = "Ocurrió un error al procesar tu solicitud.";

    if (error.message) {
      if (error.message.includes("GenerateContentRequest")) {
        userErrorMessage =
          "Error al generar el diagnóstico con el asistente. Intenta de nuevo más tarde.";
      } else if (error.message.includes("duplicate key")) {
        // Manejo si intentó insertar un mensaje_usuario exacto y tienes UNIQUE en esa columna (no recomendado)
        userErrorMessage = "Este problema exacto ya ha sido diagnosticado.";
      }
      // Otros posibles errores podrían ser de red, etc.
    } else {
      userErrorMessage = "Error interno desconocido.";
    }

    if (error.response?.status) {
      userErrorMessage += ` (HTTP ${error.response.status})`;
    }

    return res.status(500).json({
      error: userErrorMessage,
      detalle: error.message || "Error desconocido",
    });
  }
}
