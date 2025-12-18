import Link from 'next/link';

export const metadata = {
  title: 'Ancient Fruit Guide: From Seed to Millions - Stardew Valley 1.6',
  description: 'Complete Ancient Fruit strategy guide. How to get Ancient Seeds, greenhouse setup, Keg processing, and realistic income projections with actual numbers.',
  alternates: {
    canonical: '/guide/ancient-fruit',
  },
  openGraph: {
    title: 'Ancient Fruit: The Ultimate Money Guide - Stardew Valley 1.6',
    description: 'From first seed to greenhouse empire. Complete Ancient Fruit strategy with verified numbers.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/ancient-fruit#article',
      headline: 'Ancient Fruit: The Ultimate Money Making Guide',
      description: 'Complete Ancient Fruit strategy from first seed to 10+ million gold per year.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-01-14',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/ancient-fruit'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Ancient Fruit' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do you get Ancient Seeds in Stardew Valley?',
          acceptedAnswer: { '@type': 'Answer', text: 'Find Ancient Seed artifact from digging (0.7%), fishing treasure (0.9%), or bug drops (0.5%). Donate to Museum for plantable seeds + crafting recipe. Seed Maker also has 0.5% chance to produce Ancient Seeds from any crop.' }
        },
        {
          '@type': 'Question',
          name: 'How much money can Ancient Fruit make?',
          acceptedAnswer: { '@type': 'Answer', text: 'A full greenhouse (116 Ancient Fruit) produces ~267,960g per week as Wine with Artisan profession. That\'s approximately 13.9 million gold per year.' }
        },
        {
          '@type': 'Question',
          name: 'How many Kegs do I need for Ancient Fruit?',
          acceptedAnswer: { '@type': 'Answer', text: 'For 116 Ancient Fruit plants (full greenhouse), you need 116 Kegs to process weekly harvests immediately. Each Keg requires 30 Wood, 1 Copper Bar, 1 Iron Bar, and 1 Oak Resin.' }
        },
        {
          '@type': 'Question',
          name: 'Should I use Ancient Fruit or Starfruit?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ancient Fruit is better for the Greenhouse because it regrows forever (no replanting). Starfruit Wine sells for more (3,150g vs 2,310g with Artisan) but requires replanting every 13 days.' }
        }
      ]
    },
    {
      '@type': 'HowTo',
      name: 'How to Build an Ancient Fruit Empire',
      description: 'Step-by-step guide to maximize Ancient Fruit income',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Get First Seed', text: 'Find Ancient Seed artifact and donate to Museum for plantable seeds and crafting recipe' },
        { '@type': 'HowToStep', position: 2, name: 'Multiply Seeds', text: 'Use Seed Maker on harvested Ancient Fruits to get 1-3 seeds per fruit' },
        { '@type': 'HowToStep', position: 3, name: 'Fill Greenhouse', text: 'Plant all seeds in Greenhouse (116 slots) for year-round production' },
        { '@type': 'HowToStep', position: 4, name: 'Build Kegs', text: 'Construct 100+ Kegs to process all fruits into Wine' },
        { '@type': 'HowToStep', position: 5, name: 'Get Artisan', text: 'Choose Artisan profession at Farming Level 10 for +40% Wine value' }
      ]
    }
  ]
};

// Seed acquisition methods data
const seedMethods = [
  { method: 'Artifact Spot (Digging)', details: 'Dig worm tiles on farm, forest, mountains', probability: '0.7% chance' },
  { method: 'Fishing Treasure Chest', details: 'Random treasure while fishing', probability: '0.9% chance' },
  { method: 'Monsters (Bugs, Grubs)', details: 'Kill bugs in the mines (floors 1-29)', probability: '0.5% drop' },
  { method: 'Seed Maker', details: 'Put ANY crop in Seed Maker', probability: '0.5% Ancient Seed', highlight: true },
  { method: 'Traveling Cart', details: 'Random stock, Fridays & Sundays', probability: '~1.26% to appear' },
];

// Seed multiplication data
const seedMultiplication = [
  { harvest: 'Start', fruits: '-', seeds: '1', total: '1' },
  { harvest: '1st', fruits: '1', seeds: '2', total: '3' },
  { harvest: '2nd', fruits: '3', seeds: '6', total: '9' },
  { harvest: '3rd', fruits: '9', seeds: '18', total: '27' },
  { harvest: '4th', fruits: '27', seeds: '54', total: '81' },
  { harvest: '5th', fruits: '81', seeds: '162', total: 'Full Greenhouse (116)', highlight: true },
];

// Wine aging data
const wineAging = [
  { quality: 'Normal', days: '0', baseValue: '1,650g', artisanValue: '2,310g' },
  { quality: 'Silver ⭐', days: '14', baseValue: '2,062g', artisanValue: '2,887g' },
  { quality: 'Gold ⭐⭐', days: '28', baseValue: '2,475g', artisanValue: '3,465g' },
  { quality: 'Iridium ⭐⭐⭐', days: '56', baseValue: '3,300g', artisanValue: '4,620g', highlight: true },
];

export default function AncientFruitGuide() {
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
          <span className="text-slate-800 font-medium">Ancient Fruit</span>
        </nav>

        {/* Hero Section with Purple Gradient */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🍇 Ancient Fruit: The Ultimate Money Making Guide
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl">
            Plant once, harvest forever, process into wine worth 2,310g each. Here&apos;s how to build a 10+ million gold empire from a single seed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ Full Greenhouse Guide
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ Keg Math Included
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ v1.6 Verified
            </span>
          </div>
        </div>

        {/* Key Numbers Box */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            📊 Key Numbers at a Glance
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600">550g</div>
              <div className="text-sm text-slate-600">Base Sell Price</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600">2,310g</div>
              <div className="text-sm text-slate-600">Wine (Artisan)</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600">7 days</div>
              <div className="text-sm text-slate-600">Regrowth Time</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600">~13.9M</div>
              <div className="text-sm text-slate-600">Annual Income</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#getting-seeds" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🌱 Getting Seeds
          </a>
          <a href="#multiplication" className="bg-violet-100 hover:bg-violet-200 text-violet-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            📈 Multiplication
          </a>
          <a href="#greenhouse" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🏠 Greenhouse Setup
          </a>
          <a href="#kegs" className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🍷 Keg Setup
          </a>
          <a href="#timeline" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            📅 Timeline
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Step 1: Getting Seeds */}
          <h2 id="getting-seeds" className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            🌱 Step 1: Getting Your First Ancient Seed
          </h2>

          <p>
            Ancient Seeds are rare. Here are all the ways to get your first one:
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Method</th>
                  <th className="px-4 py-4 text-left font-semibold">Details</th>
                  <th className="px-4 py-4 text-left font-semibold">Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {seedMethods.map((item, index) => (
                  <tr key={index} className={`${item.highlight ? 'bg-green-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className="px-4 py-3 font-medium">{item.method}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{item.details}</td>
                    <td className="px-4 py-3 font-semibold text-purple-600">{item.probability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-green-900 text-lg mb-2">💡 Pro Tip: Seed Maker Trick</p>
            <p className="text-green-800">
              Once you have the <Link href="/item/seed-maker" className="underline font-medium">Seed Maker</Link>, process cheap crops (like Wheat) repeatedly. Every crop has a 0.5% chance to give Ancient Seeds. Mass processing 200 Wheat gives you roughly 1 Ancient Seed on average.
            </p>
          </div>

          {/* Step 2: Donate First */}
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            🏛️ Step 2: Donate First, Plant Second
          </h2>

          <p>
            When you find your first Ancient Seed artifact, <strong>donate it to the Museum</strong>. Gunther rewards you with:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-5 shadow-md">
              <div className="text-2xl mb-2">🌱</div>
              <h3 className="font-bold text-purple-800">1 Plantable Ancient Seeds Packet</h3>
              <p className="text-sm text-slate-600 mt-2">Ready to plant immediately in any season except Winter</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 shadow-md">
              <div className="text-2xl mb-2">📜</div>
              <h3 className="font-bold text-amber-800">Ancient Seeds Crafting Recipe</h3>
              <p className="text-sm text-slate-600 mt-2">Turn any Ancient Fruit into 1-3 plantable seeds using Seed Maker</p>
            </div>
          </div>

          {/* Step 3: First Harvest */}
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            ⏰ Step 3: The First Harvest Cycle
          </h2>

          <p>
            Your first Ancient Fruit plant follows this timeline:
          </p>

          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-4">
                <span className="bg-purple-500 px-3 py-1 rounded-full font-bold">Day 1</span>
                <span>Plant Ancient Seeds</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-purple-500 px-3 py-1 rounded-full font-bold">Day 28</span>
                <span>First harvest (1 Ancient Fruit) 🍇</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-violet-500 px-3 py-1 rounded-full font-bold">Day 35</span>
                <span>Second harvest</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-violet-500 px-3 py-1 rounded-full font-bold">Day 42</span>
                <span>Third harvest</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-indigo-500 px-3 py-1 rounded-full font-bold">Day 49+</span>
                <span>...continues every 7 days forever ♾️</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-red-900 text-lg mb-2">⚠️ Critical Decision</p>
            <p className="text-red-800">
              Do NOT sell or Keg your first few Ancient Fruits. Put them in the Seed Maker to multiply your seeds. Building inventory first = exponential growth later.
            </p>
          </div>

          {/* Step 4: Multiplication */}
          <h2 id="multiplication" className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            📈 Step 4: Seed Multiplication Math
          </h2>

          <p>
            The Seed Maker returns 1-3 seeds per fruit (average 2). Here&apos;s realistic scaling:
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Harvest #</th>
                  <th className="px-4 py-4 text-left font-semibold">Fruits</th>
                  <th className="px-4 py-4 text-left font-semibold">→ Seeds (avg)</th>
                  <th className="px-4 py-4 text-left font-semibold">Total Plants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {seedMultiplication.map((row, index) => (
                  <tr key={index} className={`${row.highlight ? 'bg-green-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className="px-4 py-3 font-medium">{row.harvest}</td>
                    <td className="px-4 py-3">{row.fruits}</td>
                    <td className="px-4 py-3">{row.seeds}</td>
                    <td className={`px-4 py-3 ${row.highlight ? 'font-bold text-green-600' : ''}`}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            From 1 seed to full <Link href="/guide/greenhouse-layout">greenhouse</Link> takes about 35 days of growth + 5 harvest cycles = roughly 2 seasons if planted in Spring Year 1.
          </p>

          {/* Step 5: Greenhouse Setup */}
          <h2 id="greenhouse" className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-3">
            🏠 Step 5: Greenhouse Setup
          </h2>

          <p>
            The <Link href="/guide/greenhouse-layout">Greenhouse</Link> has 120 plantable tiles (116 if using sprinklers efficiently). Once filled with Ancient Fruit:
          </p>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">💰 Full Greenhouse Income (116 Plants)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Harvest frequency:</span>
                  <span className="font-semibold">Every 7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Fruits per week:</span>
                  <span className="font-semibold">116</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Raw sell (weekly):</span>
                  <span className="font-semibold">63,800g</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Wine (base):</span>
                  <span className="font-semibold">191,400g/week</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                  <span className="text-purple-300 font-medium">Wine (Artisan):</span>
                  <span className="font-bold text-green-400 text-xl">267,960g/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-300 font-medium">Annual income:</span>
                  <span className="font-bold text-yellow-400 text-xl">~13.9 million gold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6: Keg Infrastructure */}
          <h2 id="kegs" className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-3">
            🍷 Step 6: Keg Infrastructure
          </h2>

          <p>
            Wine takes 7 days to process. Coincidentally, Ancient Fruit regrows every 7 days. Perfect match? Not quite.
          </p>

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-amber-900 text-lg mb-2">⚠️ Keg Math</p>
            <p className="text-amber-800">
              116 Ancient Fruits per week ÷ 1 <Link href="/guide/keg-vs-jar" className="underline font-medium">Keg</Link> cycle (7 days) = <strong>116 Kegs needed</strong> to process everything immediately.
            </p>
            <div className="bg-white/50 rounded-lg p-4 mt-4 text-sm">
              <p className="font-semibold text-amber-900 mb-2">Building 116 Kegs requires:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-amber-800">
                <span>🪵 3,480 Wood</span>
                <span>🔶 116 Copper Bars</span>
                <span>⬛ 116 Iron Bars</span>
                <span>🌳 116 Oak Resin</span>
              </div>
            </div>
          </div>

          <p>
            <strong>Oak Resin is the bottleneck.</strong> Each Tapper produces 1 Oak Resin every 7-8 days. Plan ahead: tap Oak Trees in Year 1 while building your Ancient Fruit stock.
          </p>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-slate-800 text-lg mb-4">📍 Keg Placement Locations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm font-semibold">Tunnel</span>
                <span className="text-slate-600 text-sm">~40 Kegs (free, no building needed)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm font-semibold">Quarry</span>
                <span className="text-slate-600 text-sm">~120 Kegs</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm font-semibold">Big Shed</span>
                <span className="text-slate-600 text-sm">67 Kegs per shed</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-semibold">Cellar</span>
                <span className="text-slate-600 text-sm">Save for Casks (aging wine)</span>
              </div>
            </div>
          </div>

          {/* Cask Aging */}
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            🏆 Cask Aging (Bonus Value)
          </h2>

          <p>
            The Cellar holds 189 Casks. Wine ages through 4 quality levels:
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Quality</th>
                  <th className="px-4 py-4 text-left font-semibold">Days</th>
                  <th className="px-4 py-4 text-left font-semibold">Base Value</th>
                  <th className="px-4 py-4 text-left font-semibold">With Artisan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {wineAging.map((row, index) => (
                  <tr key={index} className={`${row.highlight ? 'bg-purple-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.highlight ? 'font-bold' : ''}`}>{row.quality}</td>
                    <td className="px-4 py-3">{row.days}</td>
                    <td className="px-4 py-3">{row.baseValue}</td>
                    <td className={`px-4 py-3 ${row.highlight ? 'font-bold text-purple-600' : ''}`}>{row.artisanValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            189 Casks × 4,620g = <strong>873,180g every 56 days</strong> (~6.2 million annually). Add this to your Keg production for maximum profit.
          </p>

          {/* Timeline */}
          <h2 id="timeline" className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3">
            📅 Complete Timeline: Year 1 to Empire
          </h2>

          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 my-8 not-prose shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Realistic Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Spring Y1</span>
                <p className="text-slate-700">Find/buy Ancient Seed. Donate to Museum. Plant on Day 1. Tap all Oak Trees you find.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Summer Y1</span>
                <p className="text-slate-700">First harvest Day 28. Seed Maker everything. You should have 9-27 plants by end of Summer.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Fall Y1</span>
                <p className="text-slate-700">Continue multiplying. Build first Kegs with Oak Resin. Work on <Link href="/guide/community-center" className="underline">Greenhouse bundles</Link>.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Winter Y1</span>
                <p className="text-slate-700">Complete Greenhouse. Transplant all Ancient Fruit inside. Start Kegging surplus.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Year 2</span>
                <p className="text-slate-700">Full Greenhouse producing 116 fruits/week. Build more Kegs. Get Artisan profession. Income: 50k-200k/week.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">Year 3+</span>
                <p className="text-slate-700">100+ Kegs, Cellar aging, <strong>10+ million annual</strong>. You&apos;ve won! 🎉</p>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⚠️ Common Mistakes to Avoid</h2>

          <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-red-900 text-lg mb-4">❌ Don&apos;t</h3>
              <ul className="text-red-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Sell your first Ancient Fruits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Plant Ancient Seeds outdoors in Winter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Forget to water (use Iridium Sprinklers!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Neglect Oak Resin collection early</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-900 text-lg mb-4">✓ Do</h3>
              <ul className="text-green-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Seed Maker all fruits until greenhouse is full</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Use Iridium Sprinklers (never miss a day)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Start tapping Oaks ASAP for Kegs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Get Artisan profession at Level 10 Farming</span>
                </li>
              </ul>
            </div>
          </div>

          {/* TL;DR Summary */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🎯 TL;DR Summary</h2>

          <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                <span>Get Ancient Seed → Donate to Museum → Get plantable seed + recipe</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                <span>Plant and multiply using Seed Maker (don&apos;t sell!)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                <span>Fill <Link href="/guide/greenhouse-layout" className="text-purple-300 hover:underline">Greenhouse</Link> (116 slots) with Ancient Fruit</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                <span>Build 100+ <Link href="/guide/keg-vs-jar" className="text-purple-300 hover:underline">Kegs</Link>, process into Wine</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">5</span>
                <span>Get Artisan profession (+40% to Wine)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">6</span>
                <span>Age Wine in Cellar Casks for +100% value</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-green-400 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-green-900">7</span>
                <span className="text-green-300 font-semibold">Profit: 10-15 million gold per year 💰</span>
              </li>
            </ol>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/greenhouse-layout" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🏠 Greenhouse Layout</div>
                <p className="text-sm text-slate-600 mt-1">Maximize your 116 tiles</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar Guide</div>
                <p className="text-sm text-slate-600 mt-1">Processing math explained</p>
              </Link>
              <Link href="/guide/most-profitable-crops" className="block bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-emerald-800">🌾 Profitable Crops</div>
                <p className="text-sm text-slate-600 mt-1">All seasons compared</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">💰 Year 1 Money</div>
                <p className="text-sm text-slate-600 mt-1">Early game strategies</p>
              </Link>
              <Link href="/guide/community-center" className="block bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-rose-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Unlock the Greenhouse</p>
              </Link>
              <Link href="/item/ancient-fruit" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">🍇 Ancient Fruit Item</div>
                <p className="text-sm text-slate-600 mt-1">Full item data & prices</p>
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
