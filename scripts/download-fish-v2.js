/**
 * Download missing fish images by scraping Wiki pages for correct image URLs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../public/images/items');

// Missing fish - map slug to wiki page name
const MISSING_FISH = {
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

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchPage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    protocol.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        fs.writeFileSync(outputPath, Buffer.concat(chunks));
        resolve();
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function convertToWebP(inputPath, outputPath) {
  const sharp = require('sharp');
  await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
}

async function getImageUrlFromWiki(pageName) {
  const wikiUrl = `https://stardewvalleywiki.com/${encodeURIComponent(pageName)}`;
  console.log(`  Fetching wiki page: ${wikiUrl}`);
  
  const html = await fetchPage(wikiUrl);
  
  // Look for the infobox image - pattern: src="//stardewvalleywiki.com/mediawiki/images/...png"
  // The main item image is usually in the infobox
  const patterns = [
    // Infobox image pattern
    /src="(\/\/stardewvalleywiki\.com\/mediawiki\/images\/[^"]+\.png)"/gi,
    // Alternative pattern
    /src="(https:\/\/stardewvalleywiki\.com\/mediawiki\/images\/[^"]+\.png)"/gi
  ];
  
  for (const pattern of patterns) {
    const matches = [...html.matchAll(pattern)];
    for (const match of matches) {
      let imgUrl = match[1];
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl;
      }
      // Skip thumbnails (they have /thumb/ in path)
      if (imgUrl.includes('/thumb/')) continue;
      // Skip UI elements, icons that aren't the main item
      if (imgUrl.includes('Icon') || imgUrl.includes('Skill')) continue;
      
      // Check if filename matches what we're looking for
      const fileName = pageName.replace(/_/g, '_');
      if (imgUrl.toLowerCase().includes(fileName.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
        return imgUrl;
      }
    }
  }
  
  // Fallback: just get the first non-thumbnail PNG
  const fallbackPattern = /src="((?:https:)?\/\/stardewvalleywiki\.com\/mediawiki\/images\/[^"]+\.png)"/i;
  const fallbackMatch = html.match(fallbackPattern);
  if (fallbackMatch) {
    let url = fallbackMatch[1];
    if (url.startsWith('//')) url = 'https:' + url;
    if (!url.includes('/thumb/')) return url;
  }
  
  return null;
}

async function main() {
  console.log('=== Downloading Missing Fish Images ===\n');
  
  let success = 0, failed = 0;
  const failedList = [];
  
  for (const [slug, wikiName] of Object.entries(MISSING_FISH)) {
    const webpPath = path.join(OUTPUT_DIR, `${slug}.webp`);
    
    // Skip if already exists
    if (fs.existsSync(webpPath)) {
      console.log(`✓ ${slug} - already exists`);
      success++;
      continue;
    }
    
    console.log(`\nProcessing: ${slug}`);
    
    try {
      const imageUrl = await getImageUrlFromWiki(wikiName);
      
      if (!imageUrl) {
        console.log(`✗ ${slug} - could not find image URL on wiki`);
        failedList.push(slug);
        failed++;
        continue;
      }
      
      console.log(`  Found: ${imageUrl}`);
      
      const pngPath = path.join(OUTPUT_DIR, `${slug}.png`);
      await downloadFile(imageUrl, pngPath);
      await convertToWebP(pngPath, webpPath);
      fs.unlinkSync(pngPath);
      
      console.log(`✓ ${slug} - downloaded and converted`);
      success++;
      
    } catch (err) {
      console.log(`✗ ${slug} - ${err.message}`);
      failedList.push(slug);
      failed++;
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Success: ${success}, Failed: ${failed}`);
  
  if (failedList.length > 0) {
    console.log(`\nFailed items: ${failedList.join(', ')}`);
    console.log('\nFor failed items, you may need to manually download from:');
    failedList.forEach(slug => {
      const wikiName = MISSING_FISH[slug];
      console.log(`  ${slug}: https://stardewvalleywiki.com/${wikiName}`);
    });
  }
}

main().catch(console.error);
