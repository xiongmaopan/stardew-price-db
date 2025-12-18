/**
 * 测试策略生成 - 简单版本
 */

const MODELSCOPE_TOKEN = 'ms-10db1a0e-d298-4655-815a-cadc2d31c03f';
const API_URL = 'https://api-inference.modelscope.cn/v1/chat/completions';
const MODEL_ID = 'Qwen/Qwen2.5-Coder-32B-Instruct';

async function testStrategyGeneration() {
  console.log('Starting test at:', new Date().toISOString());
  console.log('Calling ModelScope API...');
  console.log('');
  
  const systemPrompt = `You are an expert Stardew Valley player. Give concise, data-driven advice.`;
  
  const prompt = `Generate strategy for Starfruit in Stardew Valley.
  
DATA:
- Base Price: 750g
- Seed Price: 400g (Oasis)
- Growth: 13 days
- Season: Summer only
- Keg Wine: 2250g (7 days)
- Jar Jelly: 1550g (3 days)

Generate JSON:
{
  "proTip": "One specific tip with numbers",
  "strategyNote": "2-3 sentence profit analysis",
  "bestUse": "5-8 word summary"
}

Output ONLY valid JSON.`;

  try {
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
        temperature: 0.3,
        max_tokens: 300
      })
    });

    console.log('Status:', response.status);
    
    if (!response.ok) {
      console.log('Error:', await response.text());
      return;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log('\nRaw response:');
    console.log(content);
    
    // 尝试解析 JSON
    try {
      let cleaned = content.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      const parsed = JSON.parse(cleaned);
      console.log('\nParsed JSON:');
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('JSON parse error:', e.message);
    }
    
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

testStrategyGeneration();
