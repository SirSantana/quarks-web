import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/engine-displacement-calculator";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ── Maintenance data ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS = [
  {
    id: "oil",
    category: "Engine",
    label: "Engine Oil & Filter",
    desc: "Check level weekly, replace per manufacturer interval.",
    interval: "Every 5,000–7,500 mi / 6 months",
    priority: "high",
  },
  {
    id: "air_filter",
    category: "Engine",
    label: "Air Filter",
    desc: "Inspect annually. Replace if dirty or clogged.",
    interval: "Every 15,000–30,000 mi",
    priority: "medium",
  },
  {
    id: "spark_plugs",
    category: "Engine",
    label: "Spark Plugs",
    desc: "Worn plugs reduce fuel economy and performance.",
    interval: "Every 30,000–100,000 mi",
    priority: "medium",
  },
  {
    id: "coolant",
    category: "Engine",
    label: "Coolant / Antifreeze",
    desc: "Check level and condition. Flush as needed.",
    interval: "Every 30,000 mi / 2 years",
    priority: "medium",
  },
  {
    id: "timing_belt",
    category: "Engine",
    label: "Timing Belt / Chain",
    desc: "Critical — failure can cause severe engine damage.",
    interval: "Every 60,000–100,000 mi",
    priority: "high",
  },
  {
    id: "brake_pads",
    category: "Brakes",
    label: "Brake Pads & Rotors",
    desc: "Inspect thickness and wear. Replace if below minimum.",
    interval: "Every 25,000–65,000 mi",
    priority: "high",
  },
  {
    id: "brake_fluid",
    category: "Brakes",
    label: "Brake Fluid",
    desc: "Moisture absorption reduces braking performance.",
    interval: "Every 2 years or 45,000 mi",
    priority: "medium",
  },
  {
    id: "tires",
    category: "Tires & Wheels",
    label: "Tire Rotation & Balance",
    desc: "Even out wear and improve handling.",
    interval: "Every 5,000–7,500 mi",
    priority: "medium",
  },
  {
    id: "tire_pressure",
    category: "Tires & Wheels",
    label: "Tire Pressure",
    desc: "Check monthly. Incorrect pressure affects safety and MPG.",
    interval: "Monthly / before long trips",
    priority: "high",
  },
  {
    id: "alignment",
    category: "Tires & Wheels",
    label: "Wheel Alignment",
    desc: "Prevents uneven tire wear and pulling.",
    interval: "Every 12 months or 12,000 mi",
    priority: "low",
  },
  {
    id: "transmission",
    category: "Drivetrain",
    label: "Transmission Fluid",
    desc: "Degraded fluid causes slipping and overheating.",
    interval: "Every 30,000–60,000 mi",
    priority: "medium",
  },
  {
    id: "differential",
    category: "Drivetrain",
    label: "Differential Fluid",
    desc: "Applies to RWD/AWD/4WD vehicles.",
    interval: "Every 30,000–60,000 mi",
    priority: "low",
  },
  {
    id: "battery",
    category: "Electrical",
    label: "Battery & Terminals",
    desc: "Test charge level and inspect for corrosion.",
    interval: "Every 3–5 years",
    priority: "high",
  },
  {
    id: "alternator",
    category: "Electrical",
    label: "Alternator & Charging System",
    desc: "Check output voltage and belt tension.",
    interval: "Inspect every 60,000 mi",
    priority: "low",
  },
  {
    id: "cabin_filter",
    category: "Comfort & Safety",
    label: "Cabin Air Filter",
    desc: "Affects HVAC airflow and air quality inside the car.",
    interval: "Every 15,000–25,000 mi / 1 year",
    priority: "low",
  },
  {
    id: "wiper_blades",
    category: "Comfort & Safety",
    label: "Wiper Blades",
    desc: "Replace when streaking or squeaking occurs.",
    interval: "Every 6–12 months",
    priority: "low",
  },
  {
    id: "power_steering",
    category: "Steering & Suspension",
    label: "Power Steering Fluid",
    desc: "Check level and condition regularly.",
    interval: "Every 50,000 mi or as needed",
    priority: "low",
  },
  {
    id: "shocks",
    category: "Steering & Suspension",
    label: "Shocks & Struts",
    desc: "Worn shocks increase braking distance and reduce control.",
    interval: "Every 50,000 mi",
    priority: "medium",
  },
  {
    id: "fuel_filter",
    category: "Fuel System",
    label: "Fuel Filter",
    desc: "Clogged filters reduce engine performance and MPG.",
    interval: "Every 20,000–40,000 mi",
    priority: "medium",
  },
  {
    id: "exhaust",
    category: "Exhaust",
    label: "Exhaust System",
    desc: "Inspect for rust, leaks, or unusual noise.",
    interval: "Annually",
    priority: "low",
  },
];

const CATEGORIES = [...new Set(MAINTENANCE_ITEMS.map((i) => i.category))];

const PRIORITY_COLOR = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

const PRIORITY_BG = {
  high: "#fef2f2",
  medium: "#fffbeb",
  low: "#f0fdf4",
};

// ── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children, mt = false }) {
  return (
    <p
      className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-2 ${mt ? "mt-6" : ""}`}
    >
      {children}
    </p>
  );
}

function CalcSelect({ label, value, onChange, children, disabled = false }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {children}
      </select>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-3 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none placeholder:text-gray-300"
      />
    </div>
  );
}

function CheckItem({ item, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 select-none
        ${checked
          ? "bg-gray-50 border-gray-100 opacity-50"
          : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_8px_rgba(64,123,255,0.07)]"
        }`}
    >
      {/* Checkbox */}
      <div
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150
          ${checked ? "bg-[#407BFF] border-[#407BFF]" : "border-gray-300 bg-white"}`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[13px] font-medium ${checked ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {item.label}
          </span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              color: PRIORITY_COLOR[item.priority],
              background: PRIORITY_BG[item.priority],
            }}
          >
            {item.priority}
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5 mb-0 leading-snug">
          {item.desc}
        </p>
        <p className="text-[11px] text-[#407BFF] mt-1 mb-0 font-medium">
          {item.interval}
        </p>
      </div>
    </div>
  );
}

// ── Progress ring ───────────────────────────────────────────────────────────

function ProgressRing({ pct }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} strokeWidth="5" stroke="#e5e7eb" fill="none" />
      <circle
        cx="36"
        cy="36"
        r={r}
        strokeWidth="5"
        stroke="#407BFF"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
    </svg>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

const YEARS = Array.from({ length: 35 }, (_, i) => 2025 - i);

const MAKES = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ferrari", "Ford", "Genesis", "GMC", "Honda", "Hyundai",
  "Infiniti", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda",
  "Mercedes-Benz", "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru",
  "Tesla", "Toyota", "Volkswagen", "Volvo",
];

export default function MaintenanceTrackerComponent() {
  const router = useRouter();

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [generated, setGenerated] = useState(false);
  const [checked, setChecked] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [sugerencia, setSugerencia] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  const canGenerate = year && make && model.trim().length > 0;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setChecked({});
    setGenerated(true);
    setActiveCategory("All");
  };

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetChecklist = () => setChecked({});

  const totalItems = MAINTENANCE_ITEMS.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const filtered =
    activeCategory === "All"
      ? MAINTENANCE_ITEMS
      : MAINTENANCE_ITEMS.filter((i) => i.category === activeCategory);

  const highPriority = MAINTENANCE_ITEMS.filter(
    (i) => i.priority === "high" && !checked[i.id]
  );

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Maintenance Interval Tracker
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Enter your vehicle details to generate a personalized service
            checklist — oil changes, brakes, spark plugs, and more.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[340px_1fr] max-[880px]:grid-cols-1">

            {/* ── LEFT: Vehicle form ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">
              <SectionLabel>Your vehicle</SectionLabel>

              <div className="flex gap-3 mb-4">
                <CalcSelect label="Year" value={year} onChange={setYear}>
                  <option value="">Select</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </CalcSelect>
                <CalcSelect label="Make" value={make} onChange={setMake}>
                  <option value="">Select</option>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </CalcSelect>
              </div>

              <div className="mb-4">
                <TextInput
                  label="Model"
                  value={model}
                  onChange={setModel}
                  placeholder="e.g. Camry, Civic, F-150"
                />
              </div>

              <div className="mb-8">
                <TextInput
                  label="Current Mileage (optional)"
                  value={mileage}
                  onChange={setMileage}
                  placeholder="e.g. 45,000"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full py-2.5 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Generate Checklist
              </button>

              {/* Progress summary — shown after generate */}
              {generated && (
                <div className="mt-8">
                  <SectionLabel>Progress</SectionLabel>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative flex-shrink-0">
                      <ProgressRing pct={pct} />
                      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-gray-800">
                        {pct}%
                      </span>
                    </div>
                    <div>
                      <p className="text-[22px] font-semibold font-mono text-gray-900 leading-none m-0">
                        {checkedCount}
                        <span className="text-[15px] font-normal text-gray-300 ml-1">
                          / {totalItems}
                        </span>
                      </p>
                      <p className="text-[12px] text-gray-400 mt-1 mb-0">
                        items reviewed
                      </p>
                    </div>
                    {checkedCount > 0 && (
                      <button
                        onClick={resetChecklist}
                        className="ml-auto text-[11px] text-gray-300 hover:text-gray-500 transition-colors border-none bg-transparent cursor-pointer p-0 underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* High priority remaining */}
                  {highPriority.length > 0 && (
                    <div className="mt-4 p-3.5 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-[11px] font-semibold text-red-500 uppercase tracking-[0.4px] mb-1.5">
                        ⚠ High priority remaining
                      </p>
                      {highPriority.map((i) => (
                        <p key={i.id} className="text-[12px] text-red-400 m-0 leading-snug">
                          · {i.label}
                        </p>
                      ))}
                    </div>
                  )}

                  {checkedCount === totalItems && (
                    <div className="mt-4 p-3.5 bg-green-50 border border-green-100 rounded-xl">
                      <p className="text-[12px] font-semibold text-green-600 m-0">
                        ✓ All items reviewed — great job!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT: Checklist ── */}
            <div className="p-8 max-sm:p-6">
              {!generated ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-gray-300 m-0">
                    Enter your vehicle details and click<br />
                    <span className="font-medium text-gray-400">Generate Checklist</span> to get started.
                  </p>
                </div>
              ) : (
                <>
                  {/* Vehicle title */}
                  <div className="mb-6 pb-5 border-b border-gray-100">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1">
                      Service checklist for
                    </p>
                    <p className="text-[22px] font-semibold text-gray-900 m-0 tracking-tight">
                      {year} {make} {model}
                    </p>
                    {mileage && (
                      <p className="text-[13px] text-gray-400 mt-0.5 mb-0">
                        Current mileage: {mileage} mi
                      </p>
                    )}
                  </div>

                  {/* Category filter tabs */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["All", ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-all duration-150 cursor-pointer
                          ${activeCategory === cat
                            ? "bg-[#407BFF] border-[#407BFF] text-white"
                            : "bg-white border-gray-200 text-gray-500 hover:border-[#407BFF]/40"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-2">
                    {/* Group by category when showing All */}
                    {activeCategory === "All"
                      ? CATEGORIES.map((cat) => {
                          const items = MAINTENANCE_ITEMS.filter(
                            (i) => i.category === cat
                          );
                          return (
                            <div key={cat}>
                              <SectionLabel mt>{cat}</SectionLabel>
                              <div className="flex flex-col gap-2">
                                {items.map((item) => (
                                  <CheckItem
                                    key={item.id}
                                    item={item}
                                    checked={!!checked[item.id]}
                                    onToggle={() => toggle(item.id)}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })
                      : filtered.map((item) => (
                          <CheckItem
                            key={item.id}
                            item={item}
                            checked={!!checked[item.id]}
                            onToggle={() => toggle(item.id)}
                          />
                        ))}
                  </div>
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

        {/* Suggestion */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">
            Have a suggestion?
          </p>
          <textarea
            value={sugerencia}
            onChange={(e) =>
              setSugerencia(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))
            }
            placeholder="Share your feedback here..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (sugerencia.trim().length <= 10)
                return alert("Please share a bit more detail.");
              createSugerencia({
                variables: {
                  sugerencia: sugerencia.trim(),
                  tipo: "maintenance-interval-tracker",
                },
              });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {data && (
            <p className="text-[12px] text-[#407BFF] mt-2">
              Thanks for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}