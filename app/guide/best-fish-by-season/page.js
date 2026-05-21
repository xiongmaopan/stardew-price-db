import Link from 'next/link';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Fish by Season - Stardew Valley Fishing Profit Guide',
  description: 'Best Stardew Valley fish by season with location, time, weather, base price, difficulty, and practical fishing profit notes.',
  alternates: {
    canonical: '/guide/best-fish-by-season/',
  },
  openGraph: {
    title: 'Best Fish by Season - Stardew Valley',
    description: 'Seasonal fish rankings with locations, time windows, weather, price, difficulty, and profit notes.',
    url: `${SITE_URL}/guide/best-fish-by-season/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best fish by season in Stardew Valley' }],
  },
};

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

function getRows(season) {
  return fishData.fish
    .filter((fish) => fish.season?.includes(season))
    .sort((a, b) => b.basePrice - a.basePrice)
    .slice(0, 8);
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Fish by Season in Stardew Valley',
  description: 'Seasonal fishing profit guide for Stardew Valley.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/best-fish-by-season/',
};

export default function BestFishBySeasonPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Best Fish by Season</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
          Stardew Valley {verificationData.gameVersion} fishing guide
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Best Fish by Season</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Fishing profit changes by season, weather, time window, and difficulty. This guide highlights high-value fish
          to target each season, with links to detailed catch pages.
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-950 mb-3">Quick answer</h2>
        <p className="text-blue-900">
          Spring has Legend and Catfish, Summer has Crimsonfish, Octopus, Pufferfish, and Sturgeon, Fall has Angler and
          Catfish, and Winter has Glacierfish, Sturgeon, and Night Market fish. Legendary fish rank high but are limited
          catches, so repeatable fish matter for normal income.
        </p>
      </section>

      <div className="space-y-10">
        {seasons.map((season) => (
          <section key={season} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Best {season} Fish</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Fish</th>
                    <th className="px-4 py-3 text-right">Base Price</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Weather</th>
                    <th className="px-4 py-3 text-right">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getRows(season).map((fish) => (
                    <tr key={fish.slug} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/fishing/${fish.slug}/`} className="text-blue-700 hover:underline">
                          {fish.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{fish.basePrice.toLocaleString()}g</td>
                      <td className="px-4 py-3 text-slate-600">{fish.location?.join(', ')}</td>
                      <td className="px-4 py-3 text-slate-600">{fish.time}</td>
                      <td className="px-4 py-3 text-slate-600">{fish.weather}</td>
                      <td className="px-4 py-3 text-right">{fish.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related fishing guides</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/fishing/', label: 'All fishing locations' },
            { href: '/guide/best-fish-pond/', label: 'Best Fish Pond choices' },
            { href: '/guide/caviar/', label: 'Caviar guide' },
            { href: '/guide/year-1-money/', label: 'Year 1 money guide' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
