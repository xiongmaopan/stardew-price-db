import Link from 'next/link';

export const metadata = {
  title: 'Skull Cavern Guide - Floor 100+ Strategy | Stardew Valley 1.6',
  description: 'Reach floor 100+ in Skull Cavern with optimal loadout, bomb strategies, lucky day mechanics, and Iridium farming routes. Complete Stardew Valley 1.6 guide.',
  alternates: {
    canonical: 'https://stardewpricedb.com/guide/skull-cavern/',
  },
  openGraph: {
    title: 'Skull Cavern Guide - Floor 100+ Strategy',
    description: 'Master Skull Cavern with bomb tactics, luck optimization, and proven floor 100+ strategies.',
    url: 'https://stardewpricedb.com/guide/skull-cavern/',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I reach floor 100 in Skull Cavern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for a very lucky day, warp to the Desert at 6 AM, bring 100+ Mega Bombs and 50-100 Staircases. Use staircases on monster/spiral floors, bomb open areas to find holes that skip 3-15 floors. Stack Coffee with Spicy Eel for speed and luck buffs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best weapon for Skull Cavern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Galaxy Sword is the best accessible weapon, obtained by bringing a Prismatic Shard to the Three Pillars in the Desert. The Infinity Blade (upgraded Galaxy Sword) is the ultimate weapon but requires Cinder Shards from Ginger Island.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get infinite staircases for Skull Cavern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Place Jade in Crystallariums (replicates every 1.5 days). Trade Jade to the Desert Trader on Sundays for Staircases at 1:1 ratio. With 10+ Crystallariums, you can generate 40+ staircases per week.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide/' },
    { '@type': 'ListItem', position: 3, name: 'Skull Cavern Guide' },
  ],
};

export default function SkullCavernGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide/" className="hover:text-purple-600 transition-colors">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Skull Cavern</span>
        </nav>

        <article>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 mb-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold mb-4">Skull Cavern Strategy Guide</h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Reach floor 100+ consistently with the right preparation. This guide covers optimal 
              loadouts, bomb strategies, luck mechanics, and Iridium farming techniques for Stardew Valley 1.6.
            </p>
          </div>

          {/* Requirements Alert */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-10 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <span className="text-3xl">Bus</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Unlock Requirements</h3>
                <p className="text-red-100">
                  Complete the Vault bundles (42,500g total) to repair the Bus. 
                  Skull Cavern entrance is in the northwest corner of Calico Desert.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <a href="#checklist" className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Checklist</div>
              <div className="font-semibold text-slate-700 text-sm">Pre-Run Checklist</div>
            </a>
            <a href="#loadout" className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Gear</div>
              <div className="font-semibold text-slate-700 text-sm">Loadout</div>
            </a>
            <a href="#strategy" className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Bombs</div>
              <div className="font-semibold text-slate-700 text-sm">Strategy</div>
            </a>
            <a href="#luck" className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Luck</div>
              <div className="font-semibold text-slate-700 text-sm">Luck Guide</div>
            </a>
          </div>

          {/* Pre-Run Checklist */}
          <section id="checklist" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Step 1</span> Pre-Run Checklist
            </h2>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div>
                    <div className="font-bold text-slate-800">Check TV Fortune</div>
                    <div className="text-slate-600 text-sm">Spirits are very happy is the best day for Skull Cavern</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div>
                    <div className="font-bold text-slate-800">Eat Lucky Lunch</div>
                    <div className="text-slate-600 text-sm">+3 Luck buff before warping (or Spicy Eel for +1 Luck +1 Speed)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div>
                    <div className="font-bold text-slate-800">Warp at 6:00 AM</div>
                    <div className="text-slate-600 text-sm">Use Desert Warp Totem - the Bus wastes 1 hour of mining time</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                  <div>
                    <div className="font-bold text-slate-800">Drink Coffee</div>
                    <div className="text-slate-600 text-sm">Speed buff stacks with food buffs - essential for deep runs</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Optimal Loadout */}
          <section id="loadout" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Gear</span> Optimal Loadout
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Slot</th>
                    <th className="px-4 py-3 text-left font-semibold">Best Item</th>
                    <th className="px-4 py-3 text-left font-semibold">How to Obtain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-purple-50">
                    <td className="px-4 py-3 font-medium">Weapon</td>
                    <td className="px-4 py-3 font-semibold text-purple-700">Galaxy Sword / Infinity Blade</td>
                    <td className="px-4 py-3 text-slate-600">Prismatic Shard at Desert Pillars</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Boots</td>
                    <td className="px-4 py-3 font-semibold text-purple-700">Space Boots</td>
                    <td className="px-4 py-3 text-slate-600">Skull Cavern drop (+4 Def, +4 Immunity)</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Ring 1</td>
                    <td className="px-4 py-3 font-semibold text-purple-700">Iridium Band</td>
                    <td className="px-4 py-3 text-slate-600">Craft (5 Iridium Bars) or Volcano forge</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-purple-50">
                    <td className="px-4 py-3 font-medium">Ring 2</td>
                    <td className="px-4 py-3 font-semibold text-purple-700">Lucky Ring</td>
                    <td className="px-4 py-3 text-slate-600">Special Order reward (+1 Luck)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ring Forging Callout */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">Fire</span> Ring Forging (1.5+)
              </h3>
              <p className="text-amber-700 mb-4">
                Combine two rings at the Volcano Forge for powerful hybrid effects:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="font-semibold text-amber-900 text-sm">Iridium Band + Lucky Ring</div>
                  <div className="text-amber-700 text-xs">Light, magnet, attack bonus, +1 Luck</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="font-semibold text-amber-900 text-sm">Iridium Band + Napalm Ring</div>
                  <div className="text-amber-700 text-xs">Monsters explode on death - clears floors fast</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="font-semibold text-amber-900 text-sm">Burglar Ring + Lucky Ring</div>
                  <div className="text-amber-700 text-xs">Better monster drops with luck bonus</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="font-semibold text-amber-900 text-sm">Slime Charmer + Iridium Band</div>
                  <div className="text-amber-700 text-xs">Ignore slimes completely while mining</div>
                </div>
              </div>
            </div>
          </section>

          {/* Consumables */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Bag</span> Essential Consumables
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Item</th>
                    <th className="px-4 py-3 text-left font-semibold">Effect</th>
                    <th className="px-4 py-3 text-right font-semibold">Bring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-emerald-50">
                    <td className="px-4 py-3 font-medium">Mega Bomb</td>
                    <td className="px-4 py-3 text-slate-600">Clears large area of rocks instantly</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">100+</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-emerald-50">
                    <td className="px-4 py-3 font-medium">Staircase</td>
                    <td className="px-4 py-3 text-slate-600">Skip any floor instantly</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">50-100</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Coffee</td>
                    <td className="px-4 py-3 text-slate-600">+1 Speed (stacks with food buffs)</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">10-20</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Spicy Eel</td>
                    <td className="px-4 py-3 text-slate-600">+1 Luck, +1 Speed</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">10-15</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Gold Cheese</td>
                    <td className="px-4 py-3 text-slate-600">+201 Energy, +90 Health</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">Full Stack</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Staircase Tip */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">Jade</span> Infinite Staircase Farm
              </h3>
              <p className="text-indigo-700">
                <strong>Jade + Crystallarium = Infinite Staircases.</strong> Trade Jade to the Desert Trader 
                on Sundays for 1 Staircase each. With 10 Crystallariums producing Jade, you get 40+ staircases per week.
              </p>
            </div>
          </section>

          {/* Floor Strategy */}
          <section id="strategy" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Bomb</span> Floor Strategy
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Speed Strategy */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Run</span> Speed Run (Floor 100 Goal)
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className="text-blue-800 text-sm">Staircase monster floors and spiral layouts immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className="text-blue-800 text-sm">Bomb open areas to find holes (skip 3-15 floors)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className="text-blue-800 text-sm">Only mine Iridium if you see 5+ nodes clustered</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className="text-blue-800 text-sm">Never stop to fight unless completely cornered</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <span className="text-blue-800 text-sm">Jump in holes over using ladders when possible</span>
                  </li>
                </ol>
              </div>

              {/* Farming Strategy */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Mine</span> Iridium Farming Focus
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className="text-violet-800 text-sm">Use staircases to reach floor 50+ quickly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className="text-violet-800 text-sm">Bomb every cluster of rocks you see</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className="text-violet-800 text-sm">Kill Purple Slimes for Iridium Ore drops</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className="text-violet-800 text-sm">Treasure floors (mostly rocks) are best - clear them fully</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <span className="text-violet-800 text-sm">Stay until 1:50 AM (you pass out at 2 AM)</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* DO vs DON'T */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h4 className="font-bold text-green-800 mb-4 text-lg flex items-center gap-2">DO</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Wait for spirits are very happy days</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Warp to Desert at exactly 6:00 AM</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Stack Coffee + Spicy Eel buffs</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Bomb clusters, skip single rocks</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Always jump in holes over ladders</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    <span className="text-green-500">*</span>
                    <span className="text-sm">Bring 100+ bombs minimum</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl p-6 border-2 border-red-300">
                <h4 className="font-bold text-red-800 mb-4 text-lg flex items-center gap-2">DO NOT</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Take the Bus (wastes 1 hour of time)</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Fight every monster you see</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Mine every single rock</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Forget to eat when HP drops low</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Go on bad luck days</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700">
                    <span className="text-red-500">*</span>
                    <span className="text-sm">Use pickaxe when bombs work better</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Floor Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Map</span> Floor Types
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Floor Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Appearance</th>
                    <th className="px-4 py-3 text-left font-semibold">Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-green-50">
                    <td className="px-4 py-3 font-medium">Treasure Room</td>
                    <td className="px-4 py-3 text-slate-600">Mostly rocks, few monsters</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">BOMB IT ALL - best floors for Iridium</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Monster Floor</td>
                    <td className="px-4 py-3 text-slate-600">Many enemies, few rocks</td>
                    <td className="px-4 py-3 text-slate-600">Staircase immediately if speedrunning</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Spiral Layout</td>
                    <td className="px-4 py-3 text-slate-600">Long winding narrow path</td>
                    <td className="px-4 py-3 text-slate-600">Staircase instantly - huge time waste</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Mushroom Floor</td>
                    <td className="px-4 py-3 text-slate-600">Purple Mushrooms everywhere</td>
                    <td className="px-4 py-3 text-slate-600">Harvest quickly, then staircase</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Prehistoric Floor</td>
                    <td className="px-4 py-3 text-slate-600">Pepper Rex dinosaurs</td>
                    <td className="px-4 py-3 text-slate-600">Farm for rare Dinosaur Eggs</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Slime Infestation</td>
                    <td className="px-4 py-3 text-slate-600">Covered in slimes</td>
                    <td className="px-4 py-3 text-slate-600">Napalm Ring clears fast, or staircase</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Iridium Spawn Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Iridium</span> Iridium Spawn Rates by Depth
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Floor Range</th>
                    <th className="px-4 py-3 text-left font-semibold">Iridium Chance</th>
                    <th className="px-4 py-3 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Floors 1-20</td>
                    <td className="px-4 py-3 font-semibold text-slate-500">Very Low</td>
                    <td className="px-4 py-3 text-slate-600">Skip these floors with staircases</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Floors 21-50</td>
                    <td className="px-4 py-3 font-semibold text-slate-600">Low</td>
                    <td className="px-4 py-3 text-slate-600">Occasional nodes, not worth stopping</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium">Floors 51-100</td>
                    <td className="px-4 py-3 font-semibold text-blue-600">Medium</td>
                    <td className="px-4 py-3 text-slate-600">Decent spawns, bomb if 5+ nodes visible</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-purple-50">
                    <td className="px-4 py-3 font-medium">Floors 100+</td>
                    <td className="px-4 py-3 font-semibold text-purple-600">High</td>
                    <td className="px-4 py-3 text-slate-600">Iridium everywhere - farm these floors</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-purple-50">
                    <td className="px-4 py-3 font-medium">Floors 200+</td>
                    <td className="px-4 py-3 font-semibold text-purple-700">Very High</td>
                    <td className="px-4 py-3 text-slate-600">Maximum density, but very dangerous</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Luck Mechanics */}
          <section id="luck" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Clover</span> Luck Mechanics
            </h2>

            <p className="text-slate-600 mb-6">
              Daily Luck affects hole spawn rates, Iridium node frequency, and monster drops. 
              Check the TV Fortune Teller every morning before planning a Skull Cavern run.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">TV Fortune</th>
                    <th className="px-4 py-3 text-left font-semibold">Daily Luck</th>
                    <th className="px-4 py-3 text-left font-semibold">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-green-50">
                    <td className="px-4 py-3 font-medium">Spirits are very happy</td>
                    <td className="px-4 py-3 text-slate-600">+0.07 to +0.10</td>
                    <td className="px-4 py-3 font-bold text-green-600">BEST DAY - go now!</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-blue-50">
                    <td className="px-4 py-3 font-medium">Good humor today</td>
                    <td className="px-4 py-3 text-slate-600">+0.02 to +0.07</td>
                    <td className="px-4 py-3 font-bold text-blue-600">Good day for runs</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-medium">Neutral</td>
                    <td className="px-4 py-3 text-slate-600">-0.02 to +0.02</td>
                    <td className="px-4 py-3 font-bold text-slate-600">OK with luck food buffs</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-orange-50">
                    <td className="px-4 py-3 font-medium">Spirits are annoyed</td>
                    <td className="px-4 py-3 text-slate-600">-0.02 to -0.07</td>
                    <td className="px-4 py-3 font-bold text-orange-600">Skip - do farm chores</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-red-50">
                    <td className="px-4 py-3 font-medium">Very displeased</td>
                    <td className="px-4 py-3 text-slate-600">-0.07 to -0.10</td>
                    <td className="px-4 py-3 font-bold text-red-600">DO NOT GO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mr. Qi Challenge */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <span className="text-4xl">Target</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">Mr. Qi Challenge: Reach Floor 100</h3>
                  <p className="text-cyan-100 mb-4">
                    After completing the Community Center or JojaMart, Mr. Qi challenges you to reach 
                    floor 100 without using more than 10 staircases. The reward is worth it!
                  </p>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Tip:</strong> This challenge requires perfect luck day timing, maximum bombs, 
                      and aggressive hole-hunting. Save staircases only for spiral/monster floors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">Books</span> Related Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guide/mining-profit/" className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Pick</div>
                <div className="font-bold text-purple-600 group-hover:text-purple-700">Mining Profit Guide</div>
                <div className="text-sm text-slate-500">Regular mines strategy</div>
              </Link>
              <Link href="/guide/keg-vs-jar/" className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Keg</div>
                <div className="font-bold text-purple-600 group-hover:text-purple-700">Keg vs Jar</div>
                <div className="text-sm text-slate-500">Process your crops</div>
              </Link>
              <Link href="/guide/year-1-money/" className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg transition-all group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">Gold</div>
                <div className="font-bold text-purple-600 group-hover:text-purple-700">Year 1 Money</div>
                <div className="text-sm text-slate-500">Fund your Skull Cavern runs</div>
              </Link>
            </div>
          </section>

          {/* Back Link */}
          <div className="text-center pt-8 border-t border-slate-200">
            <Link href="/guide/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors">
              Back to All Guides
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}