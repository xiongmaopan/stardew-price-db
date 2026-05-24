import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/beginner-farm-map-choice/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Best Farm Map for Beginners | Stardew Valley 1.6.15',
  description:
    'Original StardewPriceDB guide to the best Stardew Valley farm maps for beginners, comparing Standard, Meadowlands, Forest, Four Corners, Riverland, Hill-top, Wilderness, and Beach.',
  keywords: [
    'best farm map Stardew Valley beginners',
    'Stardew Valley farm map choice',
    'Stardew Valley Standard Farm',
    'Stardew Valley Meadowlands Farm',
    'Stardew Valley beginner farm layout',
  ],
  alternates: {
    canonical: '/guide/beginner-farm-map-choice/',
  },
  openGraph: {
    title: 'Best Farm Map for Beginners in Stardew Valley',
    description:
      'A practical farm map ranking for new players, with crop space, difficulty, starting perks, and long-term layout advice.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best farm map for beginners' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Farm Map for Beginners',
    description: 'Choose the right Stardew Valley farm map before your save locks it in.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const farmMaps = [
  {
    rank: 1,
    name: 'Standard Farm',
    verdict: 'Best beginner choice',
    image: 'parsnip',
    score: 'Safest',
    bestFor: 'crops, animals, sprinklers, buildings, and learning the game without layout pressure',
    drawback: 'No special gimmick, so it can feel plain later.',
    playerTake:
      'Standard Farm is the map I recommend for most first saves. It gives you space before you know what you want. That matters more than a small themed bonus, because beginners change plans constantly.',
  },
  {
    rank: 2,
    name: 'Meadowlands Farm',
    verdict: 'Best animal start',
    image: 'hay',
    score: 'Friendly',
    bestFor: 'players who want chickens, animals, blue grass, and a softer farming start',
    drawback: 'You start with Hay instead of Parsnip Seeds, and crop space is lower than Standard.',
    playerTake:
      'Meadowlands is the friendliest 1.6 map if you like animals. The starting Coop and two chickens give the farm a direction immediately. It is easier emotionally, but less flexible than Standard for big crop fields.',
  },
  {
    rank: 3,
    name: 'Forest Farm',
    verdict: 'Best cozy resource map',
    image: 'hardwood',
    score: 'Useful',
    bestFor: 'foraging, early Hardwood, mushrooms, mixed seeds, and a natural-looking farm',
    drawback: 'Less open crop space, more obstacles, and tighter building layout.',
    playerTake:
      'Forest Farm is excellent if you enjoy gathering and a less grid-like map. The renewable Large Stumps are useful, but the map asks you to accept a messier layout.',
  },
  {
    rank: 4,
    name: 'Four Corners Farm',
    verdict: 'Best organized zones',
    image: 'quality-sprinkler',
    score: 'Balanced',
    bestFor: 'players who like separate zones for crops, animals, machines, and decoration',
    drawback: 'The map is split up, which can make early movement feel slower.',
    playerTake:
      'Four Corners is not only for multiplayer. Solo players can use it as a planning map: one corner for crops, one for animals, one for machines, one for style. It is good, just not as effortless as Standard.',
  },
  {
    rank: 5,
    name: 'Riverland Farm',
    verdict: 'Best fishing flavor, weaker farming space',
    image: 'fish-smoker',
    score: 'Niche',
    bestFor: 'players who want water, fishing identity, and the 1.6 Fish Smoker start',
    drawback: 'Water breaks up the farm and sharply reduces farming space.',
    playerTake:
      'Riverland looks charming, but new players often underestimate how much the water interrupts sprinklers, buildings, and field expansion. Pick it because you love fishing, not because it is efficient.',
  },
  {
    rank: 6,
    name: 'Hill-top Farm',
    verdict: 'Good mining flavor, awkward layout',
    image: 'copper-ore',
    score: 'Specialist',
    bestFor: 'players who like a small quarry area and mining theming',
    drawback: 'Cliffs and streams make the farm harder to organize.',
    playerTake:
      'Hill-top gives you a little mining identity at home, but it does not replace going to the Mines. For beginners, the layout cost is usually bigger than the resource benefit.',
  },
  {
    rank: 7,
    name: 'Wilderness Farm',
    verdict: 'Not ideal for a first save',
    image: 'slime',
    score: 'Risky',
    bestFor: 'players who intentionally want monsters on the farm',
    drawback: 'Night monsters add pressure while you are still learning chores and stamina.',
    playerTake:
      'Wilderness Farm is fun when you want the extra tension. It is a rough first pick because the early game already has enough systems to learn.',
  },
  {
    rank: 8,
    name: 'Beach Farm',
    verdict: 'Beautiful but advanced',
    image: 'coral',
    score: 'Advanced',
    bestFor: 'experienced players who want beach style, fishing, forage, and unconventional layouts',
    drawback: 'Most sandy soil does not support sprinklers, which breaks the normal crop scaling plan.',
    playerTake:
      'Beach Farm is not bad. It is just not beginner-safe. If your plan is huge crop fields and Quality Sprinklers, Beach Farm fights that plan from the beginning.',
  },
];

const quickAnswers = [
  ['Safest first save', 'Standard Farm'],
  ['Best animal start', 'Meadowlands Farm'],
  ['Best cozy map', 'Forest Farm'],
  ['Best organized zones', 'Four Corners Farm'],
  ['Best fishing identity', 'Riverland Farm'],
  ['Most likely to frustrate crop beginners', 'Beach Farm'],
];

const sourceChecks = [
  { label: 'Farm map overview and 1.6 map changes', href: 'https://stardewvalleywiki.com/Farm_Maps' },
  { label: 'Standard Farm space and tillable tiles', href: 'https://stardewvalleywiki.com/Standard_Farm' },
  { label: 'Meadowlands Farm starting Coop and chickens', href: 'https://stardewvalleywiki.com/Meadowlands_Farm' },
  { label: 'Beach Farm sprinkler limitation', href: 'https://stardewvalleywiki.com/Beach_Farm' },
  { label: 'Riverland Farm and Fish Smoker start', href: 'https://stardewvalleywiki.com/Riverlands_Farm' },
];

const relatedLinks = [
  { href: '/guide/year-1-beginner-walkthrough/', label: 'Year 1 Beginner Walkthrough' },
  { href: '/guide/year-1-spring-guide/', label: 'Year 1 Spring Guide' },
  { href: '/guide/greenhouse-layout/', label: 'Greenhouse Layout Guide' },
  { href: '/guide/best-greenhouse-crops/', label: 'Best Greenhouse Crops' },
  { href: '/guide/animal-profit/', label: 'Animal Profit Guide' },
  { href: '/crop-profit-calculator/', label: 'Crop Profit Calculator' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      mainEntityOfPage: PAGE_URL,
      headline: 'Best Farm Map for Beginners in Stardew Valley',
      description: metadata.description,
      datePublished: PAGE_UPDATED,
      dateModified: PAGE_UPDATED,
      version: GAME_VERSION,
      inLanguage: 'en-US',
      author: { '@type': 'Organization', name: 'StardewPriceDB', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#ranking`,
      name: 'Best Stardew Valley farm maps for beginners',
      itemListElement: farmMaps.map((map) => ({
        '@type': 'ListItem',
        position: map.rank,
        name: map.name,
        url: `${PAGE_URL}#${map.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Best Farm Map for Beginners', item: PAGE_URL },
      ],
    },
  ],
};

function IconBox({ slug, label }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
      <GameImage slug={slug} alt={label} width={38} height={38} />
    </div>
  );
}

export default function BeginnerFarmMapChoicePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollToTop />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Best Farm Map for Beginners</span>
      </nav>

      <header className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6 md:p-9">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
            StardewPriceDB Original Guide
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
            Updated {PAGE_UPDATED}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
            Verified for Stardew Valley {GAME_VERSION}
          </span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Best Farm Map for Beginners in Stardew Valley
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Pick Standard Farm if you want the safest first save. Pick Meadowlands if animals are the fantasy. Pick Forest if you want a cozy resource map. Most other maps are fun, but they ask a new player to solve layout problems before they even know what the farm needs.
            </p>
          </div>
          <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {['parsnip', 'hay', 'hardwood', 'quality-sprinkler', 'fish-smoker', 'coral'].map((slug) => (
                <IconBox key={slug} slug={slug} label={slug.replace(/-/g, ' ')} />
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Farm map choice is permanent for a save. This guide focuses on beginner comfort, long-term layout space, and how much the map helps or fights your first year.
            </p>
          </div>
        </div>
      </header>

      <figure className="my-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <img
          src="/images/guides/beginner-farm-map-choice.svg"
          alt="Best farm maps for Stardew Valley beginners infographic"
          width="1200"
          height="630"
          loading="eager"
          className="w-full rounded-xl"
        />
        <figcaption className="px-3 py-3 text-sm text-slate-500">
          Original StardewPriceDB infographic ranking the safest farm maps for a first Stardew Valley save.
        </figcaption>
      </figure>

      <section className="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickAnswers.map(([label, answer]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-black text-slate-950">{answer}</p>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        {farmMaps.map((map) => (
          <article key={map.name} id={map.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
              <IconBox slug={map.image} label={map.name} />
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-800">Rank #{map.rank}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">{map.score}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-950">{map.name}</h2>
                <p className="mt-2 text-lg font-semibold text-slate-700">{map.verdict}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-green-50 p-4">
                    <h3 className="text-xs font-black uppercase tracking-wide text-green-800">Best for</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{map.bestFor}</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-4">
                    <h3 className="text-xs font-black uppercase tracking-wide text-amber-800">Drawback</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{map.drawback}</p>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-slate-700">{map.playerTake}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-black text-slate-950">How to Choose Without Regret</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">If you are unsure</h3>
            <p className="mt-2 leading-7 text-slate-700">Choose Standard. It keeps every future strategy open: crops, barns, sheds, honey, fish ponds, and decoration.</p>
          </div>
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">If you love animals</h3>
            <p className="mt-2 leading-7 text-slate-700">Choose Meadowlands. The starting Coop gives a clear early rhythm, and the map feels less empty on day one.</p>
          </div>
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">If you want a challenge</h3>
            <p className="mt-2 leading-7 text-slate-700">Beach, Riverland, Hill-top, and Wilderness are better after you already understand sprinklers, buildings, stamina, and daily chores.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Mechanics Checked</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Map notes were checked against the current Stardew Valley {GAME_VERSION} map data set and StardewPriceDB verification date {LAST_VERIFIED}.
          </p>
          <ul className="mt-5 grid gap-2 md:grid-cols-2">
            {sourceChecks.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="text-sm font-semibold text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-black text-slate-950">Related Guides</h2>
          <div className="mt-5 grid gap-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-blue-700 shadow-sm hover:text-blue-900 hover:shadow">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
