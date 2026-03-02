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
      </Head>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GearRatioCalculatorComponent />
        </div>
      </div>
    </>
  );
}
