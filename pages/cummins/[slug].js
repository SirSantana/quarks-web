// pages/cummins/[slug].jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Gauge, Settings, Droplet, Wind, Wrench, Info } from 'lucide-react';
import motorescummins from '@/utils/motorescummins.json';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function MotorDetailPage({ motor }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('specs');

  // Si la página está en modo fallback
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": motor.nombre_modelo,
    "description": motor.aplicacion_principal,
    "brand": {
      "@type": "Brand",
      "name": "Cummins"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Cummins Inc."
    },
    "category": "Motor Diésel",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Potencia",
        "value": motor.rendimiento_potencia_torque.rango_potencia_hp
      },
      {
        "@type": "PropertyValue",
        "name": "Torque",
        "value": motor.rendimiento_potencia_torque.rango_torque_nm
      },
      {
        "@type": "PropertyValue",
        "name": "Configuración",
        "value": motor.especificaciones_generales.configuracion
      },
      {
        "@type": "PropertyValue",
        "name": "Cilindrada",
        "value": `${motor.especificaciones_generales.cilindrada_litros}L`
      }
    ]
  };

  const pageTitle = `${motor.nombre_modelo} - Especificaciones Técnicas | Cummins`;
  const pageDescription = `${motor.aplicacion_principal}. Potencia: ${motor.rendimiento_potencia_torque.rango_potencia_hp}, Torque: ${motor.rendimiento_potencia_torque.rango_torque_lb_ft}. Configuración ${motor.especificaciones_generales.configuracion}.`;
  const pageUrl = `https://www.quarks.com/cummins/${motor.motor_id.toLowerCase().replace(/_/g, '-')}`;
  const imageUrl = motor.images?.[0] || `https://www.quarks.com/images/cummins-default.jpg`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['specs', 'performance', 'maintenance'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      <Head>
        {/* Meta Tags Básicos */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${motor.nombre_modelo}, motor cummins, motor diésel, ${motor.especificaciones_generales.configuracion}, ${motor.rendimiento_potencia_torque.rango_potencia_hp}, especificaciones técnicas, mantenimiento motor`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Quarks" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Datos Estructurados JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://tudominio.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Motores Cummins",
                  "item": "https://tudominio.com/cummins"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": motor.nombre_modelo,
                  "item": pageUrl
                }
              ]
            })
          }}
        />
        
        {/* Alternate Languages (si aplica) */}
        <link rel="alternate" hrefLang="es" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/cummins" className="flex items-center space-x-2 sm:space-x-3 text-gray-700 hover:text-red-600 transition-colors group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 group-hover:bg-red-50 rounded-full flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-semibold text-sm sm:text-base hidden sm:inline">Volver al catálogo</span>
              <span className="font-semibold text-sm sm:hidden">Volver</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg sm:text-xl">C</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Info */}
            <div>
              <div className="inline-block mb-3 sm:mb-4">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100 uppercase tracking-wider">
                  {motor.especificaciones_generales.configuracion}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">
                {motor.nombre_modelo}
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {motor.aplicacion_principal}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-4 sm:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center mb-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-1">Potencia</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900">
                    {motor.rendimiento_potencia_torque.rango_potencia_hp.split(' ')[0]}
                    <span className="text-sm sm:text-base"> hp</span>
                  </p>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center mb-2">
                    <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-1">Torque</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900">
                    {motor.rendimiento_potencia_torque.rango_torque_lb_ft.split(' ')[0]}
                    <span className="text-sm sm:text-base"> lb-ft</span>
                  </p>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center mb-2">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-1">Cilindrada</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900">
                    {motor.especificaciones_generales.cilindrada_litros}
                    <span className="text-sm sm:text-base">L</span>
                  </p>
                </div>
              </div>

              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-600/50 text-sm sm:text-base">
                Solicitar información
              </button>
            </div>

            {/* Right: Image */}
            <div className="relative order-first lg:order-last">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden">
                <img
                  src={motor.images?.[0] || `https://via.placeholder.com/800x800/1f2937/ef4444?text=${encodeURIComponent(motor.nombre_modelo)}`}
                  alt={motor.nombre_modelo}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {motor.video_url && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Video del Motor</h2>
              <p className="text-sm sm:text-base text-gray-600">Conoce más sobre el {motor.nombre_modelo}</p>
            </div>
            <div className="aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
              <iframe
                width="100%"
                height="100%"
                src={motor.video_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white border-b border-gray-200 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 min-w-max">
            {[
              { id: 'specs', label: 'Especificaciones', icon: Info },
              { id: 'performance', label: 'Rendimiento', icon: Zap },
              { id: 'maintenance', label: 'Mantenimiento', icon: Wrench },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-bold transition-all text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white">
        {/* Especificaciones Section */}
        <section id="specs" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Especificaciones</h2>
              <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            </div>

            <div className="space-y-12">
              {/* Especificaciones Técnicas */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  Especificaciones Técnicas
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Tipo de Motor</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.tipo_motor}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Configuración</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.configuracion}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Cilindrada</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.cilindrada_litros}L ({motor.especificaciones_generales.cilindrada_pulgadas_cubicas} in³)</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Diámetro x Carrera</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.diametro_carrera_mm} mm</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Orden de Encendido</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.orden_encendido}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-1">Peso Seco</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.peso_seco_kg} kg</span>
                  </div>
                </div>
              </div>

              {/* Sistemas */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <Wind className="w-5 h-5 text-white" />
                  </div>
                  Sistemas
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-2">Sistema de Combustible</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.sistema_combustible}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-2">Sistema de Aspiración</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.sistema_aspiracion}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-2">Sistema de Control</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.sistema_control}</span>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-500 block mb-2">Certificación de Emisiones</span>
                    <span className="text-base font-bold text-gray-900">{motor.especificaciones_generales.emisiones_certificacion}</span>
                  </div>
                </div>
              </div>

              {/* Diseño */}
              <div className="bg-red-50 rounded-2xl p-6 sm:p-8 border border-red-100">
                <h4 className="text-lg font-black text-gray-900 mb-3">Diseño y Arquitectura</h4>
                <p className="text-gray-700 leading-relaxed">{motor.especificaciones_generales.diseno}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rendimiento Section */}
        <section id="performance" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Rendimiento</h2>
              <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              {/* Potencia */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Potencia</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Rango de Potencia</p>
                    <p className="text-4xl sm:text-5xl font-black text-gray-900">{motor.rendimiento_potencia_torque.rango_potencia_hp}</p>
                    <p className="text-xl font-bold text-gray-500 mt-1">{motor.rendimiento_potencia_torque.rango_potencia_kw}</p>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Velocidad Máxima</p>
                    <p className="text-2xl font-black text-gray-900">{motor.rendimiento_potencia_torque.velocidad_maxima_rpm}</p>
                  </div>
                </div>
              </div>

              {/* Torque */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Torque</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Rango de Torque</p>
                    <p className="text-4xl sm:text-5xl font-black text-gray-900">{motor.rendimiento_potencia_torque.rango_torque_nm}</p>
                    <p className="text-xl font-bold text-gray-500 mt-1">{motor.rendimiento_potencia_torque.rango_torque_lb_ft}</p>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Torque Máximo</p>
                    <p className="text-2xl font-black text-gray-900">{motor.rendimiento_potencia_torque.torque_maximo_rpm}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mantenimiento Section */}
        <section id="maintenance" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Mantenimiento</h2>
              <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            </div>

            <div className="space-y-12">
              {/* Lubricación y Calibración */}
              <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Lubricación</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 block mb-2">Aceite Recomendado</span>
                      <span className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.lubricacion.aceite_recomendado_norma}</span>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 block mb-2">Intervalo de Cambio</span>
                      <span className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.lubricacion.intervalo_cambio_km} km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Calibración de Válvulas</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 block mb-2">Admisión (En Frío)</span>
                      <span className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.calibracion_valvulas_frio.admision_mm} mm</span>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 block mb-2">Escape (En Frío)</span>
                      <span className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.calibracion_valvulas_frio.escape_mm} mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Procedimientos de Torque */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Procedimiento Torque de Biela</h3>
                  <div className="space-y-3">
                    {motor.datos_mantenimiento_y_ajustes.torque_biela_pasos?.map((paso, idx) => (
                      <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                        <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">{idx + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 leading-relaxed">{paso}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Procedimiento Torque de Culata</h3>
                  <div className="space-y-3">
                    {motor.datos_mantenimiento_y_ajustes.torque_culata_pasos?.map((paso, idx) => (
                      <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                        <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">{idx + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 leading-relaxed">{paso}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="bg-red-50 rounded-2xl p-6 sm:p-8 border border-red-100">
                <h4 className="text-lg font-black text-gray-900 mb-4">Información Adicional</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Combustible</p>
                    <p className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.combustible}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">DEF/AdBlue</p>
                    <p className="text-base font-bold text-gray-900">{motor.datos_mantenimiento_y_ajustes.uso_def_adblue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg sm:text-xl">C</span>
              </div>
              <span className="text-xl sm:text-2xl font-black">Cummins</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-medium">© 2024 Cummins Inc. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

// Generar todas las rutas estáticas en build time
export async function getStaticPaths() {
  
  const paths = motorescummins.motorescummins.map((motor) => ({
    params: { 
      slug: motor.motor_id.toLowerCase().replace(/_/g, '-') 
    },
  }));
  console.log(paths);
  
  return {
    paths,
    fallback: false, // Cambiar a 'blocking' o true si quieres generar páginas on-demand
  };
}

// Obtener los datos del motor específico
export async function getStaticProps({ params }) {
  
  const slug = params.slug;
  const motorId = slug.toUpperCase().replace(/-/g, '_');
  
  const motor = motorescummins.motorescummins.find(
    (m) => m.motor_id === motorId
  );

  if (!motor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      motor,
    },
    revalidate: 3600, // Revalidar cada hora (ISR)
  };
}