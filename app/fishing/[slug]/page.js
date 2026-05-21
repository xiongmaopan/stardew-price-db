import fishData from '@/data/fish.json';
import verificationData from '@/data/verification.json';
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

  const shortLocation = fish.location.slice(0, 2).join(', ');
  const description = fish.legendary
    ? `${fish.name}${legendaryTag} sells for ${fish.basePrice}g. Catch at ${shortLocation} in ${seasonText}, ${fish.time}. Difficulty ${fish.difficulty}/110.`
    : `${fish.name} sells for ${fish.basePrice}g. Catch at ${shortLocation} in ${seasonText}, ${fish.time}. Includes quality and Angler prices.`;

  return {
    title: `${fish.name} Price & Location - Stardew Valley`,
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
      title: `${fish.name}${legendaryTag} Sell Price & Fishing Guide - Stardew Valley`,
      description: `${fish.name} sells for ${fish.basePrice}g. Catch it at ${locationText} during ${seasonText}. Difficulty: ${fish.difficulty}.`,
      url: `https://stardewpricedb.com/fishing/${fish.slug}/`,
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
      title: `${fish.name} Price - Stardew Valley Fishing Guide`,
      description: `${fish.name} sells for ${fish.basePrice}g. Location: ${locationText}. Season: ${seasonText}.`,
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
    datePublished: '2026-05-19',
    dateModified: verificationData.lastVerified.split('T')[0],
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
