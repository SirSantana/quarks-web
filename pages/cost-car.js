// app/page.tsx
'use client'
import { Car, TrendingDown, Wrench, Shield, Fuel, FileText, DollarSign, Calendar, MapPin, Settings, ChevronDown, ChevronUp } from 'lucide-react'

import { useState, useMemo } from 'react'
import data from '../utils/seed.json'

export default function Home() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(null)
  const [trim, setTrim] = useState('')
  const [stateCode, setStateCode] = useState('CA')
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [milesPerYear, setMilesPerYear] = useState(12000)
  const [fuelPrice, setFuelPrice] = useState(3.50)
  const [downPayment, setDownPayment] = useState(5000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [drivingStyle, setDrivingStyle] = useState('normal') // normal, aggressive, conservative

  const brands = data.brands
  const states = data.states

  const selectedBrand = brands.find(b => b.name === brand)
  const selectedModel = selectedBrand?.models.find(m => m.name === model)
  const selectedGeneration = selectedModel?.generations.find(g => g.years.includes(year))
  const selectedTrim = selectedGeneration?.trims.find(t => t.name === trim)

  const totalCost = useMemo(() => {
    if (!selectedTrim) return null

    const o = selectedTrim.ownershipCost
    const taxes = o.taxesAndFees.byState[stateCode] ?? o.taxesAndFees.base

    // Calcular combustible basado en millas y precio
    const totalMiles = milesPerYear * 5
    const mpg = selectedTrim.mpg || 30
    const drivingMultiplier = drivingStyle === 'aggressive' ? 0.85 : drivingStyle === 'conservative' ? 1.15 : 1
    const adjustedMpg = mpg * drivingMultiplier
    const gallonsNeeded = totalMiles / adjustedMpg
    const fuelCost = Math.round(gallonsNeeded * fuelPrice)

    // Ajustar mantenimiento según millas
    const maintenanceMultiplier = milesPerYear / 12000
    const adjustedMaintenance = Math.round(o.maintenance * maintenanceMultiplier)
    const adjustedRepairs = Math.round(o.repairs * maintenanceMultiplier)

    // Calcular interés de financiamiento
    const purchasePrice = o.depreciation + 25000 // Estimado
    const loanAmount = Math.max(0, purchasePrice - downPayment)
    const monthlyRate = interestRate / 100 / 12
    const months = 60
    let totalInterest = 0
    
    if (loanAmount > 0 && monthlyRate > 0) {
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      totalInterest = Math.round((monthlyPayment * months) - loanAmount)
    }

    const total =
      o.depreciation +
      adjustedMaintenance +
      adjustedRepairs +
      o.insurance +
      fuelCost +
      taxes +
      totalInterest

    const breakdown = [
      { label: 'Depreciation', value: o.depreciation, icon: TrendingDown, color: 'text-rose-600' },
      { label: 'Insurance', value: o.insurance, icon: Shield, color: 'text-blue-600' },
      { label: 'Fuel', value: fuelCost, icon: Fuel, color: 'text-amber-600' },
      { label: 'Maintenance', value: adjustedMaintenance, icon: Wrench, color: 'text-emerald-600' },
      { label: 'Repairs', value: adjustedRepairs, icon: Car, color: 'text-purple-600' },
      { label: 'Taxes & Fees', value: taxes, icon: FileText, color: 'text-slate-600' },
      { label: 'Loan Interest', value: totalInterest, icon: DollarSign, color: 'text-indigo-600' }
    ]

    return { 
      ...o, 
      taxes, 
      total, 
      breakdown, 
      fuelCost, 
      adjustedMaintenance, 
      adjustedRepairs,
      totalInterest,
      totalMiles 
    }
  }, [selectedTrim, stateCode, milesPerYear, fuelPrice, downPayment, interestRate, drivingStyle])

  const monthlyAverage = totalCost ? Math.round(totalCost.total / 60) : 0
  const yearlyAverage = totalCost ? Math.round(totalCost.total / 5) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Car className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-900">TrueCost Auto</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL - Selector */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Calculate your true ownership cost
              </h2>
              <p className="text-slate-600 text-lg">
                The sticker price is just the start. Discover what your car really costs over 5 years.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Select your vehicle
              </h3>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Brand</label>
                <select 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={brand} 
                  onChange={e => { setBrand(e.target.value); setModel(''); setYear(null); setTrim('') }}
                >
                  <option value="">Choose a brand</option>
                  {brands.map(b => <option key={b.name}>{b.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Model</label>
                <select 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-slate-100 disabled:text-slate-400"
                  value={model} 
                  disabled={!brand} 
                  onChange={e => { setModel(e.target.value); setYear(null); setTrim('') }}
                >
                  <option value="">Choose a model</option>
                  {selectedBrand?.models.map(m => <option key={m.name}>{m.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Year
                  </label>
                  <select 
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-slate-100 disabled:text-slate-400"
                    value={year ?? ''} 
                    disabled={!model} 
                    onChange={e => { setYear(Number(e.target.value)); setTrim('') }}
                  >
                    <option value="">Year</option>
                    {selectedModel?.generations.flatMap(g => g.years).map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Trim</label>
                  <select 
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-slate-100 disabled:text-slate-400"
                    value={trim} 
                    disabled={!year} 
                    onChange={e => setTrim(e.target.value)}
                  >
                    <option value="">Trim</option>
                    {selectedGeneration?.trims.map(t => <option key={t.name}>{t.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Your State
                </label>
                <select 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={stateCode} 
                  onChange={e => setStateCode(e.target.value)}
                >
                  {Object.entries(states).map(([code, s]) => (
                    <option key={code} value={code}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Miles per year slider */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center justify-between">
                  <span>Annual Mileage</span>
                  <span className="text-blue-600 font-semibold">{milesPerYear.toLocaleString()} mi/year</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="1000"
                  value={milesPerYear}
                  onChange={e => setMilesPerYear(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5,000</span>
                  <span>30,000</span>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span className="font-semibold text-slate-900">Advanced Options</span>
                </div>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
              </button>

              {showAdvanced && (
                <div className="px-8 pb-8 space-y-5 border-t border-slate-100">
                  <div className="pt-5">
                    <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center justify-between">
                      <span>Fuel Price</span>
                      <span className="text-blue-600 font-semibold">${fuelPrice.toFixed(2)}/gal</span>
                    </label>
                    <input 
                      type="range" 
                      min="2" 
                      max="6" 
                      step="0.10"
                      value={fuelPrice}
                      onChange={e => setFuelPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$2.00</span>
                      <span>$6.00</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center justify-between">
                      <span>Down Payment</span>
                      <span className="text-blue-600 font-semibold">${downPayment.toLocaleString()}</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="20000" 
                      step="500"
                      value={downPayment}
                      onChange={e => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$0</span>
                      <span>$20,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center justify-between">
                      <span>Interest Rate</span>
                      <span className="text-blue-600 font-semibold">{interestRate.toFixed(1)}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="2" 
                      max="12" 
                      step="0.5"
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>2%</span>
                      <span>12%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Driving Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['conservative', 'normal', 'aggressive'].map(style => (
                        <button
                          key={style}
                          onClick={() => setDrivingStyle(style)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                            drivingStyle === style 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {drivingStyle === 'conservative' && '🌿 Better fuel economy, +15% MPG'}
                      {drivingStyle === 'normal' && '⚖️ Standard fuel economy'}
                      {drivingStyle === 'aggressive' && '⚡ Reduced fuel economy, -15% MPG'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!totalCost && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-blue-900 text-sm">
                  💡 <strong>Pro tip:</strong> Adjust the annual mileage slider to match your driving habits. The average American drives 12,000 miles per year.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Results */}
          <div>
            {totalCost ? (
              <div className="space-y-6">
                {/* Total Cost Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">5-Year Total Cost</p>
                      <p className="text-5xl font-bold">
                        ${totalCost.total.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-12 h-12 text-blue-300 opacity-80" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-500">
                    <div>
                      <p className="text-blue-200 text-xs mb-1">Per Year</p>
                      <p className="text-2xl font-semibold">${yearlyAverage.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs mb-1">Per Month</p>
                      <p className="text-2xl font-semibold">${monthlyAverage.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-500">
                    <p className="text-blue-200 text-xs mb-1">Total Miles</p>
                    <p className="text-xl font-semibold">{totalCost.totalMiles.toLocaleString()} miles</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3">
                    {totalCost.breakdown.map((item, idx) => {
                      const Icon = item.icon
                      const percentage = ((item.value / totalCost.total) * 100).toFixed(1)
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-slate-700">{item.label}</span>
                              <span className="text-sm font-bold text-slate-900">${item.value.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 w-12 text-right">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Hidden Costs */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                    ⚠️ Important Considerations
                  </h3>
                  <ul className="space-y-3">
                    {selectedTrim.hiddenCosts.map((cost, i) => (
                      <li key={i} className="flex gap-3 text-sm text-amber-900">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info Card */}
                <div className="bg-slate-100 rounded-xl p-5 text-sm text-slate-600">
                  <p className="mb-2">
                    <strong className="text-slate-900">Selected:</strong> {brand} {model} {year} {trim}
                  </p>
                  <p className="mb-2">
                    <strong className="text-slate-900">Location:</strong> {states[stateCode].name}
                  </p>
                  <p>
                    <strong className="text-slate-900">Driving:</strong> {milesPerYear.toLocaleString()} mi/year ({drivingStyle})
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Car className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Ready to calculate?
                </h3>
                <p className="text-slate-600 max-w-sm">
                  Select your vehicle details on the left to see the complete 5-year ownership cost breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}