/**
 * AI Content Generator for StardewPriceDB
 * 使用魔塔 Qwen 模型生成高质量、符合 E-E-A-T 的 SEO 内容
 * 
 * 规则：
 * 1. 内容必须基于游戏真实数据，不能编造
 * 2. 策略建议必须具体、可操作
 * 3. 包含具体数字和计算
 * 4. 避免 AI 废话和水文
 */

const fs = require('fs');
const path = require('path');

// ModelScope API-Inference 配置
const MODELSCOPE_TOKEN = 'ms-10db1a0e-d298-4655-815a-cadc2d31c03f';
const API_URL = 'https://api-inference.modelscope.cn/v1/chat/completions';
const MODEL_ID = 'Qwen/Qwen2.5-Coder-32B-Instruct';

// 加载游戏数据（处理 JSON 注释）
function loadJSON(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // 移除 // 注释
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

const items = loadJSON(path.join(__dirname, '../data/items.json'));
const fish = loadJSON(path.join(__dirname, '../data/fish.json'));
const existingStrategies = loadJSON(path.join(__dirname, '../data/item-strategies.json'));

/**
 * 调用 ModelScope API-Inference
 */
async function callQwenAPI(prompt, systemPrompt) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MODELSCOPE_TOKEN}`
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3, // 低温度确保准确性
      max_tokens: 800
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * 生成作物策略内容
 */
async function generateCropStrategy(item) {
  const systemPrompt = `You are an expert Stardew Valley player with 2000+ hours of gameplay. 
You write concise, data-driven farming guides. 
RULES:
- Use EXACT game numbers (prices, growth times, etc.)
- Give SPECIFIC advice, not generic tips
- Include profit calculations when relevant
- Maximum 2-3 sentences per tip
- No filler words like "definitely", "absolutely"
- Write in active voice
- Target experienced players who want optimization`;

  const prompt = `Generate strategy content for ${item.name} in Stardew Valley 1.6.

ITEM DATA:
- Name: ${item.name}
- Category: ${item.category}
- Base Price: ${item.basePrice}g
- Seed Price: ${item.seedPrice}g
- Growth Time: ${item.growthTime} days
- Season: ${item.season?.join(', ') || 'All'}
- Regrows: ${item.regrows ? `Yes, every ${item.regrowTime} days` : 'No'}
${item.isGiantCrop ? '- Can form Giant Crops' : ''}
${item.extraHarvestChance ? `- ${item.extraHarvestChance * 100}% extra harvest chance` : ''}
${item.processing ? `- Jar: ${item.processing.jarPrice}g (${item.processing.jarTime} days)` : ''}
${item.processing ? `- Keg: ${item.processing.kegPrice}g (${item.processing.kegTime} days)` : ''}

Generate JSON with these fields:
{
  "proTip": "One specific, actionable tip for experienced players. Include numbers.",
  "strategyNote": "Detailed analysis: profit comparison, when to process vs sell raw, synergies with professions. 2-3 sentences max.",
  "bestUse": "5-8 word summary of optimal use case"
}

Output ONLY valid JSON, no markdown.`;

  try {
    const response = await callQwenAPI(prompt, systemPrompt);
    // 清理响应，提取 JSON
    let cleaned = response.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    return JSON.parse(cleaned);
  } catch (error) {
    console.error(`Error generating strategy for ${item.name}:`, error.message);
    return null;
  }
}

/**
 * 生成鱼类策略内容
 */
async function generateFishStrategy(fishData) {
  const systemPrompt = `You are an expert Stardew Valley angler with complete fishing knowledge.
You write practical fishing tips based on game mechanics.
RULES:
- Use EXACT game data (locations, times, seasons, weather)
- Include specific tackle/bait recommendations
- Mention difficulty level and tips to catch
- No generic advice like "practice makes perfect"
- Maximum 2-3 sentences per tip`;

  const prompt = `Generate fishing strategy for ${fishData.name} in Stardew Valley 1.6.

FISH DATA:
- Name: ${fishData.name}
- Base Price: ${fishData.basePrice}g
- Location: ${fishData.location}
- Season: ${fishData.season?.join(', ') || 'All'}
- Time: ${fishData.time || 'Any'}
- Weather: ${fishData.weather || 'Any'}
- Difficulty: ${fishData.difficulty || 'Unknown'}

Generate JSON:
{
  "catchTip": "Specific technique or timing advice for catching this fish.",
  "profitNote": "Is it worth fishing for profit? Compare to other options.",
  "bestUse": "Optimal use: sell, gift, recipe, pond, etc."
}

Output ONLY valid JSON.`;

  try {
    const response = await callQwenAPI(prompt, systemPrompt);
    let cleaned = response.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    return JSON.parse(cleaned);
  } catch (error) {
    console.error(`Error generating strategy for ${fishData.name}:`, error.message);
    return null;
  }
}

/**
 * 批量生成缺失的作物策略
 */
async function generateMissingCropStrategies() {
  const strategies = existingStrategies.strategies;
  const itemsList = items.items;
  
  let generated = 0;
  let skipped = 0;

  for (const item of itemsList) {
    // 跳过已有策略的物品
    if (strategies[item.slug]) {
      skipped++;
      continue;
    }

    console.log(`Generating strategy for: ${item.name}...`);
    
    const strategy = await generateCropStrategy(item);
    if (strategy) {
      strategies[item.slug] = {
        ...strategy,
        goldPerDay: calculateGoldPerDay(item),
        recommendation: determineRecommendation(item),
        tier: determineTier(item)
      };
      generated++;
      
      // 每5个保存一次，防止丢失
      if (generated % 5 === 0) {
        saveStrategies(strategies);
        console.log(`  Saved ${generated} new strategies...`);
      }
    }

    // API 限速：每秒最多 2 次请求
    await sleep(500);
  }

  // 最终保存
  saveStrategies(strategies);
  console.log(`\nComplete! Generated: ${generated}, Skipped (existing): ${skipped}`);
}

/**
 * 计算每日金币收益
 */
function calculateGoldPerDay(item) {
  if (!item.growthTime || item.growthTime === 0) return 0;
  
  const profit = item.basePrice - (item.seedPrice || 0);
  
  if (item.regrows && item.regrowTime) {
    // 计算一季（28天）的平均每日收益
    const initialHarvest = item.growthTime;
    const regrowHarvests = Math.floor((28 - initialHarvest) / item.regrowTime);
    const totalHarvests = 1 + regrowHarvests;
    const totalProfit = (item.basePrice * totalHarvests) - (item.seedPrice || 0);
    return Math.round((totalProfit / 28) * 100) / 100;
  }
  
  return Math.round((profit / item.growthTime) * 100) / 100;
}

/**
 * 确定处理建议
 */
function determineRecommendation(item) {
  if (!item.processing) return 'sell-raw';
  
  const rawValue = item.basePrice;
  const jarValue = item.processing.jarPrice;
  const jarTime = item.processing.jarTime || 3;
  const kegValue = item.processing.kegPrice;
  const kegTime = item.processing.kegTime || 4;
  
  const jarGoldPerDay = jarValue / jarTime;
  const kegGoldPerDay = kegValue / kegTime;
  
  // 如果加工收益显著高于原价，推荐加工
  if (kegGoldPerDay > jarGoldPerDay && kegValue > rawValue * 1.5) {
    return 'keg';
  }
  if (jarGoldPerDay > kegGoldPerDay && jarValue > rawValue * 1.3) {
    return 'preserves-jar';
  }
  
  return 'sell-raw';
}

/**
 * 确定物品等级
 */
function determineTier(item) {
  const goldPerDay = calculateGoldPerDay(item);
  
  if (goldPerDay >= 20) return 'premium';
  if (goldPerDay >= 10) return 'high';
  if (goldPerDay >= 5) return 'mid';
  return 'starter';
}

/**
 * 保存策略到文件
 */
function saveStrategies(strategies) {
  const output = {
    version: '1.6',
    lastUpdated: new Date().toISOString().split('T')[0],
    strategies
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../data/item-strategies.json'),
    JSON.stringify(output, null, 2),
    'utf8'
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 测试单个物品的策略生成
 */
async function testSingleItem(slug) {
  const item = items.items.find(i => i.slug === slug);
  if (!item) {
    console.log(`Item not found: ${slug}`);
    return;
  }
  
  console.log(`Testing strategy generation for: ${item.name}`);
  console.log('Item data:', JSON.stringify(item, null, 2));
  
  const strategy = await generateCropStrategy(item);
  console.log('\nGenerated strategy:', JSON.stringify(strategy, null, 2));
}

// 命令行参数处理
const args = process.argv.slice(2);

// 加载鱼类策略文件
const fishStrategiesPath = path.join(__dirname, '../data/fish-strategies.json');
let fishStrategies = {};
try {
  fishStrategies = loadJSON(fishStrategiesPath);
} catch (e) {
  fishStrategies = { strategies: {} };
}

/**
 * 批量生成缺失的鱼类策略
 */
async function generateMissingFishStrategies() {
  const strategies = fishStrategies.strategies;
  const fishList = fish.fish;
  
  let generated = 0;
  let skipped = 0;

  for (const fishData of fishList) {
    // 跳过已有策略的鱼
    if (strategies[fishData.slug]) {
      skipped++;
      continue;
    }

    console.log(`Generating strategy for: ${fishData.name}...`);
    
    const strategy = await generateFishStrategy(fishData);
    if (strategy) {
      strategies[fishData.slug] = strategy;
      generated++;
      console.log(`  ✓ Generated for ${fishData.name}`);
      
      // 每3个保存一次
      if (generated % 3 === 0) {
        saveFishStrategies(strategies);
        console.log(`  Saved ${generated} new strategies...`);
      }
    }

    // API 限速
    await sleep(600);
  }

  // 最终保存
  saveFishStrategies(strategies);
  console.log(`\nComplete! Generated: ${generated}, Skipped (existing): ${skipped}`);
}

/**
 * 保存鱼类策略到文件
 */
function saveFishStrategies(strategies) {
  const output = {
    version: '1.6',
    lastUpdated: new Date().toISOString().split('T')[0],
    strategies
  };
  
  fs.writeFileSync(
    fishStrategiesPath,
    JSON.stringify(output, null, 2),
    'utf8'
  );
}

async function main() {
  if (args[0] === 'test') {
    // 测试单个物品
    await testSingleItem(args[1] || 'ancient-fruit');
  } else if (args[0] === 'generate-crops') {
    // 批量生成作物策略
    await generateMissingCropStrategies();
  } else if (args[0] === 'generate-fish') {
    // 批量生成鱼类策略
    await generateMissingFishStrategies();
  } else {
    console.log(`
AI Content Generator for StardewPriceDB
========================================

Usage:
  node ai-content-generator.js test [item-slug]     - Test single item
  node ai-content-generator.js generate-crops       - Generate missing crop strategies
  node ai-content-generator.js generate-fish        - Generate missing fish strategies

Examples:
  node ai-content-generator.js test ancient-fruit
  node ai-content-generator.js generate-crops
  node ai-content-generator.js generate-fish
  `);
  }
}

// 运行主函数
main().catch(console.error);

module.exports = {
  callQwenAPI,
  generateCropStrategy,
  generateFishStrategy
};
