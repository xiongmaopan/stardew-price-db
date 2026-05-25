import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/joja-vs-community-center/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Joja vs Community Center | Stardew Valley Route Guide',
  description:
    'Original StardewPriceDB guide comparing Joja and Community Center routes by cost, unlock speed, story value, bundles, Greenhouse timing, and first-year planning.',
  keywords: [
    'Stardew Valley Joja vs Community Center',
    'Joja or Community Center',
    'Stardew Valley Joja route',
    'Stardew Valley Community Center route',
    'Stardew Valley Greenhouse unlock',
  ],
  alternates: {
    canonical: '/guide/joja-vs-community-center/',
  },
  openGraph: {
    title: 'Joja vs Community Center: Which Route Should You Choose?',
    description:
      'A practical route decision guide for Stardew Valley 1.6.15, with costs, deadlines, rewards, and first-save recommendations.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Joja vs Community Center guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joja vs Community Center',
    description: 'Pick the right Stardew Valley route for your first save, speed save, or money-focused farm.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const routeCards = [
  {
    route: 'Community Center',
    badge: 'Best first save',
    image: 'spring-seeds',
    cost: 'Items, seasonal planning, and Vault gold',
    speed: 'Slower unless you plan every season',
    unlockStyle: 'Bundles restore rooms and unlock rewards',
    bestFor: 'story, exploration, learning the valley, and a satisfying first completion',
    warning: 'Missing a seasonal item can delay completion by months.',
  },
  {
    route: 'Joja',
    badge: 'Best control',
    image: 'gold',
    cost: '5,000g membership plus 135,000g for all developments',
    speed: 'Fast if your farm already prints gold',
    unlockStyle: 'Pay for each town development at JojaMart',
    bestFor: 'speed, money-only saves, repeat playthroughs, and fast Greenhouse access',
    warning: 'It removes the Community Center route and has no bundle friendship rewards.',
  },
];

const jojaDevelopments = [
  ['Bus to the Desert', '40,000g', 'Skull Cavern, Oasis, Starfruit seeds, Desert Trader access'],
  ['Bridge to the Quarry', '25,000g', 'Quarry access without bundle routing'],
  ['Glittering Boulder', '20,000g', 'Panning unlock'],
  ['Minecarts', '15,000g', 'Fast travel between Mines, Bus Stop, Town, and Quarry'],
  ['Greenhouse', '35,000g', 'Year-round crop engine, especially Ancient Fruit and Starfruit'],
];

const decisionRules = [
  {
    title: 'Choose Community Center if this is your first serious save',
    image: 'calendar',
    text:
      'The bundle route teaches seasons, fishing, foraging, mining, animals, and crop planning in a way the Joja route skips. It is slower, but it makes you understand why the valley matters.',
  },
  {
    title: 'Choose Joja if you care about speed more than story',
    image: 'gold',
    text:
      'Joja converts route planning into a money problem. If your farm is already strong at fishing, mining, Kegs, or animal income, paying for the Greenhouse and Minecarts can be cleaner than chasing bundle items.',
  },
  {
    title: 'Do not buy Joja membership too early',
    image: 'spring-seeds',
    text:
      'Easy bundles still give useful rewards before you commit. If you are leaning Joja, wait until you can afford membership plus the first development you actually want.',
  },
  {
    title: 'Greenhouse timing is the real pressure point',
    image: 'quality-sprinkler',
    text:
      'The Greenhouse changes the farm economy. Community Center asks for Pantry bundles; Joja asks for 35,000g. The better route is the one you can realistically finish before your farm stalls.',
  },
];

const routeByPlayer = [
  ['New player', 'Community Center', 'It gives structure and prevents the game from becoming only a gold grind.'],
  ['Second save', 'Either', 'Pick based on whether you want the story again or want faster routing.'],
  ['Money-focused farm', 'Joja', 'Cash routes can unlock Greenhouse, Minecarts, and Bus with fewer seasonal blockers.'],
  ['Completionist', 'Community Center', 'The route has unique story payoff and the Local Legend achievement.'],
  ['Low-stress casual save', 'Community Center', 'Bundles give natural goals without forcing constant income optimization.'],
  ['Challenge or speed plan', 'Joja', 'Gold is easier to route precisely than rare bundle timing.'],
];

const sourceChecks = [
  { label: 'Community Center unlock and bundle route', href: 'https://stardewvalleywiki.com/Community_Center' },
  { label: 'Joja membership, developments, and costs', href: 'https://stardewvalleywiki.com/Joja_Community_Development_Form' },
  { label: 'Bundles and room rewards', href: 'https://stardewvalleywiki.com/Bundles' },
  { label: 'Greenhouse unlock context', href: 'https://stardewvalleywiki.com/Greenhouse' },
  { label: 'Minecarts unlock context', href: 'https://stardewvalleywiki.com/Minecart' },
];

const relatedLinks = [
  { href: '/guide/community-center/', label: 'Community Center Completion Guide' },
  { href: '/guide/community-center-fish-bundles/', label: 'Community Center Fish Bundles' },
  { href: '/guide/year-1-beginner-walkthrough/', label: 'Year 1 Beginner Walkthrough' },
  { href: '/guide/year-1-money/', label: 'Year 1 Money Guide' },
  { href: '/guide/best-greenhouse-crops/', label: 'Best Greenhouse Crops' },
  { href: '/crop-profit-calculator/', label: 'Crop Profit Calculator' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      mainEntityOfPage: PAGE_URL,
      headline: 'Joja vs Community Center: Which Route Should You Choose?',
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
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Joja vs Community Center', item: PAGE_URL },
      ],
    },
  ],
};

function IconBox({ slug, label }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm md:h-14 md:w-14">
      <GameImage slug={slug} alt={label} width={38} height={38} />
    </div>
  );
}

export default function JojaVsCommunityCenterPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollToTop />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Joja vs Community Center</span>
      </nav>

      <header className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 md:p-9">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="inline-flex max-w-full items-center rounded-full bg-blue-700 px-3 py-1 text-[11px] font-black uppercase leading-5 tracking-wide text-white sm:text-xs">
            StardewPriceDB Original Guide
          </span>
          <span className="inline-flex max-w-full items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold leading-5 text-slate-700 shadow-sm sm:text-xs">
            Updated {PAGE_UPDATED}
          </span>
          <span className="inline-flex max-w-full items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold leading-5 text-slate-700 shadow-sm sm:text-xs">
            Verified for Stardew Valley {GAME_VERSION}
          </span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="break-words text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Joja vs Community Center: Which Route Should You Choose?
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Short answer: pick Community Center for your first real save, pick Joja when you already understand the game and want faster control over unlocks. The choice is not just moral flavor. It changes how your farm spends time, money, and attention.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-white bg-white/80 p-4 shadow-sm md:p-5">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['spring-seeds', 'gold', 'calendar', 'quality-sprinkler', 'chest'].map((slug) => (
                <IconBox key={slug} slug={slug} label={slug.replace(/-/g, ' ')} />
              ))}
            </div>
            <p className="mt-4 break-words text-sm leading-6 text-slate-600">
              This guide is written as a player decision page, not a plot summary. Data signals were checked against the Stardew Valley {GAME_VERSION} source set on {LAST_VERIFIED}.
            </p>
          </div>
        </div>
      </header>

      <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:p-3">
        <img
          src="/images/guides/joja-vs-community-center.svg?v=20260525-layout"
          alt="Joja vs Community Center route comparison infographic"
          width="1200"
          height="675"
          loading="eager"
          className="block w-full rounded-xl"
        />
        <figcaption className="px-3 py-3 text-sm text-slate-500">
          Original StardewPriceDB infographic summarizing the route choice: Community Center for a first save, Joja for controlled repeat saves.
        </figcaption>
      </figure>

      <section className="my-8 grid gap-4 md:grid-cols-2">
        {routeCards.map((route) => (
          <article key={route.route} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                  {route.badge}
                </span>
                <h2 className="mt-3 text-2xl font-black text-slate-950">{route.route}</h2>
              </div>
              <IconBox slug={route.image} label={route.route} />
            </div>
            <dl className="grid gap-3 text-sm">
              {[
                ['Cost', route.cost],
                ['Speed', route.speed],
                ['Unlock style', route.unlockStyle],
                ['Best for', route.bestFor],
                ['Watch out', route.warning],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 p-4">
                  <dt className="font-black uppercase tracking-wide text-slate-500">{label}</dt>
                  <dd className="mt-1 font-semibold leading-6 text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>

      <section className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Joja Development Costs</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Joja is simple because every town repair becomes a price tag. The full development form costs 135,000g, or 140,000g after the 5,000g membership.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3">Development</th>
                <th className="px-3 py-3">Cost</th>
                <th className="px-3 py-3">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {jojaDevelopments.map(([name, cost, value]) => (
                <tr key={name} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-4 font-bold text-slate-950">{name}</td>
                  <td className="px-3 py-4 font-black text-green-700">{cost}</td>
                  <td className="px-3 py-4 leading-6 text-slate-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="my-10 grid gap-5 lg:grid-cols-2">
        {decisionRules.map((rule) => (
          <article key={rule.title} className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <div className="flex items-start gap-5">
              <IconBox slug={rule.image} label={rule.title} />
              <div className="min-w-0">
                <h2 className="text-lg font-black leading-7 text-slate-950">{rule.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-700">{rule.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Route Recommendation by Player Type</h2>
        <div className="mt-5 grid gap-3">
          {routeByPlayer.map(([player, route, reason]) => (
            <div key={player} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[0.8fr_0.6fr_1.6fr] md:items-center">
              <div className="font-black text-slate-950">{player}</div>
              <div className={route === 'Joja' ? 'font-black text-blue-700' : 'font-black text-green-700'}>{route}</div>
              <div className="text-sm leading-6 text-slate-700">{reason}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-2xl font-black text-slate-950">StardewPriceDB Take</h2>
        <p className="mt-3 leading-7 text-slate-700">
          For a first save, Community Center is the better route because it turns the whole game into a guided tour. For a repeat save, Joja is not wrong. It is a clean tool for players who already know how to earn gold and want specific unlocks without seasonal bundle friction.
        </p>
        <p className="mt-3 leading-7 text-slate-700">
          The mistake is choosing Joja too early because you feel behind. If your income is not stable yet, Joja turns stress into bigger stress. Build the farm first, then choose the route.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Mechanics Checked</h2>
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
