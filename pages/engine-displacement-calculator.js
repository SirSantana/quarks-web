import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import AnimationCalculator from "@/src/Components/Articulos/AnimationCalculator";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CompressionCalculator from "@/src/Components/Calculator/CompressionCalculator";
import EngineComparator from "@/src/Components/Calculator/EngineComparator";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4,
  rpm: 500
};

let description = 'Calculate engine displacement, volume, and capacity instantly with our free online Engine Calculator. Enter bore, stroke, and cylinder count to get precise results in seconds. Perfect for mechanics, engineers, students, and automotive enthusiasts.';

export default function EngineDisplacementCalculator() {
  const [calcular, setCalcular] = useState(initialData);
  const router = useRouter();
  const ref = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const [cilindrajeTotal, setCilindrajeTotal] = useState(0);
  const pistonHeight = 0.2;

  const cylinderWidth = calcular.diametro;
  const cylinderHeight = calcular.carrera;

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  const [sugerencia, setSugerencia] = useState('');

  const handleSugerenciaChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    setSugerencia(cleanedValue);
  };

  const handleSendSugerencia = (e) => {
    e.preventDefault();
    if (sugerencia.length <= 10) {
      return alert('Cuentanos la sugerencia que tienes!');
    }
    createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: 'calculadora-cilindrada' } });
  };

  const onChangeCrankShaft = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 300)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, carrera: e.target.value });
    }
  };

  const onChangeBoreSize = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 300)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, diametro: e.target.value });
    }
  };

  const onChangeQuantity = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue <= 1 || newValue > 12)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, cilindros: e.target.value });
    }
  };

  const onChangeRpm = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 14000)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, rpm: e.target.value });
    }
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.reload();
      }, 3000);
    }
  }, [data]);

  return (
    <Layout 
      title={'Engine Displacement Calculator - CC Calculator Online'} 
      description={description} 
      image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} 
      keywords={'Cylinder displacement calculator,calculate engine displacement,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder volume calculator,cylinder volume calculator,cylinder area calculator,cylinder volume formula,formula to calculate the volume of a cylinder,cylinder volume with diameter,calculate cylinder displacement of a motorcycle, cc calculator, cc engine calculator'} 
      url={router?.asPath} 
      visibleNavbar={false}
    >
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 tracking-tight mb-6">
              Engine Displacement Calculator 
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              Calculate engine displacement. Enter your data in millimeters with a comma (80.5).
            </p>
          </div>

          {/* Hero Image for SEO */}
        
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {/* Result Display */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Engine Displacement
              </p>
              <div className="text-7xl md:text-9xl font-light text-gray-900 tracking-tight mb-4">
                {cilindrajeTotal}
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Cubic Centimeters
              </p>
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Bore Size (mm)
              </label>
              <input
                type="number"
                step="0.01"
                value={calcular.diametro}
                onChange={onChangeBoreSize}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }}
                min={10}
                max={300}
                className="w-full px-4 py-4 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Crankshaft Stroke (mm)
              </label>
              <input
                type="number"
                step="0.01"
                value={calcular.carrera}
                onChange={onChangeCrankShaft}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }}
                min={10}
                max={300}
                className="w-full px-4 py-4 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Number of Cylinders
              </label>
              <input
                type="number"
                value={calcular.cilindros}
                onChange={onChangeQuantity}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }}
                max={12}
                className="w-full px-4 py-4 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>
          </div>
<CompressionCalculator 
    bore={calcular.diametro} 
    stroke={calcular.carrera} 
  />
  <EngineComparator />
          {/* Animation Section */}
          <div className="mb-32" ref={ref}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h5 className="text-2xl font-semibold text-gray-900">Animation</h5>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-600">RPM</label>
                  <input
                    type="number"
                    value={calcular.rpm}
                    onChange={onChangeRpm}
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }}
                    max={14000}
                    className="w-24 px-3 py-2 text-right bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>
                <button
                  onClick={handlePlayPause}
                  className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-all"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
              

            <div className="border border-gray-200 rounded-2xl p-8 bg-gray-50/50">
              <AnimationCalculator 
                calcular={calcular} 
                cylinderHeight={cylinderHeight} 
                cylinderWidth={cylinderWidth} 
                pistonHeight={pistonHeight} 
                setCilindrajeTotal={setCilindrajeTotal} 
                cilindrajeTotal={cilindrajeTotal} 
                isPlaying={isPlaying} 
              />
              
              <div className="mt-12 flex flex-wrap gap-4 justify-center">
                {Array.from({ length: calcular.cilindros }, (_, index) => (
                  <AnimationCalculator
                    key={index}
                    calcular={calcular}
                    cylinderHeight={cylinderHeight}
                    cylinderWidth={cylinderWidth}
                    pistonHeight={pistonHeight}
                    setCilindrajeTotal={setCilindrajeTotal}
                    middle={true}
                    isPlaying={isPlaying}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Suggestion Section */}
          <div className="max-w-2xl mx-auto mb-32">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Do you have any suggestions? Help us improve ✌🏼
            </label>
            <textarea
              value={sugerencia}
              onChange={handleSugerenciaChange}
              placeholder="Write your suggestion, change, improvement or problem here..."
              rows="4"
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all resize-none mb-4"
            />
            <button
              onClick={handleSendSugerencia}
              className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-all"
            >
              Send Suggestion
            </button>
          </div>
  <div className="relative w-full max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden">
            <Image 
              src="https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png"
              alt="Engine Displacement Calculator - Calculate CC of motorcycle and car engines"
              width={200}
              height={130}
              priority
            />
          </div>
          {/* Information Sections - Improved Design */}
          <div className="max-w-4xl mx-auto space-y-24 pt-20 border-t border-gray-100">
            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  What is Vehicle Displacement?
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  The <strong className="text-gray-900 font-semibold">displacement calculation</strong> is an important measurement that tells us how much space there is inside the engine cylinders. Imagine the cylinders as the cores of the engine.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mt-6">
                  These cylinders are like rooms where the magic of combustion happens, which makes the engine run and the vehicle move. In essence, the displacement tells us how much "power" the engine can generate. With the cc calculator, you can easily calculate the displacement of your engine, car or motor.
                </p>
              </div>
            </section>

            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Engine Displacement Formula
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  The formula for the volume of a cylinder is not as difficult as it might seem. It is basic mathematics.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mt-6">
                  <strong className="text-gray-900 font-semibold">The formula for piston displacement (V) of a cylinder is V=πr²h</strong>, where π represents the constant pi, approximately 3.14159. Here, r denotes the radius of the base of the cylinder, and h denotes the height of the cylinder. This calculation provides us with a volume value expressed in cubic units, such as cubic centimeters (cm³) or cubic meters (m³).
                </p>
              </div>
            </section>

            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  The Official Engine Displacement Formula
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Understanding the core mathematics is vital for any serious engine builder or performance enthusiast. The <strong className="text-gray-900 font-semibold">total engine displacement</strong> is derived from the swept volume of a single cylinder, multiplied by the number of cylinders. The formula used by our calculator is:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-8">
                  <p className="text-2xl font-mono text-gray-900 text-center">
                    Displacement = π × (Bore / 2)² × Stroke × Cylinders
                  </p>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Where: <strong className="text-gray-900 font-semibold">Bore</strong> is the diameter of the cylinder, and <strong className="text-gray-900 font-semibold">Stroke</strong> is the distance the piston travels. Whether you are calculating the volume of a single cylinder or the total volume of a V8 engine, this universal engine volume formula ensures accuracy in your specifications.
                </p>
              </div>
            </section>

            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Converting Engine Sizes
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Engine measurements are typically expressed in three primary units, and our tool provides instant conversions between them. Understanding the conversions is crucial when dealing with vehicles from different regions.
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">CC to Liters</h3>
                    <p className="text-gray-600">1 Liter = 1,000 CC</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cubic Inches</h3>
                    <p className="text-gray-600">1 L = 61.024 CID</p>
                  </div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  For example, a "2.0L" engine is approximately <strong className="text-gray-900 font-semibold">2000 cc</strong> or <strong className="text-gray-900 font-semibold">122 cubic inches</strong>. Our engine size conversion tool takes the guesswork out of these complex unit changes.
                </p>
              </div>
            </section>

            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Bore-Stroke Ratio
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  The relationship between the cylinder <strong className="text-gray-900 font-semibold">Bore</strong> (diameter) and the <strong className="text-gray-900 font-semibold">Stroke</strong> (piston travel) defines the engine's fundamental characteristics and performance profile.
                </p>
                <div className="space-y-6">
                  <div className="border-l-4 border-gray-900 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Oversquare Engine (Bore &gt; Stroke)
                    </h3>
                    <p className="text-lg text-gray-600">
                      Engines with a larger bore than stroke. These engines can achieve higher RPMs and are typically found in high-performance and racing applications, favoring horsepower.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Undersquare Engine (Stroke &gt; Bore)
                    </h3>
                    <p className="text-lg text-gray-600">
                      Engines with a longer stroke than bore. They often produce high torque at lower RPMs, making them ideal for heavy-duty trucks and vehicles where towing capacity and fuel efficiency are prioritized.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Square Engine (Bore ≈ Stroke)
                    </h3>
                    <p className="text-lg text-gray-600">
                      Offers a balance between horsepower and torque.
                    </p>
                  </div>
                </div>
              </div>
            </section>
<section>
    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        The Static Compression Ratio Formula
    </h2>
    <p className="text-lg text-gray-600 leading-relaxed">
        Our calculator uses the fundamental **Static Compression Ratio (SCR) formula**, which compares the total cylinder volume to the clearance volume. To get an accurate reading, you need to know the total **Swept Volume (V<sub className="mr-0.5">d</sub>)** and the total **Clearance Volume (V<sub className="mr-0.5">c</sub>)**. The clearance volume is the sum of the combustion chamber, gasket, deck, and piston dome/dish volumes.
    </p>
    <div className="bg-gray-100 p-4 rounded-lg my-4 text-center">
        {/* FÓRMULA CORREGIDA: Vd y Vc son subíndices de HTML */}
        <p className="text-xl font-mono text-gray-800">
            CR = (V<sub className="mr-0.5">d</sub> + V<sub className="mr-0.5">c</sub>) / V<sub className="mr-0.5">c</sub>
        </p>
        <p className="text-sm text-gray-600 mt-2">
            Where V<sub className="mr-0.5">d</sub> = Swept Volume (Displacement) and V<sub className="mr-0.5">c</sub> = Clearance Volume.
        </p>
    </div>
    <p className="text-lg text-gray-600 leading-relaxed">
        Engine builders and mechanics rely on this **compression ratio equation** to plan modifications. For instance, increasing the bore or reducing the combustion chamber volume (milling the head) will directly affect the calculated CR.
    </p>
</section>
            <section className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Importance of Engine Displacement
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed">
                  The <strong className="text-gray-900 font-semibold">engine displacement</strong> is a fundamental metric in the automotive world. It not only affects the power and performance of your vehicle but also influences fuel economy and emissions.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed mt-6">
                  By using our <strong className="text-gray-900 font-semibold">displacement calculator</strong>, you can gain a deeper understanding of how your engine works and how to optimize its performance. This information is vital for making adjustments and improvements to your vehicle.
                </p>
              </div>
            </section>
            <section>
    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Converting Engine Sizes: CC, Liters, and Cubic Inches (CID)
    </h2>
    <p className="text-lg text-gray-600 leading-relaxed">
        Engine measurements are typically expressed in three primary units, and our tool provides instant conversions between them. Understanding the conversions is crucial when dealing with vehicles from different regions (e.g., US vs. Europe/Asia).
        <span className="text-gray-900 font-medium">
            1 Liter (L) is equivalent to 1,000 Cubic Centimeters (CC).
        </span>
        Meanwhile, the older, but still common, imperial measurement is **Cubic Inches Displacement (CID)**.
    </p>
    <ul className="list-disc list-inside ml-4 text-lg text-gray-600 space-y-2">
        {/* NÚMEROS AHORA ENVUELTOS EN ETIQUETAS STRONG, NO \mathbf{} */}
        <li>To convert **Cubic Inches to Liters:** Divide the CID value by **61.024**.</li>
        <li>To convert **Liters to Cubic Inches:** Multiply the Liters value by **61.024**.</li>
        <li>**1 CC** is a much smaller volume, making it common in motorcycles and smaller vehicles. For example, a "2.0L" engine is approximately **2000 cc** or **122 CID**.</li>
    </ul>
    <p className="text-lg text-gray-600 leading-relaxed mt-4">
        Our **engine size conversion tool** takes the guesswork out of these complex unit changes, allowing you to focus on the performance metrics that matter most.
    </p>
</section>
          </div>

          {/* Footer Keywords */}
          <div className="text-center pt-32 pb-12 space-y-3 border-t border-gray-100 mt-32">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Engine Displacement Calculator
            </h3>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              engine size calculator
            </h3>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              volume cylinder calculator
            </h3>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              engine capacity calculator
            </h3>
          </div>
        </div>
      </div>

      {loading && <ModalLoading title={'Sending Suggestion ... '} />}
      {data && <ModalSuccessfull title={'Thanks!'} subtitle={'For sharing your opinion, we will take it into account to improve!'} />}
    </Layout>
  );
}