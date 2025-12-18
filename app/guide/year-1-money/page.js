import Link from 'next/link';

export const metadata = {
  title: 'Year 1 Money Making Guide - Stardew Valley 1.6',
  description: 'Realistic Year 1 money strategies for Stardew Valley. Season-by-season breakdown of crops, fishing, foraging, and mining to maximize your first year income.',
  alternates: {
    canonical: '/guide/year-1-money',
  },
  openGraph: {
    title: 'Year 1 Money Making Guide - Stardew Valley 1.6',
    description: 'Realistic strategies to reach 100k+ in Year 1 without exploits.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/year-1-money#article',
      headline: 'Year 1 Money Making Guide: Realistic Strategies',
      description: 'Season-by-season breakdown to maximize your first year income in Stardew Valley.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-01-14',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/year-1-money'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Year 1 Money' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much money can you make in Year 1 of Stardew Valley?',
          acceptedAnswer: { '@type': 'Answer', text: 'Realistic target: 100,000-200,000g. Optimized play: 300,000-500,000g. This requires balancing farming, fishing, mining, and foraging throughout all four seasons.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best crop for Year 1 Spring?',
          acceptedAnswer: { '@type': 'Answer', text: 'Potatoes until Day 13, then Strawberries from the Egg Festival. Strawberries offer ~21g/day and can be harvested twice before Spring ends.' }
        },
        {
          '@type': 'Question',
          name: 'Should I fish in Year 1?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes! Fishing is overpowered early game. Catfish (200g) on rainy days and Legend (5,000g) in Spring with Fishing Level 10 can provide significant income when crops are limited.' }
        },
        {
          '@type': 'Question',
          name: 'What should I have by end of Year 1?',
          acceptedAnswer: { '@type': 'Answer', text: 'Target: 100k+ gold earned, Large Backpack, Copper/Steel tools, 20+ Quality Sprinklers, Coop with chickens, Greenhouse unlocked, Oak Trees tapped for Kegs, and Strawberry Seeds saved for Year 2.' }
        }
      ]
    }
  ]
};

// Income pillars data
const incomePillars = [
  { icon: '🌱', title: 'Farming', pct: '40-50%', desc: 'Primary income source. Scales with plot size and crop choice.', color: 'from-green-500 to-emerald-600' },
  { icon: '🎣', title: 'Fishing', pct: '20-30%', desc: 'Best early game gold. Catfish and Legend are huge windfalls.', color: 'from-blue-500 to-cyan-600' },
  { icon: '⛏️', title: 'Mining', pct: '10-20%', desc: 'Gems and ore. Also needed for tool upgrades and crafting.', color: 'from-amber-500 to-orange-600' },
  { icon: '🍃', title: 'Foraging', pct: '5-10%', desc: 'Free items around the map. Salmonberries and Blackberries are great.', color: 'from-purple-500 to-violet-600' },
];

// Spring fishing data
const springFish = [
  { fish: 'Legend', location: 'Mountain Lake', conditions: 'Rain, Fishing 10', price: '5,000g', legendary: true },
  { fish: 'Catfish', location: 'River (Town/Forest)', conditions: 'Rain', price: '200g' },
  { fish: 'Eel', location: 'Ocean', conditions: 'Rain, 4pm-2am', price: '85g' },
  { fish: 'Largemouth Bass', location: 'Mountain Lake', conditions: 'Any', price: '100g' },
];

// Summer crops data  
const summerCrops = [
  { crop: 'Blueberry', seed: '80g', sell: '50g × 3', harvests: '4', profit: '520g', best: true },
  { crop: 'Melon', seed: '80g', sell: '250g', harvests: '2', profit: '420g' },
  { crop: 'Red Cabbage', seed: '100g', sell: '260g', harvests: '3', profit: '680g' },
  { crop: 'Starfruit*', seed: '400g', sell: '750g', harvests: '2', profit: '1,100g' },
];

// Fall crops data
const fallCrops = [
  { crop: 'Cranberry', seed: '240g', sell: '75g × 2', harvests: '5', profit: '510g', best: true },
  { crop: 'Pumpkin', seed: '100g', sell: '320g', harvests: '2', profit: '540g', best: true },
  { crop: 'Artichoke', seed: '30g', sell: '160g', harvests: '3', profit: '450g' },
  { crop: 'Grape', seed: '60g', sell: '80g', harvests: '7', profit: '500g' },
];

// Winter fish data
const winterFish = [
  { fish: 'Glacierfish', location: 'Arrowhead Island', price: '1,000g', notes: 'Legendary, Fishing 6', legendary: true },
  { fish: 'Sturgeon', location: 'Mountain Lake', price: '200g', notes: 'Save for Fish Pond!' },
  { fish: 'Squid', location: 'Ocean (night)', price: '80g', notes: 'Common, good for bundles' },
  { fish: 'Lingcod', location: 'River/Mountain', price: '120g', notes: 'Decent value' },
];

export default function Year1MoneyGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-slate-700">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Year 1 Money</span>
        </nav>

        {/* Hero Section with Gold Gradient */}
        <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            💰 Year 1 Money Making Guide
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-3xl">
            No exploits, no lucky RNG required. Here&apos;s how to build a solid financial foundation in your first year of Stardew Valley.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ Realistic Targets
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ Season-by-Season
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ v1.6 Verified
            </span>
          </div>
        </div>

        {/* Year 1 Goals Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            🎯 Year 1 Income Goals
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-sm text-slate-500 mb-1">Realistic</div>
              <div className="text-2xl font-bold text-emerald-600">100k-200k</div>
              <div className="text-xs text-slate-400">gold by Winter 28</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-sm text-slate-500 mb-1">Optimized</div>
              <div className="text-2xl font-bold text-amber-600">300k-500k</div>
              <div className="text-xs text-slate-400">with focused play</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-sm text-slate-500 mb-1">Key Milestones</div>
              <div className="text-sm font-medium text-slate-700">Backpack, Coop, Barn, Quality Sprinklers</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#spring" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🌸 Spring
          </a>
          <a href="#summer" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ☀️ Summer
          </a>
          <a href="#fall" className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🍂 Fall
          </a>
          <a href="#winter" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ❄️ Winter
          </a>
          <a href="#checklist" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ✅ Checklist
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Four Pillars */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            📊 The Four Pillars of Year 1 Income
          </h2>

          <p>
            Your income in Year 1 comes from four sources. Balance all four for best results:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
            {incomePillars.map((pillar, index) => (
              <div key={index} className={`bg-gradient-to-br ${pillar.color} rounded-xl p-5 text-white shadow-lg`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{pillar.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{pillar.title}</h3>
                    <span className="text-white/80 text-sm">{pillar.pct} of income</span>
                  </div>
                </div>
                <p className="text-white/90 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Spring Section */}
          <h2 id="spring" className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-3">
            🌸 Spring Year 1: Foundation Building
          </h2>

          <p>
            Spring is about learning mechanics and building momentum. Don&apos;t try to optimize everything—survival comes first.
          </p>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 my-6 not-prose border border-green-200">
            <h3 className="font-bold text-green-800 text-lg mb-4">📅 Spring Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Days 1-4</span>
                <p className="text-green-800">Plant Parsnips (free seeds), clear farm, fish when energy is low</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Days 5-12</span>
                <p className="text-green-800">Buy <Link href="/item/potato" className="underline font-medium">Potato</Link> seeds (80g sell). Fish on rainy days for <Link href="/fishing/catfish" className="underline font-medium">Catfish</Link> (200g)</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Day 13</span>
                <p className="text-green-800"><strong>EGG FESTIVAL</strong> - Buy <Link href="/item/strawberry" className="underline font-medium">Strawberry Seeds</Link> (100g each). Buy as many as you can afford!</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Days 14-28</span>
                <p className="text-green-800">Plant Strawberries. They&apos;ll harvest twice before Spring ends.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-5 my-6 not-prose shadow-lg">
            <h3 className="font-bold text-lg mb-2">💰 Spring Income Targets</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">10-15k</div>
                <div className="text-green-100 text-sm">Casual</div>
              </div>
              <div>
                <div className="text-2xl font-bold">20-30k</div>
                <div className="text-green-100 text-sm">Focused</div>
              </div>
              <div>
                <div className="text-2xl font-bold">40k+</div>
                <div className="text-green-100 text-sm">Fishing Heavy</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-blue-700 mt-8 mb-4">🎣 Spring Fishing Strategy</h3>

          <p>
            <Link href="/fishing">Fishing</Link> is overpowered in early game. High-value fish available in Spring:
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Fish</th>
                  <th className="px-4 py-3 text-left font-semibold">Location</th>
                  <th className="px-4 py-3 text-left font-semibold">Conditions</th>
                  <th className="px-4 py-3 text-left font-semibold">Base Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {springFish.map((row, i) => (
                  <tr key={i} className={`${row.legendary ? 'bg-yellow-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.legendary ? 'font-bold' : 'font-medium'}`}>{row.fish}</td>
                    <td className="px-4 py-3 text-slate-600">{row.location}</td>
                    <td className="px-4 py-3 text-slate-600">{row.conditions}</td>
                    <td className={`px-4 py-3 ${row.legendary ? 'font-bold text-amber-600' : ''}`}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summer Section */}
          <h2 id="summer" className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-3">
            ☀️ Summer Year 1: Scaling Up
          </h2>

          <p>
            Summer is where farming takes off. You should have enough gold now for proper <Link href="/guide/most-profitable-crops">profitable crops</Link>.
          </p>

          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 my-6 not-prose border border-yellow-200">
            <h3 className="font-bold text-amber-800 text-lg mb-4">☀️ Summer Priorities</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                <span className="text-amber-800">Plant <Link href="/item/blueberry" className="underline font-medium">Blueberries</Link> on Day 1 (80g seeds, 150g × 3 harvest = massive profit)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                <span className="text-amber-800">Get Quality Sprinklers ASAP (unlock at Farming 6, need Gold + Iron + Quartz)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                <span className="text-amber-800">Build first Coop → Chicken → Eggs (not huge money, but steady)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                <span className="text-amber-800">Tap Oak Trees for Oak Resin (needed for <Link href="/guide/keg-vs-jar" className="underline font-medium">Kegs</Link> later)</span>
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Crop</th>
                  <th className="px-4 py-3 text-left font-semibold">Seed Cost</th>
                  <th className="px-4 py-3 text-left font-semibold">Sell Price</th>
                  <th className="px-4 py-3 text-left font-semibold">Harvests</th>
                  <th className="px-4 py-3 text-left font-semibold">Profit/Seed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {summerCrops.map((row, i) => (
                  <tr key={i} className={`${row.best ? 'bg-yellow-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.best ? 'font-bold' : 'font-medium'}`}>{row.crop}</td>
                    <td className="px-4 py-3">{row.seed}</td>
                    <td className="px-4 py-3">{row.sell}</td>
                    <td className="px-4 py-3">{row.harvests}</td>
                    <td className={`px-4 py-3 font-bold ${row.best ? 'text-green-600' : ''}`}>{row.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-2">*<Link href="/item/starfruit" className="underline">Starfruit</Link> seeds only at Oasis (Desert). Requires Bus Repair (<Link href="/guide/community-center" className="underline">42,500g Vault bundle</Link>).</p>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-red-900 text-lg mb-2">⚠️ Common Summer Mistake</p>
            <p className="text-red-800">
              Don&apos;t plant Corn expecting huge profits. Corn has low gold-per-day (50g for 14-day initial growth). It&apos;s useful for Fall carryover, but Blueberries are far better for Summer-only profit.
            </p>
          </div>

          <h3 className="text-xl font-bold text-amber-700 mt-8 mb-4">⛏️ Mining in Summer</h3>

          <p>
            Summer has fewer rainy days, so less optimal fishing. Use this time for <Link href="/guide/mining-profit">mining</Link>:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
            <div className="bg-white border-2 border-amber-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold text-amber-800">Goal</div>
              <div className="text-sm text-slate-600">Reach Floor 80+ for Gold Ore</div>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="font-bold text-amber-800">Gem Sales</div>
              <div className="text-sm text-slate-600">Diamonds (750g), Rubies (250g)</div>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🍀</div>
              <div className="font-bold text-amber-800">Lucky Days</div>
              <div className="text-sm text-slate-600">Check TV fortune teller</div>
            </div>
          </div>

          {/* Fall Section */}
          <h2 id="fall" className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-3">
            🍂 Fall Year 1: Peak Profit Season
          </h2>

          <p>
            Fall has the best crops in the game. This is where you make most of your Year 1 money.
          </p>

          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-6 my-6 not-prose border border-orange-200">
            <h3 className="font-bold text-orange-800 text-lg mb-4">🍂 Fall Crop Strategy</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Day 1</span>
                <p className="text-orange-800">Plant <Link href="/item/cranberries" className="underline font-medium">Cranberries</Link> (best regrowable) and <Link href="/item/pumpkin" className="underline font-medium">Pumpkins</Link> (highest single-harvest)</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Days 1-15</span>
                <p className="text-orange-800">Artichokes are underrated—160g sell, 30g seed, 8-day growth</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Rainy Days</span>
                <p className="text-orange-800">Fish for <Link href="/fishing/walleye" className="underline font-medium">Walleye</Link> (105g) and Super Cucumber (250g)</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">Day 16</span>
                <p className="text-orange-800">Spirit&apos;s Eve festival—free Golden Pumpkin (2,500g or keep)</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Crop</th>
                  <th className="px-4 py-3 text-left font-semibold">Seed Cost</th>
                  <th className="px-4 py-3 text-left font-semibold">Sell Price</th>
                  <th className="px-4 py-3 text-left font-semibold">Harvests</th>
                  <th className="px-4 py-3 text-left font-semibold">Profit/Seed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {fallCrops.map((row, i) => (
                  <tr key={i} className={`${row.best ? 'bg-orange-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.best ? 'font-bold' : 'font-medium'}`}>{row.crop}</td>
                    <td className="px-4 py-3">{row.seed}</td>
                    <td className="px-4 py-3">{row.sell}</td>
                    <td className="px-4 py-3">{row.harvests}</td>
                    <td className={`px-4 py-3 font-bold ${row.best ? 'text-green-600' : ''}`}>{row.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-5 my-6 not-prose shadow-lg">
            <h3 className="font-bold text-lg mb-2">💰 Fall Income Targets</h3>
            <ul className="space-y-1 text-orange-100">
              <li>• 100+ Cranberries + 50 Pumpkins = ~80,000g from crops alone</li>
              <li>• Add fishing, <Link href="/guide/foraging-profit" className="underline">foraging</Link>, gems = easily 100,000g+ in Fall</li>
            </ul>
          </div>

          {/* Winter Section */}
          <h2 id="winter" className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3">
            ❄️ Winter Year 1: Preparation Season
          </h2>

          <p>
            No crops grow outdoors in Winter. Focus on other income sources and preparing for Year 2.
          </p>

          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6 my-6 not-prose border border-blue-200">
            <h3 className="font-bold text-blue-800 text-lg mb-4">❄️ Winter Activities</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">⛏️</span>
                <span className="text-blue-800"><strong>Mining:</strong> Reach Floor 120. Stock up on Gold, Iridium if lucky. Prepare for <Link href="/guide/skull-cavern" className="underline font-medium">Skull Cavern</Link>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎣</span>
                <span className="text-blue-800"><strong>Fishing:</strong> Glacierfish (legendary, 1000g), <Link href="/fishing/sturgeon" className="underline font-medium">Sturgeon</Link> for <Link href="/guide/best-fish-pond" className="underline font-medium">Fish Pond</Link></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎪</span>
                <span className="text-blue-800"><strong>Night Market (Days 15-17):</strong> Buy Coffee Beans, rare seeds, catch Blob Fish</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🍃</span>
                <span className="text-blue-800"><strong>Foraging:</strong> Winter Root, Snow Yam, Crystal Fruit (all 100g+)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <span className="text-blue-800"><strong><Link href="/guide/greenhouse-layout" className="underline font-medium">Greenhouse</Link>:</strong> If unlocked, plant <Link href="/guide/ancient-fruit" className="underline font-medium">Ancient Fruit</Link> or Strawberries</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-blue-700 mt-8 mb-4">🎣 Winter Fishing Targets</h3>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Fish</th>
                  <th className="px-4 py-3 text-left font-semibold">Location</th>
                  <th className="px-4 py-3 text-left font-semibold">Price</th>
                  <th className="px-4 py-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {winterFish.map((row, i) => (
                  <tr key={i} className={`${row.legendary ? 'bg-yellow-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.legendary ? 'font-bold' : 'font-medium'}`}>{row.fish}</td>
                    <td className="px-4 py-3 text-slate-600">{row.location}</td>
                    <td className={`px-4 py-3 ${row.legendary ? 'font-bold text-amber-600' : ''}`}>{row.price}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Money Management */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            💡 Money Management Tips
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-900 text-lg mb-4">✓ Do</h3>
              <ul className="text-green-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Reinvest 50-70% of profits into seeds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Buy backpack upgrade early (2,000g → 12 slots)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Upgrade Watering Can Day 27/28 each season</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Keep 1-2 of each crop/fish for <Link href="/guide/community-center" className="underline font-medium">bundles</Link></span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Check Traveling Cart for rare items/seeds</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-red-900 text-lg mb-4">✗ Don&apos;t</h3>
              <ul className="text-red-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Buy expensive decorations Year 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Hoard items &quot;just in case&quot; (sell excess)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Ignore fishing because &quot;it&apos;s hard&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Rush <Link href="/guide/animal-profit" className="underline font-medium">animals</Link> before silos/feeders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Upgrade tools during busy planting days</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Year 1 Checklist */}
          <h2 id="checklist" className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            ✅ Year 1 Checklist
          </h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">🎯 By Winter 28, You Should Have:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>100,000-200,000g total earned</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>Large Backpack (36 slots)</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>Copper/Steel tools minimum</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>20+ Quality Sprinklers</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>Coop with 4 chickens</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>Barn with 1-2 cows (optional)</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span><Link href="/guide/greenhouse-layout" className="text-green-300 hover:underline">Greenhouse</Link> unlocked (ideally)</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>20+ Oak Trees tapped (for <Link href="/guide/keg-vs-jar" className="text-amber-300 hover:underline">Kegs</Link>)</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span>Strawberry Seeds saved for Spring Y2</span>
                </label>
                <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span><Link href="/guide/ancient-fruit" className="text-purple-300 hover:underline">Ancient Seed</Link> (if lucky)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Looking Ahead */}
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            🚀 Looking Ahead: Year 2
          </h2>

          <p>
            Year 2 is when things accelerate:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-xl p-5">
              <h4 className="font-bold text-green-800 mb-2">🌸 Spring Y2</h4>
              <p className="text-green-700 text-sm">Plant saved Strawberries Day 1, access to Rhubarb (Oasis)</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200 rounded-xl p-5">
              <h4 className="font-bold text-amber-800 mb-2">☀️ Summer Y2</h4>
              <p className="text-amber-700 text-sm"><Link href="/item/starfruit" className="underline">Starfruit</Link> becomes viable with Desert access</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-xl p-5">
              <h4 className="font-bold text-orange-800 mb-2">🍂 Fall Y2</h4>
              <p className="text-orange-700 text-sm">Rare Seed crops (Sweet Gem Berry = 3,000g!)</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 rounded-xl p-5">
              <h4 className="font-bold text-purple-800 mb-2">🍷 Processing</h4>
              <p className="text-purple-700 text-sm">Start <Link href="/guide/keg-vs-jar" className="underline">Keg empire</Link> with Year 1 Oak Resin stock</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <h3 className="font-bold text-lg mb-2">🎯 The Year 2 Leap</h3>
            <p className="text-purple-100">
              With a proper Year 1 foundation, Year 2 income can be <strong>5-10× higher</strong>. 
              A <Link href="/guide/greenhouse-layout" className="underline">Greenhouse</Link> full of <Link href="/guide/ancient-fruit" className="underline">Ancient Fruit</Link> + 50 Kegs = <strong>500,000g+ per season</strong>.
            </p>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/most-profitable-crops" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🌾 Profitable Crops</div>
                <p className="text-sm text-slate-600 mt-1">All seasons compared</p>
              </Link>
              <Link href="/guide/ancient-fruit" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">🍇 Ancient Fruit</div>
                <p className="text-sm text-slate-600 mt-1">Endgame money maker</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Processing guide</p>
              </Link>
              <Link href="/guide/community-center" className="block bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-rose-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Bundle completion</p>
              </Link>
              <Link href="/calculator/spring" className="block bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-emerald-800">🧮 Profit Calculator</div>
                <p className="text-sm text-slate-600 mt-1">Plan your crops</p>
              </Link>
              <Link href="/fishing" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">🎣 Fishing Guide</div>
                <p className="text-sm text-slate-600 mt-1">All fish & locations</p>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-8 mt-8 not-prose">
            <p className="text-sm text-slate-500">
              Last updated: June 2025 • Verified for Stardew Valley 1.6
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
