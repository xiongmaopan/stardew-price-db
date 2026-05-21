import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Crown,
  MapPin,
  ShieldCheck,
  Target,
  Trophy,
} from 'lucide-react';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const verifiedDate = verificationData.lastVerified.split('T')[0];
const legendaryFish = fishData.fish.filter((fish) => fish.legendary);
const baseLegendaryFish = legendaryFish.filter((fish) => !fish.legendaryII);
const extendedFamilyFish = legendaryFish.filter((fish) => fish.legendaryII);

export const metadata = {
  title: 'Stardew Valley Legendary Fish Guide 1.6.15 | Locations',
  description:
    'Catch every Stardew Valley legendary fish with season, weather, time, location, fishing level, difficulty, sell price, and 1.6.15 tips.',
  keywords: [
    'Stardew Valley legendary fish',
    'Stardew Valley Legend fish',
    'how to catch legendary fish Stardew Valley',
    'Stardew Valley Crimsonfish location',
    'Stardew Valley Glacierfish location',
    'Stardew Valley Angler fish location',
    'Stardew Valley 1.6.15 fishing',
  ],
  alternates: {
    canonical: '/guide/legendary-fish/',
  },
  openGraph: {
    title: 'Stardew Valley Legendary Fish Guide 1.6.15',
    description:
      'All legendary fish with exact locations, seasons, time windows, weather, fishing levels, difficulty, and sell prices.',
    url: `${SITE_URL}/guide/legendary-fish/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley legendary fish guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Legendary Fish Guide 1.6.15',
    description: 'Locations, seasons, weather, levels, difficulty, and sell prices for every legendary fish.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Stardew Valley Legendary Fish Guide 1.6.15',
    description:
      'Locations, seasons, time windows, weather, fishing level requirements, difficulty, and sell prices for legendary fish.',
    datePublished: '2026-05-21',
    dateModified: verifiedDate,
    author: { '@type': 'Organization', name: 'StardewPriceDB' },
    publisher: { '@type': 'Organization', name: 'StardewPriceDB', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/guide/legendary-fish/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
      { '@type': 'ListItem', position: 3, name: 'Legendary Fish', item: `${SITE_URL}/guide/legendary-fish/` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stardew Valley Legendary Fish',
    numberOfItems: legendaryFish.length,
    itemListElement: legendaryFish.map((fish, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: fish.name,
        url: `${SITE_URL}/fishing/${fish.slug}/`,
      },
    })),
  },
];

function formatList(value) {
  return Array.isArray(value) ? value.join(', ') : value;
}

function LegendaryFishTable({ title, description, fish }) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Fish</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Season</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Weather</th>
              <th className="px-4 py-3 text-right">Level</th>
              <th className="px-4 py-3 text-right">Difficulty</th>
              <th className="px-4 py-3 text-right">Base Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fish.map((item) => (
              <tr key={item.slug} className="hover:bg-amber-50/50">
                <td className="px-4 py-3">
                  <Link href={`/fishing/${item.slug}/`} className="flex items-center gap-3 group">
                    <span className="h-10 w-10 rounded-lg border border-amber-200 bg-amber-50 flex items-center justify-center">
                      <GameImage slug={item.slug} alt={item.name} width={28} height={28} />
                    </span>
                    <span className="font-semibold text-slate-800 group-hover:text-amber-700">{item.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{formatList(item.location)}</td>
                <td className="px-4 py-3 text-slate-600">{formatList(item.season)}</td>
                <td className="px-4 py-3 text-slate-600">{item.time}</td>
                <td className="px-4 py-3 text-slate-600">{item.weather}</td>
                <td className="px-4 py-3 text-right text-slate-700">{item.fishingLevel || 'None'}</td>
                <td className="px-4 py-3 text-right font-bold text-red-700">{item.difficulty}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{item.basePrice.toLocaleString()}g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function LegendaryFishGuidePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <ScrollToTop />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/" className="hover:text-amber-700">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Legendary Fish</span>
      </nav>

      <header className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl p-6 md:p-8 mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700 mb-3">
          Updated {verifiedDate} | Stardew Valley {verificationData.gameVersion}
        </p>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Stardew Valley Legendary Fish Guide</h1>
            <p className="text-lg text-slate-700 max-w-3xl">
              Exact catch conditions for every legendary fish: location, season, weather, time window, fishing level,
              difficulty, and base sell price. Use this as the decision page before you attempt Legend, Crimsonfish,
              Angler, Glacierfish, Mutant Carp, or Qi's Extended Family fish.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-amber-200 rounded-lg p-4">
              <div className="text-2xl font-black text-amber-700">{baseLegendaryFish.length}</div>
              <div className="text-xs text-slate-500">Base game</div>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-4">
              <div className="text-2xl font-black text-amber-700">{extendedFamilyFish.length}</div>
              <div className="text-xs text-slate-500">Extended</div>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-4">
              <div className="text-2xl font-black text-amber-700">110</div>
              <div className="text-xs text-slate-500">Max difficulty</div>
            </div>
          </div>
        </div>
      </header>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Target, title: 'Best prep', text: 'Use Iridium Rod, Cork Bobber or Trap Bobber, and fishing buff food for hard catches.' },
          { icon: Calendar, title: 'Season matters', text: 'Legend, Crimsonfish, Angler, and Glacierfish each have strict seasonal windows.' },
          { icon: MapPin, title: 'Location matters', text: 'Several legendary fish require a precise map spot, not just a general region.' },
          { icon: ShieldCheck, title: 'Data checked', text: `Conditions are generated from the site fish database for ${verificationData.gameVersion}.` },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <Icon size={22} className="text-amber-600 mb-3" />
              <h2 className="font-bold text-slate-800 mb-2">{card.title}</h2>
              <p className="text-sm text-slate-600">{card.text}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-amber-950 mb-3 flex items-center gap-2">
          <Trophy size={22} />
          Quick answer
        </h2>
        <p className="text-amber-950">
          The hardest legendary fish are Legend and Legend II at difficulty 110. The original five legendary fish are
          one-time catches per save file, while the Extended Family fish are tied to Qi's Extended Family quest.
          For the safest attempt, reach the listed fishing level, use a larger fishing bar, and bring fishing buff food.
        </p>
      </section>

      <div className="space-y-8">
        <LegendaryFishTable
          title="Original Legendary Fish"
          description="The five classic legendary fish and their exact catch requirements."
          fish={baseLegendaryFish}
        />
        <LegendaryFishTable
          title="Extended Family Legendary Fish"
          description="Qi quest legendary variants. These follow their parent fish themes but are repeatable only through the quest flow."
          fish={extendedFamilyFish}
        />
      </div>

      <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Crown size={22} className="text-amber-600" />
          Related fishing pages
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: '/fishing/', title: 'All Fish Locations', text: 'Search every fish by location, season, weather, time, difficulty, and price.' },
            { href: '/guide/how-to-fish/', title: 'How to Fish', text: 'Beginner mechanics, rods, bait, tackle, and leveling path before hard catches.' },
            { href: '/guide/best-fish-by-season/', title: 'Best Fish by Season', text: 'Seasonal profit targets for normal fishing sessions and Year 1 planning.' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group border border-slate-200 rounded-lg p-4 hover:border-amber-300 hover:bg-amber-50 transition">
              <div className="font-bold text-slate-800 group-hover:text-amber-700 flex items-center justify-between">
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
