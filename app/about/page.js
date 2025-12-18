import Link from 'next/link';

export const metadata = {
  title: 'About - StardewPriceDB | How We Calculate Prices',
  description: 'How StardewPriceDB calculates Stardew Valley prices, our data sources, and update methodology.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">About</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-slate-800 mb-6">
        About StardewPriceDB
      </h1>
      
      <p className="text-xl text-slate-600 mb-8">
        Price calculations and profit optimization for Stardew Valley 1.6.
      </p>

      <div className="bg-white rounded-xl border p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">How Prices Are Calculated</h2>
        <div className="space-y-4 text-slate-700">
          <p>
            All base prices come directly from Stardew Valley 1.6 game data, cross-referenced with the official Stardew Valley Wiki.
          </p>
          <p>
            Profession bonuses use the exact multipliers from the game: Tiller adds 10% to crop sell prices, Artisan adds 40% to artisan goods, and Angler adds 25% to fish.
          </p>
          <p>
            Quality multipliers: Silver = 1.25x, Gold = 1.5x, Iridium = 2x. These stack with profession bonuses.
          </p>
          <p>
            Processing times: Kegs take variable time depending on the item (wine = 7 days, juice = 4 days, etc.). Preserves Jars always take 3 days. Gold-per-day calculations factor this in.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Data Sources</h2>
        <ul className="space-y-2 text-slate-700">
          <li>• Game files (Content/Data folder)</li>
          <li>• <a href="https://stardewvalleywiki.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Stardew Valley Wiki</a></li>
          <li>• In-game testing for edge cases</li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Last data verification: December 2025 (Stardew Valley 1.6)
        </p>
      </div>

      <div className="bg-white rounded-xl border p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact</h2>
        <p className="text-slate-600 mb-2">
          Found an error? Have a suggestion?
        </p>
        <p className="text-slate-700">
          Email: <a href="mailto:contact@stardewpricedb.com" className="text-blue-600 hover:underline">contact@stardewpricedb.com</a>
        </p>
      </div>
    </main>
  );
}
