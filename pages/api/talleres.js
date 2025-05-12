// pages/api/talleres.js
import { createClient } from '@supabase/supabase-js'; // Importa Supabase client

// Inicializa el cliente de Supabase (usa la service_role key) para guardar métricas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --- Constante con los datos simulados de talleres ---
// Esta lista representa tu "base de datos" de talleres disponibles actualmente.
// Debería contener la propiedad 'ciudad' y 'pais' para cada taller para el filtrado.
// Asegúrate de tener todos tus 23+ talleres aquí con sus ubicaciones.
const talleres = [
  // Los 3 talleres originales
  { nombre: 'Taller Mecánico San Rafael', ubicacion: 'Chapinero', calificacion: 4.7, servicios: ['Suspensión', 'Frenos', 'Motor', 'Tecnicomecanica'], telefono: '3100000000', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Autofrenos Bogotá', ubicacion: 'Engativá', calificacion: 4.5, servicios: ['Frenos', 'Alineación'], telefono: '3100000001', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Serviteca Ferrecar', ubicacion: 'Teusaquillo', calificacion: 4.9, servicios: ['Suspensión', 'Motor', 'Frenos'], telefono: '3100000002', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Auto Servicio Usaquén', ubicacion: 'Usaquén', calificacion: 4.6, servicios: ['Cambio de Aceite', 'Filtros', 'Baterías', 'Revisiones'], telefono: '3100000003', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Frenos y Algo Más - Suba', ubicacion: 'Suba', calificacion: 4.3, servicios: ['Frenos', 'Suspensión', 'Alineación', 'Balanceo'], telefono: '3100000004', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Eléctricos del Norte', ubicacion: 'Usaquén', calificacion: 4.8, servicios: ['Electricidad Automotriz', 'Baterías', 'Arranque', 'Alternador'], telefono: '3100000005', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Centro Automotriz Barrios Unidos', ubicacion: 'Barrios Unidos', calificacion: 4.4, servicios: ['Motor', 'Cajas de Cambio', 'Transmisión', 'Embrague'], telefono: '3100000006', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Servicio Rápido 127', ubicacion: 'Chapinero', calificacion: 4.2, servicios: ['Cambio de Aceite', 'Llantas', 'Balanceo', 'Alineación'], telefono: '3100000007', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Taller La Felicidad', ubicacion: 'Fontibón', calificacion: 4.7, servicios: ['Latonería', 'Pintura', 'Mecánica General', 'Estética Vehicular'], telefono: '3100000008', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Mecánica Especializada Kennedy', ubicacion: 'Kennedy', calificacion: 4.1, servicios: ['Motor', 'Electricidad', 'Diagnóstico Computarizado'], telefono: '3100000009', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Auto Check Bosa', ubicacion: 'Bosa', calificacion: 4.0, servicios: ['Suspensión', 'Frenos', 'Alineación', 'Revisiones'], telefono: '3100000010', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Serviteca Suba Avenida', ubicacion: 'Suba', calificacion: 4.5, servicios: ['Llantas', 'Balanceo', 'Frenos', 'Nitrógeno'], telefono: '3100000011', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Taller General Teusaquillo', ubicacion: 'Teusaquillo', calificacion: 4.6, servicios: ['Mecánica General', 'Tecnicomecanica', 'Revisiones'], telefono: '3100000012', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Diagnóstico Rápido Bogotá', ubicacion: 'Chapinero', calificacion: 4.9, servicios: ['Diagnóstico Computarizado', 'Electricidad', 'Inyección'], telefono: '3100000013', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'El Motorcito Fontibón', ubicacion: 'Fontibón', calificacion: 4.3, servicios: ['Motor', 'Cambio de Aceite', 'Reparación de Motor'], telefono: '3100000014', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Reparación Total Kennedy', ubicacion: 'Kennedy', calificacion: 4.5, servicios: ['Mecánica General', 'Suspensión', 'Frenos', 'Motor', 'Electricidad Automotriz'], telefono: '3100000015', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Servifrenos Engativá Centro', ubicacion: 'Engativá', calificacion: 4.8, servicios: ['Frenos', 'Pastillas', 'Discos', 'Líquido de Frenos'], telefono: '3100000016', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Auto Diagnóstico Usaquén', ubicacion: 'Usaquén', calificacion: 4.7, servicios: ['Diagnóstico Computarizado', 'Electricidad', 'Aire Acondicionado'], telefono: '3100000017', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Pit Stop Chapinero', ubicacion: 'Chapinero', calificacion: 4.4, servicios: ['Cambio de Aceite', 'Filtros', 'Baterías', 'Llantas', 'Revisiones'], telefono: '3100000018', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Taller Industrial Puente Aranda', ubicacion: 'Puente Aranda', calificacion: 4.2, servicios: ['Camiones', 'Vehículos Pesados', 'Mecánica General', 'Motores Diesel'], telefono: '3100000019', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Serviteca La Castellana', ubicacion: 'Barrios Unidos', calificacion: 4.9, servicios: ['Llantas', 'Balanceo', 'Alineación', 'Nitrógeno', 'Suspensión'], telefono: '3100000020', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Frenos Premium Teusaquillo', ubicacion: 'Teusaquillo', calificacion: 4.6, servicios: ['Frenos de Alto Rendimiento', 'ABS', 'Servofreno', 'Líquido de Frenos'], telefono: '3100000021', ciudad: 'Bogotá', pais: 'Colombia' },
  { nombre: 'Mecánica Eléctrica Suba', ubicacion: 'Suba', calificacion: 4.1, servicios: ['Electricidad', 'Alternadores', 'Motores de Arranque', 'Cableado'], telefono: '3100000022', ciudad: 'Bogotá', pais: 'Colombia' },
];


// Función para buscar y filtrar talleres según servicios y ciudad
// Esta función opera sobre la constante 'talleres' definida en este archivo
function buscarTalleresPorServicios(serviciosNecesarios, ciudadUsuario) {
  if (!ciudadUsuario || ciudadUsuario.trim() === '') {
    return []; // Devuelve lista vacía si no hay ciudad
  }
  
  const ciudadLower = ciudadUsuario.toLowerCase();
  const serviciosLower = Array.isArray(serviciosNecesarios) ? serviciosNecesarios.map(s => s.toLowerCase()) : [];


  const talleresEnCiudad = talleres.filter(taller =>
    taller.ciudad && taller.ciudad.toLowerCase() === ciudadLower
  );


  const talleresFiltradosPorServicio = talleresEnCiudad.filter(taller => {
    if (serviciosLower.length === 0) {
      return true;
    }
    const tallerServiciosLower = taller.servicios.map(s => s.toLowerCase());
    return serviciosLower.some(servicioNecesario =>
      tallerServiciosLower.includes(servicioNecesario)
    );
  });


  const maxTalleresToShow = 5;
  return talleresFiltradosPorServicio.slice(0, maxTalleresToShow);
}


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usa GET.' });
  }

  // Lee los parámetros de consulta (ciudad, servicios y el slug del diagnóstico para las métricas)
  const { city, services, slug } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'El parámetro "city" es requerido.' });
  }
  if (!slug) {
    console.warn("El parámetro 'slug' es requerido para registrar métricas de impresión.");
  }


  const serviciosArray = services ? services.split(',') : [];

  try {
    const talleresEncontrados = buscarTalleresPorServicios(serviciosArray, city);

    // --- Paso de Rastreo de Métricas de Impresión ---
    // Registraremos una impresión SOLO SI se encontraron talleres Y tenemos el slug para vincular
    if (talleresEncontrados.length > 0 && slug) {
      const impressionsToInsert = talleresEncontrados.map(taller => ({
        workshop_name: taller.nombre, // Usamos el nombre como identificador del taller (MVP)
        diagnosis_slug: slug,        // Vinculamos al slug del diagnóstico
      }));

      const { error: insertError } = await supabase
        .from('workshop_impressions') // Tu tabla de métricas de impresiones
        .insert(impressionsToInsert);

      if (insertError) {
        console.error('Error al guardar métricas de impresiones en Supabase:', insertError);
      } else {
        console.log(`Registradas ${impressionsToInsert.length} impresiones para el slug ${slug}`);
      }
    } else if (!talleresEncontrados.length > 0) {
      console.log(`No se encontraron talleres en ${city} que coincidan con servicios para registrar impresiones para el slug ${slug || 'desconocido'}`);
    }


    return res.status(200).json(talleresEncontrados);

  } catch (error) {
    return res.status(500).json({
      error: 'Error al buscar talleres.',
      detalle: error.message,
    });
  }
}