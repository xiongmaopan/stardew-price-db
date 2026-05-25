import { Suspense } from 'react';
import HomeContent from '@/components/HomeContent';
import verificationData from '@/data/verification.json';
import itemsData from '@/data/items.json';
import fishData from '@/data/fish.json';

const GAME_VERSION = verificationData.gameVersion;
const PRICE_ENTRY_COUNT = itemsData.items.filter((item) => item.category !== 'Fish').length + fishData.fish.length;
const SITE_URL = 'https://stardewpricedb.com';

const originalGuideSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#original-guides`,
  name: 'Original StardewPriceDB Guides',
  description: `Original StardewPriceDB guide content for Stardew Valley ${GAME_VERSION}, including player routes, rankings, strategy decisions, and checked formulas.`,
  itemListElement: [
    ['Money Making Methods Ranked', '/guide/money-making-methods-ranked/'],
    ['Year 1 Spring Guide', '/guide/year-1-spring-guide/'],
    ['Joja vs Community Center', '/guide/joja-vs-community-center/'],
    ['Beginner Mistakes to Avoid', '/guide/beginner-mistakes/'],
  ].map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    url: `${SITE_URL}${path}`,
  })),
};

export const metadata = {
  title: `Stardew Valley Price List & Profit Calculator ${GAME_VERSION}`,
  description: `Search the Stardew Valley ${GAME_VERSION} price list with crop, fish, mineral, artisan, Keg/Jar, quality, and profession profit values.`,
  keywords: ['Stardew Valley selling prices', 'Stardew Valley price guide', 'profit calculator', 'keg', 'preserves jar', 'farming guide', 'artisan goods', 'best crops stardew valley', 'stardew valley 1.6'],
  alternates: {
    canonical: 'https://stardewpricedb.com/',
  },
  openGraph: {
    title: `Stardew Valley Price List & Profit Calculator ${GAME_VERSION}`,
    description: `Search verified Stardew Valley ${GAME_VERSION} selling prices with Keg/Jar profits, quality values, and profession bonuses.`,
    url: 'https://stardewpricedb.com/',
    siteName: 'StardewPriceDB',
    locale: 'en_US',
    type: 'website',
  },
};

function StaticHero() {
  return (
    <div className="text-center py-10 md:py-14 bg-gradient-to-b from-[#1e293b] to-[#334155] rounded-xl mb-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,.18)_0,rgba(255,255,255,.18)_1px,transparent_1px,transparent_24px)]" />
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Stardew Valley <span className="text-yellow-400">Price List</span> & Profit Calculator
        </h1>
        <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
          Search verified sell prices for Stardew Valley {GAME_VERSION}. Check crop, fish, mineral, artisan good, Keg,
          Preserves Jar, quality, and profession-adjusted values.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="px-4 py-2 bg-white/10 rounded-full">Verified {PRICE_ENTRY_COUNT} Price Entries</span>
          <span className="px-4 py-2 bg-white/10 rounded-full">Formula Calculator</span>
          <span className="px-4 py-2 bg-white/10 rounded-full">v{GAME_VERSION} Data</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(originalGuideSchema) }} />
      <StaticHero />

      <Suspense fallback={
        <div className="animate-pulse">
          <div className="h-12 bg-slate-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </main>
  );
}
