import CalculatorClient from './CalculatorClient';
import verificationData from '@/data/verification.json';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';
const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];
const GAME_VERSION = verificationData.gameVersion;
const LAST_VERIFIED = verificationData.lastVerified.split('T')[0];

// Generate static params for all seasons
export function generateStaticParams() {
  return VALID_SEASONS.map((season) => ({
    season: season,
  }));
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const season = params.season.toLowerCase();
  
  if (!VALID_SEASONS.includes(season)) {
    return { title: 'Calculator Not Found' };
  }

  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);

  const title = `${seasonCapitalized} Crop Profit Calculator - Stardew Valley`;
  const description = `Calculate profitable ${seasonCapitalized} crops in Stardew Valley ${GAME_VERSION} with seed cost, Keg, Jar, Tiller, and Artisan values.`;

  return {
    title,
    description,
    keywords: [
      `${season} crops Stardew Valley`,
      `${season} profit calculator`,
      'Stardew Valley crop calculator',
      'most profitable crops',
      `Stardew Valley ${GAME_VERSION}`,
    ],
    alternates: {
      canonical: `/calculator/${season}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/calculator/${season}/`,
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${seasonCapitalized} Stardew Valley crop calculator` }],
    },
  };
}

export default function CalculatorPage({ params }) {
  const season = params.season.toLowerCase();
  
  if (!VALID_SEASONS.includes(season)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Season Not Found</h1>
          <p className="text-slate-500 mt-2">Please select a valid season.</p>
        </div>
      </div>
    );
  }

  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/calculator/${season}/#app`,
    name: `${seasonCapitalized} Crop Profit Calculator`,
    url: `${SITE_URL}/calculator/${season}/`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    version: GAME_VERSION,
    dateModified: LAST_VERIFIED,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
        <CalculatorClient 
          season={season} 
          seasonCapitalized={seasonCapitalized}
        />
      </main>
    </>
  );
}
