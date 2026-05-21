'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useProfessions } from '@/components/ProfessionContext';
import itemsData from '@/data/items.json';

// 肥料数据
const FERTILIZERS = [
  { id: 'none', name: 'No Fertilizer', growthBonus: 0, qualityBonus: 0, cost: 0 },
  { id: 'basic', name: 'Basic Fertilizer', growthBonus: 0, qualityBonus: 1, cost: 100 },
  { id: 'quality', name: 'Quality Fertilizer', growthBonus: 0, qualityBonus: 2, cost: 150 },
  { id: 'deluxe', name: 'Deluxe Fertilizer', growthBonus: 0, qualityBonus: 3, cost: 0 }, // crafted only
  { id: 'speed-gro', name: 'Speed-Gro', growthBonus: 0.10, qualityBonus: 0, cost: 100 },
  { id: 'deluxe-speed-gro', name: 'Deluxe Speed-Gro', growthBonus: 0.25, qualityBonus: 0, cost: 150 },
  { id: 'hyper-speed-gro', name: 'Hyper Speed-Gro', growthBonus: 0.33, qualityBonus: 0, cost: 0 }, // crafted only
];

function calculateQualityRatios(fertilizerLevel, farmingLevel = 10) {
  const goldBase = 0.2 * (farmingLevel / 10.0) + 0.2 * fertilizerLevel * ((farmingLevel + 2) / 12.0) + 0.01;

  const ratioI = fertilizerLevel >= 3 ? goldBase / 2 : 0;
  const ratioG = goldBase * (1.0 - ratioI);

  if (fertilizerLevel >= 3) {
    return {
      normal: 0,
      silver: Math.max(0, 1.0 - ratioG - ratioI),
      gold: ratioG,
      iridium: ratioI,
    };
  }

  const ratioS = Math.max(0, Math.min(0.75, goldBase * 2.0) * (1.0 - ratioG));
  const ratioN = Math.max(0, 1.0 - ratioS - ratioG - ratioI);

  return { normal: ratioN, silver: ratioS, gold: ratioG, iridium: ratioI };
}

const QUALITY_MULTIPLIERS = {
  normal: 1.0,
  silver: 1.25,
  gold: 1.5,
  iridium: 2.0,
};

const SEASON_DAYS = 28;

function applyArtisanBonus(value) {
  return Math.floor((value * 14) / 10);
}

function applyTillerBonus(value, hasTiller) {
  return hasTiller ? Math.floor((value * 11) / 10) : value;
}

function qualityPrice(basePrice, quality, hasTiller = false) {
  return applyTillerBonus(Math.floor(basePrice * QUALITY_MULTIPLIERS[quality]), hasTiller);
}

function expectedQualityPrice(basePrice, qualityDist, hasTiller = false) {
  return Object.entries(qualityDist).reduce(
    (sum, [quality, ratio]) => sum + qualityPrice(basePrice, quality, hasTiller) * ratio,
    0
  );
}

function getGrowthTime(baseGrowthTime, fertilizer, hasAgriculturist) {
  const growthBonus = (fertilizer.growthBonus || 0) + (hasAgriculturist ? 0.10 : 0);
  return Math.max(1, Math.floor(baseGrowthTime * Math.max(0.1, 1 - growthBonus)));
}

function formatNumber(value, digits = 0) {
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

const SEASON_LABELS = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
  greenhouse: 'Greenhouse'
};

const ALL_SEASONS = ['spring', 'summer', 'fall', 'greenhouse'];

// Icon components
function SeasonIcon({ season }) {
  const icons = { spring: "🌸", summer: "☀️", fall: "🍂", winter: "❄️", greenhouse: "🏠" };
  return <span>{icons[season] || "🌱"}</span>;
}

function CropSprite({ slug, name, size = 32 }) {
  const [format, setFormat] = useState('webp');
  if (format === 'error') {
    return <div className="flex items-center justify-center" style={{ width: size, height: size }}>🌱</div>;
  }
  return (
    <img
      src={`/images/items/${slug}.${format}`}
      alt={name}
      width={size}
      height={size}
      className="object-contain"
      style={{ imageRendering: 'pixelated' }}
      onError={() => format === 'webp' ? setFormat('png') : setFormat('error')}
    />
  );
}

export default function CalculatorClient({ season, seasonCapitalized }) {
  const professionContext = useProfessions();
  const [mounted, setMounted] = useState(false);
  
  // Calculator inputs
  const [selectedCropSlug, setSelectedCropSlug] = useState('');
  const [plotCount, setPlotCount] = useState(100);
  const [startDay, setStartDay] = useState(1);
  const [selectedFertilizerId, setSelectedFertilizerId] = useState('none');
  const [sellMethod, setSellMethod] = useState('raw'); // raw, keg, jar
  const [farmingLevel, setFarmingLevel] = useState(10);
  const [includeSeedCost, setIncludeSeedCost] = useState(true);
  const [includeFertilizerCost, setIncludeFertilizerCost] = useState(true);
  
  // Comparison mode
  const [comparisonCrops, setComparisonCrops] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter crops by season
  const crops = useMemo(() => {
    if (season === 'greenhouse') {
      return itemsData.items.filter(item => 
        item.category === 'Crops' && item.season && item.season.length > 0
      );
    }
    return itemsData.items.filter(item => 
      item.category === 'Crops' && 
      item.season && 
      item.season.map(s => s.toLowerCase()).includes(season)
    );
  }, [season]);

  const selectedCrop = useMemo(() => 
    crops.find(c => c.slug === selectedCropSlug), 
    [crops, selectedCropSlug]
  );

  const selectedFertilizer = useMemo(() => 
    FERTILIZERS.find(f => f.id === selectedFertilizerId) || FERTILIZERS[0],
    [selectedFertilizerId]
  );

  // Calculate profit for a single crop
  const calculateCropProfit = (crop, plots, startingDay, fertilizer, method) => {
    if (!crop) return null;

    const daysRemaining = season === 'greenhouse' ? 112 : SEASON_DAYS - startingDay + 1; // 4 seasons for greenhouse
    
    const growthTime = getGrowthTime(crop.growthTime, fertilizer, professionContext.agriculturist);
    let harvests = 0;
    let currentDay = startingDay + growthTime;
    
    const maxDay = season === 'greenhouse' ? startingDay + 111 : SEASON_DAYS;
    
    if (currentDay <= maxDay) {
      harvests = 1;
      
      if (crop.regrows && crop.regrowTime) {
        // Regrowing crop: add regrow time for each subsequent harvest
        while (currentDay + crop.regrowTime <= maxDay) {
          currentDay += crop.regrowTime;
          harvests++;
        }
      } else {
        // Non-regrowing crop: need to replant (full growth time each time)
        while (currentDay + growthTime <= maxDay) {
          currentDay += growthTime;
          harvests++;
        }
      }
    }

    if (harvests === 0) {
      return {
        crop,
        plots,
        harvests: 0,
        totalYield: 0,
        grossRevenue: 0,
        seedCost: 0,
        fertilizerCost: 0,
        totalCost: 0,
        netProfit: 0,
        profitPerPlot: 0,
        profitPerDay: 0,
        daysUsed: daysRemaining,
        error: 'Not enough days to harvest'
      };
    }

    const baseYield = crop.harvestYield || 1;
    const extraYield = (crop.extraHarvestChance || 0) * (crop.extraHarvestYield || 1);
    const yieldPerHarvest = baseYield + extraYield;
    const totalYield = plots * harvests * yieldPerHarvest;

    const qualityLevel = fertilizer.qualityBonus;
    const qualityDist = calculateQualityRatios(qualityLevel, farmingLevel);
    const qualityAdjustedUnitPrice = expectedQualityPrice(crop.basePrice, qualityDist, professionContext.tiller);
    const normalUnitPrice = qualityPrice(crop.basePrice, 'normal', professionContext.tiller);
    const rawRevenuePerPlotHarvest = qualityAdjustedUnitPrice + Math.max(0, yieldPerHarvest - 1) * normalUnitPrice;
    const rawAveragePricePerItem = rawRevenuePerPlotHarvest / yieldPerHarvest;

    let pricePerItem = rawAveragePricePerItem;
    let processingTime = 0;
    let processorName = '';
    let processingNote = '';
    let processingBatches = 0;
    let grossRevenue = plots * harvests * rawRevenuePerPlotHarvest;
    
    if (method === 'keg' && crop.processing && crop.processing.kegPrice) {
      // Special case: Coffee Bean needs 5 beans per coffee
      if (crop.slug === 'coffee-bean') {
        const coffeeBatches = Math.floor(totalYield / 5);
        const leftoverBeans = totalYield - coffeeBatches * 5;
        processingBatches = coffeeBatches;
        grossRevenue = coffeeBatches * crop.processing.kegPrice + leftoverBeans * rawAveragePricePerItem;
        // 5 beans → 1 coffee (150g), so per-bean value is 150/5 = 30g
        pricePerItem = totalYield > 0 ? grossRevenue / totalYield : 0;
        processorName = 'Coffee';
        processingNote = leftoverBeans > 0
          ? `5 beans -> 1 Coffee; ${formatNumber(leftoverBeans, 2)} leftover beans sold raw. Coffee does not receive Artisan.`
          : '5 beans -> 1 Coffee. Coffee does not receive Artisan.';
      } else {
        pricePerItem = crop.processing.kegPrice;
        processorName = crop.subcategory === 'Vegetable' ? 'Juice' : 'Wine';
        processingBatches = totalYield;
      }
      processingTime = crop.processing.kegTime || 0;
      if (professionContext.artisan && crop.slug !== 'coffee-bean') {
        pricePerItem = applyArtisanBonus(pricePerItem);
      }
      grossRevenue = totalYield * pricePerItem;
      if (crop.slug === 'coffee-bean') {
        processingNote = totalYield % 5 > 0
          ? `5 beans -> 1 Coffee; ${formatNumber(totalYield % 5, 2)} leftover beans sold raw. Coffee does not receive Artisan.`
          : '5 beans -> 1 Coffee. Coffee does not receive Artisan.';
      }
    } else if (method === 'jar' && crop.processing && crop.processing.jarPrice) {
      pricePerItem = crop.processing.jarPrice;
      processingTime = crop.processing.jarTime || 3;
      processorName = crop.subcategory === 'Vegetable' ? 'Pickles' : 'Jelly';
      processingBatches = totalYield;
      if (professionContext.artisan) {
        pricePerItem = applyArtisanBonus(pricePerItem);
      }
      grossRevenue = totalYield * pricePerItem;
    } else if (method !== 'raw') {
      // Fallback to raw if no processing available
      pricePerItem = rawAveragePricePerItem;
      processingNote = 'No processing available, using raw price';
    }

    // Calculate costs
    // For regrowing crops: buy seeds once
    // For non-regrowing crops: buy seeds for each planting (harvests times)
    const plantings = crop.regrows ? 1 : harvests;
    const seedCost = includeSeedCost ? (crop.seedPrice || 0) * plots * plantings : 0;
    const fertilizerCost = includeFertilizerCost ? selectedFertilizer.cost * plots : 0;
    const totalCost = seedCost + fertilizerCost;

    const netProfit = grossRevenue - totalCost;
    const daysUsed = season === 'greenhouse' ? 112 : SEASON_DAYS - startingDay + 1;
    const profitPerDay = daysUsed > 0 ? netProfit / daysUsed : 0;
    const profitPerPlot = plots > 0 ? netProfit / plots : 0;

    return {
      crop,
      plots,
      harvests,
      totalYield,
      yieldPerHarvest,
      pricePerItem,
      grossRevenue,
      seedCost,
      fertilizerCost,
      totalCost,
      netProfit,
      profitPerPlot,
      profitPerDay,
      daysUsed,
      processorName,
      processingTime,
      processingBatches,
      processingNote,
      method,
      plantings,
      growthTime // Include actual growth time for display
    };
  };

  const calculation = useMemo(() => 
    calculateCropProfit(selectedCrop, plotCount, startDay, selectedFertilizer, sellMethod),
    [selectedCrop, plotCount, startDay, selectedFertilizer, sellMethod, farmingLevel, professionContext, includeSeedCost, includeFertilizerCost]
  );

  // Quick comparison of top crops
  const quickComparison = useMemo(() => {
    return crops
      .map(crop => calculateCropProfit(crop, plotCount, startDay, selectedFertilizer, sellMethod))
      .filter(c => c && c.harvests > 0)
      .sort((a, b) => b.profitPerDay - a.profitPerDay)
      .slice(0, 10);
  }, [crops, plotCount, startDay, selectedFertilizer, sellMethod, farmingLevel, professionContext, includeSeedCost, includeFertilizerCost]);

  // Add to comparison
  const addToComparison = (crop) => {
    if (comparisonCrops.length < 5 && !comparisonCrops.find(c => c.slug === crop.slug)) {
      setComparisonCrops([...comparisonCrops, crop]);
    }
  };

  const removeFromComparison = (slug) => {
    setComparisonCrops(comparisonCrops.filter(c => c.slug !== slug));
  };

  // Comparison calculations
  const comparisonResults = useMemo(() => {
    return comparisonCrops.map(crop => 
      calculateCropProfit(crop, plotCount, startDay, selectedFertilizer, sellMethod)
    ).filter(Boolean);
  }, [comparisonCrops, plotCount, startDay, selectedFertilizer, sellMethod, farmingLevel, professionContext, includeSeedCost, includeFertilizerCost]);

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-40 bg-slate-200 rounded"></div>
            <div className="h-60 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <nav className="text-sm text-green-100 mb-3">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span>Crop Profit Calculator</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <span className="text-3xl"><SeasonIcon season={season} /></span>
          {seasonCapitalized} Crop Profit Calculator
        </h1>
        <p className="text-green-100 mt-2">
          Calculate exact profits based on your plots, starting day, and professions
        </p>
        
        {/* Season tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {ALL_SEASONS.map(s => (
            <Link
              key={s}
              href={`/calculator/${s}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${
                s === season 
                  ? 'bg-white text-green-700' 
                  : 'bg-green-500/30 text-white hover:bg-green-500/50'
              }`}
            >
              <SeasonIcon season={s} />
              {SEASON_LABELS[s]}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Calculator */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>⚙️</span> Calculator Settings
            </h2>
            
            {/* Crop Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Crop
              </label>
              <select
                value={selectedCropSlug}
                onChange={(e) => setSelectedCropSlug(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="">-- Choose a crop --</option>
                {crops.map(crop => (
                  <option key={crop.slug} value={crop.slug}>
                    {crop.name} ({crop.growthTime}d{crop.regrows ? ', regrows' : ''})
                  </option>
                ))}
              </select>
            </div>

            {/* Plot Count */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Number of Plots
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={plotCount}
                onChange={(e) => setPlotCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <div className="flex gap-2 mt-2">
                {[24, 80, 120, 264].map(n => (
                  <button
                    key={n}
                    onClick={() => setPlotCount(n)}
                    className={`px-2 py-1 text-xs rounded border ${
                      plotCount === n ? 'bg-green-100 border-green-500 text-green-700' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">24=Iridium, 80=Basic, 120=Greenhouse, 264=Full Farm</p>
            </div>

            {/* Starting Day */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Starting Day (1-28)
              </label>
              <input
                type="number"
                min="1"
                max="28"
                value={startDay}
                onChange={(e) => setStartDay(Math.max(1, Math.min(28, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            {/* Fertilizer */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fertilizer
              </label>
              <select
                value={selectedFertilizerId}
                onChange={(e) => setSelectedFertilizerId(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                {FERTILIZERS.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                    {f.growthBonus > 0 && ` (-${Math.round(f.growthBonus * 100)}% grow time)`}
                    {f.qualityBonus > 0 && ` (+quality)`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Farming Level for Crop Quality
              </label>
              <input
                type="number"
                min="0"
                max="14"
                value={farmingLevel}
                onChange={(e) => setFarmingLevel(Math.max(0, Math.min(14, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Use 0-10 for normal play; buffs can raise effective Farming to 14.</p>
            </div>

            {/* Sell Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Sell Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'raw', label: 'Raw', icon: '🥬' },
                  { id: 'keg', label: 'Keg', icon: '🍷' },
                  { id: 'jar', label: 'Jar', icon: '🫙' },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSellMethod(m.id)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-1 transition ${
                      sellMethod === m.id 
                        ? 'bg-green-100 border-green-500 text-green-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Options */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSeedCost}
                  onChange={(e) => setIncludeSeedCost(e.target.checked)}
                  className="rounded border-slate-300 text-green-600"
                />
                <span className="text-slate-600">Include seed cost</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFertilizerCost}
                  onChange={(e) => setIncludeFertilizerCost(e.target.checked)}
                  className="rounded border-slate-300 text-green-600"
                />
                <span className="text-slate-600">Include fertilizer cost</span>
              </label>
            </div>

            {/* Professions */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">Professions</label>
              <div className="space-y-2">
                {[
                  { key: 'tiller', label: 'Tiller (+10% crops)', setter: professionContext.setTiller, value: professionContext.tiller },
                  { key: 'artisan', label: 'Artisan (+40% artisan)', setter: professionContext.setArtisan, value: professionContext.artisan },
                  { key: 'agriculturist', label: 'Agriculturist (+10% speed)', setter: professionContext.setAgriculturist, value: professionContext.agriculturist },
                ].map(p => (
                  <label key={p.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.value}
                      onChange={(e) => p.setter(e.target.checked)}
                      className="rounded border-slate-300 text-green-600"
                    />
                    <span className="text-slate-600">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Single Crop Result */}
          {calculation && selectedCrop ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <CropSprite slug={selectedCrop.slug} name={selectedCrop.name} size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{selectedCrop.name}</h3>
                    <p className="text-sm text-slate-500">
                      {selectedCrop.growthTime} days to grow
                      {selectedCrop.regrows && ` • Regrows every ${selectedCrop.regrowTime} days`}
                    </p>
                  </div>
                  <button
                    onClick={() => addToComparison(selectedCrop)}
                    className="ml-auto px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    disabled={comparisonCrops.length >= 5}
                  >
                    + Compare
                  </button>
                </div>
              </div>

              {calculation.error ? (
                <div className="p-6 text-center text-red-500">
                  <span className="text-3xl">⚠️</span>
                  <p className="mt-2 font-medium">{calculation.error}</p>
                  <p className="text-sm text-slate-500 mt-1">Try an earlier starting day or faster-growing crop</p>
                </div>
              ) : (
                <div className="p-5">
                  {/* Main Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatNumber(calculation.netProfit)}g
                      </div>
                      <div className="text-xs text-green-700 font-medium">NET PROFIT</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {calculation.profitPerDay.toFixed(1)}g
                      </div>
                      <div className="text-xs text-blue-700 font-medium">PROFIT/DAY</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {calculation.harvests}×
                      </div>
                      <div className="text-xs text-purple-700 font-medium">HARVESTS</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">
                        {formatNumber(calculation.totalYield, 2)}
                      </div>
                      <div className="text-xs text-amber-700 font-medium">TOTAL YIELD</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-700 mb-3">💰 Profit Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Plots × Harvests × Yield</span>
                        <span className="font-mono">{plotCount} x {calculation.harvests} x {formatNumber(calculation.yieldPerHarvest, 2)} = {formatNumber(calculation.totalYield, 2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Price per item ({sellMethod === 'raw' ? 'Raw' : calculation.processorName})</span>
                        <span className="font-mono text-green-600">+{formatNumber(calculation.pricePerItem, 2)}g</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-600">Gross Revenue</span>
                        <span className="font-mono text-green-600">+{formatNumber(calculation.grossRevenue)}g</span>
                      </div>
                      <div className="border-t border-slate-200 my-2"></div>
                      {includeSeedCost && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Seed Cost ({selectedCrop.seedPrice || 0}g x {plotCount} x {calculation.plantings})</span>
                          <span className="font-mono text-red-500">-{formatNumber(calculation.seedCost)}g</span>
                        </div>
                      )}
                      {includeFertilizerCost && selectedFertilizer.cost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Fertilizer Cost ({selectedFertilizer.cost}g × {plotCount})</span>
                          <span className="font-mono text-red-500">-{formatNumber(calculation.fertilizerCost)}g</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200">
                        <span className="text-slate-800">Net Profit</span>
                        <span className={`font-mono ${calculation.netProfit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {calculation.netProfit >= 0 ? '+' : ''}{formatNumber(calculation.netProfit)}g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Processing Note */}
                  {sellMethod !== 'raw' && calculation.processingTime > 0 && (
                    <div className="mt-4 bg-purple-50 rounded-lg p-3 text-sm">
                      <span className="font-medium text-purple-700">⏱️ Processing Note:</span>
                      <span className="text-purple-600 ml-2">
                        {sellMethod === 'keg' ? 'Keg' : 'Preserves Jar'} takes {calculation.processingTime} days per batch.
                        You&apos;ll need roughly {Math.ceil(((calculation.processingBatches || calculation.totalYield) * calculation.processingTime) / calculation.daysUsed)} machines to process {formatNumber(calculation.processingBatches || calculation.totalYield, 2)} batches across this calculation window.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a Crop to Calculate</h3>
              <p className="text-slate-500 text-sm">Choose a crop from the dropdown to see detailed profit calculations</p>
            </div>
          )}

          {/* Comparison Table */}
          {comparisonCrops.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-50 p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">📊 Comparison ({comparisonCrops.length}/5)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">Crop</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-600">Harvests</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-600">Yield</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-600">Net Profit</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-600">Gold/Day</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonResults.map((result, idx) => (
                      <tr key={result.crop.slug} className={idx === 0 ? 'bg-green-50' : ''}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CropSprite slug={result.crop.slug} name={result.crop.name} size={24} />
                            <span className="font-medium">{result.crop.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">{result.harvests}×</td>
                        <td className="px-4 py-3 text-right">{formatNumber(result.totalYield, 2)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                          {formatNumber(result.netProfit)}g
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-green-600">
                          {result.profitPerDay.toFixed(1)}g
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFromComparison(result.crop.slug)}
                            className="text-red-400 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quick Rankings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">🏆 Top 10 Crops (with your settings)</h3>
              <span className="text-xs text-slate-500">Sorted by gold/day</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">#</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Crop</th>
                    <th className="px-4 py-2 text-center font-semibold text-slate-600">Harvests</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-600">Net Profit</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-600">Gold/Day</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quickComparison.map((result, idx) => (
                    <tr 
                      key={result.crop.slug} 
                      className={`hover:bg-blue-50 cursor-pointer ${idx < 3 ? 'bg-yellow-50/50' : ''}`}
                      onClick={() => setSelectedCropSlug(result.crop.slug)}
                    >
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                          idx === 1 ? 'bg-slate-300 text-slate-700' :
                          idx === 2 ? 'bg-orange-400 text-white' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <CropSprite slug={result.crop.slug} name={result.crop.name} size={24} />
                          <div>
                            <div className="font-medium text-slate-800">{result.crop.name}</div>
                            <div className="text-xs text-slate-400">
                              {result.crop.regrows ? '🔄 Regrows' : '🌱 Single'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center text-slate-600">{result.harvests}×</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-green-600">
                        {formatNumber(result.netProfit)}g
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="font-bold text-green-600">{result.profitPerDay.toFixed(1)}g</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); addToComparison(result.crop); }}
                          className="text-blue-500 hover:text-blue-700 text-xs"
                        >
                          +Compare
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5">
        <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span>💡</span> Calculator Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <p><strong>Starting Day:</strong> Earlier = more harvests for regrow crops</p>
            <p><strong>Regrow crops:</strong> Better for late planting (less seed cost per harvest)</p>
            <p><strong>Growth Time:</strong> A 4-day crop planted on day 1 is harvested on day 5</p>
          </div>
          <div>
            <p><strong>Keg vs Jar:</strong> Kegs take longer but usually pay more per item</p>
            <p><strong>Quality:</strong> Uses your Farming Level; multi-yield crops improve one item per harvest</p>
            <p><strong>Coffee:</strong> Keg Coffee is sold at 150g per 5 beans and does not get Artisan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
