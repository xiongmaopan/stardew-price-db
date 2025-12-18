/**
 * 验证收获次数计算
 * 对照 Stardew-Profits 项目和官方 Wiki 数据
 */

console.log('═══════════════════════════════════════════════════════════════');
console.log('           Stardew Valley 收获次数验证');
console.log('═══════════════════════════════════════════════════════════════\n');

// 我们的收获计算函数 (从 CalculatorClient.js 复制 - 修复版)
function calculateHarvests(growthTime, regrows, regrowTime, startingDay, isGreenhouse, seasonDays = 28) {
  let harvests = 0;
  let currentDay = startingDay + growthTime - 1; // Day of first harvest
  
  const maxDay = isGreenhouse ? startingDay + 111 : seasonDays;
  
  if (currentDay <= maxDay) {
    harvests = 1;
    
    if (regrows && regrowTime) {
      // Regrowing crop: add regrow time for each subsequent harvest
      while (currentDay + regrowTime <= maxDay) {
        currentDay += regrowTime;
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
  
  return harvests;
}

// Stardew-Profits 的收获计算方法 (从 main.js 简化)
function stardewProfitsHarvests(growthTime, regrows, regrowTime, startingDay, seasonDays = 28) {
  // Stardew-Profits: season.days - (plantDay - 1) = available days
  // First harvest at: plantDay + growthTime - 1
  const availableDays = seasonDays - startingDay + 1;
  
  if (growthTime > availableDays) {
    return 0; // Can't complete first growth
  }
  
  let harvests = 1; // First harvest
  
  if (regrows && regrowTime > 0) {
    // Days remaining after first harvest
    const daysAfterFirst = availableDays - growthTime;
    harvests += Math.floor(daysAfterFirst / regrowTime);
  }
  
  return harvests;
}

console.log('【测试案例】\n');

// 测试数据
const testCases = [
  // [name, growthTime, regrows, regrowTime, startDay, expected, notes]
  ['Parsnip', 4, false, 0, 1, 7, '非重生作物, 28/4=7'],
  ['Parsnip', 4, false, 0, 5, 6, '第5天种, 剩余24天, 24/4=6'],
  ['Parsnip', 4, false, 0, 25, 1, '第25天种, 刚好4天成熟'],
  ['Parsnip', 4, false, 0, 26, 0, '第26天种, 只剩3天, 无法收获'],
  
  ['Strawberry', 8, true, 4, 1, 6, '第1天种: D8收获1, D12收获2, D16收获3, D20收获4, D24收获5, D28收获6'],
  ['Strawberry', 8, true, 4, 13, 3, '蛋蛋节买种第13天种: D20收获1, D24收获2, D28收获3'],
  
  ['Hops', 11, true, 1, 1, 18, '第1天种: D11第一收, 之后每天收获, 28-11+1=18'],
  ['Hops', 11, true, 1, 1, 18, '验证: D11到D28共18天'],
  
  ['Blueberry', 13, true, 4, 1, 4, '第1天种: D13收获1, D17收获2, D21收获3, D25收获4 (D29超出)'],
  
  ['Pumpkin', 13, false, 0, 1, 2, '第1天种: D13收获, D26收获 = 2次'],
  ['Pumpkin', 13, false, 0, 14, 1, '第14天种: D26收获 = 1次'],
  
  ['Coffee Bean', 10, true, 2, 1, 10, '第1天种: D10第一收, (28-10)/2=9次再收, 共10次'],
  
  ['Ancient Fruit (GH)', 28, true, 7, 1, 13, '温室, 112天: D28第一收, (112-28)/7=12次再收, 共13次'],
];

let passed = 0;
let failed = 0;

testCases.forEach(([name, growth, regrows, regrowTime, startDay, expected, notes]) => {
  const isGreenhouse = name.includes('GH');
  const ourResult = calculateHarvests(growth, regrows, regrowTime, startDay, isGreenhouse);
  const spResult = stardewProfitsHarvests(growth, regrows, regrowTime, startDay, isGreenhouse ? 112 : 28);
  
  const match = ourResult === expected;
  const spMatch = spResult === expected;
  
  const status = match ? '✅' : '❌';
  const spStatus = spMatch ? '✅' : '❌';
  
  console.log(`${status} ${name} (第${startDay}天种, 生长${growth}天${regrows ? ', 再生' + regrowTime + '天' : ''})`);
  console.log(`   期望: ${expected}, 我们: ${ourResult}, Stardew-Profits方法: ${spResult}`);
  console.log(`   说明: ${notes}`);
  console.log('');
  
  if (match) passed++; else failed++;
});

console.log('═══════════════════════════════════════════════════════════════');
console.log(`结果: ${passed} 通过, ${failed} 失败`);
console.log('═══════════════════════════════════════════════════════════════\n');

// 详细分析 Strawberry 案例
console.log('【详细分析: Strawberry 第1天种植】');
console.log('生长时间: 8天, 再生时间: 4天');
console.log('');
console.log('日期模拟:');
console.log('  D1: 种植');
console.log('  D2-D8: 生长中...');
console.log('  D8: 第1次收获 ✓ (第1天种 + 8天生长 - 1 = D8)');
console.log('  D9-D11: 再生中...');
console.log('  D12: 第2次收获 ✓');
console.log('  D13-D15: 再生中...');
console.log('  D16: 第3次收获 ✓');
console.log('  D17-D19: 再生中...');
console.log('  D20: 第4次收获 ✓');
console.log('  D21-D23: 再生中...');
console.log('  D24: 第5次收获 ✓');
console.log('  D25-D27: 再生中...');
console.log('  D28: 第6次收获 ✓');
console.log('');
console.log('总计: 6次收获');
console.log('');

// 验证我们的计算
const strawberryTest = calculateHarvests(8, true, 4, 1, false);
console.log(`我们的计算结果: ${strawberryTest} 次收获`);
console.log(strawberryTest === 6 ? '✅ 正确!' : '❌ 不正确!');
console.log('');

// Hops 验证
console.log('【详细分析: Hops 第1天种植】');
console.log('生长时间: 11天, 再生时间: 1天');
console.log('');
console.log('  D1: 种植');
console.log('  D11: 第1次收获');
console.log('  D12: 第2次收获');
console.log('  ...');
console.log('  D28: 第18次收获');
console.log('');
console.log('公式: 1 + floor((28 - 11) / 1) = 1 + 17 = 18');
const hopsTest = calculateHarvests(11, true, 1, 1, false);
console.log(`我们的计算结果: ${hopsTest} 次收获`);
console.log(hopsTest === 18 ? '✅ 正确!' : '❌ 不正确!');
