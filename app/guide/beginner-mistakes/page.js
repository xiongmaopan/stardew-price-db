import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/beginner-mistakes/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Stardew Valley Beginner Mistakes to Avoid 1.6.15',
  description:
    'Avoid 10 Stardew Valley beginner mistakes with trash cans, gifts, Prismatic Shards, Dinosaur Eggs, Legendary Fish, bombs, and crop season planning.',
  keywords: [
    'Stardew Valley beginner mistakes',
    'Stardew Valley tips for beginners',
    'Stardew Valley things not to do',
    'Stardew Valley Prismatic Shard first use',
    'Stardew Valley Dinosaur Egg first use',
    'Stardew Valley Legendary Fish fridge',
    'Stardew Valley crop season mistakes',
  ],
  alternates: {
    canonical: '/guide/beginner-mistakes/',
  },
  openGraph: {
    title: 'Stardew Valley Beginner Mistakes to Avoid 1.6.15',
    description:
      'A practical beginner safety guide for avoiding friendship losses, wasted rare items, accidental bombs, bad crop timing, and other painful early Stardew mistakes.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stardew Valley beginner mistakes guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Beginner Mistakes to Avoid',
    description: '10 early mistakes that can cost friendship, rare items, crops, or progress, plus safer habits.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const mistakes = [
  {
    number: 1,
    slug: 'trash-cans-near-villagers',
    title: 'Digging through trash while a villager can see you',
    icon: 'garbage-can',
    risk: 'Friendship loss',
    short:
      'Garbage cans can be useful, but rummaging through one near most villagers costs friendship.',
    why:
      'If a villager other than Linus catches you searching a garbage can, you lose friendship with that villager. Linus is the exception and actually reacts positively.',
    better:
      'Check trash cans when the street is clear, or do it early and late when NPC paths are easier to predict. If someone is nearby, keep walking.',
    source: 'Garbage Can and Friendship mechanics',
  },
  {
    number: 2,
    slug: 'holding-giftable-items',
    title: 'Talking to NPCs while holding something giftable',
    icon: 'prismatic-shard',
    risk: 'Accidental gifts',
    short:
      'A single misclick can turn your best fish, crop, gem, or cooked dish into a gift you never meant to give.',
    why:
      'Most giftable items can be handed to villagers during interaction. If the item is disliked, hated, rare, or needed for a bundle, the mistake hurts twice.',
    better:
      'Before talking, switch to a tool, an empty slot, or a non-giftable utility item. Keep rare items out of your active hotbar when you are doing birthday runs.',
    source: 'Gift and friendship behavior',
  },
  {
    number: 3,
    slug: 'riverbank-trees',
    title: 'Chopping riverbank trees when you need every piece of wood',
    icon: 'wood',
    risk: 'Lost resources',
    short:
      'Trees beside water can drop wood where you cannot pick it up, which is painful in the first week.',
    why:
      'Wood is your early chest, bridge, scarecrow, and building material. Losing drops to water means spending more energy for the same result.',
    better:
      'Clear inland farm trees first, then plant a small tree area away from water. If you must chop near a river, stand on the side that encourages drops toward land.',
    source: 'Practical farm resource route',
  },
  {
    number: 4,
    slug: 'first-prismatic-shard',
    title: 'Donating, gifting, or selling your first Prismatic Shard',
    icon: 'prismatic-shard',
    secondaryIcon: 'galaxy-sword',
    risk: 'Delayed Galaxy Sword',
    short:
      'Your first Prismatic Shard is usually worth more as a weapon unlock than as a museum donation or gift.',
    why:
      'After the bus route is repaired, taking a Prismatic Shard to the Three Pillars in Calico Desert gives you the Galaxy Sword.',
    better:
      'Save the first shard for the Galaxy Sword. Donate a later shard once your combat route is stable.',
    source: 'Prismatic Shard and Galaxy Sword route',
  },
  {
    number: 5,
    slug: 'first-dinosaur-egg',
    title: 'Using your first Dinosaur Egg before you hatch it',
    icon: 'dinosaur-egg',
    secondaryIcon: 'dinosaur-mayonnaise',
    risk: 'Lost dinosaur chain',
    short:
      'Do not rush the first Dinosaur Egg into the museum, shipping bin, or Mayonnaise Machine.',
    why:
      'A Dinosaur Egg can be incubated in a Big or Deluxe Coop. Once the dinosaur matures, it produces more Dinosaur Eggs, so you can donate and process later without losing the source.',
    better:
      'Keep the first egg in a labeled chest until you have the incubator. Hatch it first, then use the next egg for Gunther or Dinosaur Mayonnaise.',
    source: 'Dinosaur Egg incubator behavior',
  },
  {
    number: 6,
    slug: 'fruit-tree-lightning',
    title: 'Assuming a lightning-struck fruit tree is dead',
    icon: 'apple-sapling',
    risk: 'Unnecessary chopping',
    short:
      'A burnt fruit tree is not dead. It is temporarily changed by the storm.',
    why:
      'Outdoor fruit trees struck by lightning become burnt for 4 days, produce Coal during that time, and then return to normal. Immature saplings also need their surrounding 3x3 area kept clear while growing.',
    better:
      'Do not chop the tree. Wait out the 4 days, and keep the 8 tiles around young fruit trees free of flooring, machines, paths, seeds, and debris.',
    source: 'Fruit Tree weather and growth rules',
  },
  {
    number: 7,
    slug: 'fertilizer-on-mixed-seeds',
    title: 'Spending scarce early fertilizer on Mixed Seeds',
    icon: 'mixed-seeds',
    secondaryIcon: 'basic-fertilizer',
    risk: 'Weak return on early money',
    short:
      'Fertilizer can work on crops from Mixed Seeds, but the payoff is unreliable because the crop is random.',
    why:
      'Mixed Seeds decide their crop when planted and produce a random crop for the current season. Early store-bought fertilizer is often better saved for planned, higher-value crops.',
    better:
      'Use free Mixed Seeds as cheap filler. Save fertilizer for crops you intentionally chose, especially ones with high base value or important bundle quality goals.',
    source: 'Mixed Seeds and Fertilizer mechanics',
  },
  {
    number: 8,
    slug: 'legendary-fish-fridge',
    title: 'Storing Legendary Fish in the refrigerator',
    icon: 'legend',
    secondaryIcon: 'sashimi',
    risk: 'Accidental Sashimi',
    short:
      'The refrigerator is connected to cooking. That is convenient until it uses the one fish you wanted to keep forever.',
    why:
      'Original Legendary Fish are normally one successful catch opportunity per save file, or once per player in multiplayer. Challenge Bait can multiply that one catch, but cooking still uses ingredients from the player inventory, refrigerator, and Mini-Fridges.',
    better:
      'Put Legendary Fish in a chest, fish tank, or display area. Do not store them in the fridge unless you are completely comfortable risking recipe input selection.',
    source: 'Legendary Fish and cooking ingredient rules',
  },
  {
    number: 9,
    slug: 'bombs-on-the-farm',
    title: 'Holding bombs while clicking machines, chests, or decorations',
    icon: 'bomb',
    risk: 'Destroyed equipment',
    short:
      'Bombs are excellent in the Mines and Skull Cavern. On the farm, one careless click can be expensive.',
    why:
      'Bombs damage or destroy certain items in their radius, including many crafted machines and refining equipment.',
    better:
      'Keep bombs in a mining chest or a separate hotbar slot away from your normal farm tools. When decorating or using machines, switch to an empty hand or a tool.',
    source: 'Bomb effects',
  },
  {
    number: 10,
    slug: 'forgetting-28-day-seasons',
    title: 'Forgetting that every season ends after day 28',
    icon: 'calendar',
    risk: 'Dead crops',
    short:
      'Late-season planting is where new farms quietly lose a lot of gold.',
    why:
      'Most crops are seasonal. When the season changes after day 28, out-of-season crops wither and die. Multi-season crops are the exception only when the next season supports them.',
    better:
      'Before buying seeds after day 20, count the growth nights, regrowth timing, and harvest day. Use the crop calculator when you are unsure, and avoid giant end-of-season field expansion unless it has a clear purpose.',
    source: 'Crop season and grow-time rules',
  },
];

const habitCards = [
  {
    title: 'Make a rare-item chest',
    text: 'Store Prismatic Shards, Dinosaur Eggs, Legendary Fish, bundle items, and one-off rewards in a chest you never use for cooking or gifting.',
    icon: 'dinosaur-egg',
  },
  {
    title: 'Talk with a safe hand',
    text: 'Switch to a tool or empty slot before NPC conversations. This tiny habit prevents most accidental gift mistakes.',
    icon: 'calendar',
  },
  {
    title: 'Separate mining from farming',
    text: 'Bombs, stairs, spicy food, and combat gear belong in a mining kit, not in the slot you use to collect mayonnaise or move machines.',
    icon: 'bomb',
  },
  {
    title: 'Check the calendar before seed buying',
    text: 'The real question is not "Can I plant this?" but "Will it mature before day 28, and is the profit worth the tile?"',
    icon: 'mixed-seeds',
  },
];

const relatedLinks = [
  {
    href: '/guide/first-8-days-checklist/',
    title: 'First 8 Days Checklist',
    text: 'A day-by-day Spring start that avoids common early routing mistakes.',
  },
  {
    href: '/guide/year-1-spring-guide/',
    title: 'Year 1 Spring Guide',
    text: 'A full first-Spring route for crops, fishing, Mines, bundles, Strawberries, and Summer prep.',
  },
  {
    href: '/guide/year-1-beginner-walkthrough/',
    title: 'Year 1 Beginner Walkthrough',
    text: 'A full first-year route for crops, bundles, mining, animals, and winter prep.',
  },
  {
    href: '/crop-profit-calculator/',
    title: 'Crop Profit Calculator',
    text: 'Check growth time, season length, regrowth, seed cost, and profit before planting.',
  },
  {
    href: '/guide/best-weapons/',
    title: 'Best Weapons Ranked',
    text: 'Use your first Prismatic Shard correctly, then plan the Galaxy and Infinity weapon path.',
  },
  {
    href: '/guide/community-center/',
    title: 'Community Center Guide',
    text: 'Stop selling bundle items by mistake and plan seasonal turn-ins early.',
  },
  {
    href: '/guide/robin-shop-best-items/',
    title: 'Best Robin Shop Items',
    text: 'Improve storage, crafting, schedules, and farm workflow with the right Robin purchases.',
  },
];

const sourceChecks = [
  { label: 'Garbage Can friendship penalty', href: 'https://stardewvalleywiki.com/Garbage_Can' },
  { label: 'Friendship point changes', href: 'https://stardewvalleywiki.com/Friendship' },
  { label: 'Prismatic Shard uses', href: 'https://stardewvalleywiki.com/Prismatic_Shard' },
  { label: 'Galaxy Sword desert pillars', href: 'https://stardewvalleywiki.com/Galaxy_Sword' },
  { label: 'Dinosaur Egg incubator route', href: 'https://stardewvalleywiki.com/Dinosaur_Egg' },
  { label: 'Fruit Tree lightning and sapling spacing', href: 'https://stardewvalleywiki.com/Fruit_Trees' },
  { label: 'Mixed Seeds behavior', href: 'https://stardewvalleywiki.com/Mixed_Seeds' },
  { label: 'Fertilizer rules', href: 'https://stardewvalleywiki.com/Fertilizer' },
  { label: 'Legendary Fish catch limit', href: 'https://stardewvalleywiki.com/Fish#Legendary_Fish' },
  { label: 'Cooking ingredient storage', href: 'https://stardewvalleywiki.com/Cooking' },
  { label: 'Bomb effects', href: 'https://stardewvalleywiki.com/Bomb' },
  { label: 'Crop season rules', href: 'https://stardewvalleywiki.com/Crops#End_of_Season' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Stardew Valley Beginner Mistakes to Avoid',
      description:
        'A StardewPriceDB original beginner guide covering 10 painful Stardew Valley mistakes and the safer habits that prevent them.',
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
      about: ['Stardew Valley', 'beginner guide', 'friendship', 'rare items', 'crop planning'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#mistake-list`,
      name: 'Stardew Valley Beginner Mistakes to Avoid',
      itemListElement: mistakes.map((mistake) => ({
        '@type': 'ListItem',
        position: mistake.number,
        name: mistake.title,
        url: `${PAGE_URL}#${mistake.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Beginner Mistakes', item: PAGE_URL },
      ],
    },
  ],
};

function PixelIcon({ slug, alt, size = 48 }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
      <GameImage slug={slug} alt={alt} width={size} height={size} />
    </div>
  );
}

function MistakeCard({ mistake }) {
  return (
    <article id={mistake.slug} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex gap-3">
          <PixelIcon slug={mistake.icon} alt={`${mistake.title} icon`} />
          {mistake.secondaryIcon ? (
            <PixelIcon slug={mistake.secondaryIcon} alt={`${mistake.title} related item`} size={42} />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              Mistake #{mistake.number}
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
              {mistake.risk}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-950">{mistake.title}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{mistake.short}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-red-900">Why it hurts</h3>
          <p className="text-sm leading-6 text-red-950">{mistake.why}</p>
        </div>
        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-green-900">Do this instead</h3>
          <p className="text-sm leading-6 text-green-950">{mistake.better}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Checked against: {mistake.source}
      </div>
    </article>
  );
}

export default function BeginnerMistakesPage() {
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
          <span className="font-medium text-slate-800">Beginner Mistakes</span>
        </nav>

        <header className="mb-8 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-green-50 p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">
                Stardew Valley Beginner Mistakes to Avoid
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-700">
                Some Stardew mistakes do not look dramatic when they happen. They just cost a rare item, a friendship
                heart, a season of crops, or a machine you forgot was inside bomb range. This guide turns those
                painful lessons into safer beginner habits.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:w-72">
              {['garbage-can', 'prismatic-shard', 'dinosaur-egg', 'legend', 'bomb', 'calendar'].map((slug) => (
                <div key={slug} className="flex h-20 items-center justify-center rounded-xl border border-white bg-white/80 shadow-sm">
                  <GameImage slug={slug} alt={`${slug} icon`} width={42} height={42} />
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">StardewPriceDB editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is original StardewPriceDB guide content, written and edited for English readers with a practical player-first
            tone. The advice is not a generic beginner list: it focuses on mistakes that permanently waste rare items,
            delay progression, or quietly reduce farm efficiency.
          </p>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Quick checklist</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {mistakes.map((mistake) => (
              <a key={mistake.slug} href={`#${mistake.slug}`} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700 transition hover:bg-green-50 hover:text-green-800">
                <GameImage slug={mistake.icon} alt="" width={28} height={28} />
                <span>{mistake.number}. {mistake.title}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="mb-8 space-y-6">
          {mistakes.map((mistake) => (
            <MistakeCard key={mistake.slug} mistake={mistake} />
          ))}
        </div>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Four habits that prevent most beginner mistakes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {habitCards.map((habit) => (
              <div key={habit.title} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <GameImage slug={habit.icon} alt={habit.title} width={34} height={34} />
                  <h3 className="font-black text-slate-950">{habit.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-700">{habit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-amber-950">The safest beginner rule</h2>
          <p className="leading-7 text-amber-950">
            If an item looks rare, irreplaceable, or tied to a quest, do not sell, cook, donate, or gift it until you
            know its best first use. In Stardew Valley, patience often makes the same item solve two problems later.
          </p>
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
            This page is original StardewPriceDB editorial advice. The game-rule claims below were checked before
            publishing so the guide does not mislead new players.
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
