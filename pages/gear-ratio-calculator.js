import CalculadoraRelacionTransmisionComponent from "@/src/Components/Calculator/CalculadoraRelacionTransmision";
import GearRatioCalculatorComponent from "@/src/Components/Calculator/GearRatioCalculator";
import Head from "next/head";

export default function GearRatioCalculator() {
  return (
    <>
      <Head>
        <title>Gear Ratio Calculator</title>
        <meta
          name="description"
          content="Calculate the gear ratio, vehicle speed, torque multiplication, and other transmission parameters."
        />
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
          <GearRatioCalculatorComponent />
        </div>
      </div>
    </>
  );
}
