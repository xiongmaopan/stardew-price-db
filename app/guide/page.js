import Link from 'next/link';

export const metadata = {
  title: 'Stardew Valley Guides - Profit Strategies & Money Making Tips',
  description: 'In-depth Stardew Valley guides covering crop profits, Keg vs Jar analysis, Ancient Fruit strategies, Fish Pond optimization, and Year 1 money making. Data verified for v1.6.',
  alternates: {
    canonical: '/guide',
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
    slug: 'best-fish-pond',
    title: 'Best Fish Pond Choices for Profit',
    description: 'Which fish to put in ponds, expected roe income, and Caviar vs Aged Roe comparison.',
    category: 'Fishing',
    readTime: '7 min',
  },  {
    slug: 'year-1-money',
    title: 'Year 1 Money Making Guide',
    description: 'Realistic strategies to maximize income in your first year without exploits.',
    category: 'Beginner',
    readTime: '15 min',
  },  {
    slug: 'community-center',
    title: 'Community Center Completion Guide',
    description: 'Complete all 30 bundles in Year 1. Room-by-room breakdown with seasonal deadlines and item sources.',
    category: 'Bundles',
    readTime: '18 min',
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
        In-depth analysis and strategies for maximizing your farm income. All calculations verified for Stardew Valley 1.6.
      </p>

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
        </div>
      </div>
    </main>
  );
}
