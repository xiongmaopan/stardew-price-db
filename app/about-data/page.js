import Link from 'next/link';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

export const metadata = {
  title: 'Data Sources & Formula Verification | StardewPriceDB',
  description: `How StardewPriceDB verifies Stardew Valley ${verificationData.gameVersion} prices, profession bonuses, artisan formulas, roe, Dehydrator, and Smoked Fish math.`,
  alternates: {
    canonical: '/about-data/',
  },
  openGraph: {
    title: 'StardewPriceDB Data Sources & Formula Verification',
    description: 'Source notes, known limitations, and formula rules behind the Stardew Valley price database.',
    url: `${SITE_URL}/about-data/`,
    type: 'article',
  },
};

const formulas = [
  {
    name: 'Quality sell price',
    formula: 'normal x 1 / 1.25 / 1.5 / 2',
    note: 'Silver, Gold, and Iridium quality values are floored after applying the quality multiplier.',
  },
  {
    name: 'Wine',
    formula: 'fruit base price x 3',
    note: 'Artisan profession adds 40% to the finished Wine value.',
  },
  {
    name: 'Jelly / Pickles',
    formula: 'crop base price x 2 + 50',
    note: 'Uses the crop base price, not crop quality.',
  },
  {
    name: 'Juice',
    formula: 'floor(vegetable base price x 2.25)',
    note: 'Artisan profession applies to the processed Juice.',
  },
  {
    name: 'Roe',
    formula: 'floor(30 + fish base price / 2)',
    note: 'Non-Sturgeon Roe becomes Aged Roe at 2x Roe value. Sturgeon Roe becomes Caviar worth 500g.',
  },
  {
    name: 'Dried Fruit / Dried Mushrooms',
    formula: 'floor(base price x 7.5 + 25)',
    note: 'Requires 5 matching inputs. Grapes become Raisins worth 600g instead of Dried Fruit.',
  },
  {
    name: 'Smoked Fish',
    formula: 'fish sell price x 2',
    note: 'Fish quality is preserved. Fisher/Angler affect the fish value; Artisan affects the smoked product.',
  },
];

const sourceLinks = [
  ['Version History', 'https://wiki.stardewvalley.net/Version_History'],
  ['Preserves Jar', 'https://stardewvalleywiki.com/Preserves_Jar'],
  ['Keg', 'https://stardewvalleywiki.com/Keg'],
  ['Roe', 'https://stardewvalleywiki.com/Roe'],
  ['Fish Pond', 'https://stardewvalleywiki.com/Fish_Pond'],
  ['Dehydrator', 'https://stardewvalleywiki.com/Dehydrator'],
  ['Dried Fruit', 'https://stardewvalleywiki.com/Dried_Fruit'],
  ['Dried Mushrooms', 'https://stardewvalleywiki.com/Dried_Mushrooms'],
  ['Fish Smoker', 'https://stardewvalleywiki.com/Fish_Smoker'],
  ['Smoked Fish', 'https://stardewvalleywiki.com/Smoked_Fish'],
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Dataset',
      '@id': `${SITE_URL}/about-data/#dataset`,
      name: 'StardewPriceDB Stardew Valley Price Dataset',
      description: `Curated Stardew Valley ${verificationData.gameVersion} price and formula dataset for crops, artisan goods, fish, gifts, bundles, and recipes.`,
      url: `${SITE_URL}/about-data/`,
      dateModified: LAST_VERIFIED,
      creator: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
      },
      isBasedOn: sourceLinks.map(([, url]) => url),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Data Sources', item: `${SITE_URL}/about-data/` },
      ],
    },
  ],
};

export default function AboutDataPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Data Sources</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-3 py-1 text-sm font-medium text-green-700 mb-4">
            Verified for Stardew Valley {verificationData.gameVersion}
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Data sources and formula verification</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            StardewPriceDB is built as a calculation tool first. Prices and derived values are checked against Stardew Valley Wiki data,
            official version history, and formula tests in the build process.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm text-slate-500 mb-1">Last verified</div>
            <div className="text-2xl font-bold text-slate-900">{LAST_VERIFIED}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm text-slate-500 mb-1">Game version</div>
            <div className="text-2xl font-bold text-slate-900">{verificationData.gameVersion}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm text-slate-500 mb-1">Verification mode</div>
            <div className="text-2xl font-bold text-slate-900">Formula audit</div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-10">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Core formulas we audit</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {formulas.map((item) => (
              <div key={item.name} className="grid md:grid-cols-[180px_1fr] gap-3 px-6 py-5">
                <h3 className="font-bold text-slate-900">{item.name}</h3>
                <div>
                  <code className="inline-block rounded bg-slate-900 px-3 py-1 text-sm text-cyan-300">{item.formula}</code>
                  <p className="text-sm text-slate-600 mt-2">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-blue-950 mb-3">What is covered</h2>
            <ul className="space-y-2 text-sm text-blue-950">
              <li>Crop sell prices and quality multipliers.</li>
              <li>Keg, Preserves Jar, Dehydrator, Fish Smoker, and Fish Pond formulas.</li>
              <li>Profession bonuses for Tiller, Artisan, Angler, and Rancher.</li>
              <li>Known Stardew Valley 1.6 crop additions such as Carrot, Summer Squash, Broccoli, and Powdermelon.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-xl font-bold text-amber-950 mb-3">Known limits</h2>
            <ul className="space-y-2 text-sm text-amber-950">
              <li>Some strategy notes are intentionally disabled until source-audited.</li>
              <li>Fish Pond monthly income is not shown as a fixed number because daily rolls vary by population and output chance.</li>
              <li>Variable-price products are calculated by formula instead of stored as one fake fixed price.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Primary references</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sourceLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-50"
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-950 mb-3">Use the calculators</h2>
          <p className="text-sm text-green-900 mb-4">
            These pages use the verified formulas above and update when profession toggles change.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator/spring/" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800">
              Crop calculator
            </Link>
            <Link href="/guide/keg-vs-jar/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-green-800 border border-green-200 hover:bg-green-100">
              Keg vs Jar guide
            </Link>
            <Link href="/guide/best-fish-pond/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-green-800 border border-green-200 hover:bg-green-100">
              Fish Pond formulas
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
