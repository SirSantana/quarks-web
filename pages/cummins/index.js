import motorescummins from '@/utils/motorescummins.json' 
import React, { useState, useMemo } from 'react';
import { Search, X, Check, Zap, Gauge, Weight, Settings, ArrowRight } from 'lucide-react';
import MotorComparator from '@/src/Components/Cummins/EngineComparator';
import Link from 'next/link';
import Head from 'next/head';

const CumminsMotorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMotors, setSelectedMotors] = useState([]);
  const [showComparator, setShowComparator] = useState(false);

  const motors = motorescummins.motorescummins;

  const filteredMotors = useMemo(() => {
    return motors.filter(motor =>
      motor.nombre_modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motor.aplicacion_principal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, motors]);

  const toggleMotorSelection = (motorId) => {
    setSelectedMotors(prev => {
      if (prev.includes(motorId)) {
        return prev.filter(id => id !== motorId);
      }
      if (prev.length < 3) {
        return [...prev, motorId];
      }
      return prev;
    });
  };

  const selectedMotorsData = motors.filter(m => selectedMotors.includes(m.motor_id));
// SEO Data
  const pageTitle = "Motores Cummins - Catálogo Completo | Especificaciones Técnicas y Comparador";
  const pageDescription = "Explora nuestra línea completa de motores diésel Cummins. Especificaciones técnicas detalladas, comparador de motores, rendimiento y aplicaciones. Encuentra el motor perfecto para tu vehículo comercial.";
  const pageUrl = "https://www.quarks.com/cummins";
  const imageUrl = "https://www.cummins.com/es/sites/default/files/styles/product_display/public/2018-08/isx15-2013-heavy-duty-truck.png?itok=FUuCYMV7";

  // Datos estructurados para lista de productos
  const productsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Motores Cummins",
    "description": pageDescription,
    "numberOfItems": motors.length,
    "itemListElement": motors.map((motor, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": motor.nombre_modelo,
        "description": motor.aplicacion_principal,
        "brand": {
          "@type": "Brand",
          "name": "Cummins"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cummins Inc.",
    "url": "https://www.quarks.com.com",
    "logo": "https://www.cummins.com/es/sites/default/files/styles/product_display/public/2018-08/isx15-2013-heavy-duty-truck.png?itok=FUuCYMV7",
    "description": "Fabricante líder mundial de motores diésel y sistemas de energía",
    "sameAs": [
      "https://www.facebook.com/cummins",
      "https://twitter.com/cummins",
      "https://www.linkedin.com/company/cummins",
      "https://www.instagram.com/cummins"
    ]
  };
  return (
    <>
    <Head>
        {/* Meta Tags Básicos */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="motores cummins, motor diésel, catálogo cummins, especificaciones técnicas, comparador motores, ISF 2.8, ISB 6.7, X15, motores comerciales, motores industriales, alta potencia" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Cummins Motors" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        <link rel='icon' href='https://www.cummins.com/es/sites/default/files/styles/product_display/public/2018-08/isx15-2013-heavy-duty-truck.png?itok=FUuCYMV7' />
        
        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Datos Estructurados - Lista de Productos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsStructuredData) }}
        />
        
        {/* Datos Estructurados - Organización */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
                  "item": pageUrl
                }
              ]
            })
          }}
        />
        
        {/* WebSite Schema con SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Cummins Motors",
              "url": "https://tudominio.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://tudominio.com/cummins?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="es" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href="https://tudominio.com/en/cummins" />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="Cummins Inc." />
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-title" content="Cummins" />
        <meta name="application-name" content="Cummins Motors" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-2xl">C</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cummins</h1>
                <p className="text-xs font-medium text-gray-500 tracking-wide">POWER SOLUTIONS</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#motores" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">Catálogo</a>
              <a href="#comparador" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">Comparador</a>
              {/* <button className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-600/50">
                Contacto
              </button> */}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-full border border-red-100">
                NUEVA GENERACIÓN
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight">
              Motores<br/>
              <span className="text-red-600">Cummins</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Potencia incomparable. Eficiencia superior. Tecnología de vanguardia.
            </p>
          </div>
          
          {/* Search Bar */}
          {/* <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por modelo, aplicación o especificación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border-2 border-gray-200 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 text-base transition-all shadow-lg shadow-gray-200/50"
            />
          </div> */}
        </div>
      </section>

      {/* Quick View Slider */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Vista Rápida</h3>
        <p className="text-gray-500">Explora nuestros motores más destacados</p>
      </div>
      
      <div className="overflow-x-auto pb-6 -mx-6 px-6">
        <div className="flex gap-6 w-max">
          {motors.map((motor) => (
            <div
              key={motor.motor_id}
              className="relative w-80 h-[480px] rounded-2xl overflow-hidden cursor-pointer group bg-gray-100"
              onClick={() => {
                const element = document.getElementById('motores');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={motor.images[0]}
                  alt={motor.nombre_modelo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <Zap className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-900">
                      {motor.rendimiento_potencia_torque.rango_potencia_hp.split('(')[0].trim()}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white leading-tight">
                    {motor.nombre_modelo.split('(')[0].trim()}
                  </h4>
                  
                  <p className="text-white/90 text-sm">
                    {motor.especificaciones_generales.configuracion} • {motor.especificaciones_generales.cilindrada_litros}L
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 shadow-lg">
                <ArrowRight className="w-4 h-4 text-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <MotorComparator motors={motorescummins.motorescummins} />

      {/* Motors Grid */}
     <section id="motores" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {motors.map((motor) => (
          <Link href={`/cummins/${motor.motor_id.toLowerCase().replace(/_/g, '-')}`} key={motor.motor_id} passHref
            className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-64 bg-gray-900 overflow-hidden">
              <img
                src={motor.images[0]}
                alt={motor.nombre_modelo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Settings className="w-3.5 h-3.5 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-900">
                    {motor.especificaciones_generales.configuracion}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {motor.nombre_modelo}
                </h3>
                <p className="text-sm text-gray-500">{motor.periodo_produccion}</p>
              </div>

              {/* Performance */}
              <div className="flex gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Potencia
                    </span>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {motor.rendimiento_potencia_torque.rango_potencia_hp.split('(')[0].trim()}
                  </p>
                </div>
                
                <div className="w-px bg-gray-200"></div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Torque
                    </span>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {motor.rendimiento_potencia_torque.rango_torque_lb_ft}
                  </p>
                </div>
              </div>

              {/* Application */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {motor.aplicacion_principal}
                </p>
              </div>

              {/* Footer Specs */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Cilindrada</p>
                  <p className="text-sm font-bold text-gray-900">
                    {motor.especificaciones_generales.cilindrada_litros}L
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Peso</p>
                  <p className="text-sm font-bold text-gray-900">
                    {motor.especificaciones_generales.peso_seco_kg?.split('(')[0].trim()} kg
                  </p>
                </div>
                {/* <div className="text-right">
                  <p className="text-xs text-gray-500 mb-0.5">Emisiones</p>
                  <p className="text-xs font-semibold text-red-500">
                    {motor.especificaciones_generales.emisiones_certificacion?.split(',')[0]}
                  </p>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

      {/* Comparator Modal */}
      {showComparator && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-10 py-8 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-white mb-2">Comparador de Motores</h2>
                <p className="text-red-100 font-medium">Analizando {selectedMotorsData.length} motores seleccionados</p>
              </div>
              <button
                onClick={() => setShowComparator(false)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X className="w-7 h-7 text-white" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-10 overflow-auto max-h-[calc(90vh-140px)]">
              {selectedMotorsData.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-xl font-semibold">Selecciona motores para comparar</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-6 px-6 font-black text-gray-900 bg-gray-50 sticky left-0 z-10 rounded-tl-2xl">
                          ESPECIFICACIÓN
                        </th>
                        {selectedMotorsData.map(motor => (
                          <th key={motor.motor_id} className="text-left py-6 px-6 font-black text-gray-900 min-w-80">
                            <div className="flex flex-col space-y-2">
                              <span className="text-xl">{motor.nombre_modelo}</span>
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{motor.motor_id}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: 'Potencia (HP)', key: 'rango_potencia_hp', section: 'rendimiento_potencia_torque' },
                        { label: 'Potencia (kW)', key: 'rango_potencia_kw', section: 'rendimiento_potencia_torque' },
                        { label: 'Torque (N•m)', key: 'rango_torque_nm', section: 'rendimiento_potencia_torque' },
                        { label: 'Torque (lb-ft)', key: 'rango_torque_lb_ft', section: 'rendimiento_potencia_torque' },
                        { label: 'Configuración', key: 'configuracion', section: 'especificaciones_generales' },
                        { label: 'Cilindrada (L)', key: 'cilindrada_litros', section: 'especificaciones_generales' },
                        { label: 'Peso Seco (kg)', key: 'peso_seco_kg', section: 'especificaciones_generales' },
                        { label: 'Sistema de Combustible', key: 'sistema_combustible', section: 'especificaciones_generales' },
                        { label: 'Sistema de Aspiración', key: 'sistema_aspiracion', section: 'especificaciones_generales' },
                        { label: 'Emisiones', key: 'emisiones_certificacion', section: 'especificaciones_generales' },
                      ].map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-red-50/30 transition-colors">
                          <td className="py-5 px-6 font-bold text-gray-700 bg-gray-50 sticky left-0 z-10">
                            {spec.label}
                          </td>
                          {selectedMotorsData.map(motor => (
                            <td key={motor.motor_id} className="py-5 px-6 text-gray-900 font-medium">
                              {motor[spec.section][spec.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="hover:bg-red-50/30 transition-colors">
                        <td className="py-5 px-6 font-bold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          Aplicación Principal
                        </td>
                        {selectedMotorsData.map(motor => (
                          <td key={motor.motor_id} className="py-5 px-6 text-gray-900 text-sm font-medium leading-relaxed">
                            {motor.aplicacion_principal}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">C</span>
              </div>
              <span className="text-2xl font-black">Cummins</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">© 2024 Cummins Inc. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
    </>

  );
};

export default CumminsMotorsPage;