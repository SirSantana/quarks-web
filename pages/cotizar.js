import React, { useState } from 'react';
import { 
  Star, Send, CheckCircle2, MapPin, ArrowRight, ArrowLeft, Car, Wrench, Phone, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/Context/AuthContext';

export default function RFQMPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoServicio: '',
    marca: '',
    modelo: '',
    año: '',
    problema: '',
    telefono: '',
    nombre: ''
  });

  const [selectedTalleres, setSelectedTalleres] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showDiagnostico, setShowDiagnostico] = useState(false);
  const [diagnostico, setDiagnostico] = useState(null);
  const { user, loading: load, signOut } = useAuth();
  const [mensaje, setMensaje] = useState('');



  const servicios = [
    "Cambio de aceite",
    "Cambio de pastillas de freno",
    "Alineación y balanceo",
    "Revisión general",
    "Diagnóstico electrónico",
    "Revisión de suspensión",
    "Sistema eléctrico",
    "Mantenimiento preventivo",
    "Otro"
  ];

  const marcasAutos = [
    "Chevrolet", "Renault", "Mazda", "Nissan", "Toyota", "Hyundai", 
    "Kia", "Ford", "Volkswagen", "Honda", "Suzuki", "Mitsubishi",
    "Jeep", "Peugeot", "Fiat", "BMW", "Mercedes-Benz", "Audi", "Otra"
  ];

  const talleres = [
    {
      id: 1,
      nombre: "Taller Mecánico El Pinón",
      calificacion: 4.8,
      reviews: 234,
      especialidades: "Especialista en Suspensión y Frenos",
      ubicacion: "Chapinero",
      fotoperfil: "/api/placeholder/80/80"
    },
    {
      id: 2,
      nombre: "AutoService Express",
      calificacion: 4.9,
      reviews: 189,
      especialidades: "Mantenimiento General y Diagnóstico",
      ubicacion: "Suba",
      fotoperfil: "/api/placeholder/80/80"
    },
    {
      id: 3,
      nombre: "Centro Automotriz Total",
      calificacion: 4.7,
      reviews: 312,
      especialidades: "Especialista en Motor y Transmisión",
      ubicacion: "Kennedy",
      fotoperfil: "/api/placeholder/80/80"
    },
    {
      id: 4,
      nombre: "Mecánica Profesional",
      calificacion: 4.8,
      reviews: 156,
      especialidades: "Frenos y Sistema Eléctrico",
      ubicacion: "Engativá",
      fotoperfil: "/api/placeholder/80/80"
    },
    {
      id: 5,
      nombre: "Taller Premium Cars",
      calificacion: 4.6,
      reviews: 98,
      especialidades: "Mantenimiento Preventivo",
      ubicacion: "Usaquén",
      fotoperfil: "/api/placeholder/80/80"
    }
  ];

  const steps = [
    { number: 1, title: "Servicio", icon: Wrench },
    { number: 2, title: "Vehículo", icon: Car },
    { number: 3, title: "Detalles", icon: MessageSquare },
    { number: 4, title: "Contacto", icon: Phone },
    { number: 5, title: "Talleres", icon: CheckCircle2 }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleTaller = (tallerId) => {
    setSelectedTalleres(prev => 
      prev.includes(tallerId) 
        ? prev.filter(id => id !== tallerId)
        : prev.length < 5 ? [...prev, tallerId] : prev
    );
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.tipoServicio !== '';
      case 2: return formData.marca !== '' && formData.modelo.trim() !== '' && formData.año !== '';
      case 3: return formData.problema.trim() !== '';
      case 4: return formData.nombre.trim() !== '' && formData.telefono.trim() !== '';
      case 5: return selectedTalleres.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 5) {
      // Si está en el paso 3 (descripción del problema), generar diagnóstico
      if (currentStep === 3) {
        generarDiagnostico();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const generarDiagnostico = () => {
    const problema = formData.problema.toLowerCase();
    const servicio = formData.tipoServicio.toLowerCase();
    
    let posiblesCausas = [];
    let precioMin = 0;
    let precioMax = 0;
    let especialidad = "";
    let talleresRecomendados = [];
    
    // Análisis basado en palabras clave
    if (problema.includes('ruido') || problema.includes('sonido') || problema.includes('chirria')) {
      if (problema.includes('freno') || servicio.includes('freno')) {
        posiblesCausas = ['Pastillas de freno desgastadas', 'Discos de freno rayados', 'Calibres de freno'];
        precioMin = 150000;
        precioMax = 450000;
        especialidad = 'Frenos';
        talleresRecomendados = [1, 4];
      } else if (problema.includes('motor') || problema.includes('arranque')) {
        posiblesCausas = ['Correa de distribución', 'Tensor de correa', 'Problemas en el motor'];
        precioMin = 200000;
        precioMax = 800000;
        especialidad = 'Motor';
        talleresRecomendados = [3];
      } else {
        posiblesCausas = ['Suspensión desgastada', 'Amortiguadores', 'Bujes de suspensión'];
        precioMin = 180000;
        precioMax = 600000;
        especialidad = 'Suspensión';
        talleresRecomendados = [1];
      }
    } else if (problema.includes('vibra') || problema.includes('tiembla')) {
      if (problema.includes('volante') || problema.includes('dirección')) {
        posiblesCausas = ['Alineación y balanceo', 'Llantas desbalanceadas', 'Problemas en dirección'];
        precioMin = 80000;
        precioMax = 250000;
        especialidad = 'Alineación y Dirección';
        talleresRecomendados = [1, 2];
      } else {
        posiblesCausas = ['Motor fuera de punto', 'Bujías defectuosas', 'Sistema de inyección'];
        precioMin = 120000;
        precioMax = 500000;
        especialidad = 'Motor';
        talleresRecomendados = [3];
      }
    } else if (problema.includes('aceite') || servicio.includes('aceite')) {
      posiblesCausas = ['Cambio de aceite y filtro', 'Revisión de nivel de aceite'];
      precioMin = 80000;
      precioMax = 200000;
      especialidad = 'Mantenimiento';
      talleresRecomendados = [2, 5];
    } else if (problema.includes('eléctrico') || problema.includes('luz') || problema.includes('batería')) {
      posiblesCausas = ['Batería descargada', 'Alternador', 'Sistema eléctrico'];
      precioMin = 100000;
      precioMax = 600000;
      especialidad = 'Sistema Eléctrico';
      talleresRecomendados = [4];
    } else if (problema.includes('freno') || servicio.includes('freno')) {
      posiblesCausas = ['Pastillas de freno', 'Líquido de frenos', 'Discos de freno'];
      precioMin = 150000;
      precioMax = 450000;
      especialidad = 'Frenos';
      talleresRecomendados = [1, 4];
    } else if (servicio.includes('alineación') || servicio.includes('balanceo')) {
      posiblesCausas = ['Alineación y balanceo necesario', 'Posible desgaste de llantas'];
      precioMin = 60000;
      precioMax = 150000;
      especialidad = 'Alineación';
      talleresRecomendados = [1, 2];
    } else if (servicio.includes('suspensión')) {
      posiblesCausas = ['Amortiguadores desgastados', 'Terminales de dirección', 'Bujes'];
      precioMin = 200000;
      precioMax = 700000;
      especialidad = 'Suspensión';
      talleresRecomendados = [1];
    } else {
      posiblesCausas = ['Se requiere diagnóstico en taller', 'Revisión general recomendada'];
      precioMin = 100000;
      precioMax = 500000;
      especialidad = 'General';
      talleresRecomendados = [2, 5];
    }
    
    setDiagnostico({
      posiblesCausas,
      precioMin,
      precioMax,
      especialidad,
      talleresRecomendados
    });
    
    // Preseleccionar talleres recomendados
    setSelectedTalleres(talleresRecomendados);
    setShowDiagnostico(true);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (selectedTalleres.length === 0) {
      alert('Selecciona al menos un taller');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              ¡Solicitud Enviada!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Tu solicitud fue enviada a <strong className="text-blue-600">{selectedTalleres.length} {selectedTalleres.length === 1 ? 'taller' : 'talleres'}</strong> en Bogotá.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-5 mb-8 text-left">
              <p className="text-sm text-gray-700 mb-2 font-medium">
                Los talleres te contactarán por WhatsApp o llamada
              </p>
              <p className="text-xs text-gray-600">
                Recibirás las cotizaciones en las próximas horas. Compara precios y elige la mejor opción.
              </p>
            </div>

            <button 
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  tipoServicio: '', marca: '', modelo: '', año: '', problema: '', telefono: '', nombre: ''
                });
                setSelectedTalleres([]);
              }}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg"
            >
              Nueva Solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }
  const handleSubmitApi=async(e)=>{
     try {
    const apiPromise = fetch('/api/asistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: formData.problema + ' ' + formData.marca + ' ' + formData.modelo + ' ' + formData.año, userId: user ? user.id : null }),
    });

    const minDelay = new Promise(resolve => setTimeout(resolve, 4000));
    const [res] = await Promise.all([apiPromise, minDelay]);

    if (!res.ok) {
      const errorData = await res.json();

      // Fallback específico para sobrecarga del modelo
      if (
        res.status === 503 &&
        errorData?.error?.includes('The model is overloaded')
      ) {
        alert('El asistente está recibiendo muchas solicitudes en este momento. Por favor, intenta nuevamente en unos segundos.');
        return;
      }

      throw new Error(errorData.error || 'Error al procesar la solicitud en la API.');
    }

    const data = await res.json();
    console.log('hiii',data);

    setDiagnostico(data.response);
    
    const slug = data.slug;

    // if (slug) {
    //   router.push(`/diagnostico/${slug.replaceAll(' ', '-').replaceAll('ñ','n').toLowerCase()}`);
    // } else {
    //   throw new Error('La API no devolvió un identificador válido.');
    // }

  } catch (error) {
    // console.log(error, 'ERROROROR');
    
    alert(`Ocurrió un error: ${error.message}`);
  } finally {
    
  }
  }
  
  return (
    <div className="min-h-screen">
      {/* Blue Background Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pb-32 pt-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Solicita Múltiples Cotizaciones
            </h1>
            <p className="text-blue-100 text-lg">
              Recibe hasta 5 cotizaciones y ahorra tiempo y dinero
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all mb-2 ${
                        isActive ? 'bg-white text-blue-600 shadow-lg scale-110' :
                        isCompleted ? 'bg-blue-400 text-white' :
                        'bg-blue-800 text-blue-300'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${
                        isActive || isCompleted ? 'text-white' : 'text-blue-300'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                        isCompleted ? 'bg-blue-400' : 'bg-blue-800'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 -mt-24 pb-8">
        {currentStep < 5 ? (
          /* Form Card for steps 1-4 */
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
            {/* Step 1: Service Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¿Qué servicio necesitas?
                  </h2>
                  <p className="text-gray-600">Selecciona el tipo de servicio que requiere tu vehículo</p>
                </div>

                <div className="space-y-3">
                  {servicios.map((servicio, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-400 ${
                        formData.tipoServicio === servicio
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                        formData.tipoServicio === servicio 
                          ? 'border-blue-600 bg-blue-600' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {formData.tipoServicio === servicio && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>
                      <input
                        type="radio"
                        name="tipoServicio"
                        value={servicio}
                        checked={formData.tipoServicio === servicio}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-medium text-gray-900">{servicio}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Vehicle */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Cuéntanos sobre tu vehículo
                  </h2>
                  <p className="text-gray-600">Ingresa los datos de tu vehículo para cotizaciones precisas</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Marca del vehículo
                    </label>
                    <select
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg bg-white"
                    >
                      <option value="">Selecciona la marca</option>
                      {marcasAutos.map((marca, index) => (
                        <option key={index} value={marca}>{marca}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      placeholder="Ej: Spark, Logan, Mazda 3"
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Año
                    </label>
                    <input
                      type="number"
                      name="año"
                      value={formData.año}
                      onChange={handleChange}
                      placeholder="Ej: 2020"
                      min="1990"
                      max="2025"
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Problem Description */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Describe el problema
                  </h2>
                  <p className="text-gray-600">Mientras más detalles proporciones, más precisa será la cotización</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ¿Qué le pasa a tu vehículo?
                  </label>
                  <textarea
                    name="problema"
                    value={formData.problema}
                    onChange={handleChange}
                    placeholder="Describe el problema, síntomas, ruidos o cualquier detalle relevante que pueda ayudar a los talleres a entender mejor tu situación..."
                    rows="6"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-base resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <button onClick={handleSubmitApi} className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg">
                  Generar diagnóstico 
                </button>
                {diagnostico && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Diagnóstico Inteligente
                        </h3>
                        <p className="text-sm text-gray-600">
                          Basado en la información proporcionada
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Posibles causas:</h4>
                        <ul className="space-y-2">
                          {diagnostico?.preciosEstimados?.map(({item, precio}) => (
                            <li key={item} className="flex items-start gap-2">
                              <p className="text-xs text-gray-500 mt-1">
                          {item}
                        </p>
                               <span className="text-2xl font-bold text-blue-600">
                            {precio}
                          </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* <div className="bg-white rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Rango de precio estimado:</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-blue-600">
                            ${(diagnostico.precioMin / 1000).toFixed(0)}k
                          </span>
                          <span className="text-gray-500">-</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${(diagnostico.precioMax / 1000).toFixed(0)}k
                          </span>
                          <span className="text-sm text-gray-600">COP</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          *Precio estimado, puede variar según el taller
                        </p>
                      </div> */}

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <p className="text-sm text-amber-800">
                          <strong>Especialidad recomendada:</strong> {diagnostico?.serviciosRequeridos?.map(item => item)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¿Cómo te contactamos?
                  </h2>
                  <p className="text-gray-600">Los talleres te enviarán sus cotizaciones directamente</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tu nombre completo
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre y apellido"
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Número de WhatsApp o celular
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="300 123 4567"
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Tu privacidad es importante.</strong> Solo los talleres seleccionados verán tu información de contacto.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Step 5: Talleres Grid View */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Talleres Recomendados
              </h2>
              <p className="text-gray-600 mb-4">
                {diagnostico 
                  ? `Basado en tu diagnóstico, estos talleres son especialistas en ${diagnostico.especialidad}`
                  : 'Elige hasta 5 talleres para recibir cotizaciones'
                }
              </p>
              
              {diagnostico && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      Hemos preseleccionado los talleres más adecuados según tu problema. Puedes modificar la selección si lo deseas.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
                <span className="text-sm font-medium text-gray-700">Talleres seleccionados</span>
                <span className="text-xl font-bold text-blue-600">{selectedTalleres.length}/5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {talleres.map((taller) => {
                const isSelected = selectedTalleres.includes(taller.id);
                const isRecommended = diagnostico?.talleresRecomendados.includes(taller.id);
                return (
                  <div
                    key={taller.id}
                    onClick={() => toggleTaller(taller.id)}
                    className={`bg-white rounded-xl p-5 cursor-pointer transition-all border-2 relative ${
                      isSelected 
                        ? 'border-blue-600 shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Recomendado
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>

                      <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        <img
                          src={taller.fotoperfil}
                          alt={taller.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base text-gray-900 mb-2">
                          {taller.nombre}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm font-semibold text-gray-900">{taller.calificacion}</span>
                          </div>
                          <span className="text-sm text-gray-400">({taller.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{taller.especialidades}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{taller.ubicacion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-white text-blue-600 font-semibold py-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg border-2 border-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
              Atrás
            </button>
          )}
          
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedTalleres.length === 0}
              className={`flex-1 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                selectedTalleres.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Enviar Solicitud
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            ¿Necesitas ayuda? <button className="text-blue-600 font-semibold underline hover:text-blue-700">Contáctanos</button>
          </p>
        </div>
      </div>
    </div>
  );
}