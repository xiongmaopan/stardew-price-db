const fs = require('fs');
const path = require('path');

const calcDir = path.join(__dirname, '..', 'app', 'calculator', '[season]');

// Ensure directory exists
if (!fs.existsSync(calcDir)) {
  fs.mkdirSync(calcDir, { recursive: true });
}

// page.js content
const pageContent = `import itemsData from '@/data/items.json';
import CalculatorClient from './CalculatorClient';

const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];

export async function generateStaticParams() {
  return VALID_SEASONS.map((season) => ({
    season: season,
  }));
}

export async function generateMetadata({ params }) {
  const season = params.season.toLowerCase();
  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);
  
  if (!VALID_SEASONS.includes(season)) {
    return { title: 'Calculator Not Found' };
  }

  return {
    title: \`\${seasonCapitalized} Crop Profit Calculator - Stardew Valley 1.6 | Best Crops & Gold/Day\`,
    description: \`Find the most profitable \${seasonCapitalized} crops in Stardew Valley 1.6. Compare gold per day with Tiller, Artisan, fertilizers.\`,
    keywords: [
      \`\${seasonCapitalized} crops Stardew Valley\`,
      \`best \${season} crops\`,
      \`\${season} profit calculator\`,
      'Stardew Valley gold per day',
      'most profitable crops'
    ],
    openGraph: {
      title: \`\${seasonCapitalized} Crop Profit Calculator - Stardew Valley\`,
      description: \`Calculate the best \${season} crops for maximum profit.\`,
      type: 'website',
    },
  };
}

function generateJsonLd(season) {
  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: \`\${seasonCapitalized} Crop Profit Calculator\`,
    description: \`Interactive profit calculator for \${season} crops in Stardew Valley\`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser'
  };
}

export default function CalculatorPage({ params }) {
  const season = params.season.toLowerCase();
  
  if (!VALID_SEASONS.includes(season)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Season Not Found</h1>
          <p className="text-slate-500 mt-2">Please select a valid season.</p>
        </div>
      </div>
    );
  }

  const seasonCrops = itemsData.items.filter(item => 
    item.category === 'Crops' && 
    item.season && 
    item.season.map(s => s.toLowerCase()).includes(season)
  );

  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(season)) }}
      />
      <CalculatorClient 
        season={season} 
        seasonCapitalized={seasonCapitalized}
        crops={seasonCrops} 
        fertilizers={itemsData.fertilizers}
        allSeasons={VALID_SEASONS}
      />
    </>
  );
}
`;

// CalculatorClient.js content
const clientContent = `'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, TrendingUp, Leaf, ArrowUpDown,
  Sun, Cloud, Snowflake, Flower, Warehouse, Info
} from 'lucide-react';
import { useProfessions } from '@/components/ProfessionContext';
import ProfessionToggle from '@/components/ProfessionToggle';
import {
  calculateGrowthTime,
  calculateSeasonProfit,
  calculateArtisanProfit,
  getFertilizer
} from '@/lib/calculator';

const SEASON_ICONS = {
  spring: <Flower className="text-pink-500" size={20} />,
  summer: <Sun className="text-yellow-500" size={20} />,
  fall: <Leaf className="text-orange-500" size={20} />,
  winter: <Snowflake className="text-blue-400" size={20} />,
  greenhouse: <Warehouse className="text-green-600" size={20} />
};

const SEASON_COLORS = {
  spring: 'bg-pink-50 border-pink-200 text-pink-700',
  summer: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  fall: 'bg-orange-50 border-orange-200 text-orange-700',
  winter: 'bg-blue-50 border-blue-200 text-blue-700',
  greenhouse: 'bg-green-50 border-green-200 text-green-700'
};

export default function CalculatorClient({ season, seasonCapitalized, crops, fertilizers, allSeasons }) {
  const professions = useProfessions();
  const [selectedFertilizer, setSelectedFertilizer] = useState('none');
  const [sortBy, setSortBy] = useState('profitPerDay');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showRegrowOnly, setShowRegrowOnly] = useState(false);

  const cropProfits = useMemo(() => {
    return crops
      .map(crop => {
        const profit = calculateSeasonProfit(crop, selectedFertilizer, professions);
        const artisan = calculateArtisanProfit(crop, professions);
        return profit ? { ...profit, artisanOptions: artisan } : null;
      })
      .filter(p => p !== null)
      .filter(p => !showRegrowOnly || p.item.regrows);
  }, [crops, selectedFertilizer, professions, showRegrowOnly]);

  const sortedCrops = useMemo(() => {
    return [...cropProfits].sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'profitPerDay': aVal = a.profitPerDay; bVal = b.profitPerDay; break;
        case 'totalProfit': aVal = a.totalProfit; bVal = b.totalProfit; break;
        case 'harvests': aVal = a.harvests; bVal = b.harvests; break;
        case 'growthTime': aVal = a.growthTime; bVal = b.growthTime; break;
        case 'name':
          aVal = a.item.name; bVal = b.item.name;
          return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        default: aVal = a.profitPerDay; bVal = b.profitPerDay;
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [cropProfits, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const fertilizerInfo = getFertilizer(selectedFertilizer);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <span>Calculator</span>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-gray-800">{seasonCapitalized}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
              {SEASON_ICONS[season]}
              {seasonCapitalized} Crop Profit Calculator
            </h1>
            <p className="text-slate-500 mt-2">
              Find the most profitable crops for {season} season. Calculations include seed costs and fertilizer.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allSeasons.map(s => (
              <Link
                key={s}
                href={\`/calculator/\${s}\`}
                className={\`px-3 py-2 rounded-lg border text-sm font-medium transition-all \${
                  s === season 
                    ? SEASON_COLORS[s] + ' ring-2 ring-offset-1 ring-current'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }\`}
              >
                <span className="flex items-center gap-1.5">
                  {SEASON_ICONS[s]}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ProfessionToggle />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Leaf size={16} className="text-green-600" />
            Fertilizer
          </h3>
          <select
            value={selectedFertilizer}
            onChange={(e) => setSelectedFertilizer(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fertilizers.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} {f.growthBonus > 0 ? \`(-\${Math.round(f.growthBonus * 100)}% growth)\` : ''} 
                {f.qualityBonus > 0 ? \`(+Quality Lv\${f.qualityBonus})\` : ''}
              </option>
            ))}
          </select>
          {fertilizerInfo.cost > 0 && (
            <p className="text-xs text-slate-500 mt-2">Cost: {fertilizerInfo.cost}g per tile</p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRegrowOnly}
              onChange={(e) => setShowRegrowOnly(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-600">Show regrow crops only</span>
          </label>
          <div className="flex-grow" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Info size={14} />
            <span>Click column headers to sort</span>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600">
                    Crop <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button onClick={() => toggleSort('growthTime')} className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 ml-auto">
                    Growth <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button onClick={() => toggleSort('harvests')} className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 ml-auto">
                    Harvests <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button onClick={() => toggleSort('totalProfit')} className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 ml-auto">
                    Total Profit <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button onClick={() => toggleSort('profitPerDay')} className="flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 ml-auto">
                    Gold/Day <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-center">Artisan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCrops.map((crop, index) => (
                <tr key={crop.item.id} className={\`hover:bg-slate-50 transition \${index < 3 ? 'bg-green-50/30' : ''}\`}>
                  <td className="px-4 py-3">
                    <Link href={\`/item/\${crop.item.slug}\`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition">
                        <Leaf size={20} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition">
                          {index < 3 && <span className="text-yellow-500 mr-1">#{index + 1}</span>}
                          {crop.item.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {crop.item.regrows ? '↻ Regrows' : 'Single harvest'}
                          {crop.item.harvestYield > 1 && \` • \${crop.item.harvestYield}x yield\`}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-slate-700">{crop.growthTime} days</span>
                    {crop.item.regrows && <div className="text-xs text-slate-500">+{crop.item.regrowTime}d regrow</div>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-slate-700">{crop.harvests}x</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={\`font-bold \${crop.totalProfit >= 0 ? 'text-green-600' : 'text-red-500'}\`}>
                      {crop.totalProfit >= 0 ? '+' : ''}{crop.totalProfit}g
                    </span>
                    <div className="text-xs text-slate-500">Revenue: {crop.totalRevenue}g</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={\`text-lg font-black \${crop.profitPerDay >= 0 ? 'text-green-600' : 'text-red-500'}\`}>
                      {crop.profitPerDay.toFixed(1)}g
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {crop.artisanOptions && crop.artisanOptions.length > 0 ? (
                      <div className="text-xs">
                        {crop.artisanOptions.map((opt, i) => (
                          <div key={i} className="text-slate-600">
                            <span className="font-medium">{opt.product}</span>
                            <br />
                            <span className="text-green-600">{opt.artisanPrice}g</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedCrops.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No crops found for this season with current filters.
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          {seasonCapitalized} Farming Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div className="bg-white/60 rounded-lg p-4">
            <h3 className="font-semibold text-slate-700 mb-2">💰 Maximize Profit</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Regrow crops have higher gold/day after first harvest</li>
              <li>Use Speed-Gro to get extra harvests per season</li>
              <li>Process high-value crops into Wine with Artisan profession</li>
            </ul>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <h3 className="font-semibold text-slate-700 mb-2">⚡ Pro Strategies</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Tiller (+10%) applies to raw crops sold</li>
              <li>Artisan (+40%) applies to Keg and Jar products</li>
              <li>Quality Fertilizer increases average sell price</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Internal Links */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Explore More Seasons</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {allSeasons.filter(s => s !== season).map(s => (
            <Link
              key={s}
              href={\`/calculator/\${s}\`}
              className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition text-sm font-medium text-slate-700"
            >
              {SEASON_ICONS[s]}
              {s.charAt(0).toUpperCase() + s.slice(1)} Calculator
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

// Write files
fs.writeFileSync(path.join(calcDir, 'page.js'), pageContent, 'utf8');
console.log('Created page.js');

fs.writeFileSync(path.join(calcDir, 'CalculatorClient.js'), clientContent, 'utf8');
console.log('Created CalculatorClient.js');

console.log('Done!');
