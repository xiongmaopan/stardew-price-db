const fs = require('fs');
const path = require('path');

// Best Gifts Guide
const bestGiftsContent = `import Link from 'next/link';

export const metadata = {
  title: 'Best Gifts for Every NPC - Stardew Valley 1.6 Gift Guide',
  description: 'Complete gift guide for all 34 Stardew Valley NPCs. Loved gifts, universal likes, birthday bonuses, and efficient friendship strategies.',
  alternates: { canonical: 'https://stardewpricedb.com/guide/best-gifts/' },
};

export default function BestGiftsGuide() {
  return (
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
          efficient gifts for each NPC prioritizing items you can get early.
        </p>
        <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
          <p className="font-medium text-amber-800">Data Source</p>
          <p className="text-amber-700 text-sm">
            Gift preferences from Stardew Valley 1.6 game data. Updated December 2025.
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
                <td className="border border-slate-300 px-4 py-2 font-medium">Birthday Bonus</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">x8</td>
                <td className="border border-slate-300 px-4 py-2">Loved gift = 640 points!</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>10 hearts = 2,500 points.</strong> With 2 loved gifts per week (+160) plus daily talking (+140), about 8 weeks to max friendship.</p>
        <h2>Universal Loves</h2>
        <p>Five items are loved by almost everyone: Prismatic Shard, Rabbit Foot, Pearl, Golden Pumpkin, Magic Rock Candy. Exception: Haley hates Prismatic Shard.</p>
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
                <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/harvey/" className="text-blue-600 hover:underline">Harvey</Link></td>
                <td className="border border-slate-300 px-3 py-2">Winter 14</td>
                <td className="border border-slate-300 px-3 py-2 text-green-700">Coffee</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-600">Keg (Coffee Beans)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-3 py-2 font-medium"><Link href="/gift/leah/" className="text-blue-600 hover:underline">Leah</Link></td>
                <td className="border border-slate-300 px-3 py-2">Winter 23</td>
                <td className="border border-slate-300 px-3 py-2 text-green-700">Salad</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-600">Saloon (220g)</td>
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
        <h2>Efficient Gifting Strategy</h2>
        <h3>Year 1 Spring</h3>
        <ul>
          <li><strong>Leek</strong> - George (foraging, free)</li>
          <li><strong>Daffodil</strong> - Universal like (foraging)</li>
          <li><strong>Salad</strong> - Leah (Saloon 220g)</li>
          <li><strong>Amethyst</strong> - Abigail, Emily (Mines 1-40)</li>
        </ul>
        <h2>Related Pages</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <Link href="/gifts/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">All NPC Gifts</div>
            <div className="text-sm text-slate-600">Browse individual NPC pages</div>
          </Link>
          <Link href="/guide/year-1-money/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Year 1 Money Guide</div>
            <div className="text-sm text-slate-600">Earn gold for expensive gifts</div>
          </Link>
          <Link href="/guide/community-center/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Community Center</div>
            <div className="text-sm text-slate-600">Complete all bundles</div>
          </Link>
        </div>
      </article>
    </main>
  );
}
`;

// Foraging Profit Guide
const foragingContent = `import Link from 'next/link';

export const metadata = {
  title: 'Foraging Profit Guide - Best Items by Season | Stardew Valley 1.6',
  description: 'Complete foraging profit analysis. Seasonal items ranked by gold value, Botanist profession math, and efficient foraging routes.',
  alternates: { canonical: 'https://stardewpricedb.com/guide/foraging-profit/' },
};

export default function ForagingProfitGuide() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Foraging Profit</span>
      </nav>
      <article className="prose prose-slate prose-lg max-w-none">
        <h1>Foraging Profit Guide</h1>
        <p className="lead text-xl text-slate-600">
          Foraging is free money. No seeds, no watering, no waiting. This guide ranks every
          foraged item by gold value and shows you where to find the best ones each season.
        </p>
        <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
          <p className="font-medium text-amber-800">Data Source</p>
          <p className="text-amber-700 text-sm">
            All prices from Stardew Valley 1.6 game data. Iridium quality = 2x base price. Updated December 2025.
          </p>
        </div>
        <h2>Profession Choice: Botanist vs Gatherer</h2>
        <p>At Foraging Level 10, choose between Botanist (Iridium quality) or Tracker. Recommended path: Gatherer at Level 5, then Botanist at Level 10 = 2.4x base value.</p>
        <div className="not-prose bg-green-50 border-l-4 border-green-500 p-4 my-6">
          <p className="font-medium text-green-800">Truffle Bonus</p>
          <p className="text-green-700 text-sm">
            Botanist affects Truffles. Base 625g becomes Iridium 1,250g. With Gatherer double chance, average = 1,500g per truffle.
          </p>
        </div>
        <h2>Spring Foraging</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Base</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Iridium</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Morel</td>
                <td className="border border-slate-300 px-4 py-2 text-right">150g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">300g</td>
                <td className="border border-slate-300 px-4 py-2">Secret Woods</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Leek</td>
                <td className="border border-slate-300 px-4 py-2 text-right">60g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">120g</td>
                <td className="border border-slate-300 px-4 py-2">Everywhere</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Salmonberry</td>
                <td className="border border-slate-300 px-4 py-2 text-right">5g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">10g</td>
                <td className="border border-slate-300 px-4 py-2">Bushes (Days 15-18)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Summer Foraging</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Base</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Iridium</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Rainbow Shell</td>
                <td className="border border-slate-300 px-4 py-2 text-right">300g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">600g</td>
                <td className="border border-slate-300 px-4 py-2">Beach (random)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Fiddlehead Fern</td>
                <td className="border border-slate-300 px-4 py-2 text-right">90g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">180g</td>
                <td className="border border-slate-300 px-4 py-2">Secret Woods</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Grape</td>
                <td className="border border-slate-300 px-4 py-2 text-right">80g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">160g</td>
                <td className="border border-slate-300 px-4 py-2">Everywhere</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Fall Foraging</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-orange-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Base</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Iridium</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Chanterelle</td>
                <td className="border border-slate-300 px-4 py-2 text-right">160g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">320g</td>
                <td className="border border-slate-300 px-4 py-2">Secret Woods</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Wild Plum</td>
                <td className="border border-slate-300 px-4 py-2 text-right">80g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">160g</td>
                <td className="border border-slate-300 px-4 py-2">Everywhere</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Blackberry</td>
                <td className="border border-slate-300 px-4 py-2 text-right">25g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">50g</td>
                <td className="border border-slate-300 px-4 py-2">Bushes (Days 8-11)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Winter Foraging</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Base</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Iridium</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Crystal Fruit</td>
                <td className="border border-slate-300 px-4 py-2 text-right">150g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">300g</td>
                <td className="border border-slate-300 px-4 py-2">Everywhere</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Nautilus Shell</td>
                <td className="border border-slate-300 px-4 py-2 text-right">120g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">240g</td>
                <td className="border border-slate-300 px-4 py-2">Beach</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Snow Yam</td>
                <td className="border border-slate-300 px-4 py-2 text-right">100g</td>
                <td className="border border-slate-300 px-4 py-2 text-right text-purple-600">200g</td>
                <td className="border border-slate-300 px-4 py-2">Dig spots</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Related Guides</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <Link href="/guide/most-profitable-crops/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Profitable Crops</div>
            <div className="text-sm text-slate-600">Compare to farming profits</div>
          </Link>
          <Link href="/guide/community-center/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Community Center</div>
            <div className="text-sm text-slate-600">Seasonal forage bundles</div>
          </Link>
          <Link href="/guide/animal-profit/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Animal Profit</div>
            <div className="text-sm text-slate-600">Truffle farming strategy</div>
          </Link>
        </div>
      </article>
    </main>
  );
}
`;

// Skull Cavern Guide
const skullCavernContent = `import Link from 'next/link';

export const metadata = {
  title: 'Skull Cavern Guide - Floor 100+ Strategy | Stardew Valley 1.6',
  description: 'Reach floor 100+ in Skull Cavern. Optimal loadout, bomb strategies, lucky day mechanics, and Iridium farming routes.',
  alternates: { canonical: 'https://stardewpricedb.com/guide/skull-cavern/' },
};

export default function SkullCavernGuide() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guide/">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Skull Cavern</span>
      </nav>
      <article className="prose prose-slate prose-lg max-w-none">
        <h1>Skull Cavern Strategy Guide</h1>
        <p className="lead text-xl text-slate-600">
          Skull Cavern has no floor limit. The deeper you go, the more Iridium spawns.
          This guide covers the gear, consumables, and techniques to reach floor 100+ consistently.
        </p>
        <div className="not-prose bg-red-50 border-l-4 border-red-500 p-4 my-6">
          <p className="font-medium text-red-800">Requirements</p>
          <p className="text-red-700 text-sm">
            Complete the Vault bundles (42,500g) to repair the Bus. Skull Cavern is in northwest Calico Desert.
          </p>
        </div>
        <h2>Pre-Run Checklist</h2>
        <ol>
          <li><strong>Check TV fortune</strong> - Spirits are very happy is the best day</li>
          <li><strong>Eat Lucky Lunch</strong> before warping (+3 Luck)</li>
          <li><strong>Warp at 6:00 AM</strong> - Bus wastes 1 hour</li>
          <li><strong>Drink Coffee</strong> - Speed buff stacks with food</li>
        </ol>
        <h2>Optimal Loadout</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Slot</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-left">How to Get</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Weapon</td>
                <td className="border border-slate-300 px-4 py-2">Galaxy Sword / Infinity Blade</td>
                <td className="border border-slate-300 px-4 py-2 text-slate-600">Prismatic Shard at desert pillars</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Boots</td>
                <td className="border border-slate-300 px-4 py-2">Space Boots</td>
                <td className="border border-slate-300 px-4 py-2 text-slate-600">Skull Cavern drop, +4 Def +4 Imm</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Ring 1</td>
                <td className="border border-slate-300 px-4 py-2">Iridium Band</td>
                <td className="border border-slate-300 px-4 py-2 text-slate-600">Craft or combine at Volcano</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Ring 2</td>
                <td className="border border-slate-300 px-4 py-2">Lucky Ring</td>
                <td className="border border-slate-300 px-4 py-2 text-slate-600">+1 Luck, special order reward</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Consumables</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Item</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Effect</th>
                <th className="border border-slate-300 px-4 py-2 text-right">Bring</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Mega Bomb</td>
                <td className="border border-slate-300 px-4 py-2">Clears large area</td>
                <td className="border border-slate-300 px-4 py-2 text-right">100+</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Staircases</td>
                <td className="border border-slate-300 px-4 py-2">Skip floors instantly</td>
                <td className="border border-slate-300 px-4 py-2 text-right">50-100</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Spicy Eel</td>
                <td className="border border-slate-300 px-4 py-2">+1 Luck, +1 Speed</td>
                <td className="border border-slate-300 px-4 py-2 text-right">10-15</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Coffee</td>
                <td className="border border-slate-300 px-4 py-2">+1 Speed (stacks with food)</td>
                <td className="border border-slate-300 px-4 py-2 text-right">10-20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
          <p className="font-medium text-amber-800">Staircase Source</p>
          <p className="text-amber-700 text-sm">
            Buy Jade on Sundays from Desert Trader = 1 Staircase. Crystallariums producing Jade = infinite staircases.
          </p>
        </div>
        <h2>Floor Strategy</h2>
        <h3>Speed Strategy (Floor 100 Goal)</h3>
        <ol>
          <li>Use staircase on monster floors or spiral layouts</li>
          <li>Bomb open areas for holes (skip 3-15 floors)</li>
          <li>Only mine Iridium if you see 5+ nodes</li>
          <li>Never pause to fight unless cornered</li>
        </ol>
        <h2>Luck Mechanics</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-2 text-left">Fortune</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Daily Luck</th>
                <th className="border border-slate-300 px-4 py-2 text-left">Go Today?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Very Happy</td>
                <td className="border border-slate-300 px-4 py-2">+0.07 to +0.1</td>
                <td className="border border-slate-300 px-4 py-2 text-green-700 font-bold">YES - best day</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-4 py-2 font-medium">Good Humor</td>
                <td className="border border-slate-300 px-4 py-2">+0.02 to +0.07</td>
                <td className="border border-slate-300 px-4 py-2 text-blue-600">Good day</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-slate-300 px-4 py-2 font-medium">Very Displeased</td>
                <td className="border border-slate-300 px-4 py-2">-0.07 to -0.1</td>
                <td className="border border-slate-300 px-4 py-2 text-red-600">Do not go</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Quick Reference</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-2">DO</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>Wait for very happy spirits</li>
              <li>Warp to Desert at 6 AM</li>
              <li>Stack Coffee + Spicy Eel</li>
              <li>Jump in holes over ladders</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-red-800 mb-2">DO NOT</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>Take the bus (wastes 1 hour)</li>
              <li>Fight every monster</li>
              <li>Mine every rock</li>
              <li>Go on bad luck days</li>
            </ul>
          </div>
        </div>
        <h2>Related Guides</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <Link href="/guide/mining-profit/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Mining Profit Guide</div>
            <div className="text-sm text-slate-600">Regular mines strategy</div>
          </Link>
          <Link href="/guide/keg-vs-jar/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Keg vs Jar</div>
            <div className="text-sm text-slate-600">Process your crops</div>
          </Link>
          <Link href="/guide/year-1-money/" className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition">
            <div className="font-bold text-blue-600">Year 1 Money</div>
            <div className="text-sm text-slate-600">Fund your Skull Cavern runs</div>
          </Link>
        </div>
      </article>
    </main>
  );
}
`;

// Write all files
const basePath = path.join(__dirname, '..');
fs.writeFileSync(path.join(basePath, 'app/guide/best-gifts/page.js'), bestGiftsContent);
fs.writeFileSync(path.join(basePath, 'app/guide/foraging-profit/page.js'), foragingContent);
fs.writeFileSync(path.join(basePath, 'app/guide/skull-cavern/page.js'), skullCavernContent);

console.log('Created guide files:');
console.log('- best-gifts:', fs.statSync(path.join(basePath, 'app/guide/best-gifts/page.js')).size, 'bytes');
console.log('- foraging-profit:', fs.statSync(path.join(basePath, 'app/guide/foraging-profit/page.js')).size, 'bytes');
console.log('- skull-cavern:', fs.statSync(path.join(basePath, 'app/guide/skull-cavern/page.js')).size, 'bytes');
