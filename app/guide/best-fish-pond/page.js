import Link from 'next/link';

export const metadata = {
  title: 'Best Fish Pond Choices for Profit - Stardew Valley 1.6 Guide',
  description: 'Which fish make the most money in Fish Ponds? Complete analysis of roe values, Caviar vs Aged Roe, and optimal pond strategies for Stardew Valley 1.6.',
  alternates: {
    canonical: '/guide/best-fish-pond',
  },
  openGraph: {
    title: 'Best Fish Pond Choices - Stardew Valley 1.6',
    description: 'Sturgeon Caviar, Lava Eel roe, and more. Complete Fish Pond profit analysis.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/best-fish-pond#article',
      headline: 'Best Fish Pond Choices for Maximum Profit',
      description: 'Complete Fish Pond profit analysis including roe values and optimal fish choices.',
      image: 'https://stardewpricedb.com/og-image.png',
      datePublished: '2025-12-14',
      dateModified: '2025-06-21',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: 'https://stardewpricedb.com' },
      publisher: { '@type': 'Organization', name: 'StardewPriceDB', logo: { '@type': 'ImageObject', url: 'https://stardewpricedb.com/favicon.svg' } },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/best-fish-pond'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide' },
        { '@type': 'ListItem', position: 3, name: 'Best Fish Pond' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best fish for Fish Ponds in Stardew Valley?',
          acceptedAnswer: { '@type': 'Answer', text: 'Lava Eel has the highest roe value (380g raw, 532g Aged Roe, 745g with Artisan). Sturgeon is second best because its roe becomes Caviar (500g, 700g Artisan) without aging. Blob Fish is also excellent due to Pearl drops worth 2,500g each.' }
        },
        {
          '@type': 'Question',
          name: 'Is Caviar or Aged Roe more valuable?',
          acceptedAnswer: { '@type': 'Answer', text: 'It depends on the fish. Sturgeon Roe becomes Caviar (500g fixed, 700g Artisan). Lava Eel Aged Roe is 532g (745g Artisan). Overall, Lava Eel Aged Roe with Artisan profession produces the highest value.' }
        },
        {
          '@type': 'Question',
          name: 'How many Fish Ponds should I build?',
          acceptedAnswer: { '@type': 'Answer', text: 'Recommended: 6 ponds. 2 Lava Eel, 2 Sturgeon, 1 Blob Fish (Pearl drops), 1 Super Cucumber (Iridium Ore). This provides ~50,000-70,000g monthly passive income with minimal effort.' }
        },
        {
          '@type': 'Question',
          name: 'How do Fish Ponds work in Stardew Valley?',
          acceptedAnswer: { '@type': 'Answer', text: 'Each Fish Pond holds one species. Population grows to max 10 by completing item requests. Fish produce roe daily based on population. Roe value = 30 + (Fish Base Price ÷ 2). Process roe in Preserves Jar for Aged Roe worth double plus 40g bonus.' }
        }
      ]
    }
  ]
};

// Fish Pond Data
const fishPondRankings = [
  { fish: 'Lava Eel', basePrice: '700g', roeValue: '380g', agedRoe: '532g', artisan: '745g', special: 'Magma Geode, Gold Ore, Spicy Eel', difficulty: 'Hard', highlight: 'gold' },
  { fish: 'Sturgeon', basePrice: '200g', roeValue: '130g', agedRoe: 'Caviar: 500g', artisan: '700g', special: 'Universal loved gift', difficulty: 'Medium', highlight: 'blue' },
  { fish: 'Blob Fish', basePrice: '500g', roeValue: '280g', agedRoe: '392g', artisan: '549g', special: 'Pearl (2,500g!), Warp Totem', difficulty: 'Hard', highlight: 'purple' },
  { fish: 'Ice Pip', basePrice: '500g', roeValue: '280g', agedRoe: '392g', artisan: '549g', special: 'Iron Ore, Frozen Geode', difficulty: 'Medium', highlight: '' },
  { fish: 'Super Cucumber', basePrice: '250g', roeValue: '155g', agedRoe: '217g', artisan: '304g', special: 'Iridium Ore, Amethyst', difficulty: 'Medium', highlight: '' },
  { fish: 'Midnight Carp', basePrice: '150g', roeValue: '105g', agedRoe: '147g', artisan: '206g', special: '—', difficulty: 'Easy', highlight: '' },
  { fish: 'Rainbow Trout', basePrice: '65g', roeValue: '62g', agedRoe: '86g', artisan: '120g', special: 'Prismatic Shard (0.09%!)', difficulty: 'Easy', highlight: '' },
];

const populationQuests = [
  { fish: 'Lava Eel', pop3: 'Fire Quartz ×3', pop5: 'Basalt ×2', pop7: 'Magma Geode ×10' },
  { fish: 'Sturgeon', pop3: 'Diamond ×1', pop5: 'Jelly/Pickles/Maple Syrup ×1', pop7: 'Omni Geode ×3' },
  { fish: 'Blob Fish', pop3: 'Coral ×5', pop5: 'Frozen Tear ×5', pop7: 'Cookie ×1' },
  { fish: 'Super Cucumber', pop3: 'Amethyst ×3', pop5: 'Omni Geode ×1', pop7: 'Iridium Ore ×3' },
];

const specialDrops = [
  { fish: 'Blob Fish', drop: 'Pearl', value: '2,500g', chance: '~1% at pop 9+', highlight: true },
  { fish: 'Rainbow Trout', drop: 'Prismatic Shard', value: 'Priceless', chance: '0.09%', highlight: true },
  { fish: 'Lava Eel', drop: 'Spicy Eel', value: 'Buff food', chance: 'Common', highlight: false },
  { fish: 'Super Cucumber', drop: 'Iridium Ore', value: '100g each', chance: 'Common', highlight: false },
  { fish: 'Octopus', drop: 'Omni Geode', value: 'Artifacts', chance: 'Common', highlight: false },
];

export default function BestFishPondGuide() {
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
          <span className="text-slate-800 font-medium">Best Fish Pond</span>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              🐟 Passive Income
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              v1.6 Verified
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            🐟 Best Fish Pond Choices for Maximum Profit
          </h1>
          <p className="text-lg md:text-xl text-cyan-100 max-w-3xl">
            Fish Ponds are passive income machines. Put in the right fish, and they produce valuable roe daily. Here&apos;s which fish generate the most gold per day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              💰 50-70k/month passive
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              ⚙️ Minimal daily effort
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              💎 Rare item drops
            </span>
          </div>
        </div>

        {/* Key Stats Box */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
            👑 Top 3 Fish Pond Choices
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-300 shadow-sm text-center">
              <div className="text-3xl mb-2">🔥</div>
              <p className="font-bold text-slate-800">#1 Lava Eel</p>
              <p className="text-lg font-bold text-amber-600">745g/roe</p>
              <p className="text-xs text-slate-500 mt-1">Aged Roe + Artisan</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-300 shadow-sm text-center">
              <div className="text-3xl mb-2">🥚</div>
              <p className="font-bold text-slate-800">#2 Sturgeon</p>
              <p className="text-lg font-bold text-blue-600">700g Caviar</p>
              <p className="text-xs text-slate-500 mt-1">No aging needed!</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-300 shadow-sm text-center">
              <div className="text-3xl mb-2">💎</div>
              <p className="font-bold text-slate-800">#3 Blob Fish</p>
              <p className="text-lg font-bold text-purple-600">Pearl drops!</p>
              <p className="text-xs text-slate-500 mt-1">2,500g rare bonus</p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <a href="#rankings" className="bg-cyan-100 hover:bg-cyan-200 text-cyan-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            📊 Full Rankings
          </a>
          <a href="#sturgeon" className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🐟 Sturgeon Strategy
          </a>
          <a href="#lava-eel" className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🔥 Lava Eel Strategy
          </a>
          <a href="#setup" className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            🏠 Optimal Setup
          </a>
          <a href="#drops" className="bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
            💎 Special Drops
          </a>
        </div>

        <article className="prose prose-slate prose-lg max-w-none">
          
          {/* How Fish Ponds Work */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4">How Fish Ponds Work</h2>
          
          <p>
            Each Fish Pond holds one fish species. As population grows (max 10), fish produce roe and special items:
          </p>

          <div className="grid md:grid-cols-4 gap-4 my-8 not-prose">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">🐟</div>
              <h3 className="font-bold text-blue-800 text-sm mb-1">Population</h3>
              <p className="text-xs text-slate-600">Grows to 10 via item quests</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">🥚</div>
              <h3 className="font-bold text-yellow-800 text-sm mb-1">Roe Production</h3>
              <p className="text-xs text-slate-600">Daily chance, scales with pop</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-bold text-green-800 text-sm mb-1">Roe Value</h3>
              <p className="text-xs text-slate-600">30 + (Base Price ÷ 2)</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">⚗️</div>
              <h3 className="font-bold text-purple-800 text-sm mb-1">Aged Roe</h3>
              <p className="text-xs text-slate-600">Process in Jar for 2x+ value</p>
            </div>
          </div>

          {/* Roe Formula Box */}
          <div className="bg-slate-800 text-white rounded-xl p-6 my-6 not-prose shadow-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">ROE VALUE FORMULA</div>
              <code className="text-xl md:text-2xl font-mono text-cyan-400">
                Aged Roe = (Roe + 40) × 2 × 1.4 (Artisan)
              </code>
              <div className="mt-4 text-sm text-slate-300">
                Example: Lava Eel 380g roe → (380+40)×2 = 532g → ×1.4 = <span className="text-green-400 font-bold">745g</span>
              </div>
            </div>
          </div>

          {/* Fish Pond Rankings Table */}
          <h2 id="rankings" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            📊 Complete Fish Pond Profit Rankings
          </h2>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Fish</th>
                  <th className="px-4 py-4 text-left font-semibold">Base Price</th>
                  <th className="px-4 py-4 text-left font-semibold">Roe</th>
                  <th className="px-4 py-4 text-left font-semibold">Aged Roe</th>
                  <th className="px-4 py-4 text-left font-semibold">+ Artisan</th>
                  <th className="px-4 py-4 text-left font-semibold">Special Drops</th>
                  <th className="px-4 py-4 text-left font-semibold">Catch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {fishPondRankings.map((fish, index) => {
                  const highlightColors = {
                    gold: 'bg-amber-50 border-l-4 border-amber-400',
                    blue: 'bg-blue-50 border-l-4 border-blue-400',
                    purple: 'bg-purple-50 border-l-4 border-purple-400',
                  };
                  const difficultyColors = {
                    Easy: 'text-green-600',
                    Medium: 'text-yellow-600',
                    Hard: 'text-red-600',
                  };
                  return (
                    <tr key={index} className={`${fish.highlight ? highlightColors[fish.highlight] || '' : ''} hover:bg-slate-50 transition-colors`}>
                      <td className="px-4 py-3 font-bold text-slate-800">{fish.fish}</td>
                      <td className="px-4 py-3">{fish.basePrice}</td>
                      <td className="px-4 py-3">{fish.roeValue}</td>
                      <td className="px-4 py-3">{fish.agedRoe}</td>
                      <td className="px-4 py-3 font-bold text-green-600">{fish.artisan}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{fish.special}</td>
                      <td className={`px-4 py-3 font-medium ${difficultyColors[fish.difficulty]}`}>{fish.difficulty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sturgeon Section */}
          <h2 id="sturgeon" className="text-2xl font-bold text-blue-700 mb-4 pt-8 flex items-center gap-3">
            🐟 The Sturgeon Strategy (Best for Most Players)
          </h2>

          <p>
            Sturgeon deserve special mention because of <strong>Caviar</strong>:
          </p>

          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-2xl p-8 my-8 not-prose shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🐟</span>
              <div>
                <h3 className="font-extrabold text-blue-900 text-2xl">Sturgeon → Caviar Pipeline</h3>
                <p className="text-blue-700">The easiest high-profit fish pond</p>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-slate-600">130g</div>
                <p className="text-sm text-slate-600">Sturgeon Roe</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">500g</div>
                <p className="text-sm text-slate-600">Caviar</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">700g</div>
                <p className="text-sm text-slate-600">Caviar + Artisan</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">~7,000g</div>
                <p className="text-sm text-slate-600">Monthly/pond</p>
              </div>
            </div>
            <div className="mt-6 bg-blue-200/50 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Why Sturgeon?</strong> Easier to catch than Lava Eels. Mountain Lake, Summer/Winter. 
                Caviar is also a <strong>universal loved gift</strong>—perfect for befriending villagers!
              </p>
            </div>
          </div>

          {/* Lava Eel Section */}
          <h2 id="lava-eel" className="text-2xl font-bold text-amber-700 mb-4 pt-8 flex items-center gap-3">
            🔥 The Lava Eel Strategy (Maximum Profit)
          </h2>

          <p>
            Lava Eels have the <strong>highest roe value in the game</strong>, but they&apos;re hard to catch:
          </p>

          <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 border-2 border-amber-400 rounded-2xl p-8 my-8 not-prose shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🔥</span>
              <div>
                <h3 className="font-extrabold text-amber-900 text-2xl">Lava Eel: King of Roe</h3>
                <p className="text-amber-700">Highest value but hardest to catch</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/80 rounded-lg p-5">
                <h4 className="font-bold text-amber-800 mb-3">📍 Where to Catch</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Floor 100 of the Mines (lava pool)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Volcano Caldera (Ginger Island)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Difficulty: 90 (one of the hardest!)
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 rounded-lg p-5">
                <h4 className="font-bold text-amber-800 mb-3">💡 Catching Tips</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Use Cork Bobber (+fishing bar size)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Eat Dish o&apos; The Sea (+3 Fishing)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Only need ONE to start a pond!
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-amber-200/50 rounded-lg p-4">
              <p className="text-amber-800">
                <strong>At population 10:</strong> Lava Eel Roe 380g → Aged 532g → <strong>Artisan 745g per roe!</strong><br/>
                Plus bonus drops: Magma Geode, Gold Ore, Spicy Eel (great buff food).
              </p>
            </div>
          </div>

          {/* Blob Fish Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6 my-8 not-prose shadow-md">
            <h3 className="font-bold text-purple-800 text-xl mb-3 flex items-center gap-2">
              💎 Blob Fish: The Sleeper Pick
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Roe value:</strong> 280g → 392g Aged → 549g Artisan</p>
                <p className="text-slate-700 mb-2"><strong>Pearl drops!</strong> Pearls sell for 2,500g each</p>
                <p className="text-slate-700"><strong>Catch at:</strong> Night Market submarine (Winter 15-17)</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>Pro Tip:</strong> Even if you only get 1-2 Pearl drops per year, that&apos;s 2,500-5,000g bonus on top of regular roe income. Plus Warp Totem: Farm drops for utility!
                </p>
              </div>
            </div>
          </div>

          {/* Population Quests */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            📋 Population Quest Requirements
          </h2>

          <p>
            Fish request specific items to increase population. Prepare these in advance:
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Fish</th>
                  <th className="px-4 py-4 text-left font-semibold">Pop 3 Quest</th>
                  <th className="px-4 py-4 text-left font-semibold">Pop 5 Quest</th>
                  <th className="px-4 py-4 text-left font-semibold">Pop 7 Quest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {populationQuests.map((quest, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{quest.fish}</td>
                    <td className="px-4 py-3">{quest.pop3}</td>
                    <td className="px-4 py-3">{quest.pop5}</td>
                    <td className="px-4 py-3">{quest.pop7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Special Drops */}
          <h2 id="drops" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            💎 Special Item Drops Worth Noting
          </h2>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Fish</th>
                  <th className="px-4 py-4 text-left font-semibold">Special Drop</th>
                  <th className="px-4 py-4 text-left font-semibold">Value/Use</th>
                  <th className="px-4 py-4 text-left font-semibold">Chance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {specialDrops.map((drop, index) => (
                  <tr key={index} className={drop.highlight ? 'bg-yellow-50' : (index % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                    <td className="px-4 py-3 font-semibold">{drop.fish}</td>
                    <td className={`px-4 py-3 ${drop.highlight ? 'font-bold text-purple-600' : ''}`}>{drop.drop}</td>
                    <td className="px-4 py-3">{drop.value}</td>
                    <td className="px-4 py-3 text-sm">{drop.chance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How Many Ponds */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            🤔 How Many Fish Ponds Should You Build?
          </h2>

          <p>
            Fish Ponds cost 5,000g + 200 Stone + 5 Seaweed + 5 Green Algae. They take 3×3 tiles.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 shadow-md">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Early Game</span>
              <h3 className="font-bold text-green-800 text-lg mt-3">1-2 Ponds</h3>
              <p className="text-slate-600 text-sm mt-2">Start with 1 Sturgeon pond. Easy to set up, reliable Caviar income.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-5 shadow-md">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Mid Game</span>
              <h3 className="font-bold text-blue-800 text-lg mt-3">3-5 Ponds</h3>
              <p className="text-slate-600 text-sm mt-2">Add Lava Eel and Blob Fish ponds. Diversify your roe production.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-5 shadow-md">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">End Game</span>
              <h3 className="font-bold text-purple-800 text-lg mt-3">6+ Ponds</h3>
              <p className="text-slate-600 text-sm mt-2">Fill unused farm space. 6 Lava Eel ponds = ~60,000g/month passive!</p>
            </div>
          </div>

          {/* Optimal Setup */}
          <h2 id="setup" className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            🏠 Optimal Fish Pond Setup
          </h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 my-8 not-prose shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Recommended Setup (6 Ponds)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-amber-400">🔥 2× Lava Eel</p>
                <p className="text-slate-300 text-sm">Highest roe value + Spicy Eel drops</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-blue-400">🐟 2× Sturgeon</p>
                <p className="text-slate-300 text-sm">Reliable Caviar, universal loved gift</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-purple-400">💎 1× Blob Fish</p>
                <p className="text-slate-300 text-sm">Pearl chance (2,500g bonus!)</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold text-cyan-400">🥒 1× Super Cucumber</p>
                <p className="text-slate-300 text-sm">Iridium Ore drops</p>
              </div>
            </div>
            <div className="mt-6 text-center bg-green-500/20 rounded-lg p-4">
              <p className="text-green-300 font-bold text-xl">
                💰 Estimated Monthly: 50,000-70,000g (passive!)
              </p>
            </div>
          </div>

          {/* Fish Pond vs Other Income */}
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pt-8 flex items-center gap-3">
            ⚖️ Fish Ponds vs Other Passive Income
          </h2>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Source</th>
                  <th className="px-4 py-4 text-left font-semibold">Monthly Income</th>
                  <th className="px-4 py-4 text-left font-semibold">Daily Effort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-cyan-50">
                  <td className="px-4 py-3 font-semibold">Fish Pond (Lava Eel)</td>
                  <td className="px-4 py-3">~8,000g per pond</td>
                  <td className="px-4 py-3 text-green-600 font-medium">Very Low ✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Bee House (Fairy Rose)</td>
                  <td className="px-4 py-3">~5,000g per house</td>
                  <td className="px-4 py-3 text-green-600">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Ancient Fruit (Greenhouse)</td>
                  <td className="px-4 py-3">~200,000g total (116 plants)</td>
                  <td className="px-4 py-3 text-yellow-600">Medium (Kegging)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Barn Animals (Pigs)</td>
                  <td className="px-4 py-3">~50,000g per barn</td>
                  <td className="px-4 py-3 text-yellow-600">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Fish Ponds are <strong>truly passive</strong>—no daily harvesting like crops. Just collect roe when the bucket icon appears!
          </p>

          {/* Do/Don't Cards */}
          <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-green-800 text-xl mb-4">✅ DO</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Always process roe</strong> in Preserves Jar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Get Artisan profession</strong> for +40% bonus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Stock quest items</strong> before starting pond</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-slate-700"><strong>Start with Sturgeon</strong> if Lava Eel is too hard</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-red-800 text-xl mb-4">❌ DON&apos;T</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Sell raw roe</strong>—always age it first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Use common fish</strong>—low roe value not worth it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Ignore population quests</strong>—more fish = more roe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-slate-700"><strong>Forget about drops</strong>—check ponds daily for items</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/fishing" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fish Database</div>
                <p className="text-sm text-slate-600 mt-1">All fish locations & prices</p>
              </Link>
              <Link href="/guide/year-1-money" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Complete first-year strategy</p>
              </Link>
              <Link href="/guide/animal-profit" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🐄 Animal Profit Guide</div>
                <p className="text-sm text-slate-600 mt-1">Barn & coop income analysis</p>
              </Link>
              <Link href="/guide/keg-vs-jar" className="block bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-orange-800">🍷 Keg vs Jar</div>
                <p className="text-sm text-slate-600 mt-1">Which processing is better?</p>
              </Link>
              <Link href="/guide/ancient-fruit" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">🍇 Ancient Fruit Guide</div>
                <p className="text-sm text-slate-600 mt-1">The ultimate endgame crop</p>
              </Link>
              <Link href="/guide/greenhouse-layout" className="block bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-teal-800">🏠 Greenhouse Layout</div>
                <p className="text-sm text-slate-600 mt-1">Maximize your greenhouse</p>
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
