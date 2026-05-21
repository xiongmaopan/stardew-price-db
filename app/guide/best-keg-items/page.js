import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

export const metadata = {
  title: 'Best Keg Items - Stardew Valley 1.6.15 Profit Guide',
  description: 'Ranked list of the best Stardew Valley items to put in Kegs, including Wine, Juice, Pale Ale, Coffee, Artisan values, and profit notes.',
  alternates: {
    canonical: '/guide/best-keg-items/',
  },
  openGraph: {
    title: 'Best Keg Items - Stardew Valley Profit Guide',
    description: 'Find the highest-value Keg items in Stardew Valley 1.6.15 with Artisan values and practical processing advice.',
    url: 'https://stardewpricedb.com/guide/best-keg-items/',
  },
};

function formatGold(value) {
  return `${Math.floor(value).toLocaleString()}g`;
}

function artisanPrice(value) {
  return Math.floor((value * 14) / 10);
}

function getKegRows() {
  return itemsData.items
    .filter((item) => item.processing?.kegPrice)
    .map((item) => {
      const kegPrice = item.processing.kegPrice;
      const kegArtisanPrice = artisanPrice(kegPrice);
      const rawGain = kegPrice - item.basePrice;
      const artisanGain = kegArtisanPrice - item.basePrice;
      const time = item.processing.kegTime || 1;
      return {
        ...item,
        kegPrice,
        artisanPrice: kegArtisanPrice,
        rawGain,
        artisanGain,
        goldPerKegDay: Math.round((kegArtisanPrice / time) * 10) / 10,
        product: item.processing.kegProduct || 'Keg product',
        time,
      };
    })
    .sort((a, b) => b.artisanPrice - a.artisanPrice)
    .slice(0, 25);
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Keg Items in Stardew Valley',
  description: 'Ranked Keg profit guide for Stardew Valley items.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'StardewPriceDB',
  },
  publisher: {
    '@type': 'Organization',
    name: 'StardewPriceDB',
  },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/best-keg-items/',
};

export default function BestKegItemsPage() {
  const rows = getKegRows();
  const top = rows.slice(0, 5);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Best Keg Items</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Best Keg Items in Stardew Valley</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Kegs are strongest when they process high-value fruit, Hops, Wheat, Coffee Beans, and a few special items.
          These rankings use Stardew Valley {verificationData.gameVersion} prices and show Artisan values because most
          serious Keg setups use the Artisan profession.
        </p>
      </header>

      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-amber-950 mb-3">Quick answer</h2>
        <p className="text-amber-900">
          For endgame profit, prioritize Starfruit Wine and Ancient Fruit Wine. For fast Keg turnover, Hops into Pale Ale
          and Wheat into Beer are excellent, but they demand more frequent harvesting and processing.
        </p>
      </section>

      <section className="grid md:grid-cols-5 gap-4 mb-10">
        {top.map((item, index) => (
          <Link
            key={item.slug}
            href={`/item/${item.slug}/`}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="text-sm font-bold text-slate-400 mb-2">#{index + 1}</div>
            <h2 className="font-bold text-slate-800 mb-1">{item.name}</h2>
            <p className="text-sm text-slate-500">{item.product}</p>
            <p className="mt-3 text-lg font-black text-green-700">{formatGold(item.artisanPrice)}</p>
            <p className="text-xs text-slate-500">with Artisan</p>
          </Link>
        ))}
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Keg Profit Ranking</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-right">Raw</th>
                <th className="px-4 py-3 text-right">Keg</th>
                <th className="px-4 py-3 text-right">Artisan</th>
                <th className="px-4 py-3 text-right">Artisan Gain</th>
                <th className="px-4 py-3 text-right">Gold/Keg Day</th>
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
                  <td className="px-4 py-3 text-slate-600">{item.product}</td>
                  <td className="px-4 py-3 text-right">{formatGold(item.basePrice)}</td>
                  <td className="px-4 py-3 text-right">{formatGold(item.kegPrice)}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(item.artisanPrice)}</td>
                  <td className="px-4 py-3 text-right text-green-700">+{formatGold(item.artisanGain)}</td>
                  <td className="px-4 py-3 text-right">{formatGold(item.goldPerKegDay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Best endgame use</h2>
          <p className="text-slate-600 text-sm">
            Use Kegs for Starfruit, Ancient Fruit, and other high-value fruit before lower-value vegetables.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Best fast turnover</h2>
          <p className="text-slate-600 text-sm">
            Pale Ale and Beer finish quickly, so they are strong when you have enough crops and time to refill Kegs.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Compare with Jars</h2>
          <p className="text-slate-600 text-sm">
            Some vegetables are close enough that Preserves Jars win on speed. Check the full{' '}
            <Link href="/guide/keg-vs-jar/" className="text-blue-700 hover:underline">Keg vs Jar guide</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
