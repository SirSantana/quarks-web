import EngineDisplacementCalculatorComponent from "@/src/Components/Calculator/EngineCalculator";
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
export default function EngineDisplacementCalculator() {
  return (
    <>
      <Head>
        <title>
          Engine Displacement Calculator (CID, CC & Liters) – Bore & Stroke
          Formula
        </title>

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
                "Online calculator to compute engine displacement in Cubic Inches (CID), CC, and Liters using bore, stroke, and cylinder count.",
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
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                  Engine Displacement Guide: How to Calculate CID and Engine
                  Size
                </h2>
                <p className="text-[15px] leading-relaxed text-gray-500 mb-4">
                  <strong>Engine displacement</strong> is the most critical
                  factor in determining the total swept volume of an engine's
                  pistons. Our <strong>CID calculator</strong> (Cubic Inch
                  Displacement) provides precise measurements in cubic inches,
                  liters, and CCs—essential data for engine rebuilding,
                  performance tuning, and domestic car restoration.
                </p>
                <p className="text-[15px] leading-relaxed text-gray-500">
                  Whether you are measuring a classic American V8, a
                  high-revving 4-cylinder, or a motorcycle engine, understanding{" "}
                  <strong>cylinder volume</strong> is the first step toward
                  calculating compression ratios, intake needs, and potential
                  torque output.
                </p>
              </header>

              <div className="h-[1px] bg-gray-100 w-full my-10" />

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Formula for Engine Displacement and Cubic Inch (CID)
                  Calculation
                </h2>
                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                  To determine <strong>professional engine size</strong>, we
                  apply the geometric volume of a cylinder multiplied by the
                  total number of combustion chambers. The standard mathematical
                  equation used by our displacement tool is:
                </p>

                <div className="py-6 px-4 mb-6 border-y border-gray-100 flex flex-col items-center justify-center text-center">
                  <span className="text-[18px] font-mono text-[#407BFF] font-bold">
                    CID = [π × (Bore / 2)² × Stroke] × Number of Cylinders
                  </span>
                  <span className="text-[12px] text-gray-400 mt-2 uppercase tracking-widest">
                    Volumetric Displacement Equation (Imperial)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                      Bore and Stroke Dimensions
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      The <strong>bore</strong> is the diameter of the cylinder,
                      while the <strong>stroke</strong> is the vertical distance
                      the piston travels. In the US, "boring and stroking" an
                      engine are common ways to increase{" "}
                      <strong>cubic inches</strong> for higher performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                      Converting CID to Liters
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      To convert cubic inches to liters, we divide CID by 61.02.
                      For example, the legendary <strong>302 CID</strong> engine
                      is commercially known as a <strong>5.0 Liter</strong>{" "}
                      engine in modern Ford Mustangs.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Frequently Asked Questions about Engine Displacement
                </h2>

                <div className="space-y-8">
                  <div className="border-l-2 border-[#407BFF] pl-6">
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2">
                      Why is exact engine displacement important?
                    </h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Knowing your exact <strong>engine displacement</strong> is
                      vital for calculating air-fuel ratios, choosing the
                      correct turbocharger size, and ensuring your build meets
                      class regulations for drag racing or sanctioned
                      motorsports.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#407BFF] pl-6">
                    <h4 className="text-[16px] font-bold text-gray-900 mb-2">
                      How does cylinder count affect total volume?
                    </h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Individual cylinder volume is the space inside one
                      chamber. The <strong>total displacement</strong> is the
                      sum of all cylinders in the block, whether it’s an
                      Inline-4, V6, or a classic American V8.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Common Engine Size Reference (US Standards)
                </h2>
                <div className="overflow-hidden border border-gray-100 rounded-lg">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                        <th className="px-6 py-4 font-semibold text-left">
                          Engine Platform
                        </th>
                        <th className="px-6 py-4 font-semibold text-left">
                          Common Size (CID)
                        </th>
                        <th className="px-6 py-4 font-semibold text-left">
                          Metric Equivalent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-500">
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          Economy & Compact Cars
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          90 - 150 CID
                        </td>
                        <td className="px-6 py-4 italic">1.5L - 2.5L</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          Modern V6 & Small Block V8
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          180 - 350 CID
                        </td>
                        <td className="px-6 py-4 italic">3.0L - 5.7L</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          Heavy Duty & Big Block V8
                        </td>
                        <td className="px-6 py-4 font-mono text-[#407BFF]">
                          390 - 500+ CID
                        </td>
                        <td className="px-6 py-4 italic">6.4L - 8.2L+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[12px] text-gray-400 mt-4 italic text-center">
                  * Displacement figures are industry averages for American
                  domestic and import markets.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
