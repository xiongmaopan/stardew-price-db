import Link from 'next/link';

export const metadata = {
  title: 'Foraging Profit Guide - Best Items by Season | Stardew Valley 1.6',
  description: 'Complete foraging profit analysis. Seasonal items ranked by gold value, Botanist profession math, and efficient foraging routes. Game data verified.',
  alternates: {
    canonical: 'https://stardewpricedb.com/guide/foraging-profit/',
  },
  openGraph: {
    title: 'Foraging Profit Guide - Stardew Valley 1.6',
    description: 'Best foraging items by season. Botanist profession, efficient routes, and gold-per-item rankings.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/foraging-profit#article',
      headline: 'Foraging Profit Guide - Best Items by Season',
      description: 'Complete foraging profit analysis with seasonal rankings and efficient routes.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-12-17',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/foraging-profit'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Foraging Profit' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best foraging profession in Stardew Valley?',
          acceptedAnswer: { '@type': 'Answer', text: 'Gatherer → Botanist is the best path. Gatherer gives +20% double harvest chance, Botanist guarantees Iridium quality (2x value). Combined multiplier = 2.4x base value on average.' }
        },
        {
          '@type': 'Question',
          name: 'What is the most valuable foraged item?',
          acceptedAnswer: { '@type': 'Answer', text: 'Rainbow Shell (300g base, 600g Iridium) is the most valuable non-mushroom forage. Purple Mushroom (250g/500g Iridium) is highest from Mushroom Cave. For common foraging, Chanterelle (160g) and Morel (150g) in Secret Woods are best.' }
        },
        {
          '@type': 'Question',
          name: 'Does Botanist affect Truffles?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes! Botanist makes all Truffles Iridium quality (1,250g vs 625g base). Combined with Gatherer double chance, average Truffle value = ~1,500g each. This makes Pigs + Botanist extremely profitable.' }
        },
        {
          '@type': 'Question',
          name: 'Should I sell foraged items or process them?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most foraged items are best sold raw with Botanist. Exceptions: Grapes → Wine (240g), Wild Plum → Jelly (210g), and Truffles → Truffle Oil (1,065g, or sell raw Iridium 1,250g if Botanist).' }
        }
      ]
    }
  ]
};

// Seasonal foraging data
const springForage = [
  { item: 'Morel', base: '150g', iridium: '300g', location: 'Secret Woods', notes: 'Best spring forage', highlight: true },
  { item: 'Leek', base: '60g', iridium: '120g', location: 'Everywhere', notes: 'George loves it', highlight: false },
  { item: 'Spring Onion', base: '8g', iridium: '16g', location: 'Cindersap Forest', notes: 'Low value, respawns', highlight: false },
  { item: 'Wild Horseradish', base: '50g', iridium: '100g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Dandelion', base: '40g', iridium: '80g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Salmonberry', base: '5g', iridium: '10g', location: 'Bushes (Days 15-18)', notes: 'Mass quantity, energy food', highlight: false },
];

const summerForage = [
  { item: 'Rainbow Shell', base: '300g', iridium: '600g', location: 'Beach (random)', notes: 'Rare, check daily!', highlight: true },
  { item: 'Fiddlehead Fern', base: '90g', iridium: '180g', location: 'Secret Woods only', notes: 'Bundle item', highlight: false },
  { item: 'Grape', base: '80g', iridium: '160g', location: 'Everywhere', notes: 'Wine = 240g', highlight: false },
  { item: 'Spice Berry', base: '80g', iridium: '160g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Sweet Pea', base: '50g', iridium: '100g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Red Mushroom', base: '75g', iridium: '150g', location: 'Secret Woods', notes: 'Life Elixir ingredient', highlight: false },
];

const fallForage = [
  { item: 'Purple Mushroom', base: '250g', iridium: '500g', location: 'Mines 80+, Mushroom Cave', notes: 'Highest value mushroom', highlight: true },
  { item: 'Chanterelle', base: '160g', iridium: '320g', location: 'Secret Woods', notes: 'Best common fall forage', highlight: true },
  { item: 'Hazelnut', base: '90g', iridium: '180g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Wild Plum', base: '80g', iridium: '160g', location: 'Everywhere', notes: 'Jelly = 210g', highlight: false },
  { item: 'Common Mushroom', base: '40g', iridium: '80g', location: 'Secret Woods, Forest', notes: 'Bundle item', highlight: false },
  { item: 'Blackberry', base: '25g', iridium: '50g', location: 'Bushes (Days 8-11)', notes: 'Bundle item, mass pick', highlight: false },
];

const winterForage = [
  { item: 'Crystal Fruit', base: '150g', iridium: '300g', location: 'Everywhere', notes: 'Bundle item, best winter', highlight: true },
  { item: 'Nautilus Shell', base: '120g', iridium: '240g', location: 'Beach', notes: 'Best winter beach item', highlight: false },
  { item: 'Snow Yam', base: '100g', iridium: '200g', location: 'Dig spots (hoe)', notes: 'Bundle item', highlight: false },
  { item: 'Winter Root', base: '70g', iridium: '140g', location: 'Dig spots (hoe)', notes: 'Bundle item', highlight: false },
  { item: 'Crocus', base: '60g', iridium: '120g', location: 'Everywhere', notes: 'Bundle item', highlight: false },
  { item: 'Holly', base: '80g', iridium: '160g', location: 'Everywhere', notes: 'Universal hate gift!', highlight: false },
];

function ForageTable({ data, season, bgColor }) {
  const headerColors = {
    spring: 'bg-gradient-to-r from-green-500 to-emerald-500',
    summer: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    fall: 'bg-gradient-to-r from-orange-500 to-red-500',
    winter: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  };

  return (
    <div className="overflow-x-auto my-8 not-prose">
      <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
        <thead className={`${headerColors[season]} text-white`}>
          <tr>
            <th className="px-4 py-4 text-left font-semibold">Item</th>
            <th className="px-4 py-4 text-right font-semibold">Base</th>
            <th className="px-4 py-4 text-right font-semibold">Iridium</th>
            <th className="px-4 py-4 text-left font-semibold">Location</th>
            <th className="px-4 py-4 text-left font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((item, index) => (
            <tr key={index} className={`${item.highlight ? bgColor : ''} hover:bg-slate-50 transition-colors`}>
              <td className="px-4 py-3 font-semibold text-slate-800">{item.item}</td>
              <td className="px-4 py-3 text-right">{item.base}</td>
              <td className="px-4 py-3 text-right font-bold text-purple-600">{item.iridium}</td>
              <td className="px-4 py-3 text-sm">{item.location}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ForagingProfitGuide() {
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
          <span className="text-slate-800 font-medium">Foraging Profit</span>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              🌿 Free Money
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              v1.6 Verified
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🌿 Foraging Profit Guide
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl">
            Foraging is free money. No seeds, no watering, no waiting. This guide ranks every 
            foraged item by gold value and shows you where to find the best ones each season.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🍄 2.4x with Botanist
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🐷 Truffle synergy
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🗺️ Route optimization
            </span>
          </div>
        </div>

        {/* Key Stats Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            💰 Best Items by Season
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🌸</div>
              <p className="font-bold text-slate-800">Spring</p>
              <p className="text-lg font-bold text-green-600">Morel</p>
              <p className="text-xs text-slate-500 mt-1">150g → 300g Ir</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm text-center">
              <div className="text-3xl mb-2">☀️</div>
              <p className="font-bold text-slate-800">Summer</p>
              <p className="text-lg font-bold text-yellow-600">Rainbow Shell</p>
              <p className="text-xs text-slate-500 mt-1">300g → 600g Ir</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🍂</div>
              <p className="font-bold text-slate-800">Fall</p>
              <p className="text-lg font-bold text-orange-600">Purple Mushroom</p>
              <p className="text-xs text-slate-500 mt-1">250g → 500g Ir</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm text-center">
              <div className="text-3xl mb-2">❄️</div>
              <p className="font-bold text-slate-800">Winter</p>
              <p className="text-lg font-bold text-blue-600">Crystal Fruit</p>
              <p className="text-xs text-slate-500 mt-1">150g → 300g Ir</p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#profession" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ⭐ Profession Choice
          </a>
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
          <a href="#routes" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🗺️ Routes
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Profession Section */}
          <h2 id="profession" className="text-2xl font-bold text-purple-700 mb-4 pt-8 flex items-center gap-3">
            ⭐ Profession Choice: Botanist vs Gatherer
          </h2>

          <p>
            At Foraging Level 10, you choose between Botanist (Iridium quality) or Tracker. Here&apos;s the math:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">RECOMMENDED</span>
              </div>
              <h3 className="font-bold text-green-800 text-xl mb-3">Gatherer → Botanist Path</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Level 5:</strong> Gatherer (+20% double harvest chance)</p>
                <p><strong>Level 10:</strong> Botanist (All forage = Iridium quality)</p>
                <div className="bg-green-100 rounded-lg p-3 mt-3">
                  <p className="text-green-800 font-bold">Combined Multiplier: 2.4x base value!</p>
                  <p className="text-green-700 text-xs">1.2 (Gatherer avg) × 2 (Iridium) = 2.4x</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-bold">ALTERNATIVE</span>
              </div>
              <h3 className="font-bold text-slate-700 text-xl mb-3">Forester → Lumberjack Path</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Level 5:</strong> Forester (+25% wood from trees)</p>
                <p><strong>Level 10:</strong> Lumberjack (Hardwood from trees)</p>
                <div className="bg-slate-100 rounded-lg p-3 mt-3">
                  <p className="text-slate-800 font-bold">Only if you need massive wood/hardwood</p>
                  <p className="text-slate-700 text-xs">No profit bonus on foraged items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Truffle Bonus */}
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl p-6 my-8 not-prose shadow-md">
            <h3 className="font-bold text-amber-800 text-xl mb-3 flex items-center gap-2">
              🐷 Truffle Bonus!
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-slate-600">625g</div>
                <p className="text-sm text-slate-600">Base Truffle</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">1,250g</div>
                <p className="text-sm text-slate-600">Iridium (Botanist)</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">~1,500g</div>
                <p className="text-sm text-slate-600">Avg with Gatherer</p>
              </div>
            </div>
            <p className="text-amber-700 mt-4 text-sm">
              <strong>Pro Tip:</strong> With Botanist, selling raw Iridium Truffles (1,250g) beats Truffle Oil (1,065g)! 
              Only make Oil if you don&apos;t have Botanist or want Artisan bonus (1,491g Oil).
            </p>
          </div>

          {/* Spring Section */}
          <h2 id="spring" className="text-2xl font-bold text-green-700 mb-4 pt-8 flex items-center gap-3">
            🌸 Spring Foraging
          </h2>

          <ForageTable data={springForage} season="spring" bgColor="bg-green-50" />

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-green-800 text-lg mb-3">🌸 Spring Strategy</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span><strong>Days 1-14:</strong> Forage everything. Sell Leeks/Dandelions, save bundle items.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span><strong>Days 15-18:</strong> Salmonberry bushes. Pick 100+ for energy food.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span><strong>Secret Woods:</strong> Check daily for Morels (150g) - best spring item!</span>
              </li>
            </ul>
          </div>

          {/* Summer Section */}
          <h2 id="summer" className="text-2xl font-bold text-yellow-700 mb-4 pt-8 flex items-center gap-3">
            ☀️ Summer Foraging
          </h2>

          <ForageTable data={summerForage} season="summer" bgColor="bg-yellow-50" />

          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-yellow-800 text-lg mb-3">☀️ Summer Strategy</h3>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span><strong>Beach daily:</strong> Check for Rainbow Shell (300g!) - rare but valuable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span><strong>Secret Woods:</strong> Fiddlehead Fern for bundle (only spawns here in Summer).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span><strong>Grapes:</strong> Sell raw or keg into Wine (240g) if you have capacity.</span>
              </li>
            </ul>
          </div>

          {/* Fall Section */}
          <h2 id="fall" className="text-2xl font-bold text-orange-700 mb-4 pt-8 flex items-center gap-3">
            🍂 Fall Foraging
          </h2>

          <ForageTable data={fallForage} season="fall" bgColor="bg-orange-50" />

          <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-orange-800 text-lg mb-3">🍂 Fall Strategy</h3>
            <ul className="space-y-2 text-orange-800">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Mushroom Cave:</strong> If you chose it, harvest Purple Mushrooms (250g each!).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Days 8-11:</strong> Blackberry bushes - mass pick for bundles and jelly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Secret Woods:</strong> Chanterelle (160g) - best common fall item.</span>
              </li>
            </ul>
          </div>

          {/* Winter Section */}
          <h2 id="winter" className="text-2xl font-bold text-blue-700 mb-4 pt-8 flex items-center gap-3">
            ❄️ Winter Foraging
          </h2>

          <ForageTable data={winterForage} season="winter" bgColor="bg-blue-50" />

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-blue-800 text-lg mb-3">❄️ Winter Strategy</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Bring your Hoe:</strong> Snow Yam & Winter Root are dug up from artifact spots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Beach:</strong> Nautilus Shell (120g) spawns frequently in winter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>⚠️ Holly:</strong> 80g but UNIVERSAL HATE gift - don&apos;t give to villagers!</span>
              </li>
            </ul>
          </div>

          {/* Foraging Routes */}
          <h2 id="routes" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            🗺️ Efficient Foraging Routes
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-3">⚡ Quick Route (5 min)</h3>
              <p className="text-slate-700 text-sm mb-4">For daily runs when you&apos;re short on time:</p>
              <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Farm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Bus Stop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Backwoods</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Mountain</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>Town → Beach → Home</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-purple-800 text-xl mb-3">🔄 Full Route (Max Forage)</h3>
              <p className="text-slate-700 text-sm mb-4">For maximum collection when you have time:</p>
              <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Farm → Secret Woods</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Cindersap Forest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Beach</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Town</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>Mountain → Railroad</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                  <span>Quarry → Home</span>
                </div>
              </div>
            </div>
          </div>

          {/* Do/Don't Cards */}
          <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-4">✅ DO</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Choose Gatherer → Botanist</strong> for 2.4x profits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Check Secret Woods daily</strong> for high-value mushrooms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Save bundle items</strong> before selling duplicates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Mass pick Salmonberries/Blackberries</strong> for free energy food</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-red-800 text-xl mb-4">❌ DON&apos;T</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Gift Holly to anyone</strong> - universal hate!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Skip the Beach</strong> - Rainbow Shells are worth 300-600g</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Sell Truffles raw without Botanist</strong> - make Oil instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Choose Forester path</strong> unless you need hardwood</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/most-profitable-crops" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🌾 Most Profitable Crops</div>
                <p className="text-sm text-slate-600 mt-1">Compare to farming profits</p>
              </Link>
              <Link href="/guide/animal-profit" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🐄 Animal Profit Guide</div>
                <p className="text-sm text-slate-600 mt-1">Truffle farming strategy</p>
              </Link>
              <Link href="/guide/community-center" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Seasonal forage bundles</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-yellow-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Early game foraging tips</p>
              </Link>
              <Link href="/guide/best-fish-pond" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fish Pond Profits</div>
                <p className="text-sm text-slate-600 mt-1">Alternative passive income</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-orange-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Processing wild items</p>
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
