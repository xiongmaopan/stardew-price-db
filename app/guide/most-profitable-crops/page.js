import Link from 'next/link';

export const metadata = {
  title: 'Most Profitable Crops by Season - Stardew Valley 1.6 Guide',
  description: 'Complete profit analysis of every Stardew Valley crop. Gold-per-day rankings for Spring, Summer, and Fall with Tiller/Artisan bonuses calculated.',
  alternates: {
    canonical: '/guide/most-profitable-crops',
  },
  openGraph: {
    title: 'Most Profitable Crops by Season - Stardew Valley 1.6',
    description: 'Complete crop profit rankings with gold-per-day calculations. Data verified for v1.6.',
  },
};

// JSON-LD Schema for Rich Snippets
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Article Schema
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/most-profitable-crops#article',
      headline: 'Most Profitable Crops by Season - Stardew Valley 1.6 Guide',
      description: 'Complete profit analysis of every Stardew Valley crop with gold-per-day rankings.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-01-14',
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
      mainEntityOfPage: 'https://stardewpricedb.com/guide/most-profitable-crops'
    },
    // BreadcrumbList Schema
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Most Profitable Crops' }
      ]
    },
    // FAQPage Schema
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the most profitable crop in Stardew Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Starfruit Wine (2,250g base, 3,150g with Artisan) is the most profitable processed crop. For raw selling, Pumpkin (320g) and Cranberries (75g × 2 per harvest) offer the best returns by season.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do you calculate gold per day for crops?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gold Per Day = (Sell Price - Seed Cost) ÷ Growth Days. For regrowable crops, factor in all harvests across the season.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Strawberry or Cauliflower better in Spring?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Strawberry is better (~21g/day) but only available at the Egg Festival on Day 13. Cauliflower (7.9g/day) is the best crop available from Day 1.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are the best crops for Year 1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Year 1: Potatoes → Strawberries (Spring), Blueberries (Summer), Cranberries (Fall). These crops offer great returns without needing Oasis access or Year 2+ seeds.'
          }
        },
        {
          '@type': 'Question',
          name: 'Should I use Tiller or Artisan profession for crops?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Artisan (+40% on processed goods) is generally superior for endgame profits. Wine, Juice, Jelly, and Pickles all benefit. Tiller (+10% on raw crops) is only better if you sell raw exclusively.'
          }
        }
      ]
    }
  ]
};

// Crop data
const springCrops = [
  { name: 'Strawberry', sellPrice: '120g', seedCost: '100g', growth: '8d (regrows 4d)', goldPerDay: '~21g/day', notes: 'Egg Festival only. 5 harvests if planted Day 1', highlight: true, link: '/calculator/spring' },
  { name: 'Rhubarb', sellPrice: '220g', seedCost: '100g', growth: '13d', goldPerDay: '9.2g/day', notes: 'Oasis only. Wine = 660g (94g/day after Keg time)', link: '/item/rhubarb' },
  { name: 'Cauliflower', sellPrice: '175g', seedCost: '80g', growth: '12d', goldPerDay: '7.9g/day', notes: 'Can become Giant Crop (x2 yield)', link: '/item/cauliflower' },
  { name: 'Coffee Bean', sellPrice: '15g (×4)', seedCost: '2,500g', growth: '10d (regrows 2d)', goldPerDay: '~24g/day', notes: 'Traveling Cart. Makes Coffee (Speed +1)', link: '/item/coffee-bean' },
  { name: 'Potato', sellPrice: '80g', seedCost: '50g', growth: '6d', goldPerDay: '5g/day', notes: '25% extra harvest chance. Good early game.', link: '/item/potato' },
  { name: 'Kale', sellPrice: '110g', seedCost: '70g', growth: '6d', goldPerDay: '6.7g/day', notes: 'Solid mid-tier choice', link: '/item/kale' },
];

const summerCrops = [
  { name: 'Starfruit', sellPrice: '750g', seedCost: '400g', growth: '13d', goldPerDay: '26.9g/day', notes: 'Oasis. Wine = 2,250g (best in game)', highlight: true, link: '/item/starfruit' },
  { name: 'Blueberry', sellPrice: '50g × 3', seedCost: '80g', growth: '13d (regrows 4d)', goldPerDay: '~22g/day', notes: '4 harvests. Easy to grow, no Oasis needed.', link: '/item/blueberry' },
  { name: 'Red Cabbage', sellPrice: '260g', seedCost: '100g', growth: '9d', goldPerDay: '17.8g/day', notes: 'Year 2+ only. Great profit.', link: '/item/red-cabbage' },
  { name: 'Melon', sellPrice: '250g', seedCost: '80g', growth: '12d', goldPerDay: '14.2g/day', notes: 'Giant Crop possible', link: '/item/melon' },
  { name: 'Hops', sellPrice: '25g', seedCost: '60g', growth: '11d (regrows 1d)', goldPerDay: 'See notes', notes: 'Pale Ale = 300g in 1.5 days. Best Keg crop!', link: '/item/hops' },
];

const fallCrops = [
  { name: 'Pumpkin', sellPrice: '320g', seedCost: '100g', growth: '13d', goldPerDay: '16.9g/day', notes: 'Giant Crop possible. Top raw seller.', highlight: true, link: '/item/pumpkin' },
  { name: 'Cranberry', sellPrice: '75g × 2', seedCost: '240g', growth: '7d (regrows 5d)', goldPerDay: '~16.5g/day', notes: '5 harvests. Great for raw selling.', link: '/item/cranberry' },
  { name: 'Grape', sellPrice: '80g', seedCost: '60g', growth: '10d (regrows 3d)', goldPerDay: '~12g/day', notes: 'Wine = 240g. Trellis crop.', link: '/item/grape' },
  { name: 'Artichoke', sellPrice: '160g', seedCost: '30g', growth: '8d', goldPerDay: '16.3g/day', notes: 'Year 2+ only. Underrated!', link: '/item/artichoke' },
  { name: 'Amaranth', sellPrice: '150g', seedCost: '70g', growth: '7d', goldPerDay: '11.4g/day', notes: 'Good mid-tier option', link: '/item/amaranth' },
  { name: 'Sweet Gem Berry', sellPrice: '3,000g', seedCost: '1,000g', growth: '24d', goldPerDay: '83.3g/day', notes: 'Rare Seed from Traveling Cart. Cannot process.', link: '/item/sweet-gem-berry' },
];

function CropTable({ crops, season, bgColor }) {
  const headerColors = {
    spring: 'bg-gradient-to-r from-green-500 to-emerald-600',
    summer: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    fall: 'bg-gradient-to-r from-orange-500 to-red-500',
  };
  
  return (
    <div className="overflow-x-auto my-8 not-prose">
      <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
        <thead className={`${headerColors[season]} text-white`}>
          <tr>
            <th className="px-4 py-4 text-left font-semibold">Crop</th>
            <th className="px-4 py-4 text-left font-semibold">Sell Price</th>
            <th className="px-4 py-4 text-left font-semibold">Seed Cost</th>
            <th className="px-4 py-4 text-left font-semibold">Growth</th>
            <th className="px-4 py-4 text-left font-semibold">Gold/Day</th>
            <th className="px-4 py-4 text-left font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {crops.map((crop, index) => (
            <tr key={index} className={`${crop.highlight ? bgColor : 'hover:bg-slate-50'} transition-colors`}>
              <td className="px-4 py-3 font-medium">
                {crop.link ? (
                  <Link href={crop.link} className="text-blue-600 hover:underline font-semibold">
                    {crop.name}
                  </Link>
                ) : crop.name}
              </td>
              <td className="px-4 py-3">{crop.sellPrice}</td>
              <td className="px-4 py-3">{crop.seedCost}</td>
              <td className="px-4 py-3">{crop.growth}</td>
              <td className="px-4 py-3 font-bold text-green-600">{crop.goldPerDay}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{crop.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MostProfitableCropsGuide() {
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
          <span className="text-slate-800 font-medium">Most Profitable Crops</span>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🌾 Most Profitable Crops by Season
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl">
            Complete gold-per-day analysis for every crop in Stardew Valley 1.6. Know exactly what to plant for maximum profit in Spring, Summer, and Fall.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ All Seasons Covered
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ Tiller/Artisan Bonuses
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ✓ v1.6 Verified
            </span>
          </div>
        </div>

        {/* Quick Answer Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            ⚡ Quick Answer: Best Crop Each Season
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
              <div className="text-green-600 font-bold text-lg mb-2">🌸 Spring</div>
              <p className="font-semibold text-slate-800">Strawberry</p>
              <p className="text-sm text-slate-600">~21g/day (Egg Festival seeds)</p>
              <p className="text-xs text-slate-500 mt-1">Alt: Rhubarb for wine</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm">
              <div className="text-yellow-600 font-bold text-lg mb-2">☀️ Summer</div>
              <p className="font-semibold text-slate-800">Starfruit</p>
              <p className="text-sm text-slate-600">26.9g/day (Wine = 2,250g)</p>
              <p className="text-xs text-slate-500 mt-1">Alt: Blueberry for raw</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
              <div className="text-orange-600 font-bold text-lg mb-2">🍂 Fall</div>
              <p className="font-semibold text-slate-800">Pumpkin</p>
              <p className="text-sm text-slate-600">16.9g/day (Giant Crop)</p>
              <p className="text-xs text-slate-500 mt-1">Alt: Sweet Gem Berry</p>
            </div>
          </div>
        </div>

        {/* Season Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#spring" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🌸 Spring Crops
          </a>
          <a href="#summer" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            ☀️ Summer Crops
          </a>
          <a href="#fall" className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🍂 Fall Crops
          </a>
          <a href="#professions" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            💼 Profession Impact
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Understanding Profitability */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Understanding Crop Profitability</h2>
          
          <p>
            Raw sell price is just one factor. To truly compare crops, you need to calculate <strong>gold per day</strong>:
          </p>

          <div className="bg-slate-800 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">PROFIT FORMULA</div>
              <code className="text-xl md:text-2xl font-mono text-green-400">
                Gold/Day = (Sell Price - Seed Cost) ÷ Growth Days
              </code>
            </div>
          </div>

          <p>
            For <strong>regrowable crops</strong> (Strawberry, Blueberry, Cranberry), factor in all harvests across the season. For <strong>processed goods</strong>, include the Keg/Jar processing time. See our <Link href="/guide/keg-vs-jar">Keg vs Jar guide</Link> for processing calculations.
          </p>

          {/* Spring Section */}
          <h2 id="spring" className="text-2xl font-bold text-green-700 mb-4 pt-8 flex items-center gap-3">
            🌸 Spring Crops Ranked (28 Days)
          </h2>

          <CropTable crops={springCrops} season="spring" bgColor="bg-green-50" />

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-green-900 text-lg mb-2">💡 Spring Strategy</p>
            <p className="text-green-800">
              <strong>Days 1-12:</strong> Plant Potatoes or Kale for quick returns.<br/>
              <strong>Day 13:</strong> Buy Strawberry seeds at Egg Festival (100g each).<br/>
              <strong>Pro Tip:</strong> Save some Strawberries for the Seed Maker to get free seeds for Year 2!
            </p>
          </div>

          {/* Summer Section */}
          <h2 id="summer" className="text-2xl font-bold text-yellow-700 mb-4 pt-8 flex items-center gap-3">
            ☀️ Summer Crops Ranked (28 Days)
          </h2>

          <CropTable crops={summerCrops} season="summer" bgColor="bg-yellow-50" />

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-amber-900 text-lg mb-2">⚠️ Hops Warning</p>
            <p className="text-amber-800">
              Hops are the highest gold-per-day when Kegged (<Link href="/item/pale-ale" className="underline font-medium">Pale Ale</Link> = 200g/day per Keg), but they require <strong>DAILY harvesting</strong> and lots of Kegs. One Hops plant produces 17 Hops per Summer = 25.5 days of Keg time needed.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-yellow-900 text-lg mb-2">💡 Summer Strategy</p>
            <p className="text-yellow-800">
              <strong>Year 1:</strong> Blueberries are your best friend. Plant on Day 1 for 4 harvests.<br/>
              <strong>Year 2+:</strong> Unlock the <Link href="/bundle/vault-bundle" className="underline font-medium">Bus (42,500g)</Link> → Starfruit from Oasis.<br/>
              <strong>Endgame:</strong> Fill your <Link href="/guide/greenhouse-layout" className="underline font-medium">Greenhouse</Link> with Starfruit or <Link href="/guide/ancient-fruit" className="underline font-medium">Ancient Fruit</Link>.
            </p>
          </div>

          {/* Fall Section */}
          <h2 id="fall" className="text-2xl font-bold text-orange-700 mb-4 pt-8 flex items-center gap-3">
            🍂 Fall Crops Ranked (28 Days)
          </h2>

          <CropTable crops={fallCrops} season="fall" bgColor="bg-orange-50" />

          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-xl p-5 my-6 not-prose shadow-md">
            <p className="font-bold text-orange-900 text-lg mb-2">💡 Fall Strategy</p>
            <p className="text-orange-800">
              <strong>Giant Crops:</strong> Plant Pumpkins in 3x3 grids for a chance at Giant Crops (double yield).<br/>
              <strong>Rare Seeds:</strong> Watch the Traveling Cart every Friday & Sunday. Sweet Gem Berry = 3,000g!<br/>
              <strong>Cranberries:</strong> 5 harvests per season make them reliable for raw selling.
            </p>
          </div>

          {/* Profession Impact */}
          <h2 id="professions" className="text-2xl font-bold text-slate-800 mb-4 pt-8">💼 Profession Impact</h2>

          <p>
            Your Level 10 Farming profession choice significantly affects which crops are &quot;best&quot;:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-3">🌿 Tiller (+10% Crops)</h3>
              <p className="text-slate-700 mb-4">
                Applies to raw crops only. Best when selling without processing.
              </p>
              <div className="bg-white/70 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span>Starfruit:</span>
                  <span className="font-semibold">750g → 825g</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Pumpkin:</span>
                  <span className="font-semibold">320g → 352g</span>
                </div>
                <div className="flex justify-between">
                  <span>Cauliflower:</span>
                  <span className="font-semibold">175g → 192g</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-purple-800 text-xl mb-3">⭐ Artisan (+40% Goods)</h3>
              <p className="text-slate-700 mb-4">
                Applies to Wine, Juice, Jelly, Pickles. The endgame multiplier.
              </p>
              <div className="bg-white/70 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span>Starfruit Wine:</span>
                  <span className="font-semibold text-purple-600">2,250g → 3,150g</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Ancient Fruit Wine:</span>
                  <span className="font-semibold text-purple-600">1,650g → 2,310g</span>
                </div>
                <div className="flex justify-between">
                  <span>Pale Ale:</span>
                  <span className="font-semibold text-purple-600">300g → 420g</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 border border-purple-300 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-purple-900">📊 Verdict: Artisan wins for most players</p>
            <p className="text-purple-800 text-sm mt-2">
              If you process any crops through Kegs or Jars, Artisan&apos;s +40% bonus far outweighs Tiller&apos;s +10%. The only exception: if you exclusively sell raw crops without any processing.
            </p>
          </div>

          {/* TL;DR Section */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8">🎯 Bottom Line: What Should You Plant?</h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">TL;DR Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Year 1</span>
                <div>
                  <p className="font-medium">Focus on easy-access crops</p>
                  <p className="text-slate-300 text-sm">Potatoes → Strawberries (Spring) • Blueberries (Summer) • Cranberries (Fall)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Year 2+</span>
                <div>
                  <p className="font-medium">Unlock Oasis, build Kegs</p>
                  <p className="text-slate-300 text-sm">Rhubarb (wine) • Red Cabbage • Starfruit • Start your <Link href="/guide/keg-vs-jar" className="text-blue-300 hover:underline">Keg empire</Link></p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 rounded-lg p-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Endgame</span>
                <div>
                  <p className="font-medium">Maximum passive income</p>
                  <p className="text-slate-300 text-sm"><Link href="/guide/greenhouse-layout" className="text-purple-300 hover:underline">Greenhouse</Link> full of <Link href="/guide/ancient-fruit" className="text-purple-300 hover:underline">Ancient Fruit</Link> or Starfruit → Kegs → Artisan profession</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools & Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/calculator/spring" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🧮 Spring Calculator</div>
                <p className="text-sm text-slate-600 mt-1">Calculate exact crop profits</p>
              </Link>
              <Link href="/calculator/summer" className="block bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-yellow-800">🧮 Summer Calculator</div>
                <p className="text-sm text-slate-600 mt-1">Starfruit & Melon analysis</p>
              </Link>
              <Link href="/calculator/fall" className="block bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-orange-800">🧮 Fall Calculator</div>
                <p className="text-sm text-slate-600 mt-1">Pumpkin & Cranberry math</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Which processing is better?</p>
              </Link>
              <Link href="/guide/ancient-fruit" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">🍇 Ancient Fruit Guide</div>
                <p className="text-sm text-slate-600 mt-1">The ultimate endgame crop</p>
              </Link>
              <Link href="/guide/greenhouse-layout" className="block bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-teal-800">🏠 Greenhouse Layout</div>
                <p className="text-sm text-slate-600 mt-1">Maximize your 116 tiles</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Best early game strategies</p>
              </Link>
              <Link href="/guide/community-center" className="block bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-rose-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Bundle requirements & tips</p>
              </Link>
              <Link href="/bundles" className="block bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-slate-800">📋 All Bundles</div>
                <p className="text-sm text-slate-600 mt-1">Complete bundle database</p>
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
