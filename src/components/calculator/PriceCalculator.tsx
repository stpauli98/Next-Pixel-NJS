'use client';

import React, { useState } from 'react';

interface CalculatorOptions {
  projectType: string;
  pages: number;
  features: string[];
  design: string;
  timeline: string;
}

const PriceCalculator: React.FC = () => {
  const [options, setOptions] = useState<CalculatorOptions>({
    projectType: 'website',
    pages: 5,
    features: [],
    design: 'template',
    timeline: 'normal',
  });

  const [showPrice, setShowPrice] = useState(false);

  const projectTypes = {
    website: { base: 400, perPage: 50, name: 'Web Stranica' },
    ecommerce: { base: 1500, perPage: 30, name: 'Online Prodavnica' },
    webapp: { base: 2500, perPage: 100, name: 'Web Aplikacija' },
    mobile: { base: 3500, perPage: 150, name: 'Mobilna Aplikacija' },
  };

  const features = [
    { id: 'cms', name: 'CMS Sistem', price: 300 },
    { id: 'seo', name: 'SEO Optimizacija', price: 200 },
    { id: 'multilang', name: 'Višejezičnost', price: 250 },
    { id: 'payment', name: 'Online Plaćanje', price: 400 },
    { id: 'booking', name: 'Sistem Rezervacija', price: 350 },
    { id: 'chat', name: 'Live Chat', price: 150 },
    { id: 'analytics', name: 'Napredna Analitika', price: 200 },
    { id: 'email', name: 'Email Marketing', price: 250 },
  ];

  const designMultipliers = {
    template: { mult: 1, name: 'Template Dizajn' },
    custom: { mult: 1.5, name: 'Custom Dizajn' },
    premium: { mult: 2, name: 'Premium Dizajn' },
  };

  const timelineMultipliers = {
    slow: { mult: 0.9, name: '1-2 mjeseca' },
    normal: { mult: 1, name: '2-3 sedmice' },
    fast: { mult: 1.3, name: '7 dana (HITNO)' },
    express: { mult: 1.5, name: '3-5 dana (EXPRESS)' },
  };

  const calculatePrice = () => {
    const project = projectTypes[options.projectType as keyof typeof projectTypes];
    let price = project.base + (options.pages * project.perPage);
    
    // Dodaj features
    options.features.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) price += feature.price;
    });
    
    // Primijeni design multiplier
    price *= designMultipliers[options.design as keyof typeof designMultipliers].mult;
    
    // Primijeni timeline multiplier
    price *= timelineMultipliers[options.timeline as keyof typeof timelineMultipliers].mult;
    
    return Math.round(price);
  };

  const handleFeatureToggle = (featureId: string) => {
    setOptions(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">💻</span>
        <h2 className="text-2xl font-bold">Kalkulator Cijene</h2>
      </div>
      
      {/* Tip Projekta */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Tip Projekta</label>
        <select
          value={options.projectType}
          onChange={(e) => setOptions({ ...options, projectType: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {Object.entries(projectTypes).map(([key, value]) => (
            <option key={key} value={key}>{value.name}</option>
          ))}
        </select>
      </div>

      {/* Broj Stranica */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Broj Stranica/Ekrana: {options.pages}
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={options.pages}
          onChange={(e) => setOptions({ ...options, pages: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Funkcionalnosti */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Dodatne Funkcionalnosti</label>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <label
              key={feature.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                options.features.includes(feature.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={options.features.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
                className="sr-only"
              />
              <span
                className={`mr-2 ${
                  options.features.includes(feature.id)
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                ✓
              </span>
              <span className="text-sm">
                {feature.name} <span className="text-gray-500">(+€{feature.price})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dizajn */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Nivo Dizajna</label>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(designMultipliers).map(([key, value]) => (
            <label
              key={key}
              className={`p-3 border rounded-lg text-center cursor-pointer transition ${
                options.design === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="design"
                value={key}
                checked={options.design === key}
                onChange={(e) => setOptions({ ...options, design: e.target.value })}
                className="sr-only"
              />
              <div className="font-medium">{value.name}</div>
              <div className="text-xs text-gray-500">x{value.mult}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Rok Izrade */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Rok Izrade</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(timelineMultipliers).map(([key, value]) => (
            <label
              key={key}
              className={`p-3 border rounded-lg text-center cursor-pointer transition ${
                options.timeline === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={key}
                checked={options.timeline === key}
                onChange={(e) => setOptions({ ...options, timeline: e.target.value })}
                className="sr-only"
              />
              <div className="font-medium">{value.name}</div>
              {value.mult > 1 && (
                <div className="text-xs text-red-500">+{Math.round((value.mult - 1) * 100)}%</div>
              )}
              {value.mult < 1 && (
                <div className="text-xs text-green-500">-{Math.round((1 - value.mult) * 100)}%</div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Cijena */}
      <button
        onClick={() => setShowPrice(!showPrice)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {showPrice ? 'Sakrij Cijenu' : 'Izračunaj Cijenu'}
      </button>

      {showPrice && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
          <div className="text-center">
            <p className="text-lg opacity-90">Okvirna Cijena Projekta</p>
            <p className="text-4xl font-bold my-2">€{calculatePrice()}</p>
            <p className="text-sm opacity-90">+ PDV (ako je primjenjivo)</p>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <p>✓ Besplatne konsultacije</p>
            <p>✓ Mogućnost plaćanja na rate</p>
            <p>✓ 30 dana garancije</p>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">
        * Ova cijena je okvirna. Konačna cijena će biti određena nakon detaljne analize projekta.
      </p>
    </div>
  );
};

export default PriceCalculator;