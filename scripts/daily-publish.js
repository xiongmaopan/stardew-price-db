/**
 * 每日发布脚本 - 执行一次滴水式发布
 */
const fs = require('fs');
const path = require('path');

const CONFIG = {
  pagesPerDay: 5,
  scheduleFile: path.join(__dirname, '../data/sitemap-schedule.json'),
  sitemapOutput: path.join(__dirname, '../public/sitemap-scheduled.xml'),
  baseUrl: 'https://stardewpricedb.com'
};

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

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
  
  fs.writeFileSync(CONFIG.sitemapOutput, xml);
  return publishedPages.length;
}

try {
  const schedule = loadJSON(CONFIG.scheduleFile);
  if (!schedule) {
    console.log('ERROR: Schedule file not found. Run init first.');
    process.exit(1);
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  // 检查今天是否已发布
  if (schedule.lastPublishDate === today) {
    console.log(`Already published today (${today})`);
    process.exit(0);
  }
  
  // 找到待发布的页面
  const unpublished = schedule.pages.filter(p => !p.published);
  const toPublish = unpublished.slice(0, CONFIG.pagesPerDay);
  
  if (toPublish.length === 0) {
    console.log('All pages published!');
    process.exit(0);
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
  
  // 保存
  fs.writeFileSync(CONFIG.scheduleFile, JSON.stringify(schedule, null, 2));
  
  // 生成 sitemap
  const total = generateSitemap(schedule);
  
  console.log(`Published ${toPublish.length} pages today`);
  console.log(`Total in sitemap: ${total}/${schedule.totalPages}`);
  console.log(`URLs published today:`);
  toPublish.forEach(p => console.log(`  - ${p.url}`));
  
} catch (e) {
  console.error('Error:', e.message);
  fs.writeFileSync(path.join(__dirname, 'daily-error.log'), e.stack || e.message);
  process.exit(1);
}
