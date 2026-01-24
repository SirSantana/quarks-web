import Link from "next/link";


export default function Hola() {
  return (
    <div>
      <h1>Hola</h1>
      <div style={{height:'100vh', backgroundColor:'#f1f1f1'}}></div>
      <Link  href={'/corsa-motors'}>Link</Link>
    </div>
  )
}

// import { useState } from "react";
// import {
//   ArrowRight,
//   ArrowLeft,
//   Car,
//   Calendar,
//   MapPin,
//   MessageSquare,
//   Sparkles,
//   CheckCircle,
//   Loader2,
// } from "lucide-react";

// // Simulación de Header y Footer - reemplaza con tus componentes reales
// const Header = () => <div className="h-16 bg-white border-b border-gray-100" />;
// const FooterV2 = () => <div className="h-32 bg-gray-50 border-t border-gray-100" />;

// export default function DiagnosticoPage() {
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     carMake: "",
//     carModel: "",
//     carYear: "",
//     city: "",
//     problem: "",
//   });

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const canProceed = () => {
//     switch (step) {
//       case 1:
//         return formData.carMake.trim() !== "";
//       case 2:
//         return formData.carModel.trim() !== "";
//       case 3:
//         return formData.carYear !== "";
//       case 4:
//         return formData.city.trim() !== "";
//       case 5:
//         return formData.problem.trim().length >= 10;
//       default:
//         return false;
//     }
//   };

//   const handleNext = () => {
//     if (canProceed() && step < 5) {
//       setStep(step + 1);
//     }
//   };

//   const handleBack = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!canProceed()) return;

//     setIsSubmitting(true);

//     // Simular envío de formulario
//     setTimeout(() => {
//       console.log("Datos enviados:", formData);
//       alert("¡Diagnóstico generado! En producción aquí redirigirías a la página de resultados.");
//       setIsSubmitting(false);
//     }, 2000);
//   };

//   const steps = [
//     { number: 1, label: "Marca" },
//     { number: 2, label: "Modelo" },
//     { number: 3, label: "Año" },
//     { number: 4, label: "Ubicación" },
//     { number: 5, label: "Problema" },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <Header />

//       <main className="flex-1 flex flex-col">
//         {/* Progress Bar */}
//         <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm font-medium text-gray-900">
//                 Paso {step} de 5
//               </span>
//               <span className="text-sm text-gray-500">{steps[step - 1].label}</span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div
//                 className="absolute h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out rounded-full"
//                 style={{ width: `${(step / 5) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
//           <div className="w-full max-w-2xl">
//             <div className="text-center mb-8 sm:mb-12">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6">
//                 {step === 1 && <Car className="w-8 h-8 text-blue-600" />}
//                 {step === 2 && <Car className="w-8 h-8 text-blue-600" />}
//                 {step === 3 && <Calendar className="w-8 h-8 text-blue-600" />}
//                 {step === 4 && <MapPin className="w-8 h-8 text-blue-600" />}
//                 {step === 5 && <MessageSquare className="w-8 h-8 text-blue-600" />}
//               </div>

//               {step === 1 && (
//                 <>
//                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                     ¿Cuál es la marca de tu vehículo?
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     Por ejemplo: Toyota, Chevrolet, Renault
//                   </p>
//                 </>
//               )}

//               {step === 2 && (
//                 <>
//                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                     ¿Qué modelo es?
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     El modelo específico de tu {formData.carMake}
//                   </p>
//                 </>
//               )}

//               {step === 3 && (
//                 <>
//                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                     ¿De qué año es tu {formData.carMake}?
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     Selecciona el año de fabricación
//                   </p>
//                 </>
//               )}

//               {step === 4 && (
//                 <>
//                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                     ¿En qué ciudad te encuentras?
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     Esto nos ayuda a estimar costos locales
//                   </p>
//                 </>
//               )}

//               {step === 5 && (
//                 <>
//                   <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                     Describe el problema de tu vehículo
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     Cuéntanos qué está pasando con tu {formData.carMake}{" "}
//                     {formData.carModel}
//                   </p>
//                 </>
//               )}
//             </div>

//             {/* Form Inputs */}
//             <div className="space-y-6">
//               {step === 1 && (
//                 <div>
//                   <input
//                     type="text"
//                     value={formData.carMake}
//                     onChange={(e) => handleInputChange("carMake", e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleNext()}
//                     placeholder="Escribe la marca..."
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     autoFocus
//                   />
//                 </div>
//               )}

//               {step === 2 && (
//                 <div>
//                   <input
//                     type="text"
//                     value={formData.carModel}
//                     onChange={(e) => handleInputChange("carModel", e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleNext()}
//                     placeholder="Escribe el modelo..."
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     autoFocus
//                   />
//                 </div>
//               )}

//               {step === 3 && (
//                 <div>
//                   <select
//                     value={formData.carYear}
//                     onChange={(e) => handleInputChange("carYear", e.target.value)}
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
//                     autoFocus
//                   >
//                     <option value="">Selecciona un año</option>
//                     {years.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {step === 4 && (
//                 <div>
//                   <input
//                     type="text"
//                     value={formData.city}
//                     onChange={(e) => handleInputChange("city", e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleNext()}
//                     placeholder="Escribe tu ciudad..."
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//                     autoFocus
//                   />
//                 </div>
//               )}

//               {step === 5 && (
//                 <div>
//                   <textarea
//                     value={formData.problem}
//                     onChange={(e) => handleInputChange("problem", e.target.value)}
//                     placeholder="Ejemplo: Mi carro hace un ruido extraño al frenar, especialmente cuando voy en bajada..."
//                     rows={6}
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
//                     autoFocus
//                   />
//                   <p className="text-sm text-gray-500 mt-2">
//                     Mínimo 10 caracteres ({formData.problem.length}/10)
//                   </p>
//                 </div>
//               )}

//               {/* Resumen en paso 5 */}
//               {step === 5 && formData.problem.trim() && (
//                 <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">
//                     Resumen de tu diagnóstico
//                   </h3>
//                   <dl className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Vehículo:</dt>
//                       <dd className="font-semibold text-gray-900">
//                         {formData.carMake} {formData.carModel} {formData.carYear}
//                       </dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Ciudad:</dt>
//                       <dd className="font-semibold text-gray-900">
//                         {formData.city}
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>
//               )}
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex items-center gap-3 mt-8">
//               {step > 1 && (
//                 <button
//                   onClick={handleBack}
//                   className="px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors font-medium"
//                 >
//                   <ArrowLeft className="w-5 h-5" />
//                 </button>
//               )}

//               {step < 5 ? (
//                 <button
//                   onClick={handleNext}
//                   disabled={!canProceed()}
//                   className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
//                 >
//                   Continuar
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   disabled={!canProceed() || isSubmitting}
//                   className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Generando diagnóstico...
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-5 h-5" />
//                       Obtener diagnóstico
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Feature Pills */}
//         <div className="border-t border-gray-100 py-8 bg-gray-50">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6">
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span className="text-gray-700">Diagnóstico en 2 minutos</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span className="text-gray-700">Costos estimados</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span className="text-gray-700">100% gratis</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <FooterV2 />
//     </div>
//   );
// }
