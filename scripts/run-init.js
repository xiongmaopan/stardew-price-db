// 直接测试 init 函数
const fs = require('fs');
const path = require('path');

try {

const CONFIG = {
  pagesPerDay: 5,
  scheduleFile: path.join(__dirname, '../data/sitemap-schedule.json'),
  sitemapOutput: path.join(__dirname, '../public/sitemap-scheduled.xml'),
  baseUrl: 'https://stardewpricedb.com'
};

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.appendFileSync(path.join(__dirname, 'error.log'), `File not found: ${filePath}\n`);
    return null;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

function getAllPages() {
  const items = loadJSON(path.join(__dirname, '../data/items.json'));
  const fish = loadJSON(path.join(__dirname, '../data/fish.json'));
  const npcs = loadJSON(path.join(__dirname, '../data/npcs.json'));
  const recipes = loadJSON(path.join(__dirname, '../data/recipes.json'));
  const bundles = loadJSON(path.join(__dirname, '../data/bundles.json'));
  
  const corePages = [
    '/',
    '/guide/',
    '/fishing/',
    '/gifts/',
    '/bundles/',
    '/recipes/',
    '/calculator/spring/',
    '/calculator/summer/',
    '/calculator/fall/',
    '/calculator/winter/',
    '/calculator/greenhouse/',
  ];
  
  const guides = [
    '/guide/most-profitable-crops/',
    '/guide/keg-vs-jar/',
    '/guide/ancient-fruit/',
    '/guide/greenhouse-layout/',
    '/guide/animal-profit/',
    '/guide/mining-profit/',
    '/guide/best-fish-pond/',
    '/guide/year-1-money/',
    '/guide/community-center/',
    '/guide/best-gifts/',
    '/guide/foraging-profit/',
    '/guide/skull-cavern/',
  ];
  
  const itemPages = items?.items?.map(i => `/item/${i.slug}/`) || [];
  const fishPages = fish?.fish?.map(f => `/fishing/${f.slug}/`) || [];
  const giftPages = npcs?.npcs?.map(n => `/gift/${n.slug}/`) || [];
  const recipePages = recipes?.recipes?.map(r => `/recipe/${r.slug}/`) || [];
  const bundlePages = bundles?.bundles?.map(b => `/bundle/${b.slug}/`) || [];
  
  return [
    ...corePages,
    ...guides,
    ...itemPages.slice(0, 50),
    ...fishPages,
    ...giftPages,
    ...itemPages.slice(50),
    ...recipePages,
    ...bundlePages,
  ];
}

// 执行 init
const allPages = getAllPages();
const today = new Date().toISOString().split('T')[0];

const schedule = {
  createdAt: today,
  totalPages: allPages.length,
  pagesPerDay: CONFIG.pagesPerDay,
  publishedCount: 0,
  lastPublishDate: null,
  pages: allPages.map((url, index) => ({
    url,
    priority: index < 20 ? 1.0 : (index < 50 ? 0.8 : 0.6),
    scheduledDay: Math.floor(index / CONFIG.pagesPerDay),
    published: false,
    publishedAt: null
  }))
};

fs.writeFileSync(CONFIG.scheduleFile, JSON.stringify(schedule, null, 2));

const totalDays = Math.ceil(allPages.length / CONFIG.pagesPerDay);

// 写入结果文件
const result = `
发布计划已创建！
总页面数: ${allPages.length}
每天发布: ${CONFIG.pagesPerDay} 页
预计完成: ${totalDays} 天
计划文件: ${CONFIG.scheduleFile}
`;

fs.writeFileSync(path.join(__dirname, 'init-output.txt'), result);
console.log('Done! Check scripts/init-output.txt');

} catch (e) {
  fs.writeFileSync(path.join(__dirname, 'error.log'), e.stack || e.message);
}
