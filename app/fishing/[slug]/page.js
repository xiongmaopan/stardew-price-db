import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';
import FishDetailContent from './FishDetailContent';

const SITE_URL = 'https://stardewpricedb.com';

const metadataOverrides = {
  'super-cucumber': {
    title: 'Super Cucumber Stardew Valley: Location, Time & Sell Price',
    description: 'Catch Super Cucumber in the Ocean or Ginger Island during Summer/Fall nights. See exact time, 250g base price, quality prices, uses, and tackle tips.',
  },
  'ice-pip': {
    title: 'Ice Pip Stardew Valley: Mine Floor 60 Location & Price',
    description: 'Catch Ice Pip on Mines Floor 60 in any season. See the 500g base price, quality prices, difficulty 85, dart behavior, and recommended tackle.',
  },
  'stonefish': {
    title: 'Stonefish Stardew Valley: Mine Floor 20 Location & Price',
    description: 'Catch Stonefish on Mines Floor 20 in any season. See the 300g base price, quality prices, sinker behavior, difficulty, and catch strategy.',
  },
  'sea-cucumber': {
    title: 'Sea Cucumber Stardew Valley: Location, Time & Uses',
    description: 'Catch Sea Cucumber in the Ocean during Fall/Winter from 6 AM to 7 PM. See sell prices, Lucky Lunch use, quality values, and tackle tips.',
  },
  pufferfish: {
    title: 'Pufferfish Stardew Valley: Location, Weather & Sell Price',
    description: 'Catch Pufferfish in the Ocean on sunny Summer days from noon to 4 PM. See sell prices, difficulty, Abigail gift use, and tackle tips.',
  },
  'midnight-carp': {
    title: 'Midnight Carp Stardew Valley: Location, Time & Uses',
    description: 'Catch Midnight Carp at night in the Mountain Lake or Ginger Island. See exact time, seasons, sell price, Seafoam Pudding use, and fish pond notes.',
  },
};

// Generate static params for all fish
export async function generateStaticParams() {
  return fishData.fish.map((fish) => ({
    slug: fish.slug,
  }));
}

// Generate metadata for SEO - High quality titles and descriptions
export async function generateMetadata({ params }) {
  const { slug: slugId } = await params;
  const fish = fishData.fish.find(f => f.slug === slugId);
  
  if (!fish) {
    return { title: 'Fish Not Found' };
  }

  const seasonText = fish.season.length > 1 ? fish.season.join(' & ') : fish.season[0];
  const legendaryTag = fish.legendary ? ' (Legendary)' : '';

  const shortLocation = fish.location.slice(0, 2).join(', ');
  const defaultDescription = fish.legendary
    ? `${fish.name}${legendaryTag} sells for ${fish.basePrice}g. Catch at ${shortLocation} in ${seasonText}, ${fish.time}. Difficulty ${fish.difficulty}/110.`
    : `${fish.name} sells for ${fish.basePrice}g. Catch at ${shortLocation} in ${seasonText}, ${fish.time}. See quality prices, smoked value, uses, and tackle tips.`;
  const override = metadataOverrides[fish.slug];
  const title = override?.title || `${fish.name} Stardew Valley: Location, Price & Time`;
  const description = override?.description || defaultDescription;

  return {
    title,
    description,
    keywords: [
      `${fish.name} Stardew Valley`,
      `how to catch ${fish.name}`,
      `${fish.name} location`,
      `${fish.name} season`,
      `${fish.name} time`,
      `where to find ${fish.name}`,
      `${fish.name} price`,
      `${fish.name} sell price`,
      'Stardew Valley fishing',
      'Stardew Valley 1.6.15',
      fish.legendary ? 'legendary fish' : 'Stardew fish guide',
      ...fish.season.map(s => `${s} fish Stardew`),
      ...fish.location.map(l => `${l} fish`)
    ],
    alternates: {
      canonical: `/fishing/${fish.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/fishing/${fish.slug}/`,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${fish.name} - Stardew Valley Fishing Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(fish) {
  const schemas = [];
  
  // Article Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${fish.name} Stardew Valley Location, Sell Price, Time, and Catch Guide`,
    description: fish.description,
    author: {
      '@type': 'Organization',
      name: 'StardewPriceDB'
    },
    publisher: {
      '@type': 'Organization',
      name: 'StardewPriceDB',
      url: 'https://stardewpricedb.com'
    },
    datePublished: '2026-05-19',
    dateModified: verificationData.lastVerified.split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/fishing/${fish.slug}/`
    }
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Fishing Guide',
        item: `${SITE_URL}/fishing/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: fish.name,
        item: `${SITE_URL}/fishing/${fish.slug}/`,
      },
    ],
  });

  // Product Schema removed - Google Search Console error: invalid ISO 4217 currency code

  // HowTo Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Catch ${fish.name} in Stardew Valley`,
    description: `Step-by-step guide to catching ${fish.name}${fish.legendary ? ', a legendary fish' : ''} in Stardew Valley.`,
    totalTime: 'PT10M',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Go to the correct location',
        text: `Travel to ${fish.location.join(' or ')} where ${fish.name} can be found.`
      },
      {
        '@type': 'HowToStep',
        name: 'Check the season and time',
        text: `${fish.name} is available during ${fish.season.join(', ')} from ${fish.time}.${fish.weather && fish.weather !== 'Any' ? ` Requires ${fish.weather.toLowerCase()} weather.` : ''}`
      },
      {
        '@type': 'HowToStep',
        name: 'Prepare your tackle',
        text: `For difficulty ${fish.difficulty}, ${fish.difficulty >= 80 ? 'use Cork Bobber for maximum bar size' : fish.difficulty >= 60 ? 'consider using Trap Bobber' : 'any tackle will work'}.`
      },
      {
        '@type': 'HowToStep',
        name: 'Cast and catch',
        text: `Cast your line as far as possible for better quality. ${fish.name} has ${fish.behavior} behavior - ${fish.behavior?.toLowerCase() === 'dart' ? 'stay centered and react quickly' : fish.behavior?.toLowerCase() === 'sinker' ? 'keep your bar low' : fish.behavior?.toLowerCase() === 'floater' ? 'keep your bar high' : 'follow steadily'}.`
      }
    ]
  });

  return schemas;
}

export default async function FishDetailPage({ params }) {
  const { slug: slugId } = await params;
  const fish = fishData.fish.find(f => f.slug === slugId);
  
  if (!fish) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Fish Not Found</h1>
        <p className="text-slate-600 mt-2">The requested fish could not be found.</p>
      </main>
    );
  }

  // Get related fish (same location or same season)
  const relatedFish = fishData.fish
    .filter(f => f.id !== fish.id && (
      f.location.some(l => fish.location.includes(l)) ||
      f.season.some(s => fish.season.includes(s))
    ))
    .slice(0, 4);

  const jsonLd = generateJsonLd(fish);
  const behaviorInfo = fishData.behaviors[fish.behavior?.toLowerCase()];

  return (
    <>
      {/* JSON-LD Scripts */}
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      <FishDetailContent 
        fish={fish} 
        relatedFish={relatedFish} 
        behaviorInfo={behaviorInfo}
        tackleGuide={fishData.tips.tackle}
      />
    </>
  );
}
