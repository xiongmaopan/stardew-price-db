/**
 * 程序化 SEO 页面生成器
 * 
 * 这个脚本展示如何自动化扩展网站的 SEO 页面
 * 运行: node scripts/generate-seo-pages.js
 */

const fs = require('fs');
const path = require('path');

// 读取物品数据
const data = require('../data/items.json');
const items = data.items;

/**
 * 1. 生成分类页面数据
 * 用于创建 /category/[category] 页面
 */
function generateCategoryPages() {
  const categories = [...new Set(items.map(item => item.category))];
  
  console.log('\n📁 可生成的分类页面:');
  categories.forEach(cat => {
    const count = items.filter(i => i.category === cat).length;
    console.log(`   /category/${cat} (${count} 个物品)`);
  });
  
  return categories;
}

/**
 * 2. 生成季节页面数据
 * 用于创建 /season/[season] 页面
 */
function generateSeasonPages() {
  const seasons = ['spring', 'summer', 'fall', 'winter'];
  
  console.log('\n🌸 可生成的季节页面:');
  seasons.forEach(season => {
    const count = items.filter(i => i.season && i.season.includes(season)).length;
    console.log(`   /season/${season} (${count} 个物品)`);
  });
  
  return seasons;
}

/**
 * 3. 生成对比页面组合
 * 用于创建 /compare/[item1]-vs-[item2] 页面
 */
function generateComparisonPages() {
  // 只对比同类型、同季节的作物
  const crops = items.filter(i => i.category === 'crop');
  const comparisons = [];
  
  for (let i = 0; i < crops.length; i++) {
    for (let j = i + 1; j < crops.length; j++) {
      const item1 = crops[i];
      const item2 = crops[j];
      
      // 检查是否有相同季节
      const sharedSeasons = item1.season?.filter(s => item2.season?.includes(s));
      
      if (sharedSeasons && sharedSeasons.length > 0) {
        comparisons.push({
          slug: `${item1.id}-vs-${item2.id}`,
          item1: item1.id,
          item2: item2.id,
          seasons: sharedSeasons
        });
      }
    }
  }
  
  console.log(`\n⚔️ 可生成的对比页面: ${comparisons.length} 个`);
  console.log('   示例:');
  comparisons.slice(0, 5).forEach(c => {
    console.log(`   /compare/${c.slug}`);
  });
  
  return comparisons;
}

/**
 * 4. 生成长尾关键词指南页面
 * 用于创建 /guide/[topic] 页面
 */
function generateGuideTopics() {
  const guides = [
    // 季节最佳作物
    { slug: 'best-spring-crops', title: 'Best Spring Crops for Profit' },
    { slug: 'best-summer-crops', title: 'Best Summer Crops for Profit' },
    { slug: 'best-fall-crops', title: 'Best Fall Crops for Profit' },
    { slug: 'best-greenhouse-crops', title: 'Best Greenhouse Crops' },
    
    // 职业指南
    { slug: 'tiller-vs-artisan', title: 'Tiller vs Artisan: Which is Better?' },
    { slug: 'rancher-profession-guide', title: 'Rancher Profession Guide' },
    { slug: 'fisher-vs-angler', title: 'Fisher vs Angler Comparison' },
    
    // 加工指南
    { slug: 'keg-vs-preserves-jar', title: 'Keg vs Preserves Jar: Profit Analysis' },
    { slug: 'best-items-for-kegs', title: 'Best Items to Put in Kegs' },
    { slug: 'best-items-for-jars', title: 'Best Items for Preserves Jars' },
    
    // 利润指南
    { slug: 'highest-profit-crops', title: 'Highest Profit Crops in Stardew Valley' },
    { slug: 'gold-per-day-guide', title: 'Maximizing Gold Per Day' },
    { slug: 'fertilizer-profit-guide', title: 'Fertilizer ROI Calculator Guide' },
    
    // 初学者指南
    { slug: 'beginner-crop-guide', title: 'Beginner Crop Guide' },
    { slug: 'year-one-money-guide', title: 'Year 1 Money Making Guide' },
  ];
  
  console.log(`\n📖 可生成的指南页面: ${guides.length} 个`);
  guides.forEach(g => {
    console.log(`   /guide/${g.slug} - "${g.title}"`);
  });
  
  return guides;
}

/**
 * 5. 生成 SEO 统计报告
 */
function generateSEOReport() {
  const categories = generateCategoryPages();
  const seasons = generateSeasonPages();
  const comparisons = generateComparisonPages();
  const guides = generateGuideTopics();
  
  const totalPages = 
    items.length +          // 物品页面
    5 +                     // 计算器页面
    categories.length +     // 分类页面
    4 +                     // 季节页面
    comparisons.length +    // 对比页面
    guides.length +         // 指南页面
    1;                      // 首页
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 程序化 SEO 潜力报告');
  console.log('='.repeat(50));
  console.log(`
当前页面:
  - 物品详情页: ${items.length}
  - 计算器页面: 5
  - 首页: 1
  
可扩展页面:
  - 分类页面: ${categories.length}
  - 季节页面: 4
  - 对比页面: ${comparisons.length}
  - 指南页面: ${guides.length}
  
总潜在页面数: ${totalPages}
`);
  
  return {
    items: items.length,
    categories,
    seasons,
    comparisons,
    guides,
    totalPages
  };
}

/**
 * 6. 输出 generateStaticParams 代码
 */
function outputStaticParamsCode() {
  console.log('\n' + '='.repeat(50));
  console.log('📝 可复制的 generateStaticParams 代码');
  console.log('='.repeat(50));
  
  // 分类页面
  console.log(`
// app/category/[category]/page.js
export async function generateStaticParams() {
  const items = require('@/data/items.json');
  const categories = [...new Set(items.map(item => item.category))];
  return categories.map(category => ({ category }));
}
`);

  // 对比页面
  console.log(`
// app/compare/[slug]/page.js
export async function generateStaticParams() {
  const items = require('@/data/items.json');
  const crops = items.filter(i => i.category === 'crop');
  const params = [];
  
  for (let i = 0; i < crops.length; i++) {
    for (let j = i + 1; j < crops.length; j++) {
      params.push({ slug: \`\${crops[i].id}-vs-\${crops[j].id}\` });
    }
  }
  
  return params;
}
`);
}

// 运行报告
console.log('🌟 StardewPriceDB 程序化 SEO 分析器\n');
generateSEOReport();
outputStaticParamsCode();

console.log(`
💡 扩展 pSEO 的步骤:

1. 添加更多物品到 data/items.json
   → 自动生成对应的 /item/[slug] 页面

2. 创建新的动态路由文件夹
   → 例如 app/category/[category]/page.js

3. 实现 generateStaticParams() 和 generateMetadata()
   → 自动生成所有页面和 SEO 元数据

4. 更新 sitemap.js 包含新页面
   → 帮助搜索引擎发现新页面

5. 运行 npm run build
   → 所有页面自动静态生成

6. 部署到 Cloudflare Pages
   → 完成！
`);
