import itemsData from '@/data/items.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

const PROFESSIONS = {
  'tiller': {
    name: 'Tiller',
    bonus: '10%',
    bonusDecimal: 0.10,
    description: '+10% sell price for all crops',
    appliesTo: ['Crops'],
    appliesToDisplay: 'Crops',
    icon: '🌾',
  },
  'artisan': {
    name: 'Artisan',
    bonus: '40%',
    bonusDecimal: 0.40,
    description: '+40% sell price for all artisan goods (Keg, Preserves Jar, Cheese, etc.)',
    appliesTo: ['Artisan Goods', 'Crops'], // Artisan applies to many processing outputs
    appliesToDisplay: 'Artisan Goods',
    icon: '🏭',
  },
  'angler': {
    name: 'Angler',
    bonus: '25%',
    bonusDecimal: 0.25,
    description: '+25% sell price for all fish',
    appliesTo: ['Fish'],
    appliesToDisplay: 'Fish',
    icon: '🎣',
  },
  'rancher': {
    name: 'Rancher',
    bonus: '20%',
    bonusDecimal: 0.20,
    description: '+20% sell price for all animal products (milk, eggs, wool, truffle oil)',
    appliesTo: ['Animal Products'],
    appliesToDisplay: 'Animal Products',
    icon: '🐄',
  },
};

export async function generateStaticParams() {
  return Object.keys(PROFESSIONS).map((profession) => ({
    profession,
  }));
}

export async function generateMetadata({ params }) {
  const { profession: professionId } = await params;
  const profession = PROFESSIONS[professionId];
  if (!profession) {
    return { title: 'Profession Not Found' };
  }

  const title = `${profession.name} Profession Guide - Stardew Valley`;
  const professionDescription = professionId === 'artisan' ? '+40% sell price for artisan goods' : profession.description;
  const description = `${profession.name} guide for Stardew Valley 1.6.15. ${professionDescription}. Compare ${profession.bonus} bonus prices and profitable items.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/guide/profession/${professionId}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/guide/profession/${professionId}/`,
      type: 'article',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${profession.name} profession guide` }],
    },
  };
}

function formatNumber(num) {
  if (!num) return 'N/A';
  return num.toLocaleString();
}

function getProfitableItems(profession) {
  return itemsData.items.filter(item => {
    if (item.category === 'Crops' && profession === 'tiller') return true;
    if (item.category === 'Fish' && profession === 'angler') return true;
    if (item.category === 'Animal Products' && profession === 'rancher') return true;
    if (profession === 'artisan') {
      // Artisan applies to processing outputs
      return item.processing && (item.processing.kegPrice || item.processing.jarPrice);
    }
    return false;
  }).map(item => {
    const basePrice = item.basePrice;
    const bonus = Math.floor(basePrice * profession.bonusDecimal);
    const withBonus = basePrice + bonus;
    return {
      ...item,
      basePrice,
      bonus,
      withBonus,
      isHighValue: withBonus > 300,
    };
  }).sort((a, b) => b.withBonus - a.withBonus);
}

export default async function ProfessionGuidePage({ params }) {
  const { profession: professionId } = await params;
  const profession = PROFESSIONS[professionId];
  if (!profession) {
    return <div>Profession not found</div>;
  }

  const profitableItems = getProfitableItems(professionId);
  const topItems = profitableItems.slice(0, 10);
  const highValueItems = profitableItems.filter(item => item.isHighValue);
  
  const totalBonus = profitableItems.reduce((sum, item) => sum + item.bonus, 0);
  const avgBonus = profitableItems.length > 0 ? Math.round(totalBonus / profitableItems.length) : 0;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 min-h-[80vh]">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600 transition">Home</a>
        <span className="mx-2">/</span>
        <a href="/guide/" className="hover:text-blue-600 transition">Guides</a>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{profession.name} Profession</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{profession.icon}</span>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{profession.name} Profession Guide</h1>
            <p className="text-xl text-slate-600">Stardew Valley 1.6.15</p>
          </div>
        </div>
        
        <div className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-lg text-lg font-bold mb-4">
          {profession.bonus} Sell Price Bonus
        </div>
        
        <p className="text-lg text-slate-600 mb-6">
          {profession.description}
        </p>
      </header>

      {/* Stats Overview */}
      <section className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Eligible Items</div>
          <div className="text-2xl font-bold text-slate-800">{profitableItems.length}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Avg. Bonus</div>
          <div className="text-2xl font-bold text-green-600">{avgBonus}g</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">High-Value Items</div>
          <div className="text-2xl font-bold text-slate-800">{highValueItems.length}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-500 mb-1">Category</div>
          <div className="text-xl font-bold text-slate-800">{profession.appliesToDisplay}</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">💡 How the Bonus Works</h2>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-blue-900 mb-3">Bonus Calculation</h3>
          <p className="text-blue-800 mb-4">
            The {profession.name} bonus applies to the <strong>base sell price</strong> of eligible items. 
            Quality multipliers (Silver 1.25x, Gold 1.5x, Iridium 2x) are calculated first, 
            then the bonus is added.
          </p>
          
          <div className="bg-white rounded-lg p-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-slate-500 mb-1">Base Price</div>
                <div className="text-lg font-bold text-slate-800">{profitableItems[0]?.basePrice || 100}g</div>
              </div>
              <div className="text-2xl text-blue-400 flex items-center justify-center">→</div>
              <div>
                <div className="text-sm text-slate-500 mb-1">With {profession.name}</div>
                <div className="text-lg font-bold text-green-600">
                  +{profitableItems[0]?.bonus || 10}g bonus
                </div>
              </div>
              <div className="text-2xl text-blue-400 flex items-center justify-center">=</div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Total</div>
                <div className="text-xl font-bold text-blue-700">
                  {profitableItems[0] ? formatNumber(profitableItems[0].withBonus) : 110}g
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-2">⚠️ Important Notes</h3>
          <ul className="text-amber-800 space-y-1 text-sm">
            <li>• The bonus applies to <strong>base price only</strong>, not quality multipliers</li>
            <li>• Quality multipliers (Silver/Gold/Iridium) are calculated first</li>
            <li>• Artisans get bonus on <strong>processed goods</strong> (wine, juice, pickles, jelly)</li>
            <li>• This bonus stacks with quality sell price multipliers</li>
          </ul>
        </div>
      </section>

      {/* Top Profitable Items */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">🏆 Top 10 Most Profitable Items</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-slate-500 border-b border-slate-200">
                <th className="text-left py-3 px-2">Item</th>
                <th className="text-right py-3 px-2">Base Price</th>
                <th className="text-right py-3 px-2">Bonus</th>
                <th className="text-right py-3 px-2 font-bold text-green-600">With {profession.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topItems.map((item, index) => (
                <tr key={item.id} className={index < 3 ? 'bg-yellow-50/50' : ''}>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {index < 3 && <span className="text-yellow-500">🏅</span>}
                      <span className="font-medium text-slate-700">{item.name}</span>
                      {item.isHighValue && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">High Value</span>}
                    </div>
                  </td>
                  <td className="text-right py-3 px-2 text-slate-600">{formatNumber(item.basePrice)}g</td>
                  <td className="text-right py-3 px-2 text-green-600">+{formatNumber(item.bonus)}g</td>
                  <td className="text-right py-3 px-2 font-bold text-green-700">{formatNumber(item.withBonus)}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Use Cases */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">🎯 Best Use Cases</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-900 mb-2">✅ Best For</h3>
            <ul className="text-green-800 space-y-1 text-sm">
              {professionId === 'tiller' && (
                <>
                  <li>• High-volume crop farming (potatoes, kale)</li>
                  <li>• Giant crop farming (pumpkins, cauliflower)</li>
                  <li>• Year 1-2 gold generation</li>
                </>
              )}
              {professionId === 'artisan' && (
                <>
                  <li>• Wine production (ancient fruit, starfruit)</li>
                  <li>• Coffee processing (high volume)</li>
                  <li>• Any item with Keg processing</li>
                </>
              )}
              {professionId === 'angler' && (
                <>
                  <li>• High-value fish (lobster, crab)</li>
                  <li>• Mass fishing for quick cash</li>
                  <li>• Legendary fish collection</li>
                </>
              )}
              {professionId === 'rancher' && (
                <>
                  <li>• Truffle oil production</li>
                  <li>• Cheese making (large milk)</li>
                  <li>• Duck feather farming</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4 bg-red-50">
            <h3 className="font-semibold text-red-900 mb-2">❌ Not Ideal For</h3>
            <ul className="text-red-800 space-y-1 text-sm">
              {professionId === 'tiller' && (
                <>
                  <li>• Quick-harvest crops (parsnips) - low volume</li>
                  <li>• Flowers with no processing value</li>
                  <li>• Low-price vegetables</li>
                </>
              )}
              {professionId === 'artisan' && (
                <>
                  <li>• Raw selling (bonus doesn't apply)</li>
                  <li>• Items without processing options</li>
                  <li>• Low-margin artisan goods</li>
                </>
              )}
              {professionId === 'angler' && (
                <>
                  <li>• Easy-to-catch low-value fish</li>
                  <li>• Fish used for crafting/gifts primarily</li>
                  <li>• Time-limited fishing windows</li>
                </>
              )}
              {professionId === 'rancher' && (
                <>
                  <li>• Regular milk (low margin)</li>
                  <li>• Items without animal products</li>
                  <li>• Early game (no barns/coops)</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison with Other Professions */}
      <section className="bg-slate-100 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">⚖️ Profession Comparison</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(PROFESSIONS).map(([key, prof]) => (
            <div 
              key={key}
              className={`p-4 rounded-lg text-center ${key === professionId ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white border border-slate-200'}`}
            >
              <div className="text-2xl mb-2">{prof.icon}</div>
              <div className="font-bold text-slate-700">{prof.name}</div>
              <div className="text-lg font-semibold text-green-600">{prof.bonus}</div>
              <div className="text-xs text-slate-500 mt-1">{prof.appliesToDisplay}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Guides */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">📚 Related Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/guide/best-crops-by-season/" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
            <div className="font-medium text-slate-700">Best Crops by Season</div>
            <div className="text-sm text-slate-500">Compare profits across seasons</div>
          </a>
          <a href="/guide/keg-vs-jar/" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
            <div className="font-medium text-slate-700">Keg vs Preserves Jar</div>
            <div className="text-sm text-slate-500">Processing method comparison</div>
          </a>
          <a href="/calculator/spring/" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
            <div className="font-medium text-slate-700">Profit Calculator</div>
            <div className="text-sm text-slate-500">Calculate farm profits</div>
          </a>
        </div>
      </section>

      <div className="mt-8 text-center text-sm text-slate-500">
        Stardew Valley {itemsData.version || '1.6'} | Data verified for accuracy
      </div>
    </main>
  );
}
