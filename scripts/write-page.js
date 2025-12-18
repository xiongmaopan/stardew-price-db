const fs = require('fs');
const dir = 'd:/CODEFREE/星露谷/stardew-price-db/app/calculator/[season]';

const pageContent = `import itemsData from '@/data/items.json';
import CalculatorClient from './CalculatorClient';

const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];

export async function generateStaticParams() {
  return VALID_SEASONS.map((season) => ({ season }));
}

export async function generateMetadata({ params }) {
  const season = params.season.toLowerCase();
  const cap = season.charAt(0).toUpperCase() + season.slice(1);
  if (!VALID_SEASONS.includes(season)) return { title: 'Not Found' };
  return {
    title: \`\${cap} Crop Profit Calculator - Stardew Valley 1.6\`,
    description: \`Find the most profitable \${cap} crops in Stardew Valley 1.6.\`,
  };
}

export default function CalculatorPage({ params }) {
  const season = params.season.toLowerCase();
  if (!VALID_SEASONS.includes(season)) {
    return <div className="p-8 text-center">Season Not Found</div>;
  }
  const crops = itemsData.items.filter(i => 
    i.category === 'Crops' && i.season && i.season.map(s => s.toLowerCase()).includes(season)
  );
  const cap = season.charAt(0).toUpperCase() + season.slice(1);
  return (
    <CalculatorClient 
      season={season} 
      seasonCapitalized={cap} 
      crops={crops} 
      fertilizers={itemsData.fertilizers} 
      allSeasons={VALID_SEASONS} 
    />
  );
}
`;

fs.writeFileSync(dir + '/page.js', pageContent, 'utf8');
console.log('page.js written, size:', fs.statSync(dir + '/page.js').size);
