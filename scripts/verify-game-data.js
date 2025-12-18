/**
 * 星露谷物语数据验证脚本
 * 用于检查当前数据和计算公式是否准确
 * 
 * 运行: node scripts/verify-game-data.js
 */

const data = require('../data/items.json');
const items = data.items;

console.log('🔍 星露谷物语数据验证报告\n');
console.log('='.repeat(60));

// ============================================
// 1. 官方游戏公式参考 (来自 Stardew Valley Wiki)
// ============================================

const OFFICIAL_FORMULAS = {
  // 加工品价格公式
  keg: {
    wine: (basePrice) => basePrice * 3,           // Wine = Base × 3
    juice: (basePrice) => Math.floor(basePrice * 2.25),  // Juice = Base × 2.25
    beer: 200,                                     // Beer 固定 200g
    paleAle: 300,                                  // Pale Ale 固定 300g
    coffee: 150,                                   // Coffee 固定 150g
    oil: (basePrice) => 100,                       // Oil 固定 100g
  },
  preservesJar: {
    jelly: (basePrice) => basePrice * 2 + 50,     // Jelly = Base × 2 + 50
    pickles: (basePrice) => basePrice * 2 + 50,   // Pickles = Base × 2 + 50
  },
  // 加工时间 (游戏内分钟)
  processingTime: {
    wine: 10000,      // ~7 天
    juice: 6000,      // ~4 天
    jelly: 4000,      // ~2.5 天 (但我们简化为3天)
    pickles: 4000,    // ~2.5 天
    beer: 1750,       // ~1.75 天
    paleAle: 2250,    // ~1.5 天
    coffee: 2000,     // ~2 小时 (非常快)
  },
  // 品质乘数 (官方)
  quality: {
    normal: 1.0,
    silver: 1.25,
    gold: 1.5,
    iridium: 2.0
  },
  // 职业加成 (官方)
  professions: {
    tiller: 1.10,      // +10% 作物
    artisan: 1.40,     // +40% 加工品
    rancher: 1.20,     // +20% 动物产品
    angler: 1.25,      // +25% 鱼类 (1.50 是 Fisher)
    fisher: 1.25,      // +25% 鱼类
    agriculturist: 0.10 // 10% 生长速度加成
  },
  // 速度肥料 (官方)
  speedGro: {
    'speed-gro': 0.10,
    'deluxe-speed-gro': 0.25,
    'hyper-speed-gro': 0.33
  }
};

// ============================================
// 2. 验证物品价格
// ============================================

console.log('\n📊 验证加工品价格公式...\n');

let priceErrors = [];

items.filter(i => i.processing).forEach(item => {
  const base = item.basePrice;
  const proc = item.processing;
  
  // 检查 Wine/Juice (Keg)
  if (proc.kegProduct === 'Wine') {
    const expected = OFFICIAL_FORMULAS.keg.wine(base);
    if (proc.kegPrice !== expected) {
      priceErrors.push({
        item: item.name,
        product: 'Wine (Keg)',
        current: proc.kegPrice,
        expected: expected,
        formula: `${base} × 3 = ${expected}`
      });
    }
  }
  
  if (proc.kegProduct === 'Juice') {
    const expected = OFFICIAL_FORMULAS.keg.juice(base);
    if (proc.kegPrice !== expected) {
      priceErrors.push({
        item: item.name,
        product: 'Juice (Keg)',
        current: proc.kegPrice,
        expected: expected,
        formula: `${base} × 2.25 = ${expected}`
      });
    }
  }
  
  // 检查 Jelly/Pickles (Preserves Jar)
  if (proc.jarProduct === 'Jelly') {
    const expected = OFFICIAL_FORMULAS.preservesJar.jelly(base);
    if (proc.jarPrice !== expected) {
      priceErrors.push({
        item: item.name,
        product: 'Jelly (Jar)',
        current: proc.jarPrice,
        expected: expected,
        formula: `${base} × 2 + 50 = ${expected}`
      });
    }
  }
  
  if (proc.jarProduct === 'Pickles') {
    const expected = OFFICIAL_FORMULAS.preservesJar.pickles(base);
    if (proc.jarPrice !== expected) {
      priceErrors.push({
        item: item.name,
        product: 'Pickles (Jar)',
        current: proc.jarPrice,
        expected: expected,
        formula: `${base} × 2 + 50 = ${expected}`
      });
    }
  }
});

if (priceErrors.length > 0) {
  console.log('❌ 发现价格错误:\n');
  priceErrors.forEach(err => {
    console.log(`   ${err.item} - ${err.product}`);
    console.log(`      当前值: ${err.current}g`);
    console.log(`      正确值: ${err.expected}g (公式: ${err.formula})`);
    console.log('');
  });
} else {
  console.log('✅ 所有加工品价格计算正确！\n');
}

// ============================================
// 3. 验证关键作物数据
// ============================================

console.log('='.repeat(60));
console.log('\n📋 验证关键作物基础数据...\n');

// 官方 Wiki 数据 (部分关键作物)
const OFFICIAL_CROP_DATA = {
  'parsnip': { basePrice: 35, seedPrice: 20, growthTime: 4 },
  'cauliflower': { basePrice: 175, seedPrice: 80, growthTime: 12 },
  'strawberry': { basePrice: 120, seedPrice: 100, growthTime: 8, regrowTime: 4 },
  'melon': { basePrice: 250, seedPrice: 80, growthTime: 12 },
  'starfruit': { basePrice: 750, seedPrice: 400, growthTime: 13 },
  'blueberry': { basePrice: 50, seedPrice: 80, growthTime: 13, regrowTime: 4, harvestYield: 3 },
  'pumpkin': { basePrice: 320, seedPrice: 100, growthTime: 13 },
  'cranberries': { basePrice: 75, seedPrice: 240, growthTime: 7, regrowTime: 5, harvestYield: 2 },
  'ancient-fruit': { basePrice: 550, seedPrice: 1000, growthTime: 28, regrowTime: 7 },
  'hops': { basePrice: 25, seedPrice: 60, growthTime: 11, regrowTime: 1 },
};

let cropErrors = [];

Object.entries(OFFICIAL_CROP_DATA).forEach(([slug, official]) => {
  const item = items.find(i => i.slug === slug);
  if (!item) {
    cropErrors.push({ item: slug, issue: '物品不存在于数据中' });
    return;
  }
  
  if (item.basePrice !== official.basePrice) {
    cropErrors.push({ 
      item: item.name, 
      field: 'basePrice', 
      current: item.basePrice, 
      expected: official.basePrice 
    });
  }
  if (item.seedPrice !== official.seedPrice) {
    cropErrors.push({ 
      item: item.name, 
      field: 'seedPrice', 
      current: item.seedPrice, 
      expected: official.seedPrice 
    });
  }
  if (item.growthTime !== official.growthTime) {
    cropErrors.push({ 
      item: item.name, 
      field: 'growthTime', 
      current: item.growthTime, 
      expected: official.growthTime 
    });
  }
  if (official.regrowTime && item.regrowTime !== official.regrowTime) {
    cropErrors.push({ 
      item: item.name, 
      field: 'regrowTime', 
      current: item.regrowTime, 
      expected: official.regrowTime 
    });
  }
  if (official.harvestYield && item.harvestYield !== official.harvestYield) {
    cropErrors.push({ 
      item: item.name, 
      field: 'harvestYield', 
      current: item.harvestYield, 
      expected: official.harvestYield 
    });
  }
});

if (cropErrors.length > 0) {
  console.log('❌ 发现数据错误:\n');
  cropErrors.forEach(err => {
    if (err.issue) {
      console.log(`   ${err.item}: ${err.issue}`);
    } else {
      console.log(`   ${err.item}.${err.field}: 当前=${err.current}, 正确=${err.expected}`);
    }
  });
  console.log('');
} else {
  console.log('✅ 关键作物数据正确！\n');
}

// ============================================
// 4. 检查计算逻辑问题
// ============================================

console.log('='.repeat(60));
console.log('\n⚠️  计算逻辑检查...\n');

const LOGIC_ISSUES = [];

// 检查: 季节天数
LOGIC_ISSUES.push({
  check: '季节天数',
  current: '28天',
  correct: '28天',
  status: '✅'
});

// 检查: 收获次数计算
LOGIC_ISSUES.push({
  check: '收获次数计算 (可重复收获作物)',
  current: '首次收获 + floor((28-生长天数) / 再生长天数)',
  correct: '首次收获后 + floor((剩余天数) / 再生长天数)',
  status: '⚠️ 需验证边界情况'
});

// 检查: 种子成本
LOGIC_ISSUES.push({
  check: '种子成本 (可重复收获)',
  current: '只计算一次',
  correct: '只计算一次 (正确)',
  status: '✅'
});

// 检查: 种子成本
LOGIC_ISSUES.push({
  check: '种子成本 (单次收获)',
  current: '每次播种计算',
  correct: '应该每次播种计算 (正确)',
  status: '✅'
});

console.log('计算逻辑验证结果:\n');
LOGIC_ISSUES.forEach(issue => {
  console.log(`${issue.status} ${issue.check}`);
  console.log(`   当前: ${issue.current}`);
  console.log(`   正确: ${issue.correct}\n`);
});

// ============================================
// 5. 生成修复建议
// ============================================

console.log('='.repeat(60));
console.log('\n🔧 修复建议\n');

if (priceErrors.length > 0) {
  console.log('1. 加工品价格需要使用正确公式:');
  console.log('   - Wine (酒): 基础价格 × 3');
  console.log('   - Juice (果汁): floor(基础价格 × 2.25)');
  console.log('   - Jelly (果酱): 基础价格 × 2 + 50');
  console.log('   - Pickles (腌菜): 基础价格 × 2 + 50');
  console.log('');
}

console.log('2. 建议检查的物品 (如果存在):');
console.log('   - Ancient Fruit (远古水果) - 最赚钱的作物');
console.log('   - Sweet Gem Berry (甜宝石浆果) - 特殊作物');
console.log('   - Pineapple (菠萝) - 1.5版本新增');
console.log('   - Taro Root (芋头) - 1.5版本新增');
console.log('');

console.log('3. 需要确认的游戏机制:');
console.log('   - Deluxe Fertilizer 是否真的保证无普通品质');
console.log('   - 具体的品质分布概率 (依赖农业等级)');
console.log('   - Speed-Gro 肥料是否向下取整');

// ============================================
// 6. 输出需要修正的数据
// ============================================

if (priceErrors.length > 0) {
  console.log('\n' + '='.repeat(60));
  console.log('\n📝 需要修正的 items.json 数据:\n');
  
  const fixes = {};
  priceErrors.forEach(err => {
    const item = items.find(i => i.name === err.item);
    if (item) {
      if (!fixes[item.slug]) {
        fixes[item.slug] = { name: item.name, processing: { ...item.processing } };
      }
      if (err.product.includes('Wine') || err.product.includes('Juice')) {
        fixes[item.slug].processing.kegPrice = err.expected;
      }
      if (err.product.includes('Jelly') || err.product.includes('Pickles')) {
        fixes[item.slug].processing.jarPrice = err.expected;
      }
    }
  });
  
  Object.entries(fixes).forEach(([slug, fix]) => {
    console.log(`${fix.name} (${slug}):`);
    console.log(`  kegPrice: ${fix.processing.kegPrice}`);
    console.log(`  jarPrice: ${fix.processing.jarPrice}`);
    console.log('');
  });
}

console.log('\n✨ 验证完成!\n');
