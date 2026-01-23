const fs = require('fs');
const path = require('path');

const files = [
  'app/bundle/[slug]/page.js',
  'app/fishing/[slug]/page.js',
  'app/gift/[npc]/page.js',
  'app/item/[slug]/page.js',
  'app/recipe/[slug]/page.js',
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  const paramName = filePath.includes('[') && filePath.match(/\[([^\]]+)\]/)?.[1] || 'slug';
  const varName = paramName === 'npc' ? 'npcId' : paramName + 'Id';

  content = content.replace(
    /export\s+async\s+function\s+generateMetadata\(\{\s*params\s*\}\)\s*\{/g,
    `export async function generateMetadata({ params }) {\n  const { ${paramName}: ${varName} } = await params;`
  );

  content = content.replace(
    /export\s+default\s+function\s+(\w+)\(\{\s*params\s*\}\)\s*\{/g,
    `export default async function $1({ params }) {\n  const { ${paramName}: ${varName} } = await params;`
  );

  content = content.replace(new RegExp(`params\\.${paramName}`, 'g'), varName);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

files.forEach(fixFile);
