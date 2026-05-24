import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/year-1-beginner-walkthrough/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Stardew Valley Year 1 Guide 1.6.15 | Beginner Walkthrough',
  description:
    'A practical Stardew Valley Year 1 guide for beginners: Spring to Winter goals, crops, mining, tools, bundles, animals, and verified 1.6.15 notes.',
  keywords: [
    'Stardew Valley Year 1 guide',
    'Stardew Valley beginner guide',
    'Stardew Valley first year walkthrough',
    'Stardew Valley Year 1 checklist',
    'Stardew Valley spring summer fall winter guide',
  ],
  alternates: {
    canonical: '/guide/year-1-beginner-walkthrough/',
  },
  openGraph: {
    title: 'Stardew Valley Year 1 Beginner Walkthrough 1.6.15',
    description:
      'Season-by-season first year route with corrected crop values, tool upgrades, Community Center goals, mining, animals, and winter prep.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stardew Valley Year 1 beginner guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Year 1 Guide 1.6.15',
    description: 'A beginner-friendly first year walkthrough with accurate crop, mining, tool, bundle, and winter goals.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

function crop(slug) {
  return itemsData.items.find((item) => item.slug === slug);
}

function expectedYield(item) {
  return (item.harvestYield || 1) + (item.extraHarvestChance || 0) * (item.extraHarvestYield || 1);
}

function harvestCount(item, startDay = 1) {
  if (!item.growthTime) return 0;
  let harvestDay = startDay + item.growthTime;
  if (harvestDay > 28) return 0;
  let harvests = 1;
  if (item.regrows && item.regrowTime) {
    while (harvestDay + item.regrowTime <= 28) {
      harvestDay += item.regrowTime;
      harvests += 1;
    }
    return harvests;
  }
  while (harvestDay + item.growthTime <= 28) {
    harvestDay += item.growthTime;
    harvests += 1;
  }
  return harvests;
}

function rawSeasonProfit(item, startDay = 1) {
  const harvests = harvestCount(item, startDay);
  const plantings = item.regrows ? 1 : harvests;
  const gross = harvests * expectedYield(item) * item.basePrice;
  const seedCost = plantings * (item.seedPrice || 0);
  return Math.round(gross - seedCost);
}

function gold(value) {
  return `${Math.round(value).toLocaleString()}g`;
}

const cropRows = [
  { slug: 'parsnip', note: 'Fast cash flow and a Spring Crops Bundle item.', startDay: 1 },
  { slug: 'potato', note: 'Better expected early profit than Parsnip because of extra Potato chance.', startDay: 1 },
  { slug: 'strawberry', note: 'Buy at Egg Festival on Spring 13; two harvests if planted that day.', startDay: 13 },
  { slug: 'blueberry', note: 'Safe Summer mass crop; each harvest gives multiple berries.', startDay: 1 },
  { slug: 'melon', note: 'Strong single crop for bundles, Giant Crop chance, and future Wine.', startDay: 1 },
  { slug: 'hops', note: 'Low raw value, excellent later when Pale Ale Kegs are ready.', startDay: 1 },
  { slug: 'cranberries', note: 'Easy Fall repeat-harvest crop with strong raw value.', startDay: 1 },
  { slug: 'pumpkin', note: 'Great Fall bundle crop and Preserves Jar candidate.', startDay: 1 },
  { slug: 'powdermelon', note: 'Winter crop from 1.6; useful, but do not build a first-year plan around it.', startDay: 1 },
].map((row) => ({ ...row, item: crop(row.slug) })).filter((row) => row.item);

const seasonPlans = [
  {
    id: 'spring',
    title: 'Spring: Build Cash Flow Without Burning Out',
    goal: 'Get stable income, unlock the Mines, start bundle progress, and buy Strawberry seeds on Spring 13.',
    checklist: [
      'Day 1: plant your starter Parsnips, clear only the farm space you need, and keep some energy for foraging.',
      'Repair the Beach bridge once you have 300 Wood. Shells and Coral are reliable early cash.',
      'Watch TV every morning: weather helps tool upgrades, and daily luck helps mining and fishing.',
      'Meet Willy on Spring 2, take the Bamboo Pole, and fish when crop watering is done.',
      'Push the Mines in 5-floor chunks after they open. Elevator checkpoints matter more than perfect loot.',
      'At the Egg Festival on Spring 13, buy as many Strawberry Seeds as your cash flow allows, but keep money for Summer seeds.',
    ],
    cropAdvice:
      'Parsnips are fast, but Potatoes are usually the better early money crop. Cauliflower is useful for bundles and Giant Crop attempts, but it ties up cash longer. Strawberries bought on Spring 13 are still excellent, but they normally give two harvests in Year 1, not three.',
    bundleAdvice:
      'Save one Parsnip, Green Bean, Cauliflower, and Potato for the Spring Crops Bundle. Also keep Wild Horseradish, Daffodil, Leek, and Dandelion for the Spring Foraging Bundle.',
  },
  {
    id: 'summer',
    title: 'Summer: Scale Crops, Start Animals, Reach Iron and Gold',
    goal: 'Use Blueberries for stable money, unlock early animal processing, and mine toward floor 80.',
    checklist: [
      'Plant Blueberries as your safe main crop. Add Melons for bundles and processing, and Hops only if you plan to build Kegs later.',
      'Build a Silo before cutting large amounts of grass. Hay storage is what makes the first Coop painless.',
      'Build a Coop when you can spare 4,000g, 300 Wood, and 100 Stone. Four Chickens are enough for a simple start.',
      'Turn Eggs into Mayonnaise once you can craft Mayonnaise Machines. Processing is the point of early animals.',
      'Mine to floor 80 for reliable Gold Ore access. Bring food and use stairs only when a bad floor is wasting the day.',
      'Build Lightning Rods after you unlock the recipe. Batteries are useful later, but do not bankrupt Summer just to spam rods.',
    ],
    cropAdvice:
      'Blueberries win because they are low-maintenance and repeat harvests scale well. Melons are not as convenient, but they are valuable for bundles, Giant Crop chances, and Wine later. Hops are a future-processing crop: raw Hops are weak, Pale Ale is not.',
    bundleAdvice:
      'Save a Tomato, Hot Pepper, Blueberry, and Melon for the Summer Crops Bundle. If you want the Greenhouse through the Community Center, Pantry crops are a real deadline.',
  },
  {
    id: 'fall',
    title: 'Fall: Turn Good Farming Into a System',
    goal: 'Use Cranberries and Pumpkins, build processing capacity, finish Pantry goals, and upgrade animals.',
    checklist: [
      'Plant Cranberries for easy repeat harvests and Pumpkins for bundles, Preserves Jars, and Giant Crop attempts.',
      'Craft Preserves Jars once you can. They are easier to scale than Kegs and work well for many medium-value crops.',
      'Start collecting Oak Resin for Kegs. A good Keg network is built weeks before it looks profitable.',
      'Upgrade to a Big Coop when the first Coop is stable. Ducks are optional; the bigger win is capacity and automation.',
      'Build a Barn and start with Cows if you want Cheese income and Animal Bundle progress.',
      'Keep daily Hardwood from the Secret Woods if unlocked. Hardwood gates several important upgrades later.',
    ],
    cropAdvice:
      'Cranberries are simple money. Pumpkins are slower, but they fit bundles, jars, and big single-harvest planning. Do not convert every crop into machines blindly; machine time is a bottleneck, especially in Year 1.',
    bundleAdvice:
      'Save Corn, Eggplant, Pumpkin, and Yam for the Fall Crops Bundle. If you are close to finishing the Pantry, prioritize it over a slightly higher short-term sale.',
  },
  {
    id: 'winter',
    title: 'Winter: Use the Quiet Season to Catch Up',
    goal: 'Mine, fish, finish bundles, prepare sprinklers, and set up Year 2 instead of sleeping through the season.',
    checklist: [
      'Mine on most clear days. Winter is the best time to stockpile Ore, Coal, Stone, and combat levels.',
      'Complete the Winter Foraging Bundle with Winter Root, Crystal Fruit, Snow Yam, and Crocus.',
      'Use the Hoe on artifact spots and snowy soil for Winter Roots and Snow Yams.',
      'Fish for missing bundle fish and visit the Night Market on Winter 15-17.',
      'Use the Mermaid Boat for its one-time Pearl reward if you know the puzzle. The Submarine is mainly for special fish.',
      'Craft Quality Sprinklers for Year 2. Each one uses 1 Iron Bar, 1 Gold Bar, and 1 Refined Quartz.',
    ],
    cropAdvice:
      'Winter is not dead anymore in Stardew Valley 1.6, because Powdermelon exists. Still, for a first-year route, mining, fishing, and sprinkler preparation usually matter more than forcing Winter crops.',
    bundleAdvice:
      'The Minecarts from the Boiler Room are a huge quality-of-life unlock. They save time every day once repaired.',
  },
];

const accuracyNotes = [
  ['Parsnip value', 'Parsnip sells for 35g base, not 80g. Potato sells for 80g base and costs 50g per seed.'],
  ['Strawberry timing', 'Strawberries bought and planted on Spring 13 normally produce two Spring harvests: Spring 21 and Spring 25.'],
  ['Bee Houses', 'Bee Houses produce Honey. They do not improve crop quality; flowers change Honey type and value.'],
  ['Mines floor 120', 'Floor 120 gives the Skull Key. Serious Iridium farming is mainly a Skull Cavern goal, not a normal Mines floor-120 reward.'],
  ['Quality Sprinkler recipe', 'Quality Sprinklers use 1 Iron Bar, 1 Gold Bar, and 1 Refined Quartz.'],
  ['Cellar aging', 'Casks age Wine, Beer, Pale Ale, Mead, Cheese, and Goat Cheese. They do not age pickles or jelly.'],
];

const yearEndTargets = [
  'Backpack upgraded at least once, preferably twice.',
  'Copper tools started, with Pickaxe and Axe upgraded as mining and Hardwood goals demand.',
  '20 or more Quality Sprinklers ready for Year 2 planting.',
  'A working Coop or Barn, with at least one reliable processed animal product.',
  'Mines floor 120 reached, or close enough that Skull Cavern is the next clear goal.',
  'Pantry close to finished, Greenhouse unlocked, or Joja Greenhouse purchased.',
  'Oak Trees tapped or ready for Oak Resin, so Kegs are not delayed forever.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Stardew Valley Year 1 Beginner Walkthrough',
      description:
        'A season-by-season Stardew Valley Year 1 guide for beginners, with corrected crop values, bundle priorities, tool upgrades, mining goals, animals, and winter preparation.',
      image: `${SITE_URL}/og-image.png`,
      datePublished: PAGE_UPDATED,
      dateModified: PAGE_UPDATED,
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
      },
      mainEntityOfPage: PAGE_URL,
      about: ['Stardew Valley', 'Year 1 guide', 'Beginner walkthrough', 'Community Center', 'Crop profit'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Year 1 Beginner Walkthrough', item: PAGE_URL },
      ],
    },
  ],
};

function SectionCard({ children, className = '' }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function SeasonBlock({ plan }) {
  return (
    <SectionCard className="scroll-mt-24" >
      <h2 id={plan.id} className="mb-3 text-2xl font-black text-slate-950">{plan.title}</h2>
      <p className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-900">
        Main goal: {plan.goal}
      </p>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="mb-3 text-lg font-bold text-slate-900">What to do</h3>
          <ol className="space-y-3 text-sm leading-6 text-slate-700">
            {plan.checklist.map((item) => (
              <li key={item} className="rounded-lg bg-slate-50 p-3">{item}</li>
            ))}
          </ol>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-bold text-blue-950">Crop route</h3>
            <p className="text-sm leading-6 text-blue-950">{plan.cropAdvice}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="mb-2 font-bold text-amber-950">Bundle note</h3>
            <p className="text-sm leading-6 text-amber-950">{plan.bundleAdvice}</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function CropTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-xl font-black text-slate-950">Corrected crop values for this route</h2>
        <p className="mt-1 text-sm text-slate-600">
          Base values from the StardewPriceDB data set. Raw profit is a simple full-season baseline before fertilizer and professions.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Crop</th>
              <th className="px-4 py-3 text-right">Seed</th>
              <th className="px-4 py-3 text-right">Base sell</th>
              <th className="px-4 py-3 text-right">Growth</th>
              <th className="px-4 py-3 text-right">Route baseline</th>
              <th className="px-4 py-3">Why it matters</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cropRows.map(({ item, note, startDay }) => (
              <tr key={item.slug} className="hover:bg-green-50/60">
                <td className="px-4 py-3 font-bold text-slate-900">
                  <Link href={`/item/${item.slug}/`} className="hover:text-green-700">{item.name}</Link>
                </td>
                <td className="px-4 py-3 text-right">{gold(item.seedPrice || 0)}</td>
                <td className="px-4 py-3 text-right">{gold(item.basePrice)}</td>
                <td className="px-4 py-3 text-right">{item.growthTime}d{item.regrows ? ` + ${item.regrowTime}d` : ''}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{gold(rawSeasonProfit(item, startDay))}</td>
                <td className="px-4 py-3 text-slate-600">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Year1BeginnerWalkthroughPage() {
  return (
    <>
      <ScrollToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide/" className="hover:text-green-700">Guides</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Year 1 Beginner Walkthrough</span>
        </nav>

        <header className="mb-10 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
            Stardew Valley Year 1 Guide for Beginners
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">
            This is a practical first-year route for players who want a strong farm without treating every day like a speedrun.
            It keeps the useful structure of a season-by-season checklist, but fixes the crop values, timing, and mechanics
            that often get repeated incorrectly in beginner guides.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Best for</div>
              <div className="font-bold text-slate-900">First farm, Year 1 planning</div>
            </div>
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Route style</div>
              <div className="font-bold text-slate-900">Community Center or Joja</div>
            </div>
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Data basis</div>
              <div className="font-bold text-slate-900">StardewPriceDB formula audit</div>
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">StardewPriceDB editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is original StardewPriceDB guide content. The route, crop advice, bundle priorities, and
            tool-upgrade notes are edited as a practical first-year walkthrough, then checked
            against Stardew Valley {` ${GAME_VERSION}`} mechanics and the local StardewPriceDB formula audit.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/about-data/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-800 ring-1 ring-blue-200 hover:bg-blue-100">
              View data sources
            </Link>
            <Link href="/guide/year-1-money/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-800 ring-1 ring-blue-200 hover:bg-blue-100">
              Compare money-focused route
            </Link>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {seasonPlans.map((plan) => (
            <a key={plan.id} href={`#${plan.id}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-green-300 hover:shadow-md">
              <div className="text-sm font-semibold uppercase tracking-wide text-green-700">{plan.id}</div>
              <div className="mt-1 font-bold text-slate-950">{plan.title.replace(`${plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}: `, '')}</div>
            </a>
          ))}
        </section>

        <SectionCard className="mb-8">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Start with these baseline choices</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Farm and profession choices</h3>
              <p className="text-sm leading-6 text-slate-700">
                Standard Farm is the safest first save because it has clean space for crops, sprinklers, animals, and sheds.
                Avoid Wilderness Farm on a first playthrough unless you specifically want night combat. At Mining level 5,
                Miner is the practical pick for a tool-upgrade route because extra Ore is more useful than a small amount of
                early gem variance.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Daily habits that quietly compound</h3>
              <p className="text-sm leading-6 text-slate-700">
                Check TV before leaving the house. Weather decides watering-can upgrade windows; luck changes mining and
                fishing days. Visit the Traveling Cart on Fridays and Sundays when you are bundle hunting. Buy the{' '}
                <Link href="/guide/robin-shop-best-items/" className="font-semibold text-green-700 hover:text-green-800">
                  Calendar from Robin
                </Link>{' '}
                when you can spare the gold, because birthdays are the easiest friendship multiplier.
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="mb-8">
          <CropTable />
        </div>

        <div className="mb-8 space-y-6">
          {seasonPlans.map((plan) => <SeasonBlock key={plan.id} plan={plan} />)}
        </div>

        <SectionCard className="mb-8">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Tool upgrade order</h2>
          <p className="mb-4 leading-7 text-slate-700">
            The usual beginner order is Watering Can, Pickaxe, Axe, then Hoe, but do not follow it blindly. Upgrade the
            Watering Can right before a rainy day, because Clint keeps tools for two nights after you submit them. If you
            are pushing the Mines hard, an early Pickaxe upgrade can be worth more than a Watering Can upgrade.
          </p>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Watering Can', 'Upgrade before rain or after crop pressure drops.'],
              ['Pickaxe', 'Upgrade before deeper Mine pushes and Gold Ore farming.'],
              ['Axe', 'Upgrade when Hardwood and farm cleanup become the bottleneck.'],
              ['Hoe', 'Useful, but usually the least urgent Year 1 tool.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="mb-8">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Community Center or Joja?</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-bold text-green-950">Community Center route</h3>
              <p className="text-sm leading-6 text-green-950">
                Better if you want the full town story and a checklist-driven first year. The Pantry is the key room for
                Greenhouse progress, so seasonal crops and animal products matter more than raw profit in a few places.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-2 font-bold text-slate-950">Joja route</h3>
              <p className="text-sm leading-6 text-slate-700">
                Better if you prefer direct gold goals. Membership costs 5,000g, and the Joja Greenhouse repair costs
                35,000g. It is simpler, but you trade away the Community Center restoration arc.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/guide/community-center/" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
              Community Center guide
            </Link>
            <Link href="/bundles/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Bundle database
            </Link>
          </div>
        </SectionCard>

        <SectionCard className="mb-8">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Accuracy notes: common Year 1 advice that needs fixing</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3">Topic</th>
                  <th className="border-b border-slate-200 px-3 py-3">Corrected note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accuracyNotes.map(([topic, note]) => (
                  <tr key={topic}>
                    <td className="px-3 py-3 font-bold text-slate-900">{topic}</td>
                    <td className="px-3 py-3 leading-6 text-slate-700">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard className="mb-8">
          <h2 className="mb-4 text-2xl font-black text-slate-950">End of Year 1 target checklist</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {yearEndTargets.map((target) => (
              <div key={target} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {target}
              </div>
            ))}
          </div>
        </SectionCard>

        <section className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-green-950">Next decisions after this guide</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/guide/year-1-spring-guide/', title: 'Year 1 Spring Guide', text: 'A focused first-Spring route for starter crops, fishing cash, Mines, bundles, Strawberries, and Summer prep.' },
              { href: '/guide/first-8-days-checklist/', title: 'First 8 Days Checklist', text: 'A tighter day-by-day route for Spring days 1-8 before the full Year 1 plan branches out.' },
              { href: '/guide/robin-shop-best-items/', title: 'Best Robin Shop Items', text: 'Buy the right Carpenter Shop items for storage, crafting, schedule planning, and fewer wasted trips.' },
              { href: '/crop-profit-calculator/', title: 'Crop Profit Calculator', text: 'Compare crop profit with seed cost, harvest count, Keg, Jar, and profession toggles.' },
              { href: '/guide/best-crops-by-season/', title: 'Best Crops by Season', text: 'Choose practical crops once you know the season and your farm setup.' },
              { href: '/guide/keg-vs-jar/', title: 'Keg vs Jar Guide', text: 'Decide which crops deserve machines and which should be sold raw.' },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-green-100 transition hover:ring-green-300">
                <h3 className="font-bold text-green-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-green-900">{card.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
