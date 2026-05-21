import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Fish,
  ListChecks,
  Moon,
  PackageCheck,
  ShieldCheck,
  Umbrella,
} from 'lucide-react';
import GameImage from '@/components/GameImage';
import ScrollToTop from '@/components/ScrollToTop';
import bundlesData from '@/data/bundles.json';
import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const verifiedDate = verificationData.lastVerified.split('T')[0];
const fishByName = new Map(fishData.fish.map((fish) => [fish.name.toLowerCase(), fish]));
const fishTankBundles = bundlesData.bundles.filter((bundle) => bundle.room === 'Fish Tank');
const nightFishingBundle = fishTankBundles.find((bundle) => bundle.slug === 'night-fishing-bundle');
const allBundleItems = fishTankBundles.flatMap((bundle) =>
  bundle.items.map((item) => ({
    ...item,
    bundleName: bundle.name,
    bundleSlug: bundle.slug,
    fish: fishByName.get(item.name.toLowerCase()),
  }))
);
const rainTargets = allBundleItems.filter((item) => item.source.toLowerCase().includes('rain'));

export const metadata = {
  title: 'Community Center Fish Bundles Stardew Valley 1.6.15',
  description:
    'Complete Stardew Valley Fish Tank checklist with River, Lake, Ocean, Night Fishing, Crab Pot, and Specialty Fish bundle items, seasons, and locations.',
  keywords: [
    'community center fish Stardew',
    'Stardew Valley community center fish bundles',
    'Stardew Valley night fishing bundle',
    'Stardew Valley fishing bundles',
    'Stardew Valley fish tank bundle',
    'Stardew Valley bundle checklist',
  ],
  alternates: {
    canonical: '/guide/community-center-fish-bundles/',
  },
  openGraph: {
    title: 'Community Center Fish Bundles Stardew Valley 1.6.15',
    description:
      'Fish Tank checklist for River, Lake, Ocean, Night Fishing, Crab Pot, and Specialty Fish bundles.',
    url: `${SITE_URL}/guide/community-center-fish-bundles/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley Community Center fish bundles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Center Fish Bundles Stardew Valley 1.6.15',
    description: 'Fish Tank checklist with bundle items, seasons, time windows, locations, and links to fish pages.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Community Center Fish Bundles Stardew Valley 1.6.15',
    description: 'Checklist and planning guide for Stardew Valley Fish Tank Community Center bundles.',
    datePublished: '2026-05-21',
    dateModified: verifiedDate,
    author: { '@type': 'Organization', name: 'StardewPriceDB' },
    publisher: { '@type': 'Organization', name: 'StardewPriceDB', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/guide/community-center-fish-bundles/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guide/` },
      { '@type': 'ListItem', position: 3, name: 'Community Center Fish Bundles', item: `${SITE_URL}/guide/community-center-fish-bundles/` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stardew Valley Fish Tank Bundle Checklist',
    numberOfItems: allBundleItems.length,
    itemListElement: allBundleItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: item.fish ? `${SITE_URL}/fishing/${item.fish.slug}/` : `${SITE_URL}/bundle/${item.bundleSlug}/`,
      },
    })),
  },
];

function formatList(value) {
  return Array.isArray(value) ? value.join(', ') : value;
}

function FishLink({ item }) {
  if (!item.fish) {
    return <span className="font-semibold text-slate-800">{item.name}</span>;
  }

  return (
    <Link href={`/fishing/${item.fish.slug}/`} className="flex items-center gap-3 group">
      <span className="h-10 w-10 rounded-lg border border-cyan-200 bg-cyan-50 flex items-center justify-center">
        <GameImage slug={item.fish.slug} alt={item.name} width={28} height={28} />
      </span>
      <span className="font-semibold text-slate-800 group-hover:text-cyan-700">{item.name}</span>
    </Link>
  );
}

export default function CommunityCenterFishBundlesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <ScrollToTop />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-cyan-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/" className="hover:text-cyan-700">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">Community Center Fish Bundles</span>
      </nav>

      <header className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 rounded-xl p-6 md:p-8 mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700 mb-3">
          Updated {verifiedDate} | Stardew Valley {verificationData.gameVersion}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Community Center Fish Bundles</h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          A Fish Tank checklist for River Fish, Lake Fish, Ocean Fish, Night Fishing, Crab Pot, and Specialty Fish
          bundles. Use it to plan rainy days, night windows, desert access, and seasonal fish before the year slips away.
        </p>
      </header>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Fish, title: 'Fish Tank bundles', text: `${fishTankBundles.length} bundles are listed from local bundle data.` },
          { icon: PackageCheck, title: 'Checklist items', text: `${allBundleItems.length} possible items across all Fish Tank bundles.` },
          { icon: Umbrella, title: 'Rain checks', text: `${rainTargets.length} bundle entries need rainy weather or benefit from rain planning.` },
          { icon: ShieldCheck, title: 'Verified version', text: `Bundle data is marked for Stardew Valley ${bundlesData.version}.` },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <Icon size={22} className="text-cyan-600 mb-3" />
              <h2 className="font-bold text-slate-800 mb-2">{card.title}</h2>
              <p className="text-sm text-slate-600">{card.text}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-cyan-950 mb-3 flex items-center gap-2">
          <ListChecks size={22} />
          Quick answer
        </h2>
        <p className="text-cyan-950">
          The Fish Tank has six bundles. Most require every listed fish, while the Crab Pot Bundle only needs 5 of 10
          listed items. Quality does not matter for these bundle submissions, so normal quality fish are fine.
          Rainy-day planning is the biggest bottleneck for Catfish, Shad, Red Snapper, Walleye, and Eel.
        </p>
      </section>

      <div className="space-y-6 mb-8">
        {fishTankBundles.map((bundle) => (
          <section key={bundle.slug} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{bundle.name}</h2>
                <p className="text-sm text-slate-600 mt-1">{bundle.description}</p>
              </div>
              <Link href={`/bundle/${bundle.slug}/`} className="text-sm font-semibold text-cyan-700 hover:underline">
                Full bundle page
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Season</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Weather</th>
                    <th className="px-4 py-3 text-right">Base Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bundle.items.map((rawItem) => {
                    const item = {
                      ...rawItem,
                      fish: fishByName.get(rawItem.name.toLowerCase()),
                    };
                    return (
                      <tr key={`${bundle.slug}-${item.name}`} className="hover:bg-cyan-50/50">
                        <td className="px-4 py-3">
                          <FishLink item={item} />
                        </td>
                        <td className="px-4 py-3 text-slate-600">{item.source}</td>
                        <td className="px-4 py-3 text-slate-600">{item.fish ? formatList(item.fish.season) : 'Any'}</td>
                        <td className="px-4 py-3 text-slate-600">{item.fish?.time || 'Any'}</td>
                        <td className="px-4 py-3 text-slate-600">{item.fish?.weather || 'Any'}</td>
                        <td className="px-4 py-3 text-right font-bold text-green-700">
                          {item.fish ? `${item.fish.basePrice.toLocaleString()}g` : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-700">
              <span className="font-semibold">Tip:</span> {bundle.tips}
            </div>
          </section>
        ))}
      </div>

      {nightFishingBundle && (
        <section className="bg-slate-900 text-white rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <Moon size={22} className="text-cyan-300" />
            Night Fishing Bundle plan
          </h2>
          <p className="text-slate-200 mb-5">
            The Night Fishing Bundle is a useful mini-target because it combines time, season, and rain conditions.
            Save Walleye and Eel from rainy nights, then add Bream from any season after 6 PM.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {nightFishingBundle.items.map((rawItem) => {
              const fish = fishByName.get(rawItem.name.toLowerCase());
              return (
                <Link key={rawItem.name} href={fish ? `/fishing/${fish.slug}/` : `/bundle/${nightFishingBundle.slug}/`} className="bg-white/10 border border-white/10 rounded-lg p-4 hover:bg-white/15 transition">
                  <div className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-cyan-300" />
                    {rawItem.name}
                  </div>
                  <p className="text-sm text-slate-300 mt-2">{rawItem.source}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related pages</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: '/guide/community-center/', title: 'Full Community Center Guide', text: 'All rooms, bundles, rewards, and Year 1 planning.' },
            { href: '/fishing/', title: 'All Fish Locations', text: 'Search fish by season, location, weather, time, price, and difficulty.' },
            { href: '/guide/how-to-fish/', title: 'How to Fish', text: 'Fishing basics, rods, bait, tackle, easy fish, and difficult catch prep.' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="group border border-slate-200 rounded-lg p-4 hover:border-cyan-300 hover:bg-cyan-50 transition">
              <div className="font-bold text-slate-800 group-hover:text-cyan-700 flex items-center justify-between">
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
