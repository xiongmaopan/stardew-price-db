import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/year-1-spring-guide/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Stardew Valley Year 1 Spring Guide 1.6.15',
  description:
    'A practical Stardew Valley Year 1 Spring guide for beginners: Day 1 setup, fishing cash, Mines, Community Center bundles, Strawberries, Speed-Gro, Tappers, and Summer prep.',
  keywords: [
    'Stardew Valley Year 1 Spring guide',
    'Stardew Valley first spring guide',
    'Stardew Valley beginner spring route',
    'Stardew Valley spring guide for beginners',
    'Stardew Valley first year spring tips',
    'Stardew Valley strawberry speed gro guide',
    'Stardew Valley spring community center guide',
  ],
  alternates: {
    canonical: '/guide/year-1-spring-guide/',
  },
  openGraph: {
    title: 'Stardew Valley Year 1 Spring Guide 1.6.15',
    description:
      'A beginner-friendly first Spring route with accurate crop timing, bundle saves, fishing, mining, Strawberry planning, and Summer prep.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stardew Valley Year 1 Spring guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Year 1 Spring Guide',
    description: 'A calm first Spring route for new Stardew Valley farms, checked for 1.6.15 mechanics.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const routeCards = [
  {
    id: 'day-1',
    label: 'Day 1',
    title: 'Build the farm base',
    icons: ['parsnip', 'watering-can', 'chest'],
    bullets: [
      'Pick up the 15 Parsnip Seeds from the farmhouse package before leaving.',
      'Clear a small patch, hoe 15 tiles, plant every Parsnip, and water them. Rain waters crops for you, but sunny days do not forgive missed watering.',
      'Chop enough trees and branches to craft one Chest from 50 Wood. Put extra tools, forage, sap, fiber, and seeds away before your 12-slot backpack clogs up.',
      'Do not clear the whole farm on Day 1. A small planted area plus storage is stronger than an empty energy bar.',
    ],
    note:
      'The clean beginner move is Standard Farm. It gives simple space for crops, sprinklers, barns, coops, sheds, and later experiments.',
  },
  {
    id: 'days-2-4',
    label: 'Days 2-4',
    title: 'Turn spare time into fishing money',
    icons: ['catfish', 'calendar', 'potato'],
    bullets: [
      'Watch TV first. Weather decides whether tomorrow frees your watering energy, and luck helps when you choose to mine or fish.',
      'After Willy writes, visit the Beach for the Bamboo Pole. Fish after watering instead of wandering without a plan.',
      'On your town trip, check artifact spots with the Hoe, say hello to villagers you naturally pass, and buy one Green Bean, one Cauliflower, then Potatoes with most of the remaining seed money.',
      'Robin\'s mountain lake is a forgiving early fishing spot. Cast as far from land as you can; deeper water improves average size and quality.',
      'Keep uncertain first catches until bundles are readable, but sell duplicates when you need seed money.',
    ],
    note:
      'Perfect catches matter. If the fish never leaves the bar, the game boosts eligible fish quality and gives much more Fishing XP.',
  },
  {
    id: 'days-5-12',
    label: 'Days 5-12',
    title: 'Open the Mines and bundle path',
    icons: ['copper-ore', 'geode', 'wild-horseradish'],
    bullets: [
      'The Mines open on Spring 5. Push in 5-floor chunks so the elevator keeps your progress.',
      'Copper starts early in the Mines, and deeper sections later give Iron and Gold. For Spring, Copper Bars matter most for tool upgrades, Tappers, and basic progress.',
      'Trigger the Community Center cutscene on a sunny day from Spring 5 onward by entering Pelican Town from the Bus Stop between 8am and 1pm.',
      'After reading the scroll and visiting the Wizard, save Wild Horseradish, Daffodil, Leek, and Dandelion for the Spring Foraging Bundle.',
      'Save one Parsnip, Green Bean, Cauliflower, and Potato for the Spring Crops Bundle. Sell the extras only after these four are safe.',
    ],
    note:
      'The Spring Foraging Bundle rewards 30 Spring Seeds. The Spring Crops Bundle rewards 20 Speed-Gro, which is the important Strawberry setup.',
  },
  {
    id: 'spring-13',
    label: 'Spring 13',
    title: 'Use the Egg Festival for Strawberries',
    icons: ['strawberry', 'speed-gro', 'cauliflower'],
    bullets: [
      'Bring saved Spring crop bundle items if you are ready to turn them in after the festival.',
      'At the Egg Festival, buy Strawberry Seeds from Pierre. They cost 100g each and are the main Spring profit spike for Year 1.',
      'After the festival ends at 10pm, complete the Spring Crops Bundle if you have all four crops, take the 20 Speed-Gro, apply it to tilled watered soil, then plant Strawberries that same night.',
      'Without Speed-Gro, Strawberries planted on Spring 13 normally harvest twice. With 10 percent Speed-Gro placed before planting, three Spring harvests become possible.',
    ],
    note:
      'This is the big timing detail many guides blur. Speed-Gro has to be on the tilled soil before the Strawberry Seeds go in.',
  },
  {
    id: 'spring-14-20',
    label: 'Spring 14-20',
    title: 'Prepare Oak Resin and sell at the right time',
    icons: ['tapper', 'oak-resin', 'copper-bar'],
    bullets: [
      'If Foraging reaches level 4, craft Tappers with 40 Wood and 2 Copper Bars each. Put them on Oak Trees first.',
      'Oak Resin is the bottleneck for Kegs later. A few early Tappers make Summer and Fall processing feel much less late.',
      'If you want Hardwood, the normal route is upgrading to a Steel Axe for the Secret Woods log. The chair trick exists, but treat it as an optional exploit, not the default plan.',
      'Your first Speed-Gro Strawberries can come in around Spring 20. If Farming level 5 is close, wait until Tiller is active before bulk selling crops for the 10 percent crop value bonus.',
    ],
    note:
      'Profession bonuses start after the overnight level-up screen. Shipping crops before Tiller is active will not retroactively add the bonus.',
  },
  {
    id: 'spring-21-28',
    label: 'Spring 21-28',
    title: 'Finish Spring without trapping yourself',
    icons: ['quality-sprinkler', 'iron-bar', 'pickaxe'],
    bullets: [
      'Do not panic-buy late Spring seeds unless they can mature before day 28. Dead crops are silent money leaks.',
      'Use the last week to clear farm space, gather ore, smelt bars, and plan Summer sprinkler coverage.',
      'Basic Sprinklers can help a little, but Quality Sprinklers are the real Year 1 comfort target once Iron, Gold, and Refined Quartz are available.',
      'Keep fishing when you need flexible cash, especially on days when mining is poor or your energy is mostly spoken for.',
      'Before Summer 1, decide which tiles are for Blueberries, Melons, Hops, and bundle crops. A rough layout beats morning chaos.',
    ],
    note:
      'Spring is not about perfection. It is about entering Summer with cash, unlocked systems, saved bundle items, and less daily watering.',
  },
];

const saveItems = [
  { title: 'Spring Crops Bundle', items: ['parsnip', 'green-bean', 'cauliflower', 'potato'], text: 'Keep one of each before selling the rest. The reward is 20 Speed-Gro.' },
  { title: 'Spring Foraging Bundle', items: ['wild-horseradish', 'daffodil', 'leek', 'dandelion'], text: 'Turn these in for 30 Spring Seeds once bundles are readable.' },
  { title: 'Early processing prep', items: ['tapper', 'oak-resin', 'copper-bar', 'wood'], text: 'Foraging 4 Tappers and Oak Resin support later Kegs.' },
  { title: 'Summer comfort prep', items: ['quality-sprinkler', 'iron-bar', 'geode', 'stone'], text: 'Ore, Quartz, and bars become more valuable than another random late Spring field.' },
];

const accuracyNotes = [
  ['Community Center timing', 'Enter Pelican Town from the Bus Stop on a non-rainy day from Spring 5 onward between 8am and 1pm. Other entrances or rainy days will not trigger the cutscene.'],
  ['Spring Foraging reward', 'The Spring Foraging Bundle rewards 30 Spring Seeds, not 20.'],
  ['Spring Crops reward', 'The Spring Crops Bundle requires Parsnip, Green Bean, Cauliflower, and Potato, and rewards 20 Speed-Gro.'],
  ['Strawberry timing', 'Strawberries planted after the Spring 13 Egg Festival normally give 2 harvests. Applying 10 percent Speed-Gro before planting can make 3 harvests possible.'],
  ['Backpack upgrades', 'The farm starts with 12 inventory slots. Pierre sells the 24-slot Large Pack for 2,000g and the 36-slot Deluxe Pack for 10,000g.'],
  ['Secret Woods access', 'The intended route requires at least a Steel Axe to clear the large log. Chair entry is a known trick, so this guide labels it optional instead of pretending it is the normal route.'],
  ['Tiller and Fisher bonuses', 'Fisher gives fish 25 percent more value at Fishing 5. Tiller gives crops 10 percent more value at Farming 5, but only after the overnight profession screen.'],
];

const relatedLinks = [
  {
    href: '/guide/first-8-days-checklist/',
    title: 'First 8 Days Checklist',
    text: 'Use this if you want an even tighter day-by-day first week plan.',
  },
  {
    href: '/guide/year-1-beginner-walkthrough/',
    title: 'Full Year 1 Beginner Walkthrough',
    text: 'Continue into Summer, Fall, Winter, animals, tools, and Greenhouse goals.',
  },
  {
    href: '/guide/beginner-mistakes/',
    title: 'Beginner Mistakes to Avoid',
    text: 'Protect rare items, Legendary Fish, crops, machines, and friendship points.',
  },
  {
    href: '/guide/best-spring-crops/',
    title: 'Best Spring Crops',
    text: 'Compare Parsnip, Potato, Cauliflower, Strawberry, Rhubarb, and more.',
  },
  {
    href: '/crop-profit-calculator/',
    title: 'Crop Profit Calculator',
    text: 'Check seed cost, growth time, regrowth, professions, Kegs, and Preserves Jars.',
  },
  {
    href: '/guide/community-center/',
    title: 'Community Center Guide',
    text: 'Plan bundle deadlines without selling seasonal items by mistake.',
  },
];

const sourceChecks = [
  { label: 'Official wiki version list', href: 'https://stardewvalleywiki.com/Stardew_Valley_Wiki' },
  { label: 'Inventory and backpack upgrades', href: 'https://stardewvalleywiki.com/Inventory' },
  { label: 'Chest crafting cost', href: 'https://stardewvalleywiki.com/Chest' },
  { label: 'Community Center trigger', href: 'https://stardewvalleywiki.com/Community_Center' },
  { label: 'Bundle requirements and rewards', href: 'https://stardewvalleywiki.com/Bundles' },
  { label: 'Strawberry harvest timing', href: 'https://stardewvalleywiki.com/Strawberry#Number_of_Harvests' },
  { label: 'Speed-Gro growth rate', href: 'https://stardewvalleywiki.com/Speed-Gro' },
  { label: 'Fishing perfect catch and quality', href: 'https://stardewvalleywiki.com/Fishing#Perfect_Catches' },
  { label: 'Mines opening and elevator floors', href: 'https://stardewvalleywiki.com/The_Mines' },
  { label: 'Tapper recipe', href: 'https://stardewvalleywiki.com/Tapper' },
  { label: 'Keg recipe and Oak Resin', href: 'https://stardewvalleywiki.com/Keg' },
  { label: 'Secret Woods access', href: 'https://stardewvalleywiki.com/Secret_Woods' },
  { label: 'Skill profession bonuses', href: 'https://stardewvalleywiki.com/Skills' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Stardew Valley Year 1 Spring Guide for Beginners',
      description:
        'A StardewPriceDB original first Spring route for Stardew Valley beginners, covering Day 1 setup, fishing money, Mines, Community Center bundles, Strawberries, Speed-Gro, Tappers, and Summer prep.',
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
      about: ['Stardew Valley', 'Year 1 Spring guide', 'beginner guide', 'Community Center', 'Strawberries'],
      inLanguage: 'en-US',
      version: GAME_VERSION,
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#spring-route`,
      name: 'Stardew Valley Year 1 Spring route',
      itemListElement: routeCards.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${card.label}: ${card.title}`,
        url: `${PAGE_URL}#${card.id}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Year 1 Spring Guide', item: PAGE_URL },
      ],
    },
  ],
};

function IconRow({ slugs }) {
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

function RouteCard({ card }) {
  return (
    <article id={card.id} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">{card.label}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{card.title}</h2>
        </div>
        <IconRow slugs={card.icons} />
      </div>

      <ol className="space-y-3">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            {bullet}
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="mb-1 text-sm font-black uppercase tracking-wide text-amber-900">Player note</h3>
        <p className="text-sm leading-6 text-amber-950">{card.note}</p>
      </div>
    </article>
  );
}

export default function Year1SpringGuidePage() {
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
          <span className="font-medium text-slate-800">Year 1 Spring Guide</span>
        </nav>

        <header className="mb-8 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
                Stardew Valley Year 1 Spring Guide for Beginners
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-700">
                Your first Spring should make Summer easier, not turn every day into homework. This route gives new
                farmers a practical plan: plant the starter field, fish for cash, open the Mines, save the right bundle
                items, use the Egg Festival correctly, and enter Summer with a farm that is ready to scale.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:w-72">
              {['parsnip', 'potato', 'cauliflower', 'strawberry', 'speed-gro', 'quality-sprinkler', 'tapper', 'oak-resin', 'catfish'].map((slug) => (
                <div key={slug} className="flex h-20 items-center justify-center rounded-xl border border-white bg-white/80 shadow-sm">
                  <GameImage slug={slug} alt={`${slug.replace(/-/g, ' ')} icon`} width={42} height={42} />
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">StardewPriceDB editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is original StardewPriceDB guide content, rewritten from our Chinese Stardew notes for English readers.
            The tone stays practical and player-first, while timing, rewards, and profession details are checked against
            Stardew Valley {GAME_VERSION} mechanics before publishing.
          </p>
        </section>

        <section className="mb-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Best farm map</div>
            <div className="mt-1 font-black text-slate-950">Standard Farm</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">The cleanest beginner layout for crops, sprinklers, buildings, and future sheds.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Main money loop</div>
            <div className="mt-1 font-black text-slate-950">Water, fish, mine, repeat</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Fishing covers early seed money while mining builds the upgrade and sprinkler path.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Spring spike</div>
            <div className="mt-1 font-black text-slate-950">Strawberry Seeds</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Buy them at Egg Festival, then use Speed-Gro timing if your bundle route is ready.</p>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Spring route at a glance</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {routeCards.map((card) => (
              <a key={card.id} href={`#${card.id}`} className="rounded-lg bg-slate-50 p-4 transition hover:bg-green-50">
                <div className="text-sm font-black uppercase tracking-wide text-green-700">{card.label}</div>
                <div className="mt-1 font-bold text-slate-950">{card.title}</div>
              </a>
            ))}
          </div>
        </section>

        <div className="mb-8 space-y-6">
          {routeCards.map((card) => (
            <RouteCard key={card.id} card={card} />
          ))}
        </div>

        <section className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-green-950">What to save before you sell everything</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {saveItems.map((group) => (
              <div key={group.title} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-green-100">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-black text-green-950">{group.title}</h3>
                  <IconRow slugs={group.items} />
                </div>
                <p className="text-sm leading-6 text-green-900">{group.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Why the first Spring works</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="mb-2 font-black text-slate-950">Backpack pressure is the first hidden enemy</h3>
              <p className="text-sm leading-6 text-slate-700">
                The starting backpack has only 12 slots, so one 50-Wood Chest changes the whole pace of the first week.
                The 2,000g Large Pack is worth buying once watering, fishing, and mining trips start fighting for space.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="mb-2 font-black text-slate-950">Fishing is your flexible cash engine</h3>
              <p className="text-sm leading-6 text-slate-700">
                Crops have fixed harvest days. Fishing turns spare hours into gold and XP. At Fishing level 5, Fisher
                makes fish sell for 25 percent more, so holding a pile of good fish until the profession is active can
                beat selling every catch immediately.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="mb-2 font-black text-slate-950">Bundles protect your Strawberry timing</h3>
              <p className="text-sm leading-6 text-slate-700">
                The Spring Crops Bundle is not just a checklist item. Its 20 Speed-Gro reward lets Spring 13 Strawberries
                reach the three-harvest route if you apply the fertilizer before planting after the Egg Festival.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="mb-2 font-black text-slate-950">Oak Resin is future money in disguise</h3>
              <p className="text-sm leading-6 text-slate-700">
                Kegs need Oak Resin, and Oak Resin takes time. Tapping Oak Trees in Spring does not look exciting on the
                day you craft the Tapper, but it stops your Summer and Fall processing plan from arriving late.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Mechanics checked before publishing</h2>
          <p className="mb-4 leading-7 text-slate-700">
            This page deliberately corrects a few beginner-guide shortcuts. The goal is to keep the route simple without
            giving players wrong numbers or impossible timing.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3">Topic</th>
                  <th className="border-b border-slate-200 px-3 py-3">Checked guidance</th>
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
        </section>

        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-amber-950">A realistic Spring finish line</h2>
          <p className="leading-7 text-amber-950">
            A good first Spring is not a perfect farm. It is a farm with a Chest system, one backpack upgrade if possible,
            the Community Center path open, Spring bundle items saved, the Mines elevator started, a few bars smelted,
            and enough money or fish value to buy real Summer seeds. If you get those pieces, you are no longer just
            surviving Year 1.
          </p>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Verification sources used</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {sourceChecks.map((source) => (
              <a key={source.href} href={source.href} className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700 transition hover:bg-green-50 hover:text-green-800">
                {source.label}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-green-950">Read next</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((card) => (
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
