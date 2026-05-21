import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';
import ItemDetailClient from './ItemDetailClient';

const GAME_VERSION = verificationData.gameVersion;

function getVariablePriceInfo(item) {
  if (item.slug === 'aged-roe') {
    return {
      label: 'Variable',
      description: `Aged Roe has a variable Stardew Valley ${GAME_VERSION} sell price based on the fish species. Most Aged Roe is worth 2x Roe value.`,
      schemaValue: 'Variable by fish species',
    };
  }

  if (item.slug === 'omni-geode') {
    return {
      label: 'No sell price',
      description: `Omni Geode is a utility item in Stardew Valley ${GAME_VERSION}. Crack it open, trade it, or use it for unlocks instead of treating it as sell-price profit.`,
      schemaValue: 'No normal sell price',
    };
  }

  return null;
}

function hasQualityPrices(item) {
  return item.hasQuality !== false && ['Crops', 'Forage', 'Animal Products'].includes(item.category);
}

function getItemTitle(item) {
  if (item.slug === 'aged-roe') {
    return 'Aged Roe Price Formula & Fish Roe Values - Stardew Valley';
  }

  const variablePrice = getVariablePriceInfo(item);
  if (variablePrice) {
    return `${item.name} ${variablePrice.label} & Uses - Stardew Valley`;
  }

  if (item.category === 'Crops') {
    return `${item.name} Price & Profit - Stardew Valley`;
  }

  if (item.category === 'Artisan Goods') {
    return `${item.name} Sell Price & Source - Stardew Valley`;
  }

  if (item.category === 'Cooking') {
    return `${item.name} Sell Price & Recipe - Stardew Valley`;
  }

  return `${item.name} Sell Price & Uses - Stardew Valley`;
}

function getItemDescription(item, seasonText) {
  const variablePrice = getVariablePriceInfo(item);
  if (variablePrice) return variablePrice.description;

  const processingText = item.processing
    ? ` Best processing: ${item.processing.kegPrice && item.processing.jarPrice
      ? `${(item.processing.kegPrice >= item.processing.jarPrice ? item.processing.kegProduct : item.processing.jarProduct) || 'Machine'} ${Math.max(item.processing.kegPrice, item.processing.jarPrice)}g`
      : item.processing.kegPrice
        ? `${item.processing.kegProduct || 'Keg'} ${item.processing.kegPrice}g`
        : `${item.processing.jarProduct || 'Jar'} ${item.processing.jarPrice}g`}.`
    : '';
  const professionText = item.professionBonus
    ? ` ${item.professionBonus.name} profession value: ${item.professionBonus.price}g.`
    : '';
  const seasonOrCategory = item.season ? ` Season: ${seasonText}.` : ` Category: ${item.category}.`;
  const growthText = item.growthTime ? ` Grows in ${item.growthTime} days.` : '';

  return `${item.name} sells for ${item.basePrice}g in Stardew Valley ${GAME_VERSION}.${processingText}${professionText}${seasonOrCategory}${growthText}`.slice(0, 155);
}

export async function generateStaticParams() {
  return itemsData.items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug: slugId } = await params;
  const item = itemsData.items.find(i => i.slug === slugId);

  if (!item) {
    return {
      title: 'Item Not Found',
    };
  }

  const seasonText = item.season ? (item.season.length > 1 ? item.season.join('/') : item.season[0]) : 'All Year';
  const variablePrice = getVariablePriceInfo(item);

  return {
    title: getItemTitle(item),
    description: getItemDescription(item, seasonText),
    keywords: [
      item.name,
      `${item.name} price`,
      `${item.name} sell price`,
      `${item.name} Stardew Valley`,
      `${item.name} profit`,
      item.processing?.kegPrice ? `${item.name} wine` : null,
      item.processing?.jarPrice ? `${item.name} jelly` : null,
      item.category,
      ...(item.season || []),
    ].filter(Boolean),
    alternates: {
      canonical: `/item/${item.slug}/`,
    },
    openGraph: {
      title: `${item.name} Sell Price - ${variablePrice?.label || `${item.basePrice}g`} | Stardew Valley ${GAME_VERSION}`,
      description: getItemDescription(item, seasonText),
      url: `https://stardewpricedb.com/item/${item.slug}/`,
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
      title: `${item.name} Sell Price - Stardew Valley`,
      description: variablePrice?.description || getItemDescription(item, seasonText),
    },
  };
}

function generateJsonLd(item) {
  const variablePrice = getVariablePriceInfo(item);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `https://stardewpricedb.com/item/${item.slug}#article`,
      headline: `${item.name} Price and Profit Guide`,
      description: getItemDescription(item, item.season?.join('/') || 'All Year'),
      image: `https://stardewpricedb.com/images/items/${item.slug}.webp`,
      author: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: 'https://stardewpricedb.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'StardewPriceDB',
        url: 'https://stardewpricedb.com',
      },
      datePublished: '2026-05-19',
      dateModified: verificationData.lastVerified.split('T')[0],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://stardewpricedb.com/item/${item.slug}/`,
      },
      about: {
        '@type': 'Thing',
        name: item.name,
        description: item.category ? `${item.category} item in Stardew Valley` : 'Stardew Valley item',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Base Price',
          value: variablePrice?.schemaValue || `${item.basePrice}g`,
        },
        ...(item.professionBonus ? [{
          '@type': 'PropertyValue',
          name: `${item.professionBonus.name} Profession Price`,
          value: `${item.professionBonus.price}g`,
        }] : []),
        ...(!variablePrice && hasQualityPrices(item) ? [
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
        ] : []),
        ...(item.category ? [{ '@type': 'PropertyValue', name: 'Category', value: item.category }] : []),
        ...(item.season ? [{ '@type': 'PropertyValue', name: 'Season', value: item.season.join('/') }] : []),
        ...(item.growthTime ? [{ '@type': 'PropertyValue', name: 'Growth Time', value: `${item.growthTime} days` }] : []),
      ],
    },
  ];
}

export default async function ItemPage({ params }) {
  const { slug: slugId } = await params;
  const item = itemsData.items.find(i => i.slug === slugId);
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
