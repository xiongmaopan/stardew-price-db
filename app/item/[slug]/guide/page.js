import itemsData from '@/data/items.json';
import itemStrategies from '@/data/item-strategies.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return itemsData.items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const item = itemsData.items.find(i => i.slug === params.slug);
  const strategy = itemStrategies.strategies[params.slug];
  
  if (!item) {
    return { title: 'Item Guide Not Found' };
  }
  
  return {
    title: `${item.name} Farming Guide - Gold per Day & Strategy (Stardew Valley 1.6)`,
    description: `Complete ${item.name} guide for Stardew Valley 1.6. ${strategy ? `${strategy.goldPerDay}g/day. ${strategy.proTip.substring(0, 100)}...` : \`Base price: ${item.basePrice}g. Learn optimal farming strategy.\`}`,
    alternates: {
      canonical: `/item/${item.slug}/guide`,
    },
  };
}

function calculateGoldPerDay(item, strategy) {
  if (strategy?.goldPerDay) return strategy.goldPerDay;
  if (!item.growthTime) return null;
  const daily = item.basePrice / item.growthTime;
  return Math.round(daily * 100) / 100;
}

function getTierLabel(tier) {
  const labels = {
    'starter': 'Starter Crop',
    'mid': 'Mid-Tier Crop',
    'high': 'High-Value Crop',
    'premium': 'Premium Crop',
    'legendary': 'Legendary Profit',
  };
  return labels[tier] || tier;
}

function getSeasonEmoji(seasons) {
  const emojis = {
    'Spring': '🌸',
    'Summer': '☀️',
    'Fall': '🍂',
    'Winter': '❄️',
  };
  return seasons.map(s => emojis[s] || s).join(' ');
}

function formatNumber(num) {
  if (!num) return 'N/A';
  return num.toLocaleString();
}

export default function ItemGuidePage({ params }) {
  const item = itemsData.items.find(i => i.slug === params.slug);
  const strategy = itemStrategies.strategies[params.slug];
  
  if (!item) {
    notFound();
  }
  
  const goldPerDay = calculateGoldPerDay(item, strategy);
  const processingProfit = item.processing ? {
    keg: item.processing.kegPrice ? item.processing.kegPrice - item.basePrice : null,
    jar: item.processing.jarPrice ? item.processing.jarPrice - item.basePrice : null,
  } : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 min-h-[80vh]">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600 transition">Home</a>
        <span className="mx-2">/</span>
        <a href={`/?category=${encodeURIComponent(item.category)}`} className="hover:text-blue-600 transition">
          {item.category}
        </a>
        <span className="mx-2">/</span>
        <a href={`/item/${item.slug}/`} className="hover:text-blue-600 transition">{item.name}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Guide</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-slate-800">{item.name} Farming Guide</h1>
          {goldPerDay && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {goldPerDay}g/day
            </span>
          )}
        </div>
        
        <p className="text-lg text-slate-600 mb-4">
          {item.description || `Complete farming guide for ${item.name} in Stardew Valley 1.6.`}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-500 mb-1">Base Price</div>
            <div className="text-xl font-bold text-slate-800">{formatNumber(item.basePrice)}g</div>
          </div>
          {item.growthTime && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Growth Time</div>
              <div className="text-xl font-bold text-slate-800">{item.growthTime} days</div>
            </div>
          )}
          {item.season && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Season</div>
              <div className="text-xl font-bold text-slate-800">{getSeasonEmoji(item.season)}</div>
            </div>
          )}
          {strategy?.tier && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Tier</div>
              <div className="text-xl font-bold text-slate-800">{getTierLabel(strategy.tier)}</div>
            </div>
          )}
        </div>
      </header>

      {/* Strategy Section */}
      {strategy && (
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-900 mb-4">💡 Pro Strategy</h2>
          <p className="text-amber-800 mb-4">{strategy.proTip}</p>
          
          <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-slate-700 text-sm mb-2 uppercase tracking-wide">Expert Analysis</h3>
            <p className="text-slate-600">{strategy.strategyNote}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {goldPerDay && (
              <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                <span className="text-xs text-slate-500 block">Gold/Day</span>
                <span className="font-bold text-green-700">{goldPerDay}g</span>
              </div>
            )}
            <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
              <span className="text-xs text-slate-500 block">Recommendation</span>
              <span className="font-bold text-slate-700 capitalize">{strategy.recommendation?.replace('-', ' → ')}</span>
            </div>
            {strategy.tier && (
              <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                <span className="text-xs text-slate-500 block">Tier</span>
                <span className="font-bold capitalize text-purple-700">{strategy.tier}</span>
              </div>
            )}
            {strategy.bestUse && (
              <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                <span className="text-xs text-slate-500 block">Best Use</span>
                <span className="font-bold text-slate-700 text-sm">{strategy.bestUse}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Processing Options */}
      {item.processing && (
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">⚙️ Processing Options</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Keg Processing */}
            {item.processing.kegPrice && (
              <div className="border border-slate-200 rounded-lg p-4 bg-amber-50">
                <h3 className="font-bold text-amber-900 mb-1">Keg</h3>
                <div className="text-sm text-amber-700 mb-3">Product: {item.processing.kegProduct}</div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-xs text-slate-400">Output Price</span>
                    <span className="text-2xl font-bold text-amber-800">{formatNumber(item.processing.kegPrice)}g</span>
                  </div>
                  {processingProfit?.keg > 0 && (
                    <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      +{formatNumber(processingProfit.keg)}g profit
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Jar Processing */}
            {item.processing.jarPrice && (
              <div className="border border-slate-200 rounded-lg p-4 bg-green-50">
                <h3 className="font-bold text-green-900 mb-1">Preserves Jar</h3>
                <div className="text-sm text-green-700 mb-3">Product: {item.processing.jarProduct}</div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-xs text-slate-400">Output Price</span>
                    <span className="text-2xl font-bold text-green-800">{formatNumber(item.processing.jarPrice)}g</span>
                  </div>
                  {processingProfit?.jar > 0 && (
                    <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      +{formatNumber(processingProfit.jar)}g profit
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Processing Time Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>⏱️ Processing Time:</strong> 
              {item.processing.kegTime ? ` Keg: ${item.processing.kegTime} days` : ''}
              {item.processing.jarTime ? ` | Jar: ${item.processing.jarTime} days` : ''}
            </p>
          </div>
        </section>
      )}

      {/* Farming Details */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">🌱 Farming Details</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Basic Information</h3>
            <dl className="space-y-2">
              {item.category && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-700">{item.category}</dd>
                </div>
              )}
              {item.subcategory && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Subcategory</dt>
                  <dd className="font-medium text-slate-700">{item.subcategory}</dd>
                </div>
              )}
              {item.season && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Season</dt>
                  <dd className="font-medium text-slate-700">{getSeasonEmoji(item.season)} {item.season.join(', ')}</dd>
                </div>
              )}
              {item.seedPrice && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Seed Cost</dt>
                  <dd className="font-medium text-slate-700">{formatNumber(item.seedPrice)}g</dd>
                </div>
              )}
              {item.growthTime && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Growth Time</dt>
                  <dd className="font-medium text-slate-700">{item.growthTime} days</dd>
                </div>
              )}
              {item.regrows !== undefined && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Regrows</dt>
                  <dd className="font-medium text-slate-700">{item.regrows ? `Yes (${item.regrowTime} days)` : 'No'}</dd>
                </div>
              )}
              {item.seedSource && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Seed Source</dt>
                  <dd className="font-medium text-slate-700 text-right max-w-xs">{item.seedSource}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Sell Prices */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">💰 Sell Prices by Quality</h3>
            <table className="w-full">
              <thead>
                <tr className="text-sm text-slate-500 border-b border-slate-200">
                  <th className="text-left py-2">Quality</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2">Normal</td>
                  <td className="text-right font-medium">{formatNumber(item.basePrice)}g</td>
                  <td className="text-right text-slate-400">1.0x</td>
                </tr>
                <tr>
                  <td className="py-2">Silver</td>
                  <td className="text-right font-medium">{formatNumber(Math.floor(item.basePrice * 1.25))}g</td>
                  <td className="text-right text-slate-400">1.25x</td>
                </tr>
                <tr>
                  <td className="py-2">Gold</td>
                  <td className="text-right font-medium">{formatNumber(Math.floor(item.basePrice * 1.5))}g</td>
                  <td className="text-right text-slate-400">1.5x</td>
                </tr>
                <tr className="font-semibold bg-purple-50">
                  <td className="py-2 text-purple-700">Iridium</td>
                  <td className="text-right text-purple-700">{formatNumber(item.basePrice * 2)}g</td>
                  <td className="text-right text-purple-400">2.0x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">📋 Quick Tips</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-slate-700">
              {item.growthTime 
                ? `With ${item.growthTime} days growth time, you can get ${Math.floor(28/item.growthTime)} harvests in a standard ${28}-day season.`
                : `${item.name} is available year-round.`
              }
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-slate-700">
              {strategy?.recommendation === 'sell-raw' 
                ? `Selling raw is recommended - processing doesn't significantly improve ROI for this item.`
                : strategy?.recommendation === 'preserves-jar'
                ? `Preserves Jar is recommended - faster processing time with good profit margins.`
                : strategy?.recommendation === 'keg'
                ? `Keg processing is recommended for maximum profit from this item.`
                : `Consider processing options based on your available equipment and time.`
              }
            </span>
          </li>
          {item.extraHarvestChance && (
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-slate-700">
                This crop has a {item.extraHarvestChance * 100}% chance for extra harvest per yield.
              </span>
            </li>
          )}
          {item.isGiantCrop && (
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-slate-700">
                This crop can grow into a Giant Crop! Plant 3x3 grids for a chance at 9-15 harvests from one plant.
              </span>
            </li>
          )}
        </ul>
      </section>

      {/* Related Guide */}
      <section className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-700 mb-3">📚 Related Guides</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/guide/best-crops" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition">
            <div className="font-medium text-slate-700">Best Crops by Season</div>
            <div className="text-sm text-slate-500">Compare profits across seasons</div>
          </a>
          <a href="/guide/keg-vs-jar" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition">
            <div className="font-medium text-slate-700">Keg vs Preserves Jar</div>
            <div className="text-sm text-slate-500">Which processing method is best?</div>
          </a>
          <a href="/calculator/spring" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition">
            <div className="font-medium text-slate-700">Profit Calculator</div>
            <div className="text-sm text-slate-500">Calculate your farm profits</div>
          </a>
        </div>
      </section>

      {/* Last Updated */}
      <div className="mt-8 text-center text-sm text-slate-500">
        Last updated: {itemStrategies.lastUpdated || '2026-01-19'} | Stardew Valley {itemStrategies.version || '1.6'}
      </div>
    </main>
  );
}
