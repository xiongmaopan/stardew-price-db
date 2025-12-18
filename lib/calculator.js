/**
 * Enhanced Profit Calculator Engine for Stardew Valley
 * Handles fertilizer effects, growth time calculations, and per-day profit analysis
 */

import itemsData from '@/data/items.json';

// Quality multipliers
export const QUALITY_MULTIPLIERS = {
  normal: 1.0,
  silver: 1.25,
  gold: 1.5,
  iridium: 2.0
};

// Get fertilizer by ID
export function getFertilizer(fertilizerId) {
  return itemsData.fertilizers.find(f => f.id === fertilizerId) || itemsData.fertilizers[0];
}

// Calculate growth time with fertilizer and profession bonuses
export function calculateGrowthTime(baseGrowthTime, fertilizerId, hasAgriculturist = false) {
  const fertilizer = getFertilizer(fertilizerId);
  let speedBonus = fertilizer.growthBonus || 0;
  
  if (hasAgriculturist) {
    speedBonus += 0.10;
  }
  
  // Growth time reduction (rounded down to nearest integer)
  const reducedTime = Math.ceil(baseGrowthTime * (1 - speedBonus));
  return Math.max(1, reducedTime);
}

// Calculate quality distribution based on fertilizer and farming level
export function getQualityDistribution(fertilizerId, farmingLevel = 10) {
  const fertilizer = getFertilizer(fertilizerId);
  const qualityBonus = fertilizer.qualityBonus || 0;
  
  // Base quality chances at farming level 10
  // These are approximations based on the game's formulas
  let normal, silver, gold, iridium;
  
  switch (qualityBonus) {
    case 0: // No fertilizer
      normal = 0.53;
      silver = 0.27;
      gold = 0.15;
      iridium = 0.05;
      break;
    case 1: // Basic Fertilizer
      normal = 0.35;
      silver = 0.35;
      gold = 0.22;
      iridium = 0.08;
      break;
    case 2: // Quality Fertilizer
      normal = 0.18;
      silver = 0.38;
      gold = 0.32;
      iridium = 0.12;
      break;
    case 3: // Deluxe Fertilizer
      normal = 0.0;
      silver = 0.30;
      gold = 0.45;
      iridium = 0.25;
      break;
    default:
      normal = 0.53;
      silver = 0.27;
      gold = 0.15;
      iridium = 0.05;
  }
  
  return { normal, silver, gold, iridium };
}

// Calculate expected average price considering quality distribution
export function calculateAveragePrice(basePrice, fertilizerId, professions = {}) {
  const distribution = getQualityDistribution(fertilizerId);
  
  let tillerBonus = professions.tiller ? 1.1 : 1.0;
  
  const avgPrice = 
    (basePrice * QUALITY_MULTIPLIERS.normal * distribution.normal) +
    (basePrice * QUALITY_MULTIPLIERS.silver * distribution.silver) +
    (basePrice * QUALITY_MULTIPLIERS.gold * distribution.gold) +
    (basePrice * QUALITY_MULTIPLIERS.iridium * distribution.iridium);
  
  return Math.floor(avgPrice * tillerBonus);
}

// Calculate artisan goods price (Keg/Preserves Jar)
export function calculateArtisanPrice(baseProductPrice, professions = {}) {
  const artisanBonus = professions.artisan ? 1.4 : 1.0;
  return Math.floor(baseProductPrice * artisanBonus);
}

// Calculate number of harvests per season
export function calculateHarvestsPerSeason(item, fertilizerId, hasAgriculturist = false, seasonDays = 28) {
  if (!item.growthTime) return 0;
  
  const growthTime = calculateGrowthTime(item.growthTime, fertilizerId, hasAgriculturist);
  
  if (item.regrows && item.regrowTime) {
    // First harvest + regrows
    const regrowTime = Math.max(1, Math.ceil(item.regrowTime * (1 - (hasAgriculturist ? 0.1 : 0))));
    const remainingDays = seasonDays - growthTime;
    const regrowHarvests = Math.floor(remainingDays / regrowTime);
    return 1 + regrowHarvests;
  }
  
  // Single harvest crops - how many can you plant and harvest
  return Math.floor(seasonDays / growthTime);
}

// Calculate profit per harvest
export function calculateProfitPerHarvest(item, fertilizerId, professions = {}) {
  const avgSellPrice = calculateAveragePrice(item.basePrice, fertilizerId, professions);
  const harvestYield = item.harvestYield || 1;
  const seedCost = item.seedPrice || 0;
  const fertilizerCost = getFertilizer(fertilizerId).cost || 0;
  
  // For regrow crops, seed cost is only paid once
  // For single harvest, subtract seed cost each time
  const revenue = avgSellPrice * harvestYield;
  
  return {
    revenue,
    seedCost,
    fertilizerCost,
    netProfit: revenue - seedCost
  };
}

// Calculate season profit for a crop
export function calculateSeasonProfit(item, fertilizerId, professions = {}, seasonDays = 28) {
  if (!item.growthTime) return null;
  
  const hasAgriculturist = professions.agriculturist || false;
  const harvests = calculateHarvestsPerSeason(item, fertilizerId, hasAgriculturist, seasonDays);
  const profitData = calculateProfitPerHarvest(item, fertilizerId, professions);
  const fertilizerCost = getFertilizer(fertilizerId).cost || 0;
  
  let totalRevenue, totalCost, totalProfit;
  
  if (item.regrows) {
    // Regrow crops: pay seed + fertilizer once, harvest multiple times
    totalRevenue = profitData.revenue * harvests;
    totalCost = profitData.seedCost + fertilizerCost;
    totalProfit = totalRevenue - totalCost;
  } else {
    // Single harvest: pay seed + fertilizer each planting
    totalRevenue = profitData.revenue * harvests;
    totalCost = (profitData.seedCost + fertilizerCost) * harvests;
    totalProfit = totalRevenue - totalCost;
  }
  
  const growthTime = calculateGrowthTime(item.growthTime, fertilizerId, hasAgriculturist);
  const profitPerDay = totalProfit / seasonDays;
  
  return {
    harvests,
    growthTime,
    totalRevenue,
    totalCost,
    totalProfit,
    profitPerDay: Math.floor(profitPerDay * 100) / 100,
    item
  };
}

// Calculate artisan goods profit (Wine/Jelly/Juice/Pickles)
export function calculateArtisanProfit(item, professions = {}) {
  if (!item.processing) return null;
  
  const results = [];
  
  // Keg products
  if (item.processing.kegPrice || item.processing.kegProduct) {
    const kegPrice = item.processing.kegPrice || item.processing.price || 0;
    const artisanPrice = calculateArtisanPrice(kegPrice, professions);
    const processingTime = item.processing.kegTime || 7;
    
    results.push({
      method: 'Keg',
      product: item.processing.kegProduct || item.processing.product,
      basePrice: kegPrice,
      artisanPrice,
      processingTime,
      profitIncrease: artisanPrice - item.basePrice,
      profitPerDay: Math.floor((artisanPrice / processingTime) * 100) / 100
    });
  }
  
  // Preserves Jar products
  if (item.processing.jarPrice || item.processing.jarProduct) {
    const jarPrice = item.processing.jarPrice || 0;
    const artisanPrice = calculateArtisanPrice(jarPrice, professions);
    const processingTime = item.processing.jarTime || 3;
    
    results.push({
      method: 'Preserves Jar',
      product: item.processing.jarProduct,
      basePrice: jarPrice,
      artisanPrice,
      processingTime,
      profitIncrease: artisanPrice - item.basePrice,
      profitPerDay: Math.floor((artisanPrice / processingTime) * 100) / 100
    });
  }
  
  return results.length > 0 ? results : null;
}

// Get all crops for a specific season
export function getCropsBySeason(season) {
  return itemsData.items.filter(item => 
    item.category === 'Crops' && 
    item.season && 
    item.season.map(s => s.toLowerCase()).includes(season.toLowerCase())
  );
}

// Rank crops by profit per day for a season
export function rankCropsByProfit(season, fertilizerId, professions = {}) {
  const crops = getCropsBySeason(season);
  
  const rankings = crops
    .map(crop => calculateSeasonProfit(crop, fertilizerId, professions))
    .filter(r => r !== null)
    .sort((a, b) => b.profitPerDay - a.profitPerDay);
  
  return rankings;
}
