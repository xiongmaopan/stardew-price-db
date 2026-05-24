import Link from 'next/link';
import verificationData from '@/data/verification.json';
import itemsData from '@/data/items.json';
import fishData from '@/data/fish.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

export const metadata = {
  title: 'About StardewPriceDB | Stardew Valley Price Calculations',
  description:
    'Learn how StardewPriceDB verifies Stardew Valley prices, crop profit, Keg and Jar formulas, fish values, profession bonuses, and update history.',
  keywords: [
    'Stardew Valley price calculation',
    'StardewPriceDB about',
    'Stardew Valley data sources',
    'Keg profit formula',
    'Artisan bonus',
    'crop profit calculator',
  ],
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About StardewPriceDB',
    description: 'How StardewPriceDB verifies Stardew Valley sell prices, calculators, and formula data.',
    url: `${SITE_URL}/about/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'About StardewPriceDB' }],
  },
};

const stats = [
  { label: 'Item entries', value: itemsData.items.length.toLocaleString() },
  { label: 'Fish entries', value: fishData.fish.length.toLocaleString() },
  { label: 'Game version', value: verificationData.gameVersion },
  { label: 'Last data check', value: LAST_VERIFIED },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: 'About StardewPriceDB',
      url: `${SITE_URL}/about/`,
      dateModified: LAST_VERIFIED,
      description:
        'StardewPriceDB explains and calculates Stardew Valley sell prices, crop profit, artisan processing values, fish values, and profession bonuses.',
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about/` },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">About</span>
        </nav>

        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Verified for Stardew Valley {verificationData.gameVersion}
          </p>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
            About StardewPriceDB
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">
            StardewPriceDB is a fan-made price database and calculator site for Stardew Valley. It is built for players
            who need fast answers to practical farm decisions: what an item sells for, whether processing is worth it,
            how professions change the result, and which crop or fish gives the best return for the time available.
          </p>
        </header>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="mt-1 text-2xl font-black text-slate-950">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-950">What makes the site useful</h2>
          <div className="space-y-4 leading-7 text-slate-700">
            <p>
              A plain price list can answer "how much does this sell for", but most Stardew Valley money decisions need
              more context. A crop with a high base price may lose to a cheaper crop after seed cost, harvest count,
              regrowth timing, or machine bottlenecks are included. A fish can be more useful as smoked fish, roe,
              aged roe, or a fish pond input depending on the player's setup.
            </p>
            <p>
              That is why the site combines database pages with calculators and strategy guides. Item pages show sell
              prices and processing routes. Seasonal calculators compare real planting windows. Fishing and fish pond
              pages separate catch rules from profit decisions. Guide pages explain when the math changes in actual play.
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="mb-3 text-2xl font-bold text-green-950">How prices are calculated</h2>
            <ul className="space-y-3 text-sm leading-6 text-green-950">
              <li>Base prices are checked against Stardew Valley {verificationData.gameVersion} item data and public wiki references.</li>
              <li>Quality uses normal, silver, gold, and iridium multipliers, with game-style rounding where needed.</li>
              <li>Tiller, Artisan, Angler, and Rancher profession bonuses are applied only to eligible item categories.</li>
              <li>Keg, Preserves Jar, Dehydrator, Fish Smoker, and Fish Pond values are calculated from formulas instead of guessed by hand.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="mb-3 text-2xl font-bold text-blue-950">Editorial standards</h2>
            <ul className="space-y-3 text-sm leading-6 text-blue-950">
              <li>Pages should help a player make a decision, not only repeat a number that already exists elsewhere.</li>
              <li>Formula-driven values are kept separate from fixed sell prices so variable outputs are not presented as fake constants.</li>
              <li>New pages are released slowly from a queue after the data, internal links, and search intent are checked.</li>
              <li>When a mechanic is uncertain or variable, the page explains the limitation instead of hiding it.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Data sources and corrections</h2>
          <p className="mb-4 leading-7 text-slate-700">
            The data is maintained from Stardew Valley game data, formula tests, and public reference pages such as the
            Stardew Valley Wiki. The detailed formula notes are listed on the data sources page, including Keg, Jar,
            Roe, Fish Pond, Dehydrator, and Fish Smoker calculations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about-data/" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
              View data sources
            </Link>
            <Link href="/crop-profit-calculator/" className="rounded-lg border border-green-200 bg-white px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-50">
              Use crop calculator
            </Link>
            <Link href="/contact/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Report a correction
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-amber-950">Fan-made notice</h2>
          <p className="leading-7 text-amber-950">
            StardewPriceDB is not affiliated with or endorsed by ConcernedApe. Stardew Valley and its game assets belong
            to their respective owner. This site exists as a player utility for price lookup, profit planning, and data
            verification.
          </p>
        </section>
      </main>
    </>
  );
}
