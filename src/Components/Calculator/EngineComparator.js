import { useState, useEffect } from "react";

export default function EngineComparator() {
  const [engines, setEngines] = useState([
    {
      id: 1,
      name: 'Engine 1',
      bore: '80.5',
      stroke: '79.5',
      cylinders: 4,
      compressionRatio: '10.5'
    },
    {
      id: 2,
      name: 'Engine 2',
      bore: '86',
      stroke: '86',
      cylinders: 4,
      compressionRatio: '11.0'
    }
  ]);

  const [results, setResults] = useState([]);

  useEffect(() => {
    calculateAllEngines();
  }, [engines]);

  const calculateAllEngines = () => {
    const calculatedResults = engines.map(engine => {
      const bore = parseFloat(engine.bore);
      const stroke = parseFloat(engine.stroke);
      const cylinders = parseInt(engine.cylinders);
      const cr = parseFloat(engine.compressionRatio);

      // Displacement per cylinder
      const cylinderVolume = (Math.PI * Math.pow(bore / 2, 2) * stroke) / 1000;
      
      // Total displacement
      const totalDisplacement = cylinderVolume * cylinders;

      // Bore/Stroke ratio
      const boreStrokeRatio = bore / stroke;

      // Estimated HP (rough formula: displacement * 0.5 * compression ratio factor)
      const estimatedHP = totalDisplacement * 0.5 * (cr / 10);

      // Estimated Torque (rough formula)
      const estimatedTorque = totalDisplacement * 0.8 * (cr / 10);

      return {
        ...engine,
        cylinderVolume: Math.round(cylinderVolume * 100) / 100,
        totalDisplacement: Math.round(totalDisplacement * 100) / 100,
        boreStrokeRatio: Math.round(boreStrokeRatio * 100) / 100,
        engineType: boreStrokeRatio > 1.05 ? 'Oversquare' : boreStrokeRatio < 0.95 ? 'Undersquare' : 'Square',
        estimatedHP: Math.round(estimatedHP),
        estimatedTorque: Math.round(estimatedTorque)
      };
    });

    setResults(calculatedResults);
  };

  const handleInputChange = (id, field, value) => {
    setEngines(engines.map(engine => 
      engine.id === id ? { ...engine, [field]: value } : engine
    ));
  };

  const addEngine = () => {
    if (engines.length < 3) {
      setEngines([...engines, {
        id: Date.now(),
        name: `Engine ${engines.length + 1}`,
        bore: '80',
        stroke: '80',
        cylinders: 4,
        compressionRatio: '10.0'
      }]);
    }
  };

  const removeEngine = (id) => {
    if (engines.length > 2) {
      setEngines(engines.filter(engine => engine.id !== id));
    }
  };

  const getBestEngine = (metric) => {
    if (results.length === 0) return null;
    return results.reduce((best, current) => 
      current[metric] > best[metric] ? current : best
    );
  };

  const getEngineColor = (index) => {
    const colors = [
      { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600', accent: 'bg-blue-500' },
      { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600', accent: 'bg-purple-500' },
      { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600', accent: 'bg-orange-500' }
    ];
    return colors[index % 3];
  };

  return (
    <div className="w-full mt-48 mb-48">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Engine Comparator
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Compare up to 3 different engine configurations side by side. Perfect for deciding between engine builds or comparing different vehicles.
        </p>
      </div>

      {/* Engines Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {engines.map((engine, index) => {
          const color = getEngineColor(index);
          const result = results.find(r => r.id === engine.id);
          
          return (
            <div key={engine.id} className={`${color.bg} border-2 ${color.border} rounded-2xl p-6 relative`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <input
                  type="text"
                  value={engine.name}
                  onChange={(e) => handleInputChange(engine.id, 'name', e.target.value)}
                  className={`text-xl font-semibold ${color.text} bg-transparent border-none focus:outline-none w-full`}
                  placeholder="Engine Name"
                />
                {engines.length > 2 && (
                  <button
                    onClick={() => removeEngine(engine.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Main Result */}
              {result && (
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Total Displacement
                  </p>
                  <p className={`text-5xl font-light ${color.text}`}>
                    {result.totalDisplacement}
                  </p>
                  <p className="text-sm font-medium text-gray-600 mt-1">
                    cc ({(result.totalDisplacement / 1000).toFixed(2)}L)
                  </p>
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Bore (mm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={engine.bore}
                    onChange={(e) => handleInputChange(engine.id, 'bore', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Stroke (mm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={engine.stroke}
                    onChange={(e) => handleInputChange(engine.id, 'stroke', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Cylinders
                  </label>
                  <input
                    type="number"
                    value={engine.cylinders}
                    onChange={(e) => handleInputChange(engine.id, 'cylinders', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Compression Ratio
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={engine.compressionRatio}
                    onChange={(e) => handleInputChange(engine.id, 'compressionRatio', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>
              </div>

              {/* Stats */}
              {result && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Bore/Stroke:</span>
                    <span className={`text-sm font-semibold ${color.text}`}>
                      {result.boreStrokeRatio} ({result.engineType})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Est. HP:</span>
                    <span className={`text-sm font-semibold ${color.text}`}>
                      ~{result.estimatedHP} hp
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">Est. Torque:</span>
                    <span className={`text-sm font-semibold ${color.text}`}>
                      ~{result.estimatedTorque} Nm
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Engine Button */}
        {engines.length < 3 && (
          <button
            onClick={addEngine}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px] hover:border-gray-400 hover:bg-gray-50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-all">
              <span className="text-3xl text-gray-400 group-hover:text-gray-600">+</span>
            </div>
            <p className="text-lg font-semibold text-gray-600 group-hover:text-gray-900">
              Add Engine
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Compare up to 3 engines
            </p>
          </button>
        )}
      </div>

      {/* Comparison Chart */}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Performance Comparison
          </h3>

          <div className="space-y-8">
            {/* Displacement Comparison */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Total Displacement (cc)</p>
                <p className="text-sm text-gray-500">
                  Winner: {getBestEngine('totalDisplacement')?.name}
                </p>
              </div>
              <div className="space-y-2">
                {results.map((result, index) => {
                  const color = getEngineColor(index);
                  const best = getBestEngine('totalDisplacement');
                  const percentage = (result.totalDisplacement / best.totalDisplacement) * 100;
                  
                  return (
                    <div key={result.id} className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${color.text} w-20`}>
                        {result.name}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div
                          className={`${color.accent} h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {result.totalDisplacement} cc
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HP Comparison */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Estimated Horsepower</p>
                <p className="text-sm text-gray-500">
                  Winner: {getBestEngine('estimatedHP')?.name}
                </p>
              </div>
              <div className="space-y-2">
                {results.map((result, index) => {
                  const color = getEngineColor(index);
                  const best = getBestEngine('estimatedHP');
                  const percentage = (result.estimatedHP / best.estimatedHP) * 100;
                  
                  return (
                    <div key={result.id} className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${color.text} w-20`}>
                        {result.name}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div
                          className={`${color.accent} h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs font-semibold text-white">
                            ~{result.estimatedHP} hp
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Torque Comparison */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Estimated Torque (Nm)</p>
                <p className="text-sm text-gray-500">
                  Winner: {getBestEngine('estimatedTorque')?.name}
                </p>
              </div>
              <div className="space-y-2">
                {results.map((result, index) => {
                  const color = getEngineColor(index);
                  const best = getBestEngine('estimatedTorque');
                  const percentage = (result.estimatedTorque / best.estimatedTorque) * 100;
                  
                  return (
                    <div key={result.id} className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${color.text} w-20`}>
                        {result.name}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div
                          className={`${color.accent} h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs font-semibold text-white">
                            ~{result.estimatedTorque} Nm
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              * HP and Torque are rough estimates based on displacement and compression ratio. Actual values depend on many factors including cam profile, fuel system, and tune.
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Comparison Tips
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Oversquare engines</strong> (Bore &gt; Stroke) favor high RPM and horsepower - better for racing</p>
          <p><strong>Undersquare engines</strong> (Stroke &gt; Bore) favor low-end torque - better for towing and fuel economy</p>
          <p><strong>Higher compression ratios</strong> generally produce more power but require higher octane fuel</p>
          <p><strong>Larger displacement</strong> typically means more power and torque across the RPM range</p>
        </div>
      </div>
    </div>
  );
}