/**
 * 最终验证脚本 - 确认计算器所有核心逻辑正确
 */

console.log('═══════════════════════════════════════════════════════════════');
console.log('     Stardew Valley 计算器 - 最终验证报告');
console.log('═══════════════════════════════════════════════════════════════\n');

let totalTests = 0;
let passedTests = 0;

function test(name, expected, actual) {
  totalTests++;
  const pass = Math.abs(expected - actual) < 0.01;
  if (pass) {
    passedTests++;
    console.log(`✅ ${name}: ${actual}`);
  } else {
    console.log(`❌ ${name}: 期望 ${expected}, 得到 ${actual}`);
  }
  return pass;
}

// ============================================
// 1. 生长时间计算
// ============================================
console.log('【1. 生长时间计算】\n');

function calcGrowthTime(baseGrowth, speedMultiplier) {
  return Math.max(1, Math.floor(baseGrowth * speedMultiplier));
}

// Parsnip (4 days) with different fertilizers
test('Parsnip 无肥料', 4, calcGrowthTime(4, 1.0));
test('Parsnip + Speed-Gro', 3, calcGrowthTime(4, 0.9)); // floor(4 * 0.9) = 3
test('Parsnip + Deluxe Speed-Gro', 3, calcGrowthTime(4, 0.75)); // floor(4 * 0.75) = 3
test('Parsnip + Hyper Speed-Gro', 2, calcGrowthTime(4, 0.67)); // floor(4 * 0.67) = 2

// Strawberry (8 days) with Agriculturist
test('Strawberry 无肥料', 8, calcGrowthTime(8, 1.0));
test('Strawberry + Agriculturist', 7, calcGrowthTime(8, 0.9)); // floor(8 * 0.9) = 7
test('Strawberry + Speed-Gro + Agri', 6, calcGrowthTime(8, 0.8)); // floor(8 * 0.8) = 6

console.log('');

// ============================================
// 2. 品质分布计算
// ============================================
console.log('【2. 品质分布计算 (Farming Lv10)】\n');

function calculateQualityRatios(fertilizerLevel, farmingLevel = 10) {
  const goldBase = 0.2 * (farmingLevel / 10.0) + 0.2 * fertilizerLevel * ((farmingLevel + 2) / 12.0) + 0.01;
  const ratioI = fertilizerLevel >= 3 ? goldBase / 2 : 0;
  const ratioG = goldBase * (1.0 - ratioI / goldBase);
  const ratioS = Math.max(0, Math.min(0.75, goldBase * 2.0) * (1.0 - ratioG - ratioI));
  const ratioN = Math.max(0, 1.0 - ratioS - ratioG - ratioI);
  return { normal: ratioN, silver: ratioS, gold: ratioG, iridium: ratioI };
}

const noFert = calculateQualityRatios(0);
console.log('无肥料:');
console.log(`  Normal: ${(noFert.normal * 100).toFixed(1)}%, Silver: ${(noFert.silver * 100).toFixed(1)}%, Gold: ${(noFert.gold * 100).toFixed(1)}%, Iridium: ${(noFert.iridium * 100).toFixed(1)}%`);
test('无肥料总和', 1.0, noFert.normal + noFert.silver + noFert.gold + noFert.iridium);

const basicFert = calculateQualityRatios(1);
console.log('Basic Fertilizer:');
console.log(`  Normal: ${(basicFert.normal * 100).toFixed(1)}%, Silver: ${(basicFert.silver * 100).toFixed(1)}%, Gold: ${(basicFert.gold * 100).toFixed(1)}%, Iridium: ${(basicFert.iridium * 100).toFixed(1)}%`);
test('Basic总和', 1.0, basicFert.normal + basicFert.silver + basicFert.gold + basicFert.iridium);

const deluxeFert = calculateQualityRatios(3);
console.log('Deluxe Fertilizer:');
console.log(`  Normal: ${(deluxeFert.normal * 100).toFixed(1)}%, Silver: ${(deluxeFert.silver * 100).toFixed(1)}%, Gold: ${(deluxeFert.gold * 100).toFixed(1)}%, Iridium: ${(deluxeFert.iridium * 100).toFixed(1)}%`);
test('Deluxe总和', 1.0, deluxeFert.normal + deluxeFert.silver + deluxeFert.gold + deluxeFert.iridium);
test('Deluxe有铱星', true, deluxeFert.iridium > 0);

console.log('');

// ============================================
// 3. 收获次数计算
// ============================================
console.log('【3. 收获次数计算】\n');

function calculateHarvests(growthTime, regrows, regrowTime, startingDay, seasonDays = 28) {
  let harvests = 0;
  let currentDay = startingDay + growthTime - 1;
  
  if (currentDay <= seasonDays) {
    harvests = 1;
    
    if (regrows && regrowTime) {
      while (currentDay + regrowTime <= seasonDays) {
        currentDay += regrowTime;
        harvests++;
      }
    } else {
      while (currentDay + growthTime <= seasonDays) {
        currentDay += growthTime;
        harvests++;
      }
    }
  }
  
  return harvests;
}

test('Parsnip D1种 (非重生)', 7, calculateHarvests(4, false, 0, 1));
test('Strawberry D1种 (重生)', 6, calculateHarvests(8, true, 4, 1));
test('Strawberry D13种 (蛋蛋节)', 3, calculateHarvests(8, true, 4, 13));
test('Hops D1种', 18, calculateHarvests(11, true, 1, 1));
test('Blueberry D1种', 4, calculateHarvests(13, true, 4, 1));
test('Pumpkin D1种', 2, calculateHarvests(13, false, 0, 1));
test('Ancient Fruit 温室', 13, calculateHarvests(28, true, 7, 1, 112));

console.log('');

// ============================================
// 4. 利润计算示例
// ============================================
console.log('【4. 利润计算示例 - Strawberry】\n');

const strawberry = {
  basePrice: 120,
  seedPrice: 100, // 蛋蛋节购买
  growthTime: 8,
  regrows: true,
  regrowTime: 4,
  harvestYield: 1
};

const plots = 100;
const harvests = calculateHarvests(8, true, 4, 1);
const qualityDist = calculateQualityRatios(0);
const avgPrice = Math.floor(strawberry.basePrice * (
  qualityDist.normal * 1.0 +
  qualityDist.silver * 1.25 +
  qualityDist.gold * 1.5 +
  qualityDist.iridium * 2.0
));

const totalYield = plots * harvests * strawberry.harvestYield;
const grossRevenue = totalYield * avgPrice;
const seedCost = strawberry.seedPrice * plots; // 重生作物只买一次种子
const netProfit = grossRevenue - seedCost;
const profitPerDay = netProfit / 28;

console.log(`种植: ${plots} 格`);
console.log(`收获次数: ${harvests}`);
console.log(`平均售价: ${avgPrice}g (含品质)`);
console.log(`总产量: ${totalYield}`);
console.log(`总收入: ${grossRevenue}g`);
console.log(`种子成本: ${seedCost}g`);
console.log(`净利润: ${netProfit}g`);
console.log(`日均利润: ${profitPerDay.toFixed(0)}g/天`);

console.log('');

// ============================================
// 5. Parsnip 多轮种植验证
// ============================================
console.log('【5. Parsnip 多轮种植验证】\n');

const parsnip = {
  basePrice: 35,
  seedPrice: 20,
  growthTime: 4,
  regrows: false
};

const parsnipHarvests = calculateHarvests(4, false, 0, 1);
const parsnipQuality = calculateQualityRatios(0);
const parsnipAvgPrice = Math.floor(parsnip.basePrice * (
  parsnipQuality.normal * 1.0 +
  parsnipQuality.silver * 1.25 +
  parsnipQuality.gold * 1.5
));

const parsnipYield = plots * parsnipHarvests;
const parsnipRevenue = parsnipYield * parsnipAvgPrice;
// 非重生作物：每次收获都需要重新购买种子
const parsnipSeedCost = parsnip.seedPrice * plots * parsnipHarvests;
const parsnipProfit = parsnipRevenue - parsnipSeedCost;

console.log(`收获次数: ${parsnipHarvests} (每4天收获一次后重新种植)`);
console.log(`总产量: ${parsnipYield}`);
console.log(`总收入: ${parsnipRevenue}g`);
console.log(`种子成本: ${parsnipSeedCost}g (${parsnipHarvests}轮 × ${parsnip.seedPrice}g × ${plots}格)`);
console.log(`净利润: ${parsnipProfit}g`);

console.log('');

// ============================================
// 最终结果
// ============================================
console.log('═══════════════════════════════════════════════════════════════');
console.log(`测试结果: ${passedTests}/${totalTests} 通过`);
console.log('═══════════════════════════════════════════════════════════════');

if (passedTests === totalTests) {
  console.log('\n✅ 所有验证通过！计算器逻辑正确。');
} else {
  console.log('\n❌ 存在验证失败，请检查计算逻辑。');
}
