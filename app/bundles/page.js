import bundlesData from '@/data/bundles.json';
import BundlesContent from './BundlesContent';

// Calculate stats for meta
const totalBundles = bundlesData.bundles.length;
const totalRooms = bundlesData.rooms.length;
const easyBundles = bundlesData.bundles.filter(b => b.difficulty === 'Easy').length;
const hardBundles = bundlesData.bundles.filter(b => b.difficulty === 'Hard' || b.difficulty === 'Very Hard').length;

export const metadata = {
  title: `${totalBundles} Community Center Bundles - Stardew Valley`,
  description: `${totalBundles} bundles across ${totalRooms} rooms with required items, rewards, difficulty ratings, and completion tips. ${easyBundles} easy, ${hardBundles} hard bundles.`,
  keywords: [
    'Stardew Valley Community Center',
    'Stardew Valley bundles guide',
    'Community Center bundles list',
    'Stardew Valley 1.6.15 bundles',
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
    canonical: 'https://stardewpricedb.com/bundles/',
  },
  openGraph: {
    title: `All ${totalBundles} Community Center Bundles - Stardew Valley 1.6.15 Guide`,
    description: `Complete Community Center guide: ${totalBundles} bundles across ${totalRooms} rooms with items, rewards & tips.`,
    url: 'https://stardewpricedb.com/bundles/',
    type: 'website',
    siteName: 'StardewPriceDB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `All ${totalBundles} Community Center Bundles - Stardew Valley 1.6.15`,
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
    description: `All ${totalBundles} Community Center bundles in Stardew Valley 1.6.15 with required items and rewards`,
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
