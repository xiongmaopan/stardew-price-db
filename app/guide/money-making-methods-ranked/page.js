import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/money-making-methods-ranked/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Stardew Valley Money Making Methods Ranked 1.6.15',
  description:
    'Original StardewPriceDB ranking of Stardew Valley money making methods: Kegs, Sheep, Pigs, Mushroom Logs, Fish Ponds, Bee Houses, Crab Pots, and Fish Smokers.',
  keywords: [
    'Stardew Valley money making methods',
    'Stardew Valley money making ranking',
    'Stardew Valley best way to make money',
    'Stardew Valley Keg profit',
    'Stardew Valley Sheep profit',
    'Stardew Valley Pig profit',
    'Stardew Valley Fish Smoker profit',
  ],
  alternates: {
    canonical: '/guide/money-making-methods-ranked/',
  },
  openGraph: {
    title: 'Stardew Valley Money Making Methods Ranked',
    description:
      'A practical StardewPriceDB ranking of eight money routes by profit, setup cost, labor, season limits, and automation potential.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stardew Valley money making methods ranked' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Money Making Methods Ranked',
    description: 'Kegs, Sheep, Pigs, Mushroom Logs, Fish Ponds, Bee Houses, Crab Pots, and Fish Smokers ranked by practical value.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const ranking = [
  {
    rank: 8,
    name: 'Fish Smoker Route',
    slug: 'fish-smoker-route',
    verdict: 'Strong on expensive fish, rough as a main early-game economy.',
    score: 'Niche',
    images: ['fish-smoker', 'smoked-fish', 'coal'],
    bestUse: 'Smoking high-value fish you already planned to sell.',
    bottleneck: '10,000g recipe, three jelly materials, and 1 Coal per fish.',
    automation: 'Low',
    playstyle:
      'Catch fish, load each fish into a Fish Smoker with 1 Coal, then collect Smoked Fish after 50 in-game minutes. The smoked product keeps the fish quality and sells for 2x the fish value before relevant profession math.',
    originalTake:
      'The ceiling looks good, but the route asks for too much from a new farm. Buying Coal at 150g in Year 1 makes many cheap fish feel awful to smoke, and the Fish Smoker recipe itself costs 10,000g unless your farm setup or prize luck gives you one. It is useful, but not the money route I would build a save around first.',
    notes: [
      'Best with Lava Eel, Sturgeon, legendary fish, or other high-value catches.',
      'Weak with cheap fish when Coal is purchased instead of farmed.',
      'Fishing difficulty matters. If fishing already drains your patience, this route will not feel passive.',
    ],
  },
  {
    rank: 7,
    name: 'Crab Pot Route',
    slug: 'crab-pot-route',
    verdict: 'Good fishing XP and bundle support, weak profit for the daily work.',
    score: 'Low profit',
    images: ['crab-pot', 'bait', 'lobster'],
    bestUse: 'Fishing XP without playing the fishing mini-game.',
    bottleneck: 'Daily baiting and collection, plus a real chance of trash.',
    automation: 'Low to medium with Luremaster',
    playstyle:
      'Place Crab Pots in river, lake, pond, or ocean water, load bait, and check them the next day. Fishing level 3 unlocks the recipe, or Willy sells Crab Pots for 1,500g after level 3.',
    originalTake:
      'The problem is not that Crab Pots are useless. The problem is that they ask for attention every day and still hand you trash often enough to feel slow. Lobster is the exciting roll at 120g base, but that does not carry the whole route. Use Crab Pots as a side system, not your farm identity.',
    notes: [
      'Harvesting a Crab Pot gives Fishing XP even when the result is trash.',
      'Mariner removes trash. Luremaster removes bait upkeep. Without those, the route feels much worse.',
      'Worth keeping for Crab Pot Bundle items and easy collection progress.',
    ],
  },
  {
    rank: 6,
    name: 'Bee House Route',
    slug: 'bee-house-route',
    verdict: 'Excellent passive support, but seasonal and flower-dependent.',
    score: 'Good side income',
    images: ['bee-house', 'fairy-honey', 'fairy-rose'],
    bestUse: 'Fairy Rose Honey layouts in Fall or Ginger Island honey farms.',
    bottleneck: 'Flower timing, Maple Syrup, and no normal farm honey in Winter.',
    automation: 'Medium',
    playstyle:
      'Craft Bee Houses at Farming level 3, place them outside, and let them produce Honey every 4 nights outside Winter. A mature flower within 5 tiles can turn Wild Honey into higher-value flower honey.',
    originalTake:
      'Bee Houses are satisfying because the daily labor is tiny. The catch is timing. Fairy Rose Honey is the headline at 680g base, but Fairy Rose takes 12 days to bloom, and Winter shuts normal farm production down. This is a clean supporting route, not the fastest path to becoming rich.',
    notes: [
      'Fairy Rose Honey is the best standard flower honey value.',
      'Ginger Island removes the normal farm Winter problem for flower honey setups.',
      'Do not harvest the flower before collecting the honey, or the honey can downgrade.',
    ],
  },
  {
    rank: 5,
    name: 'Fish Pond Route',
    slug: 'fish-pond-route',
    verdict: 'Steady all-season income, but slow to scale.',
    score: 'Stable',
    images: ['fish-pond', 'sturgeon', 'roe', 'caviar'],
    bestUse: 'Sturgeon ponds for Caviar, plus specialty fish produce.',
    bottleneck: '5,000g building cost, 200 Stone, 5 Seaweed, 5 Green Algae, and population quests.',
    automation: 'Medium',
    playstyle:
      'Build a Fish Pond at Robin, place one fish inside, complete pond quests to increase capacity, and collect Roe or special produce. Sturgeon Roe becomes Caviar in a Preserves Jar after 4 days.',
    originalTake:
      'Fish Ponds are better than they look if you like slow systems. They produce in every season and do not care about crop calendars. The downside is that the income arrives in small chunks, and the pond takes space plus quest items before it feels alive.',
    notes: [
      'Caviar sells for 500g base and 700g with Artisan.',
      'Fish Ponds can also support rare utility items depending on the fish.',
      'Great as a background machine, not as the fastest early cash engine.',
    ],
  },
  {
    rank: 4,
    name: 'Mushroom Log Route',
    slug: 'mushroom-log-route',
    verdict: 'Strong 1.6 side economy with real setup friction.',
    score: 'Underrated',
    images: ['mushroom-log', 'chanterelle', 'dehydrator', 'moss'],
    bestUse: 'Tree-backed Mushroom Log clusters, especially with Pine support for Chanterelles.',
    bottleneck: 'Hardwood, Moss, Dehydrator access, and enough nearby wild trees.',
    automation: 'Medium',
    playstyle:
      'At Foraging level 4, craft Mushroom Logs from Hardwood and Moss. Nearby wild trees improve output, and the log produces mushrooms every 4 days, with rainy days shortening the timer by one day.',
    originalTake:
      'This route is one of the best new practical side systems. Chanterelles at 160g base are already good, and 5 Chanterelles in a Dehydrator become Dried Mushrooms worth 1,225g base, which is 425g above selling the five raw mushrooms. The reason it is not top three is simple: Moss and Dehydrator setup slow down mass production.',
    notes: [
      'Pine trees push the table toward Chanterelles, but no layout guarantees only one mushroom type.',
      'The Dehydrator needs five same-type, same-quality edible mushrooms.',
      'Mushroom Logs produce in all seasons, including Desert and Ginger Island placement.',
    ],
  },
  {
    rank: 3,
    name: 'Pig and Truffle Route',
    slug: 'pig-truffle-route',
    verdict: 'Huge warm-season profit with one painful Winter weakness.',
    score: 'Very strong',
    images: ['pig', 'truffle', 'truffle-oil'],
    bestUse: 'Deluxe Barns with clean outdoor truffle space and Botanist/Gatherer support.',
    bottleneck: 'Deluxe Barn access, 16,000g per Pig, and no truffles in Winter or rain.',
    automation: 'Medium',
    playstyle:
      'Buy Pigs from Marnie after upgrading to a Deluxe Barn. A fed adult Pig can dig up Truffles outside when the weather and season allow it. Truffles sell for 625g base or 1,250g at iridium quality.',
    originalTake:
      'Pigs are the lazy-rich fantasy for three seasons. Once friendship rises, a Pig can average around three Truffles per eligible day at max friendship, and Botanist makes every Truffle iridium quality. The ranking penalty is Winter. A money route that stops for a whole season cannot be number one.',
    notes: [
      'Pigs mature after 10 nights if fed.',
      'They need to be fed, outside, not in Winter, and not in rain or storms.',
      'Truffle Oil is useful, but Botanist iridium Truffles can beat processing for pure sell value.',
    ],
  },
  {
    rank: 2,
    name: 'Sheep and Wool Route',
    slug: 'sheep-wool-route',
    verdict: 'The cleanest passive animal route once your barn is upgraded.',
    score: 'Passive winner',
    images: ['sheep', 'wool', 'cloth'],
    bestUse: 'Year-round barn income with Auto-Grabbers and high friendship.',
    bottleneck: 'Deluxe Barn, 8,000g per Sheep, Shears or Auto-Grabber, and friendship ramp.',
    automation: 'High',
    playstyle:
      'Buy Sheep from Marnie after upgrading to a Deluxe Barn. Fed adult Sheep grow Wool every 3 days by default, faster with high friendship and the Shepherd profession. Auto-Grabbers can collect Wool automatically.',
    originalTake:
      'This route feels less flashy than Pigs, but it is brutally practical. Wool sells for 340g base and 680g at iridium quality, Sheep mature fast, and the output does not disappear in Winter. Add Auto-Grabbers, and the route turns into sleep-friendly passive income.',
    notes: [
      'Sheep mature after 4 nights if fed.',
      'At high friendship and with Shepherd, Sheep can produce Wool every day.',
      'Wool can be processed into Cloth, but high-quality Wool may be worth selling directly depending on quality and profession setup.',
    ],
  },
  {
    rank: 1,
    name: 'Keg Route',
    slug: 'keg-route',
    verdict: 'Best overall money route because it scales, automates, and turns high-value crops into huge margins.',
    score: 'Best overall',
    images: ['keg', 'starfruit', 'wine', 'hops', 'pale-ale', 'oak-resin'],
    bestUse: 'Starfruit Wine, Ancient Fruit Wine, and first-year Summer Pale Ale setups.',
    bottleneck: 'Farming level 8, Oak Resin, crop supply, and enough Kegs.',
    automation: 'High',
    playstyle:
      'Craft Kegs at Farming level 8 using Wood, Copper Bar, Iron Bar, and Oak Resin. Fruit becomes Wine at 3x base fruit price, most vegetables become Juice at 2.25x base price, and Hops become Pale Ale.',
    originalTake:
      'This is the route I would build around. The machine cost is fair, the labor is low, and every extra Keg improves the farm permanently. Starfruit Wine can sell for 2,250g base before Artisan, while first-year Hops into Pale Ale gives Summer a real cash engine even before the Greenhouse is open.',
    notes: [
      'Tap Oak Trees early so Oak Resin does not bottleneck your first Keg wave.',
      'Kegs favor high-value fruits like Starfruit and Ancient Fruit.',
      'Use Preserves Jars for many low-value crops; Kegs are strongest when the input price is high or the special output is excellent.',
    ],
  },
];

const quickPicks = [
  ['Best overall', 'Keg Route'],
  ['Best passive animal route', 'Sheep and Wool Route'],
  ['Best warm-season burst animal route', 'Pig and Truffle Route'],
  ['Best new 1.6 side route', 'Mushroom Log Route'],
  ['Best steady background route', 'Fish Pond Route'],
  ['Best compact side setup', 'Bee House Route'],
  ['Best fishing XP without the mini-game', 'Crab Pot Route'],
  ['Best only when fish value is high', 'Fish Smoker Route'],
];

const sourceChecks = [
  { label: 'Fish Smoker mechanics', href: 'https://stardewvalleywiki.com/Fish_Smoker' },
  { label: 'Coal price and Fish Smoker fuel use', href: 'https://stardewvalleywiki.com/Coal' },
  { label: 'Crab Pot recipe, bait, XP, and catches', href: 'https://stardewvalleywiki.com/Crab_Pot' },
  { label: 'Bee House range, timing, and Fairy Rose Honey value', href: 'https://stardewvalleywiki.com/Bee_House' },
  { label: 'Fish Pond construction and Roe mechanics', href: 'https://stardewvalleywiki.com/Fish_Pond' },
  { label: 'Caviar value and Preserves Jar timing', href: 'https://stardewvalleywiki.com/Caviar' },
  { label: 'Mushroom Log output mechanics', href: 'https://stardewvalleywiki.com/Mushroom_Log' },
  { label: 'Dehydrator mushroom formula', href: 'https://stardewvalleywiki.com/Dehydrator' },
  { label: 'Pig, Truffle rules, and extra Truffle chance', href: 'https://stardewvalleywiki.com/Pig' },
  { label: 'Sheep, Wool timing, and Auto-Grabber behavior', href: 'https://stardewvalleywiki.com/Sheep' },
  { label: 'Keg recipe, Wine, Juice, and Pale Ale formulas', href: 'https://stardewvalleywiki.com/Keg' },
];

const relatedLinks = [
  { href: '/guide/best-keg-items/', label: 'Best Keg Items' },
  { href: '/guide/keg-vs-jar/', label: 'Keg vs Preserves Jar' },
  { href: '/guide/animal-profit/', label: 'Animal Profit Guide' },
  { href: '/guide/truffle-oil/', label: 'Truffle Oil Guide' },
  { href: '/guide/best-fish-pond/', label: 'Best Fish Pond Choices' },
  { href: '/fish-ponds/', label: 'Fish Pond Values' },
  { href: '/crop-profit-calculator/', label: 'Crop Profit Calculator' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      mainEntityOfPage: PAGE_URL,
      headline: 'Stardew Valley Money Making Methods Ranked',
      description: metadata.description,
      datePublished: PAGE_UPDATED,
      dateModified: PAGE_UPDATED,
      inLanguage: 'en-US',
      version: GAME_VERSION,
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/og-image.png`,
        },
      },
      about: [
        'Stardew Valley money making',
        'Keg profit',
        'Sheep profit',
        'Pig truffle profit',
        'Fish Pond profit',
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#ranking`,
      name: 'Stardew Valley money making methods ranked',
      itemListElement: ranking
        .slice()
        .sort((a, b) => a.rank - b.rank)
        .map((method, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: method.name,
          url: `${PAGE_URL}#${method.slug}`,
        })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Money Making Methods Ranked', item: PAGE_URL },
      ],
    },
  ],
};

function IconStrip({ slugs }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Related Stardew Valley items">
      {slugs.map((slug) => (
        <div key={slug} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
          <GameImage slug={slug} alt={slug.replace(/-/g, ' ')} width={34} height={34} />
        </div>
      ))}
    </div>
  );
}

function MethodCard({ method }) {
  const isTopThree = method.rank <= 3;

  return (
    <section id={method.slug} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={isTopThree ? 'rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-800' : 'rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-700'}>
              Rank #{method.rank}
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">{method.score}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-950">{method.name}</h2>
          <p className="mt-2 text-lg font-semibold text-slate-700">{method.verdict}</p>
        </div>
        <IconStrip slugs={method.images} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Best use</p>
          <p className="mt-2 text-sm font-semibold text-slate-800">{method.bestUse}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Main bottleneck</p>
          <p className="mt-2 text-sm font-semibold text-slate-800">{method.bottleneck}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Automation</p>
          <p className="mt-2 text-sm font-semibold text-slate-800">{method.automation}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="text-sm font-black uppercase tracking-wide text-blue-800">How it plays</h3>
          <p className="mt-3 leading-7 text-slate-700">{method.playstyle}</p>
        </div>
        <div className="rounded-xl border border-green-100 bg-green-50 p-5">
          <h3 className="text-sm font-black uppercase tracking-wide text-green-800">StardewPriceDB take</h3>
          <p className="mt-3 leading-7 text-slate-700">{method.originalTake}</p>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {method.notes.map((note) => (
          <li key={note} className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MoneyMakingMethodsRankedPage() {
  const topMethods = ranking.slice().sort((a, b) => a.rank - b.rank);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollToTop />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Money Making Methods Ranked</span>
      </nav>

      <header className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 md:p-9">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex max-w-full items-center rounded-full bg-green-600 px-3 py-1 text-[11px] font-black uppercase leading-5 tracking-wide text-white sm:text-xs">
            StardewPriceDB Original Guide
          </span>
          <span className="inline-flex max-w-full items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold leading-5 text-slate-700 shadow-sm sm:text-xs">
            Updated {PAGE_UPDATED}
          </span>
          <span className="inline-flex max-w-full items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold leading-5 text-slate-700 shadow-sm sm:text-xs">
            Verified for Stardew Valley {GAME_VERSION}
          </span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <h1 className="break-words text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Stardew Valley Money Making Methods Ranked
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              A practical ranking of eight farm economies by profit, setup cost, daily labor, season limits, and automation potential. The short version: Kegs win the whole farm, Sheep are the passive animal winner, and Pigs still print money when the season allows it.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-white bg-white/80 p-4 shadow-sm md:p-5">
            <IconStrip slugs={['keg', 'sheep', 'pig', 'mushroom-log', 'fish-pond', 'bee-house', 'crab-pot', 'fish-smoker']} />
            <p className="mt-4 break-words text-sm leading-6 text-slate-600">
              Original StardewPriceDB ranking. Mechanics were checked against Stardew Valley {GAME_VERSION} data and the public verification date on this site: {LAST_VERIFIED}.
            </p>
          </div>
        </div>
      </header>

      <section className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Quick Ranking</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3">Rank</th>
                <th className="px-3 py-3">Method</th>
                <th className="px-3 py-3">Best asset</th>
                <th className="px-3 py-3">Bottleneck</th>
                <th className="px-3 py-3">Automation</th>
                <th className="px-3 py-3">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {topMethods.map((method) => (
                <tr key={method.slug} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-4 font-black text-slate-950">#{method.rank}</td>
                  <td className="px-3 py-4">
                    <a href={`#${method.slug}`} className="font-bold text-blue-700 hover:underline">
                      {method.name}
                    </a>
                  </td>
                  <td className="px-3 py-4 text-slate-700">{method.bestUse}</td>
                  <td className="px-3 py-4 text-slate-700">{method.bottleneck}</td>
                  <td className="px-3 py-4 font-semibold text-slate-800">{method.automation}</td>
                  <td className="px-3 py-4 text-slate-700">{method.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickPicks.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-base font-black text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <div className="space-y-7">
        {ranking.map((method) => (
          <MethodCard key={method.slug} method={method} />
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-2xl font-black text-slate-950">What I Would Actually Build</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">Year 1</h3>
            <p className="mt-2 leading-7 text-slate-700">
              Tap Oak Trees early, push Farming level 8, and turn Summer Hops into Pale Ale while preparing Kegs for higher-value fruit.
            </p>
          </div>
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">Barn route</h3>
            <p className="mt-2 leading-7 text-slate-700">
              Use Sheep for the lower-maintenance passive setup. Use Pigs when you want bigger seasonal bursts and do not mind collecting Truffles.
            </p>
          </div>
          <div className="rounded-xl bg-white p-5">
            <h3 className="font-black text-slate-950">Side systems</h3>
            <p className="mt-2 leading-7 text-slate-700">
              Add Mushroom Logs, Fish Ponds, and Bee Houses once your main crop and barn engine is stable. Keep Crab Pots and Fish Smokers tactical.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Mechanics Checked</h2>
          <p className="mt-3 leading-7 text-slate-700">
            This page uses StardewPriceDB editorial ranking logic, with key formulas and item mechanics checked against the current public game data set.
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
          <h2 className="text-2xl font-black text-slate-950">Related StardewPriceDB Tools</h2>
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
