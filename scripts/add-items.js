const fs = require('fs');

// Read current items
let content = fs.readFileSync('data/items.json', 'utf8').replace(/^\uFEFF/, '');
const lines = content.split('\n');
const cleanLines = lines.filter(l => !l.trim().startsWith('//'));
const data = JSON.parse(cleanLines.join('\n'));

console.log('Current items count:', data.items.length);

// New items to add (IDs 72-162)
const newItems = [
  { id: 72, name: "Caviar", slug: "caviar", category: "Artisan Goods", subcategory: "Fish Product", basePrice: 500, source: "Sturgeon Roe + Preserves Jar", description: "The cured roe of a Sturgeon fish. Considered a luxury item." },
  { id: 73, name: "Aged Roe", slug: "aged-roe", category: "Artisan Goods", subcategory: "Fish Product", basePrice: 0, source: "Fish Roe + Preserves Jar", description: "Fish eggs aged in salt. Value varies by fish type." },
  { id: 74, name: "Pale Ale", slug: "pale-ale", category: "Artisan Goods", subcategory: "Beverage", basePrice: 300, source: "Hops + Keg", description: "Drink in moderation." },
  { id: 75, name: "Beer", slug: "beer", category: "Artisan Goods", subcategory: "Beverage", basePrice: 200, source: "Wheat + Keg", description: "A refreshing cold pint." },
  { id: 76, name: "Mead", slug: "mead", category: "Artisan Goods", subcategory: "Beverage", basePrice: 200, source: "Honey + Keg", description: "A fermented beverage made from honey." },
  { id: 77, name: "Cheese", slug: "cheese", category: "Artisan Goods", subcategory: "Dairy", basePrice: 230, source: "Milk + Cheese Press", description: "A slice of hard cheese." },
  { id: 78, name: "Goat Cheese", slug: "goat-cheese", category: "Artisan Goods", subcategory: "Dairy", basePrice: 400, source: "Goat Milk + Cheese Press", description: "Soft cheese made from goat's milk." },
  { id: 79, name: "Mayonnaise", slug: "mayonnaise", category: "Artisan Goods", subcategory: "Egg Product", basePrice: 190, source: "Egg + Mayonnaise Machine", description: "It looks delicious!" },
  { id: 80, name: "Duck Mayonnaise", slug: "duck-mayonnaise", category: "Artisan Goods", subcategory: "Egg Product", basePrice: 375, source: "Duck Egg + Mayonnaise Machine", description: "It's a rich golden yellow." },
  { id: 81, name: "Void Mayonnaise", slug: "void-mayonnaise", category: "Artisan Goods", subcategory: "Egg Product", basePrice: 275, source: "Void Egg + Mayonnaise Machine", description: "A thick, black paste that smells like burnt hair." },
  { id: 82, name: "Dinosaur Mayonnaise", slug: "dinosaur-mayonnaise", category: "Artisan Goods", subcategory: "Egg Product", basePrice: 800, source: "Dinosaur Egg + Mayonnaise Machine", description: "It's thick and creamy with a vivid green hue." },
  { id: 83, name: "Truffle Oil", slug: "truffle-oil", category: "Artisan Goods", subcategory: "Oil", basePrice: 1065, source: "Truffle + Oil Maker", description: "A gourmet cooking ingredient." },
  { id: 84, name: "Cloth", slug: "cloth", category: "Artisan Goods", subcategory: "Textile", basePrice: 470, source: "Wool + Loom", description: "A bolt of fine wool cloth." },
  { id: 85, name: "Honey", slug: "honey", category: "Artisan Goods", subcategory: "Bee Product", basePrice: 100, source: "Bee House", description: "A sweet syrupy treat. Value varies by nearby flower type." },
  { id: 86, name: "Fairy Honey", slug: "fairy-honey", category: "Artisan Goods", subcategory: "Bee Product", basePrice: 680, source: "Bee House + Fairy Rose", description: "Honey infused with the essence of Fairy Rose flowers." },
  { id: 87, name: "Coffee", slug: "coffee", category: "Artisan Goods", subcategory: "Beverage", basePrice: 150, source: "5 Coffee Beans + Keg", description: "Gives +1 Speed for 1:23." },
  { id: 88, name: "Maple Syrup", slug: "maple-syrup", category: "Artisan Goods", subcategory: "Tree Product", basePrice: 200, source: "Tapper on Maple Tree", description: "A sweet syrup with a unique flavor." },
  { id: 89, name: "Oak Resin", slug: "oak-resin", category: "Artisan Goods", subcategory: "Tree Product", basePrice: 150, source: "Tapper on Oak Tree", description: "A sticky substance with a characteristic scent." },
  { id: 90, name: "Pine Tar", slug: "pine-tar", category: "Artisan Goods", subcategory: "Tree Product", basePrice: 100, source: "Tapper on Pine Tree", description: "A pungent, antiseptic resin." },
  { id: 91, name: "Sap", slug: "sap", category: "Resources", subcategory: "Tree Product", basePrice: 2, source: "Chopping Trees", description: "A sticky substance found inside trees." },
  { id: 92, name: "Hardwood", slug: "hardwood", category: "Resources", subcategory: "Wood", basePrice: 15, source: "Large Stumps, Logs, Mahogany Trees", description: "A special type of wood with superior strength." },
  { id: 93, name: "Wood", slug: "wood", category: "Resources", subcategory: "Wood", basePrice: 2, source: "Chopping Trees", description: "A sturdy, versatile building material." },
  { id: 94, name: "Stone", slug: "stone", category: "Resources", subcategory: "Mining", basePrice: 2, source: "Mining Rocks", description: "A common material used for building." },
  { id: 95, name: "Fiber", slug: "fiber", category: "Resources", subcategory: "Farming", basePrice: 1, source: "Cutting Weeds, Fiber Seeds", description: "Raw plant fiber. Useful for crafting." },
  { id: 96, name: "Coal", slug: "coal", category: "Resources", subcategory: "Mining", basePrice: 15, source: "Mining, Dust Sprites, Charcoal Kiln", description: "A smoldering heap of useful fuel." },
  { id: 97, name: "Copper Ore", slug: "copper-ore", category: "Resources", subcategory: "Ore", basePrice: 5, source: "Mines (Floors 1-39)", description: "A common ore with many practical uses." },
  { id: 98, name: "Iron Ore", slug: "iron-ore", category: "Resources", subcategory: "Ore", basePrice: 10, source: "Mines (Floors 40-79)", description: "A fairly common ore with many uses." },
  { id: 99, name: "Gold Ore", slug: "gold-ore", category: "Resources", subcategory: "Ore", basePrice: 25, source: "Mines (Floors 80+), Skull Cavern", description: "A precious ore that can be smelted into bars." },
  { id: 100, name: "Iridium Ore", slug: "iridium-ore", category: "Resources", subcategory: "Ore", basePrice: 100, source: "Skull Cavern, Magma Geodes", description: "An extremely rare and valuable ore." },
  { id: 101, name: "Copper Bar", slug: "copper-bar", category: "Resources", subcategory: "Bar", basePrice: 60, source: "Furnace (5 Copper Ore + 1 Coal)", description: "A bar of pure copper." },
  { id: 102, name: "Iron Bar", slug: "iron-bar", category: "Resources", subcategory: "Bar", basePrice: 120, source: "Furnace (5 Iron Ore + 1 Coal)", description: "A bar of pure iron." },
  { id: 103, name: "Gold Bar", slug: "gold-bar", category: "Resources", subcategory: "Bar", basePrice: 250, source: "Furnace (5 Gold Ore + 1 Coal)", description: "A bar of pure gold." },
  { id: 104, name: "Iridium Bar", slug: "iridium-bar", category: "Resources", subcategory: "Bar", basePrice: 1000, source: "Furnace (5 Iridium Ore + 1 Coal)", description: "A bar of pure iridium." },
  { id: 105, name: "Quartz", slug: "quartz", category: "Minerals", subcategory: "Gem", basePrice: 25, source: "Mines (all levels)", description: "A fairly common mineral with many industrial uses." },
  { id: 106, name: "Fire Quartz", slug: "fire-quartz", category: "Minerals", subcategory: "Gem", basePrice: 100, source: "Mines (Floors 80+), Magma Geodes", description: "A fiery red quartz." },
  { id: 107, name: "Frozen Tear", slug: "frozen-tear", category: "Minerals", subcategory: "Gem", basePrice: 75, source: "Mines (Floors 40-79), Dust Sprites", description: "A crystal formed from frozen water." },
  { id: 108, name: "Earth Crystal", slug: "earth-crystal", category: "Minerals", subcategory: "Gem", basePrice: 50, source: "Mines (Floors 1-39), Duggies", description: "A crystal formed from compressed earth." },
  { id: 109, name: "Amethyst", slug: "amethyst", category: "Minerals", subcategory: "Gem", basePrice: 100, source: "Mining, Geodes", description: "A purple variety of quartz." },
  { id: 110, name: "Aquamarine", slug: "aquamarine", category: "Minerals", subcategory: "Gem", basePrice: 180, source: "Mining, Geodes", description: "A shimmery blue-green gem." },
  { id: 111, name: "Topaz", slug: "topaz", category: "Minerals", subcategory: "Gem", basePrice: 80, source: "Mining, Geodes", description: "A fairly common gem." },
  { id: 112, name: "Jade", slug: "jade", category: "Minerals", subcategory: "Gem", basePrice: 200, source: "Mining, Geodes", description: "A pale green ornamental stone." },
  { id: 113, name: "Diamond", slug: "diamond", category: "Minerals", subcategory: "Gem", basePrice: 750, source: "Mining, Geodes, Panning", description: "A rare and valuable gem." },
  { id: 114, name: "Prismatic Shard", slug: "prismatic-shard", category: "Minerals", subcategory: "Gem", basePrice: 2000, source: "Mining (rare), Mystic Stone, Monsters", description: "A very rare and beautiful substance." },
  { id: 115, name: "Ruby", slug: "ruby", category: "Minerals", subcategory: "Gem", basePrice: 250, source: "Mining, Geodes", description: "A precious stone prized for its red color." },
  { id: 116, name: "Emerald", slug: "emerald", category: "Minerals", subcategory: "Gem", basePrice: 250, source: "Mining, Geodes", description: "A brilliant green gemstone." },
  { id: 117, name: "Spring Onion", slug: "spring-onion", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 8, location: "Cindersap Forest (south)", description: "Found wild in spring. Grows in the forest." },
  { id: 118, name: "Daffodil", slug: "daffodil", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 30, location: "Pelican Town, Bus Stop", description: "A cheerful spring flower." },
  { id: 119, name: "Leek", slug: "leek", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 60, location: "Mountain, Backwoods", description: "A tasty relative of the onion." },
  { id: 120, name: "Dandelion", slug: "dandelion", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 40, location: "Pelican Town", description: "A weed with edible roots." },
  { id: 121, name: "Wild Horseradish", slug: "wild-horseradish", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 50, location: "Backwoods, Mountain", description: "A spicy root found in spring." },
  { id: 122, name: "Salmonberry", slug: "salmonberry", category: "Forage", subcategory: "Spring", season: ["Spring"], basePrice: 5, location: "Bushes (Spring 15-18)", description: "A berry found in spring. Has a light taste." },
  { id: 123, name: "Spice Berry", slug: "spice-berry", category: "Forage", subcategory: "Summer", season: ["Summer"], basePrice: 80, location: "Beach, Backwoods", description: "Tastes peppery with a hint of sweetness." },
  { id: 124, name: "Sweet Pea", slug: "sweet-pea", category: "Forage", subcategory: "Summer", season: ["Summer"], basePrice: 50, location: "Pelican Town, Railroad", description: "A fragrant summer flower." },
  { id: 125, name: "Fiddlehead Fern", slug: "fiddlehead-fern", category: "Forage", subcategory: "Summer", season: ["Summer"], basePrice: 90, location: "Secret Woods", description: "The young fronds have a distinctive coil pattern." },
  { id: 126, name: "Red Mushroom", slug: "red-mushroom", category: "Forage", subcategory: "Summer", season: ["Summer", "Fall"], basePrice: 75, location: "Secret Woods, Mines", description: "A poisonous mushroom. Handle with care." },
  { id: 127, name: "Common Mushroom", slug: "common-mushroom", category: "Forage", subcategory: "Fall", season: ["Fall"], basePrice: 40, location: "Secret Woods, Fall Foraging", description: "Slightly nutty, with good flavor." },
  { id: 128, name: "Wild Plum", slug: "wild-plum", category: "Forage", subcategory: "Fall", season: ["Fall"], basePrice: 80, location: "Mountain, Bus Stop", description: "Found in the fall. Tangy and sweet." },
  { id: 129, name: "Hazelnut", slug: "hazelnut", category: "Forage", subcategory: "Fall", season: ["Fall"], basePrice: 90, location: "Backwoods, Bus Stop", description: "A nut wrapped in a leafy husk." },
  { id: 130, name: "Blackberry", slug: "blackberry", category: "Forage", subcategory: "Fall", season: ["Fall"], basePrice: 20, location: "Bushes (Fall 8-11)", description: "An intensely sweet berry." },
  { id: 131, name: "Chanterelle", slug: "chanterelle", category: "Forage", subcategory: "Fall", season: ["Fall"], basePrice: 160, location: "Secret Woods", description: "A tasty mushroom with a fruity smell." },
  { id: 132, name: "Holly", slug: "holly", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 80, location: "Bus Stop, Secret Woods", description: "The leaves and berries make a popular winter decoration." },
  { id: 133, name: "Crystal Fruit", slug: "crystal-fruit", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 150, location: "Pelican Town, Bus Stop", description: "A delicate fruit that grows in winter." },
  { id: 134, name: "Snow Yam", slug: "snow-yam", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 100, location: "Beach (artifact spots)", description: "A starchy tuber that grows in winter." },
  { id: 135, name: "Winter Root", slug: "winter-root", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 70, location: "Pelican Town (artifact spots)", description: "A root grown in winter." },
  { id: 136, name: "Crocus", slug: "crocus", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 60, location: "Railroad, Backwoods", description: "A flower that can survive even in winter." },
  { id: 137, name: "Nautilus Shell", slug: "nautilus-shell", category: "Forage", subcategory: "Winter", season: ["Winter"], basePrice: 120, location: "Beach", description: "An intricate shell from a nautilus." },
  { id: 138, name: "Rainbow Shell", slug: "rainbow-shell", category: "Forage", subcategory: "Summer", season: ["Summer"], basePrice: 300, location: "Beach", description: "Extremely rare. The colors are beautiful." },
  { id: 139, name: "Coconut", slug: "coconut", category: "Forage", subcategory: "Desert", season: ["Spring", "Summer", "Fall", "Winter"], basePrice: 100, location: "Desert", description: "A versatile palm tree fruit." },
  { id: 140, name: "Cactus Fruit", slug: "cactus-fruit", category: "Forage", subcategory: "Desert", season: ["Spring", "Summer", "Fall", "Winter"], basePrice: 75, location: "Desert", description: "A sweet fruit from a prickly cactus." },
  { id: 141, name: "Ginger", slug: "ginger", category: "Forage", subcategory: "Ginger Island", season: ["Spring", "Summer", "Fall", "Winter"], basePrice: 60, location: "Ginger Island", description: "A spicy root used in many cuisines." },
  { id: 142, name: "Magma Cap", slug: "magma-cap", category: "Forage", subcategory: "Ginger Island", season: ["Spring", "Summer", "Fall", "Winter"], basePrice: 400, location: "Volcano Dungeon", description: "A rare mushroom that thrives in volcanic temperatures." },
  { id: 143, name: "Battery Pack", slug: "battery-pack", category: "Resources", subcategory: "Crafted", basePrice: 500, source: "Lightning Rod, Solar Panel", description: "A charged battery. Useful for crafting." },
  { id: 144, name: "Refined Quartz", slug: "refined-quartz", category: "Resources", subcategory: "Crafted", basePrice: 50, source: "Furnace (Quartz or Fire Quartz)", description: "A more pure form of quartz." },
  { id: 145, name: "Oil", slug: "oil", category: "Artisan Goods", subcategory: "Oil", basePrice: 100, source: "Oil Maker (Corn, Sunflower Seeds, Sunflower)", description: "All-purpose cooking oil." },
  { id: 146, name: "Sugar", slug: "sugar", category: "Cooking", subcategory: "Ingredient", basePrice: 100, source: "Pierre's Store, Mill (Beet)", description: "Sweetens the flavor of any dish." },
  { id: 147, name: "Wheat Flour", slug: "wheat-flour", category: "Cooking", subcategory: "Ingredient", basePrice: 100, source: "Pierre's Store, Mill (Wheat)", description: "A finely ground flour made from wheat." },
  { id: 148, name: "Rice", slug: "rice", category: "Cooking", subcategory: "Ingredient", basePrice: 100, source: "Pierre's Store, Mill (Unmilled Rice)", description: "A versatile grain." },
  { id: 149, name: "Vinegar", slug: "vinegar", category: "Cooking", subcategory: "Ingredient", basePrice: 200, source: "Pierre's Store", description: "An acidic liquid used for cooking." },
  { id: 150, name: "Geode", slug: "geode", category: "Minerals", subcategory: "Geode", basePrice: 50, source: "Mines (Floors 1-39)", description: "A rock that Clint can open for you." },
  { id: 151, name: "Frozen Geode", slug: "frozen-geode", category: "Minerals", subcategory: "Geode", basePrice: 100, source: "Mines (Floors 40-79)", description: "A rock that contains frozen minerals." },
  { id: 152, name: "Magma Geode", slug: "magma-geode", category: "Minerals", subcategory: "Geode", basePrice: 150, source: "Mines (Floors 80+), Volcano", description: "A geode formed from volcanic rock." },
  { id: 153, name: "Omni Geode", slug: "omni-geode", category: "Minerals", subcategory: "Geode", basePrice: 0, source: "Mines, Skull Cavern, Panning", description: "A mysterious geode that could contain almost anything." },
  { id: 154, name: "Golden Pumpkin", slug: "golden-pumpkin", category: "Special", subcategory: "Festival", basePrice: 2500, source: "Spirit's Eve Maze", description: "A valuable prize from the Spirit's Eve festival." },
  { id: 155, name: "Pearl", slug: "pearl", category: "Special", subcategory: "Rare", basePrice: 2500, source: "Night Market Mermaid, Blobfish Pond", description: "A rare gem." },
  { id: 156, name: "Lucky Lunch", slug: "lucky-lunch", category: "Cooking", subcategory: "Cooked", basePrice: 250, source: "Cooking (Sea Cucumber, Tortilla, Blue Jazz)", description: "A special dish. (+3 Luck)" },
  { id: 157, name: "Spicy Eel", slug: "spicy-eel", category: "Cooking", subcategory: "Cooked", basePrice: 175, source: "Cooking (Eel, Hot Pepper)", description: "+1 Luck, +1 Speed buff." },
  { id: 158, name: "Crab Cakes", slug: "crab-cakes", category: "Cooking", subcategory: "Cooked", basePrice: 275, source: "Cooking (Crab, Wheat Flour, Egg, Oil)", description: "+1 Speed, +1 Defense buff." },
  { id: 159, name: "Dish o' The Sea", slug: "dish-o-the-sea", category: "Cooking", subcategory: "Cooked", basePrice: 220, source: "Cooking (Sardine, Hashbrowns)", description: "+3 Fishing buff." },
  { id: 160, name: "Seafoam Pudding", slug: "seafoam-pudding", category: "Cooking", subcategory: "Cooked", basePrice: 300, source: "Cooking (Flounder, Midnight Carp, Squid Ink)", description: "+4 Fishing buff (best fishing food)." },
  { id: 161, name: "Pumpkin Pie", slug: "pumpkin-pie", category: "Cooking", subcategory: "Cooked", basePrice: 385, source: "Cooking (Pumpkin, Wheat Flour, Milk, Sugar)", description: "A traditional fall dessert." },
  { id: 162, name: "Banana", slug: "banana", category: "Crops", subcategory: "Fruit", season: ["Summer"], basePrice: 150, seedPrice: 250, seedSource: "Island Trader", growthTime: 28, regrows: true, regrowTime: 4, description: "A tropical fruit with a creamy texture.", processing: { jarPrice: 350, jarProduct: "Jelly", kegPrice: 450, kegProduct: "Wine", kegTime: 7, jarTime: 3 } },
  { id: 163, name: "Mango", slug: "mango", category: "Crops", subcategory: "Fruit", season: ["Summer"], basePrice: 130, description: "A sweet tropical stone fruit.", processing: { jarPrice: 310, jarProduct: "Jelly", kegPrice: 390, kegProduct: "Wine", kegTime: 7, jarTime: 3 } },
  { id: 164, name: "Pineapple", slug: "pineapple", category: "Crops", subcategory: "Fruit", season: ["Summer"], basePrice: 300, seedPrice: 240, seedSource: "Island Trader", growthTime: 14, regrows: true, regrowTime: 7, description: "A tropical fruit with a tangy flavor.", processing: { jarPrice: 650, jarProduct: "Jelly", kegPrice: 900, kegProduct: "Wine", kegTime: 7, jarTime: 3 } },
  { id: 165, name: "Taro Root", slug: "taro-root", category: "Crops", subcategory: "Vegetable", season: ["Summer"], basePrice: 100, seedPrice: 20, seedSource: "Island Trader", growthTime: 10, regrows: false, description: "A starchy root that grows in wet or dry soil.", processing: { jarPrice: 250, jarProduct: "Pickles", kegPrice: 225, kegProduct: "Juice", kegTime: 4, jarTime: 3 } }
];

// Add new items
data.items.push(...newItems);

// Update lastUpdated
data.lastUpdated = "2025-12-10";

// Write back
const output = JSON.stringify(data, null, 2);
fs.writeFileSync('data/items.json', output, 'utf8');

console.log('Updated items count:', data.items.length);
console.log('File written successfully!');
