const fs = require('fs');
const path = require('path');

// 读取现有策略
const strategiesPath = path.join(__dirname, '..', 'data', 'item-strategies.json');
const data = JSON.parse(fs.readFileSync(strategiesPath, 'utf8'));

// 添加新策略
const newStrategies = {
  'blue-jazz': {
    proTip: 'Blue Jazz flowers are universally liked gifts. Plant them near your farmhouse for easy access when you need a quick gift.',
    strategyNote: 'At 50g base price, Blue Jazz is not a profit crop. Its main value is in gifting and the Community Center Spring Crops Bundle. Honey from Blue Jazz Flowers sells for 200g.',
    goldPerDay: 3.57,
    recommendation: 'gift-or-honey',
    tier: 'low',
    bestUse: 'Universal gift, Blue Jazz Honey'
  },
  'tulip': {
    proTip: 'Tulips have the fastest flower growth at 6 days. Plant them early to complete the Spring Crops Bundle.',
    strategyNote: 'Base price of 30g makes this purely a bundle/gifting crop. Tulip Honey sells for 160g - not worth the Bee House time. Complete your bundle and move on.',
    goldPerDay: 1.67,
    recommendation: 'bundle-only',
    tier: 'low',
    bestUse: 'Community Center Spring Crops Bundle'
  },
  'tomato': {
    proTip: 'Tomatoes have a 5% chance to drop extra fruit per harvest. With 4-day regrowth and multi-harvest, they are Summer workhorses.',
    strategyNote: 'At 60g base × potential multi-harvest, Tomatoes are excellent passive income. Juice (180g) takes 4 days - only worthwhile with excess Kegs. Raw shipping is the meta.',
    goldPerDay: 6.0,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Reliable Summer regrowth income'
  },
  'hot-pepper': {
    proTip: 'Hot Peppers regrow every 3 days - the fastest regrowth in the game. Plant Day 1 Summer for 9 harvests.',
    strategyNote: '40g base seems low, but 3-day regrowth means 120g/harvest cycle after initial growth. Jelly (130g) is decent. Great for Pepper Poppers (speed buff recipe).',
    goldPerDay: 5.0,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Fast regrowth passive income, Pepper Poppers'
  },
  'radish': {
    proTip: 'Radishes are single-harvest with 6-day growth. They fill a gap when you need quick Summer gold.',
    strategyNote: '90g base price is solid for a 6-day crop. Pickles (220g) take 3 days - decent ROI if you have spare Jars. Not a main crop, but useful for filling empty tiles.',
    goldPerDay: 11.67,
    recommendation: 'preserves-jar',
    tier: 'mid',
    bestUse: 'Gap-filler crop, Pickle processing'
  },
  'wheat': {
    proTip: 'Wheat is the only crop that yields both Wheat (25g) AND Hay (free animal feed). With Scythe harvest, no energy cost.',
    strategyNote: 'Never sell Wheat for gold - the value is in free Hay. One Wheat plant = one Hay = 50g saved on animal feed. Plant 100+ Wheat and never buy Hay again.',
    goldPerDay: 6.25,
    recommendation: 'process-beer-or-hay',
    tier: 'utility',
    bestUse: 'Free Hay production for animals'
  },
  'summer-spangle': {
    proTip: 'Summer Spangle is a universally liked gift. The 8-day growth makes it less efficient than Blue Jazz for flower farming.',
    strategyNote: '90g base is decent for a flower, but the real value is gifting. Summer Spangle Honey (280g) is worth making if you have spare Bee Houses.',
    goldPerDay: 8.75,
    recommendation: 'honey-or-gift',
    tier: 'mid',
    bestUse: 'Summer gifting, decent Honey value'
  },
  'poppy': {
    proTip: 'Poppies are Penny favorite gift and required for Energy Tonic. 7-day growth, 140g base.',
    strategyNote: 'Poppy Honey sells for 380g - the highest value flower honey. If you are running Bee Houses, Poppies are the Summer meta. Plant near Bee Houses for maximum efficiency.',
    goldPerDay: 17.14,
    recommendation: 'honey',
    tier: 'high',
    bestUse: 'Highest value Honey production'
  },
  'eggplant': {
    proTip: 'Eggplant has 5% chance for extra drops. 5-day growth, then 5-day regrowth. A solid Fall workhorse.',
    strategyNote: '60g base with multi-harvest potential. Plant Day 1 of Fall for 6 harvests. Pickles (170g) are decent if you have spare Jars.',
    goldPerDay: 4.8,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Reliable Fall regrowth crop'
  },
  'amaranth': {
    proTip: 'Amaranth is a single-harvest Fall crop with 7-day growth. 150g base price makes it respectable.',
    strategyNote: 'Amaranth is solid but outclassed by Cranberries and Pumpkins. Use it to fill gaps or for the Fall Crops Bundle. Pickles (370g) are excellent if processing.',
    goldPerDay: 17.86,
    recommendation: 'preserves-jar',
    tier: 'mid',
    bestUse: 'Fall Crops Bundle, Pickle processing'
  },
  'grape': {
    proTip: 'Grapes grow on trellises with 3-day regrowth. 10-day initial growth, but excellent late-season production.',
    strategyNote: '80g base × consistent regrowth. Wine (225g) takes 7 days - worthwhile for Grapes. Plant by Fall 1 for 7 harvests. Trellis placement matters!',
    goldPerDay: 8.0,
    recommendation: 'keg',
    tier: 'mid',
    bestUse: 'Wine production, Fall regrowth income'
  },
  'yam': {
    proTip: 'Yams have 10-day growth but 20% chance for extra drops. High variance, high potential.',
    strategyNote: '160g base with bonus drops averages ~192g per harvest. Only 2 harvests per Fall without Speed-Gro. Solid for Pickles (390g).',
    goldPerDay: 13.0,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'High-value single harvest with bonus chance'
  },
  'artichoke': {
    proTip: 'Artichokes unlock Year 2 at Pierres. 8-day growth, 160g base. A Year 2 Fall staple.',
    strategyNote: 'Best single-harvest Fall crop after Pumpkin. Pickles (390g) are excellent. Plant in Year 2+ for maximum efficiency.',
    goldPerDay: 16.25,
    recommendation: 'preserves-jar',
    tier: 'high',
    bestUse: 'Year 2+ Fall crop, Pickle processing'
  },
  'bok-choy': {
    proTip: 'Bok Choy has the fastest Fall growth at 4 days. Quick turnover for early Fall gold.',
    strategyNote: '80g base in 4 days = solid early Fall income. 6 harvests possible per season. Pickles (210g) are decent if processing.',
    goldPerDay: 15.0,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Fast turnover Fall crop'
  },
  'fairy-rose': {
    proTip: 'Fairy Rose Honey sells for 680g - the highest value honey in the game. 12-day growth means plant by Fall 16.',
    strategyNote: '290g base makes Fairy Rose profitable raw. But Fairy Rose Honey (680g, 952g Artisan) is the real prize. The Fall flower meta for Bee Houses.',
    goldPerDay: 20.83,
    recommendation: 'honey',
    tier: 'premium',
    bestUse: 'Highest value Honey in the game'
  },
  'sunflower': {
    proTip: 'Sunflowers drop 0-2 Sunflower Seeds on harvest. With luck, they can be self-sustaining.',
    strategyNote: '80g base plus seed drops. Grows in Summer AND Fall - one of few dual-season crops. Sunflower Honey (260g) is mid-tier. Good for decoration and Oil production.',
    goldPerDay: 5.0,
    recommendation: 'oil-or-sell',
    tier: 'low',
    bestUse: 'Oil production, decoration, seed recovery'
  },
  'taro-root': {
    proTip: 'Ginger Island exclusive crop. 10-day growth in any season on the island. Can be irrigated for faster growth.',
    strategyNote: '100g base. The island irrigation system (-25% growth time) makes Taro more efficient. Mainly used for Taro Tuber recipe.',
    goldPerDay: 7.5,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Island farming, Taro Tuber recipe'
  },
  'pufferfish': {
    proTip: 'Summer only, sunny days, 12PM-4PM at the Ocean. One of the hardest fish to catch. Required for the Ocean Fish Bundle.',
    strategyNote: '200g base, but rare conditions. Use Trap Bobber or Cork Bobber. Save one for the bundle, sell extras. Not worth farming due to tight time window.',
    goldPerDay: null,
    recommendation: 'bundle-first',
    tier: 'rare',
    bestUse: 'Ocean Fish Bundle, Pufferfish quest'
  },
  'sturgeon': {
    proTip: 'Found in Mountain Lake, Summer/Winter, 6AM-7PM. Difficulty 78 - bring Trap Bobber. THE fish for Caviar production.',
    strategyNote: '200g base, but the real value is Fish Pond farming. Sturgeon Roe (320g) becomes Caviar (500g, 700g Artisan). Build a Sturgeon pond ASAP - its the passive income king.',
    goldPerDay: null,
    recommendation: 'fish-pond',
    tier: 'premium',
    bestUse: 'Fish Pond Caviar production'
  },
  'lava-eel': {
    proTip: 'Volcano Dungeon floors 5+, any time/season. Difficulty 90 - second hardest fish. Magic Bait works in lava.',
    strategyNote: '700g base is excellent. Lava Eel Fish Pond produces Roe AND Magma Geodes. The Roe (700g) ages to 1,064g Caviar. High-tier passive income source.',
    goldPerDay: null,
    recommendation: 'fish-pond',
    tier: 'legendary',
    bestUse: 'Fish Pond for Roe + Magma Geodes'
  },
  'legend': {
    proTip: 'Spring only, rainy day, Mountain Lake, Fishing Level 10 required. Difficulty 110 - the hardest fish. Once per save file (except Legend II in 1.6).',
    strategyNote: '5,000g base makes Legend the most valuable regular fish. With Angler profession, sells for 7,500g. Keep one for your collection, sell if you need spring gold.',
    goldPerDay: null,
    recommendation: 'sell-or-display',
    tier: 'legendary',
    bestUse: 'Trophy fish, massive one-time gold'
  },
  'mutant-carp': {
    proTip: 'Sewers only, any season/time/weather. Requires Rusty Key from Gunther. Difficulty 80.',
    strategyNote: '1,000g base. The easiest legendary to catch repeatedly. Good for gold farming if you have Sewer access. Angler profession makes it 1,500g.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'legendary',
    bestUse: 'Repeatable legendary fishing gold'
  },
  'crimsonfish': {
    proTip: 'Summer only, East Pier (Beach), Fishing Level 5 required. Difficulty 95. Rainy or sunny works.',
    strategyNote: '1,500g base. Once per save file. A solid summer gold injection. With Angler, sells for 2,250g. Pure trophy/gold fish.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'legendary',
    bestUse: 'Trophy fish, summer gold boost'
  },
  'angler-fish': {
    proTip: 'Fall only, wooden plank bridge north of JojaMart, Fishing Level 3+. Difficulty 85. A challenging catch.',
    strategyNote: '900g base. Once per save file. Sell with Angler profession for 1,350g. Complete your legendary collection!',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'legendary',
    bestUse: 'Trophy fish, fall gold'
  },
  'glacierfish': {
    proTip: 'Winter only, Arrowhead Island (south tip of Forest), Fishing Level 6 required. Difficulty 100.',
    strategyNote: '1,000g base. Once per save file. The second-hardest legendary. Trap Bobber essential. Sells for 1,500g with Angler.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'legendary',
    bestUse: 'Trophy fish, winter gold'
  },
  'catfish': {
    proTip: 'Spring/Fall, rainy days only, River (Town/Forest) or Secret Woods. 6AM-12AM. Difficulty 75.',
    strategyNote: '200g base. Weather-dependent catch. Save one for the River Fish Bundle. Good Fish Pond candidate - produces Roe.',
    goldPerDay: null,
    recommendation: 'bundle-then-pond',
    tier: 'mid',
    bestUse: 'River Fish Bundle, Fish Pond'
  },
  'octopus': {
    proTip: 'Summer only, morning (6AM-1PM), Ocean. Difficulty 95 - one of the hardest non-legendary fish.',
    strategyNote: '150g base doesnt reflect its difficulty. Required for the Specialty Fish Bundle. Use Trap Bobber and pray.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'rare',
    bestUse: 'Specialty Fish Bundle'
  },
  'super-cucumber': {
    proTip: 'Summer/Fall, evening only (6PM-2AM), Ocean. Difficulty 80. Glows in the dark!',
    strategyNote: '250g base is solid. Required for the Night Fishing Bundle. Roe (375g) makes decent Aged Roe. A fun evening catch.',
    goldPerDay: null,
    recommendation: 'sell-or-pond',
    tier: 'mid',
    bestUse: 'Night Fishing Bundle, evening gold'
  },
  'truffle': {
    proTip: 'Pigs find Truffles daily in Fall (and other seasons at higher hearts). Keep pigs at max happiness for consistent finds.',
    strategyNote: '625g base vs Truffle Oil (1,065g). Oil takes 6 hours in Oil Maker. With Artisan: Oil = 1,491g. ALWAYS make Truffle Oil unless you need instant gold.',
    goldPerDay: null,
    recommendation: 'oil-maker',
    tier: 'premium',
    bestUse: 'Truffle Oil production (Artisan = 1,491g)'
  },
  'morel': {
    proTip: 'Spring forage in Secret Woods and Forest Farm. Also spawns on Farm Cave (mushroom option).',
    strategyNote: '150g base. Best sold raw unless you need it for Life Elixir recipe. Common Mushrooms are better for Cave farming.',
    goldPerDay: null,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Spring foraging gold, Life Elixir ingredient'
  },
  'chanterelle': {
    proTip: 'Fall forage in Secret Woods. Golden-colored mushroom. Also from Farm Cave.',
    strategyNote: '160g base - the most valuable common forage mushroom. Sell raw for quick gold.',
    goldPerDay: null,
    recommendation: 'sell-raw',
    tier: 'mid',
    bestUse: 'Fall foraging gold'
  },
  'common-mushroom': {
    proTip: 'Fall forage everywhere. Farm Cave (mushroom) produces them daily. Very common.',
    strategyNote: '40g base. Low value but high volume from Cave. Use for Life Elixir or sell in bulk. Not worth processing.',
    goldPerDay: null,
    recommendation: 'sell-raw',
    tier: 'low',
    bestUse: 'Bulk selling, Life Elixir ingredient'
  },
  'purple-mushroom': {
    proTip: 'Found in Mines floors 81-119 and Farm Cave. Rare spawn.',
    strategyNote: '250g base. Save for Life Elixir recipe (restores full energy/health). Rare enough to be valuable.',
    goldPerDay: null,
    recommendation: 'recipe-or-sell',
    tier: 'mid',
    bestUse: 'Life Elixir crafting'
  },
  'ruby': {
    proTip: 'Found in Mines floors 80+, Omni Geodes, and gem nodes. Common gem.',
    strategyNote: '250g base. Crystallarium produces one every 2 days. Good passive income source, but Diamond is better.',
    goldPerDay: 125,
    recommendation: 'crystallarium',
    tier: 'mid',
    bestUse: 'Crystallarium income, Spicy Eel trade (Desert Trader)'
  },
  'emerald': {
    proTip: 'Found in Mines floors 80+, Omni Geodes. Green gem.',
    strategyNote: '250g base. Same Crystallarium output as Ruby. Can trade 1 Emerald for Cheese at Desert Trader on Fridays.',
    goldPerDay: 125,
    recommendation: 'crystallarium',
    tier: 'mid',
    bestUse: 'Crystallarium income'
  },
  'jade': {
    proTip: 'Found in Mines floors 40+, Omni Geodes. Green gem.',
    strategyNote: '200g base, but the meta is trading Jade for Staircases at Desert Trader on Sundays. Crystallarium Jade = infinite Staircases for Skull Cavern.',
    goldPerDay: 100,
    recommendation: 'crystallarium-staircases',
    tier: 'high',
    bestUse: 'Trade for Staircases (Skull Cavern meta)'
  },
  'large-milk': {
    proTip: 'High-heart cows produce Large Milk. Keep cows happy and petted daily.',
    strategyNote: '190g base vs Gold Cheese (300g) or Iridium Cheese (400g). ALWAYS process Large Milk into Cheese - massive value increase.',
    goldPerDay: null,
    recommendation: 'cheese-press',
    tier: 'mid',
    bestUse: 'Gold/Iridium Cheese production'
  },
  'large-egg': {
    proTip: 'High-heart chickens lay Large Eggs. Keep chickens happy for consistent large eggs.',
    strategyNote: '95g base vs Gold Mayo (285g). Large Eggs make Gold Mayo directly. Always process eggs.',
    goldPerDay: null,
    recommendation: 'mayonnaise-machine',
    tier: 'mid',
    bestUse: 'Gold Mayonnaise production'
  },
  'duck-egg': {
    proTip: 'Ducks lay eggs every 2 days at high hearts. Requires Big Coop.',
    strategyNote: '95g base vs Duck Mayonnaise (375g). Nearly 4x value increase from processing. Never sell raw.',
    goldPerDay: null,
    recommendation: 'mayonnaise-machine',
    tier: 'mid',
    bestUse: 'Duck Mayonnaise production'
  },
  'goat-milk': {
    proTip: 'Goats produce milk every 2 days. Requires Big Barn.',
    strategyNote: '225g base vs Goat Cheese (400g). Process all Goat Milk - 77% value increase.',
    goldPerDay: null,
    recommendation: 'cheese-press',
    tier: 'mid',
    bestUse: 'Goat Cheese production'
  },
  'large-goat-milk': {
    proTip: 'High-heart goats produce Large Goat Milk. Requires consistent care.',
    strategyNote: '345g base vs Gold Goat Cheese (600g). Always process. Goat Cheese is also a loved gift for several NPCs.',
    goldPerDay: null,
    recommendation: 'cheese-press',
    tier: 'high',
    bestUse: 'Gold Goat Cheese production'
  },
  'wool': {
    proTip: 'Sheep produce wool every 3 days. Rabbits drop wool randomly. Shepherd profession makes wool better quality.',
    strategyNote: '340g base vs Cloth (470g). Cloth takes 4 hours in Loom. Only process if you need Cloth for crafting or Clothes.',
    goldPerDay: null,
    recommendation: 'sell-or-loom',
    tier: 'mid',
    bestUse: 'Cloth production or raw sale'
  },
  'rabbits-foot': {
    proTip: 'Rabbits randomly drop Rabbits Foot. Higher hearts = higher chance. Lucky!',
    strategyNote: '565g base. A universally loved gift AND required for Secret Note #20 event. Keep 1-2, sell extras.',
    goldPerDay: null,
    recommendation: 'gift-or-sell',
    tier: 'high',
    bestUse: 'Universal loved gift, Secret Note #20'
  },
  'dinosaur-egg': {
    proTip: 'First one: INCUBATE IT. Found in artifact spots, fishing treasure, prehistoric floors. Extremely rare first find.',
    strategyNote: '350g base but DO NOT SELL YOUR FIRST ONE. Incubate to get a Dinosaur, which lays more eggs. After you have a Dino, eggs sell for 350g or make 800g Mayo.',
    goldPerDay: null,
    recommendation: 'incubate-first',
    tier: 'legendary',
    bestUse: 'Incubate first, then Dinosaur Mayonnaise'
  },
  'void-egg': {
    proTip: 'Void Chickens lay Void Eggs daily. Get first Void Egg from random witch event or Krobuss shop.',
    strategyNote: '65g base vs Void Mayonnaise (275g). Over 4x value increase. Always process.',
    goldPerDay: null,
    recommendation: 'mayonnaise-machine',
    tier: 'mid',
    bestUse: 'Void Mayonnaise production'
  },
  'golden-egg': {
    proTip: 'Golden Chickens lay Golden Eggs. Requires 100% perfection to unlock Golden Chicken.',
    strategyNote: '500g base vs Gold Mayonnaise (worth 750g? needs verification). Endgame flex item.',
    goldPerDay: null,
    recommendation: 'mayonnaise-or-display',
    tier: 'legendary',
    bestUse: 'Endgame perfection reward'
  },
  'ostrich-egg': {
    proTip: 'Ostriches lay Ostrich Eggs every 7 days. Requires Island Barn.',
    strategyNote: '600g base vs 10x Mayonnaise (1,000g). Yes, one Ostrich Egg makes 10 Mayo. Always process.',
    goldPerDay: null,
    recommendation: 'mayonnaise-machine',
    tier: 'high',
    bestUse: '10x Mayonnaise production'
  },
  'milk': {
    proTip: 'Regular cows produce milk daily when happy. Basic barn animal product.',
    strategyNote: '125g base vs Cheese (230g). 84% value increase from Cheese Press. Always process milk.',
    goldPerDay: null,
    recommendation: 'cheese-press',
    tier: 'low',
    bestUse: 'Cheese production'
  },
  'egg': {
    proTip: 'Chickens lay eggs daily when happy. White or brown eggs have same value.',
    strategyNote: '50g base vs Mayonnaise (190g). Nearly 4x value. Never sell raw eggs.',
    goldPerDay: null,
    recommendation: 'mayonnaise-machine',
    tier: 'low',
    bestUse: 'Mayonnaise production'
  },
  'mayonnaise': {
    proTip: 'Made from regular eggs in Mayonnaise Machine. Takes 3 hours.',
    strategyNote: '190g (Artisan: 266g). Basic processed animal product. Sell it - no further processing available.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'low',
    bestUse: 'Direct sale, ingredient for some recipes'
  },
  'duck-mayonnaise': {
    proTip: 'Made from Duck Eggs. Higher value than regular Mayo.',
    strategyNote: '375g (Artisan: 525g). Solid income from Duck eggs. Sell all of it.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'mid',
    bestUse: 'Direct sale'
  },
  'void-mayonnaise': {
    proTip: 'Made from Void Eggs. Krobus loves it!',
    strategyNote: '275g (Artisan: 385g). Krobus loved gift. Keep some for gifting, sell the rest.',
    goldPerDay: null,
    recommendation: 'gift-or-sell',
    tier: 'mid',
    bestUse: 'Krobus loved gift, sale'
  },
  'dinosaur-mayonnaise': {
    proTip: 'Made from Dinosaur Eggs. Highest value mayonnaise.',
    strategyNote: '800g (Artisan: 1,120g). Once you have a Dino farm going, this is excellent passive income.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'high',
    bestUse: 'High-value sale'
  },
  'cloth': {
    proTip: 'Made from Wool in Loom. Takes 4 hours. Also dropped by Mummies.',
    strategyNote: '470g base. Used in many clothing recipes and Mill Bundle. Sell extras, keep some for crafting.',
    goldPerDay: null,
    recommendation: 'sell-or-craft',
    tier: 'mid',
    bestUse: 'Clothing crafting, sale'
  },
  'sap': {
    proTip: 'Gathered from trees when chopping. Maple, Oak, and Pine all drop Sap.',
    strategyNote: '2g base - nearly worthless raw. Save 500 for Rain Totem crafting. Used in Fertilizer recipes.',
    goldPerDay: null,
    recommendation: 'save-for-crafting',
    tier: 'utility',
    bestUse: 'Fertilizer crafting, Rain Totems'
  },
  'hardwood': {
    proTip: '12/day from Secret Woods stumps. Also from Mahogany Trees and Large Stumps on farm.',
    strategyNote: '15g base but NEVER SELL. Used in Stable, buildings, Warp Totems, and many upgrades. Hoard all Hardwood.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Building upgrades, Warp Totems, Casks'
  },
  'wood': {
    proTip: 'Chop trees daily. Plant Tree Seeds for sustainable wood farm.',
    strategyNote: '2g base - dont sell. You need 1000s for buildings, machines, and crafting. Sustainable tree farming is essential.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Buildings, crafting, machines'
  },
  'stone': {
    proTip: 'Mine rocks everywhere. Quarry provides unlimited stone once unlocked.',
    strategyNote: '2g base - dont sell. Stone is used in paths, buildings, and many recipes. Keep at least 999 in stock.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Buildings, paths, Crystalariums'
  },
  'fiber': {
    proTip: 'Cut weeds with Scythe. Grows back seasonally. Also from Fiber Seeds.',
    strategyNote: '1g base - dont sell. Used in Scarecrows, Grass Starters, and important crafting. Keep 200+ always.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Scarecrows, Grass Starters, crafting'
  },
  'coal': {
    proTip: 'Mine dust sprites (floors 41-79), Clint sells it, or Charcoal Kilns from Wood.',
    strategyNote: '15g base but essential for smelting. Charcoal Kiln (10 Wood = 1 Coal) is inefficient early. Buy from Clint or farm dust sprites.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Smelting bars, machine crafting'
  },
  'copper-ore': {
    proTip: 'Mine floors 1-39 primarily. Also from Geodes and panning.',
    strategyNote: '5g base - dont sell. Smelt into Copper Bars for machines. Youll need hundreds for Kegs, Jars, etc.',
    goldPerDay: null,
    recommendation: 'smelt',
    tier: 'utility',
    bestUse: 'Smelt into Copper Bars'
  },
  'iron-ore': {
    proTip: 'Mine floors 41-79 primarily. Also from Frozen Geodes.',
    strategyNote: '10g base - dont sell. Iron Bars used in Quality Sprinklers and many machines. Critical mid-game resource.',
    goldPerDay: null,
    recommendation: 'smelt',
    tier: 'utility',
    bestUse: 'Smelt into Iron Bars'
  },
  'gold-ore': {
    proTip: 'Mine floors 81-119. Also from Magma and Omni Geodes.',
    strategyNote: '25g base - dont sell. Gold Bars used in Iridium Sprinklers and late-game crafting. Save all of it.',
    goldPerDay: null,
    recommendation: 'smelt',
    tier: 'utility',
    bestUse: 'Smelt into Gold Bars'
  },
  'copper-bar': {
    proTip: 'Smelt 5 Copper Ore + 1 Coal. Takes 30 minutes.',
    strategyNote: '60g base - dont sell. Used in Tappers, Kegs, Bee Houses, and tool upgrades. Essential early-game.',
    goldPerDay: null,
    recommendation: 'craft',
    tier: 'utility',
    bestUse: 'Machines and tool upgrades'
  },
  'iron-bar': {
    proTip: 'Smelt 5 Iron Ore + 1 Coal. Takes 2 hours.',
    strategyNote: '120g base - dont sell unless excess. Quality Sprinklers, Kegs, and many machines need Iron Bars.',
    goldPerDay: null,
    recommendation: 'craft',
    tier: 'utility',
    bestUse: 'Machines and tool upgrades'
  },
  'gold-bar': {
    proTip: 'Smelt 5 Gold Ore + 1 Coal. Takes 5 hours.',
    strategyNote: '250g base - dont sell. Iridium Sprinklers, Crystalariums, and late-game machines need Gold Bars.',
    goldPerDay: null,
    recommendation: 'craft',
    tier: 'utility',
    bestUse: 'Iridium Sprinklers, late-game machines'
  },
  'iridium-bar': {
    proTip: 'Smelt 5 Iridium Ore + 1 Coal. Ore from Skull Cavern floors 50+.',
    strategyNote: '1,000g base - tempting to sell but DONT. Iridium Sprinklers, tools, and endgame items need bars. Sell only huge excess.',
    goldPerDay: null,
    recommendation: 'craft',
    tier: 'premium',
    bestUse: 'Iridium tools, Crystalariums, endgame'
  },
  'radioactive-bar': {
    proTip: 'Smelt 5 Radioactive Ore + 1 Coal. Ore from Qi quest mines.',
    strategyNote: '3,000g base. Used in some 1.5 content. Sell if you have completed all radioactive crafting.',
    goldPerDay: null,
    recommendation: 'sell-excess',
    tier: 'legendary',
    bestUse: 'Endgame crafting, excess sale'
  },
  'quartz': {
    proTip: 'Found in Mines all floors. Also from Geodes.',
    strategyNote: '25g base. Refine into Refined Quartz (3 Quartz + 1 Coal = 3 Refined). Used in Quality Sprinklers. Keep for crafting.',
    goldPerDay: null,
    recommendation: 'refine',
    tier: 'utility',
    bestUse: 'Refined Quartz for sprinklers'
  },
  'fire-quartz': {
    proTip: 'Found in Mines floors 80+. Red glowing mineral.',
    strategyNote: '100g base. Refines into 3 Refined Quartz. Good donation for Museum. Sell extras.',
    goldPerDay: null,
    recommendation: 'museum-then-sell',
    tier: 'mid',
    bestUse: 'Museum donation, Refined Quartz'
  },
  'frozen-tear': {
    proTip: 'Found in Mines floors 41-79 and Frozen Geodes. Sebastian loves these.',
    strategyNote: '75g base. Sebastian loved gift - keep some for him. Also used in Warrior Ring recipe.',
    goldPerDay: null,
    recommendation: 'gift-or-sell',
    tier: 'mid',
    bestUse: 'Sebastian gift, Warrior Ring'
  },
  'earth-crystal': {
    proTip: 'Found in Mines floors 1-39 and Geodes. Brown crystal.',
    strategyNote: '50g base. Used in Mayonnaise Machine recipe. Keep some for crafting early game.',
    goldPerDay: null,
    recommendation: 'craft-or-sell',
    tier: 'low',
    bestUse: 'Mayonnaise Machine crafting'
  },
  'amethyst': {
    proTip: 'Found in Mines floors 1-39 and Geodes. Abigail loves these.',
    strategyNote: '100g base. Abigail loves Amethyst - great early gift. Crystallarium produces 1.5/day.',
    goldPerDay: 75,
    recommendation: 'gift-or-crystallarium',
    tier: 'mid',
    bestUse: 'Abigail gift, Crystallarium'
  },
  'aquamarine': {
    proTip: 'Found in Mines floors 41+ and Frozen Geodes. Blue gem.',
    strategyNote: '180g base. Decent Crystallarium value. Also used in Marble Brazier recipe.',
    goldPerDay: 90,
    recommendation: 'crystallarium-or-sell',
    tier: 'mid',
    bestUse: 'Crystallarium income'
  },
  'topaz': {
    proTip: 'Found in Mines all floors and Geodes. Yellow gem.',
    strategyNote: '80g base. Low Crystallarium value compared to Diamond or Jade. Sell or gift.',
    goldPerDay: 40,
    recommendation: 'sell',
    tier: 'low',
    bestUse: 'Direct sale or Museum'
  },
  'spring-onion': {
    proTip: 'Found in Forest (south of Farm) Spring only. Respawns daily.',
    strategyNote: '8g base - not worth selling. But its free energy early game. Eat them while foraging.',
    goldPerDay: null,
    recommendation: 'eat',
    tier: 'low',
    bestUse: 'Early game energy food'
  },
  'daffodil': {
    proTip: 'Spring forage everywhere. One of the first items you find.',
    strategyNote: '30g base. Universally liked gift (not loved). Good for early friendship building.',
    goldPerDay: null,
    recommendation: 'gift',
    tier: 'low',
    bestUse: 'Early friendship gifts'
  },
  'leek': {
    proTip: 'Spring forage in Mountains and Forest. George loves Leeks.',
    strategyNote: '60g base. George loved gift - easy early friendship with him. Also used in some cooking.',
    goldPerDay: null,
    recommendation: 'gift-george',
    tier: 'low',
    bestUse: 'George loved gift'
  },
  'dandelion': {
    proTip: 'Spring forage everywhere. Yellow flower.',
    strategyNote: '40g base. Universally liked. Good for salads recipe. Low priority forage.',
    goldPerDay: null,
    recommendation: 'sell-or-gift',
    tier: 'low',
    bestUse: 'Salad recipe, gifts'
  },
  'wild-horseradish': {
    proTip: 'Spring forage in Forest and Secret Woods.',
    strategyNote: '50g base. Required for Spring Foraging Bundle. Save 1 for bundle, sell rest.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Spring Foraging Bundle'
  },
  'salmonberry': {
    proTip: 'Salmonberry Season: Spring 15-18. Bushes produce unlimited berries. Gather hundreds!',
    strategyNote: '5g base - terrible sell price. But FREE ENERGY. Gather 200+ and eat them all Spring/Summer for energy.',
    goldPerDay: null,
    recommendation: 'eat',
    tier: 'utility',
    bestUse: 'Free energy food'
  },
  'spice-berry': {
    proTip: 'Summer forage in Forest and Beach.',
    strategyNote: '80g base - decent summer forage. Required for Summer Foraging Bundle.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Summer Foraging Bundle'
  },
  'grape-forage': {
    proTip: 'Summer forage in Mountains. Purple grapes.',
    strategyNote: '80g base. Vincent loves grapes. Good summer forage value.',
    goldPerDay: null,
    recommendation: 'gift-or-sell',
    tier: 'low',
    bestUse: 'Vincent gift, Summer Foraging Bundle'
  },
  'sweet-pea': {
    proTip: 'Summer forage in Bus Stop and Forest.',
    strategyNote: '50g base. Universally liked flower. Good for Summer Foraging Bundle.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Summer Foraging Bundle'
  },
  'fiddlehead-fern': {
    proTip: 'Summer forage ONLY in Secret Woods. Required for Fiddlehead Risotto.',
    strategyNote: '90g base. Limited spawn location. Save for Chef Bundle and cooking. Dont waste on raw selling.',
    goldPerDay: null,
    recommendation: 'save',
    tier: 'mid',
    bestUse: 'Chef Bundle, Fiddlehead Risotto'
  },
  'red-mushroom': {
    proTip: 'Summer/Fall forage in Secret Woods and Mines. Also Farm Cave.',
    strategyNote: '75g base. Used in Life Elixir recipe. Mildly poisonous if eaten raw (-stamina).',
    goldPerDay: null,
    recommendation: 'recipe-or-sell',
    tier: 'low',
    bestUse: 'Life Elixir ingredient'
  },
  'wild-plum': {
    proTip: 'Fall forage everywhere. Purple fruit.',
    strategyNote: '80g base. Required for Fall Foraging Bundle. Jelly (210g) is decent if processing.',
    goldPerDay: null,
    recommendation: 'bundle-or-jelly',
    tier: 'low',
    bestUse: 'Fall Foraging Bundle'
  },
  'hazelnut': {
    proTip: 'Fall forage everywhere. Spawns on ground and bushes.',
    strategyNote: '90g base. Required for Fall Foraging Bundle. Decent forage value.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Fall Foraging Bundle'
  },
  'blackberry': {
    proTip: 'Blackberry Season: Fall 8-11. Bushes produce unlimited berries.',
    strategyNote: '20g base - low value but FREE. Gather hundreds for free energy and Jelly (90g).',
    goldPerDay: null,
    recommendation: 'eat-or-jelly',
    tier: 'utility',
    bestUse: 'Free energy, bulk Jelly'
  },
  'holly': {
    proTip: 'Winter forage everywhere. Red berries.',
    strategyNote: '80g base. Universally hated gift (its poisonous!). Sell it, dont gift.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'low',
    bestUse: 'Winter Foraging Bundle, sell'
  },
  'crystal-fruit': {
    proTip: 'Winter forage in all outdoor areas. Blue crystal fruit.',
    strategyNote: '150g base - highest winter forage value. Wine (337g) is worth making.',
    goldPerDay: null,
    recommendation: 'wine-or-sell',
    tier: 'mid',
    bestUse: 'Wine production, Winter Foraging Bundle'
  },
  'snow-yam': {
    proTip: 'Winter forage - dig up with Hoe in tillable ground. Also from artifact spots.',
    strategyNote: '100g base. Required for Winter Foraging Bundle. Decent digging income.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Winter Foraging Bundle'
  },
  'winter-root': {
    proTip: 'Winter forage - dig up with Hoe. Also dropped by Blue Slimes.',
    strategyNote: '70g base. Required for Winter Foraging Bundle. Common winter find.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'low',
    bestUse: 'Winter Foraging Bundle'
  },
  'crocus': {
    proTip: 'Winter forage everywhere. Purple/white flower.',
    strategyNote: '60g base. Sandy loves Crocus. Keep some for gifting to Sandy.',
    goldPerDay: null,
    recommendation: 'gift-sandy',
    tier: 'low',
    bestUse: 'Sandy gift, Winter Foraging Bundle'
  },
  'nautilus-shell': {
    proTip: 'Winter forage on Beach. Brown spiral shell.',
    strategyNote: '120g base. Required for Winter Foraging Bundle. Also used in some crafting.',
    goldPerDay: null,
    recommendation: 'bundle',
    tier: 'mid',
    bestUse: 'Winter Foraging Bundle'
  },
  'rainbow-shell': {
    proTip: 'Summer forage on Beach. Rare rainbow-colored shell.',
    strategyNote: '300g base - highest beach forage. Keep 1 for potential quests, sell extras.',
    goldPerDay: null,
    recommendation: 'save-one-sell-rest',
    tier: 'mid',
    bestUse: 'Quest item, direct sale'
  },
  'coconut': {
    proTip: 'Found in Desert by hitting palm trees. Also from Oasis shop.',
    strategyNote: '100g base. Used in many tropical recipes. Stock up when in Desert.',
    goldPerDay: null,
    recommendation: 'save-for-recipes',
    tier: 'mid',
    bestUse: 'Tropical recipe ingredient'
  },
  'cactus-fruit': {
    proTip: 'Desert forage and from Cactus planted in greenhouse. Sam loves these.',
    strategyNote: '75g base. Sam loved gift. Plant Cactus in Greenhouse for year-round production.',
    goldPerDay: null,
    recommendation: 'gift-sam',
    tier: 'mid',
    bestUse: 'Sam loved gift'
  },
  'ginger': {
    proTip: 'Ginger Island forage. Dig up from artifact spots on island.',
    strategyNote: '60g base. Used in many 1.5 recipes and Ginger Ale (energy drink). Keep stock for recipes.',
    goldPerDay: null,
    recommendation: 'save-for-recipes',
    tier: 'mid',
    bestUse: 'Ginger Island recipes'
  },
  'magma-cap': {
    proTip: 'Volcano Dungeon forage. Red glowing mushroom.',
    strategyNote: '400g base - highest value forage mushroom. Sell raw for excellent gold.',
    goldPerDay: null,
    recommendation: 'sell',
    tier: 'high',
    bestUse: 'Direct sale (400g)'
  },
  'refined-quartz': {
    proTip: 'Made in Furnace (1 Quartz or Fire Quartz + 1 Coal) or Recycling Machine from Broken CD/Glasses.',
    strategyNote: '50g base - dont sell. Critical for Quality Sprinklers, Lightning Rods, and many machines.',
    goldPerDay: null,
    recommendation: 'never-sell',
    tier: 'utility',
    bestUse: 'Quality Sprinklers, crafting'
  },
  'oil': {
    proTip: 'Made in Oil Maker from Corn, Sunflower Seeds, or Sunflowers.',
    strategyNote: '100g base. Used in many cooking recipes. Make from Corn or buy from Pierre for 200g.',
    goldPerDay: null,
    recommendation: 'recipe-use',
    tier: 'utility',
    bestUse: 'Cooking ingredient'
  },
  'sugar': {
    proTip: 'Buy from Pierre (100g) or make in Mill from Beets.',
    strategyNote: '100g if sold (dont). Essential cooking ingredient. Keep stock of 20+ for recipes.',
    goldPerDay: null,
    recommendation: 'save-for-cooking',
    tier: 'utility',
    bestUse: 'Cooking ingredient'
  },
  'wheat-flour': {
    proTip: 'Buy from Pierre (100g) or make in Mill from Wheat.',
    strategyNote: '100g if sold (dont). Essential cooking ingredient. Mill Wheat to save money.',
    goldPerDay: null,
    recommendation: 'mill-wheat',
    tier: 'utility',
    bestUse: 'Cooking ingredient'
  },
  'rice': {
    proTip: 'Buy from Pierre (200g) or mill from Unmilled Rice (grown crop).',
    strategyNote: 'Used in many recipes including Maki Roll. Mill your own to save gold.',
    goldPerDay: null,
    recommendation: 'mill-or-buy',
    tier: 'utility',
    bestUse: 'Cooking ingredient'
  },
  'vinegar': {
    proTip: 'Buy from Pierre for 200g. Cannot be crafted.',
    strategyNote: 'Used in Pickles recipe and some other cooking. Buy as needed.',
    goldPerDay: null,
    recommendation: 'buy-as-needed',
    tier: 'utility',
    bestUse: 'Cooking ingredient'
  },
  'geode': {
    proTip: 'Found in Mines floors 1-39. Break open at Clints for 25g.',
    strategyNote: 'Contains minerals and artifacts. Process all of them at Clint for Museum donations and gems.',
    goldPerDay: null,
    recommendation: 'process-at-clint',
    tier: 'utility',
    bestUse: 'Museum artifacts, gems'
  },
  'frozen-geode': {
    proTip: 'Found in Mines floors 41-79. Blue geode.',
    strategyNote: 'Contains ice-themed minerals. Process all for Museum and Frozen Tears.',
    goldPerDay: null,
    recommendation: 'process-at-clint',
    tier: 'utility',
    bestUse: 'Museum artifacts, Frozen Tear'
  },
  'magma-geode': {
    proTip: 'Found in Mines floors 81-119 and Volcano. Red geode.',
    strategyNote: 'Contains fire-themed minerals and Fire Quartz. Best regular geode for value.',
    goldPerDay: null,
    recommendation: 'process-at-clint',
    tier: 'mid',
    bestUse: 'Museum artifacts, Fire Quartz'
  },
  'omni-geode': {
    proTip: 'Found everywhere, especially Skull Cavern. Can contain any mineral.',
    strategyNote: 'Best geode type - can drop any mineral including Prismatic Shard. Process all at Clint.',
    goldPerDay: null,
    recommendation: 'process-at-clint',
    tier: 'high',
    bestUse: 'Prismatic Shard chance, all minerals'
  },
  'golden-pumpkin': {
    proTip: 'Win at Spirit Eve maze (Fall 27). One per year.',
    strategyNote: '2,500g base. Universal loved gift. Best uses: gift to hard-to-please NPCs or sell for gold.',
    goldPerDay: null,
    recommendation: 'gift-or-sell',
    tier: 'premium',
    bestUse: 'Universal loved gift, festival reward'
  },
  'pearl': {
    proTip: 'Rare from Night Market Mermaid show or Blobfish Fish Pond.',
    strategyNote: '2,500g base. Universal loved gift. Very rare. Save for difficult gift situations.',
    goldPerDay: null,
    recommendation: 'gift',
    tier: 'legendary',
    bestUse: 'Universal loved gift'
  },
  'strange-bun': {
    proTip: 'Cook from Wheat Flour (1) + Periwinkle (1) + Void Mayonnaise (1). Recipe from Shane 7 hearts.',
    strategyNote: 'Gives Mining +1 buff. Strange recipe but useful buff. Shane loves it.',
    goldPerDay: null,
    recommendation: 'shane-gift',
    tier: 'mid',
    bestUse: 'Shane loved gift, mining buff'
  },
  'fried-egg': {
    proTip: 'Cook from Egg (1). First recipe you learn.',
    strategyNote: '35g sale price. +50 Energy, +22 Health. Early game energy food. Quick to make.',
    goldPerDay: null,
    recommendation: 'eat',
    tier: 'low',
    bestUse: 'Early game energy food'
  },
  'crab-cakes': {
    proTip: 'Cook from Crab (1) + Wheat Flour (1) + Egg (1) + Oil (1). Recipe from Gus for 500g.',
    strategyNote: '275g sale price. +Speed +1 buff. One of few foods with Speed buff. Excellent for mobility.',
    goldPerDay: null,
    recommendation: 'speed-buff',
    tier: 'high',
    bestUse: 'Speed buff food'
  },
  'dish-o-the-sea': {
    proTip: 'Cook from Sardine (2) + Hashbrowns (1). Recipe from Fishing Level 3.',
    strategyNote: '220g sale price. +Fishing +3 buff. Best early-game fishing buff food. Make before Legend attempts.',
    goldPerDay: null,
    recommendation: 'fishing-buff',
    tier: 'high',
    bestUse: 'Fishing buff for hard catches'
  },
  'pumpkin-pie': {
    proTip: 'Cook from Pumpkin (1) + Wheat Flour (1) + Milk (1) + Sugar (1). Recipe from Queen of Sauce.',
    strategyNote: '385g sale price. Universally liked gift. Solid energy food (+225 Energy).',
    goldPerDay: null,
    recommendation: 'gift-or-eat',
    tier: 'mid',
    bestUse: 'Universal liked gift, energy food'
  },
  'qi-fruit': {
    proTip: 'Grows from Qi Beans during Mr. Qi quests. 4-day growth.',
    strategyNote: '1g sale price (worthless). Used only during Qi quests. Process into wine for quest completion.',
    goldPerDay: null,
    recommendation: 'qi-quest',
    tier: 'quest',
    bestUse: 'Mr. Qi quest completion'
  }
};

// 合并策略
Object.assign(data.strategies, newStrategies);
data.lastUpdated = '2025-12-11';

// 写入文件
fs.writeFileSync(strategiesPath, JSON.stringify(data, null, 2));

console.log('策略已添加!');
console.log('新增策略数:', Object.keys(newStrategies).length);
console.log('总策略数:', Object.keys(data.strategies).length);
