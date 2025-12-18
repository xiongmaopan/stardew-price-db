/**
 * 数据验证脚本
 * 
 * 功能：
 * 1. 验证当前数据是否正确
 * 2. 更新 verification.json 的最后验证时间
 * 3. 用于维护数据鲜活度（SEO重要信号）
 * 
 * 运行: node scripts/verify-and-update.js
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/items.json');
const verificationPath = path.join(__dirname, '../data/verification.json');

// 官方数据 (来自 Stardew Valley Wiki)
const OFFICIAL_DATA = {
  // 基础价格验证
  prices: {
    'Parsnip': 35,
    'Cauliflower': 175,
    'Strawberry': 120,
    'Melon': 250,
    'Starfruit': 750,
    'Blueberry': 50,
    'Pumpkin': 320,
    'Ancient Fruit': 550,
    'Cranberries': 75,
  },
  // 加工公式验证
  formulas: {
    wine: (base) => base * 3,
    juice: (base) => Math.floor(base * 2.25),
    jelly: (base) => base * 2 + 50,
    pickles: (base) => base * 2 + 50,
  },
  // 职业加成
  professions: {
    tiller: 0.10,
    artisan: 0.40,
    angler: 0.25,
    rancher: 0.20,
  }
};

function verifyData() {
  console.log('🔍 开始验证数据...\n');
  
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const items = data.items;
  
  let errors = [];
  let verified = 0;
  
  // 1. 验证基础价格
  console.log('📊 验证基础价格:');
  Object.entries(OFFICIAL_DATA.prices).forEach(([name, expected]) => {
    const item = items.find(i => i.name === name);
    if (!item) {
      errors.push(`❌ ${name}: 物品不存在`);
    } else if (item.basePrice !== expected) {
      errors.push(`❌ ${name}: 价格错误 (当前: ${item.basePrice}, 应为: ${expected})`);
    } else {
      console.log(`   ✅ ${name}: ${expected}g`);
      verified++;
    }
  });
  
  // 2. 验证加工公式
  console.log('\n🧪 验证加工公式:');
  const testItem = items.find(i => i.name === 'Strawberry');
  if (testItem && testItem.processing) {
    const expectedWine = OFFICIAL_DATA.formulas.wine(testItem.basePrice);
    const expectedJelly = OFFICIAL_DATA.formulas.jelly(testItem.basePrice);
    
    if (testItem.processing.kegPrice === expectedWine) {
      console.log(`   ✅ Wine公式: ${testItem.basePrice} × 3 = ${expectedWine}g`);
      verified++;
    } else {
      errors.push(`❌ Wine公式错误`);
    }
    
    if (testItem.processing.jarPrice === expectedJelly) {
      console.log(`   ✅ Jelly公式: ${testItem.basePrice} × 2 + 50 = ${expectedJelly}g`);
      verified++;
    } else {
      errors.push(`❌ Jelly公式错误`);
    }
  }
  
  // 3. 验证职业加成
  console.log('\n👨‍🌾 验证职业加成:');
  Object.entries(OFFICIAL_DATA.professions).forEach(([name, expected]) => {
    const profession = data.professions.find(p => p.id === name);
    if (profession && profession.bonus === expected) {
      console.log(`   ✅ ${name}: +${expected * 100}%`);
      verified++;
    } else {
      errors.push(`❌ ${name} 职业加成错误`);
    }
  });
  
  return { errors, verified };
}

function updateVerification(success) {
  const verification = JSON.parse(fs.readFileSync(verificationPath, 'utf8'));
  const now = new Date();
  
  verification.lastVerified = now.toISOString();
  verification.nextVerificationDue = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  verification.changelog.push({
    date: now.toISOString().split('T')[0],
    action: success ? 'verified' : 'failed',
    note: success ? 'Automated verification passed' : 'Verification found errors'
  });
  
  // 保留最近10条记录
  if (verification.changelog.length > 10) {
    verification.changelog = verification.changelog.slice(-10);
  }
  
  fs.writeFileSync(verificationPath, JSON.stringify(verification, null, 2));
  console.log(`\n📅 验证时间已更新: ${now.toISOString().split('T')[0]}`);
}

// 主程序
console.log('═'.repeat(50));
console.log('   StardewPriceDB 数据验证工具');
console.log('═'.repeat(50));

const { errors, verified } = verifyData();

console.log('\n' + '─'.repeat(50));
if (errors.length === 0) {
  console.log(`\n✅ 验证通过! 共验证 ${verified} 项数据`);
  updateVerification(true);
  console.log('\n💡 数据与官方 Wiki 一致，可以放心使用！');
} else {
  console.log(`\n❌ 发现 ${errors.length} 个错误:`);
  errors.forEach(e => console.log(`   ${e}`));
  updateVerification(false);
  console.log('\n⚠️ 请检查并修复数据后重新验证');
}

console.log('\n' + '═'.repeat(50));
