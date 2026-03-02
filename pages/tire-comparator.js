import TireComparatorComponent from "@/src/Components/Calculator/TireComparator";
import Head from "next/head";



export default function TireComparator() {


  return (
    <>
      <Head>
        <title>Tire Comparator — Dimensions and Compatibility</title>
        <meta name="description" content="Compare two tires: diameter, circumference, sidewall, speed rating, and compatibility. Free tool." />
       
      </Head>
     <div style={{ display: 'flex' }}>
          {/* <CalculadorasSidebar /> */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <TireComparatorComponent />
          </div>
        </div>
     
    </>
  );
}