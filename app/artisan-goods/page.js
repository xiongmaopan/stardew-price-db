import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

const processableItems = itemsData.items.filter((item) => item.processing && (item.processing.kegPrice || item.processing.jarPrice));

const kegItems = processableItems
  .filter((item) => item.processing.kegPrice)
  .map((item) => ({
    ...item,
    product: item.processing.kegProduct || (item.subcategory === 'Vegetable' ? 'Juice' : 'Wine'),
    value: item.slug === 'coffee-bean' ? item.processing.kegPrice : item.processing.kegPrice,
    artisanValue: item.slug === 'coffee-bean' ? item.processing.kegPrice : Math.floor((item.processing.kegPrice * 14) / 10),
  }))
  .sort((a, b) => b.artisanValue - a.artisanValue);

const jarItems = processableItems
  .filter((item) => item.processing.jarPrice)
  .map((item) => ({
    ...item,
    product: item.processing.jarProduct || (item.subcategory === 'Vegetable' ? 'Pickles' : 'Jelly'),
    value: item.processing.jarPrice,
    artisanValue: Math.floor((item.processing.jarPrice * 14) / 10),
  }))
  .sort((a, b) => b.artisanValue - a.artisanValue);

export const metadata = {
  title: `Stardew Valley Artisan Goods Hub - Keg, Jar, Wine, Juice (${GAME_VERSION})`,
  description: 'Compare Stardew Valley artisan goods from Kegs and Jars: Wine, Juice, Jelly, Pickles, Coffee, Artisan values, formulas, and best items.',
  alternates: {
    canonical: '/artisan-goods/',
  },
  openGraph: {
    title: `Stardew Valley Artisan Goods Hub (${GAME_VERSION})`,
    description: 'Keg and Preserves Jar formulas, ranked artisan goods, and links to detailed item profit pages.',
    url: `${SITE_URL}/artisan-goods/`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/artisan-goods/#page`,
      name: 'Stardew Valley Artisan Goods Hub',
      description: 'Keg, Preserves Jar, Wine, Juice, Jelly, Pickles, and artisan value formulas.',
      url: `${SITE_URL}/artisan-goods/`,
      dateModified: LAST_VERIFIED,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/artisan-goods/#keg-list`,
      name: 'Best Keg Items',
      itemListElement: kegItems.slice(0, 20).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${item.name} -> ${item.product}`,
        url: `${SITE_URL}/item/${item.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Artisan Goods', item: `${SITE_URL}/artisan-goods/` },
      ],
    },
  ],
};

function gold(value) {
  return `${Number(value).toLocaleString()}g`;
}

function ValueTable({ title, subtitle, items, machine }) {
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
              <th className="text-left px-4 py-3">Input</th>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-right px-4 py-3">Base</th>
              <th className="text-right px-4 py-3">Artisan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.slice(0, 12).map((item) => (
              <tr key={`${machine}-${item.slug}`}>
                <td className="px-4 py-3">
                  <Link href={`/item/${item.slug}/`} className="font-medium text-blue-700 hover:underline">{item.name}</Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.product}</td>
                <td className="px-4 py-3 text-right">{gold(item.value)}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-700">{gold(item.artisanValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ArtisanGoodsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Artisan Goods</span>
        </nav>

        <header className="mb-8">
          <div className="text-sm font-semibold text-green-700 mb-2">Formula-audited for Stardew Valley {GAME_VERSION}</div>
          <h1 className="text-4xl font-black text-slate-950 mb-3">Stardew Valley artisan goods hub</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Compare the machines that turn raw items into high-value goods. This page links Keg, Preserves Jar, Wine, Juice, Jelly, Pickles, Coffee, and processing strategy pages into one browseable hub.
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Keg inputs</div>
            <div className="text-2xl font-bold text-slate-950">{kegItems.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Jar inputs</div>
            <div className="text-2xl font-bold text-slate-950">{jarItems.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Artisan bonus</div>
            <div className="text-2xl font-bold text-slate-950">+40%</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Last formula check</div>
            <div className="text-2xl font-bold text-slate-950">{LAST_VERIFIED}</div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4 mb-10">
          <div className="border border-purple-200 bg-purple-50 rounded-lg p-5">
            <h2 className="font-bold text-purple-950 mb-2">Keg formulas</h2>
            <p className="text-sm text-purple-900 mb-3">Wine = fruit base price x 3. Juice = floor(vegetable base price x 2.25). Coffee is 150g per 5 beans and does not receive Artisan.</p>
            <Link href="/guide/best-keg-items/" className="text-sm font-bold text-purple-800 hover:underline">Best Keg items</Link>
          </div>
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
            <h2 className="font-bold text-blue-950 mb-2">Preserves Jar formulas</h2>
            <p className="text-sm text-blue-900 mb-3">Jelly and Pickles use base price x 2 + 50. Crop quality does not change the finished jar value.</p>
            <Link href="/guide/best-preserves-jar-items/" className="text-sm font-bold text-blue-800 hover:underline">Best Jar items</Link>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-5">
            <h2 className="font-bold text-green-950 mb-2">Machine choice</h2>
            <p className="text-sm text-green-900 mb-3">Kegs usually win on high-value fruit. Jars are fast and often better for low-value crops or limited machine counts.</p>
            <Link href="/guide/keg-vs-jar/" className="text-sm font-bold text-green-800 hover:underline">Keg vs Jar analysis</Link>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <ValueTable title="Highest Artisan Keg values" subtitle="Sorted by finished value with Artisan where applicable." items={kegItems} machine="keg" />
          <ValueTable title="Highest Artisan Preserves Jar values" subtitle="Sorted by finished value with Artisan." items={jarItems} machine="jar" />
        </div>

        <section className="border border-slate-200 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-3">Related calculators and data</h2>
          <p className="text-slate-600 mb-4">
            Use the crop calculator when seed cost, start date, quality fertilizer, or profession toggles matter.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator/spring/" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800">Crop profit calculator</Link>
            <Link href="/crops/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Crops database</Link>
            <Link href="/about-data/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Formula audit</Link>
          </div>
        </section>
      </main>
    </>
  );
}
