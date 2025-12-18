// 简单验证脚本
const data = require('./data/items.json');
const items = data.items;

console.log('=== 星露谷价格验证 ===\n');

// 官方公式:
// Wine = Base × 3
// Juice = floor(Base × 2.25)
// Jelly = Base × 2 + 50
// Pickles = Base × 2 + 50

const errors = [];

items.filter(i => i.processing).forEach(item => {
  const base = item.basePrice;
  const proc = item.processing;
  
  if (proc.kegProduct === 'Wine') {
    const expected = base * 3;
    if (proc.kegPrice !== expected) {
      errors.push(`${item.name} Wine: 当前${proc.kegPrice}g 应为${expected}g`);
    }
  }
  
  if (proc.kegProduct === 'Juice') {
    const expected = Math.floor(base * 2.25);
    if (proc.kegPrice !== expected) {
      errors.push(`${item.name} Juice: 当前${proc.kegPrice}g 应为${expected}g`);
    }
  }
  
  if (proc.jarProduct === 'Jelly') {
    const expected = base * 2 + 50;
    if (proc.jarPrice !== expected) {
      errors.push(`${item.name} Jelly: 当前${proc.jarPrice}g 应为${expected}g`);
    }
  }
  
  if (proc.jarProduct === 'Pickles') {
    const expected = base * 2 + 50;
    if (proc.jarPrice !== expected) {
      errors.push(`${item.name} Pickles: 当前${proc.jarPrice}g 应为${expected}g`);
    }
  }
});

console.log(`检查了 ${items.filter(i => i.processing).length} 个有加工数据的物品\n`);

if (errors.length > 0) {
  console.log(`❌ 发现 ${errors.length} 个价格错误:\n`);
  errors.forEach(e => console.log(`  ${e}`));
} else {
  console.log('✅ 所有加工品价格正确!');
}

// 检查关键作物
console.log('\n=== 关键作物验证 ===\n');

const keyChecks = [
  { slug: 'strawberry', expected: { base: 120, seed: 100, growth: 8, regrow: 4 }},
  { slug: 'starfruit', expected: { base: 750, seed: 400, growth: 13 }},
  { slug: 'ancient-fruit', expected: { base: 550, growth: 28, regrow: 7 }},
  { slug: 'blueberry', expected: { base: 50, seed: 80, growth: 13, regrow: 4 }},
];

keyChecks.forEach(check => {
  const item = items.find(i => i.slug === check.slug);
  if (!item) {
    console.log(`❌ ${check.slug} 不存在!`);
    return;
  }
  
  const issues = [];
  if (check.expected.base && item.basePrice !== check.expected.base) {
    issues.push(`basePrice: ${item.basePrice} 应为 ${check.expected.base}`);
  }
  if (check.expected.seed && item.seedPrice !== check.expected.seed) {
    issues.push(`seedPrice: ${item.seedPrice} 应为 ${check.expected.seed}`);
  }
  if (check.expected.growth && item.growthTime !== check.expected.growth) {
    issues.push(`growthTime: ${item.growthTime} 应为 ${check.expected.growth}`);
  }
  if (check.expected.regrow && item.regrowTime !== check.expected.regrow) {
    issues.push(`regrowTime: ${item.regrowTime} 应为 ${check.expected.regrow}`);
  }
    if (issues.length > 0) {
    console.log(`❌ ${item.name}: ${issues.join(', ')}`);
  } else {
    console.log(`✅ ${item.name} 数据正确`);
  }
});

// 如果没有错误，更新验证日期
if (errors.length === 0) {
  const fs = require('fs');
  const path = require('path');
  const verificationPath = path.join(__dirname, 'data', 'verification.json');
    try {
    const verification = require('./data/verification.json');
    // 使用 UTC 时间（面向国际用户）
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    verification.lastVerified = `${today}T00:00:00Z`;
    verification.nextVerificationDue = `${nextWeek}T00:00:00Z`;
    
    // 添加验证记录
    verification.changelog.unshift({
      date: today,
      action: 'verified',
      note: 'Automated verification passed'
    });
    
    // 只保留最近10条记录
    if (verification.changelog.length > 10) {
      verification.changelog = verification.changelog.slice(0, 10);
    }
    
    fs.writeFileSync(verificationPath, JSON.stringify(verification, null, 2));
    console.log(`\n📅 验证日期已更新: ${today}`);
  } catch (e) {
    console.log('\n⚠️ 无法更新验证日期:', e.message);
  }
}

console.log('\n=== 验证完成 ===');
