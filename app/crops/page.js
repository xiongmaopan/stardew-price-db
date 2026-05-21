import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

const crops = itemsData.items.filter((item) => item.category === 'Crops');
const seasonalCrops = SEASONS.map((season) => ({
  season,
  crops: crops
    .filter((crop) => crop.season?.includes(season))
    .sort((a, b) => b.basePrice - a.basePrice),
}));

const highValueCrops = [...crops]
  .filter((crop) => crop.basePrice >= 100)
  .sort((a, b) => b.basePrice - a.basePrice)
  .slice(0, 12);

const regrowCrops = crops
  .filter((crop) => crop.regrows)
  .sort((a, b) => a.regrowTime - b.regrowTime);

export const metadata = {
  title: `Stardew Valley Crops Database - Seasons, Prices, Growth Times (${GAME_VERSION})`,
  description: `Browse ${crops.length} Stardew Valley crops by season with sell prices, seed costs, growth times, regrowth rules, and links to profit calculators. Verified for ${GAME_VERSION}.`,
  alternates: {
    canonical: '/crops/',
  },
  openGraph: {
    title: `Stardew Valley Crops Database (${GAME_VERSION})`,
    description: 'Season-by-season crop prices, growth times, processing links, and profit calculators.',
    url: `${SITE_URL}/crops/`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/crops/#page`,
      name: 'Stardew Valley Crops Database',
      description: `Season-by-season Stardew Valley crop data verified for ${GAME_VERSION}.`,
      url: `${SITE_URL}/crops/`,
      dateModified: LAST_VERIFIED,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/crops/#crop-list`,
      name: 'Stardew Valley Crops',
      numberOfItems: crops.length,
      itemListElement: crops.slice(0, 40).map((crop, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crop.name,
        url: `${SITE_URL}/item/${crop.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Crops', item: `${SITE_URL}/crops/` },
      ],
    },
  ],
};

function formatGold(value) {
  return `${Number(value).toLocaleString()}g`;
}

export default function CropsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Crops</span>
        </nav>

        <header className="mb-8">
          <div className="text-sm font-semibold text-green-700 mb-2">Verified for Stardew Valley {GAME_VERSION}</div>
          <h1 className="text-4xl font-black text-slate-950 mb-3">Stardew Valley crops database</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Browse crop sell prices, growth times, season availability, regrowth rules, and processing paths. Use this hub to move from raw data into the seasonal profit calculators and crop strategy guides.
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Crop entries</div>
            <div className="text-2xl font-bold text-slate-950">{crops.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Regrowing crops</div>
            <div className="text-2xl font-bold text-slate-950">{regrowCrops.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Highest base price</div>
            <div className="text-2xl font-bold text-slate-950">{formatGold(highValueCrops[0]?.basePrice || 0)}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Last formula check</div>
            <div className="text-2xl font-bold text-slate-950">{LAST_VERIFIED}</div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {seasonalCrops.map(({ season, crops: seasonCrops }) => (
            <div key={season} className="border border-slate-200 bg-white rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">{season} crops</h2>
                <Link href={`/calculator/${season.toLowerCase()}/`} className="text-sm font-medium text-blue-600 hover:underline">
                  Open {season} calculator
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {seasonCrops.slice(0, 8).map((crop) => (
                  <Link key={crop.slug} href={`/item/${crop.slug}/`} className="flex items-center justify-between px-4 py-3 hover:bg-blue-50">
                    <span className="font-medium text-slate-800">{crop.name}</span>
                    <span className="text-sm text-slate-500">{formatGold(crop.basePrice)} · {crop.growthTime}d</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
            <div className="bg-green-50 border-b border-green-100 px-5 py-4">
              <h2 className="text-xl font-bold text-green-950">High-value crops to compare first</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Crop</th>
                  <th className="text-right px-4 py-3">Base price</th>
                  <th className="text-right px-4 py-3">Growth</th>
                  <th className="text-left px-4 py-3">Season</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {highValueCrops.map((crop) => (
                  <tr key={crop.slug}>
                    <td className="px-4 py-3"><Link href={`/item/${crop.slug}/`} className="font-medium text-blue-700 hover:underline">{crop.name}</Link></td>
                    <td className="px-4 py-3 text-right">{formatGold(crop.basePrice)}</td>
                    <td className="px-4 py-3 text-right">{crop.growthTime}d</td>
                    <td className="px-4 py-3 text-slate-600">{crop.season?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-100 px-5 py-4">
              <h2 className="text-xl font-bold text-blue-950">Regrowing crops</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Crop</th>
                  <th className="text-right px-4 py-3">Initial</th>
                  <th className="text-right px-4 py-3">Regrow</th>
                  <th className="text-left px-4 py-3">Best use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {regrowCrops.map((crop) => (
                  <tr key={crop.slug}>
                    <td className="px-4 py-3"><Link href={`/item/${crop.slug}/`} className="font-medium text-blue-700 hover:underline">{crop.name}</Link></td>
                    <td className="px-4 py-3 text-right">{crop.growthTime}d</td>
                    <td className="px-4 py-3 text-right">{crop.regrowTime}d</td>
                    <td className="px-4 py-3 text-slate-600">{crop.processing?.kegPrice ? 'Keg / long season' : 'Repeat harvest'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border border-slate-200 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-3">Crop profit tools</h2>
          <p className="text-slate-600 mb-4">
            For exact gold/day, use the calculator because seed costs, start day, Speed-Gro, Farming Level, Tiller, and Artisan can change the best crop.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator/spring/" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800">Spring calculator</Link>
            <Link href="/calculator/summer/" className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-bold text-white hover:bg-yellow-700">Summer calculator</Link>
            <Link href="/calculator/fall/" className="rounded-lg bg-orange-700 px-4 py-2 text-sm font-bold text-white hover:bg-orange-800">Fall calculator</Link>
            <Link href="/guide/best-crops-by-season/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Best crops by season</Link>
          </div>
        </section>
      </main>
    </>
  );
}
