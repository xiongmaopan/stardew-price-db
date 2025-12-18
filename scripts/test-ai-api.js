/**
 * 简化版 AI 测试脚本 - ModelScope API-Inference
 */

// ModelScope API 配置（根据官方文档）
const MODELSCOPE_TOKEN = 'ms-10db1a0e-d298-4655-815a-cadc2d31c03f';
const API_URL = 'https://api-inference.modelscope.cn/v1/chat/completions';
const MODEL_ID = 'Qwen/Qwen2.5-Coder-32B-Instruct';

async function testAPI() {
  console.log('Testing ModelScope API-Inference...');
  console.log('Token:', MODELSCOPE_TOKEN.substring(0, 10) + '...');
  console.log('Model:', MODEL_ID);
  
  try {
    // OpenAI 兼容格式
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MODELSCOPE_TOKEN}`
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          { role: 'system', content: 'You are a Stardew Valley expert.' },
          { role: 'user', content: 'What is the best crop in Summer? Answer in 1 sentence.' }
        ],
        temperature: 0.3,
        max_tokens: 100
      })
    });

    console.log('Response status:', response.status);
      if (!response.ok) {
      const error = await response.text();
      console.log('Error:', error);
      return;
    }
    
    const data = await response.json();
    console.log('Success!');
    console.log('Full response:', JSON.stringify(data, null, 2));
    
    // OpenAI 兼容格式响应
    if (data.choices && data.choices[0]) {
      console.log('Answer:', data.choices[0].message.content);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

testAPI();
