import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  Database,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sprout,
  Table2,
} from 'lucide-react';
import GameImage from '@/components/GameImage';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];
const SEASON_DAYS = 28;

export const metadata = {
  title: 'Stardew Valley Crop Profit Calculator 1.6.15 | Keg and Jar',
  description:
    'Use Stardew Valley crop profit calculators for Spring, Summer, Fall, Winter, and Greenhouse with seed cost, harvests, Keg, Jar, Tiller, and Artisan math.',
  keywords: [
    'Stardew Valley crop profit calculator',
    'Stardew Valley crop calculator',
    'Stardew Valley profit calculator',
    'Stardew Valley Keg calculator',
    'Stardew Valley Jar calculator',
    'Stardew Valley best crops',
  ],
  alternates: {
    canonical: '/crop-profit-calculator/',
  },
  openGraph: {
    title: 'Stardew Valley Crop Profit Calculator 1.6.15',
    description: 'Seasonal crop profit calculators with seed cost, harvest count, Keg, Jar, Tiller, and Artisan math.',
    url: `${SITE_URL}/crop-profit-calculator/`,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley crop profit calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Crop Profit Calculator 1.6.15',
    description: 'Compare crop profit by season with verified formulas, Keg values, Jar values, and profession bonuses.',
  },
};

function getSeasonCrops(season) {
  const seasonName = season.charAt(0).toUpperCase() + season.slice(1);
  if (season === 'greenhouse') {
    return itemsData.items.filter((item) => item.category === 'Crops' && item.season?.length);
  }
  return itemsData.items.filter((item) => item.category === 'Crops' && item.season?.includes(seasonName));
}

function getHarvests(crop) {
  const growthTime = crop.growthTime || 0;
  if (!growthTime || growthTime > SEASON_DAYS) return 0;
  let harvests = 1;
  let day = growthTime + 1;
  if (crop.regrows && crop.regrowTime) {
    while (day + crop.regrowTime <= SEASON_DAYS) {
      day += crop.regrowTime;
      harvests += 1;
    }
  } else {
    while (day + growthTime <= SEASON_DAYS) {
      day += growthTime;
      harvests += 1;
    }
  }
  return harvests;
}

function getYield(crop) {
  return (crop.harvestYield || 1) + (crop.extraHarvestChance || 0) * (crop.extraHarvestYield || 1);
}

function getRawProfit(crop) {
  const harvests = getHarvests(crop);
  const yieldPerHarvest = getYield(crop);
  const totalYield = harvests * yieldPerHarvest;
  const plantings = crop.regrows ? 1 : harvests;
  const seedCost = (crop.seedPrice || 0) * plantings;
  const gross = totalYield * crop.basePrice;
  return {
    harvests,
    totalYield,
    seedCost,
    gross,
    net: gross - seedCost,
    goldPerDay: (gross - seedCost) / SEASON_DAYS,
  };
}

function topRawCrops(season) {
  return getSeasonCrops(season)
    .map((crop) => ({ crop, profit: getRawProfit(crop) }))
    .filter((row) => row.profit.harvests > 0)
    .sort((a, b) => b.profit.goldPerDay - a.profit.goldPerDay)
    .slice(0, 5);
}

function formatGold(value) {
  return `${Math.round(value).toLocaleString()}g`;
}

const seasonCards = [
  {
    title: 'Spring Crop Calculator',
    text: 'Plan Parsnip, Potato, Cauliflower, Strawberry, Rhubarb, Kale, and Spring Year 1 cash flow.',
    href: '/calculator/spring/',
  },
  {
    title: 'Summer Crop Calculator',
    text: 'Compare Blueberry, Starfruit, Hops, Melon, Coffee, and summer processing routes.',
    href: '/calculator/summer/',
  },
  {
    title: 'Fall Crop Calculator',
    text: 'Check Pumpkin, Cranberries, Grapes, Yam, Eggplant, and end-of-year machine priorities.',
    href: '/calculator/fall/',
  },
  {
    title: 'Winter Crop Calculator',
    text: 'Review Powdermelon planning and late-year crop math where winter planting is available.',
    href: '/calculator/winter/',
  },
  {
    title: 'Greenhouse Calculator',
    text: 'Model long-running Ancient Fruit, Starfruit, Pineapple, Hops, and Coffee setups.',
    href: '/calculator/greenhouse/',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Stardew Valley Crop Profit Calculator',
    url: `${SITE_URL}/crop-profit-calculator/`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    version: GAME_VERSION,
    dateModified: LAST_VERIFIED,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Crop profit calculator',
      'Seed cost calculation',
      'Harvest count calculation',
      'Keg and Preserves Jar comparison',
      'Tiller and Artisan profession support',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Crop Profit Calculator', item: `${SITE_URL}/crop-profit-calculator/` },
    ],
  },
];

function MiniTable({ season }) {
  const rows = topRawCrops(season);
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h3 className="font-bold text-slate-900">{season.charAt(0).toUpperCase() + season.slice(1)} raw crop baseline</h3>
        <p className="text-xs text-slate-500">Normal quality, no fertilizer, no profession bonus, seed cost included.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Crop</th>
              <th className="px-4 py-3 text-right">Harvests</th>
              <th className="px-4 py-3 text-right">Net</th>
              <th className="px-4 py-3 text-right">Gold/day</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ crop, profit }) => (
              <tr key={crop.slug} className="hover:bg-green-50/60">
                <td className="px-4 py-3">
                  <Link href={`/item/${crop.slug}/`} className="flex items-center gap-2 font-semibold text-slate-800 hover:text-green-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded border border-green-100 bg-green-50">
                      <GameImage slug={crop.slug} alt={crop.name} width={24} height={24} />
                    </span>
                    {crop.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">{profit.harvests}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(profit.net)}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(profit.goldPerDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CropProfitCalculatorPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-800">Crop Profit Calculator</span>
      </nav>

      <header className="mb-8 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6 md:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
          Updated {LAST_VERIFIED} | Stardew Valley {GAME_VERSION}
        </p>
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-5xl">Stardew Valley Crop Profit Calculator</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Choose a season calculator to compare crop profit with seed cost, harvest count, fertilizer, Tiller,
              Agriculturist, Keg output, Preserves Jar output, and Artisan values. This page explains the calculation
              model so the tool is useful for actual farm planning, not just a copied price table.
            </p>
          </div>
          <div className="rounded-xl border border-green-200 bg-white p-5 shadow-sm">
            <Calculator className="mb-4 text-green-700" size={32} />
            <div className="text-3xl font-black text-slate-950">{getSeasonCrops('greenhouse').length}</div>
            <p className="text-sm text-slate-600">crop entries available across seasonal and greenhouse calculators</p>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {seasonCards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md">
            <Sprout className="mb-4 text-green-700" size={24} />
            <h2 className="text-lg font-bold text-slate-950 group-hover:text-green-700">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            <div className="mt-4 inline-flex items-center text-sm font-bold text-green-700">
              Open calculator
              <ArrowRight className="ml-1" size={16} />
            </div>
          </Link>
        ))}
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        {[
          { icon: Leaf, title: 'Harvest model', text: 'Growth time, regrowth time, start day, and 28-day season length affect harvest count.' },
          { icon: FlaskConical, title: 'Processing model', text: 'Keg and Jar values use item-specific output formulas and processing availability.' },
          { icon: ShieldCheck, title: 'Profession model', text: 'Tiller, Agriculturist, and Artisan change final profit in different ways.' },
          { icon: Database, title: 'Data audit', text: `Prices are checked against Stardew Valley ${GAME_VERSION} data and formula tests.` },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <Icon className="mb-3 text-green-700" size={22} />
              <h2 className="font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-950">
          <Table2 className="text-green-700" size={24} />
          Baseline crop rankings before processing
        </h2>
        <p className="mb-6 max-w-3xl text-slate-700">
          These quick tables are intentionally simple: normal quality, no fertilizer, no profession, seed cost included,
          and one tile over a full 28-day season. Use the seasonal calculators for realistic farm-size planning with
          quality, Keg/Jar processing, profession toggles, and custom start days.
        </p>
        <div className="grid gap-5 lg:grid-cols-3">
          <MiniTable season="spring" />
          <MiniTable season="summer" />
          <MiniTable season="fall" />
        </div>
      </section>

      <section className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-2xl font-bold text-blue-950">What the calculator adds beyond a price list</h2>
          <p className="mb-4 text-blue-950">
            A crop with a high sell price is not always the best crop. Profit changes when seeds are expensive,
            harvest windows are short, regrowth repeats, or machines are the bottleneck. The calculator turns item data
            into a farm decision by subtracting input cost and comparing gold per day.
          </p>
          <ul className="space-y-2 text-sm text-blue-950">
            <li>Seed cost is counted per planting for non-regrowing crops.</li>
            <li>Regrowing crops buy seeds once, then repeat harvests by regrowth time.</li>
            <li>Fertilizer and profession toggles change expected sale values or growth time.</li>
            <li>Processing mode separates raw sale value from Keg and Preserves Jar routes.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-3 text-2xl font-bold text-amber-950">How to use it for real farms</h2>
          <p className="mb-4 text-amber-950">
            Start with the season page, set your plot count, choose the day you can plant, then compare raw crops first.
            After that, switch to Keg or Jar mode only for crops you can actually process. This avoids the common mistake
            of ranking every crop as if you had unlimited machines.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/guide/most-profitable-crops/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100">
              Crop rankings guide
            </Link>
            <Link href="/guide/keg-vs-jar/" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100">
              Keg vs Jar guide
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-slate-950">Formula notes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">Raw crop value</h3>
            <p className="mt-2 text-sm text-slate-600">
              Raw value starts with base sell price, then applies quality multipliers and Tiller when enabled.
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">Wine, Juice, Jelly, and Pickles</h3>
            <p className="mt-2 text-sm text-slate-600">
              Processing uses each item's Keg or Jar output. Artisan is applied to eligible finished goods.
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">Harvest count</h3>
            <p className="mt-2 text-sm text-slate-600">
              Harvest count uses growth time, regrowth time, selected start day, and remaining season days.
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">Why results may differ in-game</h3>
            <p className="mt-2 text-sm text-slate-600">
              Mixed quality harvests, missing machine capacity, late planting, and crop losses can change actual farm profit.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
