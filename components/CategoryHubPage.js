import Link from 'next/link';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

function gold(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'Variable';
  return `${Number(value).toLocaleString()}g`;
}

function qualityPrices(basePrice) {
  return {
    silver: Math.floor(basePrice * 1.25),
    gold: Math.floor(basePrice * 1.5),
    iridium: Math.floor(basePrice * 2),
  };
}

function hasQualityPrices(item) {
  return item.hasQuality !== false && ['Crops', 'Forage', 'Animal Products'].includes(item.category);
}

function displayPrice(item) {
  if (item.slug === 'aged-roe') return 'Variable';
  if (item.slug === 'omni-geode') return 'No sell price';
  return gold(item.basePrice);
}

export function buildCategoryJsonLd({ slug, title, description, items }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/${slug}/#page`,
        name: title,
        description,
        url: `${SITE_URL}/${slug}/`,
        dateModified: LAST_VERIFIED,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/${slug}/#item-list`,
        name: title,
        numberOfItems: items.length,
        itemListElement: items.slice(0, 40).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${SITE_URL}/item/${item.slug}/`,
        })),
      },
      {
        '@type': 'Dataset',
        '@id': `${SITE_URL}/${slug}/#dataset`,
        name: title,
        description,
        url: `${SITE_URL}/${slug}/`,
        version: verificationData.gameVersion,
        dateModified: LAST_VERIFIED,
        creator: {
          '@type': 'Organization',
          name: 'StardewPriceDB',
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}/${slug}/` },
        ],
      },
    ],
  };
}

export default function CategoryHubPage({
  title,
  eyebrow,
  intro,
  items,
  categorySlug,
  note,
  primaryLinks = [],
}) {
  const sortedItems = [...items].sort((a, b) => b.basePrice - a.basePrice);
  const subcategories = [...new Set(items.map((item) => item.subcategory).filter(Boolean))];
  const processable = items.filter((item) => item.processing);
  const highest = sortedItems.find((item) => item.basePrice > 0);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/selling-prices/" className="hover:text-slate-700">Selling Prices</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-800">{title}</span>
      </nav>

      <header className="mb-8">
        <div className="text-sm font-semibold text-green-700 mb-2">{eyebrow}</div>
        <h1 className="text-4xl font-black text-slate-950 mb-3">{title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{intro}</p>
      </header>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="border border-slate-200 bg-white p-4 rounded-lg">
          <div className="text-sm text-slate-500">Entries</div>
          <div className="text-2xl font-bold text-slate-950">{items.length}</div>
        </div>
        <div className="border border-slate-200 bg-white p-4 rounded-lg">
          <div className="text-sm text-slate-500">Subcategories</div>
          <div className="text-2xl font-bold text-slate-950">{subcategories.length || 1}</div>
        </div>
        <div className="border border-slate-200 bg-white p-4 rounded-lg">
          <div className="text-sm text-slate-500">Highest listed price</div>
          <div className="text-2xl font-bold text-slate-950">{highest ? gold(highest.basePrice) : 'Variable'}</div>
        </div>
        <div className="border border-slate-200 bg-white p-4 rounded-lg">
          <div className="text-sm text-slate-500">Last data check</div>
          <div className="text-2xl font-bold text-slate-950">{LAST_VERIFIED}</div>
        </div>
      </section>

      {note && (
        <section className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950 mb-2">Price note</h2>
          <p className="text-sm text-amber-900">{note}</p>
        </section>
      )}

      <section className="grid lg:grid-cols-3 gap-4 mb-10">
        {primaryLinks.map((link) => (
          <Link key={link.href} href={link.href} className="border border-slate-200 bg-white rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition">
            <h2 className="text-lg font-bold text-slate-900 mb-2">{link.title}</h2>
            <p className="text-sm text-slate-600">{link.text}</p>
          </Link>
        ))}
      </section>

      <section className="border border-slate-200 bg-white rounded-lg overflow-hidden mb-10">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-950">{title} table</h2>
          <p className="text-sm text-slate-600">Base sell prices, quality prices where applicable, source, and detail pages.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white text-slate-600 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3">Item</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-right px-4 py-3">Base</th>
                <th className="text-right px-4 py-3">Gold</th>
                <th className="text-right px-4 py-3">Iridium</th>
                <th className="text-left px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedItems.map((item) => {
                const quality = item.basePrice > 0 && hasQualityPrices(item) ? qualityPrices(item.basePrice) : null;
                return (
                  <tr key={item.slug} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/item/${item.slug}/`} className="font-medium text-blue-700 hover:underline">{item.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.subcategory || item.category}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">{displayPrice(item)}</td>
                    <td className="px-4 py-3 text-right">{quality ? gold(quality.gold) : '-'}</td>
                    <td className="px-4 py-3 text-right">{quality ? gold(quality.iridium) : '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{item.source || item.seedSource || item.season?.join(', ') || 'Various sources'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {processable.length > 0 && (
        <section className="border border-slate-200 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-3">Processing and profit checks</h2>
          <p className="text-slate-600 mb-4">
            Some entries in this category can be processed before selling. Open each item page for machine time, profession bonuses, and gain over raw sale value.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/artisan-goods/" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">Artisan goods hub</Link>
            <Link href="/about-data/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Formula audit</Link>
            <Link href="/selling-prices/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">All selling prices</Link>
          </div>
        </section>
      )}
    </main>
  );
}
