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
        text: 'Wait for a very lucky day (spirits are very happy), warp to the Desert at 6 AM using a Desert Warp Totem, bring 100+ Mega Bombs and 50-100 Staircases. Use staircases on monster/spiral floors, bomb open areas to find shafts that skip 3-15 floors. Stack Coffee with Spicy Eel for speed and luck buffs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best weapon for Skull Cavern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Galaxy Sword is the best accessible weapon, obtained by bringing a Prismatic Shard to the Three Pillars in the Calico Desert. The Infinity Blade (upgraded Galaxy Sword at Volcano Forge) is the ultimate weapon but requires Cinder Shards from Ginger Island.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get unlimited staircases for Skull Cavern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Place Jade in Crystallariums (replicates every 1 day 14 hours). Trade Jade to the Desert Trader on Sundays for Staircases at 1:1 ratio. With 10+ Crystallariums producing Jade, you can generate 40+ staircases per week for free.',
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
            <h1 className="text-4xl font-bold mb-4">💀 Skull Cavern Strategy Guide</h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Reach floor 100+ consistently with the right preparation. This guide covers optimal 
              loadouts, bomb strategies, luck mechanics, and Iridium farming techniques for Stardew Valley 1.6.
            </p>
          </div>

          {/* Requirements Alert */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-10 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🚌</span>
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
            {[
              { icon: '📋', label: 'Pre-Run Checklist', href: '#checklist' },
              { icon: '⚔️', label: 'Loadout', href: '#loadout' },
              { icon: '💣', label: 'Strategy', href: '#strategy' },
              { icon: '🍀', label: 'Luck Guide', href: '#luck' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-semibold text-slate-700 text-sm">{item.label}</div>
              </a>
            ))}
          </div>

          {/* Pre-Run Checklist */}
          <section id="checklist" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">📋</span> Pre-Run Checklist
            </h2>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
              <div className="grid gap-4">
                {[
                  { step: 1, icon: '📺', title: 'Check TV Fortune', desc: '"Spirits are very happy" is the best day for Skull Cavern' },
                  { step: 2, icon: '🍀', title: 'Eat Lucky Lunch', desc: '+3 Luck buff before warping (or Spicy Eel for +1 Luck +1 Speed)' },
                  { step: 3, icon: '✨', title: 'Warp at 6:00 AM', desc: 'Use Desert Warp Totem - Bus arrives at 10:00 AM (loses 4 hours of mining)' },
                  { step: 4, icon: '☕', title: 'Drink Coffee', desc: 'Speed buff stacks with food buffs - essential for deep runs' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <span>{item.icon}</span> {item.title}
                      </div>
                      <div className="text-slate-600 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Optimal Loadout */}
          <section id="loadout" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">⚔️</span> Optimal Loadout
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
                  {[
                    { slot: '🗡️ Weapon', item: 'Galaxy Sword / Infinity Blade', how: 'Prismatic Shard at Desert Pillars', highlight: true },
                    { slot: '👢 Boots', item: 'Space Boots', how: 'Skull Cavern drop (+4 Def, +4 Immunity)' },
                    { slot: '💍 Ring 1', item: 'Iridium Band', how: 'Craft (5 Iridium Bars) or Volcano forge' },
                    { slot: '💍 Ring 2', item: 'Lucky Ring', how: "Special Order reward (+1 Luck)", highlight: true },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.highlight ? 'bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium">{row.slot}</td>
                      <td className="px-4 py-3 font-semibold text-purple-700">{row.item}</td>
                      <td className="px-4 py-3 text-slate-600">{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ring Forging Callout */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔥</span> Ring Forging (1.5+)
              </h3>
              <p className="text-amber-700 mb-4">
                Combine two rings at the Volcano Forge for powerful hybrid effects:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { combo: 'Iridium Band + Lucky Ring', effect: 'Light, magnet, attack bonus, +1 Luck' },
                  { combo: 'Iridium Band + Napalm Ring', effect: 'Monsters explode on death - clears floors fast' },
                  { combo: 'Burglar Ring + Lucky Ring', effect: 'Better monster drops with luck bonus' },
                  { combo: 'Slime Charmer + Iridium Band', effect: 'Ignore slimes completely while mining' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-3">
                    <div className="font-semibold text-amber-900 text-sm">{item.combo}</div>
                    <div className="text-amber-700 text-xs">{item.effect}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Consumables */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">🎒</span> Essential Consumables
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
                  {[
                    { item: '💣 Mega Bomb', effect: 'Clears large area of rocks instantly', qty: '100+', critical: true },
                    { item: '🪜 Staircase', effect: 'Skip any floor instantly', qty: '50-100', critical: true },
                    { item: '☕ Coffee', effect: '+1 Speed (stacks with food buffs)', qty: '10-20' },
                    { item: '🌶️ Spicy Eel', effect: '+1 Luck, +1 Speed', qty: '10-15' },
                    { item: '🧀 Gold Cheese', effect: '+201 Energy, +90 Health', qty: 'Full Stack' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.critical ? 'bg-emerald-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium">{row.item}</td>
                      <td className="px-4 py-3 text-slate-600">{row.effect}</td>
                      <td className={`px-4 py-3 text-right font-bold ${row.critical ? 'text-emerald-600' : 'text-slate-700'}`}>{row.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Staircase Tip */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💎</span> Infinite Staircase Farm
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
              <span className="text-purple-500">💣</span> Floor Strategy
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Speed Strategy */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏃</span> Speed Run (Floor 100 Goal)
                </h3>
                <ol className="space-y-3">
                  {[
                    'Staircase monster floors and spiral layouts immediately',
                    'Bomb open areas to find holes (skip 3-15 floors)',
                    'Only mine Iridium if you see 5+ nodes clustered',
                    'Never stop to fight unless completely cornered',
                    'Jump in holes over using ladders when possible',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-blue-800 text-sm">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Farming Strategy */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200">
                <h3 className="font-bold text-violet-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⛏️</span> Iridium Farming Focus
                </h3>
                <ol className="space-y-3">
                  {[
                    'Use staircases to reach floor 50+ quickly',
                    'Bomb every cluster of rocks you see',
                    'Kill Purple Slimes for Iridium Ore drops',
                    'Treasure floors (mostly rocks) are best - clear them fully',
                    'Stay until 1:50 AM (you pass out at 2 AM)',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-violet-800 text-sm">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* DO vs DON'T */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                <h4 className="font-bold text-green-800 mb-4 text-lg flex items-center gap-2">
                  ✅ DO
                </h4>
                <ul className="space-y-2">
                  {[
                    'Wait for "spirits are very happy" days',
                    'Warp to Desert at exactly 6:00 AM',
                    'Stack Coffee + Spicy Eel buffs',
                    'Bomb clusters, skip single rocks',
                    'Always jump in holes over ladders',
                    'Bring 100+ bombs minimum',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-green-700">
                      <span className="text-green-500">●</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl p-6 border-2 border-red-300">
                <h4 className="font-bold text-red-800 mb-4 text-lg flex items-center gap-2">
                  ❌ DO NOT
                </h4>
                <ul className="space-y-2">
                  {[
                    'Take the Bus (arrives at 10 AM, wastes 4 hours)',
                    'Fight every monster you see',
                    'Mine every single rock',
                    'Forget to eat when HP drops low',
                    'Go on bad luck days',
                    'Use pickaxe when bombs work better',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-red-700">
                      <span className="text-red-500">●</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Floor Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">🗺️</span> Floor Types
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
                  {[
                    { type: '💎 Treasure Room', look: 'Mostly rocks, few monsters', strat: 'BOMB IT ALL - best floors for Iridium', good: true },
                    { type: '👹 Monster Floor', look: 'Many enemies, few rocks', strat: 'Staircase immediately if speedrunning' },
                    { type: '🌀 Spiral Layout', look: 'Long winding narrow path', strat: 'Staircase instantly - huge time waste' },
                    { type: '🍄 Mushroom Floor', look: 'Purple Mushrooms everywhere', strat: 'Harvest quickly, then staircase' },
                    { type: '🦖 Prehistoric Floor', look: 'Pepper Rex dinosaurs', strat: 'Farm for rare Dinosaur Eggs' },
                    { type: '🟣 Slime Infestation', look: 'Covered in slimes', strat: 'Napalm Ring clears fast, or staircase' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.good ? 'bg-green-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium">{row.type}</td>
                      <td className="px-4 py-3 text-slate-600">{row.look}</td>
                      <td className={`px-4 py-3 ${row.good ? 'text-green-700 font-semibold' : 'text-slate-600'}`}>{row.strat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Iridium Spawn Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">💜</span> Iridium Spawn Rates by Depth
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
                  {[
                    { range: 'Floors 1-20', chance: 'Very Low', notes: 'Skip these floors with staircases', color: 'text-slate-500' },
                    { range: 'Floors 21-50', chance: 'Low', notes: 'Occasional nodes, not worth stopping', color: 'text-slate-600' },
                    { range: 'Floors 51-100', chance: 'Medium', notes: 'Decent spawns, bomb if 5+ nodes visible', color: 'text-blue-600' },
                    { range: 'Floors 100+', chance: 'High', notes: 'Iridium everywhere - farm these floors', color: 'text-purple-600', highlight: true },
                    { range: 'Floors 200+', chance: 'Very High', notes: 'Maximum density, but very dangerous', color: 'text-purple-700', highlight: true },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.highlight ? 'bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium">{row.range}</td>
                      <td className={`px-4 py-3 font-semibold ${row.color}`}>{row.chance}</td>
                      <td className="px-4 py-3 text-slate-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Luck Mechanics */}
          <section id="luck" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">🍀</span> Luck Mechanics
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
                <tbody>                  {[
                    { fortune: '✨ Spirits are very happy', luck: '+0.07 to +0.10', rec: 'BEST DAY - go now!', color: 'text-green-600', bg: 'bg-green-50' },
                    { fortune: '😊 Good humor today', luck: '+0.02 to +0.07', rec: 'Good day for runs', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { fortune: '😐 Neutral', luck: '-0.02 to +0.02', rec: 'OK with luck food buffs', color: 'text-slate-600', bg: 'bg-slate-50' },
                    { fortune: '😠 Spirits are annoyed', luck: '-0.07 to -0.02', rec: 'Skip - do farm chores', color: 'text-orange-600', bg: 'bg-orange-50' },
                    { fortune: '💢 Very displeased', luck: '-0.10 to -0.07', rec: 'DO NOT GO', color: 'text-red-600', bg: 'bg-red-50' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.bg}`}>
                      <td className="px-4 py-3 font-medium">{row.fortune}</td>
                      <td className="px-4 py-3 text-slate-600">{row.luck}</td>
                      <td className={`px-4 py-3 font-bold ${row.color}`}>{row.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>          {/* Mr. Qi Challenges */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">🎯</span> Mr. Qi&apos;s Challenges
            </h2>
            
            <div className="grid gap-4">
              {/* Qi's Challenge - Floor 25 */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📜</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Qi&apos;s Challenge: Reach Floor 25</h3>
                    <p className="text-cyan-100 mb-2">
                      After your first Skull Cavern visit, Mr. Qi sends a letter challenging you to reach 
                      floor 25. Completing this awards <strong>10,000g</strong> by mail.
                    </p>
                    <p className="text-cyan-200 text-sm">
                      Tip: This is easy with 25 staircases. Complete it early to get the gold reward.
                    </p>
                  </div>
                </div>
              </div>

              {/* Qi's Hungry Challenge - Floor 100 */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🍽️</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Qi&apos;s Hungry Challenge: Floor 100 (No Food)</h3>
                    <p className="text-purple-100 mb-2">
                      A Special Order from Qi&apos;s Walnut Room on Ginger Island. Reach floor 100 
                      <strong> without eating or drinking anything</strong>. Extremely difficult!
                    </p>
                    <div className="bg-white/20 rounded-lg p-3 mt-3">
                      <p className="text-sm">
                        <strong>Strategy:</strong> Use 100+ staircases to skip most floors. Bring Napalm Ring 
                        to kill monsters without taking damage. Galaxy Sword + Iridium Band essential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Related Guides */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-purple-500">📚</span> Related Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { href: '/guide/mining-profit/', icon: '⛏️', title: 'Mining Profit Guide', desc: 'Gem values & Crystalarium strategy' },
                { href: '/guide/year-1-money/', icon: '💰', title: 'Year 1 Money', desc: 'Fund your Skull Cavern runs' },
                { href: '/guide/most-profitable-crops/', icon: '🌾', title: 'Profitable Crops', desc: 'Best crops to farm for gold' },
                { href: '/guide/ancient-fruit/', icon: '🍇', title: 'Ancient Fruit Guide', desc: 'Best long-term investment' },
                { href: '/guide/community-center/', icon: '📦', title: 'Community Center', desc: 'Unlock Desert faster' },
                { href: '/guide/best-fish-pond/', icon: '🐟', title: 'Fish Pond Guide', desc: 'Passive income while mining' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                  <div className="font-bold text-purple-600 group-hover:text-purple-700">{link.title}</div>
                  <div className="text-sm text-slate-500">{link.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back Link */}
          <div className="text-center pt-8 border-t border-slate-200">
            <Link
              href="/guide/"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              ← Back to All Guides
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
