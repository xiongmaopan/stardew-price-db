import Link from 'next/link';
import {
  Anchor,
  ArrowRight,
  CircleDot,
  Fish,
  Gauge,
  ListChecks,
  Search,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const verifiedDate = verificationData.lastVerified.split('T')[0];

const starterFish = fishData.fish
  .filter((fish) => !fish.legendary && fish.difficulty > 0 && fish.difficulty <= 35)
  .sort((a, b) => a.difficulty - b.difficulty || b.basePrice - a.basePrice)
  .slice(0, 10);

export const metadata = {
  title: 'How to Fish in Stardew Valley 1.6.15 | Rods, Bait, Tackle',
  description:
    'Learn how to fish in Stardew Valley with rods, casting, the green bar, bait, tackle, starter fish, leveling, and difficult catch tips for 1.6.15.',
  keywords: [
    'how to fish in Stardew Valley',
    'Stardew Valley fishing guide',
    'Stardew Valley fishing rods',
    'Stardew Valley bait and tackle',
    'Stardew Valley fishing tips',
    'Stardew Valley beginner fishing',
  ],
  alternates: {
    canonical: '/guide/how-to-fish/',
  },
  openGraph: {
    title: 'How to Fish in Stardew Valley 1.6.15',
    description: 'Beginner fishing guide covering rods, casting, bait, tackle, leveling, easy fish, and hard catches.',
    url: `${SITE_URL}/guide/how-to-fish/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'How to fish in Stardew Valley' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Fish in Stardew Valley 1.6.15',
    description: 'Rods, casting, bait, tackle, leveling, easy starter fish, and hard catch tips.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Fish in Stardew Valley 1.6.15',
    description: 'Beginner fishing guide for Stardew Valley rods, bait, tackle, leveling, and catch strategy.',
    datePublished: '2026-05-21',
    dateModified: verifiedDate,
    author: { '@type': 'Organization', name: 'StardewPriceDB' },
    publisher: { '@type': 'Organization', name: 'StardewPriceDB', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/guide/how-to-fish/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
      { '@type': 'ListItem', position: 3, name: 'How to Fish', item: `${SITE_URL}/guide/how-to-fish/` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Fish in Stardew Valley',
    description: 'Basic steps for learning Stardew Valley fishing.',
    step: [
      { '@type': 'HowToStep', name: 'Get a fishing rod', text: 'Start with the Bamboo Pole, then upgrade rods as fishing level and gold allow.' },
      { '@type': 'HowToStep', name: 'Cast into water', text: 'Cast farther from shore when possible for better quality and stronger catch pools.' },
      { '@type': 'HowToStep', name: 'Keep the fish inside the green bar', text: 'Tap or hold the action button to move the bar and avoid overcorrecting.' },
      { '@type': 'HowToStep', name: 'Use bait and tackle', text: 'Bait speeds bites, while tackle changes the minigame or improves catch value.' },
    ],
  },
];

function formatList(value) {
  return Array.isArray(value) ? value.join(', ') : value;
}

export default function HowToFishGuidePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <ScrollToTop />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/" className="hover:text-blue-700">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">How to Fish</span>
      </nav>

      <header className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 md:p-8 mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
          Updated {verifiedDate} | Stardew Valley {verificationData.gameVersion}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">How to Fish in Stardew Valley</h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          A practical fishing guide for new and returning players: how the minigame works, which rods and tackle matter,
          what to catch first, and when to move from easy fish into high-value or legendary targets.
        </p>
      </header>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Fish, title: 'Catch goal', text: `${fishData.fish.length} fish entries with prices, seasons, time windows, and locations.` },
          { icon: Gauge, title: 'Skill effect', text: 'Higher fishing skill increases the green bar, making harder fish more manageable.' },
          { icon: Anchor, title: 'Tackle matters', text: 'Cork Bobber helps hard fish; Trap Bobber helps fish that jump around the bar.' },
          { icon: ShieldCheck, title: 'Verified data', text: `Fish conditions use the site database for ${verificationData.gameVersion}.` },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <Icon size={22} className="text-blue-600 mb-3" />
              <h2 className="font-bold text-slate-800 mb-2">{card.title}</h2>
              <p className="text-sm text-slate-600">{card.text}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ListChecks size={22} className="text-blue-600" />
          Fishing basics
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Cast farther when possible',
              text: 'Farther casts generally improve fish quality and can help reach better catch pools. Bubbles are worth prioritizing when you see them.',
            },
            {
              title: '2. Tap instead of panic-holding',
              text: 'Most beginners overcorrect. Small taps keep the green bar controlled, especially against mixed and smooth behavior fish.',
            },
            {
              title: '3. Upgrade rods for bait and tackle',
              text: 'Bait speeds bite rate. Tackle becomes important once fish difficulty rises or when you target specific profit routes.',
            },
            {
              title: '4. Use food before hard fish',
              text: 'Fishing buffs increase effective skill and make the bar larger. Save them for Catfish, Octopus, Scorpion Carp, and legendaries.',
            },
          ].map((item) => (
            <div key={item.title} className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-2">
          <Search size={22} />
          Quick answer
        </h2>
        <p className="text-blue-950">
          If fishing feels hard, start with low-difficulty fish, level up for a larger bar, then add bait and tackle.
          For difficult fish, Cork Bobber gives more bar size and Trap Bobber slows escape progress when the fish leaves
          the bar. Once you know the minigame, use the full fishing database to plan by season and location.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Easy Starter Fish</h2>
          <p className="text-sm text-slate-600 mt-1">Low-difficulty catches from the fish database. Use these to build fishing levels before harder targets.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Fish</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Season</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Difficulty</th>
                <th className="px-4 py-3 text-right">Base Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {starterFish.map((fish) => (
                <tr key={fish.slug} className="hover:bg-blue-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/fishing/${fish.slug}/`} className="flex items-center gap-3 group">
                      <span className="h-10 w-10 rounded-lg border border-blue-200 bg-blue-50 flex items-center justify-center">
                        <GameImage slug={fish.slug} alt={fish.name} width={28} height={28} />
                      </span>
                      <span className="font-semibold text-slate-800 group-hover:text-blue-700">{fish.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{formatList(fish.location)}</td>
                  <td className="px-4 py-3 text-slate-600">{formatList(fish.season)}</td>
                  <td className="px-4 py-3 text-slate-600">{fish.time}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{fish.difficulty}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{fish.basePrice.toLocaleString()}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CircleDot size={22} className="text-blue-600" />
          Bait and tackle choices
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fishData.tips.tackle.slice(0, 6).map((item) => (
            <div key={item.name} className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-800">{item.name}</h3>
              <p className="text-sm text-blue-700 mt-1">{item.effect}</p>
              <p className="text-xs text-slate-500 mt-2">Best for: {item.best_for}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Waves size={22} className="text-blue-600" />
          Next fishing pages
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: '/fishing/', title: 'All Fish Locations', text: 'Search the full fish database by season, weather, location, price, and difficulty.' },
            { href: '/guide/legendary-fish/', title: 'Legendary Fish', text: 'Exact requirements for Legend, Crimsonfish, Angler, Glacierfish, and Qi family fish.' },
            { href: '/guide/community-center-fish-bundles/', title: 'Fish Bundles', text: 'Fish Tank checklist for River, Lake, Ocean, Night Fishing, Crab Pot, and Specialty Fish.' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition">
              <div className="font-bold text-slate-800 group-hover:text-blue-700 flex items-center justify-between">
                {link.title}
                <ArrowRight size={16} />
              </div>
              <p className="text-sm text-slate-600 mt-2">{link.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
