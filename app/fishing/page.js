import fishData from '@/data/fish.json';
import FishingGuideContent from './FishingGuideContent';

// SEO Metadata - High Quality for Google
export const metadata = {
  title: 'Stardew Valley Fish Locations, Seasons & Prices (1.6 Guide)',
  description: '67 fish with exact locations, times, seasons, and difficulty ratings. Includes all 5 legendary fish, Legendary II fish, Night Market fish, and Crab Pot catches with tackle recommendations.',
  keywords: [
    'Stardew Valley fish locations',
    'Stardew Valley fishing guide',
    'Stardew Valley legendary fish',
    'how to catch Legend fish',
    'Stardew fishing tackle',
    'Stardew Valley 1.6 fishing',
    'Stardew fish seasons',
    'Stardew Valley fish prices',
    'Pufferfish location',
    'Crimsonfish location',
    'fishing difficulty Stardew'
  ],
  alternates: {
    canonical: '/fishing',
  },
  openGraph: {
    title: 'Stardew Valley Fish Locations & Seasons (v1.6)',
    description: 'All 67 fish with locations, times, seasons, difficulty. Legendary fish included.',
    url: 'https://stardewpricedb.com/fishing',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stardew Valley Fishing Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardew Valley Fish Locations & Seasons',
    description: '67 fish with locations, times, seasons. All legendary fish included.',
  },
};

// JSON-LD Structured Data for SEO
function generateJsonLd() {
  return [
    // Article Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Stardew Valley Fish Locations, Seasons & Difficulty (v1.6)',
      description: 'All 67 fish with exact locations, times, seasons, and difficulty ratings. Data verified against game files.',
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
        '@id': 'https://stardewpricedb.com/fishing'
      }
    },
    // ItemList Schema for Fish
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Stardew Valley Fish Database',
      description: 'Complete list of all catchable fish in Stardew Valley',
      numberOfItems: fishData.fish.length,
      itemListElement: fishData.fish.slice(0, 10).map((fish, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: fish.name,
          description: fish.description,
          url: `https://stardewpricedb.com/fishing/${fish.slug}`
        }
      }))
    },
    // FAQ Schema
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I catch the Legend fish in Stardew Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Legend can only be caught in the Mountain Lake during rainy Spring days with Fishing Level 10. Use a Cork Bobber for the largest fishing bar and eat Dish o\' The Sea for +3 Fishing. Cast as far as possible and be prepared for the hardest fish in the game (difficulty 110).'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the most profitable fish in Stardew Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Legend sells for 5,000g base price, making it the most valuable single catch. For sustainable income, Sturgeon in Fish Ponds produce Roe that becomes Caviar (500g). Lava Eel also has high base value (700g) and profitable roe.'
          }
        },
        {
          '@type': 'Question',
          name: 'What tackle should I use for hard fish?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For difficult fish like legendaries, use a Cork Bobber to maximize your fishing bar size. Trap Bobber is excellent for fish that move erratically (dart behavior). For sinker fish, Lead Bobber prevents bar bouncing.'
          }
        }
      ]
    }
  ];
}

export default function FishingGuidePage() {
  const jsonLd = generateJsonLd();
  
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
      
      <FishingGuideContent fishData={fishData} />
    </>
  );
}
