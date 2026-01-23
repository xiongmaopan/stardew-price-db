import fishData from '@/data/fish.json';
import FishDetailContent from './FishDetailContent';

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
  const locationText = fish.location.join(', ');
  const difficultyText = fish.difficulty >= 90 ? 'extremely hard' : fish.difficulty >= 70 ? 'challenging' : fish.difficulty >= 50 ? 'moderate' : 'easy';
  const legendaryTag = fish.legendary ? ' (Legendary)' : '';

  // Craft unique, value-rich descriptions
  const description = fish.legendary 
    ? `Complete guide to catching ${fish.name}${legendaryTag} in Stardew Valley 1.6. Location: ${locationText}. Season: ${seasonText}. Difficulty: ${fish.difficulty}/110. Time: ${fish.time}. Expert tips, tackle recommendations, and strategies for this ${fish.basePrice}g legendary fish.`
    : `How to catch ${fish.name} in Stardew Valley: Location (${locationText}), Season (${seasonText}), Time (${fish.time}), Difficulty (${difficultyText}). Sells for ${fish.basePrice}g. Complete fishing guide with tips and strategies.`;

  return {
    title: `${fish.name} - Location, Season & How to Catch | Stardew Valley 1.6 Fishing Guide`,
    description,
    keywords: [
      `${fish.name} Stardew Valley`,
      `how to catch ${fish.name}`,
      `${fish.name} location`,
      `${fish.name} season`,
      `${fish.name} time`,
      `where to find ${fish.name}`,
      `${fish.name} price`,
      'Stardew Valley fishing',
      'Stardew Valley 1.6',
      fish.legendary ? 'legendary fish' : 'Stardew fish guide',
      ...fish.season.map(s => `${s} fish Stardew`),
      ...fish.location.map(l => `${l} fish`)
    ],
    alternates: {
      canonical: `/fishing/${fish.slug}`,
    },
    openGraph: {
      title: `${fish.name}${legendaryTag} Fishing Guide - Stardew Valley`,
      description: `Catch ${fish.name} at ${locationText} during ${seasonText}. Difficulty: ${fish.difficulty}. Price: ${fish.basePrice}g. Complete guide with tips.`,
      url: `https://stardewpricedb.com/fishing/${fish.slug}`,
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
      title: `${fish.name} - Stardew Valley Fishing Guide`,
      description: `Location: ${locationText}. Season: ${seasonText}. Price: ${fish.basePrice}g. Tips & strategies.`,
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
    headline: `How to Catch ${fish.name} in Stardew Valley - Complete Guide`,
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
    datePublished: '2025-12-09',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://stardewpricedb.com/fishing/${fish.slug}`
    }
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
        text: `Cast your line as far as possible for better quality. ${fish.name} has ${fish.behavior} behavior - ${fish.behavior === 'dart' ? 'stay centered and react quickly' : fish.behavior === 'sinker' ? 'keep your bar low' : fish.behavior === 'floater' ? 'keep your bar high' : 'follow steadily'}.`
      }
    ]
  });

  // FAQ Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Where can I catch ${fish.name} in Stardew Valley?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fish.name} can be caught at ${fish.location.join(' or ')}. ${fish.locationDetail}`
        }
      },
      {
        '@type': 'Question',
        name: `What season is ${fish.name} available?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fish.name} is available during ${fish.season.join(' and ')} from ${fish.time}.${fish.weather && fish.weather !== 'Any' ? ` It requires ${fish.weather.toLowerCase()} weather.` : ' It appears in any weather.'}`
        }
      },
      {
        '@type': 'Question',
        name: `How much does ${fish.name} sell for?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fish.name} has a base sell price of ${fish.basePrice}g. With the Angler profession (+25%), it sells for ${Math.floor(fish.basePrice * 1.25)}g. Silver quality sells for ${Math.floor(fish.basePrice * 1.25)}g, Gold for ${Math.floor(fish.basePrice * 1.5)}g, and Iridium for ${Math.floor(fish.basePrice * 2)}g.`
        }
      },
      {
        '@type': 'Question',
        name: `How hard is it to catch ${fish.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fish.name} has a difficulty rating of ${fish.difficulty}${fish.difficulty >= 90 ? ', making it one of the hardest fish to catch' : fish.difficulty >= 70 ? ', a challenging catch' : fish.difficulty >= 50 ? ', a moderate challenge' : ', relatively easy to catch'}. It has ${fish.behavior} behavior. ${fish.tips}`
        }
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
