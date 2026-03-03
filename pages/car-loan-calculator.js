import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/engine-displacement-calculator";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtInt = (n) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// ── Custom Slider ────────────────────────────────────────────────────────────

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
    const move = (e) =>
      onChange(getVal(e.touches ? e.touches[0].clientX : e.clientX));
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      className="relative h-7 flex items-center cursor-pointer select-none"
    >
      <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
      <div
        className="absolute h-1 rounded-full bg-[#407BFF]"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute w-5 h-5 rounded-full bg-[#407BFF] border-[3px] border-white shadow-[0_1px_8px_rgba(64,123,255,0.35)] z-10 -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

// ── NumberInput with free-edit ────────────────────────────────────────────────

function NumberInput({ value, onChange, prefix, suffix, wide = false, step = 1, min = 0, max }) {
  const [raw, setRaw] = useState(String(value));

  useEffect(() => {
    setRaw(String(value));
  }, [value]);

  const handleChange = (e) => {
    const str = e.target.value;
    setRaw(str);
    const parsed = parseFloat(str);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max ?? Infinity, Math.max(min, parsed));
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) {
      setRaw(String(min));
      onChange(min);
    } else {
      const clamped = Math.min(max ?? Infinity, Math.max(min, parsed));
      setRaw(String(clamped));
      onChange(clamped);
    }
  };

  return (
    <div className="flex items-baseline gap-0.5">
      {prefix && <span className="text-[15px] text-gray-400 mr-0.5">{prefix}</span>}
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={raw}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${wide ? "w-24" : "w-[80px]"} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
      {suffix && <span className="text-[13px] text-gray-300 ml-0.5">{suffix}</span>}
    </div>
  );
}

// ── SliderField ────────────────────────────────────────────────────────────────

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

// ── Row ────────────────────────────────────────────────────────────────────────

function Row({ label, value, large = false, sublabel = null, accent = false }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
      <div>
        <span className="text-[13px] text-gray-400 block">{label}</span>
        {sublabel && <span className="text-[11px] text-gray-300">{sublabel}</span>}
      </div>
      <span
        className={`${large ? "text-[22px] font-semibold font-mono tracking-tight" : "text-[15px] font-medium font-mono"} ${accent ? "text-[#407BFF]" : "text-gray-900"} text-right`}
      >
        {value}
      </span>
    </div>
  );
}

// ── SectionLabel ───────────────────────────────────────────────────────────────

function SectionLabel({ children, mt = false }) {
  return (
    <p className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? "mt-5" : ""}`}>
      {children}
    </p>
  );
}

// ── CalcSelect ────────────────────────────────────────────────────────────────

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

// ── Amortization mini chart (bar sparkline) ────────────────────────────────────

function AmortizationChart({ schedule }) {
  if (!schedule.length) return null;
  const yearly = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const chunk = schedule.slice(i, i + 12);
    const principal = chunk.reduce((s, r) => s + r.principal, 0);
    const interest = chunk.reduce((s, r) => s + r.interest, 0);
    yearly.push({ principal, interest, balance: chunk[chunk.length - 1].balance });
  }
  const maxVal = Math.max(...yearly.map((y) => y.principal + y.interest));

  return (
    <div>
      <SectionLabel mt>Yearly Amortization</SectionLabel>
      <div className="flex items-end gap-1.5 h-20 mt-3">
        {yearly.map((y, i) => {
          const total = y.principal + y.interest;
          const h = (total / maxVal) * 100;
          const pPct = (y.principal / total) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group relative">
              <div
                className="w-full rounded-t-sm overflow-hidden flex flex-col justify-end"
                style={{ height: `${h}%` }}
              >
                <div className="w-full bg-[#407BFF]/20" style={{ height: `${100 - pPct}%` }} />
                <div className="w-full bg-[#407BFF]" style={{ height: `${pPct}%` }} />
              </div>
              <span className="text-[9px] text-gray-300 text-center block">
                Y{i + 1}
              </span>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                <div className="bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap">
                  <p className="m-0">Principal: ${fmtInt(y.principal)}</p>
                  <p className="m-0">Interest: ${fmtInt(y.interest)}</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 -mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#407BFF]" />
          <span className="text-[11px] text-gray-400">Principal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#407BFF]/20" />
          <span className="text-[11px] text-gray-400">Interest</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────

export default function CarLoanCalculatorComponent() {
  const router = useRouter();

  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [apr, setApr] = useState(6.9);
  const [termMonths, setTermMonths] = useState(60);
  const [salesTaxRate, setSalesTaxRate] = useState(8.0);
  const [sugerencia, setSugerencia] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  // ── Calculations ────────────────────────────────────────────────────────────
  const taxAmount = vehiclePrice * (salesTaxRate / 100);
  const totalVehicleCost = vehiclePrice + taxAmount;
  const netLoanAmount = Math.max(0, totalVehicleCost - downPayment - tradeIn);
  const monthlyRate = apr / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = netLoanAmount / termMonths;
  } else {
    monthlyPayment =
      (netLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }

  const totalPaid = monthlyPayment * termMonths;
  const totalInterest = totalPaid - netLoanAmount;
  const totalCostOfCar = downPayment + tradeIn + totalPaid;

  // Amortization schedule
  const schedule = [];
  let balance = netLoanAmount;
  for (let m = 1; m <= termMonths; m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    schedule.push({
      month: m,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    });
  }

  // Affordability signal
  const getAprRating = () => {
    if (apr <= 4) return { label: "Excellent rate", color: "#10b981" };
    if (apr <= 7) return { label: "Good rate", color: "#407BFF" };
    if (apr <= 11) return { label: "Average rate", color: "#f59e0b" };
    return { label: "High rate — consider improving credit", color: "#ef4444" };
  };
  const aprRating = getAprRating();

  const downPct = vehiclePrice > 0 ? (downPayment / vehiclePrice) * 100 : 0;
  const getDownRating = () => {
    if (downPct >= 20) return { label: "Strong down payment (≥20%)", color: "#10b981" };
    if (downPct >= 10) return { label: "Moderate down payment", color: "#407BFF" };
    return { label: "Low down payment — higher risk of being upside-down", color: "#f59e0b" };
  };
  const downRating = getDownRating();

  const valid = vehiclePrice > 0 && termMonths > 0;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Car Loan & Monthly Payment Calculator
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Estimate your monthly auto loan payment, total interest paid, and full cost of ownership — including trade-in and taxes.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">

            {/* ── LEFT: Inputs ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">

              {/* Loan term + tax row */}
              <div className="flex gap-3 mb-8">
                <CalcSelect label="Loan Term" value={termMonths} onChange={(v) => setTermMonths(Number(v))}>
                  <option value={24}>24 months (2 yr)</option>
                  <option value={36}>36 months (3 yr)</option>
                  <option value={48}>48 months (4 yr)</option>
                  <option value={60}>60 months (5 yr)</option>
                  <option value={72}>72 months (6 yr)</option>
                  <option value={84}>84 months (7 yr)</option>
                </CalcSelect>
                <CalcSelect label="Sales Tax State" value={String(salesTaxRate)} onChange={(v) => setSalesTaxRate(parseFloat(v))}>
                  <option value="0">0% — Oregon / NH</option>
                  <option value="2.9">2.9% — Colorado</option>
                  <option value="4">4% — Alabama / Missouri</option>
                  <option value="4.5">4.5% — South Dakota</option>
                  <option value="5">5% — North Carolina</option>
                  <option value="5.75">5.75% — Georgia / DC</option>
                  <option value="6">6% — Florida base</option>
                  <option value="6.25">6.25% — Texas</option>
                  <option value="6.5">6.5% — Wisconsin</option>
                  <option value="6.625">6.625% — New Jersey</option>
                  <option value="7">7% — Indiana / Mississippi</option>
                  <option value="7.25">7.25% — California base</option>
                  <option value="7.5">7.5% — Illinois avg</option>
                  <option value="8">8% — avg with local</option>
                  <option value="9">9% — high local tax</option>
                  <option value="10">10% — custom high</option>
                </CalcSelect>
              </div>

              {/* Vehicle Price */}
              <SliderField
                label="Vehicle Price"
                sublabel="MSRP or negotiated price"
                minLabel="$5,000"
                maxLabel="$150,000"
                input={
                  <NumberInput
                    value={vehiclePrice}
                    onChange={setVehiclePrice}
                    prefix="$"
                    step={500}
                    min={1000}
                    max={150000}
                    wide
                  />
                }
              >
                <CustomSlider min={1000} max={150000} step={500} value={vehiclePrice} onChange={setVehiclePrice} />
              </SliderField>

              {/* Down Payment */}
              <SliderField
                label="Down Payment"
                sublabel={`${downPct.toFixed(1)}% of vehicle price`}
                minLabel="$0"
                maxLabel="$50,000"
                input={
                  <NumberInput
                    value={downPayment}
                    onChange={setDownPayment}
                    prefix="$"
                    step={250}
                    min={0}
                    max={50000}
                    wide
                  />
                }
              >
                <CustomSlider min={0} max={50000} step={250} value={downPayment} onChange={setDownPayment} />
              </SliderField>

              {/* Trade-in Value */}
              <SliderField
                label="Trade-in Value"
                sublabel="Value of your current vehicle"
                minLabel="$0"
                maxLabel="$40,000"
                input={
                  <NumberInput
                    value={tradeIn}
                    onChange={setTradeIn}
                    prefix="$"
                    step={250}
                    min={0}
                    max={40000}
                    wide
                  />
                }
              >
                <CustomSlider min={0} max={40000} step={250} value={tradeIn} onChange={setTradeIn} />
              </SliderField>

              {/* APR */}
              <SliderField
                label="Interest Rate (APR)"
                sublabel="Annual Percentage Rate"
                minLabel="1%"
                maxLabel="25%"
                input={
                  <NumberInput
                    value={apr}
                    onChange={setApr}
                    suffix="%"
                    step={0.1}
                    min={0}
                    max={25}
                  />
                }
              >
                <CustomSlider min={0} max={25} step={0.1} value={apr} onChange={setApr} />
              </SliderField>

              {/* APR badge */}
              <div className="inline-flex items-center gap-1.5 -mt-3 mb-2 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: aprRating.color }} />
                <span className="text-[12px] text-gray-500">{aprRating.label}</span>
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">Enter vehicle details to see your payment breakdown.</p>
                </div>
              ) : (
                <>
                  {/* Hero */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Estimated monthly payment
                    </p>
                    <p className="text-[60px] font-semibold font-mono leading-none tracking-[-2px] text-[#407BFF] m-0">
                      ${fmt(monthlyPayment)}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">/mo</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      {termMonths} months · {apr}% APR · ${fmtInt(netLoanAmount)} financed
                    </p>
                  </div>

                  {/* Down payment badge */}
                  <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: downRating.color }} />
                    <span className="text-[12px] text-gray-500">{downRating.label}</span>
                  </div>

                  {/* Loan breakdown */}
                  <SectionLabel>Loan Breakdown</SectionLabel>
                  <Row label="Vehicle price" value={`$${fmtInt(vehiclePrice)}`} />
                  <Row label="Sales tax" sublabel={`${salesTaxRate}% on vehicle price`} value={`$${fmt(taxAmount)}`} />
                  <Row label="Total vehicle cost (with tax)" value={`$${fmt(totalVehicleCost)}`} />
                  <Row label="Down payment" value={`− $${fmtInt(downPayment)}`} />
                  {tradeIn > 0 && (
                    <Row label="Trade-in value" value={`− $${fmtInt(tradeIn)}`} />
                  )}
                  <Row label="Amount financed" value={`$${fmt(netLoanAmount)}`} large />

                  {/* Payment summary */}
                  <SectionLabel mt>Payment Summary</SectionLabel>
                  <Row label="Monthly payment" value={`$${fmt(monthlyPayment)}`} large accent />
                  <Row label="Total of all payments" sublabel={`${termMonths} × $${fmt(monthlyPayment)}`} value={`$${fmt(totalPaid)}`} />
                  <Row label="Total interest paid" value={`$${fmt(totalInterest)}`} />
                  <Row label="Total cost of car" sublabel="Down + trade-in + all payments" value={`$${fmt(totalCostOfCar)}`} large />

                  {/* Interest ratio bar */}
                  {netLoanAmount > 0 && (
                    <div className="mt-4 mb-5">
                      <div className="flex justify-between text-[11px] text-gray-300 mb-1.5">
                        <span>Principal ${fmtInt(netLoanAmount)}</span>
                        <span>Interest ${fmtInt(totalInterest)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#407BFF] rounded-full"
                          style={{ width: `${(netLoanAmount / totalPaid) * 100}%`, transition: "width 0.4s ease" }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-300 mt-1">
                        <span>{((netLoanAmount / totalPaid) * 100).toFixed(1)}% principal</span>
                        <span>{((totalInterest / totalPaid) * 100).toFixed(1)}% interest</span>
                      </div>
                    </div>
                  )}

                  {/* Amortization chart */}
                  <AmortizationChart schedule={schedule} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Other tools */}
        <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-500 tracking-[0.5px] uppercase mb-3">
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
                    ${isActive
                      ? "bg-[#407BFF]/5 border-[#407BFF]/25 cursor-default pointer-events-none"
                      : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_12px_rgba(64,123,255,0.08)]"
                    }`}
                >
                  <span className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? "text-[#407BFF]" : "text-gray-300 group-hover:text-[#407BFF]"}`}>
                    {icon}
                  </span>
                  <div>
                    <span className={`block text-[13px] font-medium leading-snug ${isActive ? "text-[#407BFF]" : "text-gray-700"}`}>
                      {label}
                    </span>
                    <span className={`block text-[11px] mt-0.5 leading-snug ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                      {desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Suggestion */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">Have a suggestion?</p>
          <textarea
            value={sugerencia}
            onChange={(e) => setSugerencia(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))}
            placeholder="Share your feedback here..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (sugerencia.trim().length <= 10) return alert("Please share a bit more detail.");
              createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: "car-loan-calculator" } });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {data && <p className="text-[12px] text-[#407BFF] mt-2">Thanks for your feedback!</p>}
        </div>
      </div>
    </div>
  );
}