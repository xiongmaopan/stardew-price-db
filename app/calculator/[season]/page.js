import CalculatorClient from './CalculatorClient';

const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];

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

  return {
    title: `${seasonCapitalized} Crop Profit Calculator - Stardew Valley 1.6`,
    description: `Calculate the most profitable ${seasonCapitalized} crops in Stardew Valley 1.6. Compare raw sell prices, Keg wine/juice, and Preserves Jar profits with Tiller and Artisan bonuses.`,
    keywords: [
      `${season} crops Stardew Valley`,
      `${season} profit calculator`,
      'Stardew Valley crop calculator',
      'most profitable crops',
      'Stardew Valley 1.6',
    ],
    alternates: {
      canonical: `/calculator/${season}`,
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <CalculatorClient 
        season={season} 
        seasonCapitalized={seasonCapitalized}
      />
    </main>
  );
}
