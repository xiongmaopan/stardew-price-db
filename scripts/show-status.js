/**
 * 查看发布状态
 */
const fs = require('fs');
const path = require('path');

const scheduleFile = path.join(__dirname, '../data/sitemap-schedule.json');

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

const schedule = loadJSON(scheduleFile);

if (!schedule) {
  console.log('❌ 发布计划不存在');
  console.log('   运行: node scripts/run-init.js');
  process.exit(1);
}

const remaining = schedule.pages.filter(p => !p.published).length;
const daysRemaining = Math.ceil(remaining / schedule.pagesPerDay);
const progress = Math.round(schedule.publishedCount / schedule.totalPages * 100);

console.log(`
📊 StardewPriceDB 发布状态
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

创建日期: ${schedule.createdAt}
最后发布: ${schedule.lastPublishDate || '未开始'}
每日发布: ${schedule.pagesPerDay} 页

已发布: ${schedule.publishedCount}/${schedule.totalPages} 页
剩余:   ${remaining} 页
预计还需: ${daysRemaining} 天

进度: ${progress}%
`);

// 进度条
const barLength = 40;
const filled = Math.round(schedule.publishedCount / schedule.totalPages * barLength);
const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
console.log(`[${bar}]`);

// 最近发布的页面
const recentPublished = schedule.pages
  .filter(p => p.published)
  .slice(-5);

if (recentPublished.length > 0) {
  console.log('\n最近发布的页面:');
  recentPublished.forEach(p => console.log(`  ✓ ${p.url}`));
}

// 下一批待发布
const nextBatch = schedule.pages
  .filter(p => !p.published)
  .slice(0, schedule.pagesPerDay);

if (nextBatch.length > 0) {
  console.log('\n下一批待发布:');
  nextBatch.forEach(p => console.log(`  ○ ${p.url}`));
}

console.log('');
