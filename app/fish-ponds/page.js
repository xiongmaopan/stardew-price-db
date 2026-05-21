import Link from 'next/link';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

const pondFish = fishData.fish
  .filter((fish) => fish.processing?.roePrice)
  .map((fish) => ({
    ...fish,
    preservedValue: fish.processing.caviarPrice || fish.processing.agedRoePrice || fish.processing.roePrice * 2,
    preservedProduct: fish.processing.caviarPrice ? 'Caviar' : 'Aged Roe',
  }))
  .sort((a, b) => b.preservedValue - a.preservedValue);

const caviarFish = pondFish.filter((fish) => fish.processing.caviarPrice);
const agedRoeFish = pondFish.filter((fish) => fish.processing.agedRoePrice);

export const metadata = {
  title: `Stardew Valley Fish Ponds - Roe, Aged Roe, Caviar Values (${GAME_VERSION})`,
  description: `Compare Stardew Valley Fish Pond candidates with Roe, Aged Roe, Caviar values, verified formulas, and fish detail links.`,
  alternates: {
    canonical: '/fish-ponds/',
  },
  openGraph: {
    title: `Stardew Valley Fish Pond Values (${GAME_VERSION})`,
    description: 'Roe, Aged Roe, and Caviar values for fish pond planning.',
    url: `${SITE_URL}/fish-ponds/`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/fish-ponds/#page`,
      name: 'Stardew Valley Fish Pond Values',
      description: `Fish Pond Roe, Aged Roe, and Caviar values verified for ${GAME_VERSION}.`,
      url: `${SITE_URL}/fish-ponds/`,
      dateModified: LAST_VERIFIED,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/fish-ponds/#fish-list`,
      name: 'Fish Pond Candidates',
      numberOfItems: pondFish.length,
      itemListElement: pondFish.slice(0, 30).map((fish, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: fish.name,
        url: `${SITE_URL}/fishing/${fish.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Fish Ponds', item: `${SITE_URL}/fish-ponds/` },
      ],
    },
  ],
};

function gold(value) {
  return `${Number(value).toLocaleString()}g`;
}

export default function FishPondsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Fish Ponds</span>
        </nav>

        <header className="mb-8">
          <div className="text-sm font-semibold text-green-700 mb-2">Formula-audited for Stardew Valley {GAME_VERSION}</div>
          <h1 className="text-4xl font-black text-slate-950 mb-3">Stardew Valley fish pond values</h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Compare fish that produce Roe in Fish Ponds. This hub focuses on verified item values, not fake fixed monthly income, because pond output rolls vary by population and item chance.
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Roe-producing fish</div>
            <div className="text-2xl font-bold text-slate-950">{pondFish.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Caviar fish</div>
            <div className="text-2xl font-bold text-slate-950">{caviarFish.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Aged Roe fish</div>
            <div className="text-2xl font-bold text-slate-950">{agedRoeFish.length}</div>
          </div>
          <div className="border border-slate-200 bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-500">Last formula check</div>
            <div className="text-2xl font-bold text-slate-950">{LAST_VERIFIED}</div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
            <h2 className="font-bold text-blue-950 mb-2">Roe formula</h2>
            <p className="text-sm text-blue-900">Roe value = floor(30 + fish base price / 2). This uses the fish base sell price, not fish quality.</p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-5">
            <h2 className="font-bold text-green-950 mb-2">Aged Roe</h2>
            <p className="text-sm text-green-900">Most Roe becomes Aged Roe in a Preserves Jar at 2x Roe value, then Artisan can apply to the finished artisan good.</p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-5">
            <h2 className="font-bold text-amber-950 mb-2">Sturgeon exception</h2>
            <p className="text-sm text-amber-900">Sturgeon Roe becomes Caviar worth 500g instead of normal Aged Roe. That exception is audited in the build checks.</p>
          </div>
        </section>

        <section className="border border-slate-200 bg-white rounded-lg overflow-hidden mb-10">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
            <h2 className="text-xl font-bold text-slate-950">Fish Pond value table</h2>
            <p className="text-sm text-slate-600">Sorted by preserved value before Artisan.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3">Fish</th>
                  <th className="text-right px-4 py-3">Base fish</th>
                  <th className="text-right px-4 py-3">Roe</th>
                  <th className="text-left px-4 py-3">Preserved product</th>
                  <th className="text-right px-4 py-3">Value</th>
                  <th className="text-left px-4 py-3">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pondFish.slice(0, 30).map((fish) => (
                  <tr key={fish.slug}>
                    <td className="px-4 py-3">
                      <Link href={`/fishing/${fish.slug}/`} className="font-medium text-blue-700 hover:underline">{fish.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-right">{gold(fish.basePrice)}</td>
                    <td className="px-4 py-3 text-right">{gold(fish.processing.roePrice)}</td>
                    <td className="px-4 py-3 text-slate-600">{fish.preservedProduct}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-700">{gold(fish.preservedValue)}</td>
                    <td className="px-4 py-3 text-slate-600">{fish.location?.slice(0, 2).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border border-slate-200 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-3">Fish Pond planning links</h2>
          <p className="text-slate-600 mb-4">
            Use these pages for catch conditions, pond strategy, and the formula audit behind the numbers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/guide/best-fish-pond/" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">Best Fish Pond guide</Link>
            <Link href="/fishing/sturgeon/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Sturgeon Caviar</Link>
            <Link href="/fishing/lava-eel/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Lava Eel Roe</Link>
            <Link href="/about-data/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Formula audit</Link>
          </div>
        </section>
      </main>
    </>
  );
}
