import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/first-8-days-checklist/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Stardew Valley First 8 Days Checklist 1.6.15 | Beginner Route',
  description:
    'A practical Stardew Valley first 8 days checklist for beginners: Day 1 to Day 8 tasks, early money, fishing, Mines, bundles, Scarecrow, Furnace, and Community Center setup.',
  keywords: [
    'Stardew Valley first 8 days',
    'Stardew Valley day 1 guide',
    'Stardew Valley beginner checklist',
    'Stardew Valley first week guide',
    'Stardew Valley early game guide',
    'Stardew Valley spring day 1 guide',
  ],
  alternates: {
    canonical: '/guide/first-8-days-checklist/',
  },
  openGraph: {
    title: 'Stardew Valley First 8 Days Checklist 1.6.15',
    description:
      'A corrected beginner route for the first eight days of Stardew Valley: crops, fishing, foraging, Mines, bundles, Scarecrow, Furnace, and museum priorities.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stardew Valley first 8 days beginner checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley First 8 Days Checklist',
    description: 'A day-by-day beginner checklist for the first week and Community Center setup in Stardew Valley 1.6.15.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const dayPlans = [
  {
    day: 'Day 1',
    title: 'Set up the farm without wasting the morning',
    focus: 'Starter crops, chest, TV habit',
    icons: ['parsnip', 'wood', 'fiber'],
    tasks: [
      'Inside the farmhouse, turn on the fireplace if you want light, pick up the starter Parsnip Seeds, then watch TV before leaving.',
      'Clear only the area you need near the farmhouse. Hoe 15 tiles, plant the 15 Parsnip Seeds, and water every tile.',
      'Chop enough trees and branches to reach 50 Wood, then craft a Chest so tools, forage, and early materials do not clog your backpack.',
      'If you have spare Fiber and Sap, craft a Torch or two. Light is not required, but it makes the first nights less awkward.',
    ],
    why:
      'The mistake on Day 1 is trying to clear the whole farm. The better route is a small planted area, a Chest, and enough energy left to forage or chop a little more.',
  },
  {
    day: 'Day 2',
    title: 'Get the fishing rod and start building cash',
    focus: 'Willy, fishing practice, artifact spots',
    icons: ['catfish', 'parsnip', 'geode'],
    tasks: [
      'Watch TV, water your Parsnips, then read Willy\'s letter and visit the Beach to receive the Bamboo Pole.',
      'On the walk through town, use the Hoe on artifact spots. They look like small moving worms or stems in the ground.',
      'If you want a slightly stronger early crop count, buy 3 more Parsnip Seeds from Pierre before planting for an 18-Parsnip start.',
      'Fish for the rest of the day. Sell duplicates for cash, but keep the first copy of unfamiliar fish until you know whether bundles need it.',
      'Say hello to villagers you naturally pass. Do not burn the day chasing every introduction unless you enjoy it.',
    ],
    why:
      'Fishing is the first skill that can turn leftover time into money. Even weak catches help pay for seeds and backpack upgrades.',
  },
  {
    day: 'Day 3',
    title: 'Use the rainy day for fishing and Spring forage',
    focus: 'No watering, Spring Foraging Bundle',
    icons: ['daffodil', 'wild-horseradish', 'leek', 'dandelion'],
    tasks: [
      'Year 1 Spring Day 3 is rainy, so you do not need to water crops. Watch TV, then use the free time aggressively.',
      'Plant any extra Parsnip Seeds you bought on Day 2, because rain waters them for free.',
      'Collect Spring forage: Wild Horseradish, Daffodil, Leek, and Dandelion. Keep one of each for the Spring Foraging Bundle.',
      'Use extra forage for energy, gifts, or early gold. Daffodils are useful cheap gifts; Leeks and Spring Onions are useful food.',
      'Fish heavily today. If you are comfortable with the minigame, rainy Spring river fishing can be very profitable.',
    ],
    why:
      'Rainy days are the first real tempo boost. No watering means more time for Fishing XP, forage, and early cash.',
  },
  {
    day: 'Day 4',
    title: 'Turn finds into progress instead of clutter',
    focus: 'Museum, journal rewards, Foraging 1',
    icons: ['geode', 'wood', 'stone'],
    tasks: [
      'If you found an artifact or mineral, donate the first copy to the Museum instead of selling it.',
      'Claim journal rewards when they unlock. Early reward gold is small, but it matters before your first good fishing streak.',
      'Chop trees until you are close to Foraging level 1. The Field Snack recipe makes tree seeds more valuable than they look.',
      'Keep enough Wood for future early crafts. A Chest is done already, but Scarecrow, fences, and buildings will keep asking for Wood.',
    ],
    why:
      'The Museum matters early because 5 total donations reward 9 Cauliflower Seeds. Artifacts and minerals both count toward that donation total.',
  },
  {
    day: 'Day 5',
    title: 'Harvest Parsnips, unlock the Mines, and protect crops',
    focus: 'First harvest, Mines, Scarecrow',
    icons: ['parsnip', 'copper-ore', 'coal'],
    tasks: [
      'Harvest the first 15 Parsnips. Keep any Gold-quality Parsnips for the Quality Crops Bundle, keep one normal Parsnip, and sell the rest.',
      'The Mines unlock after the Joja landslide is cleared. Visit the mountain and start pushing in 5-floor chunks so elevator checkpoints open.',
      'Collect Copper Ore, Stone, Coal, and any Geodes you find. Do not worry about perfect combat yet; reaching floor 5 or 10 is already useful.',
      'After reaching Farming level 1, craft a Scarecrow with 50 Wood, 20 Fiber, and 1 Coal. Place it near the center of your planted area.',
      'If today is Friday, check the Traveling Cart in Cindersap Forest. It can sell annoying bundle items much earlier than you can normally get them.',
    ],
    why:
      'Your first harvest changes the plan from survival to routing. The Scarecrow prevents random crop loss, and the Mines start the tool-upgrade economy.',
  },
  {
    day: 'Day 6',
    title: 'Expand crops and choose fishing or mining by weather',
    focus: 'Cauliflower, Potato, Catfish if rainy',
    icons: ['cauliflower', 'potato', 'catfish', 'copper-ore'],
    tasks: [
      'Buy 5 Cauliflower Seeds for bundle and Museum-reward planning. Put most leftover seed money into Potatoes if you want simple early profit.',
      'Plant around your Scarecrow coverage instead of scattering crops across the farm.',
      'If it rains, fish the river for Catfish if your fishing skill and patience are ready. If it is sunny, mining or easier fish may be the better use of time.',
      'Enter the Mines and take the Rusty Sword. Keep collecting Copper Ore, Stone, and Coal for the Furnace and first tool upgrades.',
      'Return home before 10:30pm if you still need to craft or reposition the Scarecrow. Passing out is not worth it this early.',
    ],
    why:
      'Day 6 is flexible. The correct decision depends on weather, fishing comfort, and whether your farm still needs basic materials.',
  },
  {
    day: 'Days 7-8',
    title: 'Open the Community Center path and start smelting',
    focus: 'Furnace, Geodes, Wizard, first bundle',
    icons: ['copper-ore', 'geode', 'cauliflower', 'daffodil'],
    tasks: [
      'After you have picked up Copper Ore, Clint should visit the next morning and give you the Furnace recipe. Smelt Copper Bars when you have enough Ore and Coal.',
      'Open Geodes at Clint when you can spare the gold, then donate new minerals or artifacts to the Museum.',
      'Trigger the Community Center cutscene by entering town from the Bus Stop on a sunny day, on or after Spring 5, between 8am and 1pm.',
      'Inspect the glowing tile inside the Community Center. After the Wizard sends a letter, visit the Wizard Tower to unlock bundle reading.',
      'Complete the Spring Foraging Bundle with Wild Horseradish, Daffodil, Leek, and Dandelion, then plant the Spring Seeds reward if you have time and energy.',
      'If your Museum donations reach 5, collect the 9 Cauliflower Seeds reward and plant them quickly enough to mature before Spring ends.',
    ],
    why:
      'By the end of Day 8, you want the game systems opened: Community Center progress, Furnace smelting, Museum rewards, and a crop field protected by a Scarecrow.',
  },
];

const targetChecklist = [
  '15 to 18 Parsnips planted, watered, and mostly harvested',
  'One Chest crafted from 50 Wood',
  'Bamboo Pole unlocked from Willy',
  'Spring forage bundle items saved',
  'Mines unlocked and Copper Ore started',
  'Scarecrow crafted after Farming level 1',
  'First Museum donations started',
  'Community Center cutscene triggered or ready to trigger',
  'Furnace recipe unlocked or queued for the next morning',
];

const correctedNotes = [
  ['Community Center timing', 'The cutscene is not just a Day 7 event. It triggers on a sunny day after Spring 5 when you enter town from the Bus Stop between 8am and 1pm.'],
  ['Catfish advice', 'Catfish are rainy Spring river fish. If Day 6 is sunny, do not force this plan. Mine or catch easier fish instead.'],
  ['Hat shop unlock', 'The abandoned house becomes the Hat Mouse shop after your first achievement. It is not unlocked by the Furnace recipe itself.'],
  ['Museum reward', 'Five total Museum donations give 9 Cauliflower Seeds. Minerals and artifacts both count, so Geodes can help.'],
  ['Fish storage', 'You do not need one of every fish forever. Keep uncertain first catches until bundles are readable, then sell duplicates.'],
  ['Scarecrow recipe', 'The recipe comes from Farming level 1. If you do not level after the first harvest, plant and harvest a few more crops before expecting it.'],
];

const relatedLinks = [
  {
    href: '/guide/year-1-spring-guide/',
    title: 'Year 1 Spring Guide',
    text: 'A full first-Spring route after the first week: Strawberries, Speed-Gro, Tappers, mining, and Summer prep.',
  },
  {
    href: '/guide/year-1-beginner-walkthrough/',
    title: 'Full Year 1 Beginner Walkthrough',
    text: 'Use this after Day 8 when you are ready to plan Spring, Summer, Fall, and Winter together.',
  },
  {
    href: '/guide/year-1-money/',
    title: 'Year 1 Money Making Guide',
    text: 'A more profit-focused route once you understand the first week basics.',
  },
  {
    href: '/guide/beginner-mistakes/',
    title: 'Beginner Mistakes to Avoid',
    text: 'A safety checklist for rare items, trash cans, gifts, bombs, Legendary Fish, and end-of-season crop timing.',
  },
  {
    href: '/guide/community-center/',
    title: 'Community Center Guide',
    text: 'Bundle deadlines, room priorities, and the items you should stop selling.',
  },
  {
    href: '/crop-profit-calculator/',
    title: 'Crop Profit Calculator',
    text: 'Compare seed cost, growth time, profession bonuses, Kegs, and Preserves Jars.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Stardew Valley First 8 Days Checklist',
      description:
        'A corrected beginner checklist for the first eight days of Stardew Valley, covering starter crops, fishing, Spring forage, Mines, Scarecrow, Furnace, Museum, and Community Center setup.',
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
      about: ['Stardew Valley', 'Beginner guide', 'First week checklist', 'Community Center', 'Spring crops'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'First 8 Days Checklist', item: PAGE_URL },
      ],
    },
  ],
};

function IconStrip({ slugs }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Related Stardew Valley items">
      {slugs.map((slug) => (
        <div key={slug} className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
          <GameImage slug={slug} alt={slug.replace(/-/g, ' ')} width={32} height={32} />
        </div>
      ))}
    </div>
  );
}

function DayCard({ plan }) {
  return (
    <article id={plan.day.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">{plan.day}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{plan.title}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">{plan.focus}</p>
        </div>
        <IconStrip slugs={plan.icons} />
      </div>

      <ol className="space-y-3">
        {plan.tasks.map((task) => (
          <li key={task} className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            {task}
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="mb-1 text-sm font-black uppercase tracking-wide text-amber-900">Why this matters</h3>
        <p className="text-sm leading-6 text-amber-950">{plan.why}</p>
      </div>
    </article>
  );
}

export default function First8DaysChecklistPage() {
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
          <span className="font-medium text-slate-800">First 8 Days Checklist</span>
        </nav>

        <header className="mb-8 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-sky-50 p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
            Stardew Valley First 8 Days Checklist
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">
            This route turns the first week into a calm checklist: plant the starter field, unlock fishing,
            save the right forage, enter the Mines, craft a Scarecrow, start smelting Copper, and open the
            Community Center path without selling the items you will want back later.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Best for</div>
              <div className="font-bold text-slate-900">New farms, Spring days 1-8</div>
            </div>
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Route style</div>
              <div className="font-bold text-slate-900">Low-stress early money</div>
            </div>
            <div className="rounded-lg border border-white bg-white/80 p-4">
              <div className="text-sm text-slate-500">Main unlocks</div>
              <div className="font-bold text-slate-900">Fishing, Mines, bundles</div>
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">Editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is an English adaptation of a player-style first-week checklist, rewritten for clarity and checked
            against Stardew Valley {GAME_VERSION} mechanics. I kept the useful day-by-day structure, but corrected
            timing and unlock details that can easily confuse new players.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/about-data/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-800 ring-1 ring-blue-200 hover:bg-blue-100">
              View data sources
            </Link>
            <Link href="/guide/year-1-beginner-walkthrough/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-800 ring-1 ring-blue-200 hover:bg-blue-100">
              Full Year 1 route
            </Link>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">What you want by the end of Day 8</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {targetChecklist.map((target) => (
              <div key={target} className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-3 md:grid-cols-4">
          {dayPlans.map((plan) => (
            <a key={plan.day} href={`#${plan.day.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-green-300 hover:shadow-md">
              <div className="text-sm font-black uppercase tracking-wide text-green-700">{plan.day}</div>
              <div className="mt-1 text-sm font-bold leading-5 text-slate-950">{plan.focus}</div>
            </a>
          ))}
        </section>

        <div className="mb-8 space-y-6">
          {dayPlans.map((plan) => (
            <DayCard key={plan.day} plan={plan} />
          ))}
        </div>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Mechanics checked before publishing</h2>
          <p className="mb-4 leading-7 text-slate-700">
            The first week has a lot of advice that sounds right but breaks on timing. These are the points this guide
            deliberately phrases carefully so new players do not lose a day or sell a needed item.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3">Topic</th>
                  <th className="border-b border-slate-200 px-3 py-3">Corrected guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {correctedNotes.map(([topic, note]) => (
                  <tr key={topic}>
                    <td className="px-3 py-3 font-bold text-slate-900">{topic}</td>
                    <td className="px-3 py-3 leading-6 text-slate-700">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-green-950">Early item pages worth checking</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { href: '/item/parsnip/', slug: 'parsnip', title: 'Parsnip price' },
              { href: '/item/potato/', slug: 'potato', title: 'Potato profit' },
              { href: '/item/cauliflower/', slug: 'cauliflower', title: 'Cauliflower value' },
              { href: '/fishing/catfish/', slug: 'catfish', title: 'Catfish location' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-green-100 transition hover:ring-green-300">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200">
                  <GameImage slug={item.slug} alt={item.title} width={32} height={32} />
                </div>
                <h3 className="font-bold text-green-950">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Where to go after Day 8</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedLinks.map((card) => (
              <Link key={card.href} href={card.href} className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-green-300 hover:bg-green-50">
                <h3 className="font-bold text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{card.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
