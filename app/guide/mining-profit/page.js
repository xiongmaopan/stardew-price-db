import Link from 'next/link';

export const metadata = {
  title: 'Mining Profit Guide - Best Gems and Minerals to Sell | Stardew Valley 1.6',
  description: 'Which gems and minerals are worth keeping vs selling. Crystalarium optimization, Geode contents, and gold-per-day from mining runs.',
  alternates: {
    canonical: '/guide/mining-profit',
  },
  openGraph: {
    title: 'Mining Profit Guide - Stardew Valley 1.6',
    description: 'Gem values, Crystalarium ROI, and which Geodes are worth opening.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/mining-profit#article',
      headline: 'Mining Profit Guide - Best Gems and Minerals to Sell',
      description: 'Complete guide to maximizing gold from mining in Stardew Valley 1.6.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-12-15',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/mining-profit'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Mining Profit' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best gem to put in a Crystalarium?',
          acceptedAnswer: { '@type': 'Answer', text: 'Diamond is the best for pure profit (750g every 5 days = 150g/day, or 195g/day with Gemologist). Jade is best for trading at the Desert Trader on Sundays for Staircases. Ruby is best for Spicy Eel trades for Skull Cavern runs.' }
        },
        {
          '@type': 'Question',
          name: 'Should I sell or donate minerals?',
          acceptedAnswer: { '@type': 'Answer', text: 'Donate one of each to the Museum first to unlock rewards and complete the collection. After that, sell duplicates unless needed for crafting or quests. Most minerals have low value (10-80g), so focus on gems for profit.' }
        },
        {
          '@type': 'Question',
          name: 'Which Geode is most profitable to open?',
          acceptedAnswer: { '@type': 'Answer', text: 'Omni Geodes have the best average value (~95g profit after 25g fee) and can contain Prismatic Shards and Iridium. Regular and Frozen Geodes are rarely worth the 25g opening fee after completing the Museum collection.' }
        },
        {
          '@type': 'Question',
          name: 'Should I sell ore or smelt it into bars?',
          acceptedAnswer: { '@type': 'Answer', text: 'Always smelt ore into bars before selling. Copper Bar = 60g (vs 25g ore), Iron Bar = 120g, Gold Bar = 250g, Iridium Bar = 1,000g (vs 500g ore). The value doubles or triples after smelting.' }
        }
      ]
    }
  ]
};

// Gem data for tables
const gemData = [
  { gem: 'Prismatic Shard', price: '2,000g', crystalTime: "Can't replicate", goldPerDay: '—', gemologist: '2,600g', notes: 'Keep first for Galaxy Sword!', highlight: 'gold' },
  { gem: 'Diamond', price: '750g', crystalTime: '5 days', goldPerDay: '150g/day', gemologist: '195g/day', notes: 'Best passive income gem', highlight: 'green' },
  { gem: 'Ruby', price: '250g', crystalTime: '2 days', goldPerDay: '125g/day', gemologist: '162g/day', notes: 'Trade for Spicy Eel', highlight: '' },
  { gem: 'Jade', price: '200g', crystalTime: '1.5 days', goldPerDay: '133g/day', gemologist: '173g/day', notes: 'Trade for Staircases (Sunday)', highlight: 'blue' },
  { gem: 'Emerald', price: '250g', crystalTime: '2 days', goldPerDay: '125g/day', gemologist: '162g/day', notes: '—', highlight: '' },
  { gem: 'Aquamarine', price: '180g', crystalTime: '1.5 days', goldPerDay: '120g/day', gemologist: '156g/day', notes: '—', highlight: '' },
  { gem: 'Amethyst', price: '100g', crystalTime: '1.5 days', goldPerDay: '67g/day', gemologist: '87g/day', notes: 'Abigail loves it', highlight: '' },
  { gem: 'Topaz', price: '80g', crystalTime: '1 day', goldPerDay: '80g/day', gemologist: '104g/day', notes: '—', highlight: '' },
];

const geodeData = [
  { type: 'Geode', found: 'Mines 1-39', avgValue: '~50g', profit: '~25g', notes: 'Low value minerals' },
  { type: 'Frozen Geode', found: 'Mines 40-79', avgValue: '~60g', profit: '~35g', notes: 'Frozen Tear, gems' },
  { type: 'Magma Geode', found: 'Mines 80-120', avgValue: '~80g', profit: '~55g', notes: 'Fire Quartz, gems' },
  { type: 'Omni Geode', found: 'Various, Skull Cavern', avgValue: '~120g', profit: '~95g', notes: 'Prismatic chance!', highlight: true },
];

const oreData = [
  { material: 'Copper', oreValue: '5g', barValue: '60g', oreNeeded: '5 ore + 1 coal', profit: '+35g' },
  { material: 'Iron', oreValue: '10g', barValue: '120g', oreNeeded: '5 ore + 1 coal', profit: '+70g' },
  { material: 'Gold', oreValue: '25g', barValue: '250g', oreNeeded: '5 ore + 1 coal', profit: '+125g' },
  { material: 'Iridium', oreValue: '100g', barValue: '1,000g', oreNeeded: '5 ore + 1 coal', profit: '+500g', highlight: true },
];

export default function MiningProfitGuide() {
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
          <span className="text-slate-800 font-medium">Mining Profit</span>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-700 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              ⛏️ Mining Guide
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              v1.6 Verified
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            ⛏️ Mining Profit Guide: Gems, Geodes & Crystalariums
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl">
            Mining is essential for resources, but can it make real money? 
            Short answer: not compared to farming. 
            Long answer: Crystalariums change the math entirely!
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              💎 Diamond = 150g/day
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🟢 Jade = Staircases
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              🔴 Ruby = Spicy Eel
            </span>
          </div>
        </div>

        {/* Key Stats Box */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            💡 Key Takeaways
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-300 shadow-sm">
              <p className="font-bold text-slate-800 text-sm">💰 Best to Sell</p>
              <p className="text-sm text-slate-600 mt-1">Diamond (750g), Prismatic Shard (2,000g), Iridium Bar (1,000g)</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-300 shadow-sm">
              <p className="font-bold text-slate-800 text-sm">💎 Best for Crystalarium</p>
              <p className="text-sm text-slate-600 mt-1">Diamond (profit), Jade (stairs), Ruby (Spicy Eel)</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-300 shadow-sm">
              <p className="font-bold text-slate-800 text-sm">🔧 Keep for Crafting</p>
              <p className="text-sm text-slate-600 mt-1">Quartz, Fire Quartz, Earth Crystal, Frozen Tear</p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#gems" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            💎 Gem Values
          </a>
          <a href="#crystalarium" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🔮 Crystalarium
          </a>
          <a href="#geodes" className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🪨 Geodes
          </a>
          <a href="#bars" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🔩 Ore vs Bars
          </a>
          <a href="#skull-cavern" className="bg-red-100 hover:bg-red-200 text-red-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            💀 Skull Cavern
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* Gem Values Section */}
          <h2 id="gems" className="text-2xl font-bold text-purple-700 mb-4 pt-8 flex items-center gap-3">
            💎 Gem Values Ranked
          </h2>

          <p>
            Gems drop from nodes, monster loot, and Geodes. Here&apos;s what they&apos;re worth and how they perform in Crystalariums:
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Gem</th>
                  <th className="px-4 py-4 text-left font-semibold">Sell Price</th>
                  <th className="px-4 py-4 text-left font-semibold">Crystal Time</th>
                  <th className="px-4 py-4 text-left font-semibold">Gold/Day</th>
                  <th className="px-4 py-4 text-left font-semibold">+ Gemologist</th>
                  <th className="px-4 py-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {gemData.map((gem, index) => {
                  const highlightColors = {
                    gold: 'bg-amber-50 border-l-4 border-amber-400',
                    green: 'bg-green-50 border-l-4 border-green-400',
                    blue: 'bg-blue-50 border-l-4 border-blue-400',
                  };
                  return (
                    <tr key={index} className={`${gem.highlight ? highlightColors[gem.highlight] || '' : ''} hover:bg-slate-50 transition-colors`}>
                      <td className="px-4 py-3 font-semibold text-slate-800">{gem.gem}</td>
                      <td className="px-4 py-3">{gem.price}</td>
                      <td className={`px-4 py-3 ${gem.crystalTime === "Can't replicate" ? 'text-red-600' : ''}`}>{gem.crystalTime}</td>
                      <td className="px-4 py-3 font-bold text-green-600">{gem.goldPerDay}</td>
                      <td className="px-4 py-3 text-purple-600">{gem.gemologist}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{gem.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Crystalarium Section */}
          <h2 id="crystalarium" className="text-2xl font-bold text-blue-700 mb-4 pt-8 flex items-center gap-3">
            🔮 Crystalarium Strategy
          </h2>

          <p>
            The Crystalarium replicates any gem infinitely (except Prismatic Shard). 
            It costs <strong>99 Stone, 5 Gold Bars, 2 Iridium Bars, and 1 Battery Pack</strong>.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
            {/* Diamond Strategy */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-bold text-cyan-800 text-lg mb-2">For Maximum Gold</h3>
              <p className="font-bold text-2xl text-green-600 mb-2">Diamond</p>
              <p className="text-slate-700 text-sm mb-3">750g every 5 days = 150g/day passive income</p>
              <div className="bg-cyan-100 rounded-lg p-3 text-sm text-cyan-800">
                <strong>10 Crystalariums</strong> = 1,500g/day = 42,000g/month = <strong>504,000g/year</strong>
              </div>
            </div>

            {/* Jade Strategy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">🟢</div>
              <h3 className="font-bold text-green-800 text-lg mb-2">For Skull Cavern</h3>
              <p className="font-bold text-2xl text-green-600 mb-2">Jade</p>
              <p className="text-slate-700 text-sm mb-3">Trade 1:1 for Staircases at Desert Trader (Sundays)</p>
              <div className="bg-green-100 rounded-lg p-3 text-sm text-green-800">
                <strong>6 Crystalariums</strong> = 25-30 free Staircases/week
              </div>
            </div>

            {/* Ruby Strategy */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">🔴</div>
              <h3 className="font-bold text-red-800 text-lg mb-2">For Buff Food</h3>
              <p className="font-bold text-2xl text-red-600 mb-2">Ruby</p>
              <p className="text-slate-700 text-sm mb-3">Trade 1:1 for Spicy Eel (+1 Luck, +1 Speed)</p>
              <div className="bg-red-100 rounded-lg p-3 text-sm text-red-800">
                <strong>2-3 Crystalariums</strong> = Permanent Spicy Eel supply
              </div>
            </div>
          </div>

          {/* Crystalarium Math Box */}
          <div className="bg-slate-800 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">CRYSTALARIUM MATH</div>
              <code className="text-xl md:text-2xl font-mono text-purple-400">
                Gold/Day = Gem Price ÷ Replicate Days
              </code>
              <div className="mt-4 text-sm text-slate-300">
                Diamond: 750g ÷ 5 days = <span className="text-green-400 font-bold">150g/day</span> • 
                Jade: 200g ÷ 1.5 days = <span className="text-green-400 font-bold">133g/day</span>
              </div>
            </div>
          </div>

          {/* Geode Analysis */}
          <h2 id="geodes" className="text-2xl font-bold text-amber-700 mb-4 pt-8 flex items-center gap-3">
            🪨 Geode Analysis
          </h2>

          <p>
            Clint opens Geodes for <strong>25g each</strong>. Is it worth it?
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Geode Type</th>
                  <th className="px-4 py-4 text-left font-semibold">Found</th>
                  <th className="px-4 py-4 text-left font-semibold">Avg Value</th>
                  <th className="px-4 py-4 text-left font-semibold">Profit (- 25g fee)</th>
                  <th className="px-4 py-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {geodeData.map((geode, index) => (
                  <tr key={index} className={geode.highlight ? 'bg-purple-50 border-l-4 border-purple-400' : (index % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                    <td className="px-4 py-3 font-semibold">{geode.type}</td>
                    <td className="px-4 py-3">{geode.found}</td>
                    <td className="px-4 py-3">{geode.avgValue}</td>
                    <td className={`px-4 py-3 font-bold ${geode.highlight ? 'text-purple-600' : 'text-yellow-600'}`}>{geode.profit}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{geode.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-amber-800 text-lg mb-2">📋 Verdict</h3>
            <p className="text-amber-700">
              <strong>Open Geodes for Museum donations and artifact hunting.</strong> 
              For pure profit, they&apos;re mediocre. Omni Geodes are the only ones worth opening after completing the Museum collection.
            </p>
          </div>

          {/* Ore vs Bars */}
          <h2 id="bars" className="text-2xl font-bold text-slate-700 mb-4 pt-8 flex items-center gap-3">
            🔩 Ore vs Bar Values
          </h2>

          <p>
            Should you sell ore or smelt it into bars? <strong>Always smelt!</strong>
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Material</th>
                  <th className="px-4 py-4 text-left font-semibold">Ore Value</th>
                  <th className="px-4 py-4 text-left font-semibold">Bar Value</th>
                  <th className="px-4 py-4 text-left font-semibold">Ore Needed</th>
                  <th className="px-4 py-4 text-left font-semibold">Smelting Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {oreData.map((ore, index) => (
                  <tr key={index} className={ore.highlight ? 'bg-blue-50 border-l-4 border-blue-400' : (index % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                    <td className="px-4 py-3 font-semibold">{ore.material}</td>
                    <td className="px-4 py-3">{ore.oreValue}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{ore.barValue}</td>
                    <td className="px-4 py-3 text-sm">{ore.oreNeeded}</td>
                    <td className={`px-4 py-3 font-bold ${ore.highlight ? 'text-blue-600' : 'text-green-600'}`}>{ore.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-slate-100 to-gray-100 border-2 border-slate-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-slate-800 text-lg mb-2">💡 Pro Tip</h3>
            <p className="text-slate-700">
              <strong>Always smelt ore into bars before selling.</strong> The value doubles or more. 
              Coal costs ~150g from Clint, but you get plenty from mining. With Blacksmith profession (+50% bar value), Iridium Bars sell for <strong>1,500g each!</strong>
            </p>
          </div>

          {/* Skull Cavern Section */}
          <h2 id="skull-cavern" className="text-2xl font-bold text-red-700 mb-4 pt-8 flex items-center gap-3">
            💀 Skull Cavern Profit Runs
          </h2>

          <p>
            Deep Skull Cavern runs (floor 100+) are the most profitable mining activity:
          </p>

          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-xl p-6 my-6 not-prose shadow-md">
            <h3 className="font-bold text-purple-800 text-lg mb-4">🎯 Expected Returns (Floor 100+ run)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">50-100</div>
                <p className="text-sm text-slate-600">Iridium Ore</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">0-2</div>
                <p className="text-sm text-slate-600">Prismatic Shards</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">20-50k</div>
                <p className="text-sm text-slate-600">Gold Value</p>
              </div>
            </div>
          </div>

          {/* Skull Cavern Checklist */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">🎒 Optimal Skull Cavern Setup</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-red-400">🌶️ Food</p>
                <p className="text-slate-300 text-sm">Spicy Eel (+1 Speed, +1 Luck) or Lucky Lunch</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-orange-400">💣 Bombs</p>
                <p className="text-slate-300 text-sm">Mega Bombs from Dwarf, or craft 100+</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-green-400">🪜 Staircases</p>
                <p className="text-slate-300 text-sm">20-30 for skipping bad floors</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-yellow-400">📺 Luck Day</p>
                <p className="text-slate-300 text-sm">Check Fortune Teller—go on "spirits are happy"</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 md:col-span-2">
                <p className="font-bold text-purple-400">⏰ Timing</p>
                <p className="text-slate-300 text-sm">Warp to Desert at 6:00 AM (Desert Warp Totem or Obelisk)</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/guide/skull-cavern" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                📖 Full Skull Cavern Guide →
              </Link>
            </div>
          </div>

          {/* Gemologist Profession */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            ⭐ Gemologist Profession
          </h2>

          <p>
            At Mining Level 10, Gemologist increases gem sell prices by <strong>30%</strong>. 
            This affects all gems including those from Crystalariums.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-purple-800 text-xl mb-3">💎 Gemologist (+30% gems)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Diamond: 750g → <strong>975g</strong> (195g/day)</li>
                <li>• Ruby: 250g → <strong>325g</strong> (162g/day)</li>
                <li>• Jade: 200g → <strong>260g</strong> (173g/day)</li>
              </ul>
              <div className="mt-3 bg-purple-100 rounded-lg p-3 text-sm text-purple-800">
                Best if you focus on Crystalarium farming
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-slate-800 text-xl mb-3">⚒️ Blacksmith (+50% bars)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Copper Bar: 60g → <strong>90g</strong></li>
                <li>• Iron Bar: 120g → <strong>180g</strong></li>
                <li>• Iridium Bar: 1,000g → <strong>1,500g</strong></li>
              </ul>
              <div className="mt-3 bg-slate-100 rounded-lg p-3 text-sm text-slate-800">
                Better for Skull Cavern Iridium farming
              </div>
            </div>
          </div>

          {/* What to Keep vs Sell */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            ✅ What to Keep vs Sell
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-4">🔧 Keep These</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>First Prismatic Shard</strong> — Galaxy Sword</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Quartz</strong> — Refined Quartz for sprinklers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Fire Quartz</strong> — Refined Quartz, Slime Egg-Press</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Earth Crystal</strong> — Mayonnaise Machine, Garden Pot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Frozen Tear</strong> — Warrior Ring, Speed-Gro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Battery Pack</strong> — Iridium Sprinkler, Crystalarium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Jade & Ruby</strong> — Trades at Desert Trader</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-amber-800 text-xl mb-4">💰 Sell These</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">$</span>
                  <span className="text-slate-700"><strong>Diamond</strong> — 750g, or put in Crystalarium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">$</span>
                  <span className="text-slate-700"><strong>Extra Prismatic Shards</strong> — 2,000g each</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">$</span>
                  <span className="text-slate-700"><strong>Iridium Bars</strong> — 1,000g (after upgrades)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">$</span>
                  <span className="text-slate-700"><strong>Emerald, Aquamarine, Topaz</strong> — No special uses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">$</span>
                  <span className="text-slate-700"><strong>Most minerals</strong> — Low value, sell after Museum</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/skull-cavern" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">💀 Skull Cavern Guide</div>
                <p className="text-sm text-slate-600 mt-1">Floor 100+ strategies</p>
              </Link>
              <Link href="/?category=Minerals" className="block bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-indigo-800">💎 Mineral Prices</div>
                <p className="text-sm text-slate-600 mt-1">Complete gem & mineral values</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Early game income strategies</p>
              </Link>
              <Link href="/guide/ancient-fruit" className="block bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-violet-800">🍇 Ancient Fruit Guide</div>
                <p className="text-sm text-slate-600 mt-1">Endgame farming money</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Processing comparisons</p>
              </Link>
              <Link href="/fishing" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fishing Database</div>
                <p className="text-sm text-slate-600 mt-1">Alternative income source</p>
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
