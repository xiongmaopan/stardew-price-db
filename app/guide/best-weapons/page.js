import Link from 'next/link';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const PAGE_URL = `${SITE_URL}/guide/best-weapons/`;
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const PAGE_UPDATED = '2026-05-24';

export const metadata = {
  title: 'Best Weapons in Stardew Valley 1.6.15 | Top 3 Ranked',
  description:
    'Stardew Valley best weapons ranked for 1.6.15: Dragontooth Club, Infinity Blade, and Iridium Needle, with how to get them, Forge upgrades, enchantments, and build advice.',
  keywords: [
    'Stardew Valley best weapons',
    'best weapon Stardew Valley',
    'Stardew Valley Infinity Blade',
    'Stardew Valley Dragontooth Club',
    'Stardew Valley Iridium Needle',
    'Stardew Valley weapon forge guide',
  ],
  alternates: {
    canonical: '/guide/best-weapons/',
  },
  openGraph: {
    title: 'Best Weapons in Stardew Valley 1.6.15',
    description:
      'A practical endgame weapon ranking for Dragontooth Club, Infinity Blade, and Iridium Needle, including acquisition routes and Forge builds.',
    url: PAGE_URL,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best weapons in Stardew Valley' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Weapons in Stardew Valley',
    description: 'Top endgame weapons ranked with Forge upgrades, enchantments, and honest pros and cons.',
  },
  other: {
    dateModified: PAGE_UPDATED,
    version: GAME_VERSION,
  },
};

const weapons = [
  {
    rank: 1,
    slug: 'dragontooth-club',
    name: 'Dragontooth Club',
    type: 'Club',
    level: 14,
    damage: '80-100',
    crit: '2%',
    source: 'Volcano Dungeon rare chest',
    stats: '+50 Crit. Power, +3 Weight',
    bestFor: 'highest burst ceiling and club special attacks',
    verdict:
      'The strongest pick when you are willing to farm rare Volcano chests and tune the weapon at the Forge.',
    image: 'dragontooth-club',
    quickTake: [
      'Hits as hard as an Infinity Blade before upgrades.',
      'Adds built-in critical power and heavy knockback.',
      'Club special attacks can erase dangerous enemies when timed well.',
      'Feels slow before forging, and the drop is pure luck.',
    ],
    howToGet: [
      'Unlock Ginger Island and reach the Volcano Dungeon.',
      'Open rare treasure chests in the Volcano Dungeon. Floor 9 is especially valuable because chest quality is better there.',
      'The Dragontooth Club is a rare-chest weapon drop, so expect repeat Volcano runs before seeing one.',
    ],
    forgePlan: [
      'Use Ruby if you want the cleanest damage increase.',
      'Use Emerald if the slow club swing is what gets you hit.',
      'Use a Prismatic Shard for Crusader if you spend a lot of time fighting mummies, ghosts, skeletons, or void spirits.',
      'Use Dragon Tooth innate rolls to chase useful comfort stats such as reduced Weight, Speed, Attack, or Crit Power.',
    ],
    downside:
      'The weapon is not reliable to obtain. If you want a strong weapon on a predictable schedule, Infinity Blade is easier to plan around.',
  },
  {
    rank: 2,
    slug: 'infinity-blade',
    name: 'Infinity Blade',
    type: 'Sword',
    level: 17,
    damage: '80-100',
    crit: '2%',
    source: 'Forge upgrade from Galaxy Sword',
    stats: '+4 Speed, +2 Defense',
    bestFor: 'safe everyday combat and Skull Cavern consistency',
    verdict:
      'The best practical recommendation for most players because it is strong, fast, defensive, and has a clear upgrade path.',
    image: 'infinity-blade',
    quickTake: [
      'Excellent range and speed with no awkward weapon handling.',
      'Matches Dragontooth Club base damage while adding Defense.',
      'The route is long, but it is predictable once Ginger Island and Qi content are open.',
      'Does not have the same critical-hit ceiling as Iridium Needle or Dragontooth Club.',
    ],
    howToGet: [
      'Get a Prismatic Shard and take it to the Three Pillars in Calico Desert to receive the Galaxy Sword.',
      "Unlock Ginger Island, reach the Volcano Forge, and collect 60 Cinder Shards.",
      "Get 3 Galaxy Souls, commonly from Qi's Walnut Room for 40 Qi Gems each.",
      'Forge the Galaxy Sword with 1 Galaxy Soul and 20 Cinder Shards three separate times to create the Infinity Blade.',
    ],
    forgePlan: [
      'Use three Rubies if you want the simplest damage build.',
      'Use Crusader if your main problem is mummies, ghosts, skeletons, or void spirits.',
      'Use Artful only if you care more about sword special-move uptime than mummy cleanup.',
      'Do not plan around Dragon Tooth innate enchantments on Infinity Blade. Galaxy and Infinity weapons are excluded from that system.',
    ],
    downside:
      'It is not flashy, and it will not create the huge critical-hit screenshots that a specialized crit weapon can create.',
  },
  {
    rank: 3,
    slug: 'iridium-needle',
    name: 'Iridium Needle',
    type: 'Dagger',
    level: 12,
    damage: '20-35',
    crit: '10%',
    source: 'Special Slimes in dangerous Mines',
    stats: '+6 Crit. Chance, +200 Crit. Power',
    bestFor: 'critical-hit builds and dagger burst',
    verdict:
      'The highest crit fantasy in Stardew Valley, but it asks you to play close, precise, and slightly risky.',
    image: 'iridium-needle',
    quickTake: [
      'Highest base critical strike chance and critical power of any weapon.',
      'Dagger special attacks feel excellent when the crit chain lands.',
      'Short range makes it easier to take damage in crowded fights.',
      'Weak for players who prefer wide, safe swings against groups.',
    ],
    howToGet: [
      "Unlock Qi's Walnut Room on Ginger Island by collecting 100 Golden Walnuts.",
      'Take the Danger in the Deep special order, or use the Shrine of Challenge after unlocking the dangerous Mines.',
      'Farm special Slimes in the dangerous Mines. Iridium Needle has a 14% drop chance from those special Slimes.',
    ],
    forgePlan: [
      'Use Aquamarine if your goal is more critical-hit frequency.',
      'Use Jade if you already have enough crit chance and want harder critical hits.',
      'Use Artful to cut dagger special-move cooldown in half.',
      'Use Dragon Tooth innate rolls to chase Crit Power, Crit Chance, Speed, or Attack.',
    ],
    downside:
      'It is not a relaxed weapon. If you are learning Skull Cavern or fighting large groups, Infinity Blade is usually safer.',
  },
];

const forgeBasics = [
  {
    title: 'Ruby',
    image: 'ruby',
    text: 'Adds damage. This is the cleanest choice for Infinity Blade and a strong default for Dragontooth Club.',
  },
  {
    title: 'Aquamarine',
    image: 'aquamarine',
    text: 'Adds critical-hit chance. Best when you are building around Iridium Needle crit frequency.',
  },
  {
    title: 'Jade',
    image: 'jade',
    text: 'Adds critical-hit damage. Better after your crit chance is already high enough to matter.',
  },
  {
    title: 'Emerald',
    image: 'emerald',
    text: 'Adds weapon speed. Useful when Dragontooth Club feels too slow for your comfort.',
  },
  {
    title: 'Prismatic Shard',
    image: 'prismatic-shard',
    text: 'Adds a random combat enchantment. Crusader and Artful are the two most useful picks for this guide.',
  },
  {
    title: 'Dragon Tooth',
    image: 'dragon-tooth',
    text: 'Adds random innate enchantments to eligible melee weapons. Galaxy and Infinity weapons are excluded.',
  },
];

const quickComparison = [
  ['Safest all-rounder', 'Infinity Blade'],
  ['Highest burst ceiling', 'Dragontooth Club'],
  ['Best crit experiment', 'Iridium Needle'],
  ['Best for new endgame players', 'Infinity Blade'],
  ['Most RNG-dependent', 'Dragontooth Club'],
  ['Most fragile playstyle', 'Iridium Needle'],
];

const sourceChecks = [
  { label: 'Iridium Needle stats and drop source', href: 'https://stardewvalleywiki.com/Iridium_Needle' },
  { label: 'Infinity Blade recipe and stats', href: 'https://stardewvalleywiki.com/Infinity_Blade' },
  { label: 'Dragontooth Club stats and Volcano source', href: 'https://stardewvalleywiki.com/Dragontooth_Club' },
  { label: 'Forge gems, enchantments, and Infinity weapons', href: 'https://stardewvalleywiki.com/Forge' },
  { label: 'Galaxy Sword desert pillar route', href: 'https://stardewvalleywiki.com/Galaxy_Sword' },
  { label: 'Galaxy Soul sources', href: 'https://stardewvalleywiki.com/Galaxy_Soul' },
  { label: 'Dragon Tooth sources and forging use', href: 'https://stardewvalleywiki.com/Dragon_Tooth' },
  { label: 'Far Away Stone and Meowmere appearance route', href: 'https://stardewvalleywiki.com/Far_Away_Stone' },
];

const relatedLinks = [
  {
    href: '/guide/skull-cavern/',
    title: 'Skull Cavern Strategy Guide',
    text: 'Use these weapons in deeper Skull Cavern runs with bombs, luck, food, and staircases.',
  },
  {
    href: '/guide/mining-profit/',
    title: 'Mining Profit Guide',
    text: 'Turn combat and mining time into ore, gems, and Crystalarium value.',
  },
  {
    href: '/guide/year-1-beginner-walkthrough/',
    title: 'Year 1 Beginner Walkthrough',
    text: 'Build the early farm foundation before chasing Ginger Island and endgame weapons.',
  },
  {
    href: '/minerals/',
    title: 'Minerals Price List',
    text: 'Check gem and mineral values before you spend them at the Forge.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Best Weapons in Stardew Valley',
      description:
        'A StardewPriceDB original ranking of Dragontooth Club, Infinity Blade, and Iridium Needle, with acquisition routes, Forge upgrades, enchantments, and playstyle advice.',
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
      about: ['Stardew Valley', 'weapons', 'Forge', 'Infinity Blade', 'Dragontooth Club', 'Iridium Needle'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#weapon-ranking`,
      name: 'Best Stardew Valley Weapons Ranked',
      itemListElement: weapons.map((weapon) => ({
        '@type': 'ListItem',
        position: weapon.rank,
        name: weapon.name,
        url: `${PAGE_URL}#${weapon.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
        { '@type': 'ListItem', position: 3, name: 'Best Weapons', item: PAGE_URL },
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

function WeaponCard({ weapon }) {
  return (
    <article id={weapon.slug} className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start">
        <PixelIcon slug={weapon.image} alt={`${weapon.name} weapon icon`} />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              Rank #{weapon.rank}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
              {weapon.type}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
              Level {weapon.level}
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-950">{weapon.name}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{weapon.verdict}</p>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-4">
        {[
          ['Damage', weapon.damage],
          ['Crit chance', weapon.crit],
          ['Source', weapon.source],
          ['Best for', weapon.bestFor],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
            <div className="mt-1 font-black text-slate-950">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <div className="text-xs font-bold uppercase tracking-wide text-purple-700">Built-in stats</div>
        <p className="mt-1 text-sm font-semibold text-purple-950">{weapon.stats}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-black text-slate-950">Quick take</h3>
          <ul className="space-y-3">
            {weapon.quickTake.map((item) => (
              <li key={item} className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-black text-slate-950">How to get it</h3>
          <ol className="space-y-3">
            {weapon.howToGet.map((item) => (
              <li key={item} className="rounded-lg bg-green-50 p-3 text-sm leading-6 text-green-950">{item}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-black text-slate-950">Forge plan</h3>
          <ul className="space-y-3">
            {weapon.forgePlan.map((item) => (
              <li key={item} className="rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-950">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="mb-1 text-sm font-black uppercase tracking-wide text-red-900">Main drawback</h3>
        <p className="text-sm leading-6 text-red-950">{weapon.downside}</p>
      </div>
    </article>
  );
}

export default function BestWeaponsPage() {
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
          <span className="font-medium text-slate-800">Best Weapons</span>
        </nav>

        <header className="mb-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 p-6 text-white md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-200">
            Updated {PAGE_UPDATED} | Data verified {LAST_VERIFIED} for Stardew Valley {GAME_VERSION}
          </p>
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Best Weapons in Stardew Valley: Top 3 Endgame Picks
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-200">
            This ranking is not just a raw damage list. It weighs real combat feel: safety, range, Forge scaling,
            special attacks, critical-hit potential, and how painful the weapon is to obtain.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {weapons.map((weapon) => (
              <a key={weapon.slug} href={`#${weapon.slug}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20">
                <GameImage slug={weapon.image} alt={weapon.name} width={28} height={28} />
                #{weapon.rank} {weapon.name}
              </a>
            ))}
          </div>
        </header>

        <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-black text-blue-950">StardewPriceDB editorial note</h2>
          <p className="leading-7 text-blue-950">
            This is original StardewPriceDB guide content, rewritten for English readers and checked against current
            Stardew Valley weapon and Forge mechanics. The normal progression route is the main recommendation. Item-ID
            naming tricks or spawn shortcuts are not used for the ranking because they bypass the combat progression
            this guide is meant to help players understand.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {weapons.map((weapon) => (
            <a key={weapon.slug} href={`#${weapon.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md">
              <PixelIcon slug={weapon.image} alt={weapon.name} />
              <div className="mt-4 text-sm font-black uppercase tracking-wide text-green-700">Rank #{weapon.rank}</div>
              <h2 className="mt-1 text-xl font-black text-slate-950">{weapon.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{weapon.bestFor}</p>
            </a>
          ))}
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Which one should you actually use?</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {quickComparison.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
                <span className="text-sm font-semibold text-slate-600">{label}</span>
                <span className="text-right font-black text-slate-950">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 space-y-6">
          {weapons.map((weapon) => (
            <WeaponCard key={weapon.slug} weapon={weapon} />
          ))}
        </div>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-slate-950">Forge upgrade cheat sheet</h2>
          <p className="mb-5 leading-7 text-slate-700">
            The Forge is on floor 10 of the Volcano Dungeon. A melee weapon can receive up to three gem forges,
            plus one combat enchantment from a Prismatic Shard. Eligible weapons can also receive innate
            enchantments from Dragon Tooth, but Galaxy and Infinity weapons are excluded.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {forgeBasics.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <GameImage slug={item.image} alt={item.title} width={32} height={32} />
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="mb-4 text-2xl font-black text-purple-950">Optional appearance: Meowmere Infinity Blade</h2>
          <div className="grid gap-5 md:grid-cols-[auto_1fr]">
            <div className="flex gap-3">
              <PixelIcon slug="ancient-doll" alt="Ancient Doll" size={42} />
              <PixelIcon slug="far-away-stone" alt="Far Away Stone" size={42} />
              <PixelIcon slug="meowmere" alt="Meowmere" size={42} />
            </div>
            <div>
              <p className="leading-7 text-purple-950">
                If you want the rainbow-cat look, use an Ancient Doll next to the lava pool in the Volcano Caldera
                or Mines level 100 to get a Far Away Stone. With 4 hearts with the Wizard, enter his basement and
                place the stone on the Terraria-style pedestal to obtain Meowmere.
              </p>
              <p className="mt-3 text-sm leading-6 text-purple-900">
                At the Forge, put Infinity Blade in the left slot and Meowmere in the right slot to keep Infinity
                Blade stats with Meowmere appearance. This costs 10 Cinder Shards and consumes the appearance weapon.
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
            Rankings are editorial, but weapon stats, Forge materials, Infinity upgrade rules, Dragon Tooth rules,
            and appearance-transfer behavior were checked before publishing.
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
