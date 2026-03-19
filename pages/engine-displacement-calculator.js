import EngineDisplacementCalculatorComponent from "@/src/Components/Calculator/EngineCalculator";
import FooterV2 from "@/src/Components/Footer/FooterV2";
import Head from "next/head";

export const OTHER_CALCULATORS = [
  {
    label: "Engine Displacement",
    desc: "Calculate total engine volume (CID & CC)",
    href: "/engine-displacement-calculator",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  {
    label: "Tire Size Comparer",
    desc: "Compare dimensions and speedometer error",
    href: "/tire-size-comparison",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    label: "Gear Ratio Calculator",
    desc: "Calculate RPM, speed, and gear ratios",
    href: "/gear-ratio-calculator",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="7" r="3" />
        <path d="M7 14V7a5 5 0 0 1 10 0v10" />
      </svg>
    ),
  },
  {
    label: "Gas Mileage & Trip Cost",
    desc: "Calculate MPG and travel expenses",
    href: "/fuel-cost-calculator",
    active: true,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 22V8l9-6 9 6v14H3z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
];
{
  /* Array de Keywords Estratégicas */
}
const engineKeywords = [
  "Engine Displacement Calculator",
  "CID to Liters Converter",
  "How to Calculate Cubic Inches",
  "Bore and Stroke Formula",
  "Engine Volume CC",
  "Total Swept Volume",
  "Cylinder Displacement Calculation",
  "Small Block V8 Specs",
  "Big Block CID",
  "LS Engine Displacement",
  "Ford 302 CID to Liters",
  "Hemispherical Combustion Chamber Volume",
  "Piston Displacement Table",
  "Engine Rebuilding Math",
  "Automotive Engineering Tools",
  "Motorcycle Engine CC",
  "Calculate Horsepower from Displacement",
  "Boring and Stroking Guide",
  "Internal Combustion Engine Size",
  "Metric to Imperial Engine Conversion",
];

const engineReferenceData = [
  { name: "Chevy Small Block 350", bore: '4.000"', stroke: '3.480"', cylinders: 8, displacement: "5.7L / 350 CID" },
  { name: "Ford 302 (5.0L Windsor)", bore: '4.000"', stroke: '3.000"', cylinders: 8, displacement: "5.0L / 302 CID" },
  { name: "GM LS1 / LS6", bore: '3.898"', stroke: '3.622"', cylinders: 8, displacement: "5.7L / 346 CID" },
  { name: "Honda K20A", bore: "86.0 mm", stroke: "86.0 mm", cylinders: 4, displacement: "2.0L / 122 CID" },
  { name: "Toyota 2JZ-GTE", bore: "86.0 mm", stroke: "86.0 mm", cylinders: 6, displacement: "3.0L / 183 CID" },
  { name: "Cummins 5.9L 24V", bore: "4.020\"", stroke: "4.720\"", cylinders: 6, displacement: "5.9L / 359 CID" },
];

export default function EngineDisplacementCalculator() {
  return (
    <>
      <Head>
        <title>Engine Displacement Calculator</title>

        <meta
          name="description"
          content="Free Engine Displacement Calculator. Instantly calculate CID (Cubic Inch Displacement), CC, and Liters using bore, stroke, and cylinder count. Accurate formula for engine builders, mechanics, and performance tuners."
        />

        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        <link
          rel="canonical"
          href="https://www.quarks.com.co/engine-displacement-calculator"
        />

        <meta name="author" content="Quarks Automotive Tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Free Engine Displacement Calculator – CID, CC & Liters"
        />
        <meta
          property="og:description"
          content="Calculate engine size using bore and stroke. Get accurate Cubic Inches (CID), CC and Liters instantly."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.quarks.com.co/engine-displacement-calculator"
        />
        <meta
          property="og:image"
          content="https://www.quarks.com.co/glosarioautomotriz.png"
        />
        <meta property="og:site_name" content="Quarks Automotive Tools" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Engine Displacement Calculator – CID & CC Tool"
        />
        <meta
          name="twitter:description"
          content="Professional bore and stroke calculator for engine builders and mechanics."
        />
        <meta
          name="twitter:image"
          content="https://www.quarks.com.co/glosarioautomotriz.png"
        />

        <link rel="icon" href="/favicon.png" />

        {/* Structured Data – SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Engine Displacement Calculator",
              url: "https://www.quarks.com.co/engine-displacement-calculator",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              description:
                "Professional tool to compute engine displacement in Cubic Inches (CID), CC, and Liters.",
              featureList: [
                "Bore and Stroke Calculation",
                "CID to Liters Conversion",
                "Cylinder Volume Analysis",
                "V8, V6 and 4-Cylinder support",
              ],
              creator: {
                "@type": "Organization",
                name: "Quarks Automotive Tools",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />

        {/* FAQ Structured Data – increases rich results probability */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do you calculate engine displacement?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Engine displacement is calculated using the formula: (π/4) × bore² × stroke × number of cylinders.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is CID in engines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CID stands for Cubic Inch Displacement, a measurement of total engine cylinder volume used mainly in the United States.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is engine displacement the same as engine size?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Engine size refers to total cylinder displacement, usually expressed in liters, CC, or cubic inches.",
                  },
                },
              ],
            }),
          }}
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossOrigin="anonymous"
        ></script>
        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            dangerouslySetInnerHTML={{
              __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jh3neqgrnc");
        `,
            }}
          />
        )}
      </Head>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <EngineDisplacementCalculatorComponent />
          <div className="max-w-[900px] mx-auto mt-16 pb-20 px-4 text-left">
            <article>
              <header className="mb-10">
                <p className="text-[15px] leading-relaxed text-gray-500 mb-4">
                  <strong>Engine displacement</strong> is the total swept volume
                  of all pistons within the cylinders of an internal combustion
                  engine. Our <strong>CID calculator</strong> (Cubic Inch
                  Displacement) provides the precise measurements required for{" "}
                  <strong>engine rebuilding</strong>, performance tuning, and
                  classic car restoration.
                </p>

                <p className="text-[15px] leading-relaxed text-gray-500">
                  Whether you are working on a <strong>LS swap</strong>, a
                  classic <strong>Chevy Big Block</strong>, or a high-revving
                  Japanese 4-cylinder, calculating{" "}
                  <strong>cylinder volume</strong> is the foundation for
                  determining compression ratios and potential horsepower
                  output.
                </p>
              </header>

              <div className="h-[1px] bg-gray-100 w-full my-10" />

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  The Formula: How to Calculate Cubic Inches (CID)
                </h2>
                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                  To find your <strong>engine size</strong>, you need to
                  calculate the geometric volume of a cylinder and multiply it
                  by the number of cylinders. Our tool uses the standard{" "}
                  <strong>automotive engineering equation</strong>:
                </p>

                <div className="py-6 px-4 mb-6 border-y border-gray-100 flex flex-col items-center justify-center text-center bg-gray-50/50">
                  <span className="text-[18px] font-mono text-[#407BFF] font-bold">
                    CID = [π × (Bore / 2)² × Stroke] × Cylinders
                  </span>
                  <span className="text-[12px] text-gray-400 mt-2 uppercase tracking-widest">
                    Professional Displacement Formula (Imperial Units)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                      Bore and Stroke Impact
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      The <strong>bore</strong> is the diameter of the cylinder
                      walls, while the <strong>stroke</strong> is the distance
                      the piston travels from Top Dead Center (TDC) to Bottom
                      Dead Center (BDC). <strong>Boring and stroking</strong>{" "}
                      are the most effective ways to increase displacement for
                      massive torque gains.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                      CID to Liters Conversion
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Standard <strong>metric conversion</strong>: Divide CID by
                      61.0237 to get Liters. For example, a{" "}
                      <strong>350 CID Chevy</strong> is equivalent to a 5.7L,
                      and the iconic <strong>Ford 302</strong> is the
                      world-famous 5.0L.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Engine Size & Performance FAQ
                </h2>

                <div className="space-y-8">
                  <div className="border-l-2 border-[#407BFF] pl-6">
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2">
                      Does a larger displacement mean more horsepower?
                    </h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Generally, <strong>larger displacement engines</strong>{" "}
                      can pump more air and fuel, leading to higher torque.
                      However, factors like{" "}
                      <strong>volumetric efficiency</strong> and RPM limits also
                      dictate final horsepower.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#407BFF] pl-6">
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2">
                      How do I find my engine's Bore and Stroke?
                    </h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      You can find these specs in your{" "}
                      <strong>OEM service manual</strong> or by using a
                      micrometer during a teardown. Common specs for{" "}
                      <strong>Small Block Ford</strong> or{" "}
                      <strong>Mopar</strong> engines are widely available in our
                      technical database.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Standard Displacement Reference Table
                </h2>
                <div className="overflow-hidden border border-gray-100 rounded-lg">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                        <th className="px-6 py-4 font-semibold text-left">
                          Common Engine Build
                        </th>
                        <th className="px-6 py-4 font-semibold text-left">
                          CID (Cubic Inches)
                        </th>
                        <th className="px-6 py-4 font-semibold text-left">
                          Metric (Liters)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-500">
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          JDM Inline-4 / Turbo
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          122 - 150 CID
                        </td>
                        <td className="px-6 py-4 italic">2.0L - 2.5L</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          Classic Small Block V8
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          289 - 350 CID
                        </td>
                        <td className="px-6 py-4 italic">4.7L - 5.7L</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          American Big Block V8
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          427 - 502 CID
                        </td>
                        <td className="px-6 py-4 italic">7.0L - 8.2L</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section className="mt-16 mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Common Engine Specifications Reference
                    </h2>
                    <p className="text-[14px] text-gray-500 mt-2">
                      Quickly compare bore and stroke dimensions for popular
                      performance platforms.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#407BFF] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Industry Standards 2026
                  </span>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-[13px] font-bold text-gray-900 uppercase tracking-wider">
                          Engine Model
                        </th>
                        <th className="px-6 py-4 text-[13px] font-bold text-gray-900 uppercase tracking-wider text-center">
                          Bore
                        </th>
                        <th className="px-6 py-4 text-[13px] font-bold text-gray-900 uppercase tracking-wider text-center">
                          Stroke
                        </th>
                        <th className="px-6 py-4 text-[13px] font-bold text-gray-900 uppercase tracking-wider text-right text-[#407BFF]">
                          Total Size
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {engineReferenceData.map((engine, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <span className="text-[15px] font-semibold text-gray-800 group-hover:text-[#407BFF] transition-colors">
                              {engine.name}
                            </span>
                            <p className="text-[12px] text-gray-400">
                              {engine.cylinders} Cylinders
                            </p>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-[14px] text-gray-600">
                            {engine.bore}
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-[14px] text-gray-600">
                            {engine.stroke}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-[14px] text-gray-700">
                            {engine.displacement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50/30 rounded-lg border border-blue-50/50">
                  <p className="text-[13px] text-gray-500 leading-relaxed italic">
                    <strong>SEO Note:</strong> Calculating displacement for
                    overbored cylinders or stroker kits? Use our calculator
                    above to input custom dimensions for{" "}
                    <strong>oversize pistons</strong> or{" "}
                    <strong>aftermarket crankshafts</strong>.
                  </p>
                </div>
              </section>
              <section className="mt-20 pt-10 border-t border-gray-100">
                <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 text-center">
                  Technical Reference & Keywords displacement calculator
                </h2>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 max-w-[800px] mx-auto">
                  {engineKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="text-[13px] text-gray-500 hover:text-[#407BFF] transition-colors cursor-default"
                    >
                      {keyword}
                      {index < engineKeywords.length - 1 && (
                        <span className="ml-4 text-gray-200">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
      <FooterV2 />
    </>
  );
}
