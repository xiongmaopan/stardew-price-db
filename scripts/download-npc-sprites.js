/**
 * Download NPC portrait sprites from Stardew Valley Wiki using API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// NPC list
const npcs = [
  'Abigail', 'Alex', 'Elliott', 'Emily', 'Haley', 'Harvey', 'Leah', 'Maru',
  'Penny', 'Sam', 'Sebastian', 'Shane', 'Caroline', 'Clint', 'Demetrius',
  'Dwarf', 'Evelyn', 'George', 'Gus', 'Jas', 'Jodi', 'Kent', 'Krobus',
  'Leo', 'Lewis', 'Linus', 'Marnie', 'Pam', 'Pierre', 'Robin', 'Sandy',
  'Vincent', 'Willy', 'Wizard'
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'npcs');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        httpsGet(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ data, statusCode: res.statusCode }));
    }).on('error', reject);
  });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function getImageUrl(npcName) {
  const apiUrl = `https://stardewvalleywiki.com/mediawiki/api.php?action=query&titles=File:${encodeURIComponent(npcName)}.png&prop=imageinfo&iiprop=url&format=json`;
  const { data } = await httpsGet(apiUrl);
  const json = JSON.parse(data);
  const pages = json.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId === '-1') return null;
  return pages[pageId]?.imageinfo?.[0]?.url || null;
}

async function downloadNPCSprites() {
  console.log('📥 Downloading NPC sprites from Stardew Valley Wiki...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const npc of npcs) {
    const slug = npc.toLowerCase().replace(/ /g, '-');
    const filepath = path.join(outputDir, `${slug}.png`);
    
    try {
      process.stdout.write(`  ${npc}... `);
      
      // Get image URL from API
      const imageUrl = await getImageUrl(npc);
      if (!imageUrl) {
        console.log('✗ (not found)');
        failed++;
        continue;
      }
      
      // Download the image
      await downloadFile(imageUrl, filepath);
      console.log('✓');
      success++;
    } catch (err) {
      console.log(`✗ (${err.message})`);
      failed++;
    }
    
    // Small delay
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\n✅ Downloaded: ${success}/${npcs.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}`);
  }
}

downloadNPCSprites().catch(console.error);
