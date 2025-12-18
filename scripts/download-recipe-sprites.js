/**
 * 下载 Stardew Valley 食谱/烹饪物品的 Sprite 图片
 * 来源: Stardew Valley Wiki
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 食谱物品的 Wiki 图片名称映射
// 格式: slug -> Wiki文件名 (不含扩展名)
const RECIPE_SPRITE_MAP = {
  'fried-egg': 'Fried_Egg',
  'omelet': 'Omelet',
  'salad': 'Salad',
  'cheese-cauliflower': 'Cheese_Cauliflower',
  'baked-fish': 'Baked_Fish',
  'parsnip-soup': 'Parsnip_Soup',
  'vegetable-medley': 'Vegetable_Medley',
  'complete-breakfast': 'Complete_Breakfast',
  'fried-calamari': 'Fried_Calamari',
  'strange-bun': 'Strange_Bun',
  'lucky-lunch': 'Lucky_Lunch',
  'fried-mushroom': 'Fried_Mushroom',
  'pizza': 'Pizza',
  'bean-hotpot': 'Bean_Hotpot',
  'glazed-yams': 'Glazed_Yams',
  'carp-surprise': 'Carp_Surprise',
  'hashbrowns': 'Hashbrowns',
  'pancakes': 'Pancakes',
  'salmon-dinner': 'Salmon_Dinner',
  'fish-taco': 'Fish_Taco',
  'crispy-bass': 'Crispy_Bass',
  'pepper-poppers': 'Pepper_Poppers',
  'bread': 'Bread',
  'tom-kha-soup': 'Tom_Kha_Soup',
  'trout-soup': 'Trout_Soup',
  'chocolate-cake': 'Chocolate_Cake',
  'pink-cake': 'Pink_Cake',
  'rhubarb-pie': 'Rhubarb_Pie',
  'cookie': 'Cookie',
  'spaghetti': 'Spaghetti',
  'fried-eel': 'Fried_Eel',
  'spicy-eel': 'Spicy_Eel',
  'sashimi': 'Sashimi',
  'maki-roll': 'Maki_Roll',
  'tortilla': 'Tortilla',
  'red-plate': 'Red_Plate',
  'eggplant-parmesan': 'Eggplant_Parmesan',
  'rice-pudding': 'Rice_Pudding',
  'ice-cream': 'Ice_Cream',
  'blueberry-tart': 'Blueberry_Tart',
  'autumns-bounty': "Autumn's_Bounty",
  'pumpkin-soup': 'Pumpkin_Soup',
  'super-meal': 'Super_Meal',
  'cranberry-sauce': 'Cranberry_Sauce',
  'stuffing': 'Stuffing',
  'farmers-lunch': "Farmer's_Lunch",
  'survival-burger': 'Survival_Burger',
  'dish-o-the-sea': "Dish_O'_The_Sea",
  'miners-treat': "Miner's_Treat",
  'roots-platter': 'Roots_Platter',
  'seafoam-pudding': 'Seafoam_Pudding',
  'pale-broth': 'Pale_Broth',
  'plum-pudding': 'Plum_Pudding',
  'artichoke-dip': 'Artichoke_Dip',
  'stir-fry': 'Stir_Fry',
  'roasted-hazelnuts': 'Roasted_Hazelnuts',
  'poppyseed-muffin': 'Poppyseed_Muffin',
  'chowder': 'Chowder',
  'lobster-bisque': 'Lobster_Bisque',
  'escargot': 'Escargot',
  'fish-stew': 'Fish_Stew',
  'maple-bar': 'Maple_Bar',
  'crab-cakes': 'Crab_Cakes',
  'shrimp-cocktail': 'Shrimp_Cocktail',
  'ginger-ale': 'Ginger_Ale',
  'banana-pudding': 'Banana_Pudding',
  'mango-sticky-rice': 'Mango_Sticky_Rice',
  'poi': 'Poi',
  'tropical-curry': 'Tropical_Curry',
  'squid-ink-ravioli': 'Squid_Ink_Ravioli',
  'pumpkin-pie': 'Pumpkin_Pie',
  'radish-salad': 'Radish_Salad',
  'fruit-salad': 'Fruit_Salad',
  'blackberry-cobbler': 'Blackberry_Cobbler',
  'cranberry-candy': 'Cranberry_Candy',
  'bruschetta': 'Bruschetta',
  'coleslaw': 'Coleslaw',
  'fiddlehead-risotto': 'Fiddlehead_Risotto',
  'moss-soup': 'Moss_Soup',
  'triple-shot-espresso': 'Triple_Shot_Espresso',
};

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'items');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 从 Wiki 下载图片
 */
function downloadImage(wikiName, slug) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`);
    
    // 如果文件已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  跳过 ${slug} (已存在)`);
      resolve({ slug, status: 'skipped' });
      return;
    }

    // Wiki 图片 URL 格式
    // 尝试多种可能的 URL 格式
    const urls = [
      `https://stardewvalleywiki.com/mediawiki/images/${wikiName}.png`,
      `https://stardewvalleywiki.com/mediawiki/images/thumb/${wikiName}.png/48px-${wikiName}.png`,
    ];

    // 使用 stardewcommunitywiki.com 的直接链接格式
    const firstChar = wikiName.charAt(0).toLowerCase();
    const hash = require('crypto').createHash('md5').update(wikiName + '.png').digest('hex');
    const wikiUrl = `https://stardewcommunitywiki.com/mediawiki/images/${hash.substring(0,1)}/${hash.substring(0,2)}/${wikiName}.png`;
    
    console.log(`📥 下载 ${slug}...`);
    
    // 使用简单的方法：通过 Wiki 页面获取图片
    const pageUrl = `https://stardewvalleywiki.com/File:${wikiName}.png`;
    
    https.get(wikiUrl, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 跟随重定向
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, { 
          headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res2) => {
          handleResponse(res2, outputPath, slug, resolve, reject);
        }).on('error', reject);
      } else {
        handleResponse(response, outputPath, slug, resolve, reject);
      }
    }).on('error', (err) => {
      console.error(`❌ 下载失败 ${slug}: ${err.message}`);
      reject(err);
    });
  });
}

function handleResponse(response, outputPath, slug, resolve, reject) {
  if (response.statusCode !== 200) {
    console.error(`❌ HTTP ${response.statusCode} for ${slug}`);
    resolve({ slug, status: 'failed', code: response.statusCode });
    return;
  }
  
  // 保存为 PNG 先（之后可以转换为 webp）
  const pngPath = outputPath.replace('.webp', '.png');
  const file = fs.createWriteStream(pngPath);
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log(`✅ 已下载 ${slug}`);
    resolve({ slug, status: 'success', path: pngPath });
  });
  
  file.on('error', (err) => {
    fs.unlink(pngPath, () => {});
    reject(err);
  });
}

/**
 * 主函数
 */
async function main() {
  console.log('🍳 开始下载食谱 Sprite 图片...\n');
  console.log(`📁 输出目录: ${OUTPUT_DIR}\n`);
  
  const results = { success: [], failed: [], skipped: [] };
  
  for (const [slug, wikiName] of Object.entries(RECIPE_SPRITE_MAP)) {
    try {
      const result = await downloadImage(wikiName, slug);
      results[result.status].push(slug);
      
      // 添加延迟避免请求过快
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      results.failed.push(slug);
    }
  }
  
  console.log('\n📊 下载完成统计:');
  console.log(`   ✅ 成功: ${results.success.length}`);
  console.log(`   ⏭️  跳过: ${results.skipped.length}`);
  console.log(`   ❌ 失败: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ 失败的项目:');
    results.failed.forEach(s => console.log(`   - ${s}`));
  }
  
  console.log('\n💡 提示: PNG 文件需要手动转换为 WebP 格式');
  console.log('   可以使用: npx sharp-cli *.png -o . -f webp');
}

main().catch(console.error);
