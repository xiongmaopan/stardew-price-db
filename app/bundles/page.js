import bundlesData from '@/data/bundles.json';
import BundlesContent from './BundlesContent';

// Calculate stats for meta
const totalBundles = bundlesData.bundles.length;
const totalRooms = bundlesData.rooms.length;
const easyBundles = bundlesData.bundles.filter(b => b.difficulty === 'Easy').length;
const hardBundles = bundlesData.bundles.filter(b => b.difficulty === 'Hard' || b.difficulty === 'Very Hard').length;

export const metadata = {
  title: `All ${totalBundles} Community Center Bundles - Stardew Valley 1.6 | StardewPriceDB`,
  description: `${totalBundles} bundles across ${totalRooms} rooms: Pantry, Fish Tank, Crafts Room, Boiler Room, Bulletin Board, Vault. Required items, rewards, difficulty ratings. ${easyBundles} easy, ${hardBundles} hard bundles. Verified for 1.6.`,
  keywords: [
    'Stardew Valley Community Center',
    'Stardew Valley bundles guide',
    'Community Center bundles list',
    'Stardew Valley 1.6 bundles',
    'how to complete Community Center',
    'Stardew Valley Pantry bundles',
    'Stardew Valley Fish Tank bundles',
    'Greenhouse unlock Stardew',
    'Stardew Valley bundle rewards',
    'Community Center completion guide',
    'Stardew Valley Crafts Room',
    'Boiler Room bundles',
    'Bulletin Board bundles',
    'Vault bundles Stardew',
    'Missing Bundle Stardew Valley',
  ],
  alternates: {
    canonical: 'https://stardewpricedb.com/bundles',
  },
  openGraph: {
    title: `All ${totalBundles} Community Center Bundles - Stardew Valley 1.6 Guide`,
    description: `Complete Community Center guide: ${totalBundles} bundles across ${totalRooms} rooms with items, rewards & tips.`,
    url: 'https://stardewpricedb.com/bundles',
    type: 'website',
    siteName: 'StardewPriceDB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `All ${totalBundles} Community Center Bundles - Stardew Valley 1.6`,
    description: `Master all ${totalBundles} bundles with our complete Community Center guide.`,
  },
};

// JSON-LD structured data
function generateJsonLd() {
  const schemas = [];

  // ItemList Schema for bundle collection
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stardew Valley Community Center Bundles - Complete List',
    description: `All ${totalBundles} Community Center bundles in Stardew Valley 1.6 with required items and rewards`,
    numberOfItems: totalBundles,
    itemListElement: bundlesData.bundles.map((bundle, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'HowTo',
        name: bundle.name,
        description: bundle.description,
        url: `https://stardewpricedb.com/bundle/${bundle.slug}`,
      }
    }))
  });

  // CollectionPage Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Stardew Valley Community Center Bundles Database',
    description: 'Complete database of all Community Center bundles in Stardew Valley',
    url: 'https://stardewpricedb.com/bundles',
    isPartOf: {
      '@type': 'WebSite',
      name: 'StardewPriceDB',
      url: 'https://stardewpricedb.com'
    },
    about: {
      '@type': 'VideoGame',
      name: 'Stardew Valley',
      gamePlatform: ['PC', 'Nintendo Switch', 'PlayStation', 'Xbox', 'Mobile']
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalBundles,
      name: 'Community Center Bundles'
    }
  });

  // FAQPage Schema for common questions
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many bundles are in the Stardew Valley Community Center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `There are ${totalBundles} bundles in the Stardew Valley Community Center, spread across ${totalRooms} rooms: Pantry (6 bundles), Fish Tank (6 bundles), Crafts Room (6 bundles), Boiler Room (3 bundles), Bulletin Board (5 bundles), Vault (4 bundles), and the special Missing Bundle at the Abandoned JojaMart.`
        }
      },
      {
        '@type': 'Question',
        name: 'What do you get for completing the Community Center in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each room gives a unique reward: Pantry unlocks the Greenhouse, Fish Tank removes the Glittering Boulder for panning, Crafts Room repairs the bridge to the Quarry, Boiler Room repairs the Minecarts for fast travel, Bulletin Board gives +2 hearts with all villagers, and Vault repairs the Bus to the Calico Desert. Completing all rooms also triggers a special cutscene.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the hardest bundle to complete in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The hardest bundles are typically the Artisan Bundle (requires fruit trees and a pig for truffles), the Dye Bundle (needs Red Cabbage seeds only available Year 2+), and the post-game Missing Bundle (requires Prismatic Shard, Dinosaur Mayo, and other rare items).'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you complete the Community Center in Year 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it\'s possible but challenging! The main obstacles are Red Cabbage (Year 2 crop, but can appear in Traveling Cart), fruit trees (28 days to mature), and season-specific fish. Check the Traveling Cart every Friday and Sunday for rare items.'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens if you choose JojaMart instead of Community Center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you buy a JojaMart membership (5,000g), the Community Center becomes a Joja Warehouse. You can then purchase community upgrades with gold instead of completing bundles. The rewards are the same, but you miss out on bundle rewards and the Missing Bundle/Movie Theater.'
        }
      }
    ]
  });

  // HowTo Schema for completing Community Center
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Complete the Stardew Valley Community Center',
    description: 'Step-by-step guide to completing all Community Center bundles efficiently',
    totalTime: 'P1Y',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Start with Foraging Bundles',
        text: 'Complete the seasonal foraging bundles in the Crafts Room first - they require no money and teach you the map.',
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Plant Fruit Trees Early',
        text: 'Buy fruit tree saplings from Pierre as soon as possible - they take 28 days to mature and you need fruits for the Artisan Bundle.',
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Fish on Rainy Days',
        text: 'Many fish only appear in rain (Catfish, Walleye, Eel). Check the TV weather forecast and prioritize fishing on rainy days.',
        position: 3
      },
      {
        '@type': 'HowToStep',
        name: 'Check Traveling Cart',
        text: 'Visit the Traveling Cart every Friday and Sunday in Cindersap Forest. You can find rare items like Red Cabbage before Year 2.',
        position: 4
      },
      {
        '@type': 'HowToStep',
        name: 'Save Gold Quality Crops',
        text: 'Use fertilizer and save gold quality crops for the Quality Crops Bundle. Don\'t sell everything!',
        position: 5
      },
      {
        '@type': 'HowToStep',
        name: 'Complete Vault Last',
        text: 'The Vault bundles only require gold. Save them for when you have stable income from Kegs or Preserve Jars.',
        position: 6
      }
    ]
  });

  return schemas;
}

export default function BundlesPage() {
  const jsonLd = generateJsonLd();

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BundlesContent bundles={bundlesData.bundles} rooms={bundlesData.rooms} />
    </>
  );
}
