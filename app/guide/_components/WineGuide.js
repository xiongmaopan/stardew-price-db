import Link from 'next/link';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

function formatGold(value) {
  return `${Math.round(value).toLocaleString()}g`;
}

function artisanPrice(value) {
  return Math.floor((value * 14) / 10);
}

export default function WineGuide({
  slug,
  title,
  description,
  quickAnswer,
  bestFor,
  compareHref = '/guide/ancient-fruit-vs-starfruit/',
}) {
  const item = itemsData.items.find((entry) => entry.slug === slug);
  const wine = item.processing.kegPrice;
  const artisanWine = artisanPrice(wine);
  const iridiumWine = wine * 2;
  const artisanIridiumWine = artisanPrice(iridiumWine);
  const dateModified = verificationData.lastVerified.split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-05-19',
    dateModified,
    author: { '@type': 'Organization', name: 'StardewPriceDB' },
    publisher: { '@type': 'Organization', name: 'StardewPriceDB' },
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{title}</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700 mb-3">
          Stardew Valley {verificationData.gameVersion} wine guide
        </p>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{title}</h1>
        <p className="text-xl text-slate-600 max-w-3xl">{description}</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:col-span-2">
          <h2 className="font-bold text-amber-950 mb-2">Quick answer</h2>
          <p className="text-amber-900">{quickAnswer}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-950 mb-2">Best for</h2>
          <p className="text-blue-900">{bestFor}</p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">{item.name} Wine values</h2>
          <p className="text-slate-600 mt-2">Keg time is {item.processing.kegTime} days. Cask aging doubles normal Wine value at Iridium quality.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Output</th>
                <th className="px-4 py-3 text-right">Value</th>
                <th className="px-4 py-3">When to use it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Raw crop', item.basePrice, 'Temporary cash flow before Kegs are ready.'],
                [`${item.name} Wine`, wine, 'Standard Keg output before profession bonus.'],
                [`${item.name} Wine with Artisan`, artisanWine, 'The normal endgame selling value.'],
                [`Iridium ${item.name} Wine`, iridiumWine, 'Aged in Casks, without Artisan.'],
                [`Iridium ${item.name} Wine with Artisan`, artisanIridiumWine, 'Maximum per-bottle value.'],
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
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Best setup</h2>
          <p className="text-slate-700">
            Grow {item.name}, run it through Kegs, take Artisan at Farming 10, and reserve Cask space for the bottles
            you want to age. Sell the rest as Artisan Wine to keep cash moving.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Common mistake</h2>
          <p className="text-slate-700">
            Do not wait to age every bottle. Casks are limited, so aging everything can slow cash flow. Use Casks for
            premium bottles and sell normal Artisan Wine regularly.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Related guides</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: `/item/${item.slug}/`, label: `${item.name} price page` },
            { href: compareHref, label: 'Ancient Fruit vs Starfruit' },
            { href: '/guide/best-keg-items/', label: 'Best Keg items' },
            { href: '/guide/best-greenhouse-crops/', label: 'Best Greenhouse crops' },
            { href: '/guide/keg-vs-jar/', label: 'Keg vs Jar math' },
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
