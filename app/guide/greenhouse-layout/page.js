import Link from 'next/link';

export const metadata = {
  title: 'Greenhouse Layout Guide - Optimal Planting Patterns | Stardew Valley 1.6',
  description: 'How to maximize your greenhouse with 120 crop tiles. Includes Ancient Fruit layout, Fruit Tree placement, sprinkler setups, and seasonal income projections.',
  alternates: {
    canonical: '/guide/greenhouse-layout',
  },
  openGraph: {
    title: 'Greenhouse Layout Guide - Stardew Valley 1.6',
    description: 'Maximize 120 tiles with optimal sprinkler and crop placement. Income projections included.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/greenhouse-layout#article',
      headline: 'Greenhouse Layout Guide - Optimal Planting Patterns',
      description: 'Complete greenhouse optimization for Stardew Valley including sprinkler placement, crop selection, and income projections.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-01-15',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/greenhouse-layout'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Greenhouse Layout' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many crops can you plant in the greenhouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'The greenhouse has a 10×12 planting area = 120 plantable tiles. The water trough is located outside the crop area, so it does not reduce planting space.' }
        },
        {
          '@type': 'Question',
          name: 'Can you plant fruit trees in the greenhouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. The greenhouse border (outside the tillable area) fits 18 fruit trees. They produce year-round since the greenhouse has no seasons.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best crop for the greenhouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ancient Fruit is the standard choice—it produces every 7 days forever with no replanting. 114 Ancient Fruit (with 6 Iridium Sprinklers) processed into wine generates over 4 million gold per year with Artisan.' }
        },
        {
          '@type': 'Question',
          name: 'How many Iridium Sprinklers do I need for the greenhouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'Only 6 Iridium Sprinklers are needed to cover all 120 tiles. Place them in a 2×3 pattern for full coverage, leaving 114 tiles for crops.' }
        }
      ]
    }
  ]
};

// Sprinkler comparison data
const sprinklerData = [
  { type: 'Basic Sprinkler', coverage: '4 tiles (adjacent)', qty: '~30', tiles: '~86', recommend: 'bad' },
  { type: 'Quality Sprinkler', coverage: '8 tiles (3×3)', qty: '18', tiles: '98', recommend: 'ok' },
  { type: 'Iridium Sprinkler', coverage: '24 tiles (5×5)', qty: '6', tiles: '114', recommend: 'good' },
  { type: 'Iridium + Pressure Nozzle', coverage: '48 tiles (7×7)', qty: '4', tiles: '116', recommend: 'best' },
];

// Fruit tree data
const fruitTrees = [
  { tree: 'Banana', fruitValue: '150g', wineValue: '630g (Artisan)', yearIncome: '1.27M', best: true },
  { tree: 'Mango', fruitValue: '130g', wineValue: '546g (Artisan)', yearIncome: '1.10M' },
  { tree: 'Peach', fruitValue: '140g', wineValue: '588g (Artisan)', yearIncome: '1.18M' },
  { tree: 'Pomegranate', fruitValue: '140g', wineValue: '588g (Artisan)', yearIncome: '1.18M' },
];

// Crop income comparison
const cropIncome = [
  { processing: 'Raw (no processing)', value: '550g', yearly: '1,003,200g' },
  { processing: 'Wine (base)', value: '1,650g', yearly: '3,009,600g' },
  { processing: 'Wine + Artisan', value: '2,310g', yearly: '4,213,440g', best: true },
];

export default function GreenhouseLayoutGuide() {
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
          <span className="text-slate-800 font-medium">Greenhouse Layout</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🏠 Greenhouse Layout Guide
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl">
            Unlock the greenhouse and turn it into your year-round money machine. 120 tiles that ignore seasons = consistent income all year.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ 120 Plantable Tiles
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ 18 Fruit Trees
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ 5M+ Gold/Year
            </span>
          </div>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            ⚡ TL;DR Setup
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-emerald-600">6</div>
              <div className="text-sm text-slate-600">Iridium Sprinklers</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-emerald-600">114</div>
              <div className="text-sm text-slate-600">Crop Tiles</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-emerald-600">18</div>
              <div className="text-sm text-slate-600">Fruit Trees</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-amber-600">5.5M+</div>
              <div className="text-sm text-slate-600">Gold/Year</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#sprinklers" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            💧 Sprinklers
          </a>
          <a href="#trees" className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🌳 Fruit Trees
          </a>
          <a href="#crops" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🍇 Crop Selection
          </a>
          <a href="#checklist" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ✅ Checklist
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Tile Count */}
          <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-3">
            📐 Greenhouse Tile Count
          </h2>
          
          <p>
            The planting area is a 10×12 grid = <strong>120 plantable tiles</strong>. 
            The water trough is located outside the planting area, so it doesn&apos;t reduce your crop space.
          </p>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-green-900 text-lg mb-2">💡 Free Real Estate</p>
            <p className="text-green-800">
              The wood border around the planting area isn&apos;t tillable, but you can place fruit trees there. 
              This is bonus space that most players overlook—it fits <strong>18 fruit trees</strong>!
            </p>
          </div>

          {/* Sprinkler Section */}
          <h2 id="sprinklers" className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3">
            💧 Sprinkler Layouts
          </h2>
          
          <p>
            Your sprinkler choice determines how many tiles you lose to equipment:
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Sprinkler</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage</th>
                  <th className="px-4 py-3 text-left font-semibold">Qty Needed</th>
                  <th className="px-4 py-3 text-left font-semibold">Crop Tiles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sprinklerData.map((row, i) => (
                  <tr key={i} className={`${row.recommend === 'good' ? 'bg-green-50' : row.recommend === 'best' ? 'bg-blue-50' : row.recommend === 'bad' ? 'bg-red-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.recommend === 'good' || row.recommend === 'best' ? 'font-bold' : ''}`}>{row.type}</td>
                    <td className="px-4 py-3 text-slate-600">{row.coverage}</td>
                    <td className="px-4 py-3">{row.qty}</td>
                    <td className={`px-4 py-3 font-semibold ${row.recommend === 'good' ? 'text-green-600' : row.recommend === 'best' ? 'text-blue-600' : row.recommend === 'bad' ? 'text-red-600' : ''}`}>
                      {row.tiles}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            <strong>Practical choice:</strong> 6 Iridium Sprinklers work fine. 
            The 2 extra tiles from Pressure Nozzles aren&apos;t worth the Qi Gem cost unless you&apos;re min-maxing.
          </p>

          <h3 className="text-xl font-bold text-blue-700 mt-8 mb-4">Iridium Sprinkler Placement (Recommended)</h3>
          
          <p>
            Place 6 sprinklers in a 2-column × 3-row pattern:
          </p>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-6 my-6 not-prose font-mono text-sm shadow-lg">
            <div className="text-green-400 mb-2">// Greenhouse Layout (10 columns x 12 rows)</div>
            <div className="space-y-1 text-slate-300">
              <div>Row 3:  <span className="text-slate-500">[ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ][ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ]</span></div>
              <div>Row 6:  <span className="text-slate-500">[ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ][ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ]</span></div>
              <div>Row 9:  <span className="text-slate-500">[ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ][ ][ ]</span><span className="text-cyan-400 font-bold">[S]</span><span className="text-slate-500">[ ][ ]</span></div>
            </div>
            <div className="text-yellow-400 mt-4 text-xs">S = Iridium Sprinkler (covers 5×5 area)</div>
          </div>

          <p>
            This covers all 120 tiles with 6 sprinklers. You lose 6 tiles to the sprinklers themselves = <strong>114 planting spots</strong>.
          </p>

          {/* Fruit Tree Section */}
          <h2 id="trees" className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-3">
            🌳 Fruit Tree Placement
          </h2>
          
          <p>
            Fruit trees need one empty tile in all directions to grow. 
            Once mature, you can place objects around them.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">⬆️</div>
              <div className="font-bold text-orange-800">Top Edge</div>
              <div className="text-2xl font-bold text-orange-600">6 trees</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">⬇️</div>
              <div className="font-bold text-orange-800">Bottom Edge</div>
              <div className="text-2xl font-bold text-orange-600">6 trees</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">↔️</div>
              <div className="font-bold text-orange-800">Sides</div>
              <div className="text-2xl font-bold text-orange-600">3 each side</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-amber-900 text-lg mb-2">⚠️ Growth Requirement</p>
            <p className="text-amber-800">
              Trees won&apos;t grow if adjacent tiles have objects (including crops). 
              <strong> Plant trees first, wait 28 days</strong> for them to mature, then fill in crops around them.
            </p>
          </div>

          <h3 className="text-xl font-bold text-orange-700 mt-8 mb-4">Best Fruit Trees for Greenhouse</h3>

          <p>Greenhouse trees produce daily, year-round. That&apos;s <strong>112 fruits per tree per year</strong>.</p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Tree</th>
                  <th className="px-4 py-3 text-left font-semibold">Fruit Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Wine Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Year Income (18)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {fruitTrees.map((row, i) => (
                  <tr key={i} className={`${row.best ? 'bg-yellow-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.best ? 'font-bold' : 'font-medium'}`}>{row.tree}</td>
                    <td className="px-4 py-3">{row.fruitValue}</td>
                    <td className="px-4 py-3">{row.wineValue}</td>
                    <td className={`px-4 py-3 font-bold ${row.best ? 'text-amber-600' : ''}`}>{row.yearIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            <strong>Banana trees</strong> win if you have Ginger Island access. 
            Otherwise, Peach or Pomegranate are your best options from Oasis (both tie at 140g).
          </p>

          {/* Crop Selection */}
          <h2 id="crops" className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            🍇 Crop Selection
          </h2>

          <h3 className="text-xl font-bold text-purple-700 mt-6 mb-4">Option 1: Ancient Fruit (Standard Meta)</h3>

          <p>
            114 <Link href="/guide/ancient-fruit">Ancient Fruit</Link> plants (with 6 Iridium Sprinklers) produce every 7 days after the initial 28-day growth. 
            Each season has ~4 harvests after maturity. That&apos;s 114 × 4 × 4 = <strong>1,824 Ancient Fruit per year</strong>.
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Processing</th>
                  <th className="px-4 py-3 text-left font-semibold">Value Each</th>
                  <th className="px-4 py-3 text-left font-semibold">Yearly Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {cropIncome.map((row, i) => (
                  <tr key={i} className={`${row.best ? 'bg-purple-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`px-4 py-3 ${row.best ? 'font-bold' : ''}`}>{row.processing}</td>
                    <td className="px-4 py-3">{row.value}</td>
                    <td className={`px-4 py-3 font-bold ${row.best ? 'text-purple-600' : ''}`}>{row.yearly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <h4 className="font-bold text-lg mb-2">💰 Total Greenhouse Income</h4>
            <p className="text-purple-100">
              114 <Link href="/guide/ancient-fruit" className="underline">Ancient Fruit</Link> + 18 Banana trees = <strong className="text-yellow-300">5.5M+ gold per year</strong> with <Link href="/guide/keg-vs-jar" className="underline">Artisan Wine</Link>!
            </p>
          </div>

          <h3 className="text-xl font-bold text-purple-700 mt-8 mb-4">Option 2: Starfruit</h3>

          <p>
            <Link href="/item/starfruit">Starfruit</Link> sells for more per unit (750g vs 550g), but doesn&apos;t regrow. 
            You need to replant every 13 days. Over a year:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-5">
              <div className="font-bold text-slate-800 mb-2">Starfruit Math</div>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>• 114 tiles × ~8.6 harvests = ~980 Starfruit</li>
                <li>• Wine (Artisan): 3,150g each</li>
                <li>• <strong>Total: 3.09M/year</strong></li>
              </ul>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
              <div className="font-bold text-purple-800 mb-2">Ancient Fruit Wins</div>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• 1,824 vs 980 fruits annually</li>
                <li>• No replanting needed</li>
                <li>• <strong>4.21M vs 3.09M</strong></li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-amber-700 mt-8 mb-4">Option 3: Coffee Beans (Early Game)</h3>

          <p>
            Before you have Ancient Fruit seeds, Coffee is a solid choice:
          </p>

          <ul>
            <li>Grows in 10 days, then produces every 2 days</li>
            <li>5 beans per harvest → craft into Coffee (150g) or Triple Shot Espresso</li>
            <li>Lower profit ceiling but zero processing time</li>
          </ul>

          {/* Setup Checklist */}
          <h2 id="checklist" className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            ✅ Complete Setup Checklist
          </h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">🎯 Greenhouse Setup Steps</h3>
            <div className="space-y-4">
              {[
                { step: 1, text: 'Plant 18 fruit trees around the border (before crops)' },
                { step: 2, text: 'Wait 28 days for trees to mature' },
                { step: 3, text: 'Place 6 Iridium Sprinklers in 2×3 pattern' },
                { step: 4, text: 'Plant Ancient Fruit on remaining 114 tiles' },
                { step: 5, text: 'Build 114+ Kegs (Big Shed holds 137 with optimal layout)' },
                { step: 6, text: 'Harvest weekly, keg immediately, age in Casks if desired' },
              ].map((item) => (
                <label key={item.step} className="flex items-center gap-4 bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </span>
                  <span>{item.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-3">
            ⚠️ Common Mistakes
          </h2>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-900 mb-3">❌ Planting Crops Before Trees</h4>
              <p className="text-red-800 text-sm">Trees won&apos;t grow with adjacent objects. Plant trees first, wait 28 days.</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-900 mb-3">❌ Ignoring the Border</h4>
              <p className="text-red-800 text-sm">18 fruit trees = 1M+ extra income. Don&apos;t waste this space!</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-900 mb-3">❌ Using Quality Sprinklers</h4>
              <p className="text-red-800 text-sm">You lose 16 tiles vs Iridium. That&apos;s 350,000g/year in lost Wine!</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-900 mb-3">❌ Not Enough Kegs</h4>
              <p className="text-red-800 text-sm">Ancient Fruit takes 7 days to process. Need 114 <Link href="/guide/keg-vs-jar" className="underline">Kegs</Link> minimum!</p>
            </div>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/ancient-fruit" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">🍇 Ancient Fruit Guide</div>
                <p className="text-sm text-slate-600 mt-1">Get seeds and scale production</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Which processor for which crop</p>
              </Link>
              <Link href="/guide/most-profitable-crops" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🌾 Crop Profit Rankings</div>
                <p className="text-sm text-slate-600 mt-1">Compare all crops by gold/day</p>
              </Link>
              <Link href="/guide/community-center" className="block bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-rose-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Unlock the Greenhouse</p>
              </Link>
              <Link href="/item/ancient-fruit" className="block bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-violet-800">💰 Ancient Fruit Prices</div>
                <p className="text-sm text-slate-600 mt-1">All quality levels & values</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-yellow-800">💵 Year 1 Money</div>
                <p className="text-sm text-slate-600 mt-1">Fund your greenhouse setup</p>
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
