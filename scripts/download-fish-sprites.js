// Download missing fish sprites from Stardew Valley Wiki
const https = require('https');
const fs = require('fs');
const path = require('path');

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

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`  ↳ Redirecting to: ${redirectUrl}`);
        file.close();
        fs.unlinkSync(outputPath);
        downloadFile(redirectUrl, outputPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
  });
}

async function downloadAllSprites() {
  console.log('🐟 Downloading missing fish sprites...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const [slug, url] of Object.entries(FISH_SPRITES)) {
    const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
    
    // Skip if already exists (as webp or png)
    if (fs.existsSync(path.join(OUTPUT_DIR, `${slug}.webp`))) {
      console.log(`✓ ${slug} - already exists`);
      success++;
      continue;
    }
    
    console.log(`Downloading: ${slug}...`);
    
    try {
      await downloadFile(url, outputPath);
      console.log(`  ✓ ${slug} downloaded successfully`);
      success++;
    } catch (error) {
      console.log(`  ✗ ${slug} failed: ${error.message}`);
      failed++;
    }
    
    // Small delay to be respectful to the wiki
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n📊 Results: ${success} success, ${failed} failed`);
  console.log('\n💡 Note: PNG files downloaded. You may want to convert to WebP for optimization.');
}

downloadAllSprites();
