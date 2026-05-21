import Link from 'next/link';
import itemsData from '@/data/items.json';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

function gold(value) {
  return `${Number(value).toLocaleString()}g`;
}

function qualityPrices(basePrice, professionMultiplier = 1) {
  return {
    base: Math.floor(basePrice * professionMultiplier),
    silver: Math.floor(basePrice * 1.25 * professionMultiplier),
    gold: Math.floor(basePrice * 1.5 * professionMultiplier),
    iridium: Math.floor(basePrice * 2 * professionMultiplier),
  };
}

const itemRows = itemsData.items
  .filter((item) => item.category !== 'Fish')
  .map((item) => ({
    name: item.name,
    slug: item.slug,
    category: item.category,
    basePrice: item.basePrice,
    url: `/item/${item.slug}/`,
    detail: item.season?.join(', ') || item.subcategory || 'All year',
  }));

const fishRows = fishData.fish.map((fish) => ({
  name: fish.name,
  slug: fish.slug,
  category: 'Fish',
  basePrice: fish.basePrice,
  url: `/fishing/${fish.slug}/`,
  detail: `${fish.season.join(', ')} - ${fish.location.slice(0, 2).join(', ')}`,
}));

const allRows = [...itemRows, ...fishRows].sort((a, b) => b.basePrice - a.basePrice);

const categorySummary = [
  { name: 'Crops', href: '/crops/', count: itemRows.filter((item) => item.category === 'Crops').length, text: 'Raw crop prices, growth time, season, and processing links.' },
  { name: 'Fish', href: '/fishing/', count: fishRows.length, text: 'Fish sell prices, catch locations, seasons, time windows, and difficulty.' },
  { name: 'Artisan Goods', href: '/artisan-goods/', count: itemRows.filter((item) => item.category === 'Artisan Goods').length, text: 'Wine, Juice, Jelly, Pickles, Oil, Coffee, and Artisan profession values.' },
  { name: 'Animal Products', href: '/animal-products/', count: itemRows.filter((item) => item.category === 'Animal Products').length, text: 'Milk, Eggs, Wool, Truffles, and ranching sell prices.' },
  { name: 'Minerals', href: '/minerals/', count: itemRows.filter((item) => item.category === 'Minerals').length, text: 'Gem and mineral prices for mining, Crystalariums, and selling decisions.' },
  { name: 'Forage', href: '/forage/', count: itemRows.filter((item) => item.category === 'Forage').length, text: 'Seasonal forage prices and Botanist-quality planning.' },
  { name: 'Cooking', href: '/cooking/', count: itemRows.filter((item) => item.category === 'Cooking').length, text: 'Cooking ingredients, cooked food sell prices, and recipe links.' },
  { name: 'Resources', href: '/resources/', count: itemRows.filter((item) => item.category === 'Resources').length, text: 'Ore, bars, wood, stone, coal, geodes, and basic material values.' },
];

const topOverall = allRows.slice(0, 16);
const topCrops = itemRows.filter((item) => item.category === 'Crops').sort((a, b) => b.basePrice - a.basePrice).slice(0, 12);
const topFish = fishRows.slice(0, 12);
const processable = itemsData.items
  .filter((item) => item.processing && (item.processing.kegPrice || item.processing.jarPrice))
  .map((item) => {
    const kegValue = item.processing.kegPrice || 0;
    const jarValue = item.processing.jarPrice || 0;
    const bestValue = Math.max(kegValue, jarValue);
    const bestMachine = kegValue >= jarValue ? 'Keg' : 'Jar';
    const artisanValue = item.slug === 'coffee-bean' ? bestValue : Math.floor(bestValue * 1.4);

    return {
      name: item.name,
      slug: item.slug,
      basePrice: item.basePrice,
      bestMachine,
      bestValue,
      artisanValue,
      url: `/item/${item.slug}/`,
    };
  })
  .sort((a, b) => b.artisanValue - a.artisanValue)
  .slice(0, 12);

export const metadata = {
  title: `Stardew Valley All Item Prices List ${GAME_VERSION} | Crops, Fish, Artisan Goods`,
  description: `Search all Stardew Valley item prices for crops, fish, minerals, artisan goods, cooking, quality values, processing, and profession bonuses.`,
  keywords: [
    'Stardew Valley selling prices',
    'Stardew Valley item prices',
    'Stardew Valley sell price database',
    'Stardew Valley crop prices',
    'Stardew Valley fish prices',
    'Stardew Valley artisan goods prices',
  ],
  alternates: {
    canonical: '/selling-prices/',
  },
  openGraph: {
    title: `Stardew Valley All Item Prices List ${GAME_VERSION}`,
    description: 'Browse verified Stardew Valley sell prices, quality values, profession bonuses, and processing values.',
    url: `${SITE_URL}/selling-prices/`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/selling-prices/#page`,
      name: 'Stardew Valley Selling Prices Database',
      description: `Verified Stardew Valley ${GAME_VERSION} sell price database for items, fish, crops, artisan goods, and profession-adjusted values.`,
      url: `${SITE_URL}/selling-prices/`,
      dateModified: LAST_VERIFIED,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'Dataset',
      '@id': `${SITE_URL}/selling-prices/#dataset`,
      name: 'Stardew Valley Selling Prices Database',
      description: `Verified Stardew Valley ${GAME_VERSION} item price dataset covering crops, fish, minerals, artisan goods, cooking, quality prices, and profession values.`,
      url: `${SITE_URL}/selling-prices/`,
      version: GAME_VERSION,
      dateModified: LAST_VERIFIED,
      creator: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
      },
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'text/html',
          contentUrl: `${SITE_URL}/selling-prices/`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/selling-prices/#top-prices`,
      name: 'Highest Stardew Valley Selling Prices',
      numberOfItems: topOverall.length,
      itemListElement: topOverall.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}${item.url}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Selling Prices', item: `${SITE_URL}/selling-prices/` },
      ],
    },
  ],
};

function PriceTable({ title, subtitle, rows, showQuality = false }) {
  return (
    <section className="border border-slate-200 bg-white rounded-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white text-slate-600 border-b border-slate-100">
            <tr>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Base</th>
              {showQuality ? (
                <>
                  <th className="text-right px-4 py-3">Gold</th>
                  <th className="text-right px-4 py-3">Iridium</th>
                </>
              ) : (
                <th className="text-left px-4 py-3">Detail</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((item) => {
              const prices = qualityPrices(item.basePrice);
              return (
                <tr key={`${title}-${item.slug}`}>
                  <td className="px-4 py-3">
                    <Link href={item.url} className="font-medium text-blue-700 hover:underline">{item.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.category}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{gold(prices.base)}</td>
                  {showQuality ? (
                    <>
                      <td className="px-4 py-3 text-right">{gold(prices.gold)}</td>
                      <td className="px-4 py-3 text-right">{gold(prices.iridium)}</td>
                    </>
                  ) : (
                    <td className="px-4 py-3 text-slate-600">{item.detail}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function SellingPricesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Selling Prices</span>
        </nav>

        <header className="mb-8">
          <div className="text-sm font-semibold text-green-700 mb-2">Verified for Stardew Valley {GAME_VERSION}</div>
          <h1 className="text-4xl font-black text-slate-950 mb-3">Stardew Valley All Item Prices List</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Browse verified sell prices for crops, fish, minerals, forage, animal products, cooking, and artisan goods. Use the tables below for quick price checks, then open the item pages for quality values, profession bonuses, Keg/Jar math, and calculator links.
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Indexed price pages</div>
            <div className="text-2xl font-bold text-slate-950">{allRows.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Item categories</div>
            <div className="text-2xl font-bold text-slate-950">{categorySummary.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Highest base price</div>
            <div className="text-2xl font-bold text-slate-950">{gold(topOverall[0]?.basePrice || 0)}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Last data check</div>
            <div className="text-2xl font-bold text-slate-950">{LAST_VERIFIED}</div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {categorySummary.map((category) => (
            <Link key={category.name} href={category.href} className="border border-slate-200 bg-white rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-lg font-bold text-slate-900">{category.name}</h2>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">{category.count}</span>
              </div>
              <p className="text-sm text-slate-600">{category.text}</p>
            </Link>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-10">
          <PriceTable
            title="Highest base selling prices"
            subtitle="Quick scan of the highest raw/base sell prices across the database."
            rows={topOverall}
          />
          <PriceTable
            title="Crop quality price examples"
            subtitle="Quality multipliers use the in-game 1.25x, 1.5x, and 2x values."
            rows={topCrops}
            showQuality
          />
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-10">
          <PriceTable
            title="High-value fish prices"
            subtitle="Fish pages include catch location, season, time, weather, and difficulty."
            rows={topFish}
            showQuality
          />

          <section className="border border-slate-200 bg-white rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
              <h2 className="text-xl font-bold text-slate-950">Best processing values</h2>
              <p className="text-sm text-slate-600">Best Keg or Jar output for raw inputs, including Artisan where applicable.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white text-slate-600 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-4 py-3">Input</th>
                    <th className="text-left px-4 py-3">Machine</th>
                    <th className="text-right px-4 py-3">Output</th>
                    <th className="text-right px-4 py-3">Artisan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {processable.map((item) => (
                    <tr key={`process-${item.slug}`}>
                      <td className="px-4 py-3">
                        <Link href={item.url} className="font-medium text-blue-700 hover:underline">{item.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{item.bestMachine}</td>
                      <td className="px-4 py-3 text-right">{gold(item.bestValue)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-700">{gold(item.artisanValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        <section className="border border-slate-200 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-3">How to use these prices</h2>
          <p className="text-slate-600 mb-4">
            Base sell prices are only the starting point. Crop quality changes raw sale value, Tiller adds 10% to crops, Angler adds 25% to fish, and Artisan adds 40% to most processed goods. For farm planning, compare final value, processing time, seed cost, and harvest count.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator/spring/" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800">Open profit calculator</Link>
            <Link href="/artisan-goods/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Compare artisan goods</Link>
            <Link href="/about-data/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">View formula audit</Link>
          </div>
        </section>
      </main>
    </>
  );
}
