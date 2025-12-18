/**
 * 星露谷物品图片下载脚本
 * 从 Stardew Valley Wiki 下载物品 sprites
 * 
 * 使用方法: node scripts/download-sprites.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 读取物品数据
const itemsData = require('../data/items.json');

// Wiki 图片 URL 映射（部分物品名称与 Wiki 不同）
const WIKI_NAME_MAP = {
  'green-bean': 'Green_Bean',
  'blue-jazz': 'Blue_Jazz',
  'summer-spangle': 'Summer_Spangle',
  'fairy-rose': 'Fairy_Rose',
  'sweet-gem-berry': 'Sweet_Gem_Berry',
  'ancient-fruit': 'Ancient_Fruit',
  'red-cabbage': 'Red_Cabbage',
  'bok-choy': 'Bok_Choy',
  'hot-pepper': 'Hot_Pepper',
  'large-milk': 'Large_Milk',
  'large-egg': 'Large_Egg_(white)',
  'large-brown-egg': 'Large_Egg_(brown)',
  'goat-milk': 'Goat_Milk',
  'large-goat-milk': 'Large_Goat_Milk',
  'duck-egg': 'Duck_Egg',
  'void-egg': 'Void_Egg',
  'rainbow-shell': 'Rainbow_Shell',
  'sea-cucumber': 'Sea_Cucumber',
  'red-snapper': 'Red_Snapper',
  'red-mullet': 'Red_Mullet',
  'tiger-trout': 'Tiger_Trout',
  'largemouth-bass': 'Largemouth_Bass',
  'smallmouth-bass': 'Smallmouth_Bass',
  'rainbow-trout': 'Rainbow_Trout',
  'fire-quartz': 'Fire_Quartz',
  'frozen-tear': 'Frozen_Tear',
  'earth-crystal': 'Earth_Crystal',
  'common-mushroom': 'Common_Mushroom',
  'wild-horseradish': 'Wild_Horseradish',
  'snow-yam': 'Snow_Yam',
  'winter-root': 'Winter_Root',
  'crystal-fruit': 'Crystal_Fruit',
  'fiddlehead-fern': 'Fiddlehead_Fern',
  'wild-plum': 'Wild_Plum',
  'spring-onion': 'Spring_Onion',
};

// 图片保存目录
const OUTPUT_DIR = path.join(__dirname, '../public/images/items');

// 确保目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 下载图片函数
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(OUTPUT_DIR, filename);
    
    // 如果文件已存在，跳过
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skip: ${filename} (already exists)`);
      resolve('skipped');
      return;
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // 处理重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve('downloaded');
      });
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

// 生成 Wiki 图片 URL
function getWikiImageUrl(itemName, slug) {
  // 使用映射或转换名称
  let wikiName = WIKI_NAME_MAP[slug];
  
  if (!wikiName) {
    // 默认转换: 首字母大写，空格变下划线
    wikiName = itemName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
  }
  
  // Wiki 图片 URL 格式
  return `https://stardewvalleywiki.com/mediawiki/images/${wikiName}.png`;
}

// 主函数
async function main() {
  console.log('🌾 Stardew Valley Sprite Downloader');
  console.log('====================================\n');
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  
  const items = itemsData.items;
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  console.log('⚠️  注意: Wiki 图片 URL 格式复杂，建议手动下载');
  console.log('📖 参考: https://stardewvalleywiki.com/Mediawiki:File_list\n');
  
  console.log('📋 物品列表 (复制 URL 到浏览器下载):');
  console.log('---------------------------------------\n');
  
  for (const item of items) {
    const filename = `${item.slug}.png`;
    const wikiPage = `https://stardewvalleywiki.com/${item.name.replace(/ /g, '_')}`;
    
    console.log(`${item.name}:`);
    console.log(`  📄 Wiki: ${wikiPage}`);
    console.log(`  💾 Save as: ${filename}\n`);
  }

  console.log('\n📝 手动下载步骤:');
  console.log('1. 访问物品的 Wiki 页面');
  console.log('2. 右键点击物品图片 → 保存图片');
  console.log(`3. 保存到: ${OUTPUT_DIR}`);
  console.log('4. 使用 slug 作为文件名 (如 parsnip.png)');
  
  console.log('\n💡 或者使用在线 sprite sheet:');
  console.log('https://www.spriters-resource.com/pc_computer/stardewvalley/');
}

main();
