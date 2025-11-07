import { useState, useEffect } from "react";

export default function CompressionCalculator({ bore, stroke }) {
  const [compressionData, setCompressionData] = useState({
    combustionChamber: '50',
    gasketBore: bore ? (parseFloat(bore) + 1.5).toFixed(1) : '82',
    gasketThickness: '1.2',
    deckHeight: '0',
    pistonDomeVolume: '0'
  });

  const [results, setResults] = useState({
    cylinderVolume: 0,
    compressionRatio: 0,
    clearanceVolume: 0
  });

  useEffect(() => {
    if (bore && stroke) {
      calculateCompression();
    }
  }, [compressionData, bore, stroke]);

  useEffect(() => {
    // Update gasket bore when parent bore changes
    if (bore) {
      setCompressionData(prev => ({
        ...prev,
        gasketBore: (parseFloat(bore) + 1.5).toFixed(1)
      }));
    }
  }, [bore]);

  const calculateCompression = () => {
    const boreValue = parseFloat(bore);
    const strokeValue = parseFloat(stroke);
    const combustionChamber = parseFloat(compressionData.combustionChamber);
    const gasketBore = parseFloat(compressionData.gasketBore);
    const gasketThickness = parseFloat(compressionData.gasketThickness);
    const deckHeight = parseFloat(compressionData.deckHeight);
    const pistonDomeVolume = parseFloat(compressionData.pistonDomeVolume);

    if (isNaN(boreValue) || isNaN(strokeValue)) return;

    // Cylinder Volume (Swept Volume)
    const cylinderVolume = (Math.PI * Math.pow(boreValue / 2, 2) * strokeValue) / 1000;

    // Gasket Volume
    const gasketVolume = (Math.PI * Math.pow(gasketBore / 2, 2) * gasketThickness) / 1000;

    // Deck Volume
    const deckVolume = (Math.PI * Math.pow(boreValue / 2, 2) * deckHeight) / 1000;

    // Clearance Volume (Total)
    const clearanceVolume = combustionChamber + gasketVolume + deckVolume - pistonDomeVolume;

    // Compression Ratio
    const compressionRatio = clearanceVolume > 0 ? (cylinderVolume + clearanceVolume) / clearanceVolume : 0;

    setResults({
      cylinderVolume: Math.round(cylinderVolume * 100) / 100,
      compressionRatio: Math.round(compressionRatio * 100) / 100,
      clearanceVolume: Math.round(clearanceVolume * 100) / 100
    });
  };

  const handleInputChange = (field, value) => {
    setCompressionData({ ...compressionData, [field]: value });
  };

  const getCompressionLevel = (ratio) => {
    if (ratio < 8) return { text: 'Low Compression', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (ratio < 10) return { text: 'Standard Compression', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (ratio < 12) return { text: 'High Compression', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { text: 'Very High Compression', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const level = getCompressionLevel(results.compressionRatio);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Compression Ratio Calculator
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Calculate your engine's compression ratio using the bore and stroke values above. Essential for performance tuning and fuel requirements.
        </p>
      </div>

      {/* Main Result Display */}
      <div className={`${level.bg} ${level.border} border rounded-2xl p-8 mb-8 text-center`}>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Compression Ratio
        </p>
        <p className={`text-7xl md:text-8xl font-light ${level.color} mb-4 tracking-tight`}>
          {results.compressionRatio}:1
        </p>
        <p className={`text-lg font-semibold ${level.color}`}>
          {level.text}
        </p>
      </div>

      {/* Secondary Results */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Cylinder Volume
          </p>
          <p className="text-4xl font-light text-gray-900 mb-2">
            {results.cylinderVolume}
          </p>
          <p className="text-sm font-medium text-gray-600">
            Cubic Centimeters
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Clearance Volume
          </p>
          <p className="text-4xl font-light text-gray-900 mb-2">
            {results.clearanceVolume}
          </p>
          <p className="text-sm font-medium text-gray-600">
            Cubic Centimeters
          </p>
        </div>
      </div>

      {/* Input Fields - Simplified */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Engine Specifications
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Combustion Chamber Volume (cc)
            </label>
            <input
              type="number"
              step="0.1"
              value={compressionData.combustionChamber}
              onChange={(e) => handleInputChange('combustionChamber', e.target.value)}
              className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="50"
            />
            <p className="text-xs text-gray-500 mt-2">Volume of the cylinder head chamber</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Gasket Thickness (mm)
            </label>
            <input
              type="number"
              step="0.01"
              value={compressionData.gasketThickness}
              onChange={(e) => handleInputChange('gasketThickness', e.target.value)}
              className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="1.2"
            />
            <p className="text-xs text-gray-500 mt-2">Compressed thickness of head gasket</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Deck Height (mm)
            </label>
            <input
              type="number"
              step="0.01"
              value={compressionData.deckHeight}
              onChange={(e) => handleInputChange('deckHeight', e.target.value)}
              className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-2">Distance piston is below deck (positive value)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Piston Dome Volume (cc)
            </label>
            <input
              type="number"
              step="0.1"
              value={compressionData.pistonDomeVolume}
              onChange={(e) => handleInputChange('pistonDomeVolume', e.target.value)}
              className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-2">Positive for dome, negative for dish</p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Understanding Compression Ratio
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <span className="font-semibold text-blue-600 min-w-[80px]">6:1 - 8:1</span>
            <span>Low compression - Typical for turbocharged engines or low octane fuel</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-semibold text-green-600 min-w-[80px]">8:1 - 10:1</span>
            <span>Standard - Most production engines, regular gasoline (87-91 octane)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-semibold text-orange-600 min-w-[80px]">10:1 - 12:1</span>
            <span>High compression - Performance engines, premium fuel required (91-95 octane)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-semibold text-red-600 min-w-[80px]">12:1+</span>
            <span>Very high - Race engines, racing fuel or E85 required (100+ octane)</span>
          </div>
        </div>
      </div>

      {/* Formula Reference */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center font-mono">
          CR = (Cylinder Volume + Clearance Volume) / Clearance Volume
        </p>
      </div>
    </div>
  );
}