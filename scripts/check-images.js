const fs = require('fs');
const path = require('path');

const items = require('./data/items.json').items;
const fish = require('./data/fish.json').fish;
const npcs = require('./data/npcs.json').npcs;
const recipes = require('./data/recipes.json').recipes;

const imagesDir = './public/images';

console.log('=== 图片检查 ===\n');

// 检查 items 图片
let itemsMissing = [];
items.forEach(item => {
  const webp = path.join(imagesDir, 'items', item.slug + '.webp');
  const png = path.join(imagesDir, 'items', item.slug + '.png');
  if (!fs.existsSync(webp) && !fs.existsSync(png)) {
    itemsMissing.push(item.slug);
  }
});
console.log(`Items 图片: ${items.length - itemsMissing.length}/${items.length}`);
if (itemsMissing.length > 0) {
  console.log('  缺失:', itemsMissing.slice(0, 10).join(', '), itemsMissing.length > 10 ? `... (+${itemsMissing.length - 10})` : '');
}

// 检查 fish 图片 (fish 使用 items 目录)
let fishMissing = [];
fish.forEach(f => {
  const webp = path.join(imagesDir, 'items', f.slug + '.webp');
  const png = path.join(imagesDir, 'items', f.slug + '.png');
  if (!fs.existsSync(webp) && !fs.existsSync(png)) {
    fishMissing.push(f.slug);
  }
});
console.log(`Fish 图片: ${fish.length - fishMissing.length}/${fish.length}`);
if (fishMissing.length > 0) {
  console.log('  缺失:', fishMissing.slice(0, 10).join(', '), fishMissing.length > 10 ? `... (+${fishMissing.length - 10})` : '');
}

// 检查 NPC 图片
let npcsMissing = [];
npcs.forEach(npc => {
  const webp = path.join(imagesDir, 'npcs', npc.slug + '.webp');
  const png = path.join(imagesDir, 'npcs', npc.slug + '.png');
  if (!fs.existsSync(webp) && !fs.existsSync(png)) {
    npcsMissing.push(npc.slug);
  }
});
console.log(`NPCs 图片: ${npcs.length - npcsMissing.length}/${npcs.length}`);
if (npcsMissing.length > 0) {
  console.log('  缺失:', npcsMissing.join(', '));
}

console.log('\n=== 总结 ===');
const totalMissing = itemsMissing.length + fishMissing.length + npcsMissing.length;
if (totalMissing === 0) {
  console.log('✅ 所有图片都存在');
} else {
  console.log(`❌ 缺失 ${totalMissing} 个图片`);
  
  // 输出缺失的完整列表
  if (itemsMissing.length > 0) {
    console.log('\n缺失的 Items 图片:');
    itemsMissing.forEach(s => console.log('  - ' + s));
  }
  if (fishMissing.length > 0) {
    console.log('\n缺失的 Fish 图片:');
    fishMissing.forEach(s => console.log('  - ' + s));
  }
}
