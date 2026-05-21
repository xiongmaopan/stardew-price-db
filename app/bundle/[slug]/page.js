import { notFound } from 'next/navigation';
import bundlesData from '@/data/bundles.json';
import verificationData from '@/data/verification.json';
import bundleStrategies from '@/data/bundle-strategies.json';
import BundleDetailContent from './BundleDetailContent';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

function shortDescription(text, max = 155) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

// Generate static params for all bundles
export async function generateStaticParams() {
  return bundlesData.bundles.map((bundle) => ({
    slug: bundle.slug,
  }));
}

// Generate metadata for each bundle page
export async function generateMetadata({ params }) {
  const { slug: slugId } = await params;
  const bundle = bundlesData.bundles.find(b => b.slug === slugId);
  
  if (!bundle) {
    return { title: 'Bundle Not Found' };
  }

  const room = bundlesData.rooms.find(r => r.slug === bundle.roomSlug);
  const itemNames = bundle.items.slice(0, 5).map(i => i.name).join(', ');
  
  const description = shortDescription(
    `${bundle.name} guide for Stardew Valley's ${bundle.room}. Items: ${itemNames}${bundle.items.length > 5 ? '...' : ''}. Reward: ${bundle.reward.quantity}x ${bundle.reward.item}.`
  );

  return {
    title: `${bundle.name} Bundle - ${bundle.room} Guide`,
    description,
    keywords: [
      `${bundle.name} Stardew Valley`,
      `${bundle.room} bundles`,
      `Community Center ${bundle.name}`,
      `how to complete ${bundle.name}`,
      `${bundle.reward.item} Stardew Valley`,
      `${bundle.room} reward`,
      'Stardew Valley bundle guide',
      'Community Center completion',
      ...bundle.items.slice(0, 5).map(i => `${i.name} bundle`),
    ],    alternates: {
      canonical: `${SITE_URL}/bundle/${slugId}/`,
    },
    openGraph: {
      title: `${bundle.name} - ${bundle.room} Bundle Guide`,
      description,
      url: `${SITE_URL}/bundle/${slugId}/`,
      type: 'article',
      siteName: 'StardewPriceDB',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${bundle.name} bundle guide` }],
    },
    twitter: {
      card: 'summary',
      title: `${bundle.name} Guide`,
      description: `${bundle.room} bundle - Get ${bundle.reward.item} as reward!`,
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(bundle, room) {
  const schemas = [];

  // HowTo Schema - Primary schema for bundle completion guide
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Complete the ${bundle.name}`,
    description: bundle.description,
    totalTime: bundle.difficulty === 'Easy' ? 'P7D' : bundle.difficulty === 'Medium' ? 'P28D' : 'P56D',
    supply: bundle.items.map(item => ({
      '@type': 'HowToSupply',
      name: item.name,
      requiredQuantity: item.quantity,
      description: item.source
    })),
    step: [
      {
        '@type': 'HowToStep',
        name: 'Gather Required Items',
        text: `Collect ${bundle.itemsRequired} of the following items: ${bundle.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}`,
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Visit the Community Center',
        text: `Go to the Community Center and enter the ${bundle.room} room.`,
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Complete the Bundle',
        text: `Place the items in the ${bundle.name} slot on the golden scroll. You will receive ${bundle.reward.quantity}x ${bundle.reward.item} as a reward.`,
        position: 3
      }
    ],
    tool: {
      '@type': 'HowToTool',
      name: 'Community Center Access',
      description: 'Unlocked after reaching the Community Center and reading the golden scroll'
    },
    yield: `${bundle.reward.quantity}x ${bundle.reward.item}`
  });

  // Article Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${bundle.name} - Complete Guide`,
    description: bundle.description,
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
      '@id': `https://stardewpricedb.com/bundle/${bundle.slug}`
    },
    about: {
      '@type': 'VideoGame',
      name: 'Stardew Valley'
    }
  });

  // BreadcrumbList Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stardewpricedb.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bundles',
        item: 'https://stardewpricedb.com/bundles'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: bundle.room,
        item: `https://stardewpricedb.com/bundles#${bundle.roomSlug}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: bundle.name,
        item: `https://stardewpricedb.com/bundle/${bundle.slug}`
      }
    ]
  });

  return schemas;
}

export default async function BundleDetailPage({ params }) {
  const { slug: slugId } = await params;
  const bundle = bundlesData.bundles.find(b => b.slug === slugId);
  
  if (!bundle) {
    notFound();
  }

  const room = bundlesData.rooms.find(r => r.slug === bundle.roomSlug);
  const relatedBundles = bundlesData.bundles
    .filter(b => b.roomSlug === bundle.roomSlug && b.slug !== bundle.slug)
    .slice(0, 5);
  
  // Get strategy data for this bundle and room
  const strategy = bundleStrategies.strategies[bundle.slug] || null;
  const roomStrategy = bundleStrategies.roomStrategies[bundle.roomSlug] || null;
  
  const jsonLd = generateJsonLd(bundle, room);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BundleDetailContent 
        bundle={bundle} 
        room={room} 
        relatedBundles={relatedBundles}
        allRooms={bundlesData.rooms}
        strategy={strategy}
        roomStrategy={roomStrategy}
      />
    </>
  );
}
