import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Crops by Season - Stardew Valley 1.6.15 Guide',
  description: 'Best Stardew Valley crops for Spring, Summer, Fall, Greenhouse, and Ginger Island with profit notes, processing recommendations, and beginner-friendly picks.',
  alternates: {
    canonical: '/guide/best-crops-by-season/',
  },
  openGraph: {
    title: 'Best Crops by Season - Stardew Valley',
    description: 'Best crops for Spring, Summer, Fall, Greenhouse, and Ginger Island with profit and processing notes.',
    url: `${SITE_URL}/guide/best-crops-by-season/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Stardew Valley crops by season' }],
  },
};

const seasonNotes = {
  Spring: {
    beginner: 'Potato and Cauliflower are reliable Day 1 choices. Strawberry becomes the best Spring crop after the Egg Festival.',
    advanced: 'Rhubarb and Strawberry become stronger when you have Kegs or enough cash to scale planting.',
  },
  Summer: {
    beginner: 'Blueberry is the safest mass-planting crop for Summer because each harvest produces multiple berries.',
    advanced: 'Starfruit is the premium option if you can reach the Oasis and have Kegs ready.',
  },
  Fall: {
    beginner: 'Cranberries provide repeat harvests, while Pumpkin gives strong single-harvest value and Giant Crop chances.',
    advanced: 'Pumpkin Juice and Fairy Rose Honey are excellent when your farm has machines and Bee Houses.',
  },
  Greenhouse: {
    beginner: 'Use the Greenhouse to protect your best regrowth crops from seasonal limits.',
    advanced: 'Ancient Fruit is the default endgame Greenhouse crop because weekly harvests match large Keg networks well.',
  },
};

function formatGold(value) {
  return `${Math.round(value * 10) / 10}g`;
}

function getCropRows(season) {
  return itemsData.items
    .filter((item) => item.category === 'Crops' && item.season?.includes(season))
    .map((item) => {
      const harvests = item.regrows && item.regrowTime
        ? 1 + Math.floor(Math.max(0, 28 - item.growthTime) / item.regrowTime)
        : Math.floor(28 / item.growthTime);
      const yieldCount = item.harvestQuantity || item.harvestYield || 1;
      const seasonalRevenue = item.basePrice * harvests * yieldCount;
      const seedCost = item.seedPrice || 0;
      const seasonalProfit = seasonalRevenue - seedCost;
      return {
        ...item,
        harvests,
        seasonalProfit,
        goldPerDay: seasonalProfit / 28,
        bestProcessing: item.processing?.kegPrice
          ? 'Keg'
          : item.processing?.jarPrice
            ? 'Jar'
            : 'Raw',
      };
    })
    .sort((a, b) => b.goldPerDay - a.goldPerDay)
    .slice(0, 8);
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Crops by Season in Stardew Valley',
  description: 'Season-by-season crop recommendations for Stardew Valley.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/best-crops-by-season/',
};

export default function BestCropsBySeasonPage() {
  const seasons = ['Spring', 'Summer', 'Fall'];
  const greenhousePicks = ['ancient-fruit', 'starfruit', 'strawberry', 'pineapple']
    .map((slug) => itemsData.items.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Best Crops by Season</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Best Crops by Season in Stardew Valley</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          The best crop changes by season, year, available machines, and whether you need fast cash or long-term profit.
          This guide focuses on practical picks for Stardew Valley {verificationData.gameVersion}.
        </p>
      </header>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-green-950 mb-3">Quick answer</h2>
        <p className="text-green-900">
          Spring: Potato early, Strawberry after Egg Festival. Summer: Blueberry for safe profit, Starfruit for premium Keg profit.
          Fall: Pumpkin for high-value processing, Cranberries for repeat harvests. Greenhouse: Ancient Fruit is the long-term winner.
        </p>
      </section>

      <div className="space-y-10">
        {seasons.map((season) => {
          const rows = getCropRows(season);
          return (
            <section key={season} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800">Best {season} Crops</h2>
                <p className="text-slate-600 mt-2">{seasonNotes[season].beginner}</p>
                <p className="text-slate-600 mt-1">{seasonNotes[season].advanced}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Crop</th>
                      <th className="px-4 py-3 text-right">Seed Cost</th>
                      <th className="px-4 py-3 text-right">Base Price</th>
                      <th className="px-4 py-3 text-right">Harvests</th>
                      <th className="px-4 py-3 text-right">Profit/Day</th>
                      <th className="px-4 py-3">Best Use</th>
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
                        <td className="px-4 py-3 text-right">{item.seedPrice ? `${item.seedPrice}g` : 'N/A'}</td>
                        <td className="px-4 py-3 text-right">{item.basePrice}g</td>
                        <td className="px-4 py-3 text-right">{item.harvests}</td>
                        <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(item.goldPerDay)}</td>
                        <td className="px-4 py-3 text-slate-600">{item.bestProcessing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-10 bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Best Greenhouse Crops</h2>
        <p className="text-slate-600 mb-6">{seasonNotes.Greenhouse.advanced}</p>
        <div className="grid md:grid-cols-4 gap-4">
          {greenhousePicks.map((item) => (
            <Link
              key={item.slug}
              href={`/item/${item.slug}/`}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <h3 className="font-bold text-slate-800">{item.name}</h3>
              <p className="text-sm text-slate-500 mt-1">Base: {item.basePrice}g</p>
              <p className="text-sm text-slate-500">Growth: {item.growthTime || 'N/A'} days</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <Link href="/guide/best-spring-crops/" className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-green-950 mb-2">Best Spring Crops</h2>
          <p className="text-sm text-green-900">Plan early cash flow, Strawberry buys, and Spring processing.</p>
        </Link>
        <Link href="/guide/best-summer-crops/" className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-yellow-950 mb-2">Best Summer Crops</h2>
          <p className="text-sm text-yellow-900">Compare Blueberries, Starfruit, Hops, and Melon.</p>
        </Link>
        <Link href="/guide/best-fall-crops/" className="bg-orange-50 border border-orange-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-orange-950 mb-2">Best Fall Crops</h2>
          <p className="text-sm text-orange-900">Pick between Pumpkins, Cranberries, and bundle crops.</p>
        </Link>
        <Link href="/guide/best-greenhouse-crops/" className="bg-purple-50 border border-purple-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-purple-950 mb-2">Best Greenhouse Crops</h2>
          <p className="text-sm text-purple-900">Use protected space for Ancient Fruit, Starfruit, and Pineapple.</p>
        </Link>
        <Link href="/guide/ancient-fruit-vs-starfruit/" className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-blue-950 mb-2">Ancient Fruit vs Starfruit</h2>
          <p className="text-sm text-blue-900">Choose the right premium Wine crop for your farm.</p>
        </Link>
        <Link href="/guide/best-keg-items/" className="bg-amber-50 border border-amber-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-amber-950 mb-2">Best Keg Items</h2>
          <p className="text-sm text-amber-900">See which crops deserve Keg space first.</p>
        </Link>
        <Link href="/guide/best-preserves-jar-items/" className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-green-950 mb-2">Best Jar Items</h2>
          <p className="text-sm text-green-900">Use Jars for crop overflow and faster processing.</p>
        </Link>
        <Link href="/calculator/spring/" className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition">
          <h2 className="font-bold text-blue-950 mb-2">Profit Calculator</h2>
          <p className="text-sm text-blue-900">Calculate your exact season plan.</p>
        </Link>
      </section>
    </main>
  );
}
