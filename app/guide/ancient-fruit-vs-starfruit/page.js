import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Ancient Fruit vs Starfruit - Stardew Valley Profit Comparison',
  description: 'Ancient Fruit vs Starfruit in Stardew Valley: compare Wine value, Artisan prices, Cask value, Greenhouse strategy, seed cost, and best use cases.',
  alternates: {
    canonical: '/guide/ancient-fruit-vs-starfruit/',
  },
  openGraph: {
    title: 'Ancient Fruit vs Starfruit',
    description: 'Compare Stardew Valley Wine value, seed cost, Casks, Greenhouse strategy, and best use cases.',
    url: `${SITE_URL}/guide/ancient-fruit-vs-starfruit/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Ancient Fruit vs Starfruit guide' }],
  },
};

const ancientFruit = itemsData.items.find((item) => item.slug === 'ancient-fruit');
const starfruit = itemsData.items.find((item) => item.slug === 'starfruit');
function formatGold(value) {
  return `${Math.round(value).toLocaleString()}g`;
}

function artisanPrice(value) {
  return Math.floor((value * 14) / 10);
}

function wineStats(item) {
  const wine = item.processing.kegPrice;
  const artisanWine = artisanPrice(wine);
  const iridiumWine = wine * 2;
  const artisanIridiumWine = artisanPrice(iridiumWine);

  return {
    raw: item.basePrice,
    seed: item.seedPrice || 0,
    wine,
    artisanWine,
    iridiumWine,
    artisanIridiumWine,
    growth: item.growthTime,
    regrow: item.regrows ? item.regrowTime : null,
  };
}

const ancient = wineStats(ancientFruit);
const star = wineStats(starfruit);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ancient Fruit vs Starfruit in Stardew Valley',
  description: 'A practical comparison of Ancient Fruit and Starfruit for Greenhouse, Keg, Wine, and Cask strategies.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/ancient-fruit-vs-starfruit/',
};

export default function AncientFruitVsStarfruitPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Ancient Fruit vs Starfruit</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-700 mb-3">
          Stardew Valley {verificationData.gameVersion} profit comparison
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
          Ancient Fruit vs Starfruit: Which Is Better?
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Ancient Fruit is usually better for low-maintenance Greenhouse farming. Starfruit is better when you want the
          highest Wine value per bottle and are willing to buy seeds and replant.
        </p>
      </header>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-green-950 mb-3">Quick answer</h2>
        <p className="text-green-900">
          Choose Ancient Fruit for a permanent Greenhouse or Ginger Island setup. Choose Starfruit if you have Oasis
          access, enough cash for seeds, and a Cask plan for high-value Wine. In most mature farms, Ancient Fruit fills
          the Greenhouse while Starfruit is grown when you want premium bottles for aging.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Profit comparison</h2>
          <p className="text-slate-600 mt-2">Artisan values include the +40% Artisan profession bonus.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Metric</th>
                <th className="px-4 py-3 text-right">Ancient Fruit</th>
                <th className="px-4 py-3 text-right">Starfruit</th>
                <th className="px-4 py-3">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Raw sell price', formatGold(ancient.raw), formatGold(star.raw), 'Starfruit'],
                ['Seed cost', formatGold(ancient.seed), formatGold(star.seed), 'Ancient Fruit'],
                ['Growth pattern', `28 days, then every ${ancient.regrow} days`, `${star.growth} days, replant`, 'Ancient Fruit'],
                ['Wine value', formatGold(ancient.wine), formatGold(star.wine), 'Starfruit'],
                ['Wine with Artisan', formatGold(ancient.artisanWine), formatGold(star.artisanWine), 'Starfruit'],
                ['Iridium Wine with Artisan', formatGold(ancient.artisanIridiumWine), formatGold(star.artisanIridiumWine), 'Starfruit'],
                ['Maintenance', 'Harvest weekly, no replanting', 'Buy seeds and replant', 'Ancient Fruit'],
              ].map(([metric, ancientValue, starValue, winner]) => (
                <tr key={metric} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{metric}</td>
                  <td className="px-4 py-3 text-right">{ancientValue}</td>
                  <td className="px-4 py-3 text-right">{starValue}</td>
                  <td className="px-4 py-3 font-semibold text-blue-700">{winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Choose Ancient Fruit when...</h2>
          <ul className="space-y-3 text-slate-700">
            <li>You want a permanent Greenhouse crop with no seed buying.</li>
            <li>Your Keg network can process a steady weekly harvest.</li>
            <li>You value lower attention and stable long-term income.</li>
            <li>You are filling Ginger Island with repeat harvest crops.</li>
          </ul>
          <Link href="/item/ancient-fruit/" className="inline-block mt-5 text-blue-700 font-medium hover:underline">
            See Ancient Fruit prices
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Choose Starfruit when...</h2>
          <ul className="space-y-3 text-slate-700">
            <li>You have Oasis access and enough cash for 400g seeds.</li>
            <li>You want the highest-value Wine bottles for Casks.</li>
            <li>You are optimizing per-bottle value over convenience.</li>
            <li>You can support frequent replanting and Keg scheduling.</li>
          </ul>
          <Link href="/item/starfruit/" className="inline-block mt-5 text-blue-700 font-medium hover:underline">
            See Starfruit prices
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Best practical setup</h2>
        <p className="text-slate-700 mb-5">
          The strongest practical setup is not one crop only. Fill your protected space with Ancient Fruit for weekly
          Wine production, then grow Starfruit when you want premium Wine to age in Casks. This gives you stable income
          and high-value aging targets.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/guide/best-greenhouse-crops/', label: 'Best Greenhouse crops' },
            { href: '/guide/ancient-fruit/', label: 'Ancient Fruit guide' },
            { href: '/guide/keg-vs-jar/', label: 'Keg vs Jar math' },
            { href: '/guide/best-keg-items/', label: 'Best Keg items' },
            { href: '/calculator/greenhouse/', label: 'Greenhouse calculator' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
