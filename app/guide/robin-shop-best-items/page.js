import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/robin-shop-best-items/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: "Best Robin Shop Items in Stardew Valley 1.6.15",
  description:
    "The 5 most useful Robin shop items in Stardew Valley: Big Chest, Dresser, Calendar, Workbench, and Telephone, with buy timing, costs, storage tips, and farm workflow advice.",
  keywords: [
    'Stardew Valley Robin shop items',
    'Stardew Valley Carpenter Shop guide',
    'Stardew Valley Big Chest recipe',
    'Stardew Valley Workbench worth it',
    'Stardew Valley Telephone worth it',
    'Stardew Valley Calendar Robin',
  ],
  alternates: {
    canonical: '/guide/robin-shop-best-items/',
  },
  openGraph: {
    title: "Best Robin Shop Items in Stardew Valley 1.6.15",
    description:
      "A practical Carpenter's Shop guide covering the five Robin purchases that improve storage, crafting, scheduling, and farm planning.",
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Best Robin shop items in Stardew Valley" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Robin Shop Items in Stardew Valley",
    description: 'Big Chest, Dresser, Calendar, Workbench, and Telephone ranked by real farm usefulness.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const shopItems = [
  {
    rank: 1,
    slug: 'workbench',
    name: 'Workbench',
    price: '2,000g',
    source: "Carpenter's Shop",
    bestTime: 'After you have several crafting chests',
    role: 'Crafting hub',
    verdict: 'The best small purchase for players who keep opening five different chests to craft one machine.',
    details: [
      'The Workbench pulls crafting materials from adjacent standard Chests and Big Chests.',
      'It checks the 8 surrounding tiles, including diagonals, so you can build a compact workshop around it.',
      'Leave at least one side open so your farmer can still reach the Workbench.',
      'It does not pull from Junimo Chests, so keep shared Junimo storage separate from your crafting corner.',
    ],
    tip:
      'Put Wood, Stone, Fiber, Ore, Bars, Coal, Clay, and monster drops in labeled chests around the Workbench. This turns sprinkler, machine, bomb, and path crafting into a one-click job.',
  },
  {
    rank: 2,
    slug: 'big-chest',
    name: 'Big Chest',
    price: '5,000g recipe',
    source: "Carpenter's Shop recipe",
    bestTime: 'When storage starts spreading across the farm',
    role: 'High-capacity storage',
    verdict: 'The cleanest way to upgrade messy storage without rebuilding your whole chest wall.',
    details: [
      'The recipe costs 5,000g at Robin, then each Big Chest costs 120 Wood and 2 Copper Bars to craft.',
      'A Big Chest holds 70 different item stacks, compared with 36 in a regular Chest.',
      'Using a Big Chest on a regular Chest or Stone Chest replaces it while keeping the contents inside.',
      'The old chest drops after replacement, so you can reuse it elsewhere.',
    ],
    tip:
      'Upgrade your busiest chests first: mining materials, crop seeds, artisan inputs, fish, and bundle storage. Do not spend Copper Bars on every chest before your tool and machine needs are covered.',
  },
  {
    rank: 3,
    slug: 'calendar',
    name: 'Calendar',
    price: '2,000g',
    source: "Carpenter's Shop",
    bestTime: 'Early Year 1 if you care about birthdays',
    role: 'Schedule planning',
    verdict: 'Small cost, big habit upgrade. It saves trips to Pierre and stops birthday planning from becoming guesswork.',
    details: [
      'The Calendar shows birthdays and festivals for the current season.',
      'In Stardew Valley 1.6, it also marks Bookseller visit days.',
      "Pierre's General Store has a free public Calendar outside, but owning one at home makes morning planning faster.",
      'It must be placed indoors on a wall.',
    ],
    tip:
      'Check it before leaving the farmhouse, then grab gifts from your storage before the day runs away from you. If you use UI calendar mods, this becomes less urgent for that save.',
  },
  {
    rank: 4,
    slug: 'telephone',
    name: 'Telephone',
    price: '2,000g',
    source: "Carpenter's Shop",
    bestTime: 'When buildings, animals, and tool upgrades start overlapping',
    role: 'Shop planning',
    verdict: 'A quiet time-saver that prevents expensive walks to closed shops.',
    details: [
      'The Telephone checks store hours and, for some merchants, inventory or upgrade information.',
      "Robin can tell you Carpenter's Shop stock, house upgrade costs, and building upgrade costs.",
      'Marnie can confirm ranch hours and livestock prices, but the supply shop is not opened through the phone.',
      "It does not replace every shop visit. Willy's Fish Shop is not a telephone option.",
      'Calling a villager does not count as talking to them for friendship.',
    ],
    tip:
      'Place one near your farmhouse door or workshop. Call before walking to Robin or Marnie, especially on days when schedules, festivals, construction, or tool upgrades might waste the trip.',
  },
  {
    rank: 5,
    slug: 'oak-dresser',
    name: 'Dresser',
    price: 'Usually 5,000g for Oak Dresser',
    source: "Robin's rotating furniture stock",
    bestTime: 'Once clothing, boots, hats, and rings pile up',
    role: 'Wearable storage',
    verdict: 'Not mandatory for profit, but excellent for keeping equipment out of food and material chests.',
    details: [
      'Dressers store clothing, hats, shoes, and rings.',
      'The Oak Dresser can appear in Robin\'s daily furniture stock for 5,000g.',
      'Other dresser styles can come from furniture catalogues or other sources, and they serve the same storage role.',
      'A Dresser keeps wearable items out of refrigerators, crop chests, and mining storage.',
    ],
    tip:
      'Buy this before your house becomes a pile of boots, rings, shirts, and festival hats. It is a quality-of-life purchase, not a money-making purchase.',
  },
];

const buyOrder = [
  ['Early social route', 'Calendar first, then Workbench. Birthdays are easier to use when you see them every morning.'],
  ['Crafting-heavy route', 'Workbench first, then Big Chest. You will feel the difference as soon as you craft sprinklers and machines.'],
  ['Building-heavy route', 'Telephone before Calendar. It saves time when checking Robin, Marnie, Clint, and upgrade costs.'],
  ['Late-game cleanup route', 'Big Chest and Dresser together. One fixes materials, the other fixes wearable clutter.'],
];

const sourceChecks = [
  { label: 'Big Chest recipe and storage behavior', href: 'https://wiki.stardewvalley.net/Big_Chest' },
  { label: 'Workbench adjacent chest behavior', href: 'https://stardewvalleywiki.com/Workbench' },
  { label: 'Calendar price and schedule display', href: 'https://stardewvalleywiki.com/Calendar' },
  { label: 'Telephone shop-call behavior', href: 'https://stardewvalleywiki.com/Telephone' },
  { label: 'Oak Dresser storage use', href: 'https://stardewvalleywiki.com/Oak_Dresser' },
];

const relatedLinks = [
  {
    href: '/guide/year-1-beginner-walkthrough/',
    title: 'Year 1 Beginner Walkthrough',
    text: 'Use this when you want the full first-year route after setting up your home tools.',
  },
  {
    href: '/guide/first-8-days-checklist/',
    title: 'First 8 Days Checklist',
    text: 'A day-by-day Spring opening route before Robin purchases become affordable.',
  },
  {
    href: '/guide/community-center/',
    title: 'Community Center Guide',
    text: 'Plan bundle storage and stop selling items you need later.',
  },
  {
    href: '/gift/robin/',
    title: 'Robin Gift Guide',
    text: 'Robin schedule, loved gifts, birthday timing, and friendship notes.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: "Best Robin Shop Items in Stardew Valley",
      description:
        "A StardewPriceDB original guide to the five most useful Carpenter's Shop purchases from Robin: Big Chest, Dresser, Calendar, Workbench, and Telephone.",
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
      about: ['Stardew Valley', "Carpenter's Shop", 'Robin', 'farm storage', 'crafting'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#itemlist`,
      name: "Best Robin Shop Items",
      itemListElement: shopItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${PAGE_URL}#${item.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: "Robin Shop Best Items", item: PAGE_URL },
      ],
    },
  ],
};

function ItemImage({ slug, name }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
      <GameImage slug={slug} alt={`${name} in Stardew Valley`} width={48} height={48} />
    </div>
  );
}

function ItemSection({ item }) {
  return (
    <article id={item.slug} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start">
        <ItemImage slug={item.slug} name={item.name} />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-green-800">
              #{item.rank}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              {item.role}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-950">{item.name}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{item.verdict}</p>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Cost</div>
          <div className="mt-1 font-black text-slate-950">{item.price}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Source</div>
          <div className="mt-1 font-black text-slate-950">{item.source}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Best buy timing</div>
          <div className="mt-1 font-black text-slate-950">{item.bestTime}</div>
        </div>
      </div>

      <ul className="mb-5 grid gap-3 md:grid-cols-2">
        {item.details.map((detail) => (
          <li key={detail} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            {detail}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="mb-1 text-sm font-black uppercase tracking-wide text-amber-900">StardewPriceDB tip</h3>
        <p className="text-sm leading-6 text-amber-950">{item.tip}</p>
      </div>
    </article>
  );
}

export default function RobinShopBestItemsPage() {
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
          <span className="font-medium text-slate-800">Robin Shop Best Items</span>
        </nav>

        <header className="mb-8 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
                5 Robin Shop Items That Make Your Farm Easier
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-700">
                Robin's Carpenter's Shop is not only for Coops, Barns, and house upgrades. These five purchases
                quietly improve the way you store items, craft machines, track birthdays, and avoid wasted trips
                across the valley.
              </p>
            </div>
            <div className="flex justify-center md:w-32">
              <div className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                <img
                  src="/images/npcs/robin.png"
                  alt="Robin in Stardew Valley"
                  width="96"
                  height="96"
                  className="pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">StardewPriceDB editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is original StardewPriceDB guide content, not a copied generic item list. The recommendations are
            based on practical farm workflow value:
            less inventory friction, fewer wasted trips, cleaner storage, and faster crafting.
          </p>
        </section>

        <section className="mb-8 grid gap-3 md:grid-cols-5">
          {shopItems.map((item) => (
            <a key={item.slug} href={`#${item.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-green-300 hover:shadow-md">
              <ItemImage slug={item.slug} name={item.name} />
              <div className="mt-3 text-sm font-black uppercase tracking-wide text-green-700">#{item.rank}</div>
              <div className="mt-1 font-bold leading-5 text-slate-950">{item.name}</div>
            </a>
          ))}
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Fast buy order</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {buyOrder.map(([route, advice]) => (
              <div key={route} className="rounded-lg bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">{route}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{advice}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 space-y-6">
          {shopItems.map((item) => (
            <ItemSection key={item.slug} item={item} />
          ))}
        </div>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Accuracy notes before you buy</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Do not overbuy too early</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Calendar, Workbench, and Telephone are cheap enough to buy early. Big Chest is stronger later,
                when the 2 Copper Bars do not slow down tools, Tappers, Furnaces, or early machines.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Dresser availability varies</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The Oak Dresser is the simple 5,000g example, but Robin's furniture stock rotates. If a different
                dresser style is available, buy the one you like. The storage purpose is the same.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Workbench layout matters</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Surround it with chests, but leave one access tile open. A perfect-looking ring of chests is useless
                if your farmer cannot click the Workbench.
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Telephone is information, not teleportation</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                It helps you check hours, inventory, and upgrade information, but you still need to visit the shop
                to buy, build, upgrade, or talk for friendship.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-green-950">Related StardewPriceDB guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedLinks.map((card) => (
              <Link key={card.href} href={card.href} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-green-100 transition hover:ring-green-300">
                <h3 className="font-bold text-green-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-green-900">{card.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Mechanics checked</h2>
          <p className="mb-4 text-sm leading-6 text-slate-600">
            StardewPriceDB keeps this page focused on original player advice, but purchase costs and item behavior
            were checked against current item reference pages before publishing.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {sourceChecks.map((source) => (
              <a key={source.href} href={source.href} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
                {source.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
