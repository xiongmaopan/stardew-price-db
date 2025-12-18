import Link from 'next/link';

export const metadata = {
  title: 'Best Gifts for Every NPC - Stardew Valley 1.6 Gift Guide',
  description: 'Complete gift guide for all 34 Stardew Valley NPCs. Loved gifts, universal likes, birthday bonuses, and efficient friendship strategies. Data from game files.',
  alternates: {
    canonical: 'https://stardewpricedb.com/guide/best-gifts/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Gifts for Every NPC - Stardew Valley Gift Guide',
  datePublished: '2025-12-17',
  dateModified: '2025-12-17',
  author: { '@type': 'Organization', name: 'StardewPriceDB' },
};

export default function BestGiftsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guide/">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Best Gifts</span>
        </nav>

        <article className="prose prose-slate prose-lg max-w-none">
          <h1>Best Gifts for Every Villager</h1>
          
          <p className="lead text-xl text-slate-600">
            Gift-giving builds friendship faster than any other method. This guide covers the most 
            efficient gifts for each NPC prioritizing items you can get early without spending 
            thousands of gold.
          </p>

          <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
            <p className="font-medium text-amber-800">Data Source</p>
            <p className="text-amber-700 text-sm">
              Gift preferences extracted from Stardew Valley 1.6 game data (Data/NPCGiftTastes). 
              Updated December 2025.
            </p>
          </div>

          <h2>Friendship Math</h2>
          
          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Action</th>
                  <th className="border border-slate-300 px-4 py-2 text-right">Points</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium">Loved Gift</td>
                  <td className="border border-slate-300 px-4 py-2 text-right text-green-600">+80</td>
                  <td className="border border-slate-300 px-4 py-2">Best value for rare items</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2 font-medium">Liked Gift</td>
                  <td className="border border-slate-300 px-4 py-2 text-right text-blue-600">+45</td>
                  <td className="border border-slate-300 px-4 py-2">Good for common items</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium">Neutral Gift</td>
                  <td className="border border-slate-300 px-4 py-2 text-right">+20</td>
                  <td className="border border-slate-300 px-4 py-2">Barely worth it</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2 font-medium">Birthday Bonus</td>
                  <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">x8</td>
                  <td className="border border-slate-300 px-4 py-2">Loved gift = 640 points!</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium">Talk Daily</td>
                  <td className="border border-slate-300 px-4 py-2 text-right">+20</td>
                  <td className="border border-slate-300 px-4 py-2">Free, no limit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>10 hearts = 2,500 points.</strong> With 2 loved gifts per week (+160) plus daily talking (+140), 
            you gain about 300 points per week. About 8 weeks to max friendship without birthdays.
          </p>

          <h2>Universal Loves</h2>
          
          <p>
            Five items are loved by almost everyone. Keep these for emergencies:
          </p>

          <div className="not-prose grid grid-cols-2 md:grid-cols-5 gap-3 my-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="font-medium text-sm">Prismatic Shard</div>
              <div className="text-xs text-slate-500">Rare drop</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="font-medium text-sm">Rabbit Foot</div>
              <div className="text-xs text-slate-500">Rabbit, lucky</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="font-medium text-sm">Pearl</div>
              <div className="text-xs text-slate-500">Night Market</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="font-medium text-sm">Golden Pumpkin</div>
              <div className="text-xs text-slate-500">Spirits Eve</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="font-medium text-sm">Magic Rock Candy</div>
              <div className="text-xs text-slate-500">Skull Cavern</div>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            <strong>Exception:</strong> Haley hates Prismatic Shard.
          </p>

          <h2>Marriageable NPCs - Best Gifts</h2>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left">NPC</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Birthday</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Easy Loved Gift</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/abigail/" className="text-blue-600 hover:underline">Abigail</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Fall 13</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Amethyst</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Mines 1-40</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/alex/" className="text-blue-600 hover:underline">Alex</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Summer 13</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Complete Breakfast</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Cooking</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/elliott/" className="text-blue-600 hover:underline">Elliott</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Fall 5</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Pomegranate</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Fruit Tree (Fall)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/emily/" className="text-blue-600 hover:underline">Emily</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Spring 27</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Cloth</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Loom (Wool)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/haley/" className="text-blue-600 hover:underline">Haley</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Spring 14</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Sunflower</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Summer/Fall crop</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/harvey/" className="text-blue-600 hover:underline">Harvey</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Winter 14</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Coffee</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Keg (Coffee Beans)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/leah/" className="text-blue-600 hover:underline">Leah</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Winter 23</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Salad</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Saloon (220g)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/maru/" className="text-blue-600 hover:underline">Maru</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Summer 10</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Cauliflower</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Spring crop</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/penny/" className="text-blue-600 hover:underline">Penny</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Fall 2</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Melon</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Summer crop</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/sam/" className="text-blue-600 hover:underline">Sam</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Summer 17</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Pizza</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Saloon (600g)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/sebastian/" className="text-blue-600 hover:underline">Sebastian</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Winter 10</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Frozen Tear</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Mines 40-80</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/shane/" className="text-blue-600 hover:underline">Shane</Link></td>
                  <td className="border border-slate-300 px-3 py-2">Spring 20</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Hot Pepper</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Summer crop</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Other Villagers</h2>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left">NPC</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Birthday</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Easy Loved Gift</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Caroline</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 7</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Summer Spangle</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Summer crop</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Clint</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 26</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Gold Bar</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Furnace</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Demetrius</td>
                  <td className="border border-slate-300 px-3 py-2">Summer 19</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Strawberry</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Spring crop</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Evelyn</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 20</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Chocolate Cake</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Cooking</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">George</td>
                  <td className="border border-slate-300 px-3 py-2">Fall 24</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Leek</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Spring forage</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Gus</td>
                  <td className="border border-slate-300 px-3 py-2">Summer 8</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Orange</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Fruit Tree</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Krobus</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 1</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Void Egg</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Void Chicken</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Lewis</td>
                  <td className="border border-slate-300 px-3 py-2">Spring 7</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Green Tea</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Keg (Tea Leaves)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Linus</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 3</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Yam</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Fall crop</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Marnie</td>
                  <td className="border border-slate-300 px-3 py-2">Fall 18</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Diamond</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Mines 50+</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Pam</td>
                  <td className="border border-slate-300 px-3 py-2">Spring 18</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Beer</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Keg (Wheat)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-3 py-2 font-medium">Robin</td>
                  <td className="border border-slate-300 px-3 py-2">Fall 21</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Goat Cheese</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Cheese Press</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-medium">Wizard</td>
                  <td className="border border-slate-300 px-3 py-2">Winter 17</td>
                  <td className="border border-slate-300 px-3 py-2 text-green-700">Purple Mushroom</td>
                  <td className="border border-slate-300 px-3 py-2 text-slate-600">Mines 80+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Efficient Gifting Strategy</h2>

          <h3>Year 1 Spring</h3>
          <ul>
            <li><strong>Leek</strong> - George (foraging, free)</li>
            <li><strong>Daffodil</strong> - Universal like (foraging)</li>
            <li><strong>Salad</strong> - Leah (Saloon 220g)</li>
            <li><strong>Amethyst</strong> - Abigail, Emily (Mines 1-40)</li>
          </ul>

          <h3>Once You Have Kegs</h3>
          <ul>
            <li><strong>Coffee</strong> - Harvey (5 beans = 1 coffee)</li>
            <li><strong>Beer</strong> - Pam, Shane (Wheat to Keg)</li>
            <li><strong>Wine</strong> - Harvey, Leah (any fruit to Keg)</li>
          </ul>

          <h3>Birthday Priority</h3>
          
          <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-2 my-4 text-sm">
            <div className="bg-green-50 p-2 rounded"><strong>Spring 7</strong> - Lewis</div>
            <div className="bg-green-50 p-2 rounded"><strong>Spring 14</strong> - Haley</div>
            <div className="bg-green-50 p-2 rounded"><strong>Spring 20</strong> - Shane</div>
            <div className="bg-green-50 p-2 rounded"><strong>Spring 27</strong> - Emily</div>
            <div className="bg-yellow-50 p-2 rounded"><strong>Summer 10</strong> - Maru</div>
            <div className="bg-yellow-50 p-2 rounded"><strong>Summer 13</strong> - Alex</div>
            <div className="bg-yellow-50 p-2 rounded"><strong>Summer 17</strong> - Sam</div>
            <div className="bg-yellow-50 p-2 rounded"><strong>Summer 24</strong> - Willy</div>
            <div className="bg-orange-50 p-2 rounded"><strong>Fall 2</strong> - Penny</div>
            <div className="bg-orange-50 p-2 rounded"><strong>Fall 5</strong> - Elliott</div>
            <div className="bg-orange-50 p-2 rounded"><strong>Fall 13</strong> - Abigail</div>
            <div className="bg-orange-50 p-2 rounded"><strong>Fall 21</strong> - Robin</div>
            <div className="bg-blue-50 p-2 rounded"><strong>Winter 10</strong> - Sebastian</div>
            <div className="bg-blue-50 p-2 rounded"><strong>Winter 14</strong> - Harvey</div>
            <div className="bg-blue-50 p-2 rounded"><strong>Winter 17</strong> - Wizard</div>
            <div className="bg-blue-50 p-2 rounded"><strong>Winter 23</strong> - Leah</div>
          </div>          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/gifts/" className="block bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-pink-800">💕 All NPC Gifts</div>
                <p className="text-sm text-slate-600 mt-1">Browse individual NPC gift pages</p>
              </Link>
              <Link href="/guide/year-1-money/" className="block bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-yellow-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Earn gold for expensive gifts</p>
              </Link>
              <Link href="/guide/community-center/" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">📦 Community Center</div>
                <p className="text-sm text-slate-600 mt-1">Complete all bundles</p>
              </Link>
              <Link href="/guide/foraging-profit/" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🌿 Foraging Profit</div>
                <p className="text-sm text-slate-600 mt-1">Free gifts from foraging</p>
              </Link>
              <Link href="/guide/animal-profit/" className="block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-amber-800">🐄 Animal Profit Guide</div>
                <p className="text-sm text-slate-600 mt-1">Cheese & eggs as gifts</p>
              </Link>
              <Link href="/guide/best-fish-pond/" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fish Pond Guide</div>
                <p className="text-sm text-slate-600 mt-1">Roe for villager gifts</p>
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
