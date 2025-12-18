/**
 * 物品图片 URL 列表
 * 来源：Stardew Valley Wiki
 * 
 * 使用方法：手动下载这些图片到 public/images/items/ 目录
 * 文件名使用 slug 格式（如 parsnip.png）
 */

const SPRITE_URLS = {
  // === 春季作物 ===
  'parsnip': 'https://stardewvalleywiki.com/mediawiki/images/8/8a/Parsnip.png',
  'cauliflower': 'https://stardewvalleywiki.com/mediawiki/images/f/fb/Cauliflower.png',
  'potato': 'https://stardewvalleywiki.com/mediawiki/images/c/c2/Potato.png',
  'strawberry': 'https://stardewvalleywiki.com/mediawiki/images/4/4c/Strawberry.png',
  'kale': 'https://stardewvalleywiki.com/mediawiki/images/6/68/Kale.png',
  'garlic': 'https://stardewvalleywiki.com/mediawiki/images/5/54/Garlic.png',
  'rhubarb': 'https://stardewvalleywiki.com/mediawiki/images/6/6e/Rhubarb.png',
  
  // === 夏季作物 ===
  'melon': 'https://stardewvalleywiki.com/mediawiki/images/1/19/Melon.png',
  'blueberry': 'https://stardewvalleywiki.com/mediawiki/images/9/95/Blueberry.png',
  'starfruit': 'https://stardewvalleywiki.com/mediawiki/images/1/1d/Starfruit.png',
  'tomato': 'https://stardewvalleywiki.com/mediawiki/images/9/9d/Tomato.png',
  'corn': 'https://stardewvalleywiki.com/mediawiki/images/7/78/Corn.png',
  'red-cabbage': 'https://stardewvalleywiki.com/mediawiki/images/e/e1/Red_Cabbage.png',
  'radish': 'https://stardewvalleywiki.com/mediawiki/images/8/87/Radish.png',
  'hot-pepper': 'https://stardewvalleywiki.com/mediawiki/images/f/f1/Hot_Pepper.png',
  
  // === 秋季作物 ===
  'pumpkin': 'https://stardewvalleywiki.com/mediawiki/images/5/58/Pumpkin.png',
  'cranberries': 'https://stardewvalleywiki.com/mediawiki/images/3/33/Cranberries.png',
  'grape': 'https://stardewvalleywiki.com/mediawiki/images/1/18/Grape.png',
  'eggplant': 'https://stardewvalleywiki.com/mediawiki/images/1/1c/Eggplant.png',
  'yam': 'https://stardewvalleywiki.com/mediawiki/images/2/24/Yam.png',
  'amaranth': 'https://stardewvalleywiki.com/mediawiki/images/c/cd/Amaranth.png',
  'artichoke': 'https://stardewvalleywiki.com/mediawiki/images/1/1f/Artichoke.png',
  'beet': 'https://stardewvalleywiki.com/mediawiki/images/3/39/Beet.png',
  'bok-choy': 'https://stardewvalleywiki.com/mediawiki/images/b/bc/Bok_Choy.png',
  
  // === 特殊作物 ===
  'ancient-fruit': 'https://stardewvalleywiki.com/mediawiki/images/4/43/Ancient_Fruit.png',
  'sweet-gem-berry': 'https://stardewvalleywiki.com/mediawiki/images/e/e3/Sweet_Gem_Berry.png',
  'coffee-bean': 'https://stardewvalleywiki.com/mediawiki/images/d/d4/Coffee_Bean.png',
  
  // === 鱼类 ===
  'salmon': 'https://stardewvalleywiki.com/mediawiki/images/4/40/Salmon.png',
  'sturgeon': 'https://stardewvalleywiki.com/mediawiki/images/1/19/Sturgeon.png',
  'tuna': 'https://stardewvalleywiki.com/mediawiki/images/c/cc/Tuna.png',
  'eel': 'https://stardewvalleywiki.com/mediawiki/images/9/96/Eel.png',
  'catfish': 'https://stardewvalleywiki.com/mediawiki/images/5/53/Catfish.png',
  'pike': 'https://stardewvalleywiki.com/mediawiki/images/6/6a/Pike.png',
  'carp': 'https://stardewvalleywiki.com/mediawiki/images/9/9c/Carp.png',
  
  // === 矿物 ===
  'diamond': 'https://stardewvalleywiki.com/mediawiki/images/e/e5/Diamond.png',
  'emerald': 'https://stardewvalleywiki.com/mediawiki/images/0/09/Emerald.png',
  'ruby': 'https://stardewvalleywiki.com/mediawiki/images/e/ed/Ruby.png',
  'amethyst': 'https://stardewvalleywiki.com/mediawiki/images/6/67/Amethyst.png',
  'topaz': 'https://stardewvalleywiki.com/mediawiki/images/3/30/Topaz.png',
  'jade': 'https://stardewvalleywiki.com/mediawiki/images/9/9f/Jade.png',
  'aquamarine': 'https://stardewvalleywiki.com/mediawiki/images/e/ea/Aquamarine.png',
  
  // === 动物产品 ===
  'egg': 'https://stardewvalleywiki.com/mediawiki/images/5/54/Egg.png',
  'milk': 'https://stardewvalleywiki.com/mediawiki/images/9/92/Milk.png',
  'wool': 'https://stardewvalleywiki.com/mediawiki/images/c/ca/Wool.png',
  'truffle': 'https://stardewvalleywiki.com/mediawiki/images/6/68/Truffle.png',
  'duck-egg': 'https://stardewvalleywiki.com/mediawiki/images/5/50/Duck_Egg.png',
  
  // === 觅食 ===
  'leek': 'https://stardewvalleywiki.com/mediawiki/images/5/5e/Leek.png',
  'morel': 'https://stardewvalleywiki.com/mediawiki/images/2/24/Morel.png',
  'chanterelle': 'https://stardewvalleywiki.com/mediawiki/images/c/c4/Chanterelle.png',
  'hazelnut': 'https://stardewvalleywiki.com/mediawiki/images/a/a9/Hazelnut.png',
  'blackberry': 'https://stardewvalleywiki.com/mediawiki/images/4/47/Blackberry.png',
};

// 生成下载命令
console.log('# 物品图片下载命令 (PowerShell)\n');
console.log('# 复制以下命令到 PowerShell 执行:\n');

Object.entries(SPRITE_URLS).forEach(([slug, url]) => {
  console.log(`Invoke-WebRequest -Uri "${url}" -OutFile "public\\images\\items\\${slug}.png" -Headers @{"User-Agent"="Mozilla/5.0"}`);
});

console.log('\n# 或者打开以下链接手动下载:');
Object.entries(SPRITE_URLS).forEach(([slug, url]) => {
  console.log(`# ${slug}: ${url}`);
});

module.exports = SPRITE_URLS;
