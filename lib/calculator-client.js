/**
 * Client-side Profit Calculator Engine for Stardew Valley
 * Pure calculation functions that don't import data files directly
 */

// Quality multipliers
export const QUALITY_MULTIPLIERS = {
  normal: 1.0,
  silver: 1.25,
  gold: 1.5,
  iridium: 2.0
};

// Get fertilizer by ID from passed fertilizers array
export function getFertilizer(fertilizerId, fertilizers) {
  return fertilizers.find(f => f.id === fertilizerId) || fertilizers[0];
}

// Calculate growth time with fertilizer and profession bonuses
export function calculateGrowthTime(baseGrowthTime, fertilizer, hasAgriculturist = false) {
  let speedBonus = fertilizer?.growthBonus || 0;
  
  if (hasAgriculturist) {
    speedBonus += 0.10;
  }
  
  const reducedTime = Math.ceil(baseGrowthTime * (1 - speedBonus));
  return Math.max(1, reducedTime);
}

// Calculate quality distribution based on fertilizer
export function getQualityDistribution(fertilizer) {
  const qualityBonus = fertilizer?.qualityBonus || 0;
  
  let normal, silver, gold, iridium;
  
  switch (qualityBonus) {
    case 0:
      normal = 0.53; silver = 0.27; gold = 0.15; iridium = 0.05;
      break;
    case 1:
      normal = 0.35; silver = 0.35; gold = 0.22; iridium = 0.08;
      break;
    case 2:
      normal = 0.18; silver = 0.38; gold = 0.32; iridium = 0.12;
      break;
    case 3:
      normal = 0.0; silver = 0.30; gold = 0.45; iridium = 0.25;
      break;
    default:
      normal = 0.53; silver = 0.27; gold = 0.15; iridium = 0.05;
  }
  
  return { normal, silver, gold, iridium };
}

// Calculate expected average price considering quality distribution
export function calculateAveragePrice(basePrice, fertilizer, professions = {}) {
  const distribution = getQualityDistribution(fertilizer);
  let tillerBonus = professions.tiller ? 1.1 : 1.0;
  
  const avgPrice = 
    (basePrice * QUALITY_MULTIPLIERS.normal * distribution.normal) +
    (basePrice * QUALITY_MULTIPLIERS.silver * distribution.silver) +
    (basePrice * QUALITY_MULTIPLIERS.gold * distribution.gold) +
    (basePrice * QUALITY_MULTIPLIERS.iridium * distribution.iridium);
  
  return Math.floor(avgPrice * tillerBonus);
}

// Calculate artisan goods price
export function calculateArtisanPrice(baseProductPrice, professions = {}) {
  const artisanBonus = professions.artisan ? 1.4 : 1.0;
  return Math.floor(baseProductPrice * artisanBonus);
}

// Calculate harvests per season
export function calculateHarvestsPerSeason(item, fertilizer, hasAgriculturist = false, seasonDays = 28) {
  if (!item.growthTime) return 0;
  
  const growthTime = calculateGrowthTime(item.growthTime, fertilizer, hasAgriculturist);
  
  if (item.regrows && item.regrowTime) {
    const regrowTime = Math.max(1, Math.ceil(item.regrowTime * (1 - (hasAgriculturist ? 0.1 : 0))));
    const remainingDays = seasonDays - growthTime;
    const regrowHarvests = Math.floor(remainingDays / regrowTime);
    return 1 + regrowHarvests;
  }
  
  return Math.floor(seasonDays / growthTime);
}

// Calculate profit per harvest
export function calculateProfitPerHarvest(item, fertilizer, professions = {}) {
  const avgSellPrice = calculateAveragePrice(item.basePrice, fertilizer, professions);
  const harvestYield = item.harvestYield || 1;
  const seedCost = item.seedPrice || 0;
  const fertilizerCost = fertilizer?.cost || 0;
  
  const revenue = avgSellPrice * harvestYield;
  
  return {
    revenue,
    seedCost,
    fertilizerCost,
    netProfit: revenue - seedCost
  };
}

// Calculate season profit for a crop
export function calculateSeasonProfit(item, fertilizer, professions = {}, seasonDays = 28) {
  if (!item.growthTime) return null;
  
  const hasAgriculturist = professions.agriculturist || false;
  const harvests = calculateHarvestsPerSeason(item, fertilizer, hasAgriculturist, seasonDays);
  const profitData = calculateProfitPerHarvest(item, fertilizer, professions);
  const fertilizerCost = fertilizer?.cost || 0;
  
  let totalRevenue, totalCost, totalProfit;
  
  if (item.regrows) {
    totalRevenue = profitData.revenue * harvests;
    totalCost = profitData.seedCost + fertilizerCost;
    totalProfit = totalRevenue - totalCost;
  } else {
    totalRevenue = profitData.revenue * harvests;
    totalCost = (profitData.seedCost + fertilizerCost) * harvests;
    totalProfit = totalRevenue - totalCost;
  }
  
  const growthTime = calculateGrowthTime(item.growthTime, fertilizer, hasAgriculturist);
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

// Calculate artisan goods profit
export function calculateArtisanProfit(item, professions = {}) {
  if (!item.processing) return null;
  
  const results = [];
  
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
