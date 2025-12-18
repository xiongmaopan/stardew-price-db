import Link from 'next/link';

export const metadata = {
  title: 'Community Center Guide - Complete All Bundles in Year 1 | Stardew Valley 1.6',
  description: 'Complete Community Center guide for Stardew Valley 1.6. Room-by-room breakdown with exact item sources, seasonal deadlines, and Year 1 completion strategy. Official game data verified.',
  alternates: {
    canonical: 'https://stardewpricedb.com/guide/community-center/',
  },
  openGraph: {
    title: 'Community Center Complete Guide - Stardew Valley 1.6',
    description: 'Room-by-room breakdown with seasonal planning. Complete all 31 bundles and unlock the Greenhouse, Bus, and more.',
    url: 'https://stardewpricedb.com/guide/community-center/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://stardewpricedb.com/guide/community-center/#article',
      headline: 'Community Center Guide - Complete All Bundles in Year 1',
      description: 'Complete Community Center walkthrough with room breakdowns, seasonal deadlines, and Year 1 completion strategy.',
      datePublished: '2025-12-16',
      dateModified: '2025-12-16',
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: 'https://stardewpricedb.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB'
      },
      mainEntityOfPage: 'https://stardewpricedb.com/guide/community-center/'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stardewpricedb.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://stardewpricedb.com/guide/' },
        { '@type': 'ListItem', position: 3, name: 'Community Center Guide' }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can you complete the Community Center in Year 1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. With proper planning, all 30 bundles can be completed by Winter 28, Year 1. The key bottlenecks are: Red Cabbage (Year 2 seed, must find at Traveling Cart), Apple/Pomegranate (fruit trees take 28 days), and specific seasonal fish. Check the Traveling Cart every Friday and Sunday.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the hardest bundle to complete?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Chef\'s Bundle and Dye Bundle are the hardest. Chef\'s Bundle requires a Truffle (needs a Deluxe Barn + Pig, minimum 26,000g investment). Dye Bundle requires Red Cabbage which is normally Year 2 only, plus a Duck Feather from a high-friendship Duck.'
          }
        },
        {
          '@type': 'Question',
          name: 'What rewards do you get for completing the Community Center?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Each room unlocks a major reward: Pantry = Greenhouse, Fish Tank = Panning, Crafts Room = Quarry access, Boiler Room = Minecarts, Bulletin Board = Friendship boost, Vault = Bus to Desert. Full completion triggers a special cutscene and unlocks the Movie Theater questline.'
          }
        }
      ]
    }
  ]
};

export default function CommunityCenterGuide() {
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
          <span className="text-slate-800">Community Center</span>
        </nav>

        <article className="prose prose-slate prose-lg max-w-none">
          <h1>Community Center Guide: Complete All 30 Bundles</h1>
          
          <p className="lead text-xl text-slate-600">
            The Community Center contains 30 bundles across 6 rooms. Complete them all to unlock the Greenhouse, 
            Desert Bus, Quarry, and Minecart system. This guide covers every bundle with exact item sources 
            and a Year 1 completion timeline.
          </p>

          <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
            <p className="font-medium text-amber-800">Data Source</p>
            <p className="text-amber-700 text-sm">
              All item requirements and bundle data verified against Stardew Valley 1.6 game files. 
              Last updated December 2025.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="not-prose bg-slate-100 rounded-lg p-6 my-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <a href="#pantry" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-amber-50 transition">
                <span className="text-2xl">🌾</span>
                <div>
                  <div className="font-medium">Pantry</div>
                  <div className="text-xs text-slate-500">6 bundles → Greenhouse</div>
                </div>
              </a>
              <a href="#fish-tank" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-blue-50 transition">
                <span className="text-2xl">🐟</span>
                <div>
                  <div className="font-medium">Fish Tank</div>
                  <div className="text-xs text-slate-500">6 bundles → Panning</div>
                </div>
              </a>
              <a href="#crafts-room" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-green-50 transition">
                <span className="text-2xl">🔨</span>
                <div>
                  <div className="font-medium">Crafts Room</div>
                  <div className="text-xs text-slate-500">6 bundles → Quarry</div>
                </div>
              </a>
              <a href="#boiler-room" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-orange-50 transition">
                <span className="text-2xl">⚙️</span>
                <div>
                  <div className="font-medium">Boiler Room</div>
                  <div className="text-xs text-slate-500">3 bundles → Minecarts</div>
                </div>
              </a>
              <a href="#bulletin-board" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition">
                <span className="text-2xl">📋</span>
                <div>
                  <div className="font-medium">Bulletin Board</div>
                  <div className="text-xs text-slate-500">5 bundles → Friendship</div>
                </div>
              </a>
              <a href="#vault" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-medium">Vault</div>
                  <div className="text-xs text-slate-500">4 bundles → Desert Bus</div>
                </div>
              </a>
            </div>
          </div>

          <h2 id="year-1-strategy">Year 1 Completion Strategy</h2>
          
          <p>
            Completing the Community Center in Year 1 requires planning from Day 1. 
            The main blockers are seasonal items, fruit trees (28 days to mature), and a few rare items.
          </p>

          <h3>Critical Actions by Season</h3>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Season</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Must Do</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Deadline Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium text-green-700">Spring 1</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Plant Cauliflower (12 days), place Tappers on Oak/Maple/Pine
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Spring foraging items, Spring fish
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2 font-medium text-green-700">Spring 13</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Buy Strawberry seeds at Egg Festival (plant by Spring 14)
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Catfish (rain), Eel (rain, night)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium text-yellow-700">Summer 1</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Plant Apple + Pomegranate trees (mature Fall 1), Red Cabbage if you have seeds
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Pufferfish (12-4pm sunny), Summer foraging
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2 font-medium text-yellow-700">Summer 15</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Plant Corn (grows into Fall), Sunflower for Dye Bundle
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Fiddlehead Fern (Secret Woods only), Sea Urchin (beach)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 font-medium text-orange-700">Fall 1</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Harvest Apple/Pomegranate, plant Pumpkin (13 days)
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Walleye (rain, night), Fall foraging
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2 font-medium text-blue-700">Winter</td>
                  <td className="border border-slate-300 px-4 py-2">
                    Complete Vault (42,500g total), catch Nautilus Shell
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    Nautilus Shell (beach), Winter foraging
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>The 3 Hardest Items for Year 1</h3>
          
          <ol>
            <li>
              <strong>Red Cabbage</strong> — Seeds only available Year 2 at Pierre's. 
              Your only Year 1 option: Traveling Cart (appears randomly for 150-1,000g). 
              Check every Friday and Sunday.
            </li>
            <li>
              <strong>Truffle</strong> — Requires a Pig in a Deluxe Barn. That's 12,000g (Deluxe Barn) + 16,000g (Pig) + time to raise friendship. 
              Realistically, you won't have truffles until late Fall Year 1 at earliest.
            </li>
            <li>
              <strong>Rabbit's Foot</strong> — Drops from high-friendship Rabbits on lucky days. 
              Can also appear at Traveling Cart (1,695-2,825g). Serpents in Skull Cavern have a 0.8% drop rate.
            </li>
          </ol>

          <hr className="my-8" />

          <h2 id="pantry">🌾 Pantry (6 Bundles) → Unlocks Greenhouse</h2>
          
          <p>
            The Pantry focuses on farming. Completing all 6 bundles repairs the Greenhouse, 
            allowing year-round crop growth.
          </p>

          <div className="not-prose space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Spring Crops Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 items. Reward: 20 Speed-Gro</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">🥕 Parsnip (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🫛 Green Bean (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🥦 Cauliflower (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🥔 Potato (Gold)</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Tip: Use Basic Fertilizer for Gold quality. Cauliflower takes 12 days — plant by Spring 16.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Summer Crops Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 items. Reward: 20 Quality Fertilizer</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">🍅 Tomato (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🌶️ Hot Pepper (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🫐 Blueberry (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🍈 Melon (Gold)</div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Fall Crops Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 items. Reward: 1 Bee House</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">🌽 Corn (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🍆 Eggplant (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🎃 Pumpkin (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">🍠 Yam (Gold)</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Tip: Plant Corn in Summer — it survives into Fall and counts for this bundle.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Quality Crops Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 3 of 4 options. Reward: 1 Preserves Jar</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">5× Parsnip (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">5× Melon (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">5× Pumpkin (Gold)</div>
                <div className="bg-slate-50 p-2 rounded">5× Corn (Gold)</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Quality Fertilizer + Farming Level 8+ gives ~30% Gold quality chance.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Animal Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 5 of 6 options. Reward: 1 Cheese Press</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Large Milk</div>
                <div className="bg-slate-50 p-2 rounded">Large Egg (Brown)</div>
                <div className="bg-slate-50 p-2 rounded">Large Goat Milk</div>
                <div className="bg-slate-50 p-2 rounded">Wool</div>
                <div className="bg-slate-50 p-2 rounded">Duck Egg</div>
                <div className="bg-slate-50 p-2 rounded">Large Egg (White)</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Large products require 4+ hearts with the animal. Pet them daily.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Artisan Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 6 of 12 options. Reward: 1 Keg</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Truffle Oil</div>
                <div className="bg-slate-50 p-2 rounded">Cloth</div>
                <div className="bg-slate-50 p-2 rounded">Goat Cheese</div>
                <div className="bg-slate-50 p-2 rounded">Cheese</div>
                <div className="bg-slate-50 p-2 rounded">Honey</div>
                <div className="bg-slate-50 p-2 rounded">Jelly</div>
                <div className="bg-slate-50 p-2 rounded">Apple</div>
                <div className="bg-slate-50 p-2 rounded">Apricot</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Skip Truffle Oil (requires Pig). Honey + Cheese + Jelly + Cloth + 2 tree fruits is the fast path.
              </p>
            </div>
          </div>

          <hr className="my-8" />

          <h2 id="fish-tank">🐟 Fish Tank (6 Bundles) → Unlocks Panning</h2>
          
          <p>
            Fish Tank bundles require catching specific fish. Some are seasonal and weather-dependent. 
            Completing this room removes the glittering boulder, enabling ore panning.
          </p>

          <div className="not-prose bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-medium text-blue-800">Fishing Tip</p>
            <p className="text-blue-700 text-sm">
              Fish don't need quality for bundles — any quality works. 
              Save Gold/Iridium quality fish for selling or gifts.
            </p>
          </div>

          <div className="not-prose space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">River Fish Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 fish. Reward: 30 Bait</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Sunfish — Spring/Summer, 6am-7pm</div>
                <div className="bg-slate-50 p-2 rounded">Catfish — Spring/Fall, rain only</div>
                <div className="bg-slate-50 p-2 rounded">Shad — Spring/Summer/Fall, rain, 9am-2am</div>
                <div className="bg-slate-50 p-2 rounded">Tiger Trout — Fall/Winter, 6am-7pm</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Catfish is the tricky one. Rain in Spring or Fall, river only. Difficulty 75.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Lake Fish Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 fish. Reward: 1 Dressed Spinner</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Largemouth Bass — All seasons, 6am-7pm</div>
                <div className="bg-slate-50 p-2 rounded">Carp — All seasons, anytime</div>
                <div className="bg-slate-50 p-2 rounded">Bullhead — All seasons, anytime</div>
                <div className="bg-slate-50 p-2 rounded">Sturgeon — Summer/Winter, 6am-7pm</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                All found in the Mountain Lake. Sturgeon has difficulty 78 but no weather requirement.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Ocean Fish Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 fish. Reward: 5 Warp Totem: Beach</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Sardine — Spring/Fall/Winter, 6am-7pm</div>
                <div className="bg-slate-50 p-2 rounded">Tuna — Summer/Winter, 6am-7pm</div>
                <div className="bg-slate-50 p-2 rounded">Red Snapper — Summer/Fall, rain, 6am-7pm</div>
                <div className="bg-slate-50 p-2 rounded">Tilapia — Summer/Fall, 6am-2pm</div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Night Fishing Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 3 fish. Reward: 1 Small Glow Ring</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Walleye — Fall, rain, River/Lake, 12pm-2am</div>
                <div className="bg-slate-50 p-2 rounded">Bream — All seasons, River, 6pm-2am</div>
                <div className="bg-slate-50 p-2 rounded">Eel — Spring/Fall, Ocean, rain, 4pm-2am</div>
              </div>
              <p className="text-xs text-red-600 mt-2">
                Both Walleye and Eel require rain. If Fall has no rainy days, you'll miss Walleye for Year 1.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Specialty Fish Bundle</h3>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Hard</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 fish. Reward: 5 Dish O' The Sea</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Pufferfish — Summer, sunny, Ocean, 12pm-4pm only</div>
                <div className="bg-slate-50 p-2 rounded">Ghostfish — Mines floors 20-60</div>
                <div className="bg-slate-50 p-2 rounded">Sandfish — Desert, 6am-8pm (need Bus access)</div>
                <div className="bg-slate-50 p-2 rounded">Woodskip — Secret Woods pond</div>
              </div>
              <p className="text-xs text-red-600 mt-2">
                Pufferfish has a 4-hour window on sunny Summer days only. Sandfish requires Desert access (Vault completion).
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Crab Pot Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 5 of 10 options. Reward: 3 Crab Pots</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Lobster</div>
                <div className="bg-slate-50 p-2 rounded">Crab</div>
                <div className="bg-slate-50 p-2 rounded">Crayfish</div>
                <div className="bg-slate-50 p-2 rounded">Snail</div>
                <div className="bg-slate-50 p-2 rounded">Clam</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Place crab pots in ocean (more variety) and freshwater (Crayfish, Snail). Check daily.
              </p>
            </div>
          </div>

          <hr className="my-8" />

          <h2 id="crafts-room">🔨 Crafts Room (6 Bundles) → Unlocks Quarry</h2>
          
          <p>
            Crafts Room bundles involve foraging, construction materials, and seasonal items. 
            Completing it repairs the bridge to the Quarry (free ore and geodes).
          </p>

          <div className="not-prose space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Seasonal Foraging Bundles</h3>
              <p className="text-sm text-slate-600 mb-3">One bundle per season. Each rewards 30 seasonal seeds.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700">Spring</h4>
                  <p className="text-sm">Wild Horseradish, Daffodil, Leek, Dandelion</p>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-700">Summer</h4>
                  <p className="text-sm">Grape, Spice Berry, Sweet Pea</p>
                </div>
                <div>
                  <h4 className="font-medium text-orange-700">Fall</h4>
                  <p className="text-sm">Common Mushroom, Wild Plum, Hazelnut, Blackberry</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700">Winter</h4>
                  <p className="text-sm">Winter Root, Crystal Fruit, Snow Yam, Crocus</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Forage daily each season. Winter Root and Snow Yam can be hoed from dirt patches.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Construction Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Reward: 1 Charcoal Kiln</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">99 Wood — Chop trees</div>
                <div className="bg-slate-50 p-2 rounded">99 Stone — Break rocks</div>
                <div className="bg-slate-50 p-2 rounded">10 Hardwood — Secret Woods, stumps</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Secret Woods: 6 Hardwood stumps respawn daily. Axe upgrade needed.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Exotic Foraging Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 5 of 9 options. Reward: 5 Autumn's Bounty</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Coconut</div>
                <div className="bg-slate-50 p-2 rounded">Cactus Fruit</div>
                <div className="bg-slate-50 p-2 rounded">Cave Carrot</div>
                <div className="bg-slate-50 p-2 rounded">Red Mushroom</div>
                <div className="bg-slate-50 p-2 rounded">Purple Mushroom</div>
                <div className="bg-slate-50 p-2 rounded">Maple Syrup</div>
                <div className="bg-slate-50 p-2 rounded">Oak Resin</div>
                <div className="bg-slate-50 p-2 rounded">Pine Tar</div>
                <div className="bg-slate-50 p-2 rounded">Morel</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Start Tappers on Day 1 — they take 7-9 days. Coconut/Cactus need Desert access or Traveling Cart.
              </p>
            </div>
          </div>

          <hr className="my-8" />

          <h2 id="boiler-room">⚙️ Boiler Room (3 Bundles) → Unlocks Minecarts</h2>
          
          <p>
            The smallest room. Completing it activates the Minecart network for fast travel 
            between the Mine, Town, Bus Stop, and Quarry.
          </p>

          <div className="not-prose space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Blacksmith's Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Reward: 1 Furnace</p>
              <div className="text-sm">
                1 Copper Bar + 1 Iron Bar + 1 Gold Bar
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Mine floors 1-40 (Copper), 41-80 (Iron), 81+ (Gold). Smelt with Coal.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Geologist's Bundle</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Reward: 5 Omni Geodes</p>
              <div className="text-sm">
                Quartz + Earth Crystal + Frozen Tear + Fire Quartz
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Each crystal matches its mine section. Break geodes at Clint if missing any.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Adventurer's Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 2 of 4. Reward: 1 Small Magnet Ring</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">99 Slime — Slimes (all floors)</div>
                <div className="bg-slate-50 p-2 rounded">10 Bat Wing — Bats (floors 41+)</div>
                <div className="bg-slate-50 p-2 rounded">1 Solar Essence — Ghosts, Squid Kids</div>
                <div className="bg-slate-50 p-2 rounded">1 Void Essence — Shadow monsters (81+)</div>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <h2 id="bulletin-board">📋 Bulletin Board (5 Bundles) → Friendship Boost</h2>
          
          <p>
            These bundles require a mix of farming, cooking, and rare items. 
            Completion gives +2 hearts with all non-datable villagers.
          </p>

          <div className="not-prose bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-medium text-red-800">Year 1 Warning</p>
            <p className="text-red-700 text-sm">
              Red Cabbage seeds are only sold Year 2. For Year 1 completion, 
              you MUST buy Red Cabbage or its seeds from the Traveling Cart (random stock, Friday/Sunday).
            </p>
          </div>

          <div className="not-prose space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Chef's Bundle</h3>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Hard</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 6 items. Reward: 3 Pink Cake</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Maple Syrup — Tapper</div>
                <div className="bg-slate-50 p-2 rounded">Fiddlehead Fern — Secret Woods, Summer only</div>
                <div className="bg-slate-50 p-2 rounded">Truffle — Pig (expensive!)</div>
                <div className="bg-slate-50 p-2 rounded">Poppy — Summer crop</div>
                <div className="bg-slate-50 p-2 rounded">Maki Roll — Cooking</div>
                <div className="bg-slate-50 p-2 rounded">Fried Egg — Cooking</div>
              </div>
              <p className="text-xs text-red-600 mt-2">
                Truffle requires Deluxe Barn (12,000g) + Pig (16,000g). Plan for late Year 1 at earliest.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Dye Bundle</h3>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Hard</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 6 items. Reward: 1 Seed Maker</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Red Mushroom</div>
                <div className="bg-slate-50 p-2 rounded">Sea Urchin — Beach, Summer</div>
                <div className="bg-slate-50 p-2 rounded">Sunflower</div>
                <div className="bg-slate-50 p-2 rounded">Duck Feather — Duck, high friendship</div>
                <div className="bg-slate-50 p-2 rounded">Aquamarine — Mines 41+</div>
                <div className="bg-slate-50 p-2 rounded text-red-600 font-medium">Red Cabbage — Year 2 or Cart</div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Enchanter's Bundle</h3>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Need 4 items. Reward: 5 Gold Bars</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded">Oak Resin — Tapper</div>
                <div className="bg-slate-50 p-2 rounded">Wine — Keg (any fruit)</div>
                <div className="bg-slate-50 p-2 rounded">Rabbit's Foot — Rabbit or Cart</div>
                <div className="bg-slate-50 p-2 rounded">Pomegranate — Fruit tree (Fall)</div>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <h2 id="vault">💰 Vault (4 Bundles) → Unlocks Desert Bus</h2>
          
          <p>
            The Vault requires gold, not items. Total cost: 42,500g. 
            Completing it repairs the bus for Desert access (Skull Cavern, Sandfish, Coconut, Starfruit seeds).
          </p>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Bundle</th>
                  <th className="border border-slate-300 px-4 py-2 text-right">Cost</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">2,500g Bundle</td>
                  <td className="border border-slate-300 px-4 py-2 text-right font-mono">2,500g</td>
                  <td className="border border-slate-300 px-4 py-2">3 Chocolate Cake</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">5,000g Bundle</td>
                  <td className="border border-slate-300 px-4 py-2 text-right font-mono">5,000g</td>
                  <td className="border border-slate-300 px-4 py-2">30 Quality Fertilizer</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">10,000g Bundle</td>
                  <td className="border border-slate-300 px-4 py-2 text-right font-mono">10,000g</td>
                  <td className="border border-slate-300 px-4 py-2">1 Lightning Rod</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">25,000g Bundle</td>
                  <td className="border border-slate-300 px-4 py-2 text-right font-mono">25,000g</td>
                  <td className="border border-slate-300 px-4 py-2">1 Crystalarium</td>
                </tr>
                <tr className="font-bold">
                  <td className="border border-slate-300 px-4 py-2">Total</td>
                  <td className="border border-slate-300 px-4 py-2 text-right font-mono">42,500g</td>
                  <td className="border border-slate-300 px-4 py-2">+ Bus Repaired</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Prioritize the Vault in Fall/Winter Year 1. You need Desert access for Sandfish 
            (Specialty Fish Bundle) before year's end.
          </p>

          <hr className="my-8" />

          <h2>Completion Rewards Summary</h2>
          
          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Room</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Bundles</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">🌾 Pantry</td>
                  <td className="border border-slate-300 px-4 py-2">6</td>
                  <td className="border border-slate-300 px-4 py-2 font-medium text-green-700">Greenhouse</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">🐟 Fish Tank</td>
                  <td className="border border-slate-300 px-4 py-2">6</td>
                  <td className="border border-slate-300 px-4 py-2">Glittering Boulder removed (Panning)</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">🔨 Crafts Room</td>
                  <td className="border border-slate-300 px-4 py-2">6</td>
                  <td className="border border-slate-300 px-4 py-2">Quarry bridge repaired</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">⚙️ Boiler Room</td>
                  <td className="border border-slate-300 px-4 py-2">3</td>
                  <td className="border border-slate-300 px-4 py-2">Minecart network</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">📋 Bulletin Board</td>
                  <td className="border border-slate-300 px-4 py-2">5</td>
                  <td className="border border-slate-300 px-4 py-2">+2 hearts (all villagers)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">💰 Vault</td>
                  <td className="border border-slate-300 px-4 py-2">4</td>
                  <td className="border border-slate-300 px-4 py-2 font-medium text-green-700">Bus to Desert</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Full Completion Bonus</h3>
          <p>
            Completing all 30 bundles triggers a cutscene and unlocks The Missing Bundle at 
            the abandoned JojaMart. Complete that for the Movie Theater (post-game content).
          </p>

          <hr className="my-8" />          {/* Related Guides */}
          <div className="border-t-2 border-slate-200 pt-8 mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-800 mb-6">📚 Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/bundles/" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-blue-800">📦 All Bundles Database</div>
                <p className="text-sm text-slate-600 mt-1">Interactive bundle tracker</p>
              </Link>
              <Link href="/guide/most-profitable-crops/" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-green-800">🌾 Most Profitable Crops</div>
                <p className="text-sm text-slate-600 mt-1">Gold-per-day rankings by season</p>
              </Link>
              <Link href="/guide/year-1-money/" className="block bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-yellow-800">💰 Year 1 Money Guide</div>
                <p className="text-sm text-slate-600 mt-1">Early game gold strategies</p>
              </Link>
              <Link href="/guide/foraging-profit/" className="block bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-emerald-800">🌿 Foraging Profit</div>
                <p className="text-sm text-slate-600 mt-1">Seasonal forage for bundles</p>
              </Link>
              <Link href="/guide/best-fish-pond/" className="block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-cyan-800">🐟 Fish Pond Guide</div>
                <p className="text-sm text-slate-600 mt-1">Fish for bundles & profit</p>
              </Link>
              <Link href="/guide/skull-cavern/" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="font-bold text-purple-800">💀 Skull Cavern</div>
                <p className="text-sm text-slate-600 mt-1">Unlocked after Vault bundle</p>
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
