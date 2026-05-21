import Link from 'next/link';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Caviar Guide - Stardew Valley Sturgeon Pond Profit',
  description: 'Caviar guide for Stardew Valley: how to make Caviar from Sturgeon Roe, value with Artisan, Fish Pond setup, Missing Bundle use, and profit strategy.',
  alternates: {
    canonical: '/guide/caviar/',
  },
  openGraph: {
    title: 'Caviar Guide - Stardew Valley',
    description: 'How to make Caviar from Sturgeon Roe, Fish Pond setup, Artisan value, Missing Bundle use, and profit strategy.',
    url: `${SITE_URL}/guide/caviar/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley Caviar guide' }],
  },
};

const CAVIAR_VALUE = 500;
const ARTISAN_VALUE = 700;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Caviar Guide in Stardew Valley',
  description: 'How to make and use Caviar from Sturgeon Fish Ponds.',
  datePublished: '2026-05-19',
  dateModified: verificationData.lastVerified.split('T')[0],
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
  publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  mainEntityOfPage: 'https://stardewpricedb.com/guide/caviar/',
};

export default function CaviarPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Caviar</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
          Stardew Valley {verificationData.gameVersion} fish pond guide
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Caviar Guide</h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Caviar is made by placing Sturgeon Roe in a Preserves Jar. It matters for profit, passive Fish Pond income,
          and the Missing Bundle.
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-950 mb-3">Quick answer</h2>
        <p className="text-blue-900">
          Build a Fish Pond, add Sturgeon, collect Sturgeon Roe, then process the Roe in a Preserves Jar. Caviar sells
          for {CAVIAR_VALUE}g, or {ARTISAN_VALUE}g with Artisan.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">How to make Caviar</h2>
        <ol className="space-y-4 text-slate-700">
          <li><strong>1. Catch Sturgeon.</strong> Sturgeon are caught at the Mountain Lake in Summer and Winter.</li>
          <li><strong>2. Put Sturgeon in a Fish Pond.</strong> Complete pond requests to grow the population.</li>
          <li><strong>3. Collect Sturgeon Roe.</strong> Higher population improves pond output consistency.</li>
          <li><strong>4. Use a Preserves Jar.</strong> Sturgeon Roe becomes Caviar instead of normal Aged Roe.</li>
        </ol>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Sell value</h2>
          <p className="text-3xl font-black text-green-700">{CAVIAR_VALUE}g</p>
          <p className="text-sm text-slate-500 mt-1">Base Caviar price</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">With Artisan</h2>
          <p className="text-3xl font-black text-green-700">{ARTISAN_VALUE}g</p>
          <p className="text-sm text-slate-500 mt-1">+40% artisan goods bonus</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-800 mb-2">Main use</h2>
          <p className="text-slate-700">Profit plus Missing Bundle completion.</p>
        </div>
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related guides</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/item/caviar/', label: 'Caviar price page' },
            { href: '/fishing/sturgeon/', label: 'Sturgeon fishing guide' },
            { href: '/guide/best-fish-pond/', label: 'Best Fish Pond choices' },
            { href: '/guide/best-preserves-jar-items/', label: 'Best Jar items' },
            { href: '/bundles/', label: 'Bundle guide' },
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
