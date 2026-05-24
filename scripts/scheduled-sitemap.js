/**
 * 定时 Sitemap 生成器
 * 每天自动增加新页面到 sitemap，实现"滴水式发布"
 * 
 * 使用方法：
 * 1. 首次运行：node scripts/scheduled-sitemap.js init
 * 2. 每日运行：node scripts/scheduled-sitemap.js daily (GitHub Actions 自动)
 * 3. 检查状态：node scripts/scheduled-sitemap.js status
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 每天发布的新页面数量
  pagesPerDay: 2,
  
  // 发布计划文件
  scheduleFile: path.join(__dirname, '../data/sitemap-schedule.json'),
  
  // 输出的 sitemap
  sitemapOutput: path.join(__dirname, '../public/sitemap-scheduled.xml'),
  
  // 基础 URL
  baseUrl: 'https://stardewpricedb.com'
};

/**
 * 加载 JSON（处理注释）
 */
function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

/**
 * 获取所有可发布的页面 URL
 */
function getAllPages() {
  const items = loadJSON(path.join(__dirname, '../data/items.json'));
  const fish = loadJSON(path.join(__dirname, '../data/fish.json'));
  const npcs = loadJSON(path.join(__dirname, '../data/npcs.json'));
  const recipes = loadJSON(path.join(__dirname, '../data/recipes.json'));
  const bundles = loadJSON(path.join(__dirname, '../data/bundles.json'));
  
  const pages = [];
  
  // 核心页面（优先发布）
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
  
  // 指南页面（第二优先）
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
  
  // 物品页面
  const itemPages = items?.items?.map(i => `/item/${i.slug}/`) || [];
  
  // 鱼类页面
  const fishPages = fish?.fish?.map(f => `/fishing/${f.slug}/`) || [];
  
  // NPC 礼物页面
  const giftPages = npcs?.npcs?.map(n => `/gift/${n.slug}/`) || [];
  
  // 食谱页面
  const recipePages = recipes?.recipes?.map(r => `/recipe/${r.slug}/`) || [];
  
  // Bundle 页面
  const bundlePages = bundles?.bundles?.map(b => `/bundle/${b.slug}/`) || [];
  
  // 按优先级排序
  return [
    ...corePages,
    ...guides,
    ...itemPages.slice(0, 50),  // 热门物品优先
    ...fishPages,
    ...giftPages,
    ...itemPages.slice(50),     // 剩余物品
    ...recipePages,
    ...bundlePages,
  ];
}

/**
 * 初始化发布计划
 */
function initSchedule() {
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
  console.log(`✅ 发布计划已创建！`);
  console.log(`   总页面数: ${allPages.length}`);
  console.log(`   每天发布: ${CONFIG.pagesPerDay} 页`);
  console.log(`   预计完成: ${totalDays} 天`);
  console.log(`   计划文件: ${CONFIG.scheduleFile}`);
}

/**
 * 每日发布（增加新页面到 sitemap）
 */
function dailyPublish() {
  const schedule = loadJSON(CONFIG.scheduleFile);
  if (!schedule) {
    console.error('❌ 发布计划不存在，请先运行: node scripts/scheduled-sitemap.js init');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  // 检查今天是否已发布
  if (schedule.lastPublishDate === today) {
    console.log(`ℹ️  今天 (${today}) 已经发布过了`);
    return;
  }
  
  // 找到待发布的页面
  const unpublished = schedule.pages.filter(p => !p.published);
  const toPublish = unpublished.slice(0, CONFIG.pagesPerDay);
  
  if (toPublish.length === 0) {
    console.log('🎉 所有页面已发布完成！');
    return;
  }
  
  // 标记为已发布
  toPublish.forEach(page => {
    const found = schedule.pages.find(p => p.url === page.url);
    if (found) {
      found.published = true;
      found.publishedAt = today;
    }
  });
  
  schedule.publishedCount += toPublish.length;
  schedule.lastPublishDate = today;
  
  // 保存更新后的计划
  fs.writeFileSync(CONFIG.scheduleFile, JSON.stringify(schedule, null, 2));
  
  // 生成新的 sitemap
  generateSitemap(schedule);
  
  console.log(`✅ 今日发布成功！`);
  console.log(`   新增页面: ${toPublish.length}`);
  console.log(`   已发布总数: ${schedule.publishedCount}/${schedule.totalPages}`);
  console.log(`   今日发布的 URL:`);
  toPublish.forEach(p => console.log(`   - ${p.url}`));
}

/**
 * 生成 sitemap.xml（只包含已发布的页面）
 */
function generateSitemap(schedule) {
  const publishedPages = schedule.pages.filter(p => p.published);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  publishedPages.forEach(page => {
    xml += `  <url>
    <loc>${CONFIG.baseUrl}${page.url}</loc>
    <lastmod>${page.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  
  fs.mkdirSync(path.dirname(CONFIG.sitemapOutput), { recursive: true });
  fs.writeFileSync(CONFIG.sitemapOutput, xml);
  console.log(`📄 Sitemap 已更新: ${CONFIG.sitemapOutput}`);
}

/**
 * 查看发布状态
 */
function showStatus() {
  const schedule = loadJSON(CONFIG.scheduleFile);
  if (!schedule) {
    console.log('❌ 发布计划不存在');
    return;
  }
  
  const remaining = schedule.pages.filter(p => !p.published).length;
  const daysRemaining = Math.ceil(remaining / CONFIG.pagesPerDay);
  
  console.log(`\n📊 发布状态`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`创建日期: ${schedule.createdAt}`);
  console.log(`最后发布: ${schedule.lastPublishDate || '未开始'}`);
  console.log(`已发布: ${schedule.publishedCount}/${schedule.totalPages} 页`);
  console.log(`剩余: ${remaining} 页`);
  console.log(`预计还需: ${daysRemaining} 天`);
  console.log(`进度: ${Math.round(schedule.publishedCount / schedule.totalPages * 100)}%`);
  
  // 进度条
  const progress = Math.round(schedule.publishedCount / schedule.totalPages * 30);
  const bar = '█'.repeat(progress) + '░'.repeat(30 - progress);
  console.log(`[${bar}]`);
}

/**
 * 强制发布所有页面（用于紧急情况）
 */
function publishAll() {
  const schedule = loadJSON(CONFIG.scheduleFile);
  if (!schedule) {
    console.error('❌ 发布计划不存在');
    return;
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  schedule.pages.forEach(page => {
    page.published = true;
    page.publishedAt = today;
  });
  
  schedule.publishedCount = schedule.totalPages;
  schedule.lastPublishDate = today;
  
  fs.writeFileSync(CONFIG.scheduleFile, JSON.stringify(schedule, null, 2));
  generateSitemap(schedule);
  
  console.log(`✅ 已发布所有 ${schedule.totalPages} 个页面`);
}

// 命令行处理
const command = process.argv[2];

switch (command) {
  case 'init':
    initSchedule();
    break;
  case 'daily':
    dailyPublish();
    break;
  case 'status':
    showStatus();
    break;
  case 'all':
    publishAll();
    break;
  default:
    console.log(`
定时 Sitemap 发布工具
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

命令:
  init    - 初始化发布计划
  daily   - 执行每日发布（GitHub Actions 自动调用）
  status  - 查看发布状态
  all     - 强制发布所有页面

示例:
  node scripts/scheduled-sitemap.js init
  node scripts/scheduled-sitemap.js daily
  node scripts/scheduled-sitemap.js status
    `);
}
