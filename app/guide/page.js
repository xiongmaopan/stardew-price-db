import Link from 'next/link';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Stardew Valley Guides - Profit Strategies & Money Making Tips',
  description: 'Stardew Valley guides for crop profit, Keg vs Jar math, Ancient Fruit, Fish Ponds, gifts, bundles, and Year 1 money.',
  alternates: {
    canonical: '/guide/',
  },
  openGraph: {
    title: 'Stardew Valley Guides',
    description: 'Profit strategy guides for Stardew Valley crops, artisan goods, fish ponds, gifts, and bundles.',
    url: `${SITE_URL}/guide/`,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Stardew Valley guides' }],
  },
};

const guides = [
  {
    slug: 'most-profitable-crops',
    title: 'Most Profitable Crops by Season',
    description: 'Complete profit analysis for every season including growth time, processing value, and gold-per-day calculations.',
    category: 'Farming',
    readTime: '8 min',
  },
  {
    slug: 'best-crops-by-season',
    title: 'Best Crops by Season',
    description: 'Practical crop picks for Spring, Summer, Fall, Greenhouse, and machine-based farming plans.',
    category: 'Farming',
    readTime: '9 min',
  },
  {
    slug: 'best-spring-crops',
    title: 'Best Spring Crops',
    description: 'Spring crop rankings for early cash flow, Strawberry planning, Rhubarb, and Ancient Fruit setup.',
    category: 'Farming',
    readTime: '7 min',
  },
  {
    slug: 'best-summer-crops',
    title: 'Best Summer Crops',
    description: 'Compare Blueberry, Starfruit, Hops, Melon, Coffee, and summer processing options.',
    category: 'Farming',
    readTime: '7 min',
  },
  {
    slug: 'best-fall-crops',
    title: 'Best Fall Crops',
    description: 'Fall crop rankings for Pumpkin, Cranberries, Fairy Rose Honey support, and bundle needs.',
    category: 'Farming',
    readTime: '7 min',
  },
  {
    slug: 'best-greenhouse-crops',
    title: 'Best Greenhouse Crops',
    description: 'Long-term Greenhouse rankings for Ancient Fruit, Starfruit, Pineapple, Hops, and Coffee.',
    category: 'Farming',
    readTime: '8 min',
  },
  {
    slug: 'ancient-fruit-vs-starfruit',
    title: 'Ancient Fruit vs Starfruit',
    description: 'Side-by-side comparison for Wine value, seed cost, Casks, Greenhouse use, and maintenance.',
    category: 'Farming',
    readTime: '8 min',
  },
  {
    slug: 'ancient-fruit-wine',
    title: 'Ancient Fruit Wine Guide',
    description: 'Ancient Fruit Wine values, Artisan price, Iridium Cask value, and weekly Greenhouse strategy.',
    category: 'Processing',
    readTime: '7 min',
  },
  {
    slug: 'starfruit-wine',
    title: 'Starfruit Wine Guide',
    description: 'Starfruit Wine value, Artisan and Cask math, seed cost, and premium Wine strategy.',
    category: 'Processing',
    readTime: '7 min',
  },
  {
    slug: 'truffle-oil',
    title: 'Truffle Oil Guide',
    description: 'Compare raw Truffles, Iridium Truffles, Truffle Oil, Artisan value, and pig farm scaling.',
    category: 'Animals',
    readTime: '7 min',
  },
  {
    slug: 'caviar',
    title: 'Caviar Guide',
    description: 'How to make Caviar from Sturgeon Roe, Fish Pond setup, Artisan value, and bundle use.',
    category: 'Fishing',
    readTime: '6 min',
  },
  {
    slug: 'how-to-fish',
    title: 'How to Fish in Stardew Valley',
    description: 'Beginner fishing mechanics, rods, bait, tackle, starter fish, leveling, and hard catch prep.',
    category: 'Fishing',
    readTime: '8 min',
  },
  {
    slug: 'legendary-fish',
    title: 'Legendary Fish Guide',
    description: 'Exact locations, seasons, weather, fishing level requirements, difficulty, and sell prices.',
    category: 'Fishing',
    readTime: '8 min',
  },
  {
    slug: 'best-fish-by-season',
    title: 'Best Fish by Season',
    description: 'High-value fish for Spring, Summer, Fall, and Winter with locations, time windows, and difficulty.',
    category: 'Fishing',
    readTime: '8 min',
  },
  {
    slug: 'best-keg-items',
    title: 'Best Keg Items',
    description: 'Ranked Keg items with Wine, Juice, Pale Ale, Coffee, Artisan values, and gold per Keg day.',
    category: 'Processing',
    readTime: '8 min',
  },
  {
    slug: 'best-preserves-jar-items',
    title: 'Best Preserves Jar Items',
    description: 'Jelly, Pickles, Roe, Caviar, and Jar profit rankings for fast processing setups.',
    category: 'Processing',
    readTime: '8 min',
  },
  {
    slug: 'keg-vs-jar',
    title: 'Keg vs Preserves Jar: Complete Analysis',
    description: 'When to use Kegs, when to use Jars, and the math behind gold-per-day optimization.',
    category: 'Processing',
    readTime: '10 min',
  },
  {
    slug: 'ancient-fruit',
    title: 'Ancient Fruit: The Ultimate Money Guide',
    description: 'From first seed to full greenhouse operation. Complete Ancient Fruit strategy with numbers.',
    category: 'Endgame',
    readTime: '12 min',
  },
  {
    slug: 'greenhouse-layout',
    title: 'Greenhouse Layout: Sprinklers, Crops, and Trees',
    description: 'Optimal setup for 120 tiles. Sprinkler patterns, fruit tree placement, and 4M+ yearly income.',
    category: 'Farming',
    readTime: '9 min',
  },
  {
    slug: 'animal-profit',
    title: 'Animal Profit Guide: Barns and Coops',
    description: 'ROI breakdown for every animal. Pigs vs Cows vs Chickens—which makes the most gold?',
    category: 'Animals',
    readTime: '11 min',
  },
  {
    slug: 'mining-profit',
    title: 'Mining Profit Guide: Gems and Crystalariums',
    description: 'Best gems to sell, Crystalarium optimization, and Skull Cavern profit runs.',
    category: 'Mining',
    readTime: '10 min',
  },
  {
    slug: 'best-weapons',
    title: 'Best Weapons Ranked',
    description: 'Top endgame weapons for Stardew Valley 1.6.15: Dragontooth Club, Infinity Blade, and Iridium Needle with Forge builds.',
    category: 'Combat',
    readTime: '11 min',
  },
  {
    slug: 'best-fish-pond',
    title: 'Best Fish Pond Choices for Profit',
    description: 'Which fish to put in ponds, expected roe income, and Caviar vs Aged Roe comparison.',
    category: 'Fishing',
    readTime: '7 min',
  },
  {
    slug: 'year-1-beginner-walkthrough',
    title: 'Year 1 Beginner Walkthrough',
    description: 'Season-by-season first year route with corrected crop values, tool upgrades, bundles, animals, mining, and winter prep.',
    category: 'Beginner',
    readTime: '16 min',
  },
  {
    slug: 'first-8-days-checklist',
    title: 'First 8 Days Checklist',
    description: 'Day-by-day beginner route for Spring days 1-8: starter crops, fishing, Mines, Scarecrow, Furnace, and Community Center setup.',
    category: 'Beginner',
    readTime: '10 min',
  },
  {
    slug: 'robin-shop-best-items',
    title: 'Best Robin Shop Items',
    description: 'Five overlooked Carpenter Shop purchases that improve storage, crafting, schedule planning, and farm workflow.',
    category: 'Beginner',
    readTime: '9 min',
  },
  {
    slug: 'year-1-money',
    title: 'Year 1 Money Making Guide',
    description: 'Realistic strategies to maximize income in your first year without exploits.',
    category: 'Beginner',
    readTime: '15 min',
  },
  {
    slug: 'community-center',
    title: 'Community Center Completion Guide',
    description: 'Complete all 30 bundles in Year 1. Room-by-room breakdown with seasonal deadlines and item sources.',
    category: 'Bundles',
    readTime: '18 min',
  },
  {
    slug: 'community-center-fish-bundles',
    title: 'Community Center Fish Bundles',
    description: 'Fish Tank checklist for River, Lake, Ocean, Night Fishing, Crab Pot, and Specialty Fish bundles.',
    category: 'Bundles',
    readTime: '9 min',
  },
  {
    slug: 'best-gifts',
    title: 'Best Gifts for Every Villager',
    description: 'Loved gifts for all 34 NPCs. Efficient gifting strategy, birthday bonuses, and friendship math.',
    category: 'Social',
    readTime: '12 min',
  },
  {
    slug: 'foraging-profit',
    title: 'Foraging Profit Guide',
    description: 'Seasonal forage rankings, Botanist vs Gatherer analysis, and efficient foraging routes.',
    category: 'Foraging',
    readTime: '10 min',
  },
  {
    slug: 'skull-cavern',
    title: 'Skull Cavern Strategy Guide',
    description: 'Reach floor 100+. Optimal loadout, bomb strategies, and Iridium farming techniques.',
    category: 'Combat',
    readTime: '14 min',
  },
];

export default function GuidesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Guides</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
        Stardew Valley Profit Guides
      </h1>
      
      <p className="text-xl text-slate-600 mb-12 max-w-3xl">
        In-depth analysis and strategies for maximizing your farm income. All calculations verified for Stardew Valley 1.6.15.
      </p>

      <section className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { href: '/selling-prices/', title: 'Selling Prices Database', desc: 'Verified sell prices for crops, fish, artisan goods, quality values, and profession bonuses.' },
          { href: '/crops/', title: 'Crops Database', desc: 'Season, growth time, seed costs, and calculator entry points.' },
          { href: '/artisan-goods/', title: 'Artisan Goods Hub', desc: 'Keg, Jar, Wine, Juice, Coffee, and Artisan formulas.' },
          { href: '/fish-ponds/', title: 'Fish Pond Values', desc: 'Roe, Aged Roe, Caviar, and verified pond value formulas.' },
          { href: '/fishing/', title: 'Fishing Hub', desc: 'Fish locations, seasons, legendary fish, bundle targets, and fishing guide links.' },
          { href: '/animal-products/', title: 'Animal Products', desc: 'Milk, Eggs, Wool, Truffles, Rancher bonus, and machine outputs.' },
          { href: '/minerals/', title: 'Minerals Price List', desc: 'Gem, geode, mine, Skull Cavern, and Crystalarium price references.' },
          { href: '/forage/', title: 'Forage Prices', desc: 'Seasonal forage, mushrooms, beach forage, and Botanist planning.' },
        ].map((hub) => (
          <Link key={hub.href} href={hub.href} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-green-300 transition">
            <h2 className="text-lg font-bold text-slate-800 mb-2">{hub.title}</h2>
            <p className="text-sm text-slate-600">{hub.desc}</p>
          </Link>
        ))}
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link 
            key={guide.slug}
            href={`/guide/${guide.slug}`}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                {guide.category}
              </span>
              <span className="text-slate-400 text-sm">{guide.readTime} read</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition">
              {guide.title}
            </h2>
            <p className="text-slate-600">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-slate-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Looking for Quick Calculations?</h2>
        <p className="text-slate-600 mb-6">
          Check out our seasonal profit calculators for instant results.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculator/spring" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Spring Calculator
          </Link>
          <Link href="/calculator/summer" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            Summer Calculator
          </Link>
          <Link href="/calculator/fall" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Fall Calculator
          </Link>
          <Link href="/crop-profit-calculator/" className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition">
            Calculator Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
