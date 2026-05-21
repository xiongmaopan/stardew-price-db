const fs = require('fs');

const itemsData = JSON.parse(fs.readFileSync('data/items.json', 'utf8'));
const fishData = JSON.parse(fs.readFileSync('data/fish.json', 'utf8'));

const errors = [];
const warnings = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function driedProductBasePrice(basePrice) {
  return Math.floor(basePrice * 7.5 + 25);
}

function artisanPrice(basePrice) {
  return Math.floor((basePrice * 14) / 10);
}

function smokedFishPrice(fishSellPrice, hasArtisan = false) {
  const smokedBase = fishSellPrice * 2;
  return hasArtisan ? artisanPrice(smokedBase) : smokedBase;
}

function qualityRatios(fertilizerLevel, farmingLevel = 10) {
  const goldBase = 0.2 * (farmingLevel / 10) + 0.2 * fertilizerLevel * ((farmingLevel + 2) / 12) + 0.01;
  const iridium = fertilizerLevel >= 3 ? goldBase / 2 : 0;
  const gold = goldBase * (1 - iridium);

  if (fertilizerLevel >= 3) {
    return { normal: 0, silver: 1 - gold - iridium, gold, iridium };
  }

  const silver = Math.min(0.75, goldBase * 2) * (1 - gold);
  return { normal: 1 - silver - gold - iridium, silver, gold, iridium };
}

function calculatorGrowthTime(baseGrowthTime, growthBonus = 0, hasAgriculturist = false) {
  const totalBonus = growthBonus + (hasAgriculturist ? 0.1 : 0);
  return Math.max(1, Math.floor(baseGrowthTime * Math.max(0.1, 1 - totalBonus)));
}

function calculatorHarvests(crop, startDay = 1, maxDay = 28, growthBonus = 0, hasAgriculturist = false) {
  const growthTime = calculatorGrowthTime(crop.growthTime, growthBonus, hasAgriculturist);
  let harvests = 0;
  let currentDay = startDay + growthTime;

  if (currentDay <= maxDay) {
    harvests = 1;
    if (crop.regrows && crop.regrowTime) {
      while (currentDay + crop.regrowTime <= maxDay) {
        currentDay += crop.regrowTime;
        harvests++;
      }
    } else {
      while (currentDay + growthTime <= maxDay) {
        currentDay += growthTime;
        harvests++;
      }
    }
  }

  return harvests;
}

for (const item of itemsData.items) {
  if (item.category === 'Crops' && item.processing) {
    if (item.processing.jarProduct === 'Jelly' || item.processing.jarProduct === 'Pickles') {
      const expected = item.basePrice * 2 + 50;
      check(
        item.processing.jarPrice === expected,
        `${item.name}: ${item.processing.jarProduct} is ${item.processing.jarPrice}g, expected ${expected}g`
      );
    }

    if (item.processing.kegProduct === 'Wine') {
      const expected = item.basePrice * 3;
      check(item.processing.kegPrice === expected, `${item.name}: Wine is ${item.processing.kegPrice}g, expected ${expected}g`);
    }

    if (item.processing.kegProduct === 'Juice') {
      const expected = Math.floor(item.basePrice * 2.25);
      check(item.processing.kegPrice === expected, `${item.name}: Juice is ${item.processing.kegPrice}g, expected ${expected}g`);
    }
  }
}

for (const fish of fishData.fish) {
  if (!fish.processing || fish.processing.roePrice == null) continue;

  const expectedRoe = Math.floor(30 + fish.basePrice / 2);
  check(fish.processing.roePrice === expectedRoe, `${fish.name}: Roe is ${fish.processing.roePrice}g, expected ${expectedRoe}g`);

  if (fish.processing.agedRoePrice != null) {
    const expectedAgedRoe = fish.processing.roePrice * 2;
    check(
      fish.processing.agedRoePrice === expectedAgedRoe,
      `${fish.name}: Aged Roe is ${fish.processing.agedRoePrice}g, expected ${expectedAgedRoe}g`
    );
  }

  if (fish.slug === 'sturgeon') {
    check(fish.processing.caviarPrice === 500, 'Sturgeon: Caviar must be 500g');
  }
}

const requiredCrops = ['carrot', 'summer-squash', 'broccoli', 'powdermelon'];
for (const slug of requiredCrops) {
  check(itemsData.items.some(item => item.slug === slug), `Missing Stardew Valley 1.6 crop: ${slug}`);
}

const requiredFixedPriceItems = {
  moss: 5,
  raisins: 600,
  'mystic-syrup': 1000,
  'tea-sapling': 250,
  'fairy-dust': 300,
  'life-elixir': 250,
  'deluxe-bait': 1,
  'challenge-bait': 1,
};

for (const [slug, expectedPrice] of Object.entries(requiredFixedPriceItems)) {
  const item = itemsData.items.find(entry => entry.slug === slug);
  check(Boolean(item), `Missing fixed-price item: ${slug}`);
  if (item) {
    check(item.basePrice === expectedPrice, `${item.name}: base price is ${item.basePrice}g, expected ${expectedPrice}g`);
    check(item.hasQuality === false, `${item.name}: fixed non-quality item should have hasQuality=false`);
  }
}

const mysticSyrup = itemsData.items.find(item => item.slug === 'mystic-syrup');
if (mysticSyrup) {
  check(mysticSyrup.professionBonus?.name === 'Tapper', 'Mystic Syrup should document Tapper profession, not Artisan');
  check(mysticSyrup.professionBonus?.price === 1250, 'Mystic Syrup Tapper price must be 1,250g');
}

const parsnip = itemsData.items.find(item => item.slug === 'parsnip');
const greenBean = itemsData.items.find(item => item.slug === 'green-bean');
const potato = itemsData.items.find(item => item.slug === 'potato');
const coffeeBean = itemsData.items.find(item => item.slug === 'coffee-bean');

check(calculatorHarvests(parsnip, 1) === 6, 'Calculator: Parsnip planted Spring 1 should harvest 6 times with same-day replanting');
check(calculatorHarvests(parsnip, 24) === 1, 'Calculator: Parsnip planted Spring 24 should harvest once on Spring 28');
check(calculatorHarvests(parsnip, 25) === 0, 'Calculator: Parsnip planted Spring 25 should not harvest before season end');
check(calculatorHarvests(greenBean, 1) === 6, 'Calculator: Green Bean planted Spring 1 should harvest 6 times');
check(calculatorHarvests(potato, 1) === 4, 'Calculator: Potato planted Spring 1 should harvest 4 times with same-day replanting');
check((potato.harvestYield || 1) + (potato.extraHarvestChance || 0) === 1.25, 'Calculator: Potato expected yield should include 25% extra potato chance');
check(calculatorGrowthTime(parsnip.growthTime, 0.1, false) === 3, 'Calculator: Speed-Gro should reduce Parsnip growth from 4 to 3 days');
check(coffeeBean.processing.kegPrice === 150, 'Calculator: Coffee should remain 150g per 5 beans before any profession modifier');

const deluxeLevel10 = qualityRatios(3, 10);
check(deluxeLevel10.normal === 0, 'Calculator: Deluxe Fertilizer should not produce normal-quality crops');
check(Math.round(deluxeLevel10.iridium * 1000) === 405, 'Calculator: Deluxe Fertilizer level 10 iridium chance should be 40.5%');

check(driedProductBasePrice(550) === 4150, 'Dried Ancient Fruit must be floor(550 * 7.5 + 25) = 4,150g');
check(artisanPrice(driedProductBasePrice(550)) === 5810, 'Dried Ancient Fruit with Artisan must be 5,810g');
check(driedProductBasePrice(5) === 62, 'Dried Salmonberry must floor 62.5g to 62g');
check(smokedFishPrice(700) === 1400, 'Smoked Lava Eel must be 1,400g before Artisan');
check(smokedFishPrice(700, true) === 1960, 'Smoked Lava Eel must be 1,960g with Artisan');
check(smokedFishPrice(Math.floor(700 * 1.25), true) === 2450, 'Smoked Lava Eel with Angler and Artisan must be 2,450g');
check(Math.floor(100 * 1.2) === 120, 'Rancher raw animal product example must apply +20%');

if (warnings.length) {
  console.log('Warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error('Data integrity audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Data integrity audit passed for ${itemsData.items.length} items and ${fishData.fish.length} fish.`);
