import npcsData from '@/data/npcs.json';
import GiftGuideContent from './GiftGuideContent';

// Generate static params for all NPCs
export async function generateStaticParams() {
  return npcsData.npcs.map((npc) => ({
    npc: npc.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const npc = npcsData.npcs.find(n => n.slug === params.npc);
  
  if (!npc) {
    return { title: 'NPC Not Found' };
  }

  const marriageStatus = npc.marriageable ? '(Marriage Candidate)' : '';
  
  return {
    title: `${npc.name} Gift Guide - Best Gifts & Schedule | Stardew Valley 1.6`,
    description: `Complete ${npc.name} gift guide for Stardew Valley 1.6. Find loved gifts, liked items, birthday (${npc.birthday}), schedule, and heart events. ${marriageStatus}`,
    keywords: [
      `${npc.name} gifts Stardew Valley`,
      `${npc.name} loved gifts`,
      `${npc.name} birthday`,
      `${npc.name} schedule`,
      `${npc.name} heart events`,
      `what does ${npc.name} like`,
      `best gifts for ${npc.name}`,
      'Stardew Valley gift guide',
      'Stardew Valley 1.6'
    ],
    alternates: {
      canonical: `/gift/${npc.slug}`,
    },
    openGraph: {
      title: `${npc.name} Gift Guide - Stardew Valley | StardewPriceDB`,
      description: `Find the best gifts for ${npc.name}. Loved gifts, schedule, birthday ${npc.birthday}, and heart events.`,
      url: `https://stardewpricedb.com/gift/${npc.slug}`,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${npc.name} Gift Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${npc.name} Gift Guide - Stardew Valley`,
      description: `Best gifts for ${npc.name}: loved items, birthday, schedule & heart events.`,
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(npc) {
  return [
    // Article schema
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${npc.name} Gift Guide - Stardew Valley`,
      description: `Complete guide to ${npc.name}'s favorite gifts, schedule, and heart events in Stardew Valley.`,
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB'
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: 'https://stardewpricedb.com'
      },
      datePublished: '2025-12-07',
      dateModified: new Date().toISOString().split('T')[0]
    },
    // FAQ schema for common questions
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What are ${npc.name}'s favorite gifts in Stardew Valley?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${npc.name}'s loved gifts include: ${npc.gifts.love.slice(0, 5).join(', ')}. These gifts give +80 friendship points.`
          }
        },
        {
          '@type': 'Question',
          name: `When is ${npc.name}'s birthday in Stardew Valley?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${npc.name}'s birthday is on ${npc.birthday}. Giving a gift on their birthday multiplies friendship points by 8x!`
          }
        },
        {
          '@type': 'Question',
          name: `Where can I find ${npc.name} in Stardew Valley?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${npc.name} can usually be found at ${npc.location}. ${npc.schedule}`
          }
        }
      ]
    },
    // BreadcrumbList schema
    {
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
          name: 'Gift Guides',
          item: 'https://stardewpricedb.com/gifts'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: npc.name,
          item: `https://stardewpricedb.com/gift/${npc.slug}`
        }
      ]
    }
  ];
}

export default function GiftGuidePage({ params }) {
  const npc = npcsData.npcs.find(n => n.slug === params.npc);
  
  if (!npc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">NPC Not Found</h1>
          <p className="text-slate-500 mt-2">This character doesn't exist in our database.</p>
        </div>
      </div>
    );
  }

  // Get related NPCs (same marriageable status, or family members)
  const relatedNpcs = npcsData.npcs
    .filter(n => n.slug !== npc.slug && n.marriageable === npc.marriageable)
    .slice(0, 6);

  const jsonLd = generateJsonLd(npc);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
        <GiftGuideContent 
          npc={npc} 
          relatedNpcs={relatedNpcs}
          universalGifts={npcsData.universalGifts}
        />
      </main>
    </>
  );
}
