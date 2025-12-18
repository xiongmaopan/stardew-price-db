// Simple batch download script - run each fish one by one
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'd:/CODEFREE/星露谷/stardew-price-db/public/images/items';

// Verified Wiki image URLs (from wiki pages)
const FISH_URLS = {
  'midnight-carp': 'https://stardewvalleywiki.com/mediawiki/images/1/19/Midnight_Carp.png',
  'spook-fish': 'https://stardewvalleywiki.com/mediawiki/images/c/c4/Spook_Fish.png',
  'blobfish': 'https://stardewvalleywiki.com/mediawiki/images/2/29/Blobfish.png',
  'midnight-squid': 'https://stardewvalleywiki.com/mediawiki/images/d/d9/Midnight_Squid.png',
  'crab': 'https://stardewvalleywiki.com/mediawiki/images/6/63/Crab.png',
  'lobster': 'https://stardewvalleywiki.com/mediawiki/images/0/02/Lobster.png',
  'shrimp': 'https://stardewvalleywiki.com/mediawiki/images/9/9e/Shrimp.png',
  'crayfish': 'https://stardewvalleywiki.com/mediawiki/images/a/a9/Crayfish.png',
  'snail': 'https://stardewvalleywiki.com/mediawiki/images/2/28/Snail.png',
  'periwinkle': 'https://stardewvalleywiki.com/mediawiki/images/8/85/Periwinkle.png',
  'mussel': 'https://stardewvalleywiki.com/mediawiki/images/a/a3/Mussel.png',
  'oyster': 'https://stardewvalleywiki.com/mediawiki/images/2/24/Oyster.png',
  'cockle': 'https://stardewvalleywiki.com/mediawiki/images/a/ad/Cockle.png',
  'clam': 'https://stardewvalleywiki.com/mediawiki/images/4/42/Clam.png',
  'coral': 'https://stardewvalleywiki.com/mediawiki/images/0/08/Coral.png',
  'sea-urchin': 'https://stardewvalleywiki.com/mediawiki/images/5/57/Sea_Urchin.png',
  'stingray': 'https://stardewvalleywiki.com/mediawiki/images/f/f6/Stingray.png',
  'lionfish': 'https://stardewvalleywiki.com/mediawiki/images/d/de/Lionfish.png',
  'blue-discus': 'https://stardewvalleywiki.com/mediawiki/images/4/4f/Blue_Discus.png',
  'son-of-crimsonfish': 'https://stardewvalleywiki.com/mediawiki/images/2/2a/Son_of_Crimsonfish.png',
  'ms-angler': 'https://stardewvalleywiki.com/mediawiki/images/3/34/Ms._Angler.png',
  'legend-ii': 'https://stardewvalleywiki.com/mediawiki/images/b/bb/Legend_II.png',
  'glacierfish-jr': 'https://stardewvalleywiki.com/mediawiki/images/b/b2/Glacierfish_Jr..png',
  'radioactive-carp': 'https://stardewvalleywiki.com/mediawiki/images/c/c2/Radioactive_Carp.png',
  'goby': 'https://stardewvalleywiki.com/mediawiki/images/4/42/Goby.png'
};

async function downloadAndConvert(slug, url) {
  const pngPath = path.join(OUTPUT_DIR, `${slug}.png`);
  const webpPath = path.join(OUTPUT_DIR, `${slug}.webp`);
  
  if (fs.existsSync(webpPath)) {
    console.log(`[SKIP] ${slug} exists`);
    return true;
  }
  
  try {
    // Download using PowerShell
    const psCmd = `$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '${url}' -OutFile '${pngPath}' -UseBasicParsing`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'pipe' });
    
    // Convert to WebP
    const sharp = require('sharp');
    await sharp(pngPath).webp({ quality: 90 }).toFile(webpPath);
    
    // Remove PNG
    fs.unlinkSync(pngPath);
    
    console.log(`[OK] ${slug}`);
    return true;
  } catch (err) {
    console.log(`[FAIL] ${slug}: ${err.message}`);
    // Cleanup
    if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
    return false;
  }
}

async function main() {
  console.log('Downloading missing fish images...\n');
  
  let success = 0, failed = 0;
  const failedList = [];
  
  for (const [slug, url] of Object.entries(FISH_URLS)) {
    const ok = await downloadAndConvert(slug, url);
    if (ok) success++;
    else {
      failed++;
      failedList.push(slug);
    }
  }
  
  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
  if (failedList.length > 0) {
    console.log('Failed:', failedList.join(', '));
  }
}

main();
