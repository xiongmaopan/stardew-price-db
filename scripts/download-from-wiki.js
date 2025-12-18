const https = require('https');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'items');

// Items that need images
const items = [
  'aged-roe', 'pale-ale', 'mead', 'dinosaur-mayonnaise', 'truffle-oil',
  'honey', 'fairy-honey', 'oak-resin', 'pine-tar', 'sap', 'stone', 'fiber',
  'coal', 'gold-ore', 'iridium-ore', 'iron-bar', 'gold-bar', 'iridium-bar',
  'radioactive-bar', 'spice-berry', 'grape-forage', 'sweet-pea', 'red-mushroom',
  'holly', 'crocus', 'nautilus-shell', 'cactus-fruit', 'ginger', 'magma-cap',
  'battery-pack', 'refined-quartz', 'oil', 'sugar', 'rice', 'vinegar',
  'geode', 'frozen-geode', 'magma-geode', 'omni-geode', 'pearl', 'banana', 'mango', 'qi-fruit'
];

// Map slug to wiki filename
const wikiNames = {
  'aged-roe': 'Aged_Roe',
  'pale-ale': 'Pale_Ale',
  'mead': 'Mead',
  'dinosaur-mayonnaise': 'Dinosaur_Mayonnaise',
  'truffle-oil': 'Truffle_Oil',
  'honey': 'Honey',
  'fairy-honey': 'Fairy_Rose_Honey',
  'oak-resin': 'Oak_Resin',
  'pine-tar': 'Pine_Tar',
  'sap': 'Sap',
  'stone': 'Stone',
  'fiber': 'Fiber',
  'coal': 'Coal',
  'gold-ore': 'Gold_Ore',
  'iridium-ore': 'Iridium_Ore',
  'iron-bar': 'Iron_Bar',
  'gold-bar': 'Gold_Bar',
  'iridium-bar': 'Iridium_Bar',
  'radioactive-bar': 'Radioactive_Bar',
  'spice-berry': 'Spice_Berry',
  'grape-forage': 'Grape',
  'sweet-pea': 'Sweet_Pea',
  'red-mushroom': 'Red_Mushroom',
  'holly': 'Holly',
  'crocus': 'Crocus',
  'nautilus-shell': 'Nautilus_Shell',
  'cactus-fruit': 'Cactus_Fruit',
  'ginger': 'Ginger',
  'magma-cap': 'Magma_Cap',
  'battery-pack': 'Battery_Pack',
  'refined-quartz': 'Refined_Quartz',
  'oil': 'Oil',
  'sugar': 'Sugar',
  'rice': 'Rice',
  'vinegar': 'Vinegar',
  'geode': 'Geode',
  'frozen-geode': 'Frozen_Geode',
  'magma-geode': 'Magma_Geode',
  'omni-geode': 'Omni_Geode',
  'pearl': 'Pearl',
  'banana': 'Banana',
  'mango': 'Mango',
  'qi-fruit': 'Qi_Fruit'
};

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', reject);
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        file.close();
        fs.unlinkSync(destPath);
        resolve(false);
      }
    }).on('error', reject);
  });
}

async function processItem(slug) {
  const outputFile = path.join(outputDir, `${slug}.webp`);
  
  if (fs.existsSync(outputFile)) {
    console.log(`SKIP: ${slug}`);
    return;
  }
  
  const wikiName = wikiNames[slug];
  if (!wikiName) {
    console.log(`NO NAME: ${slug}`);
    return;
  }
  
  try {
    // Get the wiki file page to find the actual image URL
    const filePageUrl = `https://stardewvalleywiki.com/File:${wikiName}.png`;
    const html = await fetchPage(filePageUrl);
    
    // Extract the actual image URL from the page
    const match = html.match(/mediawiki\/images\/[a-f0-9]\/[a-f0-9]{2}\/[^"]+\.png/);
    if (match) {
      const imageUrl = `https://stardewvalleywiki.com/${match[0]}`;
      const success = await downloadFile(imageUrl, outputFile);
      console.log(`${success ? 'OK' : 'FAIL'}: ${slug}`);
    } else {
      console.log(`NO IMAGE: ${slug}`);
    }
  } catch (err) {
    console.log(`ERROR: ${slug} - ${err.message}`);
  }
  
  // Rate limiting
  await new Promise(r => setTimeout(r, 300));
}

async function main() {
  console.log('Downloading missing images from Stardew Wiki...\n');
  
  for (const slug of items) {
    await processItem(slug);
  }
  
  console.log('\nDone!');
}

main();
