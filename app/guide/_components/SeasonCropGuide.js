import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

function formatGold(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value).toLocaleString()}g`;
}

function artisanPrice(value) {
  return Math.floor((value * 14) / 10);
}

function formatGoldPerDay(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value * 10) / 10}g`;
}

function getHarvests(item, days) {
  if (!item.growthTime) return 0;
  if (item.regrows && item.regrowTime) {
    if (days < item.growthTime) return 0;
    return 1 + Math.floor((days - item.growthTime) / item.regrowTime);
  }
  return Math.floor(days / item.growthTime);
}

function getYield(item) {
  const baseYield = item.harvestQuantity || item.harvestYield || 1;
  const extra = item.extraHarvestChance || 0;
  return baseYield + extra;
}

function getBestUse(item) {
  const options = [{ label: 'Sell raw', value: item.basePrice, time: 0 }];

  if (item.processing?.kegPrice) {
    options.push({
      label: item.processing.kegProduct ? `Keg into ${item.processing.kegProduct}` : 'Use Keg',
      value: artisanPrice(item.processing.kegPrice),
      time: item.processing.kegTime || 7,
    });
  }

  if (item.processing?.jarPrice) {
    options.push({
      label: item.processing.jarProduct ? `Jar into ${item.processing.jarProduct}` : 'Use Jar',
      value: artisanPrice(item.processing.jarPrice),
      time: item.processing.jarTime || 3,
    });
  }

  return options.sort((a, b) => b.value - a.value)[0];
}

function buildRows({ season, mode, slugs }) {
  const days = mode === 'greenhouse' ? 112 : 28;
  const crops = slugs
    ? slugs.map((slug) => itemsData.items.find((item) => item.slug === slug)).filter(Boolean)
    : itemsData.items.filter((item) => item.category === 'Crops' && item.season?.includes(season));

  return crops
    .map((item) => {
      const harvests = getHarvests(item, days);
      const expectedYield = getYield(item);
      const rawRevenue = item.basePrice * harvests * expectedYield;
      const seedCost = item.seedPrice || 0;
      const profit = rawRevenue - seedCost;
      const bestUse = getBestUse(item);

      return {
        ...item,
        harvests,
        expectedYield,
        profit,
        goldPerDay: profit / days,
        bestUse,
        artisanValue: bestUse.value,
      };
    })
    .sort((a, b) => b.goldPerDay - a.goldPerDay);
}

function CropTable({ rows, mode }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-sm text-slate-500">
          <tr>
            <th className="px-4 py-3">Crop</th>
            <th className="px-4 py-3 text-right">Seed</th>
            <th className="px-4 py-3 text-right">Base</th>
            <th className="px-4 py-3 text-right">{mode === 'greenhouse' ? '112-Day Harvests' : 'Season Harvests'}</th>
            <th className="px-4 py-3 text-right">Raw Profit/Day</th>
            <th className="px-4 py-3">Best Plan</th>
            <th className="px-4 py-3 text-right">Artisan Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((item) => (
            <tr key={item.slug} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium">
                <Link href={`/item/${item.slug}/`} className="text-blue-700 hover:underline">
                  {item.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-right">{item.seedPrice ? formatGold(item.seedPrice) : 'N/A'}</td>
              <td className="px-4 py-3 text-right">{formatGold(item.basePrice)}</td>
              <td className="px-4 py-3 text-right">{item.harvests}</td>
              <td className="px-4 py-3 text-right font-bold text-green-700">{formatGoldPerDay(item.goldPerDay)}</td>
              <td className="px-4 py-3 text-slate-700">{item.bestUse.label}</td>
              <td className="px-4 py-3 text-right font-medium">{formatGold(item.artisanValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SeasonCropGuide({
  season,
  mode = 'season',
  title,
  description,
  quickAnswer,
  bestFor,
  mustKnow,
  slugs,
}) {
  const rows = buildRows({ season, mode, slugs });
  const topRows = rows.slice(0, mode === 'greenhouse' ? 10 : 12);
  const dateModified = verificationData.lastVerified.split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-05-19',
    dateModified,
    author: { '@type': 'Organization', name: 'StardewPriceDB' },
    publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{title}</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-3">
          Stardew Valley {verificationData.gameVersion} crop guide
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{title}</h1>
        <p className="text-xl text-slate-600 max-w-3xl">{description}</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 md:col-span-2">
          <h2 className="font-bold text-green-950 mb-2">Quick answer</h2>
          <p className="text-green-900">{quickAnswer}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-950 mb-2">Best for</h2>
          <p className="text-blue-900">{bestFor}</p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {mode === 'greenhouse' ? 'Best Greenhouse Crops Ranked' : `Best ${season} Crops Ranked`}
        </h2>
        <p className="text-slate-600 mb-6">{mustKnow}</p>
        <CropTable rows={topRows} mode={mode} />
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-10">
        {topRows.slice(0, 3).map((item, index) => (
          <Link
            key={item.slug}
            href={`/item/${item.slug}/`}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="text-sm text-slate-500 mb-1">Pick #{index + 1}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.name}</h3>
            <p className="text-sm text-slate-600">
              {formatGoldPerDay(item.goldPerDay)} raw profit/day before processing. Best use: {item.bestUse.label}.
            </p>
          </Link>
        ))}
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related crop strategy</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { href: '/guide/best-spring-crops/', label: 'Spring crops' },
            { href: '/guide/best-summer-crops/', label: 'Summer crops' },
            { href: '/guide/best-fall-crops/', label: 'Fall crops' },
            { href: '/guide/best-greenhouse-crops/', label: 'Greenhouse crops' },
            { href: '/guide/ancient-fruit-vs-starfruit/', label: 'Ancient Fruit vs Starfruit' },
            { href: '/guide/best-keg-items/', label: 'Best Keg items' },
            { href: '/guide/best-preserves-jar-items/', label: 'Best Jar items' },
            { href: '/calculator/spring/', label: 'Profit calculator' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
