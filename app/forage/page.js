import CategoryHubPage, { buildCategoryJsonLd } from '@/components/CategoryHubPage';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const items = itemsData.items.filter((item) => item.category === 'Forage');
const title = `Stardew Valley forage prices by season (${verificationData.gameVersion})`;
const description = `Browse Stardew Valley forage prices by season, including mushrooms, beach forage, winter roots, Ginger Island forage, and Botanist planning.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/forage/' },
  openGraph: {
    title,
    description,
    url: 'https://stardewpricedb.com/forage/',
    type: 'website',
  },
};

const jsonLd = buildCategoryJsonLd({
  slug: 'forage',
  title,
  description,
  items,
});

export default function ForagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryHubPage
        title="Stardew Valley forage prices by season"
        eyebrow={`Verified for Stardew Valley ${verificationData.gameVersion}`}
        intro="Browse seasonal forage sell prices, mushroom values, beach forage, winter forage, and island forage. Use it with Botanist/Gatherer planning and early-game route decisions."
        items={items}
        categorySlug="forage"
        primaryLinks={[
          { href: '/guide/foraging-profit/', title: 'Foraging profit guide', text: 'Seasonal routes, Botanist vs Gatherer, and practical forage income.' },
          { href: '/bundle/spring-foraging-bundle/', title: 'Spring Foraging Bundle', text: 'Bundle requirements and seasonal collection notes.' },
          { href: '/selling-prices/', title: 'All selling prices', text: 'Compare forage prices against crops, fish, minerals, and artisan goods.' },
        ]}
      />
    </>
  );
}
