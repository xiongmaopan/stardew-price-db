const https = require('https');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'items');

// Missing images with their wiki paths
const images = {
  "aged-roe": "b/b9/Aged_Roe.png",
  "pale-ale": "e/ec/Pale_Ale.png",
  "mead": "4/4b/Mead.png",
  "dinosaur-mayonnaise": "3/3f/Dinosaur_Mayonnaise.png",
  "truffle-oil": "0/0e/Truffle_Oil.png",
  "honey": "a/a8/Honey_%28any%29.png",
  "fairy-honey": "f/f2/Fairy_Rose_Honey.png",
  "oak-resin": "a/a4/Oak_Resin.png",
  "pine-tar": "8/8a/Pine_Tar.png",
  "sap": "b/b6/Sap.png",
  "stone": "7/72/Stone.png",
  "fiber": "d/df/Fiber.png",
  "coal": "6/60/Coal.png",
  "gold-ore": "a/aa/Gold_Ore.png",
  "iridium-ore": "8/8a/Iridium_Ore.png",
  "iron-bar": "9/9d/Iron_Bar.png",
  "gold-bar": "5/54/Gold_Bar.png",
  "iridium-bar": "a/a5/Iridium_Bar.png",
  "radioactive-bar": "7/72/Radioactive_Bar.png",
  "spice-berry": "b/bc/Spice_Berry.png",
  "grape-forage": "c/cb/Grape.png",
  "sweet-pea": "5/5b/Sweet_Pea.png",
  "red-mushroom": "d/db/Red_Mushroom.png",
  "holly": "6/67/Holly.png",
  "crocus": "c/c0/Crocus.png",
  "nautilus-shell": "7/7b/Nautilus_Shell.png",
  "cactus-fruit": "6/6c/Cactus_Fruit.png",
  "ginger": "2/23/Ginger.png",
  "magma-cap": "8/85/Magma_Cap.png",
  "battery-pack": "d/d0/Battery_Pack.png",
  "refined-quartz": "e/ef/Refined_Quartz.png",
  "oil": "5/54/Oil.png",
  "sugar": "3/32/Sugar.png",
  "rice": "d/db/Rice.png",
  "vinegar": "0/04/Vinegar.png",
  "geode": "4/43/Geode.png",
  "frozen-geode": "b/bf/Frozen_Geode.png",
  "magma-geode": "8/89/Magma_Geode.png",
  "omni-geode": "0/09/Omni_Geode.png",
  "pearl": "3/33/Pearl.png",
  "banana": "9/94/Banana.png",
  "mango": "2/29/Mango.png",
  "qi-fruit": "e/e9/Qi_Fruit.png"
};

function download(itemSlug, wikiPath) {
  return new Promise((resolve, reject) => {
    const outputFile = path.join(outputDir, `${itemSlug}.webp`);
    
    if (fs.existsSync(outputFile)) {
      console.log(`Skip (exists): ${itemSlug}`);
      resolve();
      return;
    }
    
    const url = `https://stardewvalleywiki.com/mediawiki/images/${wikiPath}`;
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (res2) => {
          if (res2.statusCode !== 200) {
            console.log(`FAIL (${res2.statusCode}): ${itemSlug}`);
            resolve();
            return;
          }
          const fileStream = fs.createWriteStream(outputFile);
          res2.pipe(fileStream);
          fileStream.on('finish', () => {
            console.log(`OK: ${itemSlug}`);
            resolve();
          });
        });
      } else if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(outputFile);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log(`OK: ${itemSlug}`);
          resolve();
        });
      } else {
        console.log(`FAIL (${response.statusCode}): ${itemSlug}`);
        resolve();
      }
    }).on('error', (err) => {
      console.log(`ERROR: ${itemSlug} - ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  console.log('Downloading missing images...\n');
  
  for (const [slug, wikiPath] of Object.entries(images)) {
    await download(slug, wikiPath);
    // Small delay to be nice to the server
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('\nDone!');
}

main();
