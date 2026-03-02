import { CREATE_SUGERENCIA } from '@/graphql/mutations';
import { OTHER_CALCULATORS } from '@/pages/engine-displacement-calculator';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

function CustomSlider({ min, max, step = 1, value, onChange }) {
  const trackRef = useRef(null);
  const clamp = (v) => Math.min(max, Math.max(min, v));
  const pct = ((value - min) / (max - min)) * 100;

  const getVal = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return clamp(Math.round((min + ratio * (max - min)) / step) * step);
  };

  const startDrag = (clientX) => {
    onChange(getVal(clientX));
    const move = (e) => onChange(getVal(e.touches ? e.touches[0].clientX : e.clientX));
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      className="relative h-7 flex items-center cursor-pointer select-none"
    >
      <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
      <div className="absolute h-1 rounded-full bg-[#407BFF]" style={{ width: `${pct}%` }} />
      <div
        className="absolute w-5 h-5 rounded-full bg-[#407BFF] border-[3px] border-white shadow-[0_1px_8px_rgba(64,123,255,0.35)] z-10 -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function Row({ label, value, large = false }) {
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-gray-100">
      <span className="text-[13px] text-gray-400">{label}</span>
      <span className={`${large ? 'text-[22px] font-semibold tracking-tight font-mono ' : 'text-[15px] font-medium font-mono '} text-gray-900`}>
        {value}
      </span>
    </div>
  );
}

function SectionLabel({ children, mt = false }) {
  return (
    <p className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase ${mt ? 'mt-6' : ''} mb-0.5`}>
      {children}
    </p>
  );
}

function CalcSelect({ label, value, onChange, children }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none"
      >
        {children}
      </select>
    </div>
  );
}

function NumInput({ value, onChange, suffix, step, min, max }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, parseFloat(e.target.value) || 0)))}
        className="w-[70px] text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {suffix && <span className="text-[13px] text-gray-300">{suffix}</span>}
    </div>
  );
}

function SliderField({ label, sublabel, input, minLabel, maxLabel, children }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <span className="text-[13px] font-medium text-gray-500 block">{label}</span>
          {sublabel && <span className="text-[11px] text-gray-300">{sublabel}</span>}
        </div>
        {input}
      </div>
      {children}
      <div className="flex justify-between mt-1.5 text-[11px] text-gray-300">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function FuelEconomyCalculator() {
  const router = useRouter();

  // US defaults: miles + gallons
  const [unit, setUnit] = useState('mi');
  const [fuelUnit, setFuelUnit] = useState('gal');
  const [distance, setDistance] = useState(150);
  const [fuel, setFuel] = useState(5);
  const [price, setPrice] = useState('');
  const [feedback, setFeedback] = useState('');

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => { if (data) setTimeout(() => router.reload(), 3000); }, [data]);

  const maxDist      = unit === 'mi' ? 500 : 800;
  const maxFuel      = fuelUnit === 'gal' ? 30 : 120;
  const defaultPrice = fuelUnit === 'gal' ? 3.50 : 0.92;
  const maxPrice     = fuelUnit === 'gal' ? 8 : 3;

  const km     = unit === 'mi' ? distance * 1.60934 : distance;
  const liters = fuelUnit === 'gal' ? fuel * 3.78541 : fuel;
  const valid  = km > 0 && liters > 0;

  const kmPerLiter  = valid ? km / liters : 0;
  const kmPerGallon = kmPerLiter * 3.78541;
  const mpg         = kmPerGallon / 1.60934;
  const lPer100km   = valid ? (liters / km) * 100 : 0;

  const fuelLabel = fuelUnit === 'gal' ? 'gal' : 'ltr';
  const distLabel = unit === 'mi' ? 'mi' : 'km';

  const p            = parseFloat(price) > 0 ? parseFloat(price) : defaultPrice;
  const tripCost     = liters * (fuelUnit === 'gal' ? p / 3.78541 : p);
  const costPerMile  = valid ? tripCost / (unit === 'mi' ? distance : distance / 1.60934) : 0;
  const costPer100mi = costPerMile * 100;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Fuel Economy Calculator
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Enter miles driven and fuel used to calculate your MPG and estimate your trip cost.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[420px_1fr] max-[860px]:grid-cols-1">

            {/* ── LEFT: Form ── */}
            <div className="p-8 border-r border-gray-200 max-[860px]:border-r-0 max-[860px]:border-b max-sm:p-6">

              {/* Unit selects */}
              <div className="flex gap-3 mb-8">
                <CalcSelect label="Distance" value={unit} onChange={setUnit}>
                  <option value="mi">Miles (mi)</option>
                  <option value="km">Kilometers (km)</option>
                </CalcSelect>
                <CalcSelect label="Fuel" value={fuelUnit} onChange={setFuelUnit}>
                  <option value="gal">Gallons (gal)</option>
                  <option value="ltr">Liters (ltr)</option>
                </CalcSelect>
              </div>

              {/* Distance */}
              <SliderField
                label="Distance driven"
                minLabel="0"
                maxLabel={`${maxDist} ${distLabel}`}
                input={<NumInput value={distance} onChange={setDistance} suffix={distLabel} step={1} min={0} max={maxDist} />}
              >
                <CustomSlider min={0} max={maxDist} step={1} value={distance} onChange={setDistance} />
              </SliderField>

              {/* Fuel used */}
              <SliderField
                label="Fuel used"
                minLabel="0"
                maxLabel={`${maxFuel} ${fuelLabel}`}
                input={<NumInput value={fuel} onChange={setFuel} suffix={fuelLabel} step={0.1} min={0} max={maxFuel} />}
              >
                <CustomSlider min={0} max={maxFuel} step={0.1} value={fuel} onChange={setFuel} />
              </SliderField>

              {/* Gas price */}
              <SliderField
                label={`Gas price per ${fuelUnit === 'gal' ? 'gallon' : 'liter'}`}
                sublabel={`US avg: $${defaultPrice.toFixed(2)}`}
                minLabel="$0"
                maxLabel={`$${maxPrice.toFixed(2)}`}
                input={
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base text-gray-300">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={maxPrice}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={defaultPrice.toFixed(2)}
                      className="w-[72px] text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                }
              >
                <CustomSlider
                  min={0}
                  max={maxPrice}
                  step={0.01}
                  value={Math.min(parseFloat(price) > 0 ? parseFloat(price) : defaultPrice, maxPrice)}
                  onChange={(v) => setPrice(v.toFixed(2))}
                />
              </SliderField>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">
                    Enter distance and fuel used to see your results.
                  </p>
                </div>
              ) : (
                <>
                  {/* MPG — primary US metric */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Fuel economy
                    </p>
                    <p className="text-[60px] font-semibold leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {mpg.toFixed(2)}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">MPG</span>
                    </p>
                  </div>

                  <SectionLabel>Fuel Economy</SectionLabel>
                  <Row label="Miles per gallon (MPG)"  value={mpg.toFixed(2)} large />
                  <Row label="Miles per liter"         value={(mpg / 3.78541).toFixed(2)} />
                  <Row label="Km per gallon"           value={kmPerGallon.toFixed(2)} />
                  <Row label="Liters per 100 miles"    value={(lPer100km * 1.60934).toFixed(2)} />
                  <Row label="Liters per 100 km"       value={lPer100km.toFixed(2)} />

                  <SectionLabel mt>Trip Cost</SectionLabel>
                  <Row label="Total trip cost"                                          value={`$${tripCost.toFixed(2)}`} large />
                  <Row label={`Gas price / ${fuelUnit === 'gal' ? 'gallon' : 'liter'}`} value={`$${p.toFixed(2)}`} />
                  <Row label="Total fuel used"                                          value={`${(liters / 3.78541).toFixed(2)} gal · ${liters.toFixed(2)} ltr`} />
                  <Row label="Cost per mile"                                            value={`$${costPerMile.toFixed(3)}`} />
                  <Row label="Cost per 100 miles"                                       value={`$${costPer100mi.toFixed(2)}`} />
                </>
              )}
            </div>
          </div>
        </div>
 <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
            Other tools
          </p>
          <div className="grid grid-cols-4 gap-3 max-[860px]:grid-cols-2 max-sm:grid-cols-1">
            {OTHER_CALCULATORS.map(({ label, desc, href, icon }) => {
              const isActive = router.pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 no-underline
                            ${
                              isActive
                                ? "bg-[#407BFF]/5 border-[#407BFF]/25 cursor-default pointer-events-none"
                                : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_12px_rgba(64,123,255,0.08)]"
                            }`}
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? "text-[#407BFF]" : "text-gray-300 group-hover:text-[#407BFF]"}`}
                  >
                    {icon}
                  </span>
                  <div>
                    <span
                      className={`block text-[13px] font-medium leading-snug ${isActive ? "text-[#407BFF]" : "text-gray-700"}`}
                    >
                      {label}
                    </span>
                    <span
                      className={`block text-[11px] mt-0.5 leading-snug ${isActive ? "text-gray-600" : "text-gray-400"}`}
                    >
                      {desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        {/* Feedback */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">Have a suggestion?</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
            placeholder="Share your feedback here..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (feedback.trim().length <= 10) return alert('Please share a bit more detail.');
              createSugerencia({ variables: { sugerencia: feedback.trim(), tipo: 'fuel-economy-calculator' } });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
          {data && <p className="text-[12px] text-[#407BFF] mt-2">Thanks for your feedback!</p>}
        </div>

      </div>
    </div>
  );
}