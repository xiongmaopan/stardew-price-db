import Link from 'next/link';

export const metadata = {
  title: 'Keg vs Preserves Jar: Complete Profit Analysis | Stardew Valley 1.6',
  description: 'When to use Kegs vs Preserves Jars in Stardew Valley. Gold-per-day calculations, processing times, and optimal strategies for every crop type.',
  alternates: {
    canonical: 'https://stardewpricedb.com/guide/keg-vs-jar/',
  },
  openGraph: {
    title: 'Keg vs Preserves Jar Analysis - Stardew Valley 1.6',
    description: 'Complete breakdown of when Kegs beat Jars and vice versa. Includes gold-per-day math.',
    url: 'https://stardewpricedb.com/guide/keg-vs-jar/',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I use a Keg or Preserves Jar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Kegs for fruits (Wine = Base × 3) and Hops (Pale Ale). Use Preserves Jars for vegetables and when you need faster turnover. Jars take 3 days vs 7 days for wine.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Keg vs Jar formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keg: Wine = Base Price × 3, Juice = Base × 2.25. Jar: Jelly/Pickles = Base × 2 + 50. Processing time: Wine 7 days, Juice 4 days, Jar always 3 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pale Ale the best Keg product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, by gold-per-day. Pale Ale (300g) takes only 1.5 days = 183g/day. Starfruit Wine (2,250g) takes 7 days = 214g/day but requires expensive seeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Artisan profession affect Kegs and Jars equally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Artisan adds +40% to ALL artisan goods including Wine, Juice, Jelly, Pickles, and Pale Ale. The Keg vs Jar winner stays the same, but profits increase significantly.',
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
    { '@type': 'ListItem', position: 3, name: 'Keg vs Preserves Jar' },
  ],
};

export default function KegVsJarGuide() {
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
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide/" className="hover:text-amber-600 transition-colors">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Keg vs Preserves Jar</span>
        </nav>

        <article>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 mb-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold mb-4">🍷 Keg vs Preserves Jar</h1>
            <p className="text-xl text-amber-100 leading-relaxed">
              &quot;Should I Keg this or Jar it?&quot; The answer isn&apos;t always obvious. 
              This guide breaks down the math with gold-per-day calculations for every major crop.
            </p>
          </div>

          {/* Quick Answer Box */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-10 text-white shadow-lg">
            <h3 className="font-bold text-xl mb-3">⚡ The Short Answer</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="font-bold">🍇 Fruits</div>
                <div className="text-sm text-blue-100">→ Keg (Wine) for higher total value</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="font-bold">🥬 Vegetables</div>
                <div className="text-sm text-blue-100">→ Jar (Pickles) for faster turnover</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="font-bold">🌿 Hops</div>
                <div className="text-sm text-blue-100">→ Keg (Pale Ale) = BEST gold/day!</div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '📊', label: 'Formulas', href: '#formulas' },
              { icon: '📈', label: 'Comparison', href: '#comparison' },
              { icon: '🍺', label: 'Hops Strategy', href: '#hops' },
              { icon: '⭐', label: 'Artisan Bonus', href: '#artisan' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-amber-400 hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-semibold text-slate-700 text-sm">{item.label}</div>
              </a>
            ))}
          </div>

          {/* Formulas Section */}
          <section id="formulas" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">📊</span> Understanding the Formulas
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Keg Card */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 text-xl mb-4 flex items-center gap-2">
                  🍷 Keg
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-amber-900">Wine (Fruits)</div>
                    <div className="text-2xl font-bold text-amber-600">Base × 3</div>
                    <div className="text-sm text-amber-700">⏱️ 7 days (10,000 minutes)</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-amber-900">Juice (Vegetables)</div>
                    <div className="text-2xl font-bold text-amber-600">Base × 2.25</div>
                    <div className="text-sm text-amber-700">⏱️ 4 days (6,000 minutes)</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-amber-900">Pale Ale (Hops)</div>
                    <div className="text-2xl font-bold text-green-600">300g fixed</div>
                    <div className="text-sm text-amber-700">⏱️ 1.5 days (2,250 minutes)</div>
                  </div>
                </div>
              </div>

              {/* Jar Card */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-purple-800 text-xl mb-4 flex items-center gap-2">
                  🫙 Preserves Jar
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-purple-900">Jelly (Fruits)</div>
                    <div className="text-2xl font-bold text-purple-600">Base × 2 + 50</div>
                    <div className="text-sm text-purple-700">⏱️ 3 days (4,000 minutes)</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-purple-900">Pickles (Vegetables)</div>
                    <div className="text-2xl font-bold text-purple-600">Base × 2 + 50</div>
                    <div className="text-sm text-purple-700">⏱️ 3 days (4,000 minutes)</div>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-3 border border-purple-300">
                    <div className="text-sm text-purple-800">
                      <strong>✨ Advantage:</strong> Consistent 3-day cycle makes planning easier
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gold Per Day Formula */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">💡 The Critical Metric: Gold Per Day</h3>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-amber-300 text-lg mb-3">
                Gold/Day = (Processed Price - Raw Price) ÷ Processing Days
              </div>
              <p className="text-slate-300 text-sm">
                We subtract raw price because that&apos;s your opportunity cost. A 600g Wine that takes 7 days 
                isn&apos;t necessarily better than 300g Jelly that takes 3 days.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">📈</span> Complete Comparison Table
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <th className="px-3 py-3 text-left font-semibold">Crop</th>
                    <th className="px-3 py-3 text-right font-semibold">Base</th>
                    <th className="px-3 py-3 text-right font-semibold">Wine/Juice</th>
                    <th className="px-3 py-3 text-right font-semibold">Jelly/Pickle</th>
                    <th className="px-3 py-3 text-right font-semibold">Keg g/day</th>
                    <th className="px-3 py-3 text-right font-semibold">Jar g/day</th>
                    <th className="px-3 py-3 text-center font-semibold">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { crop: '⭐ Starfruit', base: '750g', keg: '2,250g', jar: '1,550g', kegGpd: '214', jarGpd: '267', winner: 'JAR', note: true, bg: 'bg-yellow-50' },
                    { crop: '🍇 Ancient Fruit', base: '550g', keg: '1,650g', jar: '1,150g', kegGpd: '157', jarGpd: '200', winner: 'JAR', note: true, bg: 'bg-purple-50' },
                    { crop: '🍈 Melon', base: '250g', keg: '750g', jar: '550g', kegGpd: '71', jarGpd: '100', winner: 'JAR', bg: 'bg-green-50' },
                    { crop: '🎃 Pumpkin', base: '320g', keg: '720g', jar: '690g', kegGpd: '100', jarGpd: '123', winner: 'JAR', bg: 'bg-orange-50' },
                    { crop: '🌿 Hops', base: '25g', keg: '300g', jar: '100g', kegGpd: '183', jarGpd: '25', winner: 'KEG!', best: true, bg: 'bg-amber-100' },
                    { crop: '🌾 Wheat', base: '25g', keg: '200g', jar: 'N/A', kegGpd: '100', jarGpd: '-', winner: 'KEG', bg: 'bg-amber-50' },
                    { crop: '🍓 Strawberry', base: '120g', keg: '360g', jar: '290g', kegGpd: '34', jarGpd: '57', winner: 'JAR', bg: '' },
                    { crop: '🫐 Blueberry', base: '50g', keg: '150g', jar: '150g', kegGpd: '14', jarGpd: '33', winner: 'JAR', bg: '' },
                    { crop: '🔴 Cranberry', base: '75g', keg: '225g', jar: '200g', kegGpd: '21', jarGpd: '42', winner: 'JAR', bg: '' },
                    { crop: '☕ Coffee Bean', base: '15g', keg: '150g', jar: '80g', kegGpd: '67', jarGpd: '22', winner: 'KEG', bg: '' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${row.bg || (i % 2 === 0 ? 'bg-white' : 'bg-slate-50')}`}>
                      <td className="px-3 py-3 font-medium">{row.crop}</td>
                      <td className="px-3 py-3 text-right text-slate-600">{row.base}</td>
                      <td className="px-3 py-3 text-right text-amber-700 font-medium">{row.keg}</td>
                      <td className="px-3 py-3 text-right text-purple-700 font-medium">{row.jar}</td>
                      <td className="px-3 py-3 text-right">{row.kegGpd}</td>
                      <td className="px-3 py-3 text-right">{row.jarGpd}</td>
                      <td className={`px-3 py-3 text-center font-bold ${
                        row.best ? 'text-green-600 bg-green-100' : 
                        row.winner === 'KEG' || row.winner === 'KEG!' ? 'text-amber-600' : 'text-purple-600'
                      }`}>
                        {row.winner}
                        {row.note && <span className="text-xs">*</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanation Note */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">* Wait, Jar Beats Keg on Starfruit?</h3>
              <p className="text-amber-700">
                Yes, by <strong>gold-per-day</strong>. BUT most players prefer Kegs because:
              </p>
              <ul className="mt-3 space-y-1 text-amber-700 text-sm">
                <li>• You have limited Keg slots → maximize value per Keg</li>
                <li>• Wine can be aged in Casks to Iridium quality (+100%)</li>
                <li>• Higher total output matters more than speed in late game</li>
              </ul>
            </div>
          </section>

          {/* Hops Strategy */}
          <section id="hops" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">🍺</span> The Hops Exception
            </h2>

            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white shadow-lg mb-6">
              <h3 className="font-bold text-xl mb-4">🌿 Hops → Pale Ale Pipeline</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-green-100 text-sm">Hops Base Price</div>
                    <div className="text-2xl font-bold">25g</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-green-100 text-sm">Pale Ale Price</div>
                    <div className="text-2xl font-bold">300g <span className="text-lg text-green-200">(420g Artisan)</span></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-green-100 text-sm">Processing Time</div>
                    <div className="text-2xl font-bold">1.5 days</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/30 rounded-lg p-3 border-2 border-white/50">
                    <div className="text-green-100 text-sm">Gold Per Day</div>
                    <div className="text-3xl font-bold text-yellow-300">183g/day</div>
                    <div className="text-sm text-green-200">(263g/day with Artisan)</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-green-100 text-sm">Per Plant Per Summer</div>
                    <div className="text-xl font-bold">17 Hops = 5,100g</div>
                    <div className="text-sm text-green-200">(7,140g with Artisan)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <h3 className="font-bold text-yellow-800 mb-3">⚠️ The Catch: You Need LOTS of Kegs</h3>
              <p className="text-yellow-700 mb-3">
                Each Hops plant produces 17 Hops per Summer. At 1.5 days per Pale Ale:
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-yellow-800">
                100 Hops plants × 17 Hops = 1,700 Hops<br/>
                1,700 Hops ÷ (28 days ÷ 1.5 days) = <strong>91 Kegs minimum</strong>
              </div>
              <p className="text-yellow-700 mt-3 text-sm">
                💡 Pro tip: Start collecting Oak Resin early! You need 1 per Keg.
              </p>
            </div>
          </section>

          {/* Artisan Profession */}
          <section id="artisan" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">⭐</span> Artisan Profession Impact
            </h2>

            <p className="text-slate-600 mb-6">
              The <Link href="/calculator/summer/" className="text-amber-600 hover:underline font-medium">Artisan profession</Link> adds 
              <strong> +40% to ALL artisan goods</strong>. This doesn&apos;t change the Keg vs Jar winner, 
              but it amplifies your profits significantly.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Product</th>
                    <th className="px-4 py-3 text-right font-semibold">Base Price</th>
                    <th className="px-4 py-3 text-right font-semibold">With Artisan</th>
                    <th className="px-4 py-3 text-right font-semibold">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: '🍷 Starfruit Wine', base: '2,250g', artisan: '3,150g', bonus: '+900g' },
                    { product: '🍇 Ancient Fruit Wine', base: '1,650g', artisan: '2,310g', bonus: '+660g' },
                    { product: '🍺 Pale Ale', base: '300g', artisan: '420g', bonus: '+120g' },
                    { product: '🎃 Pumpkin Pickles', base: '690g', artisan: '966g', bonus: '+276g' },
                    { product: '⭐ Iridium Starfruit Wine', base: '4,500g', artisan: '6,300g', bonus: '+1,800g' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium">{row.product}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{row.base}</td>
                      <td className="px-4 py-3 text-right text-green-600 font-bold">{row.artisan}</td>
                      <td className="px-4 py-3 text-right text-purple-600 font-medium">{row.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Decision Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">🎯</span> When to Use Which
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl p-6 border-2 border-amber-300">
                <h3 className="font-bold text-amber-800 text-lg mb-4 flex items-center gap-2">
                  🍷 Choose Kegs When...
                </h3>
                <ul className="space-y-2">
                  {[
                    'You have limited Kegs (maximize value per slot)',
                    'Processing Hops → Pale Ale (no contest!)',
                    'You want to age Wine in Casks (+100%)',
                    'You have Artisan profession (+40% applies)',
                    'Processing high-value fruits (Starfruit, Ancient)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-700">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="font-bold text-purple-800 text-lg mb-4 flex items-center gap-2">
                  🫙 Choose Jars When...
                </h3>
                <ul className="space-y-2">
                  {[
                    'You have excess crops and not enough Kegs',
                    'Processing vegetables (better ratio)',
                    'You need faster cash flow (3 days vs 7)',
                    'Selling for bundles or quests',
                    'Early game before you have many Kegs',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-purple-700">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Optimal Strategy Summary */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                🏆 The Meta Strategy
              </h3>
              <ol className="space-y-3">
                {[
                  { step: '1', text: 'Get Artisan profession (Farming Level 10: Tiller → Artisan)' },
                  { step: '2', text: 'Build as many Kegs as possible (Oak Resin is the bottleneck)' },
                  { step: '3', text: 'Process Hops through Kegs first (best gold/day by far)' },
                  { step: '4', text: 'Then process high-value fruits: Starfruit, Ancient Fruit' },
                  { step: '5', text: 'Use Preserves Jars for overflow crops you can\'t Keg in time' },
                  { step: '6', text: 'Age Starfruit Wine in Casks to Iridium (+100% value)' },
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </span>
                    <span className="text-green-50">{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-amber-500">📚</span> Related Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { href: '/guide/most-profitable-crops/', icon: '🌾', title: 'Most Profitable Crops', desc: 'What to grow first' },
                { href: '/guide/ancient-fruit/', icon: '🍇', title: 'Ancient Fruit Guide', desc: 'Best Wine crop' },
                { href: '/guide/greenhouse-layout/', icon: '🏠', title: 'Greenhouse Layout', desc: 'Optimize your space' },
                { href: '/guide/year-1-money/', icon: '💰', title: 'Year 1 Money', desc: 'Early game strategy' },
                { href: '/calculator/summer/', icon: '🧮', title: 'Profit Calculator', desc: 'Compare crops' },
                { href: '/guide/animal-profit/', icon: '🐄', title: 'Animal Profit', desc: 'Alternative income' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-amber-400 hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                  <div className="font-bold text-amber-600 group-hover:text-amber-700">{link.title}</div>
                  <div className="text-sm text-slate-500">{link.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back Link */}
          <div className="text-center pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">
              Last updated: December 2025 • Verified for Stardew Valley 1.6
            </p>
            <Link
              href="/guide/"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-medium transition-colors"
            >
              ← Back to All Guides
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
