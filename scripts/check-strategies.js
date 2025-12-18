const fs = require('fs');

// 移除 JSON 注释
function loadJSON(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

// 检查鱼类策略
const fishStrategies = loadJSON('./data/fish-strategies.json');
const fishData = loadJSON('./data/fish.json');

const fishStrategyCount = Object.keys(fishStrategies.strategies).length;
const fishCount = fishData.fish.length;
const missingFish = fishData.fish.filter(f => !fishStrategies.strategies[f.slug]);

console.log('=== Fish Strategy Status ===');
console.log('Total fish:', fishCount);
console.log('Strategies generated:', fishStrategyCount);
console.log('Missing:', missingFish.length);

if (missingFish.length > 0) {
  console.log('\nMissing fish:');
  missingFish.forEach(f => console.log('-', f.name, `(${f.slug})`));
}

// 检查作物策略
console.log('\n=== Item Strategy Status ===');
const itemStrategies = loadJSON('./data/item-strategies.json');
const itemData = loadJSON('./data/items.json');

const itemStrategyCount = Object.keys(itemStrategies.strategies).length;
const itemCount = itemData.items.length;
const missingItems = itemData.items.filter(i => !itemStrategies.strategies[i.slug]);

console.log('Total items:', itemCount);
console.log('Strategies generated:', itemStrategyCount);
console.log('Missing:', missingItems.length);

if (missingItems.length > 0 && missingItems.length <= 10) {
  console.log('\nMissing items:');
  missingItems.forEach(i => console.log('-', i.name, `(${i.slug})`));
}

console.log('\n=== Summary ===');
console.log(`Fish: ${fishStrategyCount}/${fishCount} (${Math.round(fishStrategyCount/fishCount*100)}%)`);
console.log(`Items: ${itemStrategyCount}/${itemCount} (${Math.round(itemStrategyCount/itemCount*100)}%)`);
