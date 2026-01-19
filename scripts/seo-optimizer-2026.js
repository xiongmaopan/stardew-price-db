/**
 * SEO Optimizer 2026 for StardewPriceDB
 * 基于 Google 2025-2026 最新算法要求的内容优化工具
 * 
 * Google 2025-2026 核心算法更新要点:
 * 1. March 2025 Core Update - Helpful Content 完全整合到核心算法
 * 2. August 2025 Spam Update - 扩展垃圾内容定义，针对 AI 生成规模化内容
 * 3. December 2025 Core Update - 强调 E-E-A-T (经验-专业-权威-可信)
 * 
 * 本脚本功能:
 * 1. 检测并移除 AI 痕迹词汇和模式
 * 2. 增强 E-E-A-T 信号
 * 3. 验证内容原创性和独特价值
 * 4. 避免"滥用规模化内容"政策违规
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// AI 痕迹词汇和模式检测库
// 这些是 Google 和 AI 检测工具常见的标记词
// ============================================================

const AI_DETECTOR = {
  // 高风险 AI 废话词 (必须替换)
  highRiskWords: [
    'definitely', 'absolutely', 'certainly', 'undoubtedly', 'surely',
    'obviously', 'clearly', 'extremely', 'incredibly', 'remarkably',
    'essentially', 'fundamentally', 'ultimately', 'basically',
    'it is worth noting', 'it should be noted', 'it is important to',
    'needless to say', 'as mentioned earlier', 'in conclusion',
    'in summary', 'to summarize', 'overall', 'in essence',
    'delve', 'delving', 'dive deep', 'diving deep',
    'leverage', 'leveraging', 'utilize', 'utilizing',
    'optimize', 'optimizing', 'maximize', 'maximizing',
    'enhance', 'enhancing', 'boost', 'boosting',
    'seamless', 'seamlessly', 'robust', 'robustly',
    'cutting-edge', 'state-of-the-art', 'game-changer',
    'unlock', 'unlocking', 'supercharge', 'turbocharge',
    'master', 'mastering', 'dominate', 'dominating',
    'skyrocket', 'skyrocketing', 'explode', 'exploding',
    'powerful', 'incredible', 'amazing', 'awesome',
    'revolutionary', 'groundbreaking', 'transformative',
    'comprehensive', 'extensive', 'thorough', 'in-depth',
    'key takeaway', 'bottom line', 'pro tip',
    'let me explain', 'allow me to', 'I would like to',
    'in other words', 'that being said', 'having said that',
    'with that in mind', 'on the other hand', 'moving forward',
    'at the end of the day', 'when all is said and done',
  ],

  // 中风险 AI 句式结构 (需要改写)
  midRiskPatterns: [
    /^First(?:ly)?[,.]?\s/gmi,
    /^Second(?:ly)?[,.]?\s/gmi,
    /^Third(?:ly)?[,.]?\s/gmi,
    /^Additionally[,.]?\s/gmi,
    /^Furthermore[,.]?\s/gmi,
    /^Moreover[,.]?\s/gmi,
    /^However[,.]?\s/gmi,
    /^Therefore[,.]?\s/gmi,
    /^Consequently[,.]?\s/gmi,
    /^In this (?:article|guide|section)/gmi,
    /^This (?:article|guide|section) (?:will|explains)/gmi,
    /(?:Let's|Let us) (?:explore|examine|look at|discuss)/gmi,
    /Whether you(?:'re| are) (?:a beginner|new to|looking to)/gmi,
    /^When it comes to/gmi,
    /^In order to/gmi,
    /^It is (?:important|essential|crucial|vital) to/gmi,
    /This (?:is|can be) (?:a|an) (?:great|excellent|fantastic) (?:way|option|choice)/gmi,
  ],

  // 低质量填充词 (可选移除)
  fillerPhrases: [
    'very', 'really', 'quite', 'rather', 'somewhat',
    'sort of', 'kind of', 'a bit', 'a little',
    'pretty much', 'more or less', 'in fact',
    'actually', 'literally', 'totally', 'completely',
  ],

  // AI 典型开头句式 (高危红旗)
  dangerousOpeners: [
    /^Welcome to (?:our|this)/i,
    /^In (?:this|today's) (?:guide|article)/i,
    /^(?:Are you|If you're) looking (?:for|to)/i,
    /^(?:Have you ever|Ever) wondered/i,
    /^(?:Want|Looking|Trying) to (?:learn|know|find out)/i,
    /^(?:Ready to|Want to) take your .* to the next level/i,
  ]
};

// ============================================================
// E-E-A-T 信号增强器
// 增加内容的经验、专业、权威、可信度
// ============================================================

const EEAT_ENHANCER = {
  // 经验性语言 (Experience)
  experienceSignals: [
    'in my 500+ hours of gameplay',
    'after testing across 3 save files',
    'from my Year 5 Perfection run',
    'based on community speedrun data',
    'verified in patch 1.6.15',
    'I discovered this during my Joja run',
    'this saved me 50k gold in Year 1',
    'the wiki is wrong here — actual test shows',
  ],

  // 专业性标记 (Expertise)
  expertiseMarkers: [
    'exact calculation:',
    'game code confirms:',
    'frame-perfect timing:',
    'optimal rotation:',
    'mathematically proven:',
    'data-mined value:',
    'per the 1.6 changelog:',
  ],

  // 权威性引用 (Authoritativeness)
  authorityReferences: [
    'according to Stardew Valley Wiki',
    'confirmed by ConcernedApe on Twitter',
    'per the official 1.6 patch notes',
    'verified by speedrunning community',
    'cross-referenced with game files',
  ],

  // 可信度信号 (Trustworthiness)
  trustSignals: [
    'warning:',
    'important:',
    'note:',
    'common mistake:',
    'myth busted:',
    'contrary to popular belief',
  ]
};

// ============================================================
// 原创性验证器
// 确保内容独特，避免 "滥用规模化内容" 违规
// ============================================================

function checkContentUniqueness(content, allContents) {
  const issues = [];
  
  // 1. 检查与其他页面的相似度
  const contentWords = content.toLowerCase().split(/\s+/).filter(w => w.length > 4);
  
  for (const [slug, otherContent] of Object.entries(allContents)) {
    if (otherContent === content) continue;
    
    const otherWords = otherContent.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const overlap = contentWords.filter(w => otherWords.includes(w));
    const similarity = overlap.length / Math.max(contentWords.length, 1);
    
    if (similarity > 0.7) {
      issues.push({
        type: 'HIGH_SIMILARITY',
        severity: 'critical',
        message: `与 ${slug} 相似度达 ${(similarity * 100).toFixed(1)}%`,
        fix: '需要增加独特的数据点或策略建议'
      });
    }
  }
  
  // 2. 检查模板化内容比例
  const templatePhrases = [
    'in Stardew Valley',
    'you can',
    'this is a',
    'the best way to',
    'make sure to',
    'don\'t forget to',
  ];
  
  let templateCount = 0;
  templatePhrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    templateCount += (content.match(regex) || []).length;
  });
  
  const templateRatio = templateCount / (contentWords.length / 20);
  if (templateRatio > 3) {
    issues.push({
      type: 'TEMPLATE_HEAVY',
      severity: 'warning',
      message: `模板化语言过多 (${templateRatio.toFixed(1)}x)`,
      fix: '用具体数据和个人洞察替换通用短语'
    });
  }
  
  return issues;
}

// ============================================================
// AI 检测扫描器
// ============================================================

function scanForAIPatterns(content) {
  const issues = [];
  const contentLower = content.toLowerCase();
  
  // 1. 扫描高风险词汇
  AI_DETECTOR.highRiskWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      issues.push({
        type: 'AI_WORD',
        severity: 'high',
        word: word,
        count: matches.length,
        message: `检测到 AI 高风险词 "${word}" (${matches.length}次)`
      });
    }
  });
  
  // 2. 扫描中风险句式
  AI_DETECTOR.midRiskPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      issues.push({
        type: 'AI_PATTERN',
        severity: 'medium',
        pattern: pattern.toString(),
        count: matches.length,
        message: `检测到 AI 句式模式 (${matches.length}次)`
      });
    }
  });
  
  // 3. 扫描危险开头
  AI_DETECTOR.dangerousOpeners.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push({
        type: 'AI_OPENER',
        severity: 'critical',
        message: '使用了典型 AI 开头句式，Google 重点惩罚对象'
      });
    }
  });
  
  // 4. 计算 AI 分数
  let aiScore = 0;
  issues.forEach(issue => {
    if (issue.severity === 'critical') aiScore += 30;
    else if (issue.severity === 'high') aiScore += 10;
    else if (issue.severity === 'medium') aiScore += 5;
  });
  
  return {
    issues,
    aiScore,
    riskLevel: aiScore > 50 ? 'HIGH' : aiScore > 20 ? 'MEDIUM' : 'LOW',
    recommendation: aiScore > 50 
      ? '⚠️ 高风险：需要大幅改写避免 Google Spam Update 惩罚'
      : aiScore > 20 
        ? '⚡ 中风险：建议替换标记词汇'
        : '✅ 低风险：内容较为自然'
  };
}

// ============================================================
// 内容优化器
// ============================================================

function optimizeContent(content, itemData) {
  let optimized = content;
  
  // 1. 替换 AI 高风险词
  const replacements = {
    'definitely': '',
    'absolutely': '',
    'certainly': '',
    'extremely': '',
    'incredibly': 'very',
    'leverage': 'use',
    'utilize': 'use',
    'optimize': 'improve',
    'enhance': 'improve',
    'boost': 'increase',
    'robust': 'solid',
    'seamless': 'smooth',
    'comprehensive': 'complete',
    'in conclusion': '',
    'needless to say': '',
    'it is worth noting': 'Note:',
    'it should be noted': 'Note:',
  };
  
  Object.entries(replacements).forEach(([old, newWord]) => {
    const regex = new RegExp(`\\b${old}\\b`, 'gi');
    optimized = optimized.replace(regex, newWord);
  });
  
  // 2. 移除连续空格
  optimized = optimized.replace(/\s+/g, ' ').trim();
  
  // 3. 添加具体数据点（如果有物品数据）
  if (itemData && itemData.basePrice) {
    // 确保内容包含实际价格数据
    if (!optimized.includes(itemData.basePrice + 'g')) {
      optimized = `${itemData.basePrice}g base value. ${optimized}`;
    }
  }
  
  return optimized;
}

// ============================================================
// 策略内容审计器
// ============================================================

function auditStrategy(slug, strategy, itemData) {
  const report = {
    slug,
    itemName: itemData?.name || slug,
    issues: [],
    score: 100,
    grade: 'A'
  };
  
  // 审计 proTip
  if (strategy.proTip) {
    const tipScan = scanForAIPatterns(strategy.proTip);
    report.issues.push(...tipScan.issues.map(i => ({ ...i, field: 'proTip' })));
    report.score -= tipScan.aiScore;
    
    // 检查是否包含具体数字
    const hasNumbers = /\d+/.test(strategy.proTip);
    if (!hasNumbers) {
      report.issues.push({
        type: 'MISSING_DATA',
        severity: 'medium',
        field: 'proTip',
        message: 'proTip 缺少具体数字，降低可信度'
      });
      report.score -= 10;
    }
  }
  
  // 审计 strategyNote
  if (strategy.strategyNote) {
    const noteScan = scanForAIPatterns(strategy.strategyNote);
    report.issues.push(...noteScan.issues.map(i => ({ ...i, field: 'strategyNote' })));
    report.score -= noteScan.aiScore;
    
    // 检查长度
    if (strategy.strategyNote.length < 50) {
      report.issues.push({
        type: 'TOO_SHORT',
        severity: 'warning',
        field: 'strategyNote',
        message: 'strategyNote 过短，缺少深度分析'
      });
      report.score -= 5;
    }
  }
  
  // 审计 goldPerDay
  if (strategy.goldPerDay && itemData) {
    // 验证计算是否合理
    const expectedGPD = calculateExpectedGoldPerDay(itemData);
    if (expectedGPD && Math.abs(strategy.goldPerDay - expectedGPD) > expectedGPD * 0.3) {
      report.issues.push({
        type: 'DATA_MISMATCH',
        severity: 'critical',
        field: 'goldPerDay',
        message: `goldPerDay (${strategy.goldPerDay}) 与计算值 (${expectedGPD.toFixed(2)}) 差异过大`
      });
      report.score -= 20;
    }
  }
  
  // 计算等级
  if (report.score >= 90) report.grade = 'A';
  else if (report.score >= 75) report.grade = 'B';
  else if (report.score >= 60) report.grade = 'C';
  else if (report.score >= 40) report.grade = 'D';
  else report.grade = 'F';
  
  return report;
}

function calculateExpectedGoldPerDay(item) {
  if (!item.basePrice || !item.growthTime) return null;
  
  let harvestValue = item.basePrice;
  
  // 考虑额外收获
  if (item.extraHarvestChance) {
    harvestValue *= (1 + item.extraHarvestChance);
  }
  
  // 考虑多产
  if (item.harvestYield && item.harvestYield > 1) {
    harvestValue *= item.harvestYield;
  }
  
  // 减去种子成本
  const seedCost = item.seedPrice || 0;
  const netProfit = harvestValue - seedCost;
  
  return netProfit / item.growthTime;
}

// ============================================================
// 批量审计工具
// ============================================================

async function runFullAudit() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   StardewPriceDB SEO Optimizer 2026                   ║');
  console.log('║   Google 2025-2026 算法合规性审计                       ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  // 加载数据
  const strategiesPath = path.join(__dirname, '../data/item-strategies.json');
  const itemsPath = path.join(__dirname, '../data/items.json');
  
  let strategies, items;
  try {
    strategies = JSON.parse(fs.readFileSync(strategiesPath, 'utf8'));
    items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  } catch (e) {
    console.error('❌ 无法加载数据文件:', e.message);
    return;
  }
  
  const itemMap = {};
  items.items?.forEach(item => {
    itemMap[item.slug] = item;
  });
  
  const reports = [];
  const stats = {
    total: 0,
    gradeA: 0,
    gradeB: 0,
    gradeC: 0,
    gradeD: 0,
    gradeF: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0
  };
  
  console.log('📊 正在审计策略内容...\n');
  
  for (const [slug, strategy] of Object.entries(strategies.strategies || {})) {
    const itemData = itemMap[slug];
    const report = auditStrategy(slug, strategy, itemData);
    reports.push(report);
    
    stats.total++;
    stats[`grade${report.grade}`]++;
    
    report.issues.forEach(issue => {
      if (issue.severity === 'critical') stats.criticalIssues++;
      else if (issue.severity === 'high') stats.highIssues++;
      else if (issue.severity === 'medium') stats.mediumIssues++;
    });
    
    // 显示问题项目
    if (report.grade === 'D' || report.grade === 'F') {
      console.log(`⚠️  ${slug}: Grade ${report.grade} (Score: ${report.score})`);
      report.issues.slice(0, 3).forEach(issue => {
        console.log(`    └─ [${issue.severity.toUpperCase()}] ${issue.message}`);
      });
    }
  }
  
  // 输出汇总报告
  console.log('\n' + '═'.repeat(60));
  console.log('📈 审计汇总报告');
  console.log('═'.repeat(60));
  console.log(`\n总计审计: ${stats.total} 个策略`);
  console.log(`\n等级分布:`);
  console.log(`  ✅ A级 (90-100): ${stats.gradeA} (${(stats.gradeA/stats.total*100).toFixed(1)}%)`);
  console.log(`  ✅ B级 (75-89):  ${stats.gradeB} (${(stats.gradeB/stats.total*100).toFixed(1)}%)`);
  console.log(`  ⚡ C级 (60-74):  ${stats.gradeC} (${(stats.gradeC/stats.total*100).toFixed(1)}%)`);
  console.log(`  ⚠️  D级 (40-59):  ${stats.gradeD} (${(stats.gradeD/stats.total*100).toFixed(1)}%)`);
  console.log(`  ❌ F级 (<40):    ${stats.gradeF} (${(stats.gradeF/stats.total*100).toFixed(1)}%)`);
  
  console.log(`\n问题统计:`);
  console.log(`  🔴 严重问题: ${stats.criticalIssues}`);
  console.log(`  🟠 高风险问题: ${stats.highIssues}`);
  console.log(`  🟡 中风险问题: ${stats.mediumIssues}`);
  
  const overallHealth = ((stats.gradeA + stats.gradeB) / stats.total * 100).toFixed(1);
  console.log(`\n📊 整体健康度: ${overallHealth}%`);
  
  if (overallHealth < 70) {
    console.log('\n⚠️  警告: 健康度低于70%，存在 Google Spam Update 惩罚风险');
    console.log('   建议运行 --fix 参数自动优化内容');
  } else if (overallHealth < 85) {
    console.log('\n⚡ 提示: 健康度可以提升，建议优化 C 级及以下内容');
  } else {
    console.log('\n✅ 优秀: 内容符合 Google 2025-2026 算法要求');
  }
  
  // 保存详细报告
  const reportPath = path.join(__dirname, '../seo-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    auditDate: new Date().toISOString(),
    googleAlgorithms: {
      lastCheck: '2026-01-11',
      referencedUpdates: [
        'December 2025 Core Update',
        'August 2025 Spam Update', 
        'June 2025 Core Update',
        'March 2025 Core Update'
      ]
    },
    summary: stats,
    reports: reports.filter(r => r.grade !== 'A')
  }, null, 2));
  
  console.log(`\n📝 详细报告已保存: ${reportPath}`);
  
  return { stats, reports };
}

// ============================================================
// 自动修复工具
// ============================================================

async function autoFix() {
  console.log('\n🔧 启动自动优化...\n');
  
  const strategiesPath = path.join(__dirname, '../data/item-strategies.json');
  const strategies = JSON.parse(fs.readFileSync(strategiesPath, 'utf8'));
  
  let fixed = 0;
  
  for (const [slug, strategy] of Object.entries(strategies.strategies || {})) {
    let needsUpdate = false;
    
    // 优化 proTip
    if (strategy.proTip) {
      const original = strategy.proTip;
      strategy.proTip = optimizeContent(strategy.proTip, null);
      if (original !== strategy.proTip) needsUpdate = true;
    }
    
    // 优化 strategyNote
    if (strategy.strategyNote) {
      const original = strategy.strategyNote;
      strategy.strategyNote = optimizeContent(strategy.strategyNote, null);
      if (original !== strategy.strategyNote) needsUpdate = true;
    }
    
    if (needsUpdate) {
      fixed++;
      console.log(`  ✅ 优化: ${slug}`);
    }
  }
  
  // 保存
  fs.writeFileSync(strategiesPath, JSON.stringify(strategies, null, 2));
  console.log(`\n✅ 完成! 优化了 ${fixed} 个策略`);
}

// ============================================================
// 命令行接口
// ============================================================

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
StardewPriceDB SEO Optimizer 2026
基于 Google 2025-2026 最新算法的内容优化工具

用法:
  node seo-optimizer-2026.js           运行完整审计
  node seo-optimizer-2026.js --fix     自动修复问题
  node seo-optimizer-2026.js --check <slug>  检查单个物品
  node seo-optimizer-2026.js --help    显示帮助

Google 2025-2026 算法参考:
  - December 2025 Core Update (2025年12月11日)
  - August 2025 Spam Update (2025年8月26日) - 扩展垃圾内容定义
  - June 2025 Core Update (2025年6月30日)
  - March 2025 Core Update (2025年3月13日) - Helpful Content 整合

E-E-A-T 标准 (经验-专业-权威-可信):
  - Experience: 展示第一手游戏经验
  - Expertise: 包含精确数据和计算
  - Authoritativeness: 引用可靠来源
  - Trustworthiness: 提供可验证的信息

避免的垃圾内容模式:
  - 规模化 AI 生成内容
  - 模板化低价值页面
  - 无独特见解的聚合内容
`);
} else if (args.includes('--fix')) {
  autoFix();
} else if (args.includes('--check')) {
  const slug = args[args.indexOf('--check') + 1];
  if (slug) {
    const strategiesPath = path.join(__dirname, '../data/item-strategies.json');
    const strategies = JSON.parse(fs.readFileSync(strategiesPath, 'utf8'));
    const strategy = strategies.strategies?.[slug];
    
    if (strategy) {
      console.log(`\n检查: ${slug}\n`);
      const report = auditStrategy(slug, strategy, null);
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(`未找到策略: ${slug}`);
    }
  }
} else {
  runFullAudit();
}

module.exports = {
  scanForAIPatterns,
  optimizeContent,
  auditStrategy,
  checkContentUniqueness,
  AI_DETECTOR,
  EEAT_ENHANCER
};
