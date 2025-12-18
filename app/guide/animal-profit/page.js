import Link from 'next/link';

export const metadata = {
  title: 'Animal Profit Guide - Which Animals Make the Most Money | Stardew Valley 1.6',
  description: 'Profit breakdown for every barn and coop animal. ROI calculations, processing comparisons, and which animals to prioritize for maximum gold per day.',
  alternates: {
    canonical: '/guide/animal-profit',
  },
  openGraph: {
    title: 'Animal Profit Guide - Stardew Valley 1.6',
    description: 'Complete profit analysis for Chickens, Cows, Pigs, and more. Includes processing ROI.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/animal-profit#article',
      headline: 'Animal Profit Guide - Which Animals Make the Most Money',
      description: 'Complete profit analysis for all barn and coop animals in Stardew Valley 1.6.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-12-15',
      dateModified: '2025-06-21',
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: 'https://stardewpricedb.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        logo: {
          '@type': 'ImageObject',
          url: 'https://stardewpricedb.com/favicon.svg'
        }
      },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/animal-profit'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Animal Profit' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the most profitable animal in Stardew Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pigs are the most profitable animal, finding Truffles worth 625g (raw) or 1,491g (Truffle Oil with Artisan). A max-happiness Pig averages 1-2 Truffles per day when outdoors.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are cows or goats more profitable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cows produce daily (125-190g milk). Goats produce every other day (225-345g milk). Daily income: Cows average ~345-483g/day, Goats average ~420g/day. Cows win for consistent daily income.'
          }
        },
        {
          '@type': 'Question',
          name: 'Should I make Cheese or sell Milk?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Always make Cheese. Large Milk (190g) becomes Gold Cheese (345g). With Artisan profession, Gold Cheese sells for 483g—more than double the raw milk value.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the fastest animal ROI in Stardew Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Chickens have the fastest ROI at 4.2 days (800g cost ÷ 190g daily Mayo). Ducks take 4.6 days, Cows 4.3 days, and Pigs 10.7 days due to their high 16,000g purchase cost.'
          }
        }
      ]
    }
  ]
};

// Animal data arrays for tables
const coopAnimals = [
  { name: 'Chicken', cost: '800g', product: 'Egg (daily)', rawValue: '50-95g', processed: '190-285g Mayo', artisan: '266-399g', roi: '4.2 days', verdict: '⭐ Best Starter', highlight: 'green' },
  { name: 'Duck', cost: '1,200g', product: 'Egg (every 2d)', rawValue: '95g', processed: '375g Duck Mayo', artisan: '525g', roi: '4.6 days', verdict: '⭐⭐ High Value', highlight: 'blue' },
  { name: 'Void Chicken', cost: 'Void Egg', product: 'Void Egg (daily)', rawValue: '65g', processed: '275g Void Mayo', artisan: '385g', roi: '—', verdict: 'Novelty', highlight: '' },
  { name: 'Dinosaur', cost: 'Dino Egg', product: 'Dino Egg (7d)', rawValue: '350g', processed: 'Cannot process', artisan: '—', roi: '—', verdict: '❌ Skip', highlight: 'red' },
  { name: 'Rabbit', cost: '8,000g', product: 'Wool (every 4d)', rawValue: '340g', processed: '470g Cloth', artisan: '658g', roi: '94 days', verdict: '❌ Poor ROI', highlight: 'red' },
];

const barnAnimals = [
  { name: 'Cow', cost: '1,500g', product: 'Milk (daily)', rawValue: '125-190g', processed: '230-345g Cheese', artisan: '322-483g', roi: '4.3 days', verdict: '⭐⭐ Reliable', highlight: 'yellow' },
  { name: 'Goat', cost: '4,000g', product: 'Milk (every 2d)', rawValue: '225-345g', processed: '400-600g Cheese', artisan: '560-840g', roi: '9.5 days', verdict: '⭐ Good', highlight: 'green' },
  { name: 'Sheep', cost: '8,000g', product: 'Wool (every 3-4d)', rawValue: '340g', processed: '470g Cloth', artisan: '658g', roi: '36.5 days', verdict: 'Mediocre', highlight: '' },
  { name: 'Pig', cost: '16,000g', product: 'Truffle (outdoors)', rawValue: '625g', processed: '1,065g Oil', artisan: '1,491g', roi: '10.7 days', verdict: '👑 Best Profit', highlight: 'gold' },
];

const processingPriority = [
  { priority: 1, product: 'Truffle', processor: 'Oil Maker', time: '6 hours', increase: '+70% (+138% Artisan)', icon: '🍄' },
  { priority: 2, product: 'Duck Egg', processor: 'Mayo Machine', time: '3 hours', increase: '+295%', icon: '🥚' },
  { priority: 3, product: 'Egg', processor: 'Mayo Machine', time: '3 hours', increase: '+280%', icon: '🥚' },
  { priority: 4, product: 'Milk', processor: 'Cheese Press', time: '3.3 hours', increase: '+84%', icon: '🥛' },
  { priority: 5, product: 'Wool', processor: 'Loom', time: '4 hours', increase: '+38%', icon: '🧶' },
];

// Reusable Animal Table Component
function AnimalTable({ animals, title, bgGradient }) {
  const highlightColors = {
    green: 'bg-green-50 border-l-4 border-green-400',
    blue: 'bg-blue-50 border-l-4 border-blue-400',
    yellow: 'bg-yellow-50 border-l-4 border-yellow-400',
    gold: 'bg-amber-50 border-l-4 border-amber-500',
    red: 'bg-red-50 border-l-4 border-red-400',
  };

  return (
    <div className="overflow-x-auto my-8 not-prose">
      <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
        <thead className={bgGradient}>
          <tr>
            <th className="px-4 py-4 text-left font-semibold text-white">Animal</th>
            <th className="px-4 py-4 text-left font-semibold text-white">Cost</th>
            <th className="px-4 py-4 text-left font-semibold text-white">Product</th>
            <th className="px-4 py-4 text-left font-semibold text-white">Raw</th>
            <th className="px-4 py-4 text-left font-semibold text-white">Processed</th>
            <th className="px-4 py-4 text-left font-semibold text-white">+ Artisan</th>
            <th className="px-4 py-4 text-left font-semibold text-white">ROI</th>
            <th className="px-4 py-4 text-left font-semibold text-white">Verdict</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {animals.map((animal, index) => (
            <tr key={index} className={`${animal.highlight ? highlightColors[animal.highlight] || '' : ''} hover:bg-slate-50 transition-colors`}>
              <td className="px-4 py-3 font-semibold text-slate-800">{animal.name}</td>
              <td className="px-4 py-3">{animal.cost}</td>
              <td className="px-4 py-3 text-sm">{animal.product}</td>
              <td className="px-4 py-3">{animal.rawValue}</td>
              <td className="px-4 py-3">{animal.processed}</td>
              <td className="px-4 py-3 font-bold text-green-600">{animal.artisan}</td>
              <td className="px-4 py-3">{animal.roi}</td>
              <td className="px-4 py-3 text-sm font-medium">{animal.verdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AnimalProfitGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-slate-700">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Animal Profit</span>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              💰 Profit Guide
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              v1.6 Verified
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🐄 Animal Profit Guide: Barns, Coops, and ROI
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl">
            Complete profit breakdown for every animal. Know exactly which animals to prioritize for maximum gold per day with processing comparisons.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🐔 Coop Animals
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🐖 Barn Animals
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              📈 ROI Analysis
            </span>
          </div>
        </div>

        {/* Key Stats Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            👑 Quick Answer: Best Animals by Purpose
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🐷</div>
              <p className="font-bold text-slate-800">Best Profit</p>
              <p className="text-lg font-bold text-green-600">Pigs</p>
              <p className="text-xs text-slate-500 mt-1">1,491g/Truffle Oil</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🐔</div>
              <p className="font-bold text-slate-800">Fastest ROI</p>
              <p className="text-lg font-bold text-blue-600">Chickens</p>
              <p className="text-xs text-slate-500 mt-1">4.2 days payback</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🦆</div>
              <p className="font-bold text-slate-800">Best Coop</p>
              <p className="text-lg font-bold text-purple-600">Ducks</p>
              <p className="text-xs text-slate-500 mt-1">525g Duck Mayo</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm text-center">
              <div className="text-3xl mb-2">🐄</div>
              <p className="font-bold text-slate-800">Best Daily</p>
              <p className="text-lg font-bold text-yellow-600">Cows</p>
              <p className="text-xs text-slate-500 mt-1">483g/day cheese</p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#coop" className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🐔 Coop Animals
          </a>
          <a href="#barn" className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🐄 Barn Animals
          </a>
          <a href="#processing" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ⚙️ Processing
          </a>
          <a href="#setup" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🏠 Optimal Setup
          </a>
          <a href="#strategy" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            📅 Year 1 Strategy
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Understanding Animal Economics */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Understanding Animal Economics</h2>
          
          <p>
            Animal profit depends on three key factors:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="font-bold text-blue-800 mb-2">Purchase Cost</h3>
              <p className="text-sm text-slate-600">Upfront investment you need to recover. Ranges from 800g (Chicken) to 16,000g (Pig).</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-bold text-green-800 mb-2">Production Frequency</h3>
              <p className="text-sm text-slate-600">Daily output vs every 2-4 days. Daily producers give consistent income.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-bold text-purple-800 mb-2">Processing Value</h3>
              <p className="text-sm text-slate-600">Raw product vs Cheese/Mayo/Oil. Always process for 2-3x value increase!</p>
            </div>
          </div>

          {/* Profession Box */}
          <div className="bg-slate-800 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">PROFESSION IMPACT</div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <span className="text-purple-300 font-bold">⭐ Artisan (+40%)</span>
                  <p className="text-sm text-slate-300 mt-1">Applies to Cheese, Mayo, Oil. Best for most players.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <span className="text-green-300 font-bold">🐾 Rancher (+20%)</span>
                  <p className="text-sm text-slate-300 mt-1">Raw animal products only. Skip this—always process!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coop Animals Section */}
          <h2 id="coop" className="text-2xl font-bold text-orange-700 mb-4 pt-8 flex items-center gap-3">
            🐔 Coop Animals
          </h2>

          <p>
            Coop animals produce eggs, feathers, and wool. The Deluxe Coop holds 12 animals. Here&apos;s how they rank:
          </p>

          <AnimalTable 
            animals={coopAnimals} 
            title="Coop Animals" 
            bgGradient="bg-gradient-to-r from-orange-500 to-red-500"
          />

          {/* Chicken Deep Dive */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-amber-800 text-lg mb-3">🐔 Chicken Deep Dive</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Regular Egg:</strong> 50g raw → 190g Mayo → 266g (Artisan)</p>
                <p className="text-slate-700 mb-2"><strong>Large Egg:</strong> 95g raw → 285g Gold Mayo → 399g (Artisan)</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">✓ 800g cost ÷ 190g/day = <strong>4.2 days ROI</strong></p>
                <p className="text-slate-600 text-sm mt-2">Best starter animal. White & brown eggs are identical in value.</p>
              </div>
            </div>
          </div>

          {/* Duck Deep Dive */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-blue-800 text-lg mb-3">🦆 Duck Deep Dive</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Duck Egg:</strong> 95g raw → 375g Duck Mayo → 525g (Artisan)</p>
                <p className="text-slate-700 mb-2"><strong>Duck Feather:</strong> 250g (random ~5% chance)</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">✓ 525g ÷ 2 days = <strong>262g/day average</strong></p>
                <p className="text-slate-600 text-sm mt-2">Better than chickens per-slot. Worth upgrading once you have Mayo Machines!</p>
              </div>
            </div>
          </div>

          {/* Skip These */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-red-800 text-lg mb-3">❌ Skip These Coop Animals</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm font-medium">Dinosaur</span>
                <p className="text-slate-700">350g every 7 days = 50g/day. Half a chicken&apos;s income. Keep one for museum, don&apos;t farm.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm font-medium">Rabbit</span>
                <p className="text-slate-700">8,000g cost, 85g/day = 94 days ROI. Only for Rabbit&apos;s Foot farming (luck-dependent).</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm font-medium">Void Chicken</span>
                <p className="text-slate-700">Strictly worse than Ducks. Only useful for Witch&apos;s Hut quest and novelty.</p>
              </div>
            </div>
          </div>

          {/* Barn Animals Section */}
          <h2 id="barn" className="text-2xl font-bold text-amber-700 mb-4 pt-8 flex items-center gap-3">
            🐄 Barn Animals
          </h2>

          <p>
            Barn animals produce milk, wool, and truffles. The Deluxe Barn holds 12 animals. Pigs are the endgame champions:
          </p>

          <AnimalTable 
            animals={barnAnimals} 
            title="Barn Animals" 
            bgGradient="bg-gradient-to-r from-amber-500 to-orange-500"
          />

          {/* Cow vs Goat Comparison */}
          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-yellow-800 text-xl mb-3">🐄 Cow</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Cost:</strong> 1,500g</p>
                <p><strong>Milk:</strong> 125-190g (daily)</p>
                <p><strong>Cheese:</strong> 230-345g → 322-483g (Artisan)</p>
                <p className="text-green-600 font-bold">ROI: 4.3 days</p>
              </div>
              <div className="mt-4 bg-yellow-100 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">✓ Daily production = consistent income</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-slate-700 text-xl mb-3">🐐 Goat</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Cost:</strong> 4,000g</p>
                <p><strong>Milk:</strong> 225-345g (every 2 days)</p>
                <p><strong>Cheese:</strong> 400-600g → 560-840g (Artisan)</p>
                <p className="text-blue-600 font-bold">ROI: 9.5 days</p>
              </div>
              <div className="mt-4 bg-slate-100 rounded-lg p-3">
                <p className="text-slate-700 text-sm">⚖️ Higher per-unit but less frequent</p>
              </div>
            </div>
          </div>

          {/* Pig Spotlight */}
          <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 border-2 border-amber-400 rounded-2xl p-8 my-10 not-prose shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🐷</span>
              <div>
                <h3 className="font-extrabold text-amber-900 text-2xl">Pig: The Endgame Champion</h3>
                <p className="text-amber-700">The most profitable animal in Stardew Valley</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">625g</div>
                <p className="text-sm text-slate-600">Raw Truffle</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">1,065g</div>
                <p className="text-sm text-slate-600">Truffle Oil</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">1,491g</div>
                <p className="text-sm text-slate-600">Oil + Artisan</p>
              </div>
            </div>
            <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4">
              <p className="font-bold text-green-800 mb-2">💰 The Math</p>
              <p className="text-green-700">
                Max-happiness Pig: 1-2 Truffles/day average • Daily income: 1,000-2,200g<br/>
                ROI: 16,000g ÷ 1,500g = <strong>10.7 days</strong> (worth the wait!)
              </p>
            </div>
          </div>

          {/* Pig Limitations */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-red-800 text-lg mb-3">⚠️ Pig Limitations (Important!)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-slate-700">No Truffles in <strong>Winter</strong> (3 months zero income)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-slate-700">No Truffles on <strong>rainy days</strong></span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-slate-700">Must be <strong>outdoors</strong>—won&apos;t produce inside</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-slate-700">Truffles can spawn in <strong>hard-to-see spots</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Priority */}
          <h2 id="processing" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            ⚙️ Processing Priority
          </h2>

          <p>
            Always process animal products! Here&apos;s the priority order based on value increase:
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">#</th>
                  <th className="px-4 py-4 text-left font-semibold">Product</th>
                  <th className="px-4 py-4 text-left font-semibold">Processor</th>
                  <th className="px-4 py-4 text-left font-semibold">Time</th>
                  <th className="px-4 py-4 text-left font-semibold">Value Increase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {processingPriority.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'bg-amber-50 border-l-4 border-amber-400' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 font-bold text-lg">{item.icon}</td>
                    <td className="px-4 py-3 font-semibold">{item.product}</td>
                    <td className="px-4 py-3">{item.processor}</td>
                    <td className="px-4 py-3">{item.time}</td>
                    <td className="px-4 py-3 font-bold text-green-600">{item.increase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Optimal Setup */}
          <h2 id="setup" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            🏠 Optimal Barn/Coop Setup
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-orange-800 text-xl mb-4">🐔 Best Coop (12 slots)</h3>
              <div className="space-y-3">
                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <p className="font-bold text-slate-800">🦆 8 Ducks</p>
                  <p className="text-sm text-slate-600">525g × 8 ÷ 2 = 2,100g/day</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                  <p className="font-bold text-slate-800">🐔 4 Chickens</p>
                  <p className="text-sm text-slate-600">Daily eggs for cooking/quests</p>
                </div>
              </div>
              <p className="text-sm text-orange-700 mt-4">💡 Or go full 12 Ducks if you don&apos;t need eggs!</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-amber-800 text-xl mb-4">🐄 Best Barn (12 slots)</h3>
              <div className="space-y-3">
                <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
                  <p className="font-bold text-slate-800">🐷 Option A: 12 Pigs</p>
                  <p className="text-sm text-slate-600">Max profit: 15,000-25,000g/day in good weather</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
                  <p className="font-bold text-slate-800">⚖️ Option B: 8 Pigs + 4 Cows</p>
                  <p className="text-sm text-slate-600">Pigs for profit, Cows for winter income</p>
                </div>
              </div>
            </div>
          </div>

          {/* Year 1 Strategy */}
          <h2 id="strategy" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            📅 Year 1 Animal Strategy
          </h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Timeline: When to Buy Animals</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">Spring Y1</span>
                <div>
                  <p className="font-medium">Build Coop, buy 4 Chickens (3,200g)</p>
                  <p className="text-slate-300 text-sm">Start Mayo production. Quick ROI in ~4 days each.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">Summer Y1</span>
                <div>
                  <p className="font-medium">Upgrade to Big Coop, add Ducks</p>
                  <p className="text-slate-300 text-sm">Incubate Duck Eggs or buy Ducks. Better Mayo value.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">Fall Y1</span>
                <div>
                  <p className="font-medium">Build Barn, buy 2-4 Cows</p>
                  <p className="text-slate-300 text-sm">Prepare for winter. Cows give consistent Cheese income.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">Spring Y2</span>
                <div>
                  <p className="font-medium">Upgrade to Deluxe Barn, BUY PIGS!</p>
                  <p className="text-slate-300 text-sm">Fill with Pigs. They&apos;ll pay for themselves in ~11 days each.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-blue-800 text-lg mb-3">💡 Pro Tip: Don&apos;t Rush Pigs</h3>
            <p className="text-blue-700">
              The 16,000g cost and barn upgrade requirements (6,500g + 450 wood + 200 stone for Deluxe) make Pigs a <strong>Year 2 investment</strong>. 
              Focus on Chickens → Ducks → Cows in Year 1, then go all-in on Pigs when you have the resources.
            </p>
          </div>

          {/* Do/Don't Cards */}
          <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-4">✅ DO</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Always process</strong> eggs, milk, and truffles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Pet animals daily</strong> for max happiness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Let pigs outside</strong> every non-rainy day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Choose Artisan</strong> profession for +40% goods</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-red-800 text-xl mb-4">❌ DON&apos;T</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Sell raw products</strong>—always process first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Farm dinosaurs</strong>—50g/day is terrible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Buy Pigs in Year 1</strong>—too expensive early</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Forget heaters</strong>—cold animals = less production</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Complete first-year strategy</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar Guide</div>
                <p className="text-sm text-slate-600 mt-1">Processing decisions for crops</p>
              </Link>
              <Link href="/guide/best-fish-pond" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fish Pond Profits</div>
                <p className="text-sm text-slate-600 mt-1">Alternative passive income</p>
              </Link>
              <Link href="/guide/most-profitable-crops" className="block bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-emerald-800">🌾 Most Profitable Crops</div>
                <p className="text-sm text-slate-600 mt-1">Best crops each season</p>
              </Link>
              <Link href="/guide/greenhouse-layout" className="block bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-teal-800">🏠 Greenhouse Layout</div>
                <p className="text-sm text-slate-600 mt-1">Maximize your greenhouse</p>
              </Link>
              <Link href="/?category=Animal%20Products" className="block bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-orange-800">📊 Animal Products</div>
                <p className="text-sm text-slate-600 mt-1">All eggs, milk, wool prices</p>
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
