import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Preserves Jar Items - Stardew Valley 1.6.15 Profit Guide',
  description: 'Ranked list of the best Stardew Valley items for Preserves Jars, including Jelly, Pickles, Caviar, Aged Roe, Artisan values, and practical advice.',
  alternates: {
    canonical: '/guide/best-preserves-jar-items/',
  },
  openGraph: {
    title: 'Best Preserves Jar Items - Stardew Valley',
    description: 'Best items for Preserves Jars, including Jelly, Pickles, Caviar, Aged Roe, and Artisan values.',
    url: `${SITE_URL}/guide/best-preserves-jar-items/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Preserves Jar items in Stardew Valley' }],
  },
};

function formatGold(value) {
  return `${Math.floor(value).toLocaleString()}g`;
}

function artisanPrice(value) {
  return Math.floor((value * 14) / 10);
}

function getJarRows() {
  return itemsData.items
    .filter((item) => item.processing?.jarPrice)
    .map((item) => {
      const jarPrice = item.processing.jarPrice;
      const jarArtisanPrice = artisanPrice(jarPrice);
      const time = item.processing.jarTime || 3;
      return {
        ...item,
        jarPrice,
        artisanPrice: jarArtisanPrice,
        gain: jarPrice - item.basePrice,
        artisanGain: jarArtisanPrice - item.basePrice,
        goldPerJarDay: Math.round((jarArtisanPrice / time) * 10) / 10,
        product: item.processing.jarProduct || 'Preserved good',
        time,
      };
    })
    .sort((a, b) => b.goldPerJarDay - a.goldPerJarDay)
    .slice(0, 25);
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Preserves Jar Items in Stardew Valley',
  description: 'Ranked Preserves Jar profit guide for Stardew Valley items.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/best-preserves-jar-items/',
};

export default function BestPreservesJarItemsPage() {
  const rows = getJarRows();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Best Preserves Jar Items</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Best Preserves Jar Items in Stardew Valley</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Preserves Jars are faster than most Keg recipes and are especially useful for vegetables, lower-value fruit,
          and Fish Pond products. These values are verified for Stardew Valley {verificationData.gameVersion}.
        </p>
      </header>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-950 mb-3">Quick answer</h2>
        <p className="text-green-900">
          Preserves Jars are best when Kegs are busy with Wine or Pale Ale. Use them for vegetables, fast crop batches,
          and Roe. For Sturgeon Roe, the Jar creates Caviar, one of the best passive-income products from Fish Ponds.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Preserves Jar Ranking by Artisan Gold per Day</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-right">Raw</th>
                <th className="px-4 py-3 text-right">Jar</th>
                <th className="px-4 py-3 text-right">Artisan</th>
                <th className="px-4 py-3 text-right">Artisan Gain</th>
                <th className="px-4 py-3 text-right">Gold/Jar Day</th>
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
                  <td className="px-4 py-3 text-right">{formatGold(item.jarPrice)}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(item.artisanPrice)}</td>
                  <td className="px-4 py-3 text-right text-green-700">+{formatGold(item.artisanGain)}</td>
                  <td className="px-4 py-3 text-right">{formatGold(item.goldPerJarDay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">When Jars beat Kegs</h2>
          <p className="text-slate-600 text-sm">
            Jars often win when the Keg output is only slightly higher but takes longer. This is common for vegetables.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Fish Pond products</h2>
          <p className="text-slate-600 text-sm">
            Use Preserves Jars for Roe. Sturgeon Roe becomes{' '}
            <Link href="/item/caviar/" className="text-blue-700 hover:underline">Caviar</Link>, while other Roe becomes Aged Roe.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Best pairing</h2>
          <p className="text-slate-600 text-sm">
            Run Kegs and Jars together: Kegs handle premium fruit, Jars handle overflow crops and Roe.
          </p>
        </div>
      </section>
    </main>
  );
}
