import itemsData from '@/data/items.json';
import ItemDetailClient from './ItemDetailClient';

// Generate static params for all items
export async function generateStaticParams() {
  return itemsData.items.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const item = itemsData.items.find(i => i.slug === params.slug);
  
  if (!item) {
    return {
      title: 'Item Not Found',
    };
  }
  const seasonText = item.season ? (item.season.length > 1 ? item.season.join('/') : item.season[0]) : 'All Year';
  
  return {
    title: `${item.name} - Price, Keg/Jar Profit (Stardew Valley 1.6)`,
    description: `${item.name}: ${item.basePrice}g base, ${Math.floor(item.basePrice * 1.5)}g gold quality. ${item.processing ? `Keg: ${item.processing.kegPrice || item.processing.price}g. Jar: ${item.processing.jarPrice}g.` : ''} ${item.season ? `Season: ${seasonText}.` : ''} Growth: ${item.growthTime || 'N/A'} days.`,
    keywords: [
      item.name,
      `${item.name} price`,
      `${item.name} Stardew Valley`,
      `${item.name} profit`,
      item.processing?.kegPrice ? `${item.name} wine` : null,
      item.processing?.jarPrice ? `${item.name} jelly` : null,
      item.category,
      ...(item.season || []),
    ].filter(Boolean),
    alternates: {
      canonical: `/item/${item.slug}`,
    },
    openGraph: {
      title: `${item.name} - ${item.basePrice}g | Stardew Valley Price`,
      description: `${item.name}: ${item.basePrice}g base. ${item.processing ? `Keg: ${item.processing.kegPrice || item.processing.price}g.` : ''} Profession bonuses calculated.`,
      url: `https://stardewpricedb.com/item/${item.slug}`,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${item.name} - Stardew Valley Price Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${item.name} Price Guide - Stardew Valley`,
      description: `${item.name}: ${item.basePrice}g base price. Keg/Jar profits & profession bonuses.`,
    },
  };
}

// Generate JSON-LD structured data (Product + FAQ Schema)
function generateJsonLd(item) {
  const schemas = [];
  
  // Product Schema - 为物品页面添加富文本卡片
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://stardewpricedb.com/item/${item.slug}#product`,
    name: item.name,
    description: item.description || `${item.name} - Stardew Valley item with base price of ${item.basePrice}g.`,
    category: item.category,
    image: `https://stardewpricedb.com/images/items/${item.slug}.webp`,
    brand: {
      '@type': 'Brand',
      name: 'Stardew Valley',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'ConcernedApe',
      url: 'https://www.stardewvalley.net/',
    },
    offers: {
      '@type': 'Offer',
      url: `https://stardewpricedb.com/item/${item.slug}`,
      priceCurrency: 'g', // Star tokens (in-game currency)
      price: item.basePrice,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Base Price',
        value: `${item.basePrice}g`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Silver Quality',
        value: `${Math.floor(item.basePrice * 1.25)}g`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Gold Quality',
        value: `${Math.floor(item.basePrice * 1.5)}g`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Iridium Quality',
        value: `${item.basePrice * 2}g`,
      },
      ...(item.category ? [{ '@type': 'PropertyValue', name: 'Category', value: item.category }] : []),
      ...(item.season ? [{ '@type': 'PropertyValue', name: 'Season', value: item.season.join('/') }] : []),
      ...(item.growthTime ? [{ '@type': 'PropertyValue', name: 'Growth Time', value: `${item.growthTime} days` }] : []),
    ],
  });
  
  // FAQ Schema - 为搜索结果添加富文本
  const faqs = [];
  
  faqs.push({
    '@type': 'Question',
    name: `What is the sell price of ${item.name} in Stardew Valley?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${item.name} sells for ${item.basePrice}g (base), ${Math.floor(item.basePrice * 1.25)}g (silver), ${Math.floor(item.basePrice * 1.5)}g (gold), and ${item.basePrice * 2}g (iridium quality). Profession bonuses like Tiller (+10%) or Artisan (+40%) can increase these prices further.`
    }
  });
  
  if (item.processing?.kegPrice) {
    faqs.push({
      '@type': 'Question',
      name: `Should I put ${item.name} in a Keg or Preserves Jar?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.name} in a Keg produces ${item.processing.kegProduct || 'artisan goods'} worth ${item.processing.kegPrice}g. In a Preserves Jar, it makes ${item.processing.jarProduct || 'preserved goods'} worth ${item.processing.jarPrice || 'N/A'}g. ${item.processing.kegPrice > (item.processing.jarPrice || 0) ? 'Keg is more profitable per unit but takes longer.' : 'Preserves Jar may be better for faster processing and similar profits.'} With the Artisan profession (+40%), profits increase significantly.`
      }
    });
  }
  
  if (item.growthTime) {
    faqs.push({
      '@type': 'Question',
      name: `How long does ${item.name} take to grow?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.name} takes ${item.growthTime} days to reach maturity. ${item.regrows ? `It regrows every ${item.regrowTime} days after the first harvest, making it excellent for continuous farming.` : 'It must be replanted after each harvest.'} Using fertilizer can speed up growth.`
      }
    });
  }
  
  if (item.giftLove && item.giftLove.length > 0) {
    faqs.push({
      '@type': 'Question',
      name: `Which villagers love receiving ${item.name} as a gift?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `The following villagers love ${item.name}: ${item.giftLove.join(', ')}. Giving loved gifts increases friendship by 10 points (or 20 if the villager's birthday).`
      }
    });
  }
  
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs
    });
  }
  
  return schemas;
}

export default function ItemPage({ params }) {
  const item = itemsData.items.find(i => i.slug === params.slug);
  const relatedItems = itemsData.items
    .filter(i => i.id !== item?.id && i.category === item?.category)
    .slice(0, 5);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Item Not Found</h1>
          <p className="text-slate-500 mt-2">The item you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(item)) }}
      />
      <ItemDetailClient item={item} relatedItems={relatedItems} />
    </>
  );
}
