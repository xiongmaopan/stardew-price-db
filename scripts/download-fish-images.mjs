// Download missing fish sprites using fetch API (ESM)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/images/items');

// Stardew Valley Wiki sprite URLs for missing fish
const FISH_SPRITES = {
  'bullhead': 'https://stardewvalleywiki.com/mediawiki/images/b/b8/Bullhead.png',
  'bream': 'https://stardewvalleywiki.com/mediawiki/images/9/9a/Bream.png',
  'sunfish': 'https://stardewvalleywiki.com/mediawiki/images/c/c8/Sunfish.png',
  'shad': 'https://stardewvalleywiki.com/mediawiki/images/3/34/Shad.png',
  'halibut': 'https://stardewvalleywiki.com/mediawiki/images/0/02/Halibut.png',
  'lingcod': 'https://stardewvalleywiki.com/mediawiki/images/1/12/Lingcod.png',
  'squid': 'https://stardewvalleywiki.com/mediawiki/images/6/60/Squid.png',
  'tilapia': 'https://stardewvalleywiki.com/mediawiki/images/9/9a/Tilapia.png',
  'dorado': 'https://stardewvalleywiki.com/mediawiki/images/6/63/Dorado.png',
  'albacore': 'https://stardewvalleywiki.com/mediawiki/images/8/85/Albacore.png',
  'woodskip': 'https://stardewvalleywiki.com/mediawiki/images/3/35/Woodskip.png',
  'ghostfish': 'https://stardewvalleywiki.com/mediawiki/images/9/91/Ghostfish.png',
  'stonefish': 'https://stardewvalleywiki.com/mediawiki/images/e/e3/Stonefish.png',
  'ice-pip': 'https://stardewvalleywiki.com/mediawiki/images/3/33/Ice_Pip.png',
  'scorpion-carp': 'https://stardewvalleywiki.com/mediawiki/images/4/41/Scorpion_Carp.png',
  'sandfish': 'https://stardewvalleywiki.com/mediawiki/images/c/cc/Sandfish.png'
};

async function downloadFile(url, outputPath) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  console.log('🐟 Downloading missing fish sprites...\n');
  
  let success = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const [slug, url] of Object.entries(FISH_SPRITES)) {
    const webpPath = path.join(OUTPUT_DIR, `${slug}.webp`);
    const pngPath = path.join(OUTPUT_DIR, `${slug}.png`);
    
    // Skip if already exists
    if (fs.existsSync(webpPath) || fs.existsSync(pngPath)) {
      console.log(`⏭️  ${slug} - already exists`);
      skipped++;
      continue;
    }
    
    console.log(`📥 Downloading: ${slug}...`);
    
    try {
      await downloadFile(url, pngPath);
      console.log(`   ✅ ${slug} downloaded successfully`);
      success++;
    } catch (error) {
      console.log(`   ❌ ${slug} failed: ${error.message}`);
      failed++;
    }
    
    // Small delay to be respectful
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n📊 Results: ${success} downloaded, ${skipped} skipped, ${failed} failed`);
  
  if (success > 0) {
    console.log('\n💡 Tip: PNG files downloaded. Consider converting to WebP for optimization:');
    console.log('   npx sharp-cli *.png --format webp');
  }
}

main().catch(console.error);
