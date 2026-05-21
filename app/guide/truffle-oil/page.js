import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Truffle Oil Guide - Stardew Valley Pig Profit and Artisan Value',
  description: 'Truffle Oil profit guide for Stardew Valley: compare raw Truffle, Iridium Truffle, Truffle Oil, Artisan value, Pig setup, and Oil Maker timing.',
  alternates: {
    canonical: '/guide/truffle-oil/',
  },
  openGraph: {
    title: 'Truffle Oil Guide - Stardew Valley',
    description: 'Compare raw Truffle, Iridium Truffle, Truffle Oil, Artisan value, Pig setup, and Oil Maker timing.',
    url: `${SITE_URL}/guide/truffle-oil/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley Truffle Oil guide' }],
  },
};

const truffle = itemsData.items.find((item) => item.slug === 'truffle');
const oil = itemsData.items.find((item) => item.slug === 'truffle-oil');
const oilArtisan = Math.floor((oil.basePrice * 14) / 10);
const iridiumTruffle = truffle.basePrice * 2;

function formatGold(value) {
  return `${Math.round(value).toLocaleString()}g`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Truffle Oil Guide in Stardew Valley',
  description: 'A practical Truffle Oil profit guide for pig farms and Artisan setups.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/truffle-oil/',
};

export default function TruffleOilPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Truffle Oil</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-700 mb-3">
          Stardew Valley {verificationData.gameVersion} animal profit guide
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Truffle Oil Guide</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Truffle Oil is the main reason pigs become one of the strongest animal profit routes. The key question is
          whether to sell raw Truffles or process them with Oil Makers.
        </p>
      </header>

      <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-orange-950 mb-3">Quick answer</h2>
        <p className="text-orange-900">
          With Artisan, Truffle Oil sells for {formatGold(oilArtisan)}, which beats a normal Truffle. If you have
          Botanist and collect Iridium Truffles, raw Iridium Truffles at {formatGold(iridiumTruffle)} are close enough
          that Oil Maker capacity and convenience matter.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Truffle vs Truffle Oil</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Option</th>
                <th className="px-4 py-3 text-right">Value</th>
                <th className="px-4 py-3">Best use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Normal Truffle', truffle.basePrice, 'Sell only when you need immediate cash or lack Oil Makers.'],
                ['Iridium Truffle', iridiumTruffle, 'Strong with Botanist because every forage item is Iridium quality.'],
                ['Truffle Oil', oil.basePrice, 'Good processed value without Artisan.'],
                ['Truffle Oil with Artisan', oilArtisan, 'Best default profit path for most pig farms.'],
              ].map(([label, value, note]) => (
                <tr key={label} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{label}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{formatGold(value)}</td>
                  <td className="px-4 py-3 text-slate-600">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Scale pigs when...</h2>
          <p className="text-slate-700">
            You have Deluxe Barns, happy pigs, outdoor space, and enough Oil Makers to avoid a processing backlog.
            Pigs do not find Truffles in winter or rainy weather, so judge them across the full year.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Avoid this mistake</h2>
          <p className="text-slate-700">
            Do not compare pigs by winter output only. Their profit comes from strong Spring, Summer, and Fall outdoor
            days, especially when Oil Maker processing keeps up.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related guides</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/item/truffle/', label: 'Truffle price page' },
            { href: '/item/truffle-oil/', label: 'Truffle Oil price page' },
            { href: '/guide/animal-profit/', label: 'Animal profit guide' },
            { href: '/guide/profession/artisan/', label: 'Artisan profession' },
            { href: '/guide/profession/rancher/', label: 'Rancher profession' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
