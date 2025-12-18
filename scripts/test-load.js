// 测试脚本
const fs = require('fs');
const path = require('path');

const output = [];
output.push('Starting test...');

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    output.push('File not found: ' + filePath);
    return null;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/\/.*$/gm, '');
  return JSON.parse(content);
}

const items = loadJSON(path.join(__dirname, '../data/items.json'));
output.push('Items loaded: ' + (items?.items?.length || 0));

const fish = loadJSON(path.join(__dirname, '../data/fish.json'));
output.push('Fish loaded: ' + (fish?.fish?.length || 0));

output.push('Test complete!');

// 写入文件
fs.writeFileSync(path.join(__dirname, 'test-result.txt'), output.join('\n'));
console.log('Done - check scripts/test-result.txt');
