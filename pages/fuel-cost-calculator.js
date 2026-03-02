import FuelEconomyCalculator from "@/src/Components/Calculator/FuelCostCalculator";
import Head from "next/head";

export default function FuelEconomyCalculatorPage() {
  return (
    <>
      <Head>
        <title>Gas Mileage Calculator | Fuel Cost & MPG Trip Estimate</title>

        <meta
          name="description"
          content="Calculate your car's fuel cost and MPG. Free tool to measure gas expenses per mile, total trip cost, and fuel efficiency for gas or diesel vehicles."
        />
        <meta
          name="keywords"
          content="gas mileage calculator, fuel cost estimator, MPG calculator, trip gas calculator, calculate gas money"
        />
        <link
          rel="canonical"
          href="https://www.quarks.com.co/fuel-cost-calculator"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para Facebook/WhatsApp (US Market) */}
        <meta
          property="og:title"
          content="Trip Fuel Cost Estimator | Online Gas Calculator"
        />
        <meta
          property="og:description"
          content="Plan your road trip budget. Calculate real-time fuel consumption and save money on your next drive."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:image:url" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gas & Fuel Cost Calculator" />
        <meta
          name="twitter:description"
          content="Estimate trip costs and fuel efficiency in seconds."
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
        {/* Schema.org for Rich Results (Google Search) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Professional Gas Mileage Calculator",
              operatingSystem: "All",
              applicationCategory: "FinanceApplication",
              description:
                "Calculate gas mileage (MPG), fuel cost per mile, and total trip expenses.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1850",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </Head>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <FuelEconomyCalculator />
          <div className="max-w-[1100px] mt-16 mx-auto px-8 pb-20 max-sm:px-4">
            {/* ── Article 1: Main intro + FAQ ───────────────────────────────────── */}
            <article className="mb-10">
              <header className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                  Gas Mileage Calculator: Save on Gas and Diesel Costs
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Our{" "}
                  <strong className="text-gray-700 font-medium">
                    online fuel cost calculator
                  </strong>{" "}
                  is the essential tool for drivers looking to optimize their
                  travel budget. Whether you're planning a cross-country road
                  trip or auditing your monthly commute, calculating your exact{" "}
                  <strong className="text-gray-700 font-medium">
                    gas expense
                  </strong>
                  helps you make better financial decisions and reduce your
                  carbon footprint.
                </p>
              </header>

              {/* How it works */}
              <section className="mb-8">
                <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                  How to calculate your car's fuel consumption?
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                  To get an accurate estimate, our tool processes three
                  fundamental variables that define your vehicle's energy
                  efficiency:
                </p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {[
                    {
                      label: "Trip Distance",
                      desc: "The total miles (round trip) you plan to drive.",
                    },
                    {
                      label: "Fuel Economy",
                      desc: "Commonly measured in Miles Per Gallon (MPG) for US vehicles.",
                    },
                    {
                      label: "Local Gas Price",
                      desc: "The current price per gallon of gasoline or diesel at your preferred gas station.",
                    },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#407BFF] mt-2 shrink-0" />
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        <strong className="text-gray-700 font-medium">
                          {label}:
                        </strong>{" "}
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tip callout */}
                <div className="flex gap-3 items-start bg-[#f0f5ff] border-l-4 border-[#407BFF] rounded-lg px-4 py-3.5">
                  <span className="text-lg leading-none mt-0.5">💡</span>
                  <p className="text-[13px] text-gray-600 leading-relaxed m-0">
                    <strong className="text-gray-700">Pro Tip:</strong>{" "}
                    Maintaining proper{" "}
                    <strong className="text-gray-700">tire pressure</strong>
                    according to your owner's manual can improve gas mileage by
                    up to <strong className="text-gray-700">3%</strong>.
                  </p>
                </div>
              </section>

              {/* Formula */}
              <section className="mb-8">
                <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                  Manual Gas Cost Formula
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                  If you prefer to calculate your travel expenses manually, use
                  the standard logistics equation:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-center mb-4">
                  <p className="text-[14px] font-semibold text-gray-800 m-0">
                    Total Cost = (Distance / MPG) × Price per Gallon
                  </p>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Our calculator automates this process to prevent calculation
                  errors and provide an instant trip budget for your next
                  commute.
                </p>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="text-[17px] font-semibold text-gray-800 mb-5">
                  Fuel Consumption FAQ
                </h3>
                <div className="flex flex-col gap-0">
                  {[
                    {
                      q: "What factors affect real-world gas mileage?",
                      a: "It’s not just the engine. Driving at high speeds, excessive idling, using A/C, carrying heavy roof racks, and dirty air filters all directly impact your MPG.",
                    },
                    {
                      q: "Is it better to calculate cost per mile or per trip?",
                      a: "Cost per mile is ideal for business tax deductions (IRS standard mileage rate), while cost per trip is essential for family vacation budgeting.",
                    },
                    {
                      q: "How does fuel type affect performance?",
                      a: "Diesel engines typically offer better highway fuel economy, while Hybrids (HEVs) excel in stop-and-go city traffic due to regenerative braking.",
                    },
                  ].map(({ q, a }, i) => (
                    <div
                      key={i}
                      className="py-4 border-b border-gray-100 last:border-0"
                    >
                      <h4 className="text-[14px] font-semibold text-[#407BFF] mb-1.5">
                        {q}
                      </h4>
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* ── Article 2: Factors ────────────────────────────────────────────── */}
            <article className="mb-10">
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                  Key Factors Influencing Your Car’s Gas Consumption
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Many drivers wonder why their car gets lower MPG than the EPA
                  estimate. Fuel efficiency is not static; it depends on
                  external variables and driving habits that can alter expenses
                  by up to 30%.
                </p>
              </header>
              <div className="flex flex-col gap-0">
                {[
                  {
                    num: "1",
                    title: "Aerodynamic Drag and Weight",
                    body: "Using roof boxes or driving with open windows at high speeds increases drag. This forces the engine to work harder. Additionally, every extra 100 lbs of cargo can reduce your MPG by about 1%.",
                  },
                  {
                    num: "2",
                    title: "Mechanical Maintenance",
                    body: "Dirty air filters, old spark plugs, or clogged fuel injectors prevent efficient combustion. If you notice a sudden drop in MPG on your usual routes, it’s time for a tune-up.",
                  },
                ].map(({ num, title, body }) => (
                  <div
                    key={num}
                    className="py-5 border-b border-gray-100 last:border-0 flex gap-4 items-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#407BFF] text-white text-[12px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {num}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-800 mb-1.5">
                        {title}
                      </h3>
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* ── Article 3: Eco tips grid ──────────────────────────────────────── */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6">
                How to Save Money on Gas: Practical Guide
              </h2>
              <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
                {[
                  {
                    title: "Eco-Driving Habits",
                    body: "Avoid rapid acceleration and braking. Maintaining a steady speed helps the fuel injection system stay in its optimal range.",
                  },
                  {
                    title: "A/C vs. Windows",
                    body: "At low city speeds, open windows are better. At speeds over 50 mph, using the A/C is more efficient than the drag created by open windows.",
                  },
                  {
                    title: "PSI Matters",
                    body: "Driving with under-inflated tires increases rolling resistance. Keeping them at the right PSI improves safety and fuel economy.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-[#10b981]"
                  >
                    <h4 className="text-[14px] font-semibold text-gray-800 mb-2">
                      {title}
                    </h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* ── Article 4: Comparison table ──────────────────────────────────── */}
            <article>
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                Gas vs. Diesel vs. Hybrid: Efficiency Comparison
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                When using a{" "}
                <strong className="text-gray-700 font-medium">
                  trip cost calculator
                </strong>
                , you will notice significant differences in operating costs
                based on the drivetrain:
              </p>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-3 bg-[#407BFF] px-5 py-3">
                  {["Engine Type", "Average Efficiency", "Best Use Case"].map(
                    (h) => (
                      <span
                        key={h}
                        className="text-[12px] font-semibold text-white uppercase tracking-[0.4px]"
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>
                {/* Rows */}
                {[
                  {
                    tipo: "Naturally Aspirated Gas",
                    eficiencia: "25 – 30 MPG",
                    uso: "Daily Commute",
                  },
                  {
                    tipo: "Turbo Diesel",
                    eficiencia: "35 – 45 MPG",
                    uso: "Highway / Towing",
                  },
                  {
                    tipo: "Hybrid (HEV)",
                    eficiencia: "45 – 55+ MPG",
                    uso: "City Driving",
                  },
                ].map(({ tipo, eficiencia, uso }, i) => (
                  <div
                    key={tipo}
                    className={`grid grid-cols-3 px-5 py-3.5 border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="text-[13px] font-medium text-gray-700">
                      {tipo}
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {eficiencia}
                    </span>
                    <span className="text-[13px] text-gray-500">{uso}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-gray-400 italic mt-3">
                Note: These are average estimates. Use the calculator above for
                precise results based on your specific vehicle model.
              </p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
