/**
 * Download missing fish images from Stardew Valley Wiki
 * 
 * Usage: node scripts/download-missing-fish.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../public/images/items');

// Missing fish slugs and their wiki image names
// Wiki URL pattern: https://stardewvalleywiki.com/mediawiki/images/X/XX/Fish_Name.png
const FISH_IMAGE_MAP = {
  'midnight-carp': 'Midnight_Carp',
  'spook-fish': 'Spook_Fish', 
  'blobfish': 'Blobfish',
  'midnight-squid': 'Midnight_Squid',
  'crab': 'Crab',
  'lobster': 'Lobster',
  'shrimp': 'Shrimp',
  'crayfish': 'Crayfish',
  'snail': 'Snail',
  'periwinkle': 'Periwinkle',
  'mussel': 'Mussel',
  'oyster': 'Oyster',
  'cockle': 'Cockle',
  'clam': 'Clam',
  'coral': 'Coral',
  'sea-urchin': 'Sea_Urchin',
  'stingray': 'Stingray',
  'lionfish': 'Lionfish',
  'blue-discus': 'Blue_Discus',
  'son-of-crimsonfish': 'Son_of_Crimsonfish',
  'ms-angler': 'Ms._Angler',
  'legend-ii': 'Legend_II',
  'glacierfish-jr': 'Glacierfish_Jr.',
  'radioactive-carp': 'Radioactive_Carp',
  'goby': 'Goby'
};

// Direct wiki image URLs (found from wiki pages)
const WIKI_URLS = {
  'midnight-carp': 'https://stardewvalleywiki.com/mediawiki/images/1/11/Midnight_Carp.png',
  'spook-fish': 'https://stardewvalleywiki.com/mediawiki/images/3/39/Spook_Fish.png',
  'blobfish': 'https://stardewvalleywiki.com/mediawiki/images/2/26/Blobfish.png',
  'midnight-squid': 'https://stardewvalleywiki.com/mediawiki/images/d/d3/Midnight_Squid.png',
  'crab': 'https://stardewvalleywiki.com/mediawiki/images/4/42/Crab.png',
  'lobster': 'https://stardewvalleywiki.com/mediawiki/images/2/25/Lobster.png',
  'shrimp': 'https://stardewvalleywiki.com/mediawiki/images/0/01/Shrimp.png',
  'crayfish': 'https://stardewvalleywiki.com/mediawiki/images/a/a7/Crayfish.png',
  'snail': 'https://stardewvalleywiki.com/mediawiki/images/7/71/Snail.png',
  'periwinkle': 'https://stardewvalleywiki.com/mediawiki/images/8/8b/Periwinkle.png',
  'mussel': 'https://stardewvalleywiki.com/mediawiki/images/a/aa/Mussel.png',
  'oyster': 'https://stardewvalleywiki.com/mediawiki/images/3/37/Oyster.png',
  'cockle': 'https://stardewvalleywiki.com/mediawiki/images/0/0c/Cockle.png',
  'clam': 'https://stardewvalleywiki.com/mediawiki/images/3/32/Clam.png',
  'coral': 'https://stardewvalleywiki.com/mediawiki/images/a/a5/Coral.png',
  'sea-urchin': 'https://stardewvalleywiki.com/mediawiki/images/5/53/Sea_Urchin.png',
  'stingray': 'https://stardewvalleywiki.com/mediawiki/images/f/fa/Stingray.png',
  'lionfish': 'https://stardewvalleywiki.com/mediawiki/images/5/58/Lionfish.png',
  'blue-discus': 'https://stardewvalleywiki.com/mediawiki/images/2/2c/Blue_Discus.png',
  'son-of-crimsonfish': 'https://stardewvalleywiki.com/mediawiki/images/5/5b/Son_of_Crimsonfish.png',
  'ms-angler': 'https://stardewvalleywiki.com/mediawiki/images/9/95/Ms._Angler.png',
  'legend-ii': 'https://stardewvalleywiki.com/mediawiki/images/8/82/Legend_II.png',
  'glacierfish-jr': 'https://stardewvalleywiki.com/mediawiki/images/9/91/Glacierfish_Jr..png',
  'radioactive-carp': 'https://stardewvalleywiki.com/mediawiki/images/0/00/Radioactive_Carp.png',
  'goby': 'https://stardewvalleywiki.com/mediawiki/images/5/51/Goby.png'
};

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);
        resolve(buffer);
      });
      response.on('error', reject);
    });
    request.on('error', reject);
  });
}

async function convertToWebP(inputPath, outputPath) {
  const sharp = require('sharp');
  await sharp(inputPath)
    .webp({ quality: 90 })
    .toFile(outputPath);
}

async function main() {
  console.log('Downloading missing fish images...\n');
  
  const slugs = Object.keys(WIKI_URLS);
  let success = 0;
  let failed = 0;
  
  for (const slug of slugs) {
    const url = WIKI_URLS[slug];
    const pngPath = path.join(OUTPUT_DIR, `${slug}.png`);
    const webpPath = path.join(OUTPUT_DIR, `${slug}.webp`);
    
    // Skip if already exists
    if (fs.existsSync(webpPath)) {
      console.log(`✓ ${slug} already exists, skipping`);
      success++;
      continue;
    }
    
    try {
      console.log(`Downloading ${slug}...`);
      await downloadImage(url, pngPath);
      
      // Convert to WebP
      await convertToWebP(pngPath, webpPath);
      
      // Remove temp PNG
      fs.unlinkSync(pngPath);
      
      console.log(`✓ ${slug} downloaded and converted`);
      success++;
    } catch (err) {
      console.error(`✗ ${slug} failed: ${err.message}`);
      failed++;
    }
    
    // Small delay to be nice to the server
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\nComplete! Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);
