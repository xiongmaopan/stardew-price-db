const fs = require('fs');
const path = require('path');

// 读取数据文件
const items = require('./data/items.json').items;
const npcs = require('./data/npcs.json').npcs;
const fish = require('./data/fish.json').fish;
const recipes = require('./data/recipes.json').recipes;
const bundles = require('./data/bundles.json').bundles;

const outDir = './out';

// 检查页面是否存在
function pageExists(urlPath) {
  const pagePath = urlPath.replace(/^\//, '');
  const htmlPath = path.join(outDir, pagePath, 'index.html');
  const directHtml = path.join(outDir, pagePath + '.html');
  return fs.existsSync(htmlPath) || fs.existsSync(directHtml);
}

let missing = [];
let exists = 0;

console.log('=== Sitemap vs 实际页面检查 ===\n');

// 检查 item 页面
let itemMissing = [];
items.forEach(item => {
  if (!pageExists('/item/' + item.slug)) {
    itemMissing.push(item.slug);
  } else {
    exists++;
  }
});
console.log(`Items: ${items.length - itemMissing.length}/${items.length} 存在`);
if (itemMissing.length > 0) {
  console.log('  缺失:', itemMissing.slice(0, 5).join(', '), itemMissing.length > 5 ? `... (+${itemMissing.length - 5})` : '');
}

// 检查 gift 页面
let giftMissing = [];
npcs.forEach(npc => {
  if (!pageExists('/gift/' + npc.slug)) {
    giftMissing.push(npc.slug);
  } else {
    exists++;
  }
});
console.log(`Gifts (NPCs): ${npcs.length - giftMissing.length}/${npcs.length} 存在`);
if (giftMissing.length > 0) {
  console.log('  缺失:', giftMissing.join(', '));
}

// 检查 fish 页面
let fishMissing = [];
fish.forEach(f => {
  if (!pageExists('/fishing/' + f.slug)) {
    fishMissing.push(f.slug);
  } else {
    exists++;
  }
});
console.log(`Fish: ${fish.length - fishMissing.length}/${fish.length} 存在`);
if (fishMissing.length > 0) {
  console.log('  缺失:', fishMissing.slice(0, 5).join(', '), fishMissing.length > 5 ? `... (+${fishMissing.length - 5})` : '');
}

// 检查 recipe 页面
let recipeMissing = [];
recipes.forEach(r => {
  if (!pageExists('/recipe/' + r.slug)) {
    recipeMissing.push(r.slug);
  } else {
    exists++;
  }
});
console.log(`Recipes: ${recipes.length - recipeMissing.length}/${recipes.length} 存在`);
if (recipeMissing.length > 0) {
  console.log('  缺失:', recipeMissing.slice(0, 5).join(', '), recipeMissing.length > 5 ? `... (+${recipeMissing.length - 5})` : '');
}

// 检查 bundle 页面
let bundleMissing = [];
bundles.forEach(b => {
  if (!pageExists('/bundle/' + b.slug)) {
    bundleMissing.push(b.slug);
  } else {
    exists++;
  }
});
console.log(`Bundles: ${bundles.length - bundleMissing.length}/${bundles.length} 存在`);
if (bundleMissing.length > 0) {
  console.log('  缺失:', bundleMissing.join(', '));
}

// 检查 guide 页面
const guides = [
  'most-profitable-crops',
  'keg-vs-jar',
  'ancient-fruit',
  'greenhouse-layout',
  'animal-profit',
  'mining-profit',
  'best-fish-pond',
  'year-1-money',
];
let guideMissing = [];
guides.forEach(g => {
  if (!pageExists('/guide/' + g)) {
    guideMissing.push(g);
  } else {
    exists++;
  }
});
console.log(`Guides: ${guides.length - guideMissing.length}/${guides.length} 存在`);
if (guideMissing.length > 0) {
  console.log('  缺失:', guideMissing.join(', '));
}

// 检查 calculator 页面
const seasons = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];
let calcMissing = [];
seasons.forEach(s => {
  if (!pageExists('/calculator/' + s)) {
    calcMissing.push(s);
  } else {
    exists++;
  }
});
console.log(`Calculators: ${seasons.length - calcMissing.length}/${seasons.length} 存在`);
if (calcMissing.length > 0) {
  console.log('  缺失:', calcMissing.join(', '));
}

console.log('\n=== 总结 ===');
const totalMissing = itemMissing.length + giftMissing.length + fishMissing.length + 
                     recipeMissing.length + bundleMissing.length + guideMissing.length + calcMissing.length;
console.log(`总页面存在: ${exists}`);
console.log(`总页面缺失: ${totalMissing}`);

if (totalMissing === 0) {
  console.log('\n✅ 所有 sitemap 中的页面都存在！');
} else {
  console.log('\n❌ 有页面缺失，需要修复');
}
